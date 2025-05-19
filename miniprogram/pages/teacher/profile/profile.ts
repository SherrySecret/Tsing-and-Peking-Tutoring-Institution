Page({
  data: {
    userInfo: {
      name: '张老师',
      avatar: '/assets/images/default-avatar.png',
      school: '示范中学'
    },
    teachingYears: 5,
    classCount: 3,
    studentCount: 87
  },

  onLoad() {
    // 页面加载时初始化数据
    this.loadUserData();
  },

  // 加载用户数据
  loadUserData() {
    // 这里可以添加从服务器获取用户数据的逻辑
    // 目前使用模拟数据
  },

  // 跳转到编辑资料页面
  navigateToEditProfile() {
    wx.navigateTo({
      url: '/pages/teacher/profile/edit-profile'
    });
  },

  // 跳转到安全设置页面
  navigateToSecurity() {
    wx.navigateTo({
      url: '/pages/teacher/profile/security'
    });
  },

  // 跳转到通知设置页面
  navigateToNotifications() {
    wx.navigateTo({
      url: '/pages/teacher/profile/notification-settings'
    });
  },

  // 跳转到关于我们页面
  navigateToAbout() {
    wx.navigateTo({
      url: '/pages/teacher/profile/about'
    });
  },

  // 联系客服
  contactCustomerService() {
    wx.showActionSheet({
      itemList: ['拨打客服电话', '复制客服微信号'],
      success: (res) => {
        if (res.tapIndex === 0) {
          wx.makePhoneCall({
            phoneNumber: '400-123-4567',
            fail: () => {
              wx.showToast({
                title: '拨打电话失败',
                icon: 'none'
              });
            }
          });
        } else if (res.tapIndex === 1) {
          wx.setClipboardData({
            data: 'eduservice',
            success: () => {
              wx.showToast({
                title: '客服微信号已复制',
                icon: 'success'
              });
            }
          });
        }
      }
    });
  },

  // 意见反馈
  provideFeedback() {
    wx.navigateTo({
      url: '/pages/common/feedback'
    });
  }
}) 