var MongoClient = require('mongodb').MongoClient;

class dbConnection {
    constructor(){
        this.db = null;
        this._dbase = null;
        this.error = "Can't connect this database";
        this.instance = 0;
    }
    setUrl(_url){
        this.url = _url;
    }
    setDb(_db){
        this._db = _db;
    }
    setConnect(_url,_db){
        this.url = _url;
        this._db = _db;
    }
    async dbConnect(){
        try{
            this._dbase = await MongoClient.connect(this.url);
            return this._dbase.db(this._db);
        }catch(e){
            console.log(e);
            return this.error;
        }
    }
    async Get(){
        try {
            this.instance++;
            console.log(`Times call DB:${this.instance}`);
            if(this.db != null){
                console.log("Database have aldready connected !!!");
                return this.db;
            }else{
                console.log("Create a New Database");
                this.db = await this.dbConnect();
                return this.db;
            }
        }catch(e){
            console.log(e);
            return this.error;
        }
    }
}

module.exports = new dbConnection;