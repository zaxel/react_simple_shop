const makeDevice = (name, price, rate, brandId, typeId, img, info) => {
    let device = {
        name,
        price,
        rate,
        brandId,
        typeId,
        img,
        info
    }
    return device;
}
module.exports = makeDevice;