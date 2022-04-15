const {Brands, BrandsSeparators} = require("./brands");

const makeDevice = (name) => {
    let device = {
        name,
        price: 50,
        rate: 4.2,
        brandId: 10,
        typeId: 5,
        img: 'image.jpg',
        info:
            [
                {
                    title: 'size',
                    description: 'L'
                },
                {
                    title: 'color',
                    description: 'black'
                },
            ]
    }
    return device;
}
const randomIntFromInterval = (min, max) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

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


const create = (amount) => {
    const items = [];
    for (let i = 1; i < amount; i++) {
        const name = renderName();
        const device = makeDevice(name);

        items.push(device);
    }


    return items;
}

module.exports = create;