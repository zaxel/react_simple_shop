export const formDataImg = (id, input, imgDbCollName) => {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('img', input);
    imgDbCollName && formData.append('imgDbCollName', imgDbCollName);
    return formData;
}

export const correctImgTypeCheck = (input) => {
    if (!input) {
        alert('no file added')
        return false;
    } else if (input.type !== "image/jpeg") {
        alert('only jpg files accepted');
        return false;
    }
    return true;
}