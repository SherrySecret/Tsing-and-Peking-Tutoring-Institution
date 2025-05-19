interface ResearchGroup {
  id: string;
  name: string;
  memberCount: number;
  leader: string;
}

interface Activity {
  id: string;
  title: string;
  topic: string;
  organizer: string;
  time: string;
  location: string;
  status: 'upcoming' | 'completed';
}

interface Material {
  id: string;
  title: string;
  type: 'pdf' | 'word' | 'other';
  uploadDate: string;
  url: string;
}

Page({
  data: {
    myGroup: {
      id: 'g1',
      name: '高中数学教研组',
      memberCount: 16,
      leader: '王老师'
    } as ResearchGroup,
    
    activities: [
      {
        id: 'a1',
        title: '数学教研组会议',
        topic: '高三数学复习备考策略研讨',
        organizer: '王老师',
        time: '2024-05-12 14:00',
        location: '三楼会议室',
        status: 'upcoming'
      },
      {
        id: 'a2',
        title: '高考模拟题研讨',
        topic: '分析第二次模拟考试数学试卷',
        organizer: '李老师',
        time: '2024-05-05 15:30',
        location: '数学组办公室',
        status: 'completed'
      }
    ] as Activity[],
    
    materials: [
      {
        id: 'm1',
        title: '2024高考数学考点分析',
        type: 'pdf',
        uploadDate: '2024-05-03',
        url: 'https://example.com/materials/gaokao-math-2024.pdf'
      },
      {
        id: 'm2',
        title: '数学教学方法研究',
        type: 'word',
        uploadDate: '2024-04-28',
        url: 'https://example.com/materials/math-teaching-methods.docx'
      }
    ] as Material[]
  },

  onLoad() {
    // 页面加载时执行的逻辑
  },

  // 查看教研组详情
  viewGroupDetail(e: WechatMiniprogram.Touch) {
    const groupId = e.currentTarget.dataset.id;
    
    wx.navigateTo({
      url: `/pages/teacher/teaching/research-group-detail?id=${groupId}`
    });
  },

  // 查看活动详情
  viewActivityDetail(e: WechatMiniprogram.Touch) {
    const activityId = e.currentTarget.dataset.id;
    const activity = this.data.activities.find(item => item.id === activityId);
    
    if (!activity) return;
    
    wx.showModal({
      title: activity.title,
      content: `主题：${activity.topic}\n组织人：${activity.organizer}\n时间：${activity.time}\n地点：${activity.location}`,
      confirmText: activity.status === 'upcoming' ? '参加' : '查看记录',
      cancelText: '返回',
      success: (res) => {
        if (res.confirm) {
          if (activity.status === 'upcoming') {
            wx.showToast({
              title: '已确认参加',
              icon: 'success'
            });
          } else {
            wx.showToast({
              title: '活动记录功能开发中',
              icon: 'none'
            });
          }
        }
      }
    });
  },

  // 查看或下载教研资料
  viewMaterial(e: WechatMiniprogram.Touch) {
    const materialId = e.currentTarget.dataset.id;
    const material = this.data.materials.find(item => item.id === materialId);
    
    if (!material) return;
    
    wx.showLoading({
      title: '准备下载...'
    });
    
    // 模拟下载过程
    setTimeout(() => {
      wx.hideLoading();
      
      wx.showModal({
        title: '文件预览',
        content: '由于小程序限制，部分文件格式可能无法直接预览，是否下载？',
        confirmText: '下载',
        cancelText: '取消',
        success: (res) => {
          if (res.confirm) {
            wx.showToast({
              title: '开始下载',
              icon: 'success'
            });
          }
        }
      });
    }, 1000);
  }
}) 
 