// 学生班级列表页面
Page({
  data: {
    activeTab: 'class',
    classes: [
      {
        id: 1,
        name: '高一(1)班',
        teacher: '张老师',
        student: '徐小明',
        studentCount: 45,
        teacherCount: 6,
        color: 'blue',
        iconColor: '0052d9'
      },
      {
        id: 2,
        name: '高二(3)班',
        teacher: '李老师',
        student: '徐小华',
        studentCount: 42,
        teacherCount: 5,
        color: 'green',
        iconColor: '00a870'
      }
    ]
  },
  
  onLoad() {
    // 页面加载时执行
    // 在实际应用中，这里应该从服务器获取班级数据
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
        // 当前页面，不跳转
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