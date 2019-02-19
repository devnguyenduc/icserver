
class Feature{
    constructor(){
        this.user = new Array("mongodb://inclouduser:revivalsand97@ds059682.mlab.com:59682/incloud_user","incloud_user");
        this.content = new Array("mongodb://admin_content:thuongthoi123@ds147965.mlab.com:47965/timestored_content","timestored_content");
        this.post = ["mongodb://admin_post:thuongtho123@ds247759.mlab.com:47759/timestored_post","timestored_post"];
        this.menu =["mongodb://incloudmenu:revivalsand97@ds017584.mlab.com:17584/incloud_menu","incloud_menu"]
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