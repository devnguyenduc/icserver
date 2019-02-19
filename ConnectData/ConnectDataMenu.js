var ConnectDataMenu = require("../ConnectData/ConnectData");
ConnectDataMenu.signIn = null;

ConnectDataMenu.isValid = () => {
    if (ConnectDataMenu.signIn == null) {
        return false;
    } else return true;
}

ConnectDataMenu.getOne = async (where) => {
    try {
        var db = await ConnectDataMenu.dbColection.Get();
        var result = await db.collection(ConnectDataMenu.collection).findOne(where);
        ConnectDataMenu.signIn = result;
        console.log(result);
        return result;
    } catch (e) {
        console.log("=============================ERROR=============================");
        console.log(e);
        console.log("=============================ERROR=============================");
        ConnectDataMenu.signIn = null;
        return this.error;
    }
}

ConnectDataMenu.getAuthor = () => {
    console.log("got author id " + ConnectDataMenu.signIn.id + " of menu post");
    return ConnectDataMenu.isValid() ? ConnectDataMenu.signIn.author : "null";
}

ConnectDataMenu.getSubtitles = () => {
    console.log("got subtitles id "+ConnectDataMenu.signIn.id + "of menu post");
    return ConnectDataMenu.isValid() ? ConnectDataMenu.signIn.subtitle : "null";
}

ConnectDataMenu.getTitle = () => {
    return ConnectDataMenu.isValid() ? ConnectDataMenu.signIn.title : "null";
}

ConnectDataMenu.getComment = () => {
    return ConnectDataMenu.isValid() ? ConnectDataMenu.signIn.comment : "null";
}
function hello() {
    return true ? "hi" : "hello";
}
console.log(hello());

module.exports = ConnectDataMenu;