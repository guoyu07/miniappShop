//获取应用实例
var app = getApp()
Page({
    data: {
        indicatorDots: true,
        vertical: false,
        autoplay: true,
        interval: 3000,
        duration: 1000,
        loadingHidden: false,
        images:null
    },

    //事件处理函数
    swiperchange: function(e) {
        //console.log(e.detail.current)
    },

    onLoad: function() {
        console.log('onLoad')
        var that = this
            //调用应用实例的方法获取全局数据
        app.getUserInfo(function(userInfo) {
            //更新数据
            that.setData({
                userInfo: userInfo
            })
        })
        wx.request({
          url: 'http://localhost:3000/images',
          method:'GET',
          header: {
                'Accept': 'application/json'
            },
            success: function(res) {
                console.log(res.data)
                that.setData({
                    images: res.data.images
                })
            }
        })
        wx.request({
          url: "http://localhost:3000/user?userInfo=" + JSON.stringify(app.globalData.userInfo),
          method: 'GET',
          success: function () {
            console.log(app.globalData.usernaame)
          }
        })
        //venuesList
        wx.request({
            url: 'http://localhost:3000/list',
            method: 'GET',
            data: {},
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
              console.log(res.data)
                that.setData({
                    venuesItems: res.data.data
                })
                setTimeout(function () {
                    that.setData({
                        loadingHidden: true
                    })
                }, 1500)
            }
        })
        wx.request({
            url: 'http://localhost:3000/',
            method: 'GET',
            data: {},
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
                that.setData({
                    choiceItems: res.data.data.dataList
                })
                setTimeout(function () {
                    that.setData({
                        loadingHidden: true
                    })
                }, 1500)
            }
        })


    }
})
