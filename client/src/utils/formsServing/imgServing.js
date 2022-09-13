﻿export const formDataImg = ({id, input, inputAlt, imgDbCollName, index, title, text}) => {
    const formData = new FormData();
    id && formData.append('id', id);
    input && formData.append('img', input);
    inputAlt && formData.append('imgAlt', inputAlt);
    imgDbCollName && formData.append('imgDbCollName', imgDbCollName);
    (index || index === 0) && formData.append('index', index);
    title && formData.append('title', title);
    text && formData.append('text', text);
    return formData;
}

export const correctImgTypeCheck = (input) => {
    if (!input) {
        alert('no file added')
        return false;
    } else if (input.type === "image/jpeg" || input.type === "image/png" || input.type === "image/avif" || input.type === "image/webp" || input.type === "image/gif") {
        return true;    
    }
    alert('only jpeg/png/avif/webp files accepted');
    return false;
    
}

export const setImageFromBlob = (setSrc, input) => {
    let image = new FileReader();
    image.onloadend = ()=> setSrc(image.result);
    image.readAsDataURL(input);
}