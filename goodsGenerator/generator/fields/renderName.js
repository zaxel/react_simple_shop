const randomIntFromInterval = require("../random");
const {Brands, BrandsSeparators} = require('../store/brands');

const renderName = () => {
    const brandArrId = randomIntFromInterval(0, Brands.length-1);
    const brand = Brands[brandArrId];
    const separatorId = randomIntFromInterval(0, BrandsSeparators.length-1);
    const separator = BrandsSeparators[separatorId];
    const modelLength = randomIntFromInterval(3, 10);
    let model = '';
    for(let i = 3; i<modelLength; i++){
        let char = randomIntFromInterval(33, 122);
        model+=String.fromCharCode(char);
    }

    const name = brand+separator+model;


    // console.log(name);
    return name;
}

module.exports = renderName;