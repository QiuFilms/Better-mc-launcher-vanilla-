const { BrowserWindow, nativeTheme, dialog } = require('electron')
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

    win.on("close", async (e) => {
        // e.preventDefault()
        // const { response } = await dialog.showMessageBox(win, {
        //     type: 'question',
        //     title: '  Confirm  ',
        //     message: 'Are you sure that you want to close this window?',
        //     buttons: ['Yes', 'No'],
        //   })
        
        //   response === 0 && win.destroy()
    })
    
    return win
}

module.exports = createWindow