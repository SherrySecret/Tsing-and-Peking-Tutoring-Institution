// 学生首页
Page({
  data: {
    activeTab: 'home',
    notices: [
      {
        title: '2023年春季学期开学通知',
        date: '2023-02-15'
      },
      {
        title: '系统更新：作业批改功能上线',
        date: '2023-02-10'
      },
      {
        title: '关于线上家长会的通知',
        date: '2023-02-05'
      }
    ]
  },
  
  onLoad() {
    // 页面加载时执行
  },
  
  onTabBarChange(e: any) {
    const { value } = e.detail;
    this.setData({ activeTab: value });
    
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