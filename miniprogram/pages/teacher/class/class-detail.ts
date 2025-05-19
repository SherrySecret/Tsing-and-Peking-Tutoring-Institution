// 教师班级详情页面
Page({
  data: {
    activeTab: 'class',
    classId: null, // 班级ID
    classInfo: {
      id: 1,
      name: '高三（1）班',
      code: 'CLASS001',
      role: '班主任',
      color: 'yellow',
      iconColor: 'f59e0b',
      studentCount: 38,
      teacherCount: 6,
      homeworkCount: 12,
      attendanceRate: 95
    },
    notices: [
      {
        id: 1,
        title: '关于期中考试安排的通知',
        time: '2023-03-15 14:30',
        readCount: 35
      },
      {
        id: 2,
        title: '家长会时间通知',
        time: '2023-03-10 09:15',
        readCount: 32
      },
      {
        id: 3,
        title: '关于调课的通知',
        time: '2023-03-08 16:45',
        readCount: 38
      }
    ],
    pendingHomework: [
      {
        id: 1,
        title: '数学作业 - 三角函数练习题',
        pendingCount: 5,
        totalCount: 38,
        deadline: '2023-03-18 22:00'
      },
      {
        id: 2,
        title: '数学作业 - 几何证明练习',
        pendingCount: 7,
        totalCount: 38,
        deadline: '2023-03-15 22:00'
      }
    ],
    attendance: {
      present: 35,
      absent: 1,
      leave: 2,
      late: 0
    }
  },
  
  onLoad(options: any) {
    // 获取班级ID
    if (options.id) {
      this.setData({
        classId: options.id
      });
      
      // 根据班级ID获取班级信息
      this.getClassInfo(options.id);
    }
  },
  
  // 获取班级信息
  getClassInfo(classId: string | null) {
    // 实际应用中，这里应该从服务器获取班级详情
    console.log('获取班级信息，ID：', classId);
  },
  
  // 显示更多操作菜单
  showMoreActions() {
    wx.showActionSheet({
      itemList: ['创建班级通知', '刷新班级信息', '班级设置'],
      success: (res) => {
        if (res.tapIndex === 0) {
          // 创建班级通知
          this.createNotice();
        } else if (res.tapIndex === 1) {
          // 刷新班级信息
          this.getClassInfo(this.data.classId);
        } else if (res.tapIndex === 2) {
          // 班级设置
          this.navigateToClassSettings();
        }
      }
    });
  },
  
  // 创建班级通知
  createNotice() {
    wx.navigateTo({
      url: `/pages/teacher/class/notice-manage?id=${this.data.classId}&action=create`
    });
  },
  
  // 前往班级设置
  navigateToClassSettings() {
    wx.navigateTo({
      url: `/pages/teacher/class/class-manage?id=${this.data.classId}`
    });
  },
  
  // 跳转到作业详情
  goToHomeworkDetail(e: any) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/teacher/teaching/homework-detail?id=${id}&classId=${this.data.classId}`
    });
  },
  
  // 开始考勤
  startAttendance() {
    wx.navigateTo({
      url: `/pages/teacher/class/attendance?id=${this.data.classId}&action=start`
    });
  },
  
  onTabBarChange(e: any) {
    const { value } = e.detail;
    this.setData({ activeTab: value });
    
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
}) 