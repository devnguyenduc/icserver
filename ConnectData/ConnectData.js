/*
        Mục đích của file:
    -File xây dựng 1 class chỉ dùng để ConnectData của người dùng.
    -Vì xây dựng 1 hệ thống Real Time nên việc phân tích riêng này vô cùng quan trọng.
    -Với tính chất lưu trữ và xử lý hơn 100 thuộc tính của người dùng class ConnectDataUser 
    luôn phải hoạt động 1 cách tối ưu và trơn tru trong quá trình thực hiện.
    -File được xây dựng gồm 2 phân:
    + Phần chưa hoàn chỉnh, lưu trữ và xử lý file .Json trước khi upload lên DB.
    + Phần hoàn chỉnh (chưa debug) đã kết nối thành công cơ sở dữ liệu.
*/

//Import Lib
//Define Data
// const data = "Data/User/"; // Position
// const db = ".json";
//Function 

function decodeBase64(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};

    if (matches.length !== 3) {
        return new Error('Lỗi ...');
    }

    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');

    return response;
}

class ConnectData {
    constructor() {
        this.collection = "";
        this.error = "null";
        this.success = "ok";
        this.signIn = null;
        this.dbColection = "";
    }
    setDbCollection(db){
        this.dbColection = db;
    }
    setCollection(collection){
        this.collection = collection;
    }
    async createCollections(new_collection){
        try{
            var db = await this.dbColection.Get();
            db.createCollection(new_collection,(err,res)=>{
                if(err){
                    console.log(err);
                    return this.error;
                }else{
                    return this.success;
                }
            })
        }catch(e){
            return this.error;
        }
    }

    // Đọc danh sách tất cả người dùng
    async get() {
        try {
            var db = await this.dbColection.Get();
            var result = await db.collection(this.collection).find({}).toArray();
            return result;
        } catch (e) {
            console.log("=============================ERROR=============================");
            console.log(e);
            console.log("=============================ERROR=============================");
            return this.error;
        }
    }
    test(){
        return this.success;
    }
    // Đọc 1 trong database;
    async gets(where){
        try{
            var db = await this.dbColection.Get();
            var result = await db.collection(this.collection).find(where).toArray();
            return result;
        }catch(e){
            console.log("=============================ERROR=============================");
            console.log(e);
            console.log("=============================ERROR=============================");
            return this.error;
        }
    }
    // Tạo 1 tài khoản vào cơ sở dữ liệu
    async create(where){
        try{
            var db = await this.dbColection.Get();
            var result = await db.collection(this.collection).insert(where);
            return this.success;
        }catch(e){
            console.log("=============================ERROR=============================");
            console.log(e);
            console.log("=============================ERROR=============================");
            return this.error;
        }
    }

    // Sử dụng hàm tổng quát để xây dựng tính năng update cho database. Cần 1 hàm con để mô tả
    // từng tính năng một.
    async update(data,newData){
        try{
            var db = await this.dbColection.Get();
            var result = await db.collection(this.collection).update(data,newData);
            return this.success;
        }catch(e){
            console.log("=============================ERROR=============================");
            console.log(e);
            console.log("=============================ERROR=============================");
            return this.error;
        }
        
    }
    
    //Tương tự như hàm update.
    async remove(data){
        try{
            var db = await this.dbColection.Get();
            var result = await db.collection(this.collection).remove(data);
            return this.success;
        }catch(e){
            console.log("=============================ERROR=============================");
            console.log(e);
            console.log("=============================ERROR=============================");
            return this.error;
        }
    }
}

module.exports = new ConnectData;