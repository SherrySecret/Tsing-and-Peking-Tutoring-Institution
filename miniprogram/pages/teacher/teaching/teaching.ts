 // 课程类型定义
interface Course {
    id: string;
    name: string;
    timeSlot: string;
    location: string;
    class: string;
  }
  
  // 作业类型定义
  interface Homework {
    id: string;
    title: string;
    className: string;
    pendingCount: number;
    totalCount: number;
  }
  
  // 班级类型定义
  interface ClassInfo {
    id: string;
    name: string;
    studentCount: number;
    homeworkCount: number;
    attendanceRate: number;
    examCount: number;
  }
  
  Page({
    data: {
      currentDate: '',
      todayCourses: [] as Course[],
      pendingHomeworks: [] as Homework[],
      classes: [] as ClassInfo[],
      activeClassTab: '1',
      currentClass: {} as ClassInfo,
      activeTabBar: 'teaching'
    },
  
    onLoad() {
      // 初始化当前日期
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      const day = today.getDate();
      const weekDay = ['日', '一', '二', '三', '四', '五', '六'][today.getDay()];
      
      this.setData({
        currentDate: `${month}月${day}日 星期${weekDay}`
      });
      
      // 加载数据
      this.loadTodayCourses();
      this.loadPendingHomeworks();
      this.loadClasses();
    },
  
    // 加载今日课程
    loadTodayCourses() {
      // 模拟数据
      const courses: Course[] = [
        {
          id: '1',
          name: '高三数学必修1',
          timeSlot: '08:00-09:30',
          location: '教学楼A 301',
          class: '高三(1)班'
        },
        {
          id: '2',
          name: '高三数学必修2',
          timeSlot: '10:00-11:30',
          location: '教学楼A 302',
          class: '高三(2)班'
        },
        {
          id: '3',
          name: '高二数学选修',
          timeSlot: '14:00-15:30',
          location: '教学楼B 205',
          class: '高二(3)班'
        }
      ];
      
      this.setData({
        todayCourses: courses
      });
    },
  
    // 加载待批改作业
    loadPendingHomeworks() {
      // 模拟数据
      const homeworks: Homework[] = [
        {
          id: '1',
          title: '函数解析几何练习',
          className: '高三(1)班',
          pendingCount: 12,
          totalCount: 38
        },
        {
          id: '2',
          title: '不等式证明作业',
          className: '高三(2)班',
          pendingCount: 8,
          totalCount: 42
        },
        {
          id: '3',
          title: '导数应用练习',
          className: '高二(3)班',
          pendingCount: 15,
          totalCount: 39
        }
      ];
      
      this.setData({
        pendingHomeworks: homeworks
      });
    },
  
    // 加载班级信息
    loadClasses() {
      // 模拟数据
      const classes: ClassInfo[] = [
        {
          id: '1',
          name: '高三(1)班',
          studentCount: 38,
          homeworkCount: 15,
          attendanceRate: 96,
          examCount: 5
        },
        {
          id: '2',
          name: '高三(2)班',
          studentCount: 42,
          homeworkCount: 14,
          attendanceRate: 94,
          examCount: 5
        },
        {
          id: '3',
          name: '高二(3)班',
          studentCount: 39,
          homeworkCount: 12,
          attendanceRate: 98,
          examCount: 4
        }
      ];
      
      this.setData({
        classes,
        currentClass: classes[0]
      });
    },
  
    // 班级标签页切换
    onClassTabChange(e: any) {
      const classId = e.detail.value;
      const selectedClass = this.data.classes.find(item => item.id === classId);
      
      if (selectedClass) {
        this.setData({
          activeClassTab: classId,
          currentClass: selectedClass
        });
      }
    },
  
    // 导航到指定页面
    navigateTo(e: any) {
      const url = e.currentTarget.dataset.url;
      const id = e.currentTarget.dataset.id;
      
      if (id) {
        wx.navigateTo({
          url: `${url}?id=${id}`
        });
      } else {
        wx.navigateTo({
          url
        });
      }
    },
  
    // 底部导航栏切换
    onTabBarChange(e: any) {
      const value = e.detail.value;
      this.setData({ activeTabBar: value });
      
      // 根据切换的标签页进行页面跳转
      switch(value) {
        case 'home':
          wx.navigateTo({ url: '/pages/teacher/index/index' });
          break;
        case 'class':
          wx.navigateTo({ url: '/pages/teacher/class/class-list' });
          break;
        case 'teaching':
          // 当前页面，不跳转
          break;
        case 'profile':
          wx.navigateTo({ url: '/pages/teacher/profile/profile' });
          break;
        default:
          break;
      }
    }
  });