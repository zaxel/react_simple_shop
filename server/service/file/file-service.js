const uuid = require('uuid');
const path = require('path');
// const serveImgExtrStoreService_imgBB = require('../http/imgExtrStore_imgBB-service');
const serveImgExtrStoreService_imagekit = require('../http/imgExtrStore_imagekit-service');
const ImageKitDto = require('../../dtos/out-stor-resp-imagekit-dto');


class FileService {
    imageResolve = async (img) => {
        const extension = img.name.split('.').pop();
        let fileName = uuid.v4() + "." + extension;
        img.mv(path.resolve(__dirname, '..', '..', 'static', fileName));
        return fileName;
    }
    imagesOuterStoreDataResolve = async (images) => {
        // return await serveImgExtrStoreService_imgBB.post(images);
        const response = await serveImgExtrStoreService_imagekit.post(images);
        return response.map(res=>{
            const val = res.value;
            const newValue = {};
            newValue.data = new ImageKitDto(val);
            return {...res, value: newValue};
        });
    }
    imagesOuterStoreDataDelete = async (imageId) => {
        // return await serveImgExtrStoreService_imgBB.delete(url);
        return await serveImgExtrStoreService_imagekit.delete(imageId);
        
    }

}

module.exports = new FileService();