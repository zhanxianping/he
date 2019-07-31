var mysql=require('mysql');

var db=mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'project3'
});

var json={
    cccActivity:function (fn) {
        let sql=`SELECT * FROM goods JOIN picture ON goods.\`id\`=picture.\`id\` AND a_group='a1'`;
        db.query(sql,function (err,data) {
            fn(err,data)
        })
    },
    cccMale:function (fn) {
        let sql=`SELECT * FROM picture JOIN goods JOIN series ON goods.\`series\`=series.\`id\` AND goods.\`id\`=picture.\`id\` AND colour='#F2DCBD' AND series.s_name="classic"`;
        db.query(sql,function (err,data) {
            fn(err,data)
        })
    },
    cccFemale:function (fn) {
        let sql=`SELECT * FROM picture JOIN goods JOIN series ON goods.series=series.id AND goods.id=picture.id AND colour='#F2DCBD' AND series.s_name="classic black"`;
        db.query(sql,function (err,data) {
            fn(err,data)
        })
    },
    cccParts:function (fn) {
        let sql = `SELECT * FROM picture JOIN goods JOIN series ON goods.series=series.id AND goods.id=picture.id AND colour='#F2DCBD' AND series.s_name="classic black"`;
        db.query(sql,function (err,data) {
            fn(err,data)
        })
    },
    cccCg:function (fn) {
        let sql=`SELECT name_Id,name1,name2,name3,name4,name5,name6,name7,name8,name9,DATE_FORMAT(purchase.name10,'%Y-%d-%m')AS name10,name11,name12,name13,name14,name15,name16 FROM purchase`;
        db.query(sql,function (err,data) { //导出数据
            fn(err,data)
        })
    },
    cccSgd:function ({name1,name2,name3,name4,name5,name6,name7,name8,name9,name10,name11,name12,name13,name14,name15,name16},fn) {
        let time=name10.split('T')[0];//时间切割
       // 插入数据
        let sql2=`UPDATE goods SET number = number+'${name6}' WHERE id = '${name2}'`;
        let sql=`INSERT INTO purchase VALUES ('${name1}','${name2}','${name3}','${name4}','${name5}','${name6}','${name7}','${name8}','${name9}','${time}','${name11}','${name12}','${name13}','${name14}','${name15}','${name16}')`;
        console.log(sql2);
        db.query(sql2,sql,function (err,data) {
            fn(err,data)
        })
    },
    cccCx:function ({name2,name3,name16,name10},fn) {  //查询功能
        let time=name10.split('T')[0];//时间切割
        let sql=`SELECT *,DATE_FORMAT(purchase.name10,'%Y-%d-%m')AS name10 FROM purchase WHERE name2 LIKE '%${name2}%' AND name3 LIKE '%${name3}%' AND name16 LIKE '%${name16}%' AND name10 LIKE '%${time}%'`;
        console.log(sql);
        db.query(sql,function (err,data) {
            fn(err,data)
        })
    },
};
module.exports=json;