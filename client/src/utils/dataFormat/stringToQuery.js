export const stringToQuery = (string) => {
    if(!string)return;
    return string.toLowerCase().replace(/\?$/g, "").replace(/\s/g, "-");
}