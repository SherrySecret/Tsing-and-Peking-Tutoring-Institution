Page({
  data: {
    faceIdEnabled: true,
    fingerprintEnabled: false
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

  navigateToPasswordChange() {
    // 跳转到修改密码页面
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  navigateToPhoneBinding() {
    // 跳转到手机绑定页面
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  navigateToEmailBinding() {
    // 跳转到邮箱绑定页面
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  toggleFaceId(e) {
    // 切换面容识别登录开关
    this.setData({
      faceIdEnabled: e.detail.value
    });

    wx.showToast({
      title: e.detail.value ? '面容识别已开启' : '面容识别已关闭',
      icon: 'none'
    });
  },

  toggleFingerprint(e) {
    // 切换指纹识别登录开关
    this.setData({
      fingerprintEnabled: e.detail.value
    });

    wx.showToast({
      title: e.detail.value ? '指纹识别已开启' : '指纹识别已关闭',
      icon: 'none'
    });
  },

  showLogoutConfirm() {
    // 显示退出登录确认对话框
    wx.showModal({
      title: '提示',
      content: '确定要退出当前账号吗？',
      confirmColor: '#0052d9',
      success: (res) => {
        if (res.confirm) {
          // 用户点击确定
          this.logout();
        }
      }
    });
  },

  logout() {
    // 执行退出登录操作
    wx.showLoading({
      title: '退出中...',
    });

    setTimeout(() => {
      wx.hideLoading();
      // 重定向到登录页面
      wx.reLaunch({
        url: '/pages/entry/entry'
      });
    }, 1000);
  }
}) 