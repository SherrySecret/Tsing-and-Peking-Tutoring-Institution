Page({
  data: {
    // 当前选择的班级
    selectedClass: '高三（1）班',
    // 可选班级列表
    classList: ['高三（1）班', '高三（2）班', '高三（3）班'],
    // 班级选择器显示状态
    classPickerVisible: false,
    
    // 当前日期
    currentDate: '2023-05-15',
    // 日期选择器显示状态
    datePickerVisible: false,
    
    // 考勤统计数据
    attendanceStats: {
      total: 38,
      present: 32,
      absent: 3,
      late: 3,
      rate: 84.2
    },
    
    // 筛选状态
    filter: 'all',
    // 搜索关键字
    searchKeyword: '',
    
    // 学生列表数据
    students: [
      {
        id: '1',
        name: '张三',
        studentId: '20210101',
        avatar: '/assets/images/avatar1.png',
        status: 'present'
      },
      {
        id: '2',
        name: '李四',
        studentId: '20210102',
        avatar: '/assets/images/avatar2.png',
        status: 'present'
      },
      {
        id: '3',
        name: '王五',
        studentId: '20210103',
        avatar: '/assets/images/avatar3.png',
        status: 'absent'
      },
      {
        id: '4',
        name: '赵六',
        studentId: '20210104',
        avatar: '/assets/images/avatar4.png',
        status: 'late'
      }
    ],
    // 过滤后的学生列表
    filteredStudents: [] as any[]
  },

  onLoad() {
    // 初始化过滤后的学生列表
    this.filterStudents();
  },
  
  // 返回上一页
  handleBack() {
    wx.navigateBack();
  },
  
  // 显示班级选择器
  showClassPicker() {
    this.setData({
      classPickerVisible: true
    });
  },
  
  // 隐藏班级选择器
  hideClassPicker() {
    this.setData({
      classPickerVisible: false
    });
  },
  
  // 选择班级
  selectClass(e: any) {
    const classIndex = e.detail.index;
    this.setData({
      selectedClass: this.data.classList[classIndex],
      classPickerVisible: false
    });
    
    // 重新加载班级考勤数据
    this.loadClassAttendance();
  },
  
  // 显示日期选择器
  showDatePicker() {
    this.setData({
      datePickerVisible: true
    });
  },
  
  // 隐藏日期选择器
  hideDatePicker() {
    this.setData({
      datePickerVisible: false
    });
  },
  
  // 选择日期
  selectDate(e: any) {
    const date = e.detail.value;
    this.setData({
      currentDate: date,
      datePickerVisible: false
    });
    
    // 重新加载考勤数据
    this.loadClassAttendance();
  },
  
  // 加载班级考勤数据
  loadClassAttendance() {
    // 这里应该是实际从后端API加载数据的逻辑
    wx.showLoading({
      title: '加载中'
    });
    
    // 模拟加载数据
    setTimeout(() => {
      wx.hideLoading();
      // 生成随机考勤数据
      const total = 38;
      const present = Math.floor(Math.random() * 10) + 25;
      const absent = Math.floor(Math.random() * 5);
      const late = total - present - absent;
      const rate = Math.round((present / total) * 100 * 10) / 10;
      
      this.setData({
        'attendanceStats.total': total,
        'attendanceStats.present': present,
        'attendanceStats.absent': absent,
        'attendanceStats.late': late,
        'attendanceStats.rate': rate
      });
      
      this.filterStudents();
    }, 500);
  },
  
  // 设置过滤器
  setFilter(e: any) {
    const filter = e.currentTarget.dataset.filter;
    this.setData({
      filter
    });
    
    this.filterStudents();
  },
  
  // 搜索学生
  searchStudent(e: any) {
    const keyword = e.detail.value;
    this.setData({
      searchKeyword: keyword
    });
    
    this.filterStudents();
  },
  
  // 清除搜索
  clearSearch() {
    this.setData({
      searchKeyword: ''
    });
    
    this.filterStudents();
  },
  
  // 过滤学生列表
  filterStudents() {
    const { students, filter, searchKeyword } = this.data;
    
    let filtered = [...students];
    
    // 根据考勤状态过滤
    if (filter !== 'all') {
      filtered = filtered.filter(student => student.status === filter);
    }
    
    // 根据搜索关键字过滤
    if (searchKeyword) {
      filtered = filtered.filter(student => 
        student.name.includes(searchKeyword) || 
        student.studentId.includes(searchKeyword)
      );
    }
    
    this.setData({
      filteredStudents: filtered
    });
  },
  
  // 更新学生考勤状态
  updateStatus(e: any) {
    const { id, status } = e.currentTarget.dataset;
    const students = this.data.students.map(student => {
      if (student.id === id) {
        return { ...student, status };
      }
      return student;
    });
    
    this.setData({ students }, () => {
      this.updateAttendanceStats();
      this.filterStudents();
    });
    
    // 实际应用中应该调用API保存更新
    wx.showToast({
      title: '状态已更新',
      icon: 'success'
    });
  },
  
  // 更新考勤统计数据
  updateAttendanceStats() {
    const { students } = this.data;
    const total = students.length;
    const present = students.filter(s => s.status === 'present').length;
    const absent = students.filter(s => s.status === 'absent').length;
    const late = students.filter(s => s.status === 'late').length;
    const rate = Math.round((present / total) * 100 * 10) / 10;
    
    this.setData({
      'attendanceStats.total': total,
      'attendanceStats.present': present,
      'attendanceStats.absent': absent,
      'attendanceStats.late': late,
      'attendanceStats.rate': rate
    });
  },
  
  // 发起考勤
  startAttendance() {
    wx.showModal({
      title: '发起考勤',
      content: '确定要向所有学生发起考勤请求吗？',
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({
            title: '处理中'
          });
          
          // 模拟发起考勤
          setTimeout(() => {
            wx.hideLoading();
            wx.showToast({
              title: '考勤已发起',
              icon: 'success'
            });
          }, 1000);
        }
      }
    });
  },
  
  // 导出考勤记录
  exportAttendance() {
    wx.showLoading({
      title: '导出中'
    });
    
    // 模拟导出考勤记录
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '导出成功',
        icon: 'success'
      });
    }, 1000);
  }
}); 