
class Feature{
    constructor(){

    }
    getNguoiDung(){
        return this.user[0];
    }
    getNguoiDung2(){
        return this.user[1];
    }
    getNoiDung(){
        return this.content[0];
    }
    getNoiDung2(){
        return this.content[1];
    }
    getBaiViet(){
        return this.post[0];
    }
    getBaiViet2(){
        return this.post[1];
    }
    getdanhmuc(){
        return this.menu[0];
    }
    getdanhmuc2(){
        return this.menu[1];
    }
}

module.exports = new Feature;
