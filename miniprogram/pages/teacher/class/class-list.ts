// 教师班级列表页面
Page({
  data: {
    activeTabIndex: '0', // 默认显示班主任班级列表
    activeBarTab: 'class', // 底部导航栏默认选中项
    searchKeyword: '',
    headmasterClasses: [
      {
        id: 1,
        name: '高三（1）班',
        role: '班主任',
        studentCount: 38,
        color: 'yellow',
        iconColor: 'f59e0b'
      },
      {
        id: 4,
        name: '高二（6）班',
        role: '班主任',
        studentCount: 41,
        color: 'purple',
        iconColor: '9e67e7'
      }
    ],
    teachingClasses: [
      {
        id: 2,
        name: '高三（2）班',
        role: '数学老师',
        studentCount: 42,
        color: 'blue',
        iconColor: '0052d9'
      },
      {
        id: 3,
        name: '高二（3）班',
        role: '数学老师',
        studentCount: 39,
        color: 'green',
        iconColor: '00a870'
      }
    ]
  },
  
  onLoad() {
    // 页面加载时执行
  },
  
  onTabChange(e: any) {
    const { value } = e.detail;
    this.setData({
      activeTabIndex: value
    });
  },
  
  onSearchInput(e: any) {
    this.setData({
      searchKeyword: e.detail.value
    });
    // 根据输入内容搜索班级
    this.searchClasses();
  },
  
  searchClasses() {
    // 实际应用中，这里会调用后端接口进行搜索
    console.log('搜索关键词:', this.data.searchKeyword);
  },
  
  onGradeAnalysis(e: any) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/teacher/class/scores?id=${id}`
    });
  },
  
  onPublishHomework(e: any) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/teacher/class/create-homework?id=${id}`
    });
  },
  
  onClassNotice(e: any) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/teacher/class/notice-manage?id=${id}`
    });
  },
  
  onClassSettings(e: any) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/teacher/class/class-manage?id=${id}`
    });
  },
  
  onAttendance(e: any) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/teacher/class/attendance?id=${id}`
    });
  },
  
  onCreateClass() {
    wx.navigateTo({
      url: '/pages/teacher/class/create-class'
    });
  },
  
  onTabBarChange(e: any) {
    const { value } = e.detail;
    this.setData({ activeBarTab: value });
    
    // 根据切换的标签页进行页面跳转
    switch(value) {
      case 'home':
        wx.navigateTo({ url: '/pages/teacher/index/index' });
        break;
      case 'class':
        // 当前页面，不跳转
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