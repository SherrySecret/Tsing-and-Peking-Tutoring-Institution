// pages/teacher/class/scores.ts
Page({
  data: {
    examTypeList: ['全部考试', '期中考试', '期末考试', '单元测试'],
    semesterList: ['本学期', '上学期', '全年'],
    selectedExamType: 0,
    selectedSemester: 0,
    
    // 班级成绩概览数据
    overview: {
      averageScore: 86.5,
      highestScore: 98,
      lowestScore: 65,
      distribution: [
        { label: '优秀', percentage: 30, color: '#2BA471' },
        { label: '良好', percentage: 45, color: '#0052D9' },
        { label: '及格', percentage: 15, color: '#F37B1D' },
        { label: '不及格', percentage: 10, color: '#E34D59' }
      ]
    },
    
    // 学生成绩数据
    currentExamName: '高三期中考试成绩',
    studentScores: [
      { id: '20240101', name: '张三', score: 98, status: 'good' },
      { id: '20240102', name: '李四', score: 85, status: 'normal' },
      { id: '20240103', name: '王五', score: 65, status: 'poor' },
      { id: '20240104', name: '赵六', score: 75, status: 'medium' }
    ],
    
    // 弹窗控制
    showImportModal: false,
    examName: '',
    examSubject: '全科',
    examDate: '',
    uploadFile: null as any,
    filePreview: ''
  },

  onLoad() {
    // 页面加载时执行的函数
  },
  
  // 筛选切换
  changeExamType(e: any) {
    this.setData({
      selectedExamType: e.detail.value
    });
    this.fetchScoreData();
  },
  
  changeSemester(e: any) {
    this.setData({
      selectedSemester: e.detail.value
    });
    this.fetchScoreData();
  },
  
  // 获取成绩数据
  fetchScoreData() {
    // 这里添加获取成绩数据的代码
    // 实际项目中应该从服务器获取数据
    wx.showLoading({ title: '加载中' });
    
    setTimeout(() => {
      wx.hideLoading();
      // 模拟数据加载成功
    }, 500);
  },
  
  // 打开导入成绩弹窗
  openImportModal() {
    this.setData({
      showImportModal: true
    });
  },
  
  // 关闭导入成绩弹窗
  closeImportModal() {
    this.setData({
      showImportModal: false
    });
  },
  
  // 考试名称输入
  onExamNameInput(e: any) {
    this.setData({
      examName: e.detail.value
    });
  },
  
  // 选择考试科目
  onSubjectChange(e: any) {
    this.setData({
      examSubject: e.detail.value
    });
  },
  
  // 设置考试日期
  onDateChange(e: any) {
    this.setData({
      examDate: e.detail.value
    });
  },
  
  // 选择文件
  chooseFile() {
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      extension: ['.xlsx', '.xls', '.csv'],
      success: (res) => {
        const tempFile = res.tempFiles[0];
        this.setData({
          uploadFile: tempFile,
          filePreview: tempFile.name
        });
      }
    });
  },
  
  // 下载模板
  downloadTemplate() {
    wx.showToast({
      title: '模板下载中',
      icon: 'loading'
    });
    // 实际项目应该提供模板下载功能
  },
  
  // 提交导入成绩
  submitImport() {
    if (!this.data.examName) {
      wx.showToast({
        title: '请输入考试名称',
        icon: 'none'
      });
      return;
    }
    
    if (!this.data.examDate) {
      wx.showToast({
        title: '请选择考试时间',
        icon: 'none'
      });
      return;
    }
    
    if (!this.data.uploadFile) {
      wx.showToast({
        title: '请选择成绩文件',
        icon: 'none'
      });
      return;
    }
    
    wx.showLoading({ title: '导入中' });
    
    // 实际项目中应该上传文件到服务器
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '成绩导入成功',
        icon: 'success'
      });
      this.setData({
        showImportModal: false
      });
      // 重新加载成绩数据
      this.fetchScoreData();
    }, 1500);
  },
  
  // 查看更多学生
  viewMoreStudents() {
    wx.showToast({
      title: '加载更多学生',
      icon: 'loading'
    });
    // 实际项目中应该分页加载更多学生成绩
  }
}) 