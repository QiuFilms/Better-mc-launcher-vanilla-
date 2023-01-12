const { ipcRenderer } = require("electron");

function change(page){
    ipcRenderer.send("change", page)
}