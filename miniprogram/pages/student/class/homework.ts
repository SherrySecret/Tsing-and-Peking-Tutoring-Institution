// 班级作业页面
interface HomeworkItem {
  id: number;
  title: string;
  teacher: string;
  subject: string;
  publishTime: string;
  deadline: string;
  status: 'pending' | 'submitted' | 'graded';
  isOverdue: boolean;
  score?: string;
}

Page({
  data: {
    activeTab: 'all',
    activeTabBar: 'class',
    classId: null, // 班级ID
    homework: [
      {
        id: 1,
        title: '数学作业 - 三角函数练习题',
        teacher: '李老师',
        subject: '数学',
        publishTime: '2023-03-15',
        deadline: '2023-03-18 22:00',
        status: 'submitted',
        isOverdue: false
      },
      {
        id: 2,
        title: '语文作业 - 阅读理解与写作',
        teacher: '王老师',
        subject: '语文',
        publishTime: '2023-03-14',
        deadline: '2023-03-17 22:00',
        status: 'pending',
        isOverdue: false
      },
      {
        id: 3,
        title: '英语作业 - 单元测试卷',
        teacher: '张老师',
        subject: '英语',
        publishTime: '2023-03-10',
        deadline: '2023-03-16 22:00',
        status: 'graded',
        isOverdue: false,
        score: '92'
      },
      {
        id: 4,
        title: '物理作业 - 力学问题集',
        teacher: '刘老师',
        subject: '物理',
        publishTime: '2023-03-08',
        deadline: '2023-03-12 22:00',
        status: 'graded',
        isOverdue: true,
        score: '85'
      }
    ] as HomeworkItem[],
    filteredHomework: [] as HomeworkItem[]
  },
  
  onLoad(options: any) {
    // 获取班级ID
    if (options.id) {
      this.setData({
        classId: options.id
      });
    }
    
    // 初始化筛选后的作业列表
    this.filterHomework();
  },
  
  // 标签页切换
  onTabChange(e: any) {
    const { value } = e.detail;
    this.setData({
      activeTab: value
    });
    this.filterHomework();
  },
  
  // 筛选作业
  filterHomework() {
    const { homework, activeTab } = this.data;
    
    let filtered;
    if (activeTab === 'all') {
      filtered = [...homework];
    } else {
      filtered = homework.filter(item => item.status === activeTab);
    }
    
    this.setData({
      filteredHomework: filtered
    });
  },
  
  onTabBarChange(e: any) {
    const { value } = e.detail;
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
}) 