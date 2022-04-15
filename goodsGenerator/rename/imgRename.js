const path = require('path');
const fs = require('fs');
require('dotenv').config();
const HASH = process.env.PICTURE_NAME_HASH;


const imgFolderPath = path.join(__dirname, '..', 'imgRename');
console.log(imgFolderPath)
let i = 0;
const rename = (inputName, outputName) => {
    fs.rename(inputName, outputName, (error) => {
        if (error) {
            throw error
        }
        else {
            process.stdout.write(".");
        }
    });
}

const renameFiles = (ext) => {
    fs.readdirSync(imgFolderPath).forEach(fileName => {
        rename(path.join(imgFolderPath, fileName), path.join(imgFolderPath, HASH + i++ + ext))
    })
    console.log(i, ' files renamed');

}

module.exports = renameFiles;