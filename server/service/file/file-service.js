const uuid = require('uuid');
const path = require('path');

class FileService{
    imageResolve = async(img) => {
        const extension = img.name.split('.').pop();
        let fileName = uuid.v4() + "." + extension;
        img.mv(path.resolve(__dirname, '..', '..', 'static', fileName));
        return fileName;
    }
}

module.exports = new FileService();