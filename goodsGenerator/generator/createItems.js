const makeDevice = require("./makeDevice");
const renderName = require("./fields/renderName");
const renderPrice = require("./fields/renderPrice");
const renderRate = require("./fields/renderRate");
const renderTypeId = require("./fields/renderTypeId");
const renderImg = require("./fields/renderImg");
const renderInfo = require("./fields/renderInfo");

const create = (amount, fileExtension) => {
    const items = [];
    for (let i = 1; i <= amount; i++) {

        const {name, brandId} = renderName();
        const price = renderPrice();
        const rate = renderRate();
        const typeId = renderTypeId();
        const img = renderImg(i-1, fileExtension);
        const info = renderInfo();
        
        const device = makeDevice(name, price, rate, brandId, typeId, img, info);

        items.push(device);
    }


    return items;
}

module.exports = create;