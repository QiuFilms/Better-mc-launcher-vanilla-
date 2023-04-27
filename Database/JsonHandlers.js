const path = require('path')
const fs = require('fs');

function getJson(name){
    return require(path.join(__dirname, name))
}

function saveJson(name, json){
    fs.writeFileSync(path.join(__dirname, `${name}.json`), JSON.stringify(json, null, 4))
}

module.exports = {getJson, saveJson}