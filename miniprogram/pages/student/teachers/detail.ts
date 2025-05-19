 // pages/student/teachers/detail.ts
 interface Course {
    id: string;
    name: string;
    time: string;
  }
  
  interface Teacher {
    id: string;
    name: string;
    avatar: string;
    role: string;
    subject: string;
    classes: string;
    phone?: string;
    email?: string;
    introduction?: string;
    courses: Course[];
  }
  
  Page({
    data: {
      teacherId: '',
      teacher: {
        id: '1',
        name: '李明强',
        avatar: '/assets/images/teacher-1.png',
        role: '班主任',
        subject: '数学',
        classes: '高一(3)班',
        phone: '13812345678',
        email: 'limingqiang@school.edu.cn',
        introduction: '从教15年，数学教学经验丰富，多次获得市级优秀教师称号。善于引导学生思考，注重培养学生的数学思维和解题能力。熟悉高考数学命题规律，辅导的学生多次在数学竞赛中获奖。',
        courses: [
          { id: '1', name: '高一数学必修1', time: '周一 上午 8:00-9:30' },
          { id: '2', name: '高一数学必修2', time: '周三 上午 10:00-11:30' },
          { id: '3', name: '数学竞赛培训', time: '周五 下午 2:00-3:30' }
        ]
      } as Teacher,
      activeTabBar: 'profile'
    },
  
    onLoad(options: any) {
      if (options.id) {
        this.setData({
          teacherId: options.id
        });
        this.loadTeacherDetail(options.id);
      }
    },
  
    // 加载教师详情
    loadTeacherDetail(id: string) {
      // 实际应用中，这里应该从API获取教师详情
      console.log(`加载教师ID: ${id}的详情`);
      
      // 模拟不同教师数据
      if (id === '2') {
        this.setData({
          teacher: {
            id: '2',
            name: '王丽',
            avatar: '/assets/images/teacher-2.png',
            role: '任课教师',
            subject: '语文',
            classes: '高一(1)班, 高一(3)班',
            phone: '13812345679',
            email: 'wangli@school.edu.cn',
            introduction: '语文高级教师，善于激发学生的阅读兴趣和写作能力。注重培养学生的语文素养和文学鉴赏能力，开设了丰富多彩的语文拓展课程和活动。',
            courses: [
              { id: '1', name: '高一语文必修1', time: '周二 上午 8:00-9:30' },
              { id: '2', name: '高一语文必修2', time: '周四 上午 10:00-11:30' },
              { id: '3', name: '作文指导', time: '周六 上午 9:00-10:30' }
            ]
          }
        });
      } else if (id === '3') {
        this.setData({
          teacher: {
            id: '3',
            name: '张伟',
            avatar: '/assets/images/teacher-3.png',
            role: '任课教师',
            subject: '英语',
            classes: '高一(3)班, 高一(4)班',
            phone: '13812345680',
            email: 'zhangwei@school.edu.cn',
            introduction: '毕业于北京外国语大学，英语专业，有海外学习经历，口语教学见长。注重培养学生的英语听说能力，课堂活跃，教学方法灵活多样。',
            courses: [
              { id: '1', name: '高一英语必修1', time: '周一 下午 2:00-3:30' },
              { id: '2', name: '英语口语', time: '周三 下午 4:00-5:30' },
              { id: '3', name: '英语阅读', time: '周五 上午 10:00-11:30' }
            ]
          }
        });
      }
    },
  
    // 联系教师
    contactTeacher() {
      const { phone } = this.data.teacher;
      
      wx.showActionSheet({
        itemList: ['拨打电话', '发送短信'],
        success: (res) => {
          if (res.tapIndex === 0) {
            // 拨打电话
            if (phone) {
              wx.makePhoneCall({
                phoneNumber: phone,
                fail: () => {
                  wx.showToast({
                    title: '拨号失败',
                    icon: 'none'
                  });
                }
              });
            } else {
              wx.showToast({
                title: '无可用电话号码',
                icon: 'none'
              });
            }
          } else if (res.tapIndex === 1) {
            // 发送短信
            wx.showToast({
              title: '短信功能暂未开放',
              icon: 'none'
            });
          }
        }
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