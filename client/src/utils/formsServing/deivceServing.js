export const formDataInfoNoEmptyFields = (infosArray) => {
    return infosArray.filter(info=> info.title && info.description);
}
export const formDataNewDevice = (title, price, brandActive, typeActive, specs, img) => {
    const formData = new FormData();
        formData.append('name', title);
        formData.append('price', price);
        formData.append('brandId', brandActive);
        formData.append('typeId', typeActive);
        formData.append('info', JSON.stringify(formDataInfoNoEmptyFields(specs)));
        formData.append('img', img);
    return formData;
}
