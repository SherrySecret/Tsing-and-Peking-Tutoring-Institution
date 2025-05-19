interface Homework {
  id: string;
  title: string;
  className: string;
  publishDate: string;
  deadline: string;
  submittedCount: number;
  totalCount: number;
  correctedCount: number;
  averageScore: number | null;
  status: 'pending' | 'correcting' | 'completed';
}

Page({
  data: {
    filter: 'all', // 筛选条件: all, pending, corrected
    selectedClass: '高一(1)班',
    classes: ['高一(1)班', '高一(2)班', '高一(3)班', '高二(1)班', '高二(2)班'],
    homeworks: [
      {
        id: '1',
        title: '第一章线性方程组课后作业',
        className: '高一(1)班',
        publishDate: '2023-09-15',
        deadline: '2023-09-20',
        submittedCount: 42,
        totalCount: 45,
        correctedCount: 42,
        averageScore: 88.5,
        status: 'completed'
      },
      {
        id: '2',
        title: '平面向量基本定理证明题',
        className: '高一(1)班',
        publishDate: '2023-09-18',
        deadline: '2023-09-23',
        submittedCount: 40,
        totalCount: 45,
        correctedCount: 25,
        averageScore: 82.3,
        status: 'correcting'
      },
      {
        id: '3',
        title: '三角函数基本关系练习题',
        className: '高一(1)班',
        publishDate: '2023-09-20',
        deadline: '2023-09-25',
        submittedCount: 38,
        totalCount: 45,
        correctedCount: 0,
        averageScore: null,
        status: 'pending'
      },
      {
        id: '4',
        title: '二次函数应用题专项练习',
        className: '高一(2)班',
        publishDate: '2023-09-17',
        deadline: '2023-09-22',
        submittedCount: 43,
        totalCount: 46,
        correctedCount: 43,
        averageScore: 90.2,
        status: 'completed'
      },
      {
        id: '5',
        title: '几何证明题训练',
        className: '高一(3)班',
        publishDate: '2023-09-19',
        deadline: '2023-09-24',
        submittedCount: 39,
        totalCount: 42,
        correctedCount: 0,
        averageScore: null,
        status: 'pending'
      }
    ] as Homework[],
    filteredHomeworks: [] as Homework[]
  },

  onLoad() {
    // 初始化筛选的作业列表
    this.filterHomeworks();
  },

  // 设置筛选条件
  setFilter(e: WechatMiniprogram.Touch) {
    const filter = e.currentTarget.dataset.filter;
    this.setData({
      filter
    });
    this.filterHomeworks();
  },

  // 根据条件筛选作业
  filterHomeworks() {
    let filtered = [...this.data.homeworks];
    
    // 按班级筛选
    if (this.data.selectedClass) {
      filtered = filtered.filter(homework => 
        homework.className === this.data.selectedClass
      );
    }
    
    // 按状态筛选
    if (this.data.filter === 'pending') {
      filtered = filtered.filter(homework => 
        homework.status === 'pending'
      );
    } else if (this.data.filter === 'corrected') {
      filtered = filtered.filter(homework => 
        homework.status === 'completed'
      );
    }
    
    this.setData({
      filteredHomeworks: filtered
    });
  },

  // 搜索作业
  searchHomework(e: WechatMiniprogram.Input) {
    const keyword = e.detail.value.trim().toLowerCase();
    let filtered = [...this.data.homeworks];
    
    // 按班级筛选
    if (this.data.selectedClass) {
      filtered = filtered.filter(homework => 
        homework.className === this.data.selectedClass
      );
    }
    
    // 按状态筛选
    if (this.data.filter === 'pending') {
      filtered = filtered.filter(homework => 
        homework.status === 'pending'
      );
    } else if (this.data.filter === 'corrected') {
      filtered = filtered.filter(homework => 
        homework.status === 'completed'
      );
    }
    
    // 按关键词搜索
    if (keyword) {
      filtered = filtered.filter(homework => 
        homework.title.toLowerCase().includes(keyword)
      );
    }
    
    this.setData({
      filteredHomeworks: filtered
    });
  },

  // 显示班级选择器
  showClassPicker() {
    wx.showActionSheet({
      itemList: this.data.classes,
      success: (res) => {
        if (res.tapIndex >= 0) {
          this.setData({
            selectedClass: this.data.classes[res.tapIndex]
          });
          this.filterHomeworks();
        }
      }
    });
  },

  // 前往作业详情页
  goToHomeworkDetail(e: WechatMiniprogram.Touch) {
    const homeworkId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/teacher/teaching/homework-detail?id=${homeworkId}`
    });
  },

  // 创建新作业
  createHomework() {
    wx.navigateTo({
      url: '/pages/teacher/class/create-homework'
    });
  }
}) 