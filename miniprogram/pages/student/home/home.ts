// 学生首页
Page({
  data: {
    activeTab: 'home'
  },
  
  onLoad() {
    // 页面加载时执行
  },
  
  onTabBarChange(e: any) {
    const { value } = e.detail;
    this.setData({
      activeTab: value
    });
    
// 根据切换的标签页进行页面跳转
switch(value) {
  case 'home':
    // 当前页面，不跳转
    break;
  case 'class':
    wx.navigateTo({ url: '/pages/student/class/index' });
    break;
  case 'features':
    wx.navigateTo({ url: '/pages/student/features/index' });
    break;
  case 'profile':
    wx.navigateTo({ url: '/pages/student/profile/index' });
    break;
  default:
    break;
}
  }
}) 