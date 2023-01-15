const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


async function minecraftVersions(){
    return fetch("https://launchermeta.mojang.com/mc/game/version_manifest.json").then(res => res.json())
}

module.exports = {minecraftVersions}