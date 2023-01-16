const Low = require('lowdb')
const FileSync  = require('lowdb/adapters/FileSync')


const path = require("node:path")
const { fileURLToPath } = require("node:url")


//const __dirname = path.dirname(fileURLToPath(import.meta.url));
const basePath = path.join(__dirname, "..")

class Database{
    constructor(dbName){
        this.dbName = dbName
        this.file = path.join(basePath, `${dbName}.json`)
        const adapter = new FileSync(this.file)
        const db = new Low(adapter);
        this.db = db
    }

    async push(key, value){
        const { db } = this
        const element = db.get(key).value()

        if(element.indexOf(value) === -1){
            db.get(key).push(value).write()
        } 

        return db.get(key).value()
    }

    async unshift(key, value){
        const { db } = this
        const element = db.get(key).value()

        if(element.indexOf(value) === -1){
            db.get(key).unshift(value).write()
        } 

        return db.get(key).value()
    }

    async pop(key){
        const { db } = this

        db.get(key).pop().write()
        return db.get(key).value()
    }

    async shift(key){
        const { db } = this

        db.get(key).shift().write()
        return db.get(key).value()
    }

    async remove(key, value){
        const { db } = this
        const index = db.get(key).value().indexOf(value)

        db.get(key).splice(index, 1).write()
        return db.get(key).value()
    }

    async get(key){
        const { db } = this
        return db.get(key).value()
    }
}

module.exports = Database