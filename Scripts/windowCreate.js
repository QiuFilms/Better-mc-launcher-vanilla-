const { BrowserWindow, nativeTheme } = require('electron')
const path = require('path');
const deafultAssetsDir = path.join("./", 'Build')

const createWindow = (page, size) => {
    const win = new BrowserWindow({
        height: 635,
        width: 1015,
        minHeight:635,
        minWidth: 1015,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false
        },
        icon: path.join(deafultAssetsDir, 'Icons', 'IconWin.png'),
        title: 'Minecraft Launcher',
    });

    nativeTheme.themeSource = "light"
    win.loadFile(path.join(deafultAssetsDir, 'Pages', page));
    win.setBackgroundColor("#1E1E1E")

    win.on("resize", ()=>{
        console.log(win.getSize());
    })

    return win
}

module.exports = createWindow