const randomIntFromInterval = require("../random");

const renderPrice = () => {
    
    const priceLength = randomIntFromInterval(1, 3);
    let price = '';
    for(let i = 0; i<priceLength; i++){
        if(i===0){
            price += randomIntFromInterval(1, 9);
        }else{
            price += randomIntFromInterval(0, 9);
        }

    }
    return +(price+0);
}
module.exports = renderPrice;