const http = require("http");
const port = 1000;

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
        if (address == "/") {
            response.setHeader("Access-Control-Allow-Origin", '*');
            response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            response.setHeader('Access-Control-Allow-Credentials', true);
            response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
            response.end(result);
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
                result.content = value;
                result.date = date.getTime();
                response.setHeader("Access-Control-Allow-Origin", '*');
                response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                response.setHeader('Access-Control-Allow-Credentials', true);
                response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
                response.end(JSON.stringify(result));
            })
        } else if (address == "fix-content") {
            //Chỉnh sửa nội dung
            //
            //
            result = {};
            var obj_receive = functional.validSent(stringReceive.string);
            var where_fix = obj_receive.post;
            var fix_content = obj_receive.content;
            var obj = ConnectContent.update(where_fix, fix_content,"contentpost");
            if (obj == "ok") result.content = "Sửa nội dung bài viết thành công";
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
            result.posts = data.posts.filter((post) => {
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
                    result.post = value;
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
            var obj_receive = functional.validSent(`{"id":"huong-dan-choi-gai-trong-vat-ly-dien-tu"}`);
            var where = obj_receive;
            result = {};
            var obj = ConnectMenu.getOne(where,"menupost");
            obj.then(value => {
                result.menu = value;
                result.date = date.getTime();
                response.setHeader("Access-Control-Allow-Origin", '*');
                response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                response.setHeader('Access-Control-Allow-Credentials', true);
                response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
                response.end(JSON.stringify(result));
            })
        } else if (address == "get-author-from-menu") {
            result = {};
            result.hello = ConnectMenu.getAuthor();
            result.date = date.getTime();
            response.setHeader("Access-Control-Allow-Origin", '*');
            response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            response.setHeader('Access-Control-Allow-Credentials', true);
            response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
            response.end(JSON.stringify(result));
        } else if (address == "get-subtitle-from-menu") {
            result = {};
            result.hello = ConnectMenu.getSubtitles();
            result.date = date.getTime();
            response.setHeader("Access-Control-Allow-Origin", '*');
            response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            response.setHeader('Access-Control-Allow-Credentials', true);
            response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
            response.end(JSON.stringify(result));
        } else if (address == "get-title-from-menu") {
            result = {};
            result.hello = ConnectMenu.getTitle();
            result.date = date.getTime();
            response.setHeader("Access-Control-Allow-Origin", '*');
            response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            response.setHeader('Access-Control-Allow-Credentials', true);
            response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
            response.end(JSON.stringify(result));
        } else if (address == "get-comment-from-menu") {
            result = {};
            result.hello = ConnectMenu.getComment();
            result.date = date.getTime();
            response.setHeader("Access-Control-Allow-Origin", '*');
            response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            response.setHeader('Access-Control-Allow-Credentials', true);
            response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
            response.end(JSON.stringify(result));
        } else if (address.method == "POST" && address.slice(-4) == ".asp" && address.slice(7, 13) == "create") {
            console.log("hello");

            response.setHeader("Access-Control-Allow-Origin", '*');
            response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            response.setHeader('Access-Control-Allow-Credentials', true);
            response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
            response.end("hello");
        }
    })
});

server.listen(port, () => {
    console.log("Localhost at port:" + port);
});