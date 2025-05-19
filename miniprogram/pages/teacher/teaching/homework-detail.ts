interface HomeworkDetail {
  id: string;
  title: string;
  className: string;
  publishDate: string;
  deadline: string;
  description: string;
  files?: Array<{ name: string; url: string }>;
  totalCount: number;
  submittedCount: number;
  correctedCount: number;
  averageScore: number | null;
  highestScore?: number;
  lowestScore?: number;
  passRate?: number;
  scoreDistribution?: boolean;
}

interface StudentSubmission {
  studentId: string;
  name: string;
  avatar: string;
  studentNumber: string;
  submitted: boolean;
  submissionTime?: string;
  corrected: boolean;
  score?: number;
}

Page({
  data: {
    id: '',
    homework: {
      id: '1',
      title: '第一章线性方程组课后作业',
      className: '高一(1)班',
      publishDate: '2023-09-15',
      deadline: '2023-09-20',
      description: '完成教材P25-P28的习题1-10，要求写出完整的解题过程，并且标注清楚每道题的解题思路。对于有多种解法的题目，鼓励尝试不同的解题方法。',
      files: [
        { name: '线性方程组补充题.pdf', url: 'https://example.com/homework1.pdf' },
        { name: '习题解析.docx', url: 'https://example.com/homework1-solution.docx' }
      ],
      totalCount: 45,
      submittedCount: 42,
      correctedCount: 42,
      averageScore: 88.5,
      highestScore: 100,
      lowestScore: 65,
      passRate: 95,
      scoreDistribution: true
    } as HomeworkDetail,
    studentSubmissions: [
      {
        studentId: '1',
        name: '张三',
        avatar: '/assets/images/avatar1.png',
        studentNumber: '20230101',
        submitted: true,
        submissionTime: '2023-09-18 15:30',
        corrected: true,
        score: 92
      },
      {
        studentId: '2',
        name: '李四',
        avatar: '/assets/images/avatar2.png',
        studentNumber: '20230102',
        submitted: true,
        submissionTime: '2023-09-19 09:15',
        corrected: true,
        score: 85
      },
      {
        studentId: '3',
        name: '王五',
        avatar: '/assets/images/avatar3.png',
        studentNumber: '20230103',
        submitted: true,
        submissionTime: '2023-09-19 22:45',
        corrected: true,
        score: 78
      },
      {
        studentId: '4',
        name: '赵六',
        avatar: '/assets/images/avatar4.png',
        studentNumber: '20230104',
        submitted: false,
        corrected: false
      },
      {
        studentId: '5',
        name: '钱七',
        avatar: '/assets/images/avatar5.png',
        studentNumber: '20230105',
        submitted: true,
        submissionTime: '2023-09-20 08:10',
        corrected: true,
        score: 94
      }
    ] as StudentSubmission[],
    submissionFilter: 'all', // all, submitted, unsubmitted
    filteredSubmissions: [] as StudentSubmission[],
    searchKeyword: '',
    submissionPercentage: '0', // 添加预计算的提交百分比
    progressWidth: '0%' // 添加进度条宽度
  },

  onLoad(options) {
    if (options.id) {
      this.setData({
        id: options.id
      });
      
      // 在实际应用中，这里应该根据ID从服务器获取作业详情和提交情况
      // this.fetchHomeworkDetail(options.id);
    }
    
    // 计算提交百分比
    this.calculateSubmissionPercentage();
    
    // 初始化过滤的学生提交列表
    this.filterSubmissions();
  },

  // 计算提交百分比
  calculateSubmissionPercentage() {
    const { submittedCount, totalCount } = this.data.homework;
    const percentage = totalCount > 0 ? ((submittedCount / totalCount) * 100).toFixed(0) : '0';
    const progressWidth = totalCount > 0 ? (submittedCount / totalCount * 100) + '%' : '0%';
    this.setData({
      submissionPercentage: percentage,
      progressWidth: progressWidth
    });
  },

  // 预览文件
  previewFile(e: WechatMiniprogram.Touch) {
    const url = e.currentTarget.dataset.url;
    // 在实际应用中，根据文件类型处理预览逻辑
    wx.showToast({
      title: '正在准备预览...',
      icon: 'loading'
    });
    
    // 模拟文件预览
    setTimeout(() => {
      wx.hideToast();
      
      wx.showModal({
        title: '文件预览',
        content: '由于微信小程序限制，部分文件格式可能无法直接预览，是否下载？',
        confirmText: '下载',
        cancelText: '取消',
        success: (res) => {
          if (res.confirm) {
            wx.showToast({
              title: '开始下载',
              icon: 'success'
            });
          }
        }
      });
    }, 1000);
  },

  // 设置提交筛选条件
  setSubmissionFilter(e: WechatMiniprogram.Touch) {
    const filter = e.currentTarget.dataset.filter;
    this.setData({
      submissionFilter: filter
    });
    this.filterSubmissions();
  },

  // 根据条件筛选学生提交
  filterSubmissions() {
    let filtered = [...this.data.studentSubmissions];
    
    // 按提交状态筛选
    if (this.data.submissionFilter === 'submitted') {
      filtered = filtered.filter(student => student.submitted);
    } else if (this.data.submissionFilter === 'unsubmitted') {
      filtered = filtered.filter(student => !student.submitted);
    }
    
    // 按搜索关键词筛选
    if (this.data.searchKeyword) {
      const keyword = this.data.searchKeyword.toLowerCase();
      filtered = filtered.filter(student => 
        student.name.toLowerCase().includes(keyword) || 
        student.studentNumber.includes(keyword)
      );
    }
    
    this.setData({
      filteredSubmissions: filtered
    });
  },

  // 搜索学生
  searchStudent(e: WechatMiniprogram.Input) {
    const keyword = e.detail.value.trim();
    this.setData({
      searchKeyword: keyword
    });
    this.filterSubmissions();
  },

  // 查看提交详情
  viewSubmissionDetail(e: WechatMiniprogram.Touch) {
    const studentId = e.currentTarget.dataset.id;
    const student = this.data.studentSubmissions.find(s => s.studentId === studentId);
    
    if (!student) return;
    
    if (!student.submitted) {
      wx.showToast({
        title: '该学生尚未提交作业',
        icon: 'none'
      });
      return;
    }
    
    // 导航到作业提交详情页面
    wx.navigateTo({
      url: `/pages/teacher/teaching/submission-detail?homeworkId=${this.data.id}&studentId=${studentId}`
    });
  },

  // 提醒未交学生
  remindUnsubmitted() {
    const unsubmittedCount = this.data.studentSubmissions.filter(s => !s.submitted).length;
    
    if (unsubmittedCount === 0) {
      wx.showToast({
        title: '所有学生均已提交',
        icon: 'success'
      });
      return;
    }
    
    wx.showModal({
      title: '提醒确认',
      content: `将向${unsubmittedCount}名未提交作业的学生发送提醒，是否继续？`,
      confirmText: '确认',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          // 发送提醒的逻辑
          wx.showLoading({
            title: '发送提醒中'
          });
          
          // 模拟发送提醒
          setTimeout(() => {
            wx.hideLoading();
            wx.showToast({
              title: '提醒发送成功',
              icon: 'success'
            });
          }, 1500);
        }
      }
    });
  },

  // 批量批改
  batchCorrect() {
    const uncorrectedCount = this.data.studentSubmissions.filter(s => s.submitted && !s.corrected).length;
    
    if (uncorrectedCount === 0) {
      wx.showToast({
        title: '所有作业已批改完成',
        icon: 'success'
      });
      return;
    }
    
    // 导航到批量批改页面
    wx.navigateTo({
      url: `/pages/teacher/teaching/batch-correct?homeworkId=${this.data.id}`
    });
  }
}) 