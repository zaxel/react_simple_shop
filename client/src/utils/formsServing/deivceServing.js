export const formDataNewImages = (itemId, images) => {
    const formData = new FormData(); 
        formData.append("itemId", itemId);
        images.filter(img=>img.img).forEach(image => {
            formData.append(image.id, image.img);
        });
    return formData;
}
export const formDataInfoNoEmptyFields = (infosArray) => {
    return infosArray.filter(info=> info.title && info.description);
}
export const formDataNewDevice = (title, price, brandActive, typeActive, specs, img, seller_dscr) => {
    const formData = new FormData();
        formData.append('name', title);
        formData.append('price', price);
        formData.append('brandId', brandActive);
        formData.append('typeId', typeActive);
        formData.append('info', JSON.stringify(formDataInfoNoEmptyFields(specs)));
        formData.append('img', img);
        formData.append('seller_dscr', seller_dscr);
    return formData;
}
export const formDataNewDeviceOuterImgStore = (title, price, brandActive, typeActive, specs, images, seller_dscr) => {
    const formData = new FormData();
        formData.append('name', title);
        formData.append('price', price);
        formData.append('brandId', brandActive);
        formData.append('typeId', typeActive);
        formData.append('info', JSON.stringify(formDataInfoNoEmptyFields(specs)));
        formData.append('seller_dscr', seller_dscr);
        images.forEach(image => {
            formData.append(image.id, image.img);
        });
    return formData;
}
