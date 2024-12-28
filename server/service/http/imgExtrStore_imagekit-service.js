const axios = require('axios');

class ServeImgExtrStoreService_imagekit {
    post = async (imagesData) => {
        try {
            const promises = Object.entries(imagesData).map(async ([id, image]) => {
                const key = "Basic "+ Buffer.from(process.env.IMG_STORAGE_KEY_IMAGEKIT+":").toString('base64');
                const response = await axios.post(process.env.IMG_STORAGE_API_URL_IMAGEKIT, {
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
    delete = async url => {
        try {
            // const response = await axios.post(url,
            //     {
            //         params: {
            //             key: process.env.IMG_STORAGE_KEY,
            //         }
            //     }
            // );
            // return response;
        } catch (error) {
            console.error("Error removing image:", error);
            throw error;
        }
    }
}

module.exports = new ServeImgExtrStoreService_imagekit();