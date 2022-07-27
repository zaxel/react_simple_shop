export const idShortener = (id, length = 4) => {
    if(!id) return '9999';
    id = String(id);
    if(id.length<length)
      length = id.length;
    return id.substr(0, length)+'..';
}