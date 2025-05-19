// 教师首页
Page({
  data: {
    activeTab: 'home',
    teacherInfo: {
      name: '李老师',
      classCount: 3,
      studentCount: 89,
      homeworkPending: 12
    },
    classes: [
      {
        id: 1,
        name: '高三（1）班',
        role: '班主任',
        studentCount: 38,
        bgColor: 'yellow'
      },
      {
        id: 2,
        name: '高三（2）班',
        role: '数学老师',
        studentCount: 42,
        bgColor: 'blue'
      },
      {
        id: 3,
        name: '高二（3）班',
        role: '数学老师',
        studentCount: 39,
        bgColor: 'green'
      }
    ],
    todos: [
      {
        title: '高三（1）班物理作业批改',
        date: '今天',
        desc: '12份作业待批改',
        priority: 'red'
      },
      {
        title: '高三期中考试成绩录入',
        date: '明天',
        desc: '3个班级成绩待录入',
        priority: 'orange'
      },
      {
        title: '教研组会议',
        date: '后天',
        desc: '下午14:00，三楼会议室',
        priority: 'blue'
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
        wx.navigateTo({ url: '/pages/teacher/class/class-list' });
        break;
      case 'teaching':
        wx.navigateTo({ url: '/pages/teacher/teaching/teaching' });
        break;
      case 'profile':
        wx.navigateTo({ url: '/pages/teacher/profile/profile' });
        break;
      default:
        break;
    }
  }
}) 