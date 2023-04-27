ipcRenderer.invoke('profile').then((res) => {
    const {profile, xProfile} = res
    document.querySelector(".playerName").innerText = profile.name
    document.querySelector(".accountAvatar").src = xProfile.profilePictureURL
})