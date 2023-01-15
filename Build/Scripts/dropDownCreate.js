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
        res.data.forEach(version => {
            const option = document.createElement('option')
            option.value = version.versionString
            option.innerText = version.versionString
            document.querySelector('#version').appendChild(option)
        });
    })

    for (const key in loaderType) {
        const option = document.createElement('option')
        option.value = loaderType[key]
        option.innerText = key
        document.querySelector('#loaderType').appendChild(option)
    }

    for (const key in classId) {
        const option = document.createElement('option')
        option.value = classId[key]
        option.innerText = key
        document.querySelector('#type').appendChild(option)
    }
}

module.exports = dropDownCreate