let multer = require('multer');
let storage = multer.diskStorage({
	destination: function(req, file, cb) { //文件保存位置
		cb(null, './public/images')
	},
	filename: function(req, file, cb) { //文件存储名称
		let arr = file.originalname.split('.');
		cb(null, arr[0] + '-' + Date.now() + '.' + arr[1] )
	}
})

let upload = multer({
	storage: storage
})
module.exports = upload;
