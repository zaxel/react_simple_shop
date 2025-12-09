export const adminPageFormatDate = (timeStamp) => {
    if(!timeStamp) return '00:00';
    let formatter = new Intl.DateTimeFormat("en-GB", {
        hour: "numeric",
        minute: "numeric",
        day: "numeric",
        month: "numeric",
        year: "numeric",
      });
    return formatter.format(timeStamp)
}
export const deviceBuyContainerFormatDate = timeStamp => {
  let formatter = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  return formatter.format(timeStamp)
}