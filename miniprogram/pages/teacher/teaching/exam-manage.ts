interface ClassOption {
  id: string;
  name: string;
}

interface ExamTypeOption {
  id: string;
  name: string;
}

interface Exam {
  id: string;
  title: string;
  subject: string;
  className: string;
  classId: string;
  examTime: string;
  location: string;
  teacher: string;
  status: 'upcoming' | 'completed' | 'pending';
  type: string; // 考试类型ID
}

Page({
  data: {
    selectedClassIndex: 0,
    selectedTypeIndex: 0,
    classes: [
      { id: 'all', name: '全部班级' },
      { id: 'c1', name: '高三（1）班' },
      { id: 'c2', name: '高三（2）班' },
      { id: 'c3', name: '高二（3）班' }
    ] as ClassOption[],
    examTypes: [
      { id: 'all', name: '全部类型' },
      { id: 't1', name: '期中考试' },
      { id: 't2', name: '期末考试' },
      { id: 't3', name: '单元测试' }
    ] as ExamTypeOption[],
    exams: [
      {
        id: '1',
        title: '高三期中考试',
        subject: '数学',
        className: '高三（1）班',
        classId: 'c1',
        examTime: '2024-05-15 09:00-11:00',
        location: '三楼301教室',
        teacher: '李老师',
        status: 'upcoming',
        type: 't1'
      },
      {
        id: '2',
        title: '高三第三次单元测试',
        subject: '数学',
        className: '高三（2）班',
        classId: 'c2',
        examTime: '2024-05-10 10:00-11:30',
        location: '三楼302教室',
        teacher: '王老师',
        status: 'completed',
        type: 't3'
      },
      {
        id: '3',
        title: '高二期末考试',
        subject: '数学',
        className: '高二（3）班',
        classId: 'c3',
        examTime: '2024-06-20 09:00-11:00',
        location: '二楼大阶梯教室',
        teacher: '李老师',
        status: 'pending',
        type: 't2'
      }
    ] as Exam[],
    filteredExams: [] as Exam[]
  },

  onLoad() {
    // 初始化筛选的考试列表
    this.filterExams();
  },

  // 筛选考试列表
  filterExams() {
    let filtered = [...this.data.exams];
    
    // 按班级筛选
    const selectedClassId = this.data.classes[this.data.selectedClassIndex].id;
    if (selectedClassId !== 'all') {
      filtered = filtered.filter(exam => exam.classId === selectedClassId);
    }
    
    // 按类型筛选
    const selectedTypeId = this.data.examTypes[this.data.selectedTypeIndex].id;
    if (selectedTypeId !== 'all') {
      filtered = filtered.filter(exam => exam.type === selectedTypeId);
    }
    
    this.setData({
      filteredExams: filtered
    });
  },

  // 班级选择变化
  handleClassChange(e: WechatMiniprogram.PickerChange) {
    this.setData({
      selectedClassIndex: Number(e.detail.value)
    });
    this.filterExams();
  },

  // 考试类型选择变化
  handleTypeChange(e: WechatMiniprogram.PickerChange) {
    this.setData({
      selectedTypeIndex: Number(e.detail.value)
    });
    this.filterExams();
  },

  // 查看考试详情
  viewExamDetail(e: WechatMiniprogram.Touch) {
    const examId = e.currentTarget.dataset.id;
    const exam = this.data.exams.find(item => item.id === examId);
    
    if (!exam) return;
    
    // 根据考试状态不同处理
    if (exam.status === 'completed') {
      // 查看成绩
      wx.navigateTo({
        url: `/pages/teacher/teaching/grade-manage?examId=${examId}`
      });
    } else if (exam.status === 'upcoming') {
      // 查看详情
      wx.navigateTo({
        url: `/pages/teacher/teaching/exam-detail?id=${examId}`
      });
    } else {
      // 编辑
      wx.navigateTo({
        url: `/pages/teacher/teaching/exam-edit?id=${examId}`
      });
    }
  },

  // 创建考试
  createExam() {
    wx.navigateTo({
      url: '/pages/teacher/teaching/exam-edit'
    });
  }
}) 