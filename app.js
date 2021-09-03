
var express = require('express');
const mysql = require('mysql');
var fs = require('fs');
var path = require('path');
const { Session } = require('inspector');
var app = express();
let account = null;

//创建连接
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: ' C!ligu6X*+OJ', //密码
    database: 'nodemysql' // 这里等数据库创建之后放开就可以
})
//connect 连接数据库
db.connect(err => {
    if (err) throw err;
    console.log('mysql connected ......')
})
//创建数据库
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql'
    db.query(sql, (err, result) => {
        if (err) throw err
        console.log(result)
        res.send('Database created ...')
    })
})

app.use('/public', express.static('public'));

//主界面
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/b.html');

});

app.get('/main', function (req, res) {
    res.sendFile(__dirname + '/public/a.html');

});


var server = app.listen(3000, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Node.JS 服务器已启动，访问地址： http://%s", host, port)

})


//创建表
app.get("/createpoststable", (req, res) => { // 访问该地址 createpoststable 会返回send内容
    let sql = "CREATE TABLE posts(id int AUTO_INCREMENT,title VARCHAR(255),body VARCHAR(255),PRIMARY KEY(id))"
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('posts表已经建立')
    })
})




//登录页面
app.get("/login", function (req, res) {
    var response = {
        "account": req.query.account,
        "password": req.query.password,

    };
    var selectSQL = "select account,password,money,jilu from posts where account = '" + req.query.account + "' and password = '" + req.query.password + "'";
    //var selectSQL = "select password from user where account='"+req.query.account+"'";
    var addSqlParams = [req.query.account, req.query.password];
    db.query(selectSQL, function (err, result) {
        if (err) {
            console.log('[login ERROR] - ', err.message);
            return;
        }
        //console.log(result);
        if (result == '') {
            res.end("0");
        }
        else {
            account = req.query.account;
            res.redirect("/main");
        }
    });
    console.log(response);
    //res.end(JSON.stringify(response));
})





//注册页面
var addSql = 'INSERT INTO posts(account,password,money) VALUES(?,?,1000)';

app.get('/process_get', function (req, res) {

    // 输出 JSON 格式
    var response = {
        "account": req.query.account,
        "password": req.query.password,
        "money": req.query.money,
    };
    var addSqlParams = [req.query.account, req.query.password];
    db.query(addSql, addSqlParams, function (err, result) {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            res.end("0");
            alert("不可以哟");
            return;//如果失败了就直接return不会继续下面的代码
        }
        res.end("1");//如果注册成功就给客户端返回1
        console.log("OK");
    });
    console.log(response);
    //res.end(JSON.stringify(response));
})



//页面
app.get('/', function (req, res) {
    db.query("select account,password,money,jilu from posts where account = '" + account + "'", (err, results) => {
        if (err) {
            console.log('查询错误', err);
        }
        let a = JSON.stringify(results); // 把查询到的数据，转换为json格式
        console.log(a);
        fs.writeFile('public/a.json', a, function (error) {
            if (error) { console.log('json-文件写入失败'); }
        });
    });
});

