const randomIntFromInterval = require("../random");
const HASH = process.env.PICTURE_NAME_HASH;

const renderImg = (i, ext) => {
    
    const img = HASH + i++ + ext;

    return img;
}
module.exports = renderImg;