const http = require("http");
const port = 3000;

var ConnectContent = require("../ConnectData/ConnectData");
var ConnectPost = require("../ConnectData/ConnectDataPost");
var feature = require("../Function/feature");
var ConnectMenu = require("../ConnectData/ConnectDataMenu");
var functional = require('../Function/function');
var data = {};

var post = ConnectPost.get("post");
post.then(value => {
    data.posts = value;
});


var server = http.createServer((require, response) => {
    var admin = { valid: false };
    var stringReceive = "";
    var result = "null";
    var address = require.url.replace("/", "").replace("?", "");
    var secrect_address = require.url.replace("/", "").replace("?", "");
    var date = new Date;
    require.on('data', (chunk) => {
        stringReceive.string += chunk;
        stringReceive.date = date.getTime();
    });
    require.on('end', () => {
        if (address == "") {
	    result = ConnectContent.readIndex();
            response.setHeader("Access-Control-Allow-Origin", '*');
            response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            response.setHeader('Access-Control-Allow-Credentials', true);
            response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
	    response.writeHead(200,{"Content-type": "text/html"});
	    response.write(result);
            response.end();
        } else if (address == "user-have-manything-and-you-catch-what") {
            result = JSON.stringify(data);
            response.setHeader("Access-Control-Allow-Origin", '*');
            response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            response.setHeader('Access-Control-Allow-Credentials', true);
            response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
            response.end(result);
        } else if (address == "get-content") {
            //Xử lý nội dung
            //
            //end
            var obj_receive = functional.validSent(stringReceive.string);
            result = {};
            var where = { id_connect: obj_receive.id_connect }
            var obj = ConnectContent.gets(where,"contentpost");
            obj.then(value => {
                result.result = value;
                result.date = date.getTime();
                response.setHeader("Access-Control-Allow-Origin", '*');
                response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                response.setHeader('Access-Control-Allow-Credentials', true);
                response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
                response.end(JSON.stringify(result));
            })
        } else if (address == "fix-content") {
            //Chỉnh sửa nội dung
            result = {};
            var obj_receive = functional.validSent(stringReceive.string);
            var where_fix = obj_receive.post;
            var fix_content = obj_receive.content;
            var obj = ConnectContent.update(where_fix, fix_content,"contentpost");
            if (obj == "ok") result.result = "Sửa nội dung bài viết thành công";
            result.date = date.getTime();
            response.setHeader("Access-Control-Allow-Origin", '*');
            response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            response.setHeader('Access-Control-Allow-Credentials', true);
            response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
            response.end(JSON.stringify(result));
        } else if (address == "create-content") {
            result = {};
            var obj_receive = functional.validSent(stringReceive.string);
            var obj = ConnectContent.create(obj_receive,"contentpost");
            result.result = obj;
            result.date = date.getTime();
            response.setHeader("Access-Control-Allow-Origin", '*');
            response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            response.setHeader('Access-Control-Allow-Credentials', true);
            response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
            response.end(JSON.stringify(result));
        } else if (address == "delete-content") {
            result = {};
            var obj_receive = functional.validSent(stringReceive.string);
            var obj = ConnectContent.remove(obj_receive,"contentpost");
            result.result = obj;
            result.date = date.getTime();
            response.setHeader("Access-Control-Allow-Origin", '*');
            response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            response.setHeader('Access-Control-Allow-Credentials', true);
            response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
            response.end(JSON.stringify(result));
        } else if (address == "get-post") {
            result = {};
            result.date = date.getTime();
            result.result = data.posts.filter((post) => {
                return post.state == "public";
            });
            response.setHeader("Access-Control-Allow-Origin", '*');
            response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            response.setHeader('Access-Control-Allow-Credentials', true);
            response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
            response.end(JSON.stringify(result));

        } else if (address == "admin-get-posts") {
            // Dùng để kết nối xem có phải admin kết nối post hay không
            result = {};
            if (admin.valid == true) {
                var where = { nickname: admin.name, id: admin.id }
                var connect = ConnectPost.gets(where,"post");
                connect.then(value => {
                    result.result = value;
                    result.date = date.getTime();
                    response.setHeader("Access-Control-Allow-Origin", '*');
                    response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                    response.setHeader('Access-Control-Allow-Credentials', true);
                    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
                    response.end(JSON.stringify(result));
                });
            } else {
                result.date = date.getTime();
                result.post = "null";// Khi client nhận được giá trị null sẽ xuất ra câu lệnh cần thiết
                response.setHeader("Access-Control-Allow-Origin", '*');
                response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                response.setHeader('Access-Control-Allow-Credentials', true);
                response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
                response.end(JSON.stringify(result));
            }
        } else if (address == "get-request-menu") {
            // Xử lý menu
            //
            //
            // Gửi yêu cầu menu khi đã kết nối thành công 
            var obj_receive = functional.validSent(stringReceive.string);
            var where = obj_receive;
            result = {};
            var obj = ConnectMenu.getOne(where,"menupost");
            obj.then(value => {
                result.result = value;
                result.date = date.getTime();
                response.setHeader("Access-Control-Allow-Origin", '*');
                response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                response.setHeader('Access-Control-Allow-Credentials', true);
                response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
                response.end(JSON.stringify(result));
            })
        } else if (address == "get-author-from-menu") {
            result = {};
            result.result = ConnectMenu.getAuthor();
            result.date = date.getTime();
            response.setHeader("Access-Control-Allow-Origin", '*');
            response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            response.setHeader('Access-Control-Allow-Credentials', true);
            response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
            response.end(JSON.stringify(result));
        } else if (address == "get-subtitle-from-menu") {
            result = {};
            result.result = ConnectMenu.getSubtitles();
            result.date = date.getTime();
            response.setHeader("Access-Control-Allow-Origin", '*');
            response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            response.setHeader('Access-Control-Allow-Credentials', true);
            response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
            response.end(JSON.stringify(result));
        } else if (address == "get-title-from-menu") {
            result = {};
            result.result = ConnectMenu.getTitle();
            result.date = date.getTime();
            response.setHeader("Access-Control-Allow-Origin", '*');
            response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            response.setHeader('Access-Control-Allow-Credentials', true);
            response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
            response.end(JSON.stringify(result));
        } else if (address == "get-comment-from-menu") {
            result = {};
            result.result = ConnectMenu.getComment();
            result.date = date.getTime();
            response.setHeader("Access-Control-Allow-Origin", '*');
            response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            response.setHeader('Access-Control-Allow-Credentials', true);
            response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
            response.end(JSON.stringify(result));
        } else if (address.method == "POST" && address.slice(-5) == ".post" && address.slice(7, 13) == "create") {
            result = {};
            result.date = date.getTime();
            var obj_receive = functional.validSent(stringReceive.string);
            var obj = ConnectPost.create(obj_receive.data,"post");
            if(obj == "ok"){
                result.result = "Tạo bài viết thành công";
            }else{
                result.result = "Tạo bài viết thất bại";
            }
            response.setHeader("Access-Control-Allow-Origin", '*');
            response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            response.setHeader('Access-Control-Allow-Credentials', true);
            response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
            response.end(JSON.stringify(result));
        }else if(address.match == "DELETE" && address.slice(-5) == ".post" && address.slice(7,13)=="remove"){
            result = {};
            result.date = date.getTime();
            var obj_receive = functional.validSent(stringReceive.string);
            var obj = ConnectPost.remove(obj_receive.data,"post");
            if(obj == "ok"){
                result.result = "Xóa bài viết thành công";
            }else{
                result.result = "Xóa bài viết thất bại";
            }
            response.setHeader("Access-Control-Allow-Origin", '*');
            response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            response.setHeader('Access-Control-Allow-Credentials', true);
            response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
            response.end(JSON.stringify(result));
        }
    })
});

server.listen(port, () => {
    console.log("Localhost at port:" + port);
});
