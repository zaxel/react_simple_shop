const randomIntFromInterval = require("../random");
const Types = require("../store/types");

const renderTypeId = () => {
    const typeArrId = randomIntFromInterval(0, Types.length-1);
    const typeId = Types[typeArrId]; 
    return typeId;
}
module.exports = renderTypeId;