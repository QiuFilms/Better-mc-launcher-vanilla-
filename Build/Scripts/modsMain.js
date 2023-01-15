const { ipcRenderer } = require("electron");
const { connection } = require("../Scripts/utils")
const { change } = require("../Scripts/utils");
const { loadFeaturedMods , createModSection} = require("../Scripts/loadFeaturedMods");
const dropDownCreate = require("../Scripts/dropDownCreate");


if(connection()){
    loadFeaturedMods()
    dropDownCreate()
}

function search(e){
    if(e.keyCode == 13){
        const data = {
            searchFilter: e.target.value,
            loader: document.querySelector('#loaderType').value,
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


function checkType(e){
    if(e.target.value == "4471"){
        document.querySelector('#loaderType').style.display = "none"
    }else{
        document.querySelector('#loaderType').style.display = ""
    }
}