 // 班级表单类型定义
interface ClassForm {
    name: string;
    grade: string;
    code: string;
    description: string;
    coverFiles: any[];
    joinMethod: string;
    allowViewScores: boolean;
    notificationEnabled: boolean;
    headTeacher: string;
    subjectTeachers: string[];
  }
  
  Page({
    data: {
      classForm: {
        name: '',
        grade: '高一',
        code: '',
        description: '',
        coverFiles: [],
        joinMethod: 'code',
        allowViewScores: true,
        notificationEnabled: true,
        headTeacher: '',
        subjectTeachers: []
      } as ClassForm
    },
  
    // 处理输入框变化
    onInputChange(e: any) {
      const { field } = e.currentTarget.dataset;
      const { value } = e.detail;
      
      this.setData({
        [`classForm.${field}`]: value
      });
    },
  
    // 处理年级选择
    onGradeChange(e: any) {
      this.setData({
        'classForm.grade': e.detail.value
      });
    },
  
    // 处理加入方式选择
    onJoinMethodChange(e: any) {
      this.setData({
        'classForm.joinMethod': e.detail.value
      });
    },
  
    // 选择班主任
    selectHeadTeacher() {
      // 实际应用中应该跳转到教师选择页面
      // 这里使用模拟数据
      wx.showActionSheet({
        itemList: ['李明强', '王丽', '张伟'],
        success: (res) => {
          const teachers = ['李明强', '王丽', '张伟'];
          this.setData({
            'classForm.headTeacher': teachers[res.tapIndex]
          });
        }
      });
    },
  
    // 选择科任教师
    selectSubjectTeachers() {
      // 实际应用中应该跳转到教师多选页面
      // 这里使用模拟数据
      wx.showToast({
        title: '暂不支持选择多位教师',
        icon: 'none'
      });
    },
  
    // 处理班级封面上传
    onAddCover(e: any) {
      const { files } = e.detail;
      this.setData({
        'classForm.coverFiles': files
      });
    },
  
    // 移除班级封面
    onRemoveCover() {
      this.setData({
        'classForm.coverFiles': []
      });
    },
  
    // 切换成绩查看权限
    onToggleScores(e: any) {
      this.setData({
        'classForm.allowViewScores': e.detail.value
      });
    },
  
    // 切换通知提醒
    onToggleNotification(e: any) {
      this.setData({
        'classForm.notificationEnabled': e.detail.value
      });
    },
  
    // 提交表单
    submitForm() {
      // 表单验证
      const { classForm } = this.data;
      
      if (!classForm.name) {
        this.showError('请输入班级名称');
        return;
      }
      
      if (!classForm.code) {
        this.showError('请输入班级编号');
        return;
      }
      
      if (!classForm.headTeacher) {
        this.showError('请选择班主任');
        return;
      }
      
      // 提交处理
      wx.showLoading({
        title: '创建中'
      });
      
      // 模拟API请求
      setTimeout(() => {
        wx.hideLoading();
        
        wx.showToast({
          title: '创建成功',
          icon: 'success'
        });
        
        // 返回上一页
        setTimeout(() => {
          wx.navigateBack();
        }, 1500);
      }, 2000);
    },
  
    // 显示错误信息
    showError(message: string) {
      wx.showToast({
        title: message,
        icon: 'error'
      });
    }
  });