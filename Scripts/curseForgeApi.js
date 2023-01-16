const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { URLSearchParams } = require('url')

class CurseForgeApi{
    constructor(api_key){
        this.gameId = 432
        this.baseUrl = "https://api.curseforge.com"
        this.headers = {
            'Content-Type':'application/json',
            'Accept':'application/json',
            'x-api-key':api_key.api_key
          };
    }

    async getGames({gameId}){          
        return fetch(`${this.baseUrl}/v1/games/${gameId}/version-types`, {method: 'GET', headers: this.headers})
        .then((res) => {
            return res.json();
        })
    }

    async getCategories({gameId}){
        return fetch(`${this.baseUrl}/v1/categories?gameId=${gameId}`, {method: 'GET', headers: this.headers})
        .then((res) => {
            return res.json();
        })
    }


    /**
     * @param {Object} parameters Available parameters: 
     * {gameId: ...}
     */

    async searchMods(parameters){
        const paramsObj = new URLSearchParams()
        for (const [key, value] of Object.entries(parameters)) {
            if(typeof value !== "undefined" || value !== ""){
                paramsObj.append(key,value)
            }
        }

        return fetch(`${this.baseUrl}/v1/mods/search?` + paramsObj.toString(), {method: 'GET', headers: this.headers})
        .then((res) => {
            return res.json();
        })
    }


    /**
     * @param {Object} parameters Available parameters: 
     * {gameId: number, excludedModIds: array<number>, gameVersionTypeId: number}
     * @return {Object} Response object
     */

    async getFeaturedMods(parameters){
        return fetch(`${this.baseUrl}/v1/mods/featured`, {method: 'POST', headers: this.headers, body:JSON.stringify(parameters)})
        .then((res) => {
            return res.json();
        })
    }

    async getModFile({modId, fileId = "", params = {}}){
        const paramsObj = new URLSearchParams()
        for (const [key, value] of Object.entries(parameters)) {
            if(typeof value !== "undefined" || value !== ""){
                paramsObj.append(key,value)
            }
        }
        return fetch(`${this.baseUrl}/v1/mods/${modId}/files/${fileId}?` + paramsObj.toString(), {method: 'GET', headers: this.headers})
        .then((res) => {
            return res.json();
        })
    }

    async getVersions(version = ""){
        return fetch(`${this.baseUrl}/v1/minecraft/version/${version}`, {method: 'GET', headers: this.headers})
        .then((res) => {
            return res.json();
        })
    }
}

module.exports = CurseForgeApi