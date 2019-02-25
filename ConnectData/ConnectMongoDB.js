var MongoClient = require('mongodb').MongoClient;

var DbConnection = function () {
    var db = null
    var instance = 0
    async function DbConnect() {
        try {
            //var url = `mongodb://localhost:27017`
            var url=`mongodb://admin:revivalsand97@ds247698.mlab.com:47698/incloudproject`
            var _db = await MongoClient.connect(url)
            //return _db.db(`Ban_Dien_thoai`)
            return _db.db(`incloudproject`)
        } catch (Loi) {
            return Loi
        }
    }

    async function Get() {
        try {
            instance++
            console.log(`số lượng gọi đến kết nối CSDL: ${instance} lần`)

            if (db != null) {
                console.log(`kết nối CSDL đã tồn tại`)
                return db
            } else {
                console.log(`tạo một kết nối CSDL mới`)
                db = await DbConnect()
                return db
            }
        } catch (Loi) {
            return Loi
        }
    }

    return {
        Get: Get
    }
}


module.exports = DbConnection();