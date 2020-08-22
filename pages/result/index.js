const app = getApp()
const i = wx.createCanvasContext("myCanvas");
Page({
  data: {
    value: "你昨天晚上又没回我信息，我却看见你的游戏在线，在我再一次孜孜不倦的骚扰你的情况下,你终于跟我说了一句最长的话 “你他妈是不是有病” 我又陷入了沉思，这一定有什么含义,我想了很久你竟然提到了我的妈妈，原来你已经想得",
    time: '2020年3月26日 星期四',
    name: '斯文的鸡蛋',
    avatar: "/img/1.jpg",
  },

  onLoad: function () {
    const { result } = app.globalData;
    wx.showLoading({
      title: "图片生成中..."
    });
    this.setData({
      ...result
    }, () => setTimeout(() => this.createCard(), 300));
  },
  onReady: function () {
  
  }, 
  onShow: function () {
    
  },
  drawText: function (t, e, n, r, o, u) {
    let bb = 1;
    for (var i = 0, a = 0, s = 0; s < e.length; s++) (i += t.measureText(e[s]).width) > u && (t.fillText(e.substring(a, s), r, n),
      n += 22, i = 0, a = s, o += 30, bb += 1), s == e.length - 1 && t.fillText(e.substring(a, s + 1), r, n);
    return bb;
  },
  createCard: function () {
    const { avatar, name, time, value } = this.data;
    // 左侧
    i.fillStyle = "#dE685E";
    i.fillRect(0, 0, 150, 250);
    // 左侧文字
    i.setTextAlign("center");
    i.font = "normal bold 18px  黑体";
    i.fillStyle = "#fff";
    this.drawText(i, '舔狗日记', 45, 77, 60, 130);
    i.font = "normal bold 14px  黑体";
    this.drawText(i, name, 205, 77, 60, 130);
    i.setTextAlign("left");
    i.font = "normal bold 12px  黑体";
    this.drawText(i, '@舔狗日记生成器', 240, 25, 60, 150);

    // 右侧
    i.fillStyle = "#fff";
    i.fillRect(150, 0, 300, 250);
    // 右侧文字
    i.setTextAlign("left");
    i.font = "normal bold 22px  黑体";
    i.fillStyle = "#000";
    const id = this.drawText(i, time, 30, 170, 60, 252);
    // 内容
    i.font = "normal 14px 黑体";
    this.drawText(i, value, 54, 170, 60, 252);
    // 图片
    var width = 110;
    var height = 110;
    var circle = {
      x: width / 2,
      y: height / 2,
      r: width / 2
    }
    // i.clearRect(0, 0, width, height);
    //开始路径画圆,剪切处理
    i.save();
    i.beginPath();
    i.arc(75, 120, circle.r, 0, Math.PI * 2, false);
    i.clip(); //剪切路径
    i.drawImage(avatar, 20, 65, 110, 110);
    // 画图
    i.draw();

    setTimeout(() => this.getImg(), 200);
  },
  getImg: function () {
    const that = this;
    wx.canvasToTempFilePath({
      canvasId: "myCanvas",
      success: function (t) {
        that.setData({
          img: t.tempFilePath
        });
        wx.hideLoading();
      }
    });
  },
  save: function () {
    const that = this;
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.writePhotosAlbum']) {
          that.saveImg();
        } else if (res.authSetting['scope.writePhotosAlbum'] === undefined) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              that.saveImg();
            },
            fail() {
              wx.showToast({
                title: '您没有授权，无法保存到相册',
                icon: 'none'
              })
            }
          })
        } else {
          wx.openSetting({
            success(res) {
              if (res.authSetting['scope.writePhotosAlbum']) {
                that.saveImg();
              } else {
                wx.showToast({
                  title: '您没有授权，无法保存到相册',
                  icon: 'none'
                })
              }
            }
          })
        }
      }
    })

  },
  saveImg: function () {
    wx.canvasToTempFilePath({
      canvasId: "myCanvas",
      success: function (t) {
        console.log(t.tempFilePath);
        wx.saveImageToPhotosAlbum({
          filePath: t.tempFilePath,
          success: function (t) {
            wx.showModal({
              title: "提示",
              content: "保存成功",
              showCancel: !1,
              success: function (t) { }
            });
          },
          fail: function (t) {
            console.log(t);
          }
        });
      }
    });
  },
  openQZone: function () {
    const { time, value, img } = this.data;
    wx.openQzonePublish({
      text: `${time} ${value}`,
      media: [
        {
          type: 'photo',
          path: img
        }
      ]
    })
  },
  onShareAppMessage: function (e) {
    return {
      title: "做舔狗呢，最重要的是开心",
      path: "/pages/index/index",
      imageUrl: '/img/1.jpg'
    };
  },
})
