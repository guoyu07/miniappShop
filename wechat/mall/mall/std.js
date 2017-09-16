//引入mongoose第三方模块
var mongoose=require('mongoose');
//没有mongoose.Promise=global.Promise会出现错误，意思就是mongoose自带的promise过期了
//然后需要v8引擎的promise
mongoose.Promise=global.Promise;
// 调试模式是mongoose提供的一个非常实用的功能，用于查看mongoose模块对mongodb
// 操作的日志，一般开发时会打开此功能，以便更好的了解和优化对mongodb的操作
mongoose.set('debug',true);
//node连接数据库
//一般默认没有user和password
var db=mongoose.connect('mongodb://localhost:/MyDB');
db.connection.on("error",function(error){
	console.log("数据库连接失败:"+error);
});
db.connection.on("open",function(){
	console.log("数据库连接成功");
});
var Schema=mongoose.Schema;
//定义模式Student_Schema
//{versionKey:false}是否建立文档的版本
var Student_Schema=new Schema({
	name:String,
	id:Number,
	phone:String,
	date:Date
},{
	versionKey:false
});
//定义模型Student,注意数据库存的是students
var Student=mongoose.model("Student",Student_Schema);
//实体的实例化
var kiwis=new Student({
	name:"kiwis",
	id:123,
	phone:"12344556661",
	date:Date.now()
});
//save()方法保存document，如果mongodb里面没有，则会自动创建
kiwis.save(function(error){});
//CURD操作方法
//{}是取得所有的文档，第一参数定义条件，第二参数是回调函数，docs是返回的查找结果，结果形式是一个json数据数组{}
//Model.findById(id,[projection],[options],[callbacck]);
//Model.findOne([conditions],[projection],[options],[callback]);
Student.find({},function(err,docs){});
//update();第一参数是条件，第二参数是修改的内容
kiwis.update({name:"kiwis"},{id:456,phone:"12345678910"},function(error){});
//remove()
kiwis.remove({
	name:"kiwis"
},function(error){

});