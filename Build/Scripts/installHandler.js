const { ipcRenderer } = require("electron");

function openPopUp(id, name, loaders){
    const node = document.querySelector("#installWindowDivTemplate > .installWindowDiv")
    const cloneNode = node.cloneNode(true)

    ipcRenderer.invoke('getModFiles', ([id, ""])).then((res) => {
        cloneNode.querySelector(".files").replaceChildren()
        res.data.forEach((element, index) => {
            console.log(element);
            const date = new Date(element.fileDate)
            const clone = document.querySelector("#installWindowDivTemplate .file").cloneNode(true)
            clone.querySelector(".fileName").innerText = element.fileName
            clone.querySelector(".fileDate").innerText = `${date.getDate() < 10 ? "0"+date.getDate() : date.getDate()}-${date.getMonth()+1 < 10 ? "0"+(date.getMonth()+1) : date.getMonth()+1}-${date.getFullYear()}`
            
            if(index == 0) clone.classList.add('latest')

            clone.onchange = null
            cloneNode.querySelector(".files").appendChild(clone)
        });
    })

    const versions = document.querySelector("#version").cloneNode(true)
    versions.onchange = null
    versions.id = "installationVersion"
    versions.removeChild(versions.querySelectorAll('option')[0]);
    cloneNode.querySelector(".instVer").append(versions)

    if(loaders.lenght != -1){
        const loaderSelect = document.createElement("select")
        loaderSelect.id = "installationLoader"
        loaders.forEach(loader => {
            const loaderOption = document.createElement("option")
            loaderOption.value = loader
            loaderOption.innerText = loader
            loaderSelect.appendChild(loaderOption)
        })
        cloneNode.querySelector(".instLoad").append(loaderSelect)
    }else{
        const loader = document.querySelector("#loaderType").cloneNode(true)
        loader.id = "installationLoader"
        loader.removeChild(loader.querySelectorAll('option')[0]);

        cloneNode.querySelector(".instLoad").append(loader)
    }

    cloneNode.style.display = "flex"
    document.querySelector('.rest').prepend(cloneNode)
}

function closePopUp(){
    //document.body.remove(document.querySelector(".installWindowDiv"))
    const element = document.querySelector(".installWindowDiv");
    element.remove();
}

function loadModOption(){
    
}

module.exports = { openPopUp, closePopUp }