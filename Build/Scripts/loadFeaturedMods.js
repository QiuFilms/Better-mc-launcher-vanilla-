const {openInBrowser, connection} = require("../Scripts/utils")

if(connection()){
    ipcRenderer.invoke('getFeaturedMods').then((res) => {
        createModSection(res.data.featured)
    })
}


function createModSection(data){
    const node = document.querySelector("#template > .ModMain")
    const cloneNode = node.cloneNode(true)
    console.log(data[0].downloadCount)

    cloneNode.querySelector("img").src = data[0].logo.thumbnailUrl
    cloneNode.querySelector("h1").innerText = data[0].name
    cloneNode.querySelector(".description").innerText = data[0].summary
    cloneNode.querySelector(".readMore").onclick = () => openInBrowser(data[0].links.websiteUrl)
    
    document.querySelector(".rest").appendChild(cloneNode)
    //console.log(cloneNode);
}
