// pages/student/class/select-student.ts
interface Student {
  id: string;
  name: string;
  avatar: string;
  school: string;
  grade: string;
}

Page({
  data: {
    searchKeyword: '',
    selectedStudentId: '',
    returnTo: '', // 返回目标页面
    extraParams: {}, // 额外参数
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
      },
      {
        id: '3',
        name: '张小军',
        avatar: '/assets/images/avatar-3.png',
        school: '第一中学',
        grade: '高二(3)班'
      }
    ] as Student[],
    filteredStudents: [] as Student[]
  },

  onLoad(options: any) {
    // 获取返回目标页面和额外参数
    if (options.returnTo) {
      this.setData({
        returnTo: options.returnTo
      });
    }
    
    // 将参数存入extraParams
    const extraParams: any = {};
    Object.keys(options).forEach(key => {
      if (key !== 'returnTo') {
        extraParams[key] = options[key];
      }
    });
    
    this.setData({
      extraParams
    });
    
    // 加载学生列表
    this.loadStudentList();
  },

  // 加载学生列表
  loadStudentList() {
    // 实际应用中，这里应该从本地存储或API获取学生列表
    console.log('加载学生列表');
    
    // 初始化筛选后的学生列表
    this.setData({
      filteredStudents: this.data.students
    });
  },

  // 搜索输入
  onSearchInput(e: any) {
    const keyword = e.detail.value;
    this.setData({
      searchKeyword: keyword
    });
    
    // 筛选学生
    this.filterStudents(keyword);
  },

  // 筛选学生
  filterStudents(keyword: string) {
    if (!keyword) {
      this.setData({
        filteredStudents: this.data.students
      });
      return;
    }
    
    const filtered = this.data.students.filter(student => {
      return student.name.includes(keyword) || 
             student.school.includes(keyword) || 
             student.grade.includes(keyword);
    });
    
    this.setData({
      filteredStudents: filtered
    });
  },

  // 选择学生
  onStudentSelect(e: any) {
    this.setData({
      selectedStudentId: e.detail.value
    });
  },

  // 添加新学生
  addNewStudent() {
    const returnParams = encodeURIComponent(JSON.stringify({
      returnTo: 'select-student',
      ...this.data.extraParams
    }));
    
    wx.navigateTo({
      url: `/pages/student/profile/add-student?returnParams=${returnParams}`
    });
  },

  // 确认选择
  confirmSelect() {
    if (!this.data.selectedStudentId) return;
    
    // 获取选中的学生信息
    const selectedStudent = this.data.students.find(student => student.id === this.data.selectedStudentId);
    
    if (!selectedStudent) return;
    
    // 根据returnTo跳转到不同页面
    if (this.data.returnTo === 'join-class') {
      // 返回到加入班级页面
      const pages = getCurrentPages();
      const prevPage = pages[pages.length - 2]; // 上一个页面
      
      // 设置上一个页面的数据
      prevPage.setData({
        selectedStudentId: this.data.selectedStudentId,
        selectedStudentName: selectedStudent.name
      });
      
      wx.navigateBack();
    } else {
      // 默认返回上一页
      wx.navigateBack();
    }
  }
}); 