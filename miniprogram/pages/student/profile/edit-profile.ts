interface UserInfo {
  id: string;
  avatar: string;
  name: string;
  gender: string;
  birthday: string;
  phone: string;
  school: string;
  grade: string;
  studentId: string;
  parentName: string;
  parentPhone: string;
}

Page({
  data: {
    userInfo: {
      id: '1',
      avatar: '/assets/images/avatar-default.png',
      name: '王小明',
      gender: '男',
      birthday: '2005-05-15',
      phone: '13812345678',
      school: '第一中学',
      grade: '高一(3)班',
      studentId: '20230105',
      parentName: '王大明',
      parentPhone: '13987654321'
    } as UserInfo,
    genders: ['男', '女'],
    genderIndex: 0,
    isChanged: false
  },

  onLoad() {
    // 实际应用中，这里应该从本地存储或API获取当前用户信息
    this.loadUserInfo();
    
    // 设置性别选择器的默认值
    const genderIndex = this.data.genders.findIndex(g => g === this.data.userInfo.gender);
    this.setData({
      genderIndex: genderIndex > -1 ? genderIndex : 0
    });
  },

  // 加载用户信息
  loadUserInfo() {
    console.log('加载用户信息');
  },

  // 选择头像
  chooseAvatar() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // 获取选中的临时文件路径
        const tempFilePath = res.tempFilePaths[0];
        this.setData({
          'userInfo.avatar': tempFilePath,
          isChanged: true
        });
      }
    });
  },

  // 处理输入框变化
  onInputChange(e: any) {
    const { field } = e.currentTarget.dataset;
    const { value } = e.detail;
    
    this.setData({
      [`userInfo.${field}`]: value,
      isChanged: true
    });
  },

  // 处理性别选择
  onGenderChange(e: any) {
    const genderIndex = e.detail.value;
    this.setData({
      genderIndex,
      'userInfo.gender': this.data.genders[genderIndex],
      isChanged: true
    });
  },

  // 处理生日选择
  onBirthdayChange(e: any) {
    this.setData({
      'userInfo.birthday': e.detail.value,
      isChanged: true
    });
  },

  // 验证表单
  validateForm() {
    const { userInfo } = this.data;
    
    if (!userInfo.name) {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      });
      return false;
    }
    
    if (!userInfo.school) {
      wx.showToast({
        title: '请输入学校',
        icon: 'none'
      });
      return false;
    }
    
    if (!userInfo.grade) {
      wx.showToast({
        title: '请输入年级班级',
        icon: 'none'
      });
      return false;
    }
    
    if (userInfo.phone && !/^1\d{10}$/.test(userInfo.phone)) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none'
      });
      return false;
    }
    
    if (userInfo.parentPhone && !/^1\d{10}$/.test(userInfo.parentPhone)) {
      wx.showToast({
        title: '家长手机号格式不正确',
        icon: 'none'
      });
      return false;
    }
    
    return true;
  },

  // 保存资料
  saveProfile() {
    if (!this.validateForm()) {
      return;
    }
    
    if (!this.data.isChanged) {
      wx.showToast({
        title: '未做任何修改',
        icon: 'none'
      });
      return;
    }
    
    wx.showLoading({
      title: '保存中...'
    });
    
    // 模拟上传头像和保存资料
    setTimeout(() => {
      wx.hideLoading();
      
      wx.showToast({
        title: '保存成功',
        icon: 'success'
      });
      
      // 返回上一页
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
    }, 2000);
  }
}); 