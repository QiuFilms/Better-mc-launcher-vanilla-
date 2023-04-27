const fs = require('fs');

function instanceVersions(path){
    const files = fs.readdirSync(path)
    console.log(files);
}

module.exports = { instanceVersions }