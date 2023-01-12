function openInBrowser(link){
    require("electron").shell.openExternal(link)
}

function connection(){
    return navigator.onLine
}

module.exports = {openInBrowser, connection}