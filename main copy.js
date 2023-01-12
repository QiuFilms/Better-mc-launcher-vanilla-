const { app, BrowserWindow, nativeTheme, Menu, MenuItem, Notification } = require('electron');
const electron  = require('electron');
const path = require('path');

const deafultAssetsDir = path.join(__dirname, 'Build')

function createWindow() {
    const win = new BrowserWindow({
        height: 635,
        width: 1015,
        minHeight:635,
        minWidth: 1015,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        },
        icon: path.join(deafultAssetsDir, 'Icons', 'Icon.png'),
        title: 'Minecraft Launcher',
    });

    nativeTheme.themeSource = "light"
    win.loadFile(path.join(deafultAssetsDir, 'Pages', 'main.html'));


    win.setThumbarButtons([
        {
          tooltip: 'button1',
          icon: path.join(deafultAssetsDir, 'Icons', 'IconHammer.png'),
          click(){ 
            console.log("Clicked")
          }
        }
    ])

    const { Client, Authenticator } = require('minecraft-launcher-core');
    const launcher = new Client();

    let opts = {
        clientPackage: null,
        authorization: Authenticator.getAuth("123"),
        root: "./mc",
        version: {
            number: "1.19.2",
            type: "release"
        },
        memory: {
            max: `8G`,
            min: `6G`
        },
        overrides: {
          detached: false,
        }
    }
    
    win.hide()
    launcher.launch(opts);
    
    launcher.on('debug', (e) => console.log(e));
    launcher.on('data', (e) => console.log(e));
    launcher.on('close', (e) => win.show());    

    win.on("resize", ()=>{
        console.log(win.getSize());
    })
}

if (process.platform === 'win32')
{
    app.setAppUserModelId("Minecraft Launcher");
}


const menu = new Menu()
menu.append(new MenuItem({
  label: 'Electron',
  submenu: [{
    role: 'help',
    accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Alt+Shift+I',
    click: () => { console.log('Electron rocks!') }
  }]
}))

Menu.setApplicationMenu(menu)




app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

