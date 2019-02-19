function xoa_dau(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str;
}

class Post {
    constructor(){
        this.menu = {};
        this.menu.subtitle = [];
    }
    //Preview post
    setTitle(title){
        if(title != "")
            this.title = title;
    }
    getTitle(){
        return this.title;
    }
    setId(id){
        if(id != "")this.id = id;
    }
    getId(){
        return this.id;
    }
    setNamePost(){
        if(this.title != null) this.name_post = xoa_dau(this.title).toLowerCase().replace(" ","-");
    }
    getNamePost(){
        return this.name_post;
    }
    setIdPost(idPost){
        if(idPost != "") this.id_post = idPost;
    }
    getIdPost(){
        return this.id_post;
    }
    setState(state){
        switch(state){
            case 1: this.state = "public";break;
            case 2: this.state = "protected";break;
            case 3: this.state = "private";break;
            default: this.state = "null";break;
        }
    }
    getState(){
        return this.state;
    }
    setAuthor(obj){
        this.author.nickname = obj.nickname;
        this.author.name = obj.name;
        this.author.avatar = obj.avatar;
    }
    getAuthor(){
        return this.author;
    }
    setUrl(url){
        this.url = url;
    }
    getUrl(){
        return this.url;
    }
    setImg(img){
        this.img = img;
    }
    getImg(){
        return this.img;
    }
    setViews(int){
        this.views = int;
    }
    getViews(){
        return this.views;
    }
    setDate(date){
        this.date = date;
    }
    getDate(){
        return this.date;
    }
    setCategory(cate){
        this.category = cate;
    }
    getCategory(){
        return this.category;
    }
    setTag(array){
        for(var i=0;i < array.length;i++){
            this.tag.push(array[i]);
        }
    }
    getTag(){
        return this.tag;
    }
    //View Post
    setMenu(){
        
    }
}
