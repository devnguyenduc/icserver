module.exports.validSent = (string) => {
    var result = "";
    if (string != "") {
        result = JSON.parse(string);
        if (typeof (result) != "object") return false;
        else {
            return result;
        }
    }else{
        return "";
    }
}