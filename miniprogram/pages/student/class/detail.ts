// 学生班级详情页面
Page({
  data: {
    classId: null, // 班级ID
    classInfo: {
      id: 1,
      name: '高一(1)班',
      code: 'CLASS001',
      color: 'blue',
      iconColor: '0052d9',
      studentCount: 45,
      teacherCount: 6,
      noticeCount: 3,
      homeworkCount: 5
    },
    notices: [
      {
        id: 1,
        title: '关于下周班会时间的通知',
        time: '2023-03-15 14:30'
      },
      {
        id: 2,
        title: '期中考试时间安排',
        time: '2023-03-10 09:15'
      },
      {
        id: 3,
        title: '教室卫生值日安排',
        time: '2023-03-08 16:45'
      }
    ],
    homeworks: [
      {
        id: 1,
        title: '数学作业 - 三角函数练习题',
        subject: '数学',
        status: '必交',
        deadline: '2023-03-18 22:00',
        submitted: true
      },
      {
        id: 2,
        title: '语文作业 - 阅读理解与写作',
        subject: '语文',
        status: '必交',
        deadline: '2023-03-17 22:00',
        submitted: false
      },
      {
        id: 3,
        title: '英语作业 - 单元测试卷',
        subject: '英语',
        status: '必交',
        deadline: '2023-03-16 22:00',
        submitted: true
      }
    ]
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
      itemList: ['刷新班级信息', '退出班级'],
      success: (res) => {
        if (res.tapIndex === 0) {
          // 刷新班级信息
          this.getClassInfo(this.data.classId);
        } else if (res.tapIndex === 1) {
          // 退出班级
          this.confirmExitClass();
        }
      }
    });
  },
  
  // 确认退出班级
  confirmExitClass() {
    wx.showModal({
      title: '确认退出',
      content: '确定要退出该班级吗？',
      confirmText: '退出',
      confirmColor: '#ff4d4f',
      success: (res) => {
        if (res.confirm) {
          // 用户点击确认，执行退出操作
          this.exitClass();
        }
      }
    });
  },
  
  // 退出班级
  exitClass() {
    // 实际应用中，这里应该调用服务器接口退出班级
    console.log('退出班级，ID：', this.data.classId);
    wx.showToast({
      title: '已退出班级',
      icon: 'success',
      success: () => {
        // 退出成功后返回班级列表页
        setTimeout(() => {
          wx.navigateBack();
        }, 1500);
      }
    });
  }
}) 