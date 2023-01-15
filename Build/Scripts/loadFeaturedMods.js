const {openInBrowser, modLoaderType} = require("../Scripts/utils")


function loadFeaturedMods(){
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

    if(data.isFeatured && index == 0) cloneNode.classList.add("featuredBorder")

    types.forEach(type => {
        const div = document.createElement("div")
        div.classList.add("loaderType", type)
        div.innerText = type

        cloneNode.querySelector(".details").appendChild(div)
    })

    data.categories.forEach(category => {
        const img = document.createElement("img")
        img.src = category.iconUrl
        img.classList.add("category")
        img.title = category.name

        cloneNode.querySelector(".details").appendChild(img)
    })

    cloneNode.querySelector("img").src = data.logo.thumbnailUrl
    cloneNode.querySelector("h1").innerText = data.name
    cloneNode.querySelector(".description").innerText = data.summary
    cloneNode.querySelector(".readMore").onclick = () => openInBrowser(data.links.websiteUrl)
    cloneNode.querySelector(".downloadCount").innerText = MoneyFormat(data.downloadCount)

    document.querySelector(".rest").appendChild(cloneNode)
}


function MoneyFormat(labelValue) 
  {
  return Math.abs(Number(labelValue)) >= 1.0e+9

       ? Math.round(Math.abs(Number(labelValue)) / 1.0e+9) + "B"

       : Math.abs(Number(labelValue)) >= 1.0e+6

       ? Math.round(Math.abs(Number(labelValue)) / 1.0e+6) + "M"

       : Math.abs(Number(labelValue)) >= 1.0e+3

       ? Math.round(Math.abs(Number(labelValue)) / 1.0e+3) + "K"

       : Math.abs(Number(labelValue));

}

module.exports = { loadFeaturedMods, createModSection}