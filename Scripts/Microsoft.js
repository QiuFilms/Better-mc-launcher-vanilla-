const msmc = require("msmc");
const path = require('path');
const deafultAssetsDir = path.join("./", 'Build')
const Store = require('electron-store');
const store = new Store();

class Account{
    constructor(){
        this.profile = null
        this.xProfile = null

        this.info = null
        //store.delete('restore')
    }


    async login(){
        return msmc.fastLaunch("electron", 
        () => {}
        , "select_account", {
            center: true,
            width: 600,
            height: 700,
            icon:path.join(deafultAssetsDir, 'Icons', 'IconWin.png')
        }).then(async result => {
            if (msmc.errorCheck(result)){
                return {type: "error", reason: result.reason};
            }

            this.profile = result.profile
            this.info = result
            this.xProfile = await result.getXbox()

            store.set("restore", {
                info: result,
                xProfile: this.xProfile
            })

            return {type: true, result: result}
        }).catch(reason=>{
            return {type: "error", reason: reason};
        })
    }

    async refresh(){
        if(this.profile){
            const result = await msmc.refresh(this.profile)

            this.profile = result.profile
            this.info = result
            this.xProfile = await result.getXbox()

            return {type: "success", result: result}
        }
    }

    restore(){
        if(typeof store.get('restore') !== "undefined"){
            const {info, xProfile} = store.get("restore")

            this.info = info
            this.profile = info.profile
            this.xProfile = xProfile

            return {status: true}
        }

        return {status: false}
    }

}

module.exports = Account