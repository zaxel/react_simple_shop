const rename = require('./imgRename');
const create = require('./createItems');

const fileExtension = '.jpg'

const itemsNumber = 10;

const renameImg = false;
const createItems = true;

if(renameImg){
    rename(fileExtension);
}
if(createItems){
    console.log(create(itemsNumber));
}
