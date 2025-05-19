 // 学生类型定义
interface Student {
    id: string;
    name: string;
    avatar: string;
    status: 'present' | 'absent' | 'late';
  }
  
  // 班级类型定义
  interface Class {
    id: string;
    name: string;
  }
  
  Page({
    data: {
      currentDate: '',
      calendarVisible: false,
      activeClass: '1', // 当前选择的班级
      activeTabBar: 'class',
      classes: [
        { id: '1', name: '高三(1)班' },
        { id: '2', name: '高三(2)班' },
        { id: '3', name: '高二(3)班' }
      ] as Class[],
      students: [] as Student[],
      totalStudents: 0,
      presentCount: 0,
      absentCount: 0,
      lateCount: 0
    },
  
    onLoad() {
      // 初始化当前日期
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      const day = today.getDate();
      
      this.setData({
        currentDate: `${year}年${month}月${day}日`
      });
      
      // 加载默认班级的考勤数据
      this.loadAttendanceData(this.data.activeClass);
    },
  
    // 加载考勤数据
    loadAttendanceData(classId: string) {
      // 模拟API请求获取学生列表和考勤状态
      let students: Student[] = [];
      let totalStudents = 0;
      let presentCount = 0;
      let absentCount = 0;
      let lateCount = 0;
  
      if (classId === '1') {
        students = [
          { id: '1', name: '张三', avatar: '/assets/images/student-1.png', status: 'present' },
          { id: '2', name: '李四', avatar: '/assets/images/student-2.png', status: 'present' },
          { id: '3', name: '王五', avatar: '/assets/images/student-3.png', status: 'absent' },
          { id: '4', name: '赵六', avatar: '/assets/images/student-4.png', status: 'late' },
          { id: '5', name: '钱七', avatar: '/assets/images/student-5.png', status: 'present' }
        ];
        totalStudents = 5;
      } else if (classId === '2') {
        students = [
          { id: '6', name: '刘一', avatar: '/assets/images/student-6.png', status: 'present' },
          { id: '7', name: '陈二', avatar: '/assets/images/student-7.png', status: 'present' },
          { id: '8', name: '孙三', avatar: '/assets/images/student-8.png', status: 'present' },
          { id: '9', name: '周四', avatar: '/assets/images/student-9.png', status: 'absent' }
        ];
        totalStudents = 4;
      } else {
        students = [
          { id: '10', name: '吴五', avatar: '/assets/images/student-10.png', status: 'present' },
          { id: '11', name: '郑六', avatar: '/assets/images/student-11.png', status: 'late' },
          { id: '12', name: '冯七', avatar: '/assets/images/student-12.png', status: 'present' }
        ];
        totalStudents = 3;
      }
  
      // 计算各个状态的学生数量
      presentCount = students.filter(student => student.status === 'present').length;
      absentCount = students.filter(student => student.status === 'absent').length;
      lateCount = students.filter(student => student.status === 'late').length;
  
      this.setData({
        students,
        totalStudents,
        presentCount,
        absentCount,
        lateCount
      });
    },
  
    // 切换班级
    onClassChange(e: any) {
      const classId = e.detail.value;
      this.setData({
        activeClass: classId
      });
      this.loadAttendanceData(classId);
    },
  
    // 前一天
    prevDay() {
      // 实际应用中，这里应该计算前一天的日期
      wx.showToast({
        title: '切换到前一天',
        icon: 'none'
      });
    },
  
    // 后一天
    nextDay() {
      // 实际应用中，这里应该计算后一天的日期
      wx.showToast({
        title: '切换到后一天',
        icon: 'none'
      });
    },
  
    // 选择日期
    selectDate() {
      this.setData({
        calendarVisible: true
      });
    },
  
    // 日历确认选择
    onCalendarConfirm(e: any) {
      const { year, month, date } = e.detail;
      this.setData({
        currentDate: `${year}年${month}月${date}日`,
        calendarVisible: false
      });
      // 根据所选日期加载数据
    },
  
    // 标记为已到
    markPresent(e: any) {
      const id = e.currentTarget.dataset.id;
      this.updateStudentStatus(id, 'present');
    },
  
    // 标记为缺勤
    markAbsent(e: any) {
      const id = e.currentTarget.dataset.id;
      this.updateStudentStatus(id, 'absent');
    },
  
    // 标记为迟到
    markLate(e: any) {
      const id = e.currentTarget.dataset.id;
      this.updateStudentStatus(id, 'late');
    },
  
    // 更新学生考勤状态
    updateStudentStatus(id: string, status: 'present' | 'absent' | 'late') {
      const { students } = this.data;
      const updatedStudents = students.map(student => {
        if (student.id === id) {
          return { ...student, status };
        }
        return student;
      });
  
      // 重新计算统计数据
      const presentCount = updatedStudents.filter(student => student.status === 'present').length;
      const absentCount = updatedStudents.filter(student => student.status === 'absent').length;
      const lateCount = updatedStudents.filter(student => student.status === 'late').length;
  
      this.setData({
        students: updatedStudents,
        presentCount,
        absentCount,
        lateCount
      });
    },
  
    // 保存考勤记录
    saveAttendance() {
      wx.showLoading({
        title: '保存中'
      });
  
      setTimeout(() => {
        wx.hideLoading();
        wx.showToast({
          title: '保存成功',
          icon: 'success'
        });
      }, 1500);
    },
  
    // 底部导航栏切换
    onTabBarChange(e: any) {
      const value = e.detail.value;
      this.setData({ activeTabBar: value });
      
      // 根据切换的标签页进行页面跳转
      switch(value) {
        case 'home':
          wx.navigateTo({ url: '/pages/teacher/index/index' });
          break;
        case 'class':
          wx.navigateTo({ url: '/pages/teacher/class/class-list' });
          break;
        case 'teaching':
          wx.navigateTo({ url: '/pages/teacher/teaching/teaching' });
          break;
        case 'profile':
          wx.navigateTo({ url: '/pages/teacher/profile/profile' });
          break;
        default:
          break;
      }
    }
  });