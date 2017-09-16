var app = getApp()
Page( {
  data: {
    cartImg: '../../images/cart-null.png',
    tipWords: '购物车空空如也',
    something:true,
    shoppingDetails:null,
    num:null
  },
  onLoad:function(options){
    var that=this
    console.log(app.globalData)
    wx.getStorage({
      key: 'count',
      success: function (res) {
        console.log(res.data)
        that.setData({
          shoppingDetails: res.data,
          something:false,
          num:1
        })
      }
    })
    
  },
  buySomething:function(){
    wx.removeStorage({
      key: 'count',
      success: function (res) {
        console.log('success')
      }
    })
   
  },
  add:function(){
    this.setData({
      num:this.data.num+1
    })
  },
  cut:function(){
    this.setData({
      num: this.data.num - 1
    })
  },
  change:function(e){
    this.setData({
      num:Number(e.detail.value)
    })
  }
})
