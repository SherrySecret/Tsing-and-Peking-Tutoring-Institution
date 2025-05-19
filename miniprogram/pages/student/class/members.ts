// pages/student/class/members.ts
interface Teacher {
  id: string;
  name: string;
  avatar: string;
  role: string;
  subject: string;
}

interface Student {
  id: string;
  name: string;
  avatar: string;
  studentId: string;
  isMonitor: boolean;
}

Page({
  data: {
    classId: '',
    className: '高一(3)班',
    activeTab: 'all', // all, teacher, student
    activeTabBar: 'class',
    searchKeyword: '',
    teachers: [
      {
        id: '1',
        name: '李明强',
        avatar: '/assets/images/teacher-1.png',
        role: '班主任',
        subject: '数学'
      },
      {
        id: '2',
        name: '王丽',
        avatar: '/assets/images/teacher-2.png',
        role: '任课教师',
        subject: '语文'
      },
      {
        id: '3',
        name: '张伟',
        avatar: '/assets/images/teacher-3.png',
        role: '任课教师',
        subject: '英语'
      }
    ] as Teacher[],
    students: [
      {
        id: '1',
        name: '陈小明',
        avatar: '/assets/images/student-1.png',
        studentId: '20230101',
        isMonitor: true
      },
      {
        id: '2',
        name: '李华',
        avatar: '/assets/images/student-2.png',
        studentId: '20230102',
        isMonitor: false
      },
      {
        id: '3',
        name: '赵梦',
        avatar: '/assets/images/student-3.png',
        studentId: '20230103',
        isMonitor: false
      },
      {
        id: '4',
        name: '王小红',
        avatar: '/assets/images/student-4.png',
        studentId: '20230104',
        isMonitor: false
      },
      {
        id: '5',
        name: '张晓',
        avatar: '/assets/images/student-5.png',
        studentId: '20230105',
        isMonitor: false
      }
    ] as Student[],
    filteredTeachers: [] as Teacher[],
    filteredStudents: [] as Student[],
    classMembers: [] as Array<Teacher | Student>
  },

  onLoad(options: any) {
    if (options.id) {
      this.setData({
        classId: options.id
      });
    }
    
    // 初始化班级成员总数
    this.setData({
      classMembers: [...this.data.teachers, ...this.data.students],
      teacherCount: this.data.teachers.length
    });
    
    // 初始化筛选后的成员列表
    this.filterMembers();
  },

  // 切换标签
  switchTab(e: any) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({
      activeTab: tab
    });
    this.filterMembers();
  },

  // 搜索输入
  onSearchInput(e: any) {
    this.setData({
      searchKeyword: e.detail.value
    });
    this.filterMembers();
  },

  // 筛选成员
  filterMembers() {
    const { teachers, students, activeTab, searchKeyword } = this.data;
    
    // 根据关键词搜索教师
    const filteredTeachers = teachers.filter(teacher => {
      return teacher.name.includes(searchKeyword) || 
             teacher.subject.includes(searchKeyword) || 
             teacher.role.includes(searchKeyword);
    });
    
    // 根据关键词搜索学生
    const filteredStudents = students.filter(student => {
      return student.name.includes(searchKeyword) || 
             student.studentId.includes(searchKeyword);
    });
    
    this.setData({
      filteredTeachers,
      filteredStudents
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