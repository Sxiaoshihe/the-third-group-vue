const myexpress=require("express"); //引入模板
const mysql=require("mysql");
const bodyParser=require("body-parser");
const app=myexpress();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(myexpress.static(__dirname+"/public"));
//定义接口
app.post("/userLogin",(req,res)=>{
    //1/接受传递的参数
    var username=req.body.userName;
    var pwd=req.body.Pwd;
    console.log(username);
    console.log(pwd)
    //2/去数据库验证，返回结果给用户
    var connect=mysql.createConnection({
        host:'localhost',
        user:"root",
        password:"",
        database:"manage"
    });
    //3、打开连接
    connect.connect();
    connect.query("select * from staff where StaffName=? and Pwd=?",
        [username,pwd],function(err,data){
            if(err){
                console.log(err);
                res.send({code:500,message:"数据库出错,请联系秋秋"})
            }else{
                if(data.length>0){
                    res.send({code:200,message:"登陆成功",staffInfo:data[0]});
                }else{
                    res.send({code:200,message:"用户名或密码错误"});
                }
            }
        });
    connect.end();

});
//部门列表
app.post("/deptList",(req,res)=>{
    
    //1/去数据库查询
    var connect=mysql.createConnection({
        host:'localhost',
        user:"root",
        password:"",
        database:"manage"
    });
    //3、打开连接
    connect.connect();
    connect.query("select * from department",[],function(err,data){
            if(err){
                console.log(err);
                res.send({code:500,message:"数据库出错,请联系秋秋"})
            }else{
                    res.send({code:200,data:data});
                }
        });
    connect.end();
});


//添加部门
app.post("/addDept",(req,res)=>{
    //1、接受参数   2、去数据库添加部门
    var deptname=req.body.deptName;
    var descipt=req.body.deptDescript;
    console.log(deptname);
    console.log(descipt)
    
    var connect=mysql.createConnection({
        host:'localhost',
        user:"root",
        password:"",
        database:"manage"
    });
    //3、打开连接
    connect.connect();
    connect.query("insert into department(DeptName,DeptDescript) values(?,?)",
        [deptname,descipt],function(err,data){
            if(err){
                console.log(err);
                res.send({code:500,message:"数据库出错,请联系秋秋"})
            }else{
                    //添加删除修改都不会返回数据列表，会有受影响的行数
                    if(data.affectedRows>0){
                        res.send({code:200,message:"添加成功"})
                    }else{
                        res.send({code:200,message:"添加失败"})
                    }
                }
        });
    connect.end();
})

//删除部门
app.get("/delDept",(req,res)=>{
    //1、接受参数   2、去数据库添加部门
    var deptNo=req.query.deptNo;
    
    var connect=mysql.createConnection({
        host:'localhost',
        user:"root",
        password:"",
        database:"manage"
    });
    //3、打开连接
    connect.connect();
    connect.query("UPDATE department SET STATUS =0 WHERE DeptNo=?",
        [deptNo],function(err,data){
            if(err){
                console.log(err);
                res.send({code:500,message:"数据库出错,请联系秋秋"})
            }else{
                    //添加删除修改都不会返回数据列表，会有受影响的行数
                    if(data.affectedRows>0){
                        res.send({code:200,message:"删除成功"})
                    }else{
                        res.send({code:200,message:"删除失败"})
                    }
                }
        });
    connect.end();
})



//修改部门
app.post("/editDept",(req,res)=>{
    //1、接受参数   2、去数据库添加部门
    var deptname=req.body.deptName;
    var descipt=req.body.deptDescript;
    var deptno=req.body.deptNo
    var status=req.body.status
    
    
    var connect=mysql.createConnection({
        host:'localhost',
        user:"root",
        password:"",
        database:"manage"
    });
    //3、打开连接
    connect.connect();
    connect.query("UPDATE department SET DeptName=?,DeptDescript=?,STATUS =? WHERE DeptNo=?",
        [deptname,descipt,status,deptno],function(err,data){
            if(err){
                console.log(err);
                res.send({code:500,message:"数据库出错,请联系秋秋"})
            }else{
                    //添加删除修改都不会返回数据列表，会有受影响的行数
                    if(data.affectedRows>0){
                        res.send({code:200,message:"修改成功"})
                    }else{
                        res.send({code:200,message:"修改失败"})
                    }
                }
        });
    connect.end();
})



app.listen(7777)
console.log("冲冲冲")
