fs = require('fs');
const path = require('path');

const writeToFile = (data) => {
    const filePath = path.join(__dirname, '..', 'outputList', 'devices.txt');
    fs.writeFile(filePath, data, function (err) {
        if (err) 
            return console.log(err);
        console.log('file created');
    });
}

module.exports = writeToFile;