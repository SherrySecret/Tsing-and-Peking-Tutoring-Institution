Page({
  data: {
    activeTab: 0,
    tabs: [
      { text: '全部通知', value: 0 },
      { text: '重要通知', value: 1 },
      { text: '作业通知', value: 2 },
      { text: '考试通知', value: 3 },
      { text: '活动通知', value: 4 }
    ],
    
    // 通知列表数据
    noticeList: [
      {
        id: '1',
        title: '期末考试安排通知',
        type: '重要',
        typeClass: 'important',
        content: '各位同学，期末考试将于6月15日开始，请做好复习准备。考试时间安排请见附件。',
        time: '今天 09:30',
        readCount: 35,
        totalCount: 38
      },
      {
        id: '2',
        title: '物理作业补交通知',
        type: '作业',
        typeClass: 'homework',
        content: '还有10名同学未提交上周布置的物理作业，请尽快在本周五前补交。',
        time: '昨天 15:20',
        readCount: 32,
        totalCount: 38
      },
      {
        id: '3',
        title: '班级春游活动通知',
        type: '活动',
        typeClass: 'activity',
        content: '下周六将组织班级春游活动，请各位同学准时到校集合，并带好必要的用品。',
        time: '上周',
        readCount: 38,
        totalCount: 38
      }
    ],
    
    // 发布通知弹窗
    showPublishModal: false,
    noticeTitle: '',
    noticeType: '普通通知',
    noticeTypeIndex: 0,
    typePickerVisible: false,
    noticeTypes: ['普通通知', '重要通知', '作业通知', '考试通知', '活动通知'],
    noticeContent: '',
    sendNotify: false,
    attachment: null as any
  },

  onLoad() {
    // 页面加载时执行的函数
  },
  
  // 切换标签
  onTabChange(e: any) {
    const index = e.detail.value;
    this.setData({
      activeTab: index
    });
    this.filterNotices(index);
  },
  
  // 筛选通知
  filterNotices(tabIndex: number) {
    // 实际项目中应该根据类型筛选通知列表
    wx.showLoading({ title: '加载中' });
    
    setTimeout(() => {
      wx.hideLoading();
      // 模拟筛选结果
    }, 300);
  },
  
  // 打开发布通知弹窗
  openPublishModal() {
    this.setData({
      showPublishModal: true
    });
  },
  
  // 关闭发布通知弹窗
  closePublishModal() {
    this.setData({
      showPublishModal: false
    });
  },
  
  // 通知标题输入
  onTitleInput(e: any) {
    this.setData({
      noticeTitle: e.detail.value
    });
  },
  
  // 显示通知类型选择器
  showTypePicker() {
    this.setData({
      typePickerVisible: true
    });
  },
  
  // 通知类型选择器取消
  onTypePickerCancel() {
    this.setData({
      typePickerVisible: false
    });
  },
  
  // 确认选择通知类型
  onTypeConfirm(e: any) {
    const { value } = e.detail;
    this.setData({
      noticeTypeIndex: value,
      noticeType: this.data.noticeTypes[value],
      typePickerVisible: false
    });
  },
  
  // 通知内容输入
  onContentInput(e: any) {
    this.setData({
      noticeContent: e.detail.value
    });
  },
  
  // 添加附件
  addAttachment() {
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success: (res) => {
        const tempFile = res.tempFiles[0];
        this.setData({
          attachment: tempFile
        });
      }
    });
  },
  
  // 切换通知提醒
  toggleNotify(e: any) {
    this.setData({
      sendNotify: e.detail.checked
    });
  },
  
  // 编辑通知
  editNotice(e: any) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({
      title: '编辑通知: ' + id,
      icon: 'none'
    });
    // 实际项目中应该跳转到编辑页面或打开编辑弹窗
  },
  
  // 删除通知
  deleteNotice(e: any) {
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '确认删除',
      content: '确定要删除该通知吗？',
      confirmColor: '#e34d59',
      success: (res) => {
        if (res.confirm) {
          // 模拟删除操作
          wx.showToast({
            title: '删除成功',
            icon: 'success'
          });
        }
      }
    });
  },
  
  // 提交发布通知
  submitNotice() {
    if (!this.data.noticeTitle) {
      wx.showToast({
        title: '请输入通知标题',
        icon: 'none'
      });
      return;
    }
    
    if (!this.data.noticeContent) {
      wx.showToast({
        title: '请输入通知内容',
        icon: 'none'
      });
      return;
    }
    
    wx.showLoading({ title: '发布中' });
    
    // 实际项目中应该提交数据到服务器
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '通知发布成功',
        icon: 'success'
      });
      this.setData({
        showPublishModal: false,
        noticeTitle: '',
        noticeType: '普通通知',
        noticeTypeIndex: 0,
        noticeContent: '',
        sendNotify: false,
        attachment: null
      });
      // 刷新通知列表
      this.onTabChange({ detail: { value: this.data.activeTab } });
    }, 1000);
  }
}) 