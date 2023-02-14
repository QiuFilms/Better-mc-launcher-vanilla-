const { ipcRenderer } = require("electron");
const { connection, modLoaderType } = require("../Scripts/utils")
const { change } = require("../Scripts/utils");
const { loadFeaturedMods , createModSection} = require("../Scripts/loadFeaturedMods");
const dropDownCreate = require("../Scripts/dropDownCreate");
const { closePopUp } = require("../Scripts/installHandler")


if(connection()){
    loadFeaturedMods()
    dropDownCreate()
}

function search(e, o){
    if(e.keyCode == 13 || o){
        const modLoaderType = document.querySelector('#loaderType').value
        const data = {
            searchFilter: document.querySelector('.searchInput').value,
            modLoaderType: document.querySelector('#type').value != "4471" ? parseInt(modLoaderType): "",
            gameVersion: document.querySelector('#version') ? document.querySelector('#version').value: 1,
            classId: document.querySelector('#type').value
        }

        ipcRenderer.invoke('searchMods', (data)).then((res) => {
            document.querySelector('.rest').replaceChildren()
            for (const key in res.data) {
                console.log(res.data[key]);
                createModSection(res.data[key], key)
            }
        })
        document.querySelector('.outerScroll').scroll({top:0,behavior:'smooth'})
    }

}


function updateStatus(e){
    if(e.target.value == "4471"){
        document.querySelector('#loaderType').style.display = "none"
    }else{
        document.querySelector('#loaderType').style.display = ""
    }
    search(0, true)
}

function addToList(id){
    ipcRenderer.invoke('addToList', id).then((res) => {
        alert(res)
    })
}