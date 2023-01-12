function openInBrowser(link){
    require("electron").shell.openExternal(link)
}

function connection(){
    return navigator.onLine
}

function modLoaderType(data){
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

module.exports = {openInBrowser, connection, modLoaderType}