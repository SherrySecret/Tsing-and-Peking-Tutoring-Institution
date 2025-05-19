 // 活动类型定义
interface Activity {
    id: string;
    title: string;
    time: string;
    image: string;
  }
  
  // 资源类型定义
  interface Resource {
    id: string;
    title: string;
    description: string;
    type: 'video' | 'doc' | 'book';
  }
  
  Page({
    data: {
      activeTabBar: 'features',
      activities: [
        {
          id: '1',
          title: '校园文化艺术节',
          time: '2023/05/20 - 2023/05/25',
          image: '/assets/images/activity-1.png'
        },
        {
          id: '2',
          title: '班级辩论赛',
          time: '2023/05/30 14:00',
          image: '/assets/images/activity-2.png'
        },
        {
          id: '3',
          title: '科技创新大赛',
          time: '2023/06/10 - 2023/06/15',
          image: '/assets/images/activity-3.png'
        }
      ] as Activity[],
      resources: [
        {
          id: '1',
          title: '高一数学必修1视频讲解',
          description: '李明强老师 | 20课时',
          type: 'video'
        },
        {
          id: '2',
          title: '高中语文阅读理解技巧',
          description: '王丽老师 | 文档教程',
          type: 'doc'
        },
        {
          id: '3',
          title: '英语四级词汇速记',
          description: '张伟老师 | 电子书',
          type: 'book'
        }
      ] as Resource[]
    },
  
    onLoad() {
      // 加载数据
      this.loadActivities();
      this.loadResources();
    },
  
    // 加载活动数据
    loadActivities() {
      // 实际应用中，这里应该从API获取活动列表
      console.log('加载活动列表');
    },
  
    // 加载资源数据
    loadResources() {
      // 实际应用中，这里应该从API获取资源列表
      console.log('加载资源列表');
    },
  
    // 导航到指定页面
    navigateTo(e: any) {
      const url = e.currentTarget.dataset.url;
      wx.navigateTo({
        url: url
      });
    },
  
    // 查看活动详情
    viewActivity(e: any) {
      const id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: `/pages/student/features/activity-detail?id=${id}`
      });
    },
  
    // 查看资源详情
    viewResource(e: any) {
      const id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: `/pages/student/features/resource-detail?id=${id}`
      });
    },
  
    // 显示更多功能
    showMoreFeatures() {
      wx.showToast({
        title: '更多功能开发中',
        icon: 'none'
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
          // 当前页面，不跳转
          break;
        case 'profile':
          wx.navigateTo({ url: '/pages/student/profile/index' });
          break;
        default:
          break;
      }
    }
  });