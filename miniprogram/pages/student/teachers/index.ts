interface Teacher {
  id: string;
  name: string;
  avatar: string;
  role: string;
  subject: string;
  classes: string;
  phone?: string;
  email?: string;
  introduction?: string;
}

Page({
  data: {
    searchKeyword: '',
    teachers: [
      {
        id: '1',
        name: '李明强',
        avatar: '/assets/images/teacher-1.png',
        role: '班主任',
        subject: '数学',
        classes: '高一(3)班',
        phone: '13812345678',
        email: 'limingqiang@school.edu.cn',
        introduction: '从教15年，数学教学经验丰富，多次获得市级优秀教师称号。'
      },
      {
        id: '2',
        name: '王丽',
        avatar: '/assets/images/teacher-2.png',
        role: '任课教师',
        subject: '语文',
        classes: '高一(1)班, 高一(3)班',
        phone: '13812345679',
        email: 'wangli@school.edu.cn',
        introduction: '语文高级教师，善于激发学生的阅读兴趣和写作能力。'
      },
      {
        id: '3',
        name: '张伟',
        avatar: '/assets/images/teacher-3.png',
        role: '任课教师',
        subject: '英语',
        classes: '高一(3)班, 高一(4)班',
        phone: '13812345680',
        email: 'zhangwei@school.edu.cn',
        introduction: '毕业于北京外国语大学，英语专业，有海外学习经历，口语教学见长。'
      }
    ] as Teacher[],
    filteredTeachers: [] as Teacher[],
    activeTabBar: 'profile'
  },

  onLoad() {
    // 加载教师列表
    this.loadTeachers();
  },

  // 加载教师列表
  loadTeachers() {
    // 实际应用中，这里应该从API获取教师列表
    console.log('加载教师列表');
    
    // 初始化筛选后的教师列表
    this.setData({
      filteredTeachers: this.data.teachers
    });
  },

  // 搜索输入
  onSearchInput(e: any) {
    const keyword = e.detail.value;
    this.setData({
      searchKeyword: keyword
    });
    
    // 筛选教师
    this.filterTeachers(keyword);
  },

  // 筛选教师
  filterTeachers(keyword: string) {
    if (!keyword) {
      this.setData({
        filteredTeachers: this.data.teachers
      });
      return;
    }
    
    const filtered = this.data.teachers.filter(teacher => {
      return teacher.name.includes(keyword) || 
             teacher.subject.includes(keyword) || 
             teacher.role.includes(keyword) ||
             teacher.classes.includes(keyword);
    });
    
    this.setData({
      filteredTeachers: filtered
    });
  },

  // 查看教师详情
  viewTeacherDetail(e: any) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/student/teachers/detail?id=${id}`
    });
  },

  // 底部标签栏切换
  onTabBarChange(e: any) {
    const value = e.detail.value;
    this.setData({ activeTabBar: value });
    
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
        wx.navigateTo({ url: '/pages/student/profile/index' });
        break;
      default:
        break;
    }
  }
}); 