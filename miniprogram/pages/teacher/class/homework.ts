Page({
  data: {
    // 筛选选项
    statusOptions: ['全部作业', '进行中', '已截止'],
    timeOptions: ['本学期', '最近一个月', '最近一周'],
    selectedStatus: 0,
    selectedTime: 0,
    
    // 作业列表
    homeworkList: [
      {
        id: '1',
        title: '《牛顿运动定律》课后习题',
        subject: '物理',
        className: '高三（1）班',
        deadline: '2024-05-15 23:59',
        publishTime: '2024-05-10',
        status: '进行中',
        statusClass: 'ongoing',
        submitted: 28,
        total: 38,
        corrected: 20
      },
      {
        id: '2',
        title: '《概率统计》复习题',
        subject: '数学',
        className: '高三（1）班',
        deadline: '2024-05-08 23:59',
        publishTime: '2024-05-01',
        status: '已完成',
        statusClass: 'completed',
        submitted: 36,
        total: 38,
        corrected: 36
      },
      {
        id: '3',
        title: '《电磁感应》实验报告',
        subject: '物理',
        className: '高三（1）班',
        deadline: '2024-04-30 23:59',
        publishTime: '2024-04-23',
        status: '待批改',
        statusClass: 'pending',
        submitted: 38,
        total: 38,
        corrected: 15
      }
    ],
    
    // 弹窗数据
    showPublishModal: false,
    homeworkTitle: '',
    homeworkSubject: '数学',
    subjectIndex: 0,
    subjectPickerVisible: false,
    subjects: ['数学', '语文', '英语', '物理', '化学', '生物'],
    homeworkDeadline: '',
    homeworkDesc: '',
    uploadFiles: [] as any[],
    selectedClasses: [{
      id: '1',
      name: '高三（1）班',
      checked: true
    }, {
      id: '2',
      name: '高三（2）班',
      checked: false
    }, {
      id: '3',
      name: '高三（3）班',
      checked: false
    }],
    allowPeerReview: false,
    autoShareAnswer: false
  },

  onLoad() {
    // 页面加载时执行的函数
  },
  
  // 状态筛选切换
  changeStatus(e: any) {
    this.setData({
      selectedStatus: e.detail.value
    });
    this.filterHomework();
  },
  
  // 时间筛选切换
  changeTime(e: any) {
    this.setData({
      selectedTime: e.detail.value
    });
    this.filterHomework();
  },
  
  // 根据筛选条件过滤作业
  filterHomework() {
    // 实际项目中应该根据筛选条件过滤作业
    wx.showLoading({ title: '加载中' });
    
    setTimeout(() => {
      wx.hideLoading();
      // 模拟筛选结果
    }, 300);
  },
  
  // 查看作业详情
  viewHomeworkDetail(e: any) {
    const id = e.currentTarget.dataset.id;
    const status = e.currentTarget.dataset.status;
    
    if (status === '待批改') {
      wx.showToast({
        title: '进入批改页面',
        icon: 'none'
      });
    } else {
      wx.showToast({
        title: '查看作业详情',
        icon: 'none'
      });
    }
    // 实际项目中应该跳转到相应页面
  },
  
  // 打开发布作业弹窗
  openPublishModal() {
    this.setData({
      showPublishModal: true
    });
  },
  
  // 关闭发布作业弹窗
  closePublishModal() {
    this.setData({
      showPublishModal: false
    });
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
  
  // 确认选择科目
  onSubjectConfirm(e: any) {
    const { value } = e.detail;
    this.setData({
      subjectIndex: value,
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
  
  // 选择文件
  chooseFiles() {
    wx.chooseMessageFile({
      count: 10,
      type: 'file',
      success: (res) => {
        const tempFiles = res.tempFiles;
        this.setData({
          uploadFiles: [...this.data.uploadFiles, ...tempFiles]
        });
      }
    });
  },
  
  // 删除已选文件
  removeFile(e: any) {
    const index = e.currentTarget.dataset.index;
    const files = [...this.data.uploadFiles];
    files.splice(index, 1);
    this.setData({
      uploadFiles: files
    });
  },
  
  // 切换班级选择
  toggleClass(e: any) {
    const index = e.currentTarget.dataset.index;
    const classes = this.data.selectedClasses;
    classes[index].checked = !classes[index].checked;
    this.setData({
      selectedClasses: classes
    });
  },
  
  // 切换互评设置
  togglePeerReview(e: any) {
    this.setData({
      allowPeerReview: e.detail.checked
    });
  },
  
  // 切换自动查看答案设置
  toggleAutoShare(e: any) {
    this.setData({
      autoShareAnswer: e.detail.checked
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
    
    const hasSelectedClass = this.data.selectedClasses.some(c => c.checked);
    if (!hasSelectedClass) {
      wx.showToast({
        title: '请选择至少一个班级',
        icon: 'none'
      });
      return;
    }
    
    wx.showLoading({ title: '发布中' });
    
    // 实际项目中应该提交数据到服务器
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '作业发布成功',
        icon: 'success'
      });
      this.closePublishModal();
    }, 1500);
  }
}) 