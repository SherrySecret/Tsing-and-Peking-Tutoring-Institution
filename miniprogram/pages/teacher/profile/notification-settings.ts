Page({
  data: {
    // 通知设置
    classNotification: true,
    homeworkNotification: true,
    leaveNotification: true,
    scoreNotification: true,
    
    // 提醒方式
    soundEnabled: true,
    vibrationEnabled: true,
    
    // 免打扰
    doNotDisturbEnabled: false,
    doNotDisturbStartTime: '22:00',
    doNotDisturbEndTime: '07:00'
  },

  onLoad() {
    // 页面加载时执行
  },

  handleBack() {
    // 返回上一页
    wx.navigateBack({
      delta: 1
    });
  },

  toggleClassNotification(e: WechatMiniprogram.SwitchChange) {
    this.setData({
      classNotification: e.detail.value
    });
  },

  toggleHomeworkNotification(e: WechatMiniprogram.SwitchChange) {
    this.setData({
      homeworkNotification: e.detail.value
    });
  },

  toggleLeaveNotification(e: WechatMiniprogram.SwitchChange) {
    this.setData({
      leaveNotification: e.detail.value
    });
  },

  toggleScoreNotification(e: WechatMiniprogram.SwitchChange) {
    this.setData({
      scoreNotification: e.detail.value
    });
  },

  toggleSound(e: WechatMiniprogram.SwitchChange) {
    this.setData({
      soundEnabled: e.detail.value
    });
  },

  toggleVibration(e: WechatMiniprogram.SwitchChange) {
    this.setData({
      vibrationEnabled: e.detail.value
    });
  },

  toggleDoNotDisturb(e: WechatMiniprogram.SwitchChange) {
    this.setData({
      doNotDisturbEnabled: e.detail.value
    });
  },

  selectDoNotDisturbTime() {
    if (!this.data.doNotDisturbEnabled) {
      return;
    }
    
    // 这里可以实现时间选择功能
    wx.showToast({
      title: '时间选择功能开发中',
      icon: 'none'
    });
  }
}) 