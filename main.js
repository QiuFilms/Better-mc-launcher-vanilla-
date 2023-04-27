const { app, BrowserWindow, nativeTheme, Menu, MenuItem, Notification, ipcMain, dialog } = require('electron');
const electron  = require('electron');
const path = require('path');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const createWindow = require('./Scripts/windowCreate')
const deafultAssetsDir = path.join(__dirname, 'Build')
const CurseForgeApi =  require("./Scripts/curseForgeApi")
const Database = require("./Database/DatabaseHandlers/database.js");
const { minecraftVersions } = require('./Scripts/utils');
const Account = require('./Scripts/Microsoft');
const user = new Account()

const Store = require('electron-store');
const fs = require('fs');
const {getJson, saveJson} = require('./Database/JsonHandlers');
const { instanceVersions } = require('./Scripts/instancesHandler');
const store = new Store();

const instancesPath = path.join(app.getPath('appData'), ".minecraftInstances")

//Ifs
if(!store.get('launcher')){
    store.set('launcher',{
        downloadStatus: false,
        searchFilters:{
            mods:{

            }
        }
    })
}

if(!fs.existsSync(instancesPath)){
    fs.mkdirSync(instancesPath)
}


const modsApi = new CurseForgeApi({
    api_key: "$2a$10$dEIZS2ycF/BTrJT8JzCXh.B3CV9NeLjqYPfiUON1Bi49016G2xdzy"
})


async function test(){
    const version = await minecraftVersions()
    version.versions.forEach(element => {
        if(element.type == "snapshot"){
            //console.log(`snapshot ${element.id}`);
        }else{
            //console.log(`${element.id}`);
        }

    });
}
test()

async function window(page){
    return createWindow(page)
}

if (process.platform === 'win32'){
    app.setAppUserModelId("Minecraft Launcher");
}


app.whenReady().then(async () => {
    let page = "login.html";

    if(user.restore().status){
        page = "main.html"
    }
    currentWindow = await window(page)     
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

ipcMain.handle("searchModsCF", async(e, arg) => {
    arg.gameId = 432
    arg.sortField = 2
    arg.sortOrder = "desc"
    console.log(arg);
    return await modsApi.searchMods(arg)
})

ipcMain.handle("searchModsModrinth", async(e, arg) => {
    const url = new URL("https://api.modrinth.com/v2/search")

    const data = {
        ...arg,
        index: "relevance",
    }

    for (const [key, value] of Object.entries(data)) {
        if(typeof value !== "undefined" || value !== ""){
            url.searchParams.set(key, value)
        }
    }

    const resolve = await fetch(url.toString()).then(res => res.json()).then(res => {
        return res
    })

    return await resolve.hits
})

ipcMain.handle("addToList", async(e, arg) => {
    const List = new Database('list')
    List.push("content",arg)
    return "Success"
})


ipcMain.handle("getModFiles", async(e, arg) => {
    const [modId, fileId, parameters] = arg
    return await modsApi.getModFile({
        modId: modId, 
        fileId:fileId,
        parameters:parameters
    })
})

ipcMain.handle("login", async() => {
    const status = await user.login()
})

ipcMain.handle("profile", async() => {
    return {
        profile: user.profile, 
        xProfile: user.xProfile
    }
})

ipcMain.handle("createInstance", (e, arg) => {
    const {name, category} = arg
    const instances = getJson("instances")
    
    if(!instances.instances.hasOwnProperty(name)){
        fs.mkdirSync(path.join(instancesPath, name))
        
        instances.instances[name] = {
            category: category,
            id: `#${Date.now()}`,
            path: path.join(instancesPath, name)
        }

        console.log(instances);
        saveJson("instances", instances)

        console.log(1);

        return {
            status: 1,
            message: "Instance succesfully created"
        }
    }

    return {
        status: 0,
        message: "Name already in use"
    }
})

ipcMain.handle("instances", () => {
    const instances = getJson("instances")
    return instances.instances
})


