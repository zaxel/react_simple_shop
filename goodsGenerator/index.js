const rename = require('./rename/imgRename');
const create = require('./generator/createItems');

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
