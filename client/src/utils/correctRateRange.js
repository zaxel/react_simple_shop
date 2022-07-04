export const correctRateRange = (rate) => {
    if(rate < 0){
        return 0;
    }else if(rate > 5){
        return 5;
    }
    return rate !== '' &&  Number.parseInt(rate * 10)/10;
}