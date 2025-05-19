// 入口页面
Page({
  data: {
    // 页面数据
  },
  onLoad() {
    // 页面加载时执行
  },
  // 导航到教师页面
  navigateToTeacher() {
    wx.navigateTo({
      url: '/pages/teacher/index/index'
    });
  },
  // 导航到学生页面
  navigateToStudent() {
    wx.navigateTo({
      url: '/pages/student/home/home'
    });
  }
}) 