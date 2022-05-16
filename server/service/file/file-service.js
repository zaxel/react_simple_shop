const uuid = require('uuid');
const path = require('path');

class FileService{
    imageResolve = async(img) => {
        let fileName = uuid.v4() + ".jpg";
        img.mv(path.resolve(__dirname, '..', '..', 'static', fileName));
        return fileName;
    }
}

module.exports = new FileService();