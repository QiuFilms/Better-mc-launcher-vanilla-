ipcRenderer.invoke('profile').then((res) => {
    console.log(res);
    const {profile, profilePictureURL} = res
    document.querySelector(".playerName").innerText = profile.name
    document.querySelector(".accountAvatar").src = profilePictureURL
})