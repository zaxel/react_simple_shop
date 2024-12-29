const axios = require('axios');

class ServeImgExtrStoreService_imagekit {
    post = async (imagesData) => {
        try {
            const promises = Object.entries(imagesData).map(async ([id, image]) => {
                const key = "Basic "+ Buffer.from(process.env.IMG_STORAGE_KEY_IMAGEKIT+":").toString('base64');
                const response = await axios.post(process.env.IMG_STORAGE_API_UPLOAD_URL_IMAGEKIT, {
                    file: image.data.toString('base64'), 
                    fileName: image.name, 
                }, {
                    headers: {
                        'Authorization': key, 
                        'Content-Type': 'multipart/form-data', 
                        'Accept': 'application/json'
                    }
                })
                return response.data;
            });
            
            const responses = await Promise.allSettled(promises);
            return responses;
        } catch (error) {
            console.error("Error uploading images:", error);
            throw error;
        }
    }
    delete = async imageId => {
        const key = "Basic "+ Buffer.from(process.env.IMG_STORAGE_KEY_IMAGEKIT+":").toString('base64');
        const options = {
            method: 'DELETE',
            url: process.env.IMG_STORAGE_API_DELETE_URL_IMAGEKIT+imageId,
            headers: {Accept: 'application/json', Authorization: key}
          };
        try {
            const response = await axios.request(options);;
            return response;
        } catch (error) {
            console.error("Error removing image:", error);
            throw error;
        }
    }
}

module.exports = new ServeImgExtrStoreService_imagekit();