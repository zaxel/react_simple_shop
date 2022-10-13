export const formDataImg = ({id, input, inputAlt, imgDbCollName, index, title, text, type}) => {
    const formData = new FormData();
    id && formData.append('id', id);
    input && formData.append('img', input);
    type && formData.append('type', type);
    inputAlt && formData.append('imgAlt', inputAlt);
    imgDbCollName && formData.append('imgDbCollName', imgDbCollName);
    (index || index === 0) && formData.append('index', index);
    title && formData.append('title', title);
    text && formData.append('text', text);
    return formData;
}
export const formDataCatImg = ({title, link, banner, icon, order_id}) => {
    const formData = new FormData();
    title && formData.append('title', title);
    link && formData.append('link', link);
    banner && formData.append('banner', banner);
    icon && formData.append('icon', icon);
    order_id && formData.append('order_id', order_id);
    return formData;
}

export const correctImgTypeCheck = (input) => {
    if (!input) {
        alert('no file added')
        return false;
    } else if (input.type === "image/jpeg" || input.type === "image/png" || input.type === "image/avif" || input.type === "image/webp" || input.type === "image/gif" || input.type === "image/svg+xml") {
        return true;    
    }
    alert('only jpeg/png/avif/webp/svg files accepted');
    return false;
    
}

export const setImageFromBlob = (setSrc, input) => {
    let image = new FileReader();
    image.onloadend = ()=> setSrc(image.result);
    image.readAsDataURL(input);
}