interface UserInfo {
  avatar: string;
  name: string;
  gender: number;
  phone: string;
  email: string;
  school: string;
  subject: string;
  bio: string;
}

Page({
  data: {
    userInfo: {
      avatar: '/assets/images/default-avatar.png',
      name: '张老师',
      gender: 0,
      phone: '13800138000',
      email: 'teacher@example.com',
      school: '示范中学',
      subject: '数学',
      bio: '从事中学数学教学多年，教学经验丰富。'
    } as UserInfo,
    genderOptions: ['男', '女'],
    bioLength: 0,
    subjects: ['语文', '数学', '英语', '物理', '化学', '生物', '历史', '地理', '政治', '体育', '音乐', '美术', '信息技术']
  },

  onLoad() {
    // 设置个人简介字数
    this.setData({
      bioLength: this.data.userInfo.bio.length
    });
  },

  handleBack() {
    wx.navigateBack({
      delta: 1
    });
  },

  changeAvatar() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // 获取选中图片的临时路径
        const tempFilePath = res.tempFilePaths[0];
        
        // 更新头像
        this.setData({
          'userInfo.avatar': tempFilePath
        });
        
        // 上传头像到服务器（示例）
        wx.showToast({
          title: '头像更新成功',
          icon: 'success'
        });
      }
    });
  },

  onNameInput(e: WechatMiniprogram.Input) {
    this.setData({
      'userInfo.name': e.detail.value
    });
  },

  onPhoneInput(e: WechatMiniprogram.Input) {
    this.setData({
      'userInfo.phone': e.detail.value
    });
  },

  onEmailInput(e: WechatMiniprogram.Input) {
    this.setData({
      'userInfo.email': e.detail.value
    });
  },

  onSchoolInput(e: WechatMiniprogram.Input) {
    this.setData({
      'userInfo.school': e.detail.value
    });
  },

  onBioInput(e: WechatMiniprogram.Input) {
    const value = e.detail.value;
    this.setData({
      'userInfo.bio': value,
      bioLength: value.length
    });
  },

  showGenderPicker() {
    wx.showActionSheet({
      itemList: this.data.genderOptions,
      success: (res) => {
        if (!res.cancel) {
          this.setData({
            'userInfo.gender': res.tapIndex
          });
        }
      }
    });
  },

  showSubjectPicker() {
    wx.showActionSheet({
      itemList: this.data.subjects,
      success: (res) => {
        if (!res.cancel) {
          this.setData({
            'userInfo.subject': this.data.subjects[res.tapIndex]
          });
        }
      }
    });
  },

  saveProfile() {
    // 表单验证
    const { name, phone, email } = this.data.userInfo;
    
    if (!name.trim()) {
      return wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      });
    }
    
    if (phone && !/^1\d{10}$/.test(phone)) {
      return wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      });
    }
    
    if (email && !/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(email)) {
      return wx.showToast({
        title: '请输入正确的邮箱',
        icon: 'none'
      });
    }
    
    // 显示加载中
    wx.showLoading({
      title: '保存中...',
      mask: true
    });
    
    // 模拟保存过程
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '保存成功',
        icon: 'success'
      });
      
      // 返回上一页
      setTimeout(() => {
        wx.navigateBack({
          delta: 1
        });
      }, 1000);
    }, 1500);
  }
}) 