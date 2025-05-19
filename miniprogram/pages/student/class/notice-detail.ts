interface Attachment {
  id: string;
  name: string;
  type: string;
  url: string;
}

interface Notice {
  id: string;
  title: string;
  content: string;
  publisher: string;
  publishTime: string;
  recipients: string;
  deadline?: string;
  isOverdue?: boolean;
  type: 'normal' | 'important' | 'activity' | 'academic';
  attachments?: Attachment[];
  needConfirm?: boolean;
  isConfirmed?: boolean;
  confirmTime?: string;
}

Page({
  data: {
    noticeId: '',
    notice: {
      id: '1',
      title: '关于期中考试安排的通知',
      content: '各位同学：\n\n现将本学期期中考试安排通知如下：\n\n1. 考试时间：2023年10月25日至10月27日\n2. 考试科目：语文、数学、英语、物理、化学\n3. 考试地点：各班教室\n\n请同学们提前做好复习准备，带齐考试所需文具。考试期间请严格遵守考场纪律，不得迟到、早退，不得携带手机等电子设备入场。\n\n祝各位同学取得好成绩！',
      publisher: '李明强 班主任',
      publishTime: '2023-10-10 14:30',
      recipients: '全体同学',
      deadline: '2023-10-15 23:59',
      isOverdue: false,
      type: 'important',
      attachments: [
        {
          id: '1',
          name: '期中考试时间表.pdf',
          type: 'pdf',
          url: '/temp/files/exam-schedule.pdf'
        },
        {
          id: '2',
          name: '考场安排.docx',
          type: 'doc',
          url: '/temp/files/exam-rooms.docx'
        }
      ],
      needConfirm: true,
      isConfirmed: false
    } as Notice,
    isRead: false,
    activeTabBar: 'class'
  },

  onLoad(options: any) {
    if (options.id) {
      this.setData({
        noticeId: options.id
      });
      this.loadNoticeDetail(options.id);
    }
  },

  // 加载通知详情
  loadNoticeDetail(id: string) {
    // 实际应用中，这里应该调用API获取通知详情
    console.log(`加载通知ID: ${id}的详情`);
    
    // 模拟已确认状态
    if (id === '2') {
      this.setData({
        'notice.isConfirmed': true,
        'notice.confirmTime': '2023-10-11 09:25'
      });
    }
  },

  // 阅读确认状态变化
  onReadChange(e: any) {
    this.setData({
      isRead: e.detail.value
    });
  },

  // 确认通知
  confirmNotice() {
    if (!this.data.isRead) {
      return;
    }
    
    wx.showLoading({
      title: '提交中...'
    });
    
    // 模拟提交确认
    setTimeout(() => {
      wx.hideLoading();
      
      const now = new Date();
      const confirmTime = now.toLocaleString();
      
      this.setData({
        'notice.isConfirmed': true,
        'notice.confirmTime': confirmTime
      });
      
      wx.showToast({
        title: '已确认通知',
        icon: 'success'
      });
    }, 1500);
  },

  // 下载附件
  downloadAttachment(e: any) {
    const id = e.currentTarget.dataset.id;
    const attachment = this.data.notice.attachments?.find(item => item.id === id);
    
    if (!attachment) return;
    
    wx.showLoading({
      title: '下载中...'
    });
    
    // 模拟下载过程
    setTimeout(() => {
      wx.hideLoading();
      
      wx.showToast({
        title: '下载成功',
        icon: 'success'
      });
    }, 1500);
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