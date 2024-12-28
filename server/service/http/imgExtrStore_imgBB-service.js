const axios = require('axios');
const FormData = require('form-data');

class ServeImgExtrStoreService_imgBB {
    post = async (imagesData) => {
        try {
            const promises = Object.entries(imagesData).map(async ([id, image]) => {
                const formData = new FormData();
                formData.append("image", image.data, {
                    filename: image.name,
                    contentType: image.mimetype,
                });

                const response = await axios.post(process.env.IMG_STORAGE_API_URL_IMGDB, formData, {
                    params: {
                        key: process.env.IMG_STORAGE_KEY_IMGDB,
                    },
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

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
            const response = await axios.post(url,
                {
                    params: {
                        key: process.env.IMG_STORAGE_KEY_IMGDB,
                    }
                }
            );
            return response;
        } catch (error) {
            console.error("Error removing image:", error);
            throw error;
        }
    }
}

module.exports = new ServeImgExtrStoreService_imgBB();