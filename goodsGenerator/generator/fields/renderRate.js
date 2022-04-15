const randomIntFromInterval = require("../random");

const renderRate = () => {
    
    const rate = randomIntFromInterval(0, 5);

    return rate;
}
module.exports = renderRate;