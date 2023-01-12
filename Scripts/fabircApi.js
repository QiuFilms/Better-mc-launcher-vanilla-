const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

class FabricApi{
    constructor(){
        this.baseUrl = "https://meta.fabricmc.net/"
    }

    /**
     * @param {string} mcVersion 
    */

    async loaderWithVersion(mcVersion){
        return fetch(`${this.baseUrl}/v2/versions/loader/${mcVersion}`, {method: 'GET'})
        .then(async (res) => {
            const [result]= await res.json();

            const loader = {
                loaderVersion: result.loader.version,
                mcVersion: result.intermediary.version,
                loaderStability: result.loader.stable
            }
        
            return {fullResponse: result, loader: loader};
        })
    }

    /**
     * @param {string} mcVersion 
     * @param {string} loaderVersion 
     * 
    */

    async fabricJson(mcVersion, loaderVersion){
        return fetch(`${this.baseUrl}/v2/versions/loader/${mcVersion}/${loaderVersion}/profile/json`, {method: 'GET'})
        .then((res) => {
            return res.json();
        })
    }


    async versions(){
        return fetch(`${this.baseUrl}/v2/versions/game`, {method: 'GET'})
        .then((res) => {
            return res.json();
        })
    }
}

const api = new FabricApi()

async function test(){
    const {fullResponse, loader} = await api.loaderWithVersion("1.19.2")
    const json = await api.fabricJson(loader.mcVersion, loader.loaderVersion)
    console.log(json.id);
}

test()

module.exports = FabricApi