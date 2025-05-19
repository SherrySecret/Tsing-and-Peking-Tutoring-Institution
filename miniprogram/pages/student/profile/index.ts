// 学生个人中心页面
Page({
  data: {
    activeTab: 'profile',
    userInfo: {
      name: '徐小明',
      school: '清华附中',
      grade: '高一年级'
    },
    classCount: 2,
    settings: {
      notification: true,
      autoLogin: true
    },
    appVersion: 'v1.0.0'
  },
  
  onLoad() {
    // 页面加载时执行
    this.getUserInfo();
    this.getClassCount();
  },
  
  // 获取用户信息
  getUserInfo() {
    // 实际应用中，这里应该从服务器或本地存储获取用户信息
    console.log('获取用户信息');
  },
  
  // 获取班级数量
  getClassCount() {
    // 实际应用中，这里应该从服务器获取班级数量
    console.log('获取班级数量');
  },
  
  // 切换消息通知设置
  toggleNotification() {
    this.setData({
      'settings.notification': !this.data.settings.notification
    });
    // 保存设置
    this.saveSettings();
  },
  
  // 切换自动登录设置
  toggleAutoLogin() {
    this.setData({
      'settings.autoLogin': !this.data.settings.autoLogin
    });
    // 保存设置
    this.saveSettings();
  },
  
  // 保存设置
  saveSettings() {
    // 实际应用中，这里应该将设置保存到服务器或本地存储
    console.log('保存设置:', this.data.settings);
    wx.showToast({
      title: '设置已保存',
      icon: 'success'
    });
  },
  
  // 联系我们
  contactUs() {
    wx.showModal({
      title: '联系我们',
      content: '如有问题请联系客服:\n电话: 400-123-4567\n邮箱: support@example.com',
      showCancel: false
    });
  },
  
  // 检查更新
  checkUpdate() {
    wx.showLoading({
      title: '检查更新中'
    });
    
    // 模拟检查更新
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '已是最新版本',
        icon: 'success'
      });
    }, 1500);
  },
  
  // 关于我们
  showAbout() {
    wx.showModal({
      title: '关于我们',
      content: '班级管理系统 v1.0.0\n© 2024 筑梦清北\n清北在线教育科技有限公司\n保留所有权利',
      showCancel: false
    });
  },
  
  // 退出登录
  logout() {
    wx.showModal({
      title: '确认退出',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          // 清除登录信息
          // 实际应用中，这里应该清除本地存储的登录信息
          console.log('退出登录');
          
          // 返回到登录页
          wx.reLaunch({
            url: '/pages/entry/entry'
          });
        }
      }
    });
  },
  
  onTabBarChange(e: any) {
    const { value } = e.detail;
    this.setData({ activeTab: value });
    
    // 根据切换的标签页进行页面跳转
    switch(value) {
      case 'home':
        wx.navigateTo({ url: '/pages/student/home/home' });
        break;
      case 'class':
        wx.navigateTo({ url: '/pages/student/class/index' });
        break;
      case 'features':
        wx.navigateTo({ url: '/pages/student/features/index' });
        break;
      case 'profile':
        // 当前页面，不跳转
        break;
      default:
        break;
    }
  }
}) 