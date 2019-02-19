// Cách xây dựng dịch vụ post bài
// Dịch vụ post bài dựa trên cơ sở dữ liệu json của từng bài viết
/*
        Ta phân tích:
    - Dựa trên tất cả các bài viết của người dùng. Ta dùng chung 1 ID của người dùng để lọc dữ liệu.
    - Ngoài ra mỗi 1 bài viết đều có 1 mã số ID riêng.
    - Tất cả các bài viết đều được lưu trữ thành nhiều Database POST 1, 2, 3, ... .Dùng chung,
    trộn lẫn vào nhau không tách ra. Vì nếu cấp cho 1 người 1 Database sẽ rất khó để quản lý,
    rất khó để xây dựng tự động các database. Dịch vụ nâng cấp trong tương lai sẽ cấp cho mỗi người
    1 database riêng và có thể giải quyết như 1 thư mục lưu trữ riêng của từng người.

*/
var ConnectDataPost = require("../ConnectData/ConnectData");
// Một số microservice cập nhật dữ liệu.
// Cài đặt các trạng thái cho bài viết. Public: ai cũng xem được, Protected: chỉ bạn bè.
ConnectDataPost.setPostPublic = (post)=>{
    ConnectDataPost.update(post,{$set:{state:"public"}});
}
ConnectDataPost.setPostProtected = (post)=>{
    ConnectDataPost.update(post,{$set:{state:"protected"}});
}
ConnectDataPost.setPostPrivate = (post)=>{
    ConnectDataPost.update(post,{$set:{state:"private"}});
}
// tăng lượt view khi client gọi tới bài post
ConnectDataPost.setUpTimes = (post) =>{
    ConnectDataPost.update(post,{$inc:{views:1}});
}
ConnectDataPost.hellHello = ()=>{
    return ConnectDataPost.test();
}
// Chỉnh sửa nội dung bài viết
ConnectDataPost.editBody = (post,content)=>{
    ConnectDataPost.update(post,{$set:{body:content}});
}
ConnectDataPost.editHeader = (post,content)=>{
    ConnectDataPost.update(post,{$set:{header:content}});
}
// Chỉnh sửa Menu
module.exports = ConnectDataPost;