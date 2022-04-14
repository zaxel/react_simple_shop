const rename = require('./imgRename');
const create = require('./createItems');

const fileExtension = '.jpg'

const renameImg = false;
const createItems = true;

if(renameImg){
    rename(fileExtension);
}
if(createItems){
    create();
}
