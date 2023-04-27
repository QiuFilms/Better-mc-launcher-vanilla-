const loaderType = {
    Forge: 1,
    Fabric: 4
}

const classId = {
    ModPack: 4471,
    Mod: 6
}

function dropDownCreate(){
    ipcRenderer.invoke('getCurseForgeVersions').then((res) => {
        res.forEach(version => {
            const option = document.createElement('option')
            option.value = version.versionString
            option.innerText = version.versionString
            document.querySelector('#version').appendChild(option)
        });
    })
}

module.exports = dropDownCreate