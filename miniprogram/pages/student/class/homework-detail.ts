interface UploadFile {
  id: string;
  name: string;
  type: string;
  path: string;
}

Page({
  data: {
    homework: {
      id: '1',
      title: '第二章课后习题',
      subject: '高等数学',
      teacher: '张教授',
      publishTime: '2023-09-15 14:30',
      deadline: '2023-09-22 23:59',
      isOverdue: false,
      status: 'pending', // pending, submitted, graded
      content: '请完成教材第二章的习题1-10，要求写出完整的解题过程，并说明所用的定理或公式。请按照规定格式提交，字迹工整，解题思路清晰。对于应用题，需要分析实际问题并建立数学模型，详细说明求解步骤。',
      score: '',
      comment: '',
      attachments: [
        { id: '1', name: '习题参考资料.pdf', type: 'pdf' },
        { id: '2', name: '提交要求说明.docx', type: 'doc' }
      ],
      submitted: null
    },
    uploadFiles: [] as UploadFile[],
    submitRemark: '',
    activeTabBar: 'class'
  },

  onLoad(options) {
    // 实际应用中，这里应该根据options中的id获取作业详情
    if (options.id) {
      this.loadHomeworkDetail(options.id);
    }
  },

  loadHomeworkDetail(id: string) {
    // 模拟加载数据，实际应用中应该调用API获取数据
    console.log(`加载作业ID: ${id}的详情`);
    
    // 演示不同状态的数据
    if (id === '2') {
      this.setData({
        'homework.status': 'submitted',
        'homework.submitted': {
          files: [
            { id: '1', name: '数学作业完成稿.pdf', type: 'pdf' }
          ],
          remark: '已按要求完成所有题目，对第7题有疑问，已在文档中标注。',
          time: '2023-09-20 18:45'
        }
      });
    } else if (id === '3') {
      this.setData({
        'homework.status': 'graded',
        'homework.score': '92',
        'homework.comment': '整体完成得不错，思路清晰，解题步骤详细。第7题理解有误，建议重新学习相关概念。第9题有计算错误，注意检查。',
        'homework.submitted': {
          files: [
            { id: '1', name: '数学作业完成稿.pdf', type: 'pdf' }
          ],
          remark: '已按要求完成所有题目，对第7题有疑问，已在文档中标注。',
          time: '2023-09-20 18:45'
        }
      });
    }
  },

  // 底部标签栏切换
  onTabBarChange(e: any) {
    const value = e.detail.value;
    
    // 根据不同的标签值跳转到不同页面
    switch (value) {
      case 'home':
        wx.switchTab({ url: '/pages/student/home/home' });
        break;
      case 'class':
        wx.switchTab({ url: '/pages/student/class/index' });
        break;
      case 'features':
        wx.switchTab({ url: '/pages/student/features/index' });
        break;
      case 'profile':
        wx.switchTab({ url: '/pages/student/profile/index' });
        break;
    }
  },

  // 添加上传文件
  addUploadFile() {
    wx.chooseMessageFile({
      count: 10,
      type: 'file',
      success: (res) => {
        const files = res.tempFiles;
        const uploadFiles = [...this.data.uploadFiles];
        
        files.forEach((file, index) => {
          // 获取文件类型
          let type = 'file-icon';
          const extension = file.name.split('.').pop()?.toLowerCase();
          
          if (extension === 'pdf') type = 'pdf';
          else if (['doc', 'docx'].includes(extension || '')) type = 'doc';
          else if (['jpg', 'jpeg', 'png', 'gif'].includes(extension || '')) type = 'image';
          
          uploadFiles.push({
            id: `temp_${Date.now()}_${index}`,
            name: file.name,
            type,
            path: file.path
          });
        });
        
        this.setData({ uploadFiles });
      }
    });
  },

  // 删除上传文件
  deleteUploadFile(e: any) {
    const id = e.currentTarget.dataset.id;
    const uploadFiles = this.data.uploadFiles.filter((file: any) => file.id !== id);
    this.setData({ uploadFiles });
  },

  // 备注输入
  onRemarkInput(e: any) {
    this.setData({ submitRemark: e.detail.value });
  },

  // 提交作业
  submitHomework() {
    if (this.data.uploadFiles.length === 0) {
      wx.showToast({
        title: '请先上传作业文件',
        icon: 'none'
      });
      return;
    }

    wx.showLoading({ title: '提交中...' });
    
    // 模拟提交过程
    setTimeout(() => {
      wx.hideLoading();
      
      // 更新状态
      this.setData({
        'homework.status': 'submitted',
        'homework.submitted': {
          files: this.data.uploadFiles,
          remark: this.data.submitRemark,
          time: new Date().toLocaleString()
        },
        uploadFiles: [],
        submitRemark: ''
      });
      
      wx.showToast({
        title: '提交成功',
        icon: 'success'
      });
    }, 1500);
  },

  // 下载作业附件
  downloadAttachment(e: any) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({
      title: '开始下载附件',
      icon: 'success'
    });
    console.log(`下载附件ID: ${id}`);
  },

  // 下载已提交的文件
  downloadSubmittedFile(e: any) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({
      title: '开始下载文件',
      icon: 'success'
    });
    console.log(`下载已提交文件ID: ${id}`);
  }
}); 