Page({
  data: {
    inviteCode: '',
    students: [
      {
        id: '1',
        name: '王小明',
        avatar: '/assets/images/avatar-1.png',
        school: '第一中学',
        grade: '高一(1)班'
      },
      {
        id: '2',
        name: '李小红',
        avatar: '/assets/images/avatar-2.png',
        school: '实验中学',
        grade: '初三(2)班'
      }
    ],
    selectedStudentId: '',
    canJoin: false,
    joinSuccess: false,
    className: '高一数学进阶班'
  },

  onLoad() {
    // 加载已存在的学生档案
    this.loadStudentProfiles();
  },

  // 返回上一页
  goBack() {
    // 获取页面栈
    const pages = getCurrentPages();
    
    // 如果有上一页，则返回上一页
    if (pages.length > 1) {
      wx.navigateBack();
    } else {
      // 如果没有上一页，则跳转到班级列表页
      wx.navigateTo({
        url: '/pages/student/class/index'
      });
    }
  },

  // 加载学生档案
  loadStudentProfiles() {
    // 实际应用中应该从本地存储或API获取学生档案
    console.log('加载学生档案');
    
    // 如果有默认学生，自动选择第一个
    if (this.data.students.length > 0) {
      this.setData({
        selectedStudentId: this.data.students[0].id
      });
      this.checkCanJoin();
    }
  },

  // 邀请码输入
  onInviteCodeInput(e: any) {
    this.setData({
      inviteCode: e.detail.value
    });
    this.checkCanJoin();
  },

  // 选择学生
  onStudentSelect(e: any) {
    this.setData({
      selectedStudentId: e.detail.value
    });
    this.checkCanJoin();
  },

  // 检查是否可以加入
  checkCanJoin() {
    const { inviteCode, selectedStudentId } = this.data;
    const canJoin = inviteCode.length === 6 && selectedStudentId !== '';
    
    this.setData({ canJoin });
  },

  // 扫描二维码
  scanQRCode() {
    wx.scanCode({
      scanType: ['qrCode'],
      success: (res) => {
        // 假设二维码内容就是邀请码
        const inviteCode = res.result.substring(0, 6);
        this.setData({
          inviteCode
        });
        this.checkCanJoin();

        // 扫码成功提示
        wx.showToast({
          title: '扫描成功',
          icon: 'success'
        });
      },
      fail: () => {
        wx.showToast({
          title: '扫描失败',
          icon: 'none'
        });
      }
    });
  },

  // 添加新学生档案
  addNewStudent() {
    wx.navigateTo({
      url: '/pages/student/profile/add-student?redirect=join'
    });
  },

  // 加入班级
  joinClass() {
    const { inviteCode, selectedStudentId } = this.data;
    if (!inviteCode || !selectedStudentId) {
      return;
    }

    wx.showLoading({
      title: '加入中...'
    });

    // 模拟加入班级的请求
    setTimeout(() => {
      wx.hideLoading();
      
      // 加入成功，显示成功弹窗
      this.setData({
        joinSuccess: true
      });
    }, 1500);
  },

  // 弹窗状态变化
  onPopupChange(e: any) {
    this.setData({
      joinSuccess: e.detail.visible
    });
  },

  // 进入班级详情
  goToClassDetail() {
    // 关闭弹窗
    this.setData({
      joinSuccess: false
    });
    
    // 延迟跳转，等待弹窗关闭动画
    setTimeout(() => {
      wx.navigateTo({
        url: '/pages/student/class/detail?id=999'  // 假设新加入的班级id是999
      });
    }, 300);
  }
}); 