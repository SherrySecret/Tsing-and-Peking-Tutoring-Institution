// 学生档案添加页面
interface StudentForm {
  name: string;
  studentId: string;
  gender: string;
  school: string;
  grade: string;
  class: string;
  parentName: string;
  parentPhone: string;
  remarks: string;
  [key: string]: string; // 添加索引签名以允许动态访问
}

Page({
  data: {
    form: {
      name: '',
      studentId: '',
      gender: '男',
      school: '',
      grade: '',
      class: '',
      parentName: '',
      parentPhone: '',
      remarks: ''
    } as StudentForm,
    gradeOptions: ['小学一年级', '小学二年级', '小学三年级', '小学四年级', '小学五年级', '小学六年级', 
                   '初中一年级', '初中二年级', '初中三年级', 
                   '高中一年级', '高中二年级', '高中三年级'],
    gradeIndex: 9, // 默认选中高中一年级
    requiredFields: ['name', 'school', 'grade']
  },
  
  onLoad() {
    // 页面加载时执行
  },
  
  // 输入事件处理函数
  onNameInput(e: any) {
    this.setData({
      'form.name': e.detail.value
    });
  },
  
  onStudentIdInput(e: any) {
    this.setData({
      'form.studentId': e.detail.value
    });
  },
  
  onGenderSelect(e: any) {
    this.setData({
      'form.gender': e.currentTarget.dataset.value
    });
  },
  
  onSchoolInput(e: any) {
    this.setData({
      'form.school': e.detail.value
    });
  },
  
  onGradeChange(e: any) {
    this.setData({
      gradeIndex: e.detail.value,
      'form.grade': this.data.gradeOptions[e.detail.value]
    });
  },
  
  onClassInput(e: any) {
    this.setData({
      'form.class': e.detail.value
    });
  },
  
  onParentNameInput(e: any) {
    this.setData({
      'form.parentName': e.detail.value
    });
  },
  
  onParentPhoneInput(e: any) {
    this.setData({
      'form.parentPhone': e.detail.value
    });
  },
  
  onRemarksInput(e: any) {
    this.setData({
      'form.remarks': e.detail.value
    });
  },
  
  // 表单验证
  validateForm() {
    const { form, requiredFields } = this.data;
    const errors = [];
    
    for (const field of requiredFields) {
      if (!form[field]) {
        const fieldName = this.getFieldName(field);
        errors.push(`${fieldName}不能为空`);
      }
    }
    
    // 手机号格式验证
    if (form.parentPhone && !/^1\d{10}$/.test(form.parentPhone)) {
      errors.push('手机号格式不正确');
    }
    
    return errors;
  },
  
  // 获取字段名称
  getFieldName(field: string) {
    const nameMap: {[key: string]: string} = {
      name: '学生姓名',
      school: '学校',
      grade: '年级'
    };
    return nameMap[field] || field;
  },
  
  // 取消按钮事件
  onCancel() {
    wx.navigateBack();
  },
  
  // 提交表单
  onSubmit() {
    const errors = this.validateForm();
    
    if (errors.length > 0) {
      wx.showModal({
        title: '表单验证失败',
        content: errors.join('\n'),
        showCancel: false
      });
      return;
    }
    
    // 显示加载提示
    wx.showLoading({
      title: '保存中'
    });
    
    // 模拟保存操作
    setTimeout(() => {
      wx.hideLoading();
      
      // 实际应用中，这里应该调用服务器接口保存数据
      console.log('保存学生档案:', this.data.form);
      
      wx.showToast({
        title: '保存成功',
        icon: 'success',
        success: () => {
          // 保存成功后返回上一页
          setTimeout(() => {
            wx.navigateBack();
          }, 1500);
        }
      });
    }, 1500);
  }
}) 