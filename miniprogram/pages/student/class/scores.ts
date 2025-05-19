// pages/student/class/scores.ts
interface ScoreItem {
  subject: string;
  score: number;
  fullScore: number;
  rank?: number;
}

interface ExamItem {
  id: string;
  name: string;
  date: string;
  scores: ScoreItem[];
  totalScore: number;
  rank: number;
  totalStudents: number;
}

Page({
  data: {
    classId: '',
    className: '高一(3)班',
    semester: '2023-2024学年 第一学期',
    activeTabBar: 'class',
    
    // 考试列表
    examList: [
      { id: '1', name: '期中考试' },
      { id: '2', name: '月考(10月)' },
      { id: '3', name: '单元测试(第三单元)' }
    ],
    currentExamIndex: 0,
    
    // 当前查看的考试成绩
    currentExamScores: [
      { subject: '语文', score: 88, fullScore: 120, rank: 15 },
      { subject: '数学', score: 95, fullScore: 120, rank: 8 },
      { subject: '英语', score: 92, fullScore: 100, rank: 12 },
      { subject: '物理', score: 78, fullScore: 100, rank: 18 },
      { subject: '化学', score: 82, fullScore: 100, rank: 14 }
    ] as ScoreItem[],
    
    // 历史考试记录
    historyExams: [
      { 
        id: '1', 
        name: '期中考试', 
        date: '2023-10-27',
        totalScore: 435,
        rank: 12,
        totalStudents: 45
      },
      { 
        id: '2', 
        name: '月考(10月)', 
        date: '2023-10-15',
        totalScore: 420,
        rank: 15,
        totalStudents: 45
      },
      { 
        id: '3', 
        name: '单元测试(第三单元)', 
        date: '2023-09-28',
        totalScore: 276,
        rank: 10,
        totalStudents: 45
      }
    ] as ExamItem[]
  },

  onLoad(options: any) {
    if (options.id) {
      this.setData({
        classId: options.id
      });
    }
    
    // 加载成绩数据
    this.loadScoreData();
  },

  // 加载成绩数据
  loadScoreData() {
    // 实际应用中，这里应该从API获取成绩数据
    console.log('加载成绩数据');
  },

  // 切换考试
  onExamChange(e: any) {
    const index = e.detail.value;
    this.setData({
      currentExamIndex: index
    });
    
    // 根据选择的考试加载对应的科目成绩
    this.loadExamScores(this.data.examList[index].id);
  },

  // 加载某次考试的成绩
  loadExamScores(examId: string) {
    // 实际应用中，这里应该从API获取具体考试的成绩数据
    console.log(`加载考试ID: ${examId}的成绩`);
    
    // 模拟数据
    if (examId === '2') {
      this.setData({
        currentExamScores: [
          { subject: '语文', score: 82, fullScore: 120, rank: 18 },
          { subject: '数学', score: 90, fullScore: 120, rank: 12 },
          { subject: '英语', score: 88, fullScore: 100, rank: 15 },
          { subject: '物理', score: 75, fullScore: 100, rank: 20 },
          { subject: '化学', score: 85, fullScore: 100, rank: 10 }
        ]
      });
    } else if (examId === '3') {
      this.setData({
        currentExamScores: [
          { subject: '语文', score: 42, fullScore: 60, rank: 10 },
          { subject: '数学', score: 51, fullScore: 60, rank: 8 },
          { subject: '英语', score: 52, fullScore: 60, rank: 12 },
          { subject: '物理', score: 43, fullScore: 60, rank: 15 },
          { subject: '化学', score: 45, fullScore: 60, rank: 9 }
        ]
      });
    }
  },

  // 查看考试详情
  viewExamDetail(e: any) {
    const id = e.currentTarget.dataset.id;
    // 实际应用中，应该跳转到考试详情页
    wx.showToast({
      title: `查看考试ID: ${id}的详情`,
      icon: 'none'
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