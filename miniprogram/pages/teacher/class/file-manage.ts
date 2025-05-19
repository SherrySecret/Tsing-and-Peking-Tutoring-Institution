// pages/teacher/class/file-manage.ts
Page({
  data: {
    // 标签栏
    activeTab: 0,
    tabs: [
      { text: '全部文件', value: 0 },
      { text: '教学资料', value: 1 },
      { text: '课件', value: 2 },
      { text: '作业', value: 3 },
      { text: '其他', value: 4 }
    ],
    
    // 文件列表
    fileList: [
      {
        id: '1',
        name: '牛顿力学讲义.pdf',
        type: 'pdf',
        size: '2.5MB',
        uploadTime: '昨天上传',
        category: '教学资料',
        iconColor: 'red'
      },
      {
        id: '2',
        name: '期末复习计划.docx',
        type: 'word',
        size: '1.2MB',
        uploadTime: '3天前',
        category: '教学资料',
        iconColor: 'blue'
      },
      {
        id: '3',
        name: '班级期中成绩统计.xlsx',
        type: 'excel',
        size: '0.8MB',
        uploadTime: '上周',
        category: '作业',
        iconColor: 'green'
      },
      {
        id: '4',
        name: '物理实验演示.pptx',
        type: 'ppt',
        size: '5.7MB',
        uploadTime: '上周',
        category: '课件',
        iconColor: 'orange'
      }
    ],
    
    // 弹窗数据
    showUploadModal: false,
    fileCategory: '教学资料',
    fileCategoryIndex: 0,
    fileCategoryPickerVisible: false,
    fileCategories: ['教学资料', '课件', '作业', '其他'],
    uploadFile: null as any,
    fileDesc: '',
    visibleClasses: [
      { id: '1', name: '高三（1）班', checked: true },
      { id: '2', name: '高三（2）班', checked: false }
    ]
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
    this.filterFiles(index);
  },
  
  // 根据分类筛选文件
  filterFiles(tabIndex: number) {
    // 实际项目中应该根据分类筛选文件
    wx.showLoading({ title: '加载中' });
    
    setTimeout(() => {
      wx.hideLoading();
      // 模拟筛选结果
    }, 300);
  },
  
  // 显示更多文件操作
  showFileActions(e: any) {
    const id = e.currentTarget.dataset.id;
    const name = e.currentTarget.dataset.name;
    
    wx.showActionSheet({
      itemList: ['预览', '下载', '重命名', '删除'],
      success: (res) => {
        switch (res.tapIndex) {
          case 0: // 预览
            this.previewFile(id, name);
            break;
          case 1: // 下载
            this.downloadFile(id, name);
            break;
          case 2: // 重命名
            this.renameFile(id, name);
            break;
          case 3: // 删除
            this.deleteFile(id, name);
            break;
        }
      }
    });
  },
  
  // 预览文件
  previewFile(id: string, name: string) {
    wx.showToast({
      title: `预览文件: ${name}`,
      icon: 'none'
    });
    // 实际项目中应该打开文件预览
  },
  
  // 下载文件
  downloadFile(id: string, name: string) {
    wx.showToast({
      title: `下载文件: ${name}`,
      icon: 'none'
    });
    // 实际项目中应该下载文件
  },
  
  // 重命名文件
  renameFile(id: string, name: string) {
    wx.showModal({
      title: '重命名文件',
      content: '请输入新的文件名',
      editable: true,
      placeholderText: name,
      success: (res) => {
        if (res.confirm && res.content) {
          wx.showToast({
            title: `已重命名为: ${res.content}`,
            icon: 'success'
          });
          // 实际项目中应该更新文件名
        }
      }
    });
  },
  
  // 删除文件
  deleteFile(id: string, name: string) {
    wx.showModal({
      title: '确认删除',
      content: `确定要删除"${name}"吗？`,
      confirmColor: '#e34d59',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '删除成功',
            icon: 'success'
          });
          // 实际项目中应该删除文件
        }
      }
    });
  },
  
  // 打开上传文件弹窗
  openUploadModal() {
    this.setData({
      showUploadModal: true
    });
  },
  
  // 关闭上传文件弹窗
  closeUploadModal() {
    this.setData({
      showUploadModal: false
    });
  },
  
  // 显示文件类型选择器
  showCategoryPicker() {
    this.setData({
      fileCategoryPickerVisible: true
    });
  },
  
  // 文件类型选择器取消
  onCategoryPickerCancel() {
    this.setData({
      fileCategoryPickerVisible: false
    });
  },
  
  // 确认选择文件类型
  onCategoryConfirm(e: any) {
    const { value } = e.detail;
    this.setData({
      fileCategoryIndex: value,
      fileCategory: this.data.fileCategories[value],
      fileCategoryPickerVisible: false
    });
  },
  
  // 选择文件
  chooseFile() {
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success: (res) => {
        const tempFile = res.tempFiles[0];
        this.setData({
          uploadFile: tempFile
        });
      }
    });
  },
  
  // 文件描述输入
  onDescInput(e: any) {
    this.setData({
      fileDesc: e.detail.value
    });
  },
  
  // 切换班级可见性
  toggleClassVisibility(e: any) {
    const index = e.currentTarget.dataset.index;
    const classes = this.data.visibleClasses;
    classes[index].checked = !classes[index].checked;
    this.setData({
      visibleClasses: classes
    });
  },
  
  // 提交上传文件
  submitUpload() {
    if (!this.data.uploadFile) {
      wx.showToast({
        title: '请选择文件',
        icon: 'none'
      });
      return;
    }
    
    const hasVisibleClass = this.data.visibleClasses.some(c => c.checked);
    if (!hasVisibleClass) {
      wx.showToast({
        title: '请选择至少一个可见班级',
        icon: 'none'
      });
      return;
    }
    
    wx.showLoading({ title: '上传中' });
    
    // 实际项目中应该上传文件到服务器
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '文件上传成功',
        icon: 'success'
      });
      this.closeUploadModal();
    }, 1500);
  }
}) 