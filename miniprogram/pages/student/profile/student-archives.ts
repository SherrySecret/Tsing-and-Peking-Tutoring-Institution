interface Student {
  id: string;
  name: string;
  gender: string;
  avatar: string;
  school: string;
  grade: string;
  studentId: string;
  birthday: string;
}

Page({
  data: {
    searchKeyword: '',
    students: [
      {
        id: '1',
        name: '王小明',
        gender: '男',
        avatar: '/assets/images/avatar-1.png',
        school: '第一中学',
        grade: '高一(3)班',
        studentId: '20230101',
        birthday: '2005-06-15'
      },
      {
        id: '2',
        name: '李小红',
        gender: '女',
        avatar: '/assets/images/avatar-2.png',
        school: '实验中学',
        grade: '初三(2)班',
        studentId: '20230102',
        birthday: '2007-09-23'
      },
      {
        id: '3',
        name: '张小军',
        gender: '男',
        avatar: '/assets/images/avatar-3.png',
        school: '第一中学',
        grade: '高二(1)班',
        studentId: '20230103',
        birthday: '2004-11-05'
      }
    ] as Student[],
    filteredStudents: [] as Student[],
    showDeleteConfirm: false,
    deleteStudentId: '',
    activeTabBar: 'profile'
  },

  onLoad() {
    // 加载学生档案列表
    this.loadStudentArchives();
  },

  onShow() {
    // 页面显示时刷新列表，处理从添加/编辑页面返回的情况
    this.loadStudentArchives();
  },

  // 加载学生档案列表
  loadStudentArchives() {
    // 实际应用中，这里应该从本地存储或API获取学生档案列表
    console.log('加载学生档案列表');
    
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
             student.grade.includes(keyword) ||
             (student.studentId && student.studentId.includes(keyword));
    });
    
    this.setData({
      filteredStudents: filtered
    });
  },

  // 点击学生查看详情
  onStudentTap(e: any) {
    const id = e.currentTarget.dataset.id;
    console.log(`查看学生ID: ${id}的详情`);
    // 这里可以实现跳转到学生详情页的逻辑
  },

  // 添加学生
  addStudent() {
    wx.navigateTo({
      url: '/pages/student/profile/add-student'
    });
  },

  // 编辑学生
  editStudent(e: any) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/student/profile/edit-profile?id=${id}&type=student`
    });
  },

  // 删除学生
  deleteStudent(e: any) {
    const id = e.currentTarget.dataset.id;
    this.setData({
      showDeleteConfirm: true,
      deleteStudentId: id
    });
  },

  // 确认删除
  confirmDelete() {
    const id = this.data.deleteStudentId;
    if (!id) return;
    
    // 从学生列表中移除
    const students = this.data.students.filter(student => student.id !== id);
    
    this.setData({
      students,
      filteredStudents: students,
      showDeleteConfirm: false,
      deleteStudentId: ''
    });
    
    wx.showToast({
      title: '删除成功',
      icon: 'success'
    });
  },

  // 取消删除
  cancelDelete() {
    this.setData({
      showDeleteConfirm: false,
      deleteStudentId: ''
    });
  },

  // 底部标签栏切换
  onTabBarChange(e: any) {
    const value = e.detail.value;
    this.setData({ activeTabBar: value });
    
    // 根据切换的标签页进行页面跳转
    switch(value) {
      case 'home':
        wx.navigateTo({ url: '/pages/student/home/home' });
        break;
      case 'class':
        wx.navigateTo({ url: '/pages/student/class/index' });
        break;
      case 'features':
        wx.navigateTo({ url: '/pages/student/features/index' });
        break;
      case 'profile':
        wx.navigateTo({ url: '/pages/student/profile/index' });
        break;
      default:
        break;
    }
  }
}); 