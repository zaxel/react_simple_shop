const randomIntFromInterval = require("../random");
const Infos = require("../store/info");

const renderInfo = () => {
    
    const info = [];
    const infoRowAmount = randomIntFromInterval(0, 13);
    for(let i = 0; i<infoRowAmount; i++){
        const infoRow = Infos[i];
        info.push(infoRow);
    }
    return info;
}
module.exports = renderInfo;