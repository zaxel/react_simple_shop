const axios = require('axios');
const FormData = require('form-data');

class UploadImgExtrStoreService {
    post = async (imagesData) => {
        try {
            const promises = Object.entries(imagesData).map(async ([id, image]) => {
                const formData = new FormData();
                formData.append("image", image.data, {
                    filename: image.name,
                    contentType: image.mimetype,
                });

                const response = await axios.post(process.env.IMG_STORAGE_API_URL, formData, {
                    params: {
                        key: process.env.IMG_STORAGE_KEY,
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

}

module.exports = new UploadImgExtrStoreService();