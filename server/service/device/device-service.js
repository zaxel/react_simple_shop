const fileService = require("../file/file-service");
const { Device, DeviceInfo } = require("../../models/models");
const { Op, Sequelize, QueryTypes } = require("sequelize");
const sequelize = require("../../db");
const acceptedFileType = "string";
const {
  searchDevicesOptions,
  orderDevicesOptions,
} = require("../../utils/searchOptions");
const ApiError = require("../../error/ApiError");
const { random } = require("../../db");
const DevicesMainSearchDto = require("../../dtos/devices-main-search-dto");

class DeviceService {
  create = async (name, price, brandId, typeId, info, images, seller_dscr) => {
    let imgesOutStoreData = [];
    if (images) {
      let imgStoreResp = await fileService.imagesOuterStoreDataResolve(images);
      imgStoreResp.forEach((result, index) => {
        if (result.status === "fulfilled") {
          //    console.log(`Image ${index}: Upload succeeded`, result.value);
          imgesOutStoreData.push(result.value.data);
        } else if (result.status === "rejected") {
          console.log(`Image ${index}: Upload failed`, result.reason);
        }
      });
    }
    const device = await Device.create({
      name,
      price,
      brandId,
      typeId,
      img: imgesOutStoreData,
      seller_dscr,
    });
    if (info) {
      info = JSON.parse(info);
      this.createInfo(info, device.id);
    }
    return device;
  };
  createInfo = async (info, deviceId) => {
    if (!info) return new Error("no info received!");
    info.forEach((i) => {
      DeviceInfo.create({
        title: i.title,
        description: i.description,
        deviceId,
      });
    });
  };
  createBulk = async (req, next) => {
    let images = req.files;
    let item = req.body;
    const savedDBstatus = { saved: 0, failed: 0 };
    try {
      let imgStoreResp = await fileService.imagesOuterStoreDataResolve(images);
      const imagesOutStoreData = imgStoreResp.map((result, index) => {
        if (result.status === "fulfilled") {
          savedDBstatus.saved++;
          return result.value.data || "";
        } else if (result.status === "rejected") {
          savedDBstatus.failed++;
          console.log(`Image ${index}: Upload failed`, result.reason);
        }
      });

      let self = this;
      const bulkItems = await Promise.allSettled(
        [{ img: imagesOutStoreData, ...item }].map(async (el) => {
          let { name, price, brandId, typeId, rate, img, info, seller_dscr } =
            el;
          let device = [];
          try {
            device = await Device.bulkCreate(
              [{ name, price, brandId, typeId, rate, img, seller_dscr }],
              {
                ignoreDuplicates: true,
              }
            );
          } catch (err) {
            savedDBstatus.saved -= img.length;
            savedDBstatus.failed += img.length;
            // await Promise.allSettled(img.map(async im=>{
            //     await fileService.imagesOuterStoreDataDelete(im.delete_url);
            // }))
            console.error(err);
            throw err;
          }
          if (info) {
            info = JSON.parse(info);
            if (!device.length || !device[0].id) return;
            self.createInfo(info, device[0].id);
          }
        })
      );
      return { status: bulkItems[0].status, value: savedDBstatus };
    } catch (error) {
      console.error("Error in bulk processing:", error);
      return { status: "error", value: savedDBstatus };
    }
  };

  getAllMainSearch = async ({
    brandId = null,
    typeId = null,
    limit,
    page,
    offset,
    where,
    order,
    searchPhrase,
  }) => {
    if (!searchPhrase || typeof searchPhrase !== "string") {
      throw new Error("searchPhrase is required and must be a string.");
    }
    if (page <= 0 || limit <= 0) {
      throw new Error("page and limit must be positive integers.");
    }

    try {
      const searchResultData = await sequelize.query(
        `
        WITH ranked_devices AS (
        SELECT 
          "device".*,
          ts_rank(setweight("device"."searchable", 'A'), websearch_to_tsquery('english', :searchPhrase)) AS "device_rank",
          ts_headline(
            'english',
            "device"."name",
            websearch_to_tsquery('english', :searchPhrase),
            'StartSel=<b>, StopSel=</b>, MaxFragments=2, MinWords=3, MaxWords=10'
          ) AS "highlighted_name",
          ts_headline(
            'english',
            "info"."title",
            websearch_to_tsquery('english', :searchPhrase),
            'StartSel=<b>, StopSel=</b>, MaxFragments=2, MinWords=3, MaxWords=10'
          ) AS "info_highlighted_title",
          ts_headline(
            'english',
            "info"."description",
            websearch_to_tsquery('english', :searchPhrase),
            'StartSel=<b>, StopSel=</b>, MaxFragments=2, MinWords=3, MaxWords=10'
          ) AS "info_highlighted_description",
          ts_rank(setweight("info"."searchable", 'B'), websearch_to_tsquery('english', :searchPhrase)) AS "info_rank",
          similarity("device"."searchable"::text, :searchPhrase) AS "device_similarity",
          similarity("info"."searchable"::text, :searchPhrase) AS "info_similarity",
          ROW_NUMBER() OVER (
            PARTITION BY "device"."id" 
            ORDER BY 
              ts_rank(setweight("device"."searchable", 'A'), websearch_to_tsquery('english', :searchPhrase)) + 
              COALESCE(ts_rank(setweight("info"."searchable", 'B'), websearch_to_tsquery('english', :searchPhrase)), 0) DESC, 
              GREATEST(similarity("device"."searchable"::text, :searchPhrase), similarity("info"."searchable"::text, :searchPhrase)) DESC
          ) AS row_number
        FROM "devices" AS "device"
        LEFT OUTER JOIN "device_infos" AS "info"
          ON "device"."id" = "info"."deviceId"
        WHERE 
          (
            "device"."searchable" @@ websearch_to_tsquery('english', :searchPhrase) OR
            similarity("device"."searchable"::text, :searchPhrase) > 0.2 OR
            similarity("info"."searchable"::text, :searchPhrase) > 0.2
          )
          AND (:brandId IS NULL OR "device"."brandId" = :brandId)
          AND (:typeId IS NULL OR "device"."typeId" = :typeId)
      ),
      total_count AS (
        SELECT COUNT(*) AS count
        FROM ranked_devices
        WHERE row_number = 1
      )
      SELECT 
        ranked_devices.*, 
        "highlighted_name", 
        "info_highlighted_title", 
        "info_highlighted_description",
        total_count.count AS total_count
      FROM ranked_devices, total_count
      WHERE row_number = 1
      ORDER BY 
        "device_rank" + COALESCE("info_rank", 0) DESC, 
        GREATEST("device_similarity", "info_similarity") DESC
      LIMIT :limit OFFSET :offset;
      `,
        {
          replacements: {
            searchPhrase,
            typeId: typeId || null,
            brandId: brandId || null,
            limit,
            offset,
          },
          type: QueryTypes.SELECT,
        }
      );

      return new DevicesMainSearchDto(searchResultData).getResult();
    } catch (error) {
      console.error("Error in searchDevices:", error);
      throw error;
    }
  };
  getAll = async (
    id,
    brandId,
    typeId,
    limit = process.env.DEFAULT_LIMIT,
    page = process.env.START_PAGE,
    sortBy,
    sortDirection = "ASC",
    searchBy,
    searchPraseAdmin,
    searchPraseMain
  ) => {
    let offset = page * limit - limit;
    let where = searchDevicesOptions(
      id,
      brandId,
      typeId,
      searchBy,
      searchPraseAdmin
    );
    let order = orderDevicesOptions(sortBy, sortDirection);
    let devices = !searchPraseMain
      ? await Device.findAndCountAll({ where, order, limit, offset })
      : await this.getAllMainSearch({
          brandId,
          typeId,
          limit,
          page,
          offset,
          where,
          order,
          searchPhrase: searchPraseMain,
        });
    return devices;
  };
  getSingle = async (id) => {
    const device = await Device.findOne({
      where: { id },
      include: [{ model: DeviceInfo, as: "info" }],
    });
    return device;
  };
  getRandom = async (amount) => {
    const devices = await Device.findAll({
      order: Sequelize.literal("random()"),
      limit: amount,
    });
    return devices;
  };
  update = async (id, field, newData) => {
    const updatedData = await Device.update(
      { [field]: newData },
      {
        where: { id },
      }
    );
    return { updatedData };
  };
  createImg = async (itemId, imagesData) => {
    if (!imagesData) {
      throw new Error("No image received!");
    }
    const status = { rejected: 0, fulfilled: 0 };
    const imagesOutStoreData = [];
    const oldItemImagesData = await Device.findOne({
      where: { id: itemId },
      attributes: ["img"],
    });
    imagesOutStoreData.push(...oldItemImagesData.img);

    let imgStoreResp = await fileService.imagesOuterStoreDataResolve(
      imagesData
    );

    imgStoreResp.forEach((result, index) => {
      if (result.status === "fulfilled") {
        status.fulfilled++;
        imagesOutStoreData.push(result.value.data);
      } else if (result.status === "rejected") {
        status.rejected++;
        console.log(`Image ${index}: Upload failed`, result.reason);
      }
    });
    const updatedDevices = await Device.update(
      { img: imagesOutStoreData },
      {
        where: { id: itemId },
      }
    );
    return { updatedDevices, ...status };
  };
  updateImg = async (itemId, curImgId, imgData, next) => {
    if (!itemId || !curImgId || !imgData) {
      throw new Error("Not all required image data received!");
    }
    const deviceImages = await Device.findOne({
      where: { id: itemId },
      attributes: ["img"],
    });

    const removeLink = deviceImages.img.find(
      (img) => img.id === curImgId
    ).delete_url;
    const restImages = deviceImages.img.filter((img) => img.id !== curImgId);
    try {
      // const res = await fileService.imagesOuterStoreDataDelete(removeLink); //imgBB
      fileService.imagesOuterStoreDataDelete(curImgId); //imageKit
      let imgStoreResp = await fileService.imagesOuterStoreDataResolve({
        1: imgData,
      });

      imgStoreResp.forEach((result, index) => {
        if (result.status === "fulfilled") {
          restImages.push(result.value.data);
        } else if (result.status === "rejected") {
          console.log(`Image ${index}: Upload failed`, result.reason);
        }
      });
      const updatedDevices = await Device.update(
        { img: restImages },
        {
          where: { id: itemId },
        }
      );
      return { updatedDevices };
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  };
  deleteDevImg = async (itemId, imgId, next) => {
    if (!itemId || !imgId) {
      throw new Error("No required image data received!");
    }
    const device = await Device.findOne({
      where: { id: itemId },
    });
    const removeLink = device.img.find((img) => img.id === imgId).delete_url;
    const restImages = device.img.filter((img) => img.id !== imgId);
    try {
      // const res = await fileService.imagesOuterStoreDataDelete(removeLink); //imgBB
      await fileService.imagesOuterStoreDataDelete(imgId); //imagekit
      const updatedData = await Device.update(
        { img: restImages },
        {
          where: { id: itemId },
        }
      );
      return { updatedData };
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  };
  delete = async (id) => {
    try{
      const imagesToDelete = await Device.findOne({
        where: { id },
      });
      Promise.all(
        imagesToDelete.img.map(async (image) => {
          return await fileService.imagesOuterStoreDataDelete(image.id); //imagekit
        })
      );
      const updatedData = await Device.destroy({
        where: { id },
      });
      return { updatedData };
    }catch(e){
      console.log("error on item deleting: ", e)
    }
  };
}
module.exports = new DeviceService();
