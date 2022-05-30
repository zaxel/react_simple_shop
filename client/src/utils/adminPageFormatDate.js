export const adminPageFormatDate = (timeStamp) => {
    if(!timeStamp) return '00:00';
    let date = new Date(timeStamp);
    let year = date.getFullYear()+'';
    let month = date.getMonth() < 9 ? `0${date.getMonth()+1}` : `${date.getMonth()+ 1}`;
    let day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
    let hours = date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
    let minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
    return(`${hours}:${minutes} ${day}/${month}/${year}`);
}