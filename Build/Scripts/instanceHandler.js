function createInstance(){
    const data = {
        name: document.querySelector("#name").value,
        category: document.querySelector('#category').value,
        versions:[]
    }
    
    ipcRenderer.invoke("createInstance", data).then(res => {
        
    })

    change('instances.html')
}

function getInstances(){
    ipcRenderer.invoke("instances").then(res => {
        for (const instance in res) {
            const {id, category} = res[instance]
            
            const instanceTemplate = document.querySelector("#instanceTemplate")
            const instanceTemplateClone = instanceTemplate.cloneNode(true)
            
            instanceTemplateClone.querySelector(".instanceName").innerText = instance
            instanceTemplateClone.style.display = "block"
            document.querySelector(".rest").appendChild(instanceTemplateClone)

            const versionTemplate = document.querySelector("#versionTemplate")
            const versionTemplateClone = versionTemplate.cloneNode(true)
        }
    })
}