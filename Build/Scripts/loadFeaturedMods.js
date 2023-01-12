const {openInBrowser, connection, modLoaderType} = require("../Scripts/utils")

if(connection()){
    ipcRenderer.invoke('getFeaturedMods').then((res) => {
        for (const key in res.data.featured) {
            createModSection(res.data.popular[key], key)
        }
    })
}


function createModSection(data, index){
    const types = modLoaderType(data)
    const node = document.querySelector("#template > .ModMain")
    const cloneNode = node.cloneNode(true)
    console.log(data.downloadCount)

    if(data.isFeatured && index == 0) cloneNode.classList.add("featuredBorder")

    types.forEach(type => {
        const div = document.createElement("div")
        div.classList.add("loaderType", type)
        div.innerText = type

        cloneNode.querySelector(".details").appendChild(div)
    })

    cloneNode.querySelector("img").src = data.logo.thumbnailUrl
    cloneNode.querySelector("h1").innerText = data.name
    cloneNode.querySelector(".description").innerText = data.summary
    cloneNode.querySelector(".readMore").onclick = () => openInBrowser(data.links.websiteUrl)
    
    document.querySelector(".rest").appendChild(cloneNode)
    //console.log(cloneNode);
}
