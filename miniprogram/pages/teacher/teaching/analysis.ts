interface Student {
  id: string;
  name: string;
  avatar: string;
  class: string;
  averageScore: number;
  homeworkRate: number;
  attendanceRate: number;
}

Page({
  data: {
    currentTab: 0,
    selectedClass: '高一(1)班',
    classes: ['高一(1)班', '高一(2)班', '高一(3)班', '高二(1)班', '高二(2)班'],
    studentList: [
      {
        id: '1',
        name: '张三',
        avatar: '/assets/images/avatar1.png',
        class: '高一(1)班',
        averageScore: 92,
        homeworkRate: 100,
        attendanceRate: 98
      },
      {
        id: '2',
        name: '李四',
        avatar: '/assets/images/avatar2.png',
        class: '高一(1)班',
        averageScore: 85,
        homeworkRate: 95,
        attendanceRate: 100
      },
      {
        id: '3',
        name: '王五',
        avatar: '/assets/images/avatar3.png',
        class: '高一(1)班',
        averageScore: 78,
        homeworkRate: 90,
        attendanceRate: 92
      },
      {
        id: '4',
        name: '赵六',
        avatar: '/assets/images/avatar4.png',
        class: '高一(1)班',
        averageScore: 63,
        homeworkRate: 85,
        attendanceRate: 88
      },
      {
        id: '5',
        name: '钱七',
        avatar: '/assets/images/avatar5.png',
        class: '高一(1)班',
        averageScore: 76,
        homeworkRate: 88,
        attendanceRate: 95
      }
    ] as Student[],
    filteredStudentList: [] as Student[]
  },

  onLoad() {
    // 初始化数据
    this.setData({
      filteredStudentList: this.data.studentList
    });
  },

  // 返回上一页
  handleBack() {
    wx.navigateBack({
      delta: 1
    });
  },

  // 切换标签页
  switchTab(e: WechatMiniprogram.Touch) {
    const index = parseInt(e.currentTarget.dataset.index);
    this.setData({
      currentTab: index
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
        }
      }
    });
  },

  // 搜索学生
  searchStudent(e: WechatMiniprogram.Input) {
    const keyword = e.detail.value.trim().toLowerCase();
    
    if (!keyword) {
      this.setData({
        filteredStudentList: this.data.studentList
      });
      return;
    }
    
    const filtered = this.data.studentList.filter(student => 
      student.name.toLowerCase().includes(keyword) || 
      student.class.toLowerCase().includes(keyword)
    );
    
    this.setData({
      filteredStudentList: filtered
    });
  },

  // 显示学生详情
  showStudentDetail(e: WechatMiniprogram.Touch) {
    const studentId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/teacher/teaching/student-detail?id=${studentId}`
    });
  }
}) 