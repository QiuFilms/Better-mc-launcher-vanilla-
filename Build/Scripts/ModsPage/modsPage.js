const { ipcRenderer } = require("electron");
const { connection, change } = require("../Scripts/utils")
const { loadFeaturedMods , createModSectionCF, createModSectionModrnith} = require("../Scripts/loadFeaturedMods");
const dropDownCreate = require("../Scripts/SharedComponents/dropDownCreate");
const { closePopUp } = require("../Scripts/installHandler");

if(connection()){
    loadFeaturedMods()
    dropDownCreate()
}

function searchMods(e, update){
    if(e?.keyCode === 13 || update){
        const source = document.querySelector('.source .activeSource').id

        if(source === "CurseForge"){
            searchModsCF()
        }else{
            searchModsModrinth()
        }
    }
}

function searchModsCF(){
    const loaderType = {
        Forge: 1,
        Fabric: 4
    }
    
    const data = {
        searchFilter: document.querySelector('.searchInput').value,
        modLoaderType: loaderType?.[document.querySelector('#loaderType')?.value],
        gameVersion: document.querySelector('#version')?.value,
    }

    ipcRenderer.invoke('searchModsCF', (data)).then((res) => {
        document.querySelector('.rest').replaceChildren()
        for (const key in res) {
            createModSectionCF(res[key], key)
        }
    })

    document.querySelector('.outerScroll').scroll({top:0,behavior:'smooth'})
}


function searchModsModrinth(){
    const facets = []
    facets.push(["project_type:mod"])

    if(document.querySelector('#version')?.value){
        const version = document.querySelector('#version').value

        facets.push([`versions:${version}`])
    }

    if(document.querySelector('#loaderType')?.value){
        const loaderType = document.querySelector('#loaderType').value
        facets.push([`categories:${loaderType}`])
    }

    const data = {
        facets : JSON.stringify(facets)
    }

    if(document.querySelector('.searchInput')?.value){
        const query = document.querySelector('.searchInput').value
        data.query = query
    }


    ipcRenderer.invoke('searchModsModrinth', (data)).then((res) => {
        document.querySelector('.rest').replaceChildren()
        
        for (const key in res) {
            createModSectionModrnith(res[key], key)
        }
    })
}




function updateStatus(){
    searchMods(0, true)
}

function addToList(id){
    ipcRenderer.invoke('addToList', id).then((res) => {
        alert(res)
    })
}

function changeSource(id){
    if(id === "sourceCurseForge"){
        document.querySelector(`#${id} > img`).classList.add('activeSource')
        document.querySelector(`.sourceModrinth > img`).classList.remove('activeSource')
        updateStatus()
    }else{
        document.querySelector(`#${id} > img`).classList.add('activeSource')
        document.querySelector(`.sourceCurseForge > img`).classList.remove('activeSource')
        document.querySelector('#loaderType').style.display = ""
        updateStatus()
    }
}