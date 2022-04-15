const randomIntFromInterval = require("../random");
const {Brands, BrandsSeparators} = require('../store/brands');
const renderBrandId = require("./renderBrandId");

const renderName = () => {
    const brandArrId = randomIntFromInterval(0, Brands.length-1);


    const brand = Object.values(Brands[brandArrId])[0];
    const separatorId = randomIntFromInterval(0, BrandsSeparators.length-1);
    const separator = BrandsSeparators[separatorId];
    const modelLength = randomIntFromInterval(3, 10);
    let model = '';
    for(let i = 3; i<modelLength; i++){
        let char = randomIntFromInterval(33, 122);
        model+=String.fromCharCode(char);
    }
    const name = brand+separator+model;

    const brandId = renderBrandId(brandArrId);


    return {name , brandId};
}

module.exports = renderName;