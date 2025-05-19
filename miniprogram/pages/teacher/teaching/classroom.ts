interface Student {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline';
}

interface ClassRecord {
  id: string;
  time: string;
  type: string;
  content: string;
}

Page({
  data: {
    className: '高一(1)班',
    courseName: '数学',
    isClassRunning: false,
    classTime: 0,
    startTime: '',
    totalStudents: 45,
    presentStudents: 0,
    studentStatus: 'all',
    students: [
      { id: '1', name: '张三', avatar: '/assets/images/avatar1.png', status: 'offline' },
      { id: '2', name: '李四', avatar: '/assets/images/avatar2.png', status: 'offline' },
      { id: '3', name: '王五', avatar: '/assets/images/avatar3.png', status: 'offline' },
      { id: '4', name: '赵六', avatar: '/assets/images/avatar4.png', status: 'offline' },
      { id: '5', name: '钱七', avatar: '/assets/images/avatar5.png', status: 'offline' },
      { id: '6', name: '孙八', avatar: '/assets/images/avatar6.png', status: 'offline' },
      { id: '7', name: '周九', avatar: '/assets/images/avatar7.png', status: 'offline' },
      { id: '8', name: '吴十', avatar: '/assets/images/avatar8.png', status: 'offline' }
    ] as Student[],
    filteredStudents: [] as Student[],
    classRecords: [] as ClassRecord[],
    timer: null as number | null
  },

  onLoad() {
    // 初始化学生列表
    this.setData({
      filteredStudents: this.data.students
    });
  },

  onUnload() {
    // 清除定时器
    if (this.data.timer) {
      clearInterval(this.data.timer);
    }
  },

  // 返回上一页
  handleBack() {
    if (this.data.isClassRunning) {
      wx.showModal({
        title: '提示',
        content: '课堂还在进行中，确定要离开吗？',
        confirmColor: '#0052d9',
        success: (res) => {
          if (res.confirm) {
            wx.navigateBack({ delta: 1 });
          }
        }
      });
    } else {
      wx.navigateBack({ delta: 1 });
    }
  },

  // 切换课堂状态
  toggleClassStatus() {
    if (this.data.isClassRunning) {
      this.endClass();
    } else {
      this.startClass();
    }
  },

  // 开始上课
  startClass() {
    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    // 模拟学生上线
    const updatedStudents = this.data.students.map(student => {
      // 随机决定学生是否上线，大部分学生上线
      return {
        ...student,
        status: Math.random() > 0.2 ? 'online' : 'offline'
      };
    });
    
    const onlineStudents = updatedStudents.filter(s => s.status === 'online').length;
    
    this.setData({
      isClassRunning: true,
      startTime: timeString,
      classTime: 0,
      students: updatedStudents,
      filteredStudents: this.filterStudentsByStatus(updatedStudents, this.data.studentStatus),
      presentStudents: onlineStudents,
      classRecords: [
        {
          id: Date.now().toString(),
          time: timeString,
          type: '系统',
          content: '课堂开始'
        }
      ]
    });
    
    // 设置定时器更新课堂时间
    this.data.timer = setInterval(() => {
      this.setData({
        classTime: this.data.classTime + 1
      });
    }, 60000) as unknown as number; // 每分钟更新一次
  },

  // 结束课堂
  endClass() {
    wx.showModal({
      title: '结束课堂',
      content: '确定要结束当前课堂吗？',
      confirmColor: '#0052d9',
      success: (res) => {
        if (res.confirm) {
          // 清除定时器
          if (this.data.timer) {
            clearInterval(this.data.timer);
          }
          
          const now = new Date();
          const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
          
          // 添加课堂结束记录
          const updatedRecords = [...this.data.classRecords, {
            id: Date.now().toString(),
            time: timeString,
            type: '系统',
            content: '课堂结束'
          }];
          
          this.setData({
            isClassRunning: false,
            timer: null,
            classRecords: updatedRecords
          });
          
          // 显示课堂总结
          this.showClassSummary();
        }
      }
    });
  },

  // 切换学生状态筛选
  switchStatus(e: WechatMiniprogram.Touch) {
    const status = e.currentTarget.dataset.status;
    this.setData({
      studentStatus: status,
      filteredStudents: this.filterStudentsByStatus(this.data.students, status)
    });
  },

  // 根据状态筛选学生
  filterStudentsByStatus(students: Student[], status: string) {
    if (status === 'all') {
      return students;
    }
    return students.filter(student => student.status === status);
  },

  // 打开点名工具
  openRollCall() {
    if (!this.data.isClassRunning) {
      wx.showToast({
        title: '请先开始上课',
        icon: 'none'
      });
      return;
    }
    
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  // 打开随机抽人工具
  openRandomPick() {
    if (!this.data.isClassRunning) {
      wx.showToast({
        title: '请先开始上课',
        icon: 'none'
      });
      return;
    }
    
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  // 打开分组工具
  openGrouping() {
    if (!this.data.isClassRunning) {
      wx.showToast({
        title: '请先开始上课',
        icon: 'none'
      });
      return;
    }
    
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  // 打开计时器工具
  openTimer() {
    if (!this.data.isClassRunning) {
      wx.showToast({
        title: '请先开始上课',
        icon: 'none'
      });
      return;
    }
    
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  // 打开随堂测验工具
  openQuiz() {
    if (!this.data.isClassRunning) {
      wx.showToast({
        title: '请先开始上课',
        icon: 'none'
      });
      return;
    }
    
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  // 打开布置作业工具
  openHomework() {
    wx.navigateTo({
      url: '/pages/teacher/teaching/homework-manage'
    });
  },

  // 打开课堂资料工具
  openMaterials() {
    wx.navigateTo({
      url: '/pages/teacher/teaching/resources'
    });
  },

  // 打开屏幕共享工具
  openScreenShare() {
    if (!this.data.isClassRunning) {
      wx.showToast({
        title: '请先开始上课',
        icon: 'none'
      });
      return;
    }
    
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  // 显示课堂总结
  showClassSummary() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  }
}) 