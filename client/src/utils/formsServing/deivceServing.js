export const formDataNewDevice = (title, price, brandActive, typeActive, specs, img) => {
    const formData = new FormData();
        formData.append('name', title);
        formData.append('price', price);
        formData.append('brandId', brandActive);
        formData.append('typeId', typeActive);
        formData.append('info', JSON.stringify(specs));
        formData.append('img', img);
    return formData;
}
