const { ipcRenderer } = require("electron/renderer");

function openInBrowser(link){
    require("electron").shell.openExternal(link)
}

function change(page){
    ipcRenderer.send("change", page)
}

function connection(){
    return navigator.onLine
}

function modLoaderTypeCF(data){
    let type = [];

    data.latestFiles.forEach(element => {
        element.gameVersions.forEach(version => {
            if(version == "Fabric"){
                type.push("Fabric")
            }

            if(version == "Forge"){
                type.push("Forge")
            }
        });
    });

    data.latestFilesIndexes.forEach(element => {
        if(element.modLoader == 4){
            type.push("Fabric")
        }

        if(element.modLoader == 1){
            type.push("Forge")
        }
    })

    return [...new Set(type)].sort()
}

function modLoaderTypeModrinth(data){
    const modLoaders = []

    if(data.includes("fabric")){
        modLoaders.push("fabric")
    }

    if(data.includes("forge")){
        modLoaders.push("forge")
    }

    return modLoaders
}


module.exports = {openInBrowser, connection, modLoaderTypeCF, modLoaderTypeModrinth, change}