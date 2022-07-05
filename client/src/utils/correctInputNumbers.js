export const correctRateRange = (rate) => {
    if(rate < 0 || rate === ''){
        return 0;
    }else if(rate > 5){
        return 5;
    }
    return rate !== '' &&  Number.parseInt(rate * 10)/10;
}
export const correctPriceRange = (price) => {
    if(price < 0 || price === ''){
        return 0;
    }
    Number.parseInt(price) !== +price && price !== '' && alert('only integer numbers allowed!')
    return price !== '' &&  Number.parseInt(price);
}