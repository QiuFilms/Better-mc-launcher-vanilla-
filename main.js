const { app, BrowserWindow, nativeTheme, Menu, MenuItem, Notification, ipcMain } = require('electron');
const electron  = require('electron');
const path = require('path');
const createWindow = require('./Scripts/windowCreate')
const deafultAssetsDir = path.join(__dirname, 'Build')
const CurseForgeApi =  require("./Scripts/curseForgeApi")
let currentWindow


const modsApi = new CurseForgeApi({
    api_key: "$2a$10$dEIZS2ycF/BTrJT8JzCXh.B3CV9NeLjqYPfiUON1Bi49016G2xdzy"
})


async function test(){
    const res = await modsApi.getVersions("1.19.2")

    console.log(res);
}
test()

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
        gameId: 432
    })
})