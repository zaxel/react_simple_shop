const {Brands} = require('../store/brands');

const renderBrandId = (brandArrId) => {
    const brandId = Object.keys(Brands[brandArrId])[0];
    return +brandId;
}
module.exports = renderBrandId;