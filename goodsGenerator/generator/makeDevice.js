const makeDevice = (name, price) => {
    let device = {
        name,
        price,
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
module.exports = makeDevice;