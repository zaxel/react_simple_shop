const uuid = require('uuid');
const path = require('path');
const uploadImgExtrStoreService = require('../http/uploadImgExtrStore-service');


class FileService {
    imageResolve = async (img) => {
        const extension = img.name.split('.').pop();
        let fileName = uuid.v4() + "." + extension;
        img.mv(path.resolve(__dirname, '..', '..', 'static', fileName));
        return fileName;
    }
    imagesOuterStoreDataResolve = async (images) => {
        return await uploadImgExtrStoreService.post(images);
    }
}

module.exports = new FileService();