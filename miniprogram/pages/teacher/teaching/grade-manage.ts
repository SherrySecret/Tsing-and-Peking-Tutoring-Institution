interface ClassOption {
  id: string;
  name: string;
}

interface ExamOption {
  id: string;
  name: string;
}

interface GradeItem {
  id: string;
  examName: string;
  examDate: string;
  status: 'completed' | 'incomplete';
  className: string;
  classId: string;
  examId: string;
  averageScore?: number;
  highestScore?: number;
  lowestScore?: number;
  enteredCount: number;
  totalCount: number;
}

Page({
  data: {
    selectedClassIndex: 0,
    selectedExamIndex: 0,
    classes: [
      { id: 'all', name: '全部班级' },
      { id: 'c1', name: '高三（1）班' },
      { id: 'c2', name: '高三（2）班' },
      { id: 'c3', name: '高二（3）班' }
    ] as ClassOption[],
    exams: [
      { id: 'all', name: '全部考试' },
      { id: 'e1', name: '期中考试' },
      { id: 'e2', name: '期末考试' },
      { id: 'e3', name: '单元测试' }
    ] as ExamOption[],
    grades: [
      {
        id: '1',
        examName: '高三期中考试',
        examDate: '2024-04-15',
        status: 'completed',
        className: '高三（1）班',
        classId: 'c1',
        examId: 'e1',
        averageScore: 86.5,
        highestScore: 98,
        lowestScore: 65,
        enteredCount: 45,
        totalCount: 45
      },
      {
        id: '2',
        examName: '高三数学单元测试',
        examDate: '2024-03-25',
        status: 'completed',
        className: '高三（2）班',
        classId: 'c2',
        examId: 'e3',
        averageScore: 82.3,
        highestScore: 95,
        lowestScore: 60,
        enteredCount: 46,
        totalCount: 46
      },
      {
        id: '3',
        examName: '高二期末考试',
        examDate: '2024-01-15',
        status: 'incomplete',
        className: '高二（3）班',
        classId: 'c3',
        examId: 'e2',
        enteredCount: 0,
        totalCount: 39
      }
    ] as GradeItem[],
    filteredGrades: [] as GradeItem[]
  },

  onLoad(options) {
    // 如果是从考试管理页面跳转过来，根据examId筛选
    if (options && options.examId) {
      const examItem = this.data.grades.find(item => item.id === options.examId);
      if (examItem) {
        // 找到对应的班级和考试索引
        const classIndex = this.data.classes.findIndex(c => c.id === examItem.classId);
        const examIndex = this.data.exams.findIndex(e => e.id === examItem.examId);
        
        this.setData({
          selectedClassIndex: classIndex >= 0 ? classIndex : 0,
          selectedExamIndex: examIndex >= 0 ? examIndex : 0
        });
      }
    }
    
    // 初始化筛选的成绩列表
    this.filterGrades();
  },

  // 筛选成绩列表
  filterGrades() {
    let filtered = [...this.data.grades];
    
    // 按班级筛选
    const selectedClassId = this.data.classes[this.data.selectedClassIndex].id;
    if (selectedClassId !== 'all') {
      filtered = filtered.filter(grade => grade.classId === selectedClassId);
    }
    
    // 按考试类型筛选
    const selectedExamId = this.data.exams[this.data.selectedExamIndex].id;
    if (selectedExamId !== 'all') {
      filtered = filtered.filter(grade => grade.examId === selectedExamId);
    }
    
    this.setData({
      filteredGrades: filtered
    });
  },

  // 班级选择变化
  handleClassChange(e: WechatMiniprogram.PickerChange) {
    this.setData({
      selectedClassIndex: Number(e.detail.value)
    });
    this.filterGrades();
  },

  // 考试类型选择变化
  handleExamChange(e: WechatMiniprogram.PickerChange) {
    this.setData({
      selectedExamIndex: Number(e.detail.value)
    });
    this.filterGrades();
  },

  // 查看成绩详情
  viewGradeDetail(e: WechatMiniprogram.Touch) {
    const gradeId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/teacher/teaching/grade-detail?id=${gradeId}`
    });
  },

  // 录入成绩（通用）
  enterGrades() {
    wx.showActionSheet({
      itemList: ['选择考试录入', '导入成绩', '批量录入'],
      success: (res) => {
        switch (res.tapIndex) {
          case 0:
            this.showExamPicker();
            break;
          case 1:
            this.importGrades();
            break;
          case 2:
            this.batchEnterGrades();
            break;
        }
      }
    });
  },

  // 录入特定考试成绩
  enterExamGrade(e: WechatMiniprogram.Touch) {
    const gradeId = e.currentTarget.dataset.id;
    const grade = this.data.grades.find(item => item.id === gradeId);
    
    if (!grade) return;
    
    wx.navigateTo({
      url: `/pages/teacher/teaching/enter-grade?id=${gradeId}&className=${grade.className}&examName=${grade.examName}`
    });
  },

  // 显示考试选择器
  showExamPicker() {
    // 获取未完成的考试列表
    const incompleteExams = this.data.grades.filter(grade => grade.status === 'incomplete');
    
    if (incompleteExams.length === 0) {
      wx.showToast({
        title: '暂无未录入成绩的考试',
        icon: 'none'
      });
      return;
    }
    
    const examNames = incompleteExams.map(exam => `${exam.examName} - ${exam.className}`);
    
    wx.showActionSheet({
      itemList: examNames,
      success: (res) => {
        const selectedExam = incompleteExams[res.tapIndex];
        this.enterExamGrade({ currentTarget: { dataset: { id: selectedExam.id } } } as any);
      }
    });
  },

  // 导入成绩
  importGrades() {
    wx.showToast({
      title: '导入功能开发中',
      icon: 'none'
    });
  },

  // 批量录入成绩
  batchEnterGrades() {
    wx.showToast({
      title: '批量录入功能开发中',
      icon: 'none'
    });
  }
}) 