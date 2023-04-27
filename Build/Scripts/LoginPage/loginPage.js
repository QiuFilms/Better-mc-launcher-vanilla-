function login(){
    ipcRenderer.invoke('login').then((res) => {
        if(res == true){
            change("main.html")
        }
    })
}
