class ConnectDataUser{
    constructor(){
        this.login = false;
        this.check = "userchecked";
        this.dbuser = "userinfomation";
        this.idConnect = null;
        this.admin = false;
        this.id = 1000000;
    }
    showError(){
        console.log("=============================ERROR=============================");
        console.log(e);
        console.log("=============================ERROR=============================");
    }
    setDbCollection(db){
        this.dbCollection = db;
    }
    
    isAdmin(){
        if(this.admin = true){
            return true;
        }else{
            return false;
        }
    }
    //User
    isUser(){
        if(this.idConnect != null){
            return true;
        }else{
            return false;
        }
    }
    async signIn(where){
        try{
            var db = await this.dbCollection.Get();
            var result = await db.collection(this.check).findOne(where.id);
            if(result.password == where.password){
                this.login = true;
                this.accountConnect = result.account;
                return "Đăng nhập thành công";
            }else{
                this.user = false;
                return "Id đăng nhập hoặc mật khẩu sai";
            }
        }catch(e){
            this.showError();
            return "Không thể kết nối tới tài khoản này";
        }
    }
    async signOut(){
        this.login = false;
        return "";
    }

    async getInfomation(){
        if(idConnect != null){
            try{
                var db = await this.dbCollection.Get();
                var result = await db.collection(this.dbuser).findOne(this.idConnect);
                return result;
            }catch(e){
                this.showError();
                return "Không thể kết nối tới tài khoản này";
            }
        }else{
            return "Chưa đăng nhập thông tin tài khoản";
        }
    }

    //Admin system 
    async createNewAccount(where){
        try{
            this.id++;
            var account = await {};
            account.account = where.account;
            account.password = where.password;
            account.email = where.email;
            account.id = this.id;
            var db = await this.dbCollection.Get();
            var resultAccount = await db.collection(this.user).create(account);
            var infomation = Object.assign({},where);
            delete infomation.account;
            delete infomation.password;
            var resultUser = await db.collection(this.dbuser).create(infomation);
            if(resultAccount != false && resultUser != false){
                return "Tạo tài khoản thành công";
            }else{
                this.id--;
                return "Tạo tài khoản thất bại";
            }
        }catch(e){
            this.showError();
            return "Không thể kết nối tới server";
        }
    }
    async newPost(where){
        if(this.isUser()){
            try{
                var db = await this.dbCollection.Get();
                var result = await db.collection(this.user).update(this.idConnect,{$push:{post:where}});
                return "Cập nhật thành công";
            }catch(e){
                this.showError();
                return "Thất bài";
            }
        }
    }
}