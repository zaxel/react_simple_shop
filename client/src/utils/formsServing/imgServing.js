export const formDataImg = ({id, input, imgDbCollName, index}) => {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('img', input);
    imgDbCollName && formData.append('imgDbCollName', imgDbCollName);
    (index || index === 0) && formData.append('index', index);
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