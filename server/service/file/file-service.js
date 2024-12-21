const uuid = require('uuid');
const path = require('path');
const serveImgExtrStoreService = require('../http/imgExtrStore-service');


class FileService {
    imageResolve = async (img) => {
        const extension = img.name.split('.').pop();
        let fileName = uuid.v4() + "." + extension;
        img.mv(path.resolve(__dirname, '..', '..', 'static', fileName));
        return fileName;
    }
    imagesOuterStoreDataResolve = async (images) => {
        return await serveImgExtrStoreService.post(images);
    }
    imagesOuterStoreDataDelete = async (url) => {
        return await serveImgExtrStoreService.delete(url);
    }

}

module.exports = new FileService();