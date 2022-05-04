const rename = require('./rename/imgRename');
const create = require('./generator/createItems');
const writeToFile = require('./generator/writeToFile');

const fileExtension = '.jpg'

const itemsNumber = 800;

const renameImg = false;
const createItems = true;

if(renameImg){
    rename(fileExtension);
}
if(createItems){
    const devices = create(itemsNumber, fileExtension);
    writeToFile(JSON.stringify(devices));
}
