// pages/teacher/class/create-homework.ts
Page({
  data: {
    // 作业信息
    homeworkTitle: '',
    homeworkSubject: '数学',
    homeworkSubjectIndex: 0,
    subjectPickerVisible: false,
    homeworkDeadline: '',
    homeworkDesc: '',
    subjects: ['数学', '语文', '英语', '物理', '化学', '生物']
  },

  onLoad() {
    // 页面加载时执行的函数
  },
  
  // 作业标题输入
  onTitleInput(e: any) {
    this.setData({
      homeworkTitle: e.detail.value
    });
  },
  
  // 显示科目选择器
  showSubjectPicker() {
    this.setData({
      subjectPickerVisible: true
    });
  },
  
  // 科目选择器取消
  onSubjectPickerCancel() {
    this.setData({
      subjectPickerVisible: false
    });
  },
  
  // 选择作业科目
  onSubjectChange(e: any) {
    const { value } = e.detail;
    this.setData({
      homeworkSubjectIndex: value,
      homeworkSubject: this.data.subjects[value],
      subjectPickerVisible: false
    });
  },
  
  // 设置截止时间
  onDeadlineChange(e: any) {
    this.setData({
      homeworkDeadline: e.detail.value
    });
  },
  
  // 作业描述输入
  onDescInput(e: any) {
    this.setData({
      homeworkDesc: e.detail.value
    });
  },
  
  // 提交发布作业
  submitHomework() {
    if (!this.data.homeworkTitle) {
      wx.showToast({
        title: '请输入作业标题',
        icon: 'none'
      });
      return;
    }
    
    if (!this.data.homeworkDeadline) {
      wx.showToast({
        title: '请设置截止时间',
        icon: 'none'
      });
      return;
    }
    
    const homeworkData = {
      title: this.data.homeworkTitle,
      subject: this.data.homeworkSubject,
      deadline: this.data.homeworkDeadline,
      desc: this.data.homeworkDesc
    };
    
    wx.showLoading({ title: '提交中' });
    
    // 实际项目中应该提交数据到服务器
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '作业发布成功',
        icon: 'success'
      });
      
      // 跳转回作业列表页面
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
    }, 1000);
  }
}) 