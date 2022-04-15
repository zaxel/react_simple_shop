const renderName = require("./fields/renderName");
const renderPrice = require("./fields/renderPrice");
const makeDevice = require("./makeDevice");










const create = (amount) => {
    const items = [];
    for (let i = 1; i < amount; i++) {
        const name = renderName();
        const price = renderPrice();
        const device = makeDevice(name, price);

        items.push(device);
    }


    return items;
}

module.exports = create;