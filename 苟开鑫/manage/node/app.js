/*
 * @Author: happy
 * @Date: 2020-09-12 12:48:16
 * @LastEditTime: 2020-09-13 13:05:58
 * @LastEditors: happy
 * @Description: 
 */
const express = require('express');
const app = express();
const favicon = require('serve-favicon');
const logger = require('morgan');  //日志
const req = require('body-parser');   //路由
const bodyParser = require('body-parser');
const mysql = require('mysql');




app.use(bodyParser.json());  //定义数据格式
app.use(bodyParser.urlencoded({extended:false}));   //切记放在什么位置

app.post('/userlogin',function(req,res){
    //接收参数
    var username = req.body.username;
    var pwd = req.body.pwd;
    //连接数据库
    var connect = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'manage'
    });
    //
    connect.connect();
    //
    connect.query('select * from staff where Phone=? and pwd=?',[username,pwd],function(err,data){
        //err:null表示没有错
        if(err){
            console.log(err);
            res.send({code:500,message:'数据库异常'});
        }else{
            if(data.length>0){
                res.send({code:200,message:'登录成功',staffinfo:data[0]});
            }else{
                res.send({code:200,message:'用户名或密码错误'});
            }
        }
    });
    //关闭
    connect.end();

});

//部门列表
app.post('/deptlist',function(req,res){
    //连接数据库
    var connect = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'manage'
    });
    //
    connect.connect();
    //
    connect.query('select * from department',[],function(err,data){
        //err:null表示没有错
        if(err){
            console.log(err);
            res.send({code:500,message:'数据库异常'});
        }else{
            res.send({code:200,data:data});
        }
    });
    //关闭
    connect.end();
});

//添加部门
app.post('/adddept',function(req,res){
    //接收参数
    var DeptName = req.body.DeptName;
    var DeptDescript = req.body.DeptDescript;
    //连接数据库
    var connect = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'manage'
    });
    //
    connect.connect();
    //
    connect.query(`insert into department(DeptName,DeptDescript)
     values (?,?)`,[DeptName,DeptDescript],function(err,data){
        //err:null表示没有错
        if(err){
            console.log(err);
            res.send({code:500,message:'数据库异常'});
        }else{
            if(data.affectedRows>0){
                console.log(DeptDescript)
                res.send({code:500,message:'添加成功'});
            }else{
                res.send({code:500,message:'添加失败'});
            }
        }
    });
    //关闭
    connect.end();
});

// 删除
app.get('/deldept',function(req,res){
    //接收参数
    var DeptNo = req.query.DeptNo;
    //连接数据库
    var connect = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'manage'
    });
    //
    connect.connect();
    //
    connect.query(`update department set Status =0 where DeptNo=?`,[DeptNo],function(err,data){
        //err:null表示没有错
        if(err){
            console.log(err);
            res.send({code:500,message:'数据库异常'});
        }else{
            if(data.affectedRows>0){
                res.send({code:500,message:'删除成功'});
            }else{
                res.send({code:500,message:'删除失败'});
            }
        }
    });
    //关闭
    connect.end();
});
//修改
app.post('/editdept',function(req,res){
    //接收参数
    var DeptNo = req.body.DeptNo;
    var DeptName = req.body.DeptName;
    var DeptDescript = req.body.DeptDescript;
    var Status = req.body.Status;
    //连接数据库
    var connect = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'manage'
    });
    //
    connect.connect();
    //
    connect.query(`update department set DeptName=?,
    DeptDescript=?,Status =? where DeptNo=?`,
    [DeptName,DeptDescript,Status,DeptNo],function(err,data){
        //err:null表示没有错
        if(err){
            console.log(err);
            res.send({code:500,message:'数据库异常'});
        }else{
            if(data.affectedRows>0){
                res.send({code:500,message:'修改成功'});
            }else{
                res.send({code:500,message:'修改失败'});
            }
        }
    });
    //关闭
    connect.end();
});


app.listen(8888,function(){
    console.log('服务已经启动')
});
