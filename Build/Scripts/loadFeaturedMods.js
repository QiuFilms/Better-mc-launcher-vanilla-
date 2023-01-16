const { openInBrowser, modLoaderType } = require("../Scripts/utils")
const { openPopUp } = require("../Scripts/installHandler")


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

    if(data.isFeatured) cloneNode.classList.add("featuredBorder")

    if(types.length != 0){
        types.forEach(type => {
            const div = document.createElement("div")
            div.classList.add("loaderType", type)
            div.innerText = type
    
            cloneNode.querySelector(".details").appendChild(div)
        })
    }else{
        const div = document.createElement("div")
        div.classList.add("loaderType", "NotSpecified")
        div.innerText = "Unknown"

        cloneNode.querySelector(".details").appendChild(div)
    }


    const categoryNames =[]

    data.categories.forEach(category => {
        if(categoryNames.indexOf(category.name) == -1){
            const img = document.createElement("img")
            img.src = category.iconUrl
            img.classList.add("category")
            img.title = category.name

            cloneNode.querySelector(".details").appendChild(img)
        }
        categoryNames.push(category.name)
    })

    cloneNode.querySelector("img").src = data.logo.thumbnailUrl
    cloneNode.querySelector("h1").innerText = data.name
    cloneNode.querySelector(".description").innerText = data.summary
    cloneNode.querySelector(".readMore").onclick = () => openInBrowser(data.links.websiteUrl)
    cloneNode.querySelector(".downloadCount").innerText = MoneyFormat(data.downloadCount)
    cloneNode.querySelector(".install").onclick = () => openPopUp(data.id, data.name, types)

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