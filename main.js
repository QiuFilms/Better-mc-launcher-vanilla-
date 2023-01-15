const { app, BrowserWindow, nativeTheme, Menu, MenuItem, Notification, ipcMain } = require('electron');
const electron  = require('electron');
const path = require('path');
const createWindow = require('./Scripts/windowCreate')
const deafultAssetsDir = path.join(__dirname, 'Build')
const CurseForgeApi =  require("./Scripts/curseForgeApi")
const Database = require("./Database/DatabaseHandlers/database.js");
const { minecraftVersions } = require('./Scripts/utils');


const modsApi = new CurseForgeApi({
    api_key: "$2a$10$dEIZS2ycF/BTrJT8JzCXh.B3CV9NeLjqYPfiUON1Bi49016G2xdzy"
})


async function test(){
    //const res = await modsApi.getVersions("1.19.2")
}
//test()

async function window(page){
    return createWindow(page)
}

if (process.platform === 'win32'){
    app.setAppUserModelId("Minecraft Launcher");
}

app.whenReady().then(async () => {
    currentWindow = await window("main.html") 
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});


ipcMain.on("change", (e, page) => {
    currentWindow.loadFile(path.join(deafultAssetsDir, 'Pages', page));
})

ipcMain.handle("getFeaturedMods", async() => {
    return await modsApi.getFeaturedMods({
        gameId: 432,
    })
})

ipcMain.handle("getMinecraftVersions", async() => {
    return minecraftVersions()
})

ipcMain.handle("getCurseForgeVersions", async() => {
    return await modsApi.getVersions()
})

ipcMain.handle("searchMods", async(e, arg) => {
    arg.gameId = 432
    arg.sortField = 2
    arg.sortOrder = "desc"
    console.log(arg);
    return await modsApi.searchMods(arg)
})