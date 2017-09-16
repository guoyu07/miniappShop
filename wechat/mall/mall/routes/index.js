var express = require('express');
var router = express.Router();
var request=require('request');
var mongoose=require('mongoose');
// var info=require('../DB.js');
/* GET home page. */
//引入mongoose第三方模块
// var mongoose=require('mongoose');
//没有mongoose.Promise=global.Promise会出现错误，意思就是mongoose自带的promise过期了
//然后需要v8引擎的promise
mongoose.Promise=global.Promise;
// 调试模式是mongoose提供的一个非常实用的功能，用于查看mongoose模块对mongodb
// 操作的日志，一般开发时会打开此功能，以便更好的了解和优化对mongodb的操作
mongoose.set('debug',true);
//node连接数据库
//一般默认没有user和password
var db=mongoose.connect('mongodb://localhost:/MALL');
db.connection.on("error",function(error){
	console.log("数据库连接失败:"+error);
});
db.connection.on("open",function(){
	console.log("数据库连接成功");
});
var Schema=mongoose.Schema;
//定义模式Student_Schema
//{versionKey:false}是否建立文档的版本
var User_Schema=new Schema({
	username:String,
	password:String,
	avartarUrl:String,
	city:String,
	gender:Number
});
var Info_Schema=new Schema({
	  id: Number,
      name: String,
      sloga: String,
      smallpic:String,
      bigpic:String,
      typeid: Number,
      rid: Number,
      parentdesc: String
},{
	versionKey:false
});
var choice_Schema=new Schema({
		id: String,
        title: String,
        brand: Number,
        goodstype: Number,
        keywords: String,
        format:String,
        marketprice: Number,
        ourprice: Number,
        tax: Number,
        purchaselimit: String,
        prodplace: Number,
        goodspics: String,
        prodparams: String,
        detailinfo:String,
        reason:String,
        status: Number,
        createtime: String,
        updatetime: String,
        createuser: String,
        updateuser: String,
        shelftime: String,
        itemcode: String,
        supcode: String,
        typeid: String,
        englishname: String,
        chinesename: String,
        subdesc: String,
        parentdesc: String,
        country: String,
        waresname: String,
        wareid: String,
        bigname: String,
        bigid: String,
        days: Number,
        choicepic: String,
        supname: String,
        qty: String,
        erpqty:Number,
        lockqty: Number,
        recommand: String,
        bigtype: String,
        onnew: String,
        guideroyalty: String
});
//定义模型Student,注意数据库存的是students
var Info=mongoose.model("Info",Info_Schema);
var User=mongoose.model("User",User_Schema);
var choiceList=mongoose.model("choiceList",choice_Schema);
//实体的实例化
router.get('/', function(req, res) {
  request('http://huanqiuxiaozhen.com/wemall/goods/choiceList',(error,response,body)=>{
  	let data=JSON.parse(body);
  	let result=data.data.dataList;
 
  	for(let i=0;i<result.length;i++){
  		let choice=new choiceList({
  		id: result[i].id,
        title:result[i].title,
        brand: result[i].brand,
        goodstype: result[i].goodstype,
        keywords: result[i].keywords,
        format:result[i].format,
        marketprice: result[i].marketprice,
        ourprice: result[i].ourprice,
        tax: result[i].tax,
        purchaselimit:result[i].purchaselimit,
        prodplace: result[i].prodplace,
        goodspics: result[i].goodspics,
        prodparams: result[i].prodparams,
        detailinfo:result[i].detailinfo,
        reason:result[i].reason,
        status: result[i].status,
        createtime: result[i].createtime,
        updatetime: result[i].updatetime,
        createuser: result[i].createuser,
        updateuser: result[i].updateuser,
        shelftime: result[i].shelftime,
        itemcode: result[i].itemcode,
        supcode: result[i].supcode,
        typeid: result[i].typeid,
        englishname: result[i].englishname,
        chinesename: result[i].chinesename,
        subdesc: result[i].subdesc,
        parentdesc: result[i].parentdesc,
        country: result[i].country,
        waresname: result[i].waresname,
        wareid: result[i].wareid,
        bigname: result[i].bigname,
        bigid: result[i].bigid,
        days: result[i].days,
        choicepic: result[i].choicepic,
        supname:result[i].supname,
        qty: result[i].qty,
        erpqty:result[i].erpqty,
        lockqty: result[i].lockqty,
        recommand: result[i].recommand,
        bigtype: result[i].bigtype,
        onnew: result[i].onnew,
        guideroyalty: result[i].guideroyalty
  	});
  	choice.save();
  	}
  	res.json(JSON.parse(body));
  });

});
router.get('/user',(req,res)=>{
	console.log(req.query.userInfo);
	let user=JSON.parse(req.query.userInfo);
	let obj=new User({
  		username:user.nickName,
  		password:user.province,
  		avatarUrl:user.avatarUrl,
  		city:user.city,
  		gender:user.gender
  		
  	});
  	obj.save();
});
router.get('/images',function(req,res){
	  res.json({
  	images:[
  			"https://img20.360buyimg.com/da/jfs/t6694/307/884069365/109374/f29d37a1/59463b5bNd4e4dee9.jpg",
  		
  			"https://m.360buyimg.com/mobilecms/s720x322_jfs/t6211/289/791523663/86728/db44b4a7/59458291Nd51b9261.jpg!q70.jpg",
  		
  			"https://img1.360buyimg.com/da/jfs/t6229/181/700545292/75973/764515b3/59434cf8Nbf70fa7f.jpg"
	]
  });

 router.get('/list',function(req,res){
 	request('http://huanqiuxiaozhen.com/wemall/venues/venuesList',(error,response,body)=>{
 		let data=JSON.parse(body);
 		let arr=data.data;
 		for(let i=0;i<arr.length;i++){
 			var cargo=new Info({
	 			id: arr[i].id,
			    name: arr[i].name,
			    sloga: arr[i].sloga,
			    smallpic: arr[i].smallpic,
			    bigpic: arr[i].bigpic,
			    typeid: arr[i].typeid,
			    rid: arr[i].rid,
			    parentdesc: arr[i].parentdesc
		 	});
		 	cargo.save(function(err){
		 		console.log(err);
		 	});
 		}
 		
 		res.json(JSON.parse(body));
	 });		
 });
})

module.exports = router;
