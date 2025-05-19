// 班级资料页面
Page({
  data: {
    activeTab: '0',
    activeTabBar: 'class',
    classId: null, // 班级ID
    searchKeyword: '',
    files: [
      {
        id: 1,
        name: '高中物理知识点总结.pdf',
        type: 'pdf',
        uploadTime: '2023-03-15',
        size: '2.5MB',
        category: '0'
      },
      {
        id: 2,
        name: '第二章习题答案.doc',
        type: 'doc',
        uploadTime: '2023-03-12',
        size: '1.8MB',
        category: '1'
      },
      {
        id: 3,
        name: '期中复习资料',
        type: 'folder',
        uploadTime: '2023-03-10',
        size: '4个文件',
        category: '2'
      },
      {
        id: 4,
        name: '实验报告模板.doc',
        type: 'doc',
        uploadTime: '2023-03-08',
        size: '0.5MB',
        category: '1'
      },
      {
        id: 5,
        name: '课堂笔记图片.jpg',
        type: 'image',
        uploadTime: '2023-03-05',
        size: '3.2MB',
        category: '3'
      }
    ],
    filteredFiles: []
  },
  
  onLoad(options: any) {
    // 获取班级ID
    if (options.id) {
      this.setData({
        classId: options.id
      });
    }
    
    // 初始化筛选后的文件列表
    this.filterFiles();
  },
  
  // 标签页切换
  onTabChange(e: any) {
    const { value } = e.detail;
    this.setData({
      activeTab: value
    });
    this.filterFiles();
  },
  
  // 搜索输入
  onSearchInput(e: any) {
    this.setData({
      searchKeyword: e.detail.value
    });
    this.filterFiles();
  },
  
  // 筛选文件
  filterFiles() {
    const { files, activeTab, searchKeyword } = this.data;
    
    // 根据分类和搜索关键词筛选文件
    let filtered = files.filter(file => {
      // 按分类筛选
      const categoryMatch = file.category === activeTab;
      
      // 按关键词搜索
      const keywordMatch = !searchKeyword || 
                           file.name.toLowerCase().indexOf(searchKeyword.toLowerCase()) !== -1;
      
      return categoryMatch && keywordMatch;
    });
    
    this.setData({
      filteredFiles: filtered
    });
  },
  
  // 下载文件
  downloadFile(e: any) {
    const { id } = e.currentTarget.dataset;
    const file = this.data.files.find(f => f.id === id);
    
    if (!file) return;
    
    // 实际应用中，这里应该调用wx.downloadFile API下载文件
    wx.showLoading({
      title: '准备下载...'
    });
    
    // 模拟下载过程
    setTimeout(() => {
      wx.hideLoading();
      
      if (file.type === 'folder') {
        wx.showModal({
          title: '提示',
          content: '暂不支持文件夹下载，请进入文件夹后下载单个文件',
          showCancel: false
        });
        return;
      }
      
      wx.showToast({
        title: '下载成功',
        icon: 'success'
      });
    }, 1500);
  },
  
  onTabBarChange(e: any) {
    const { value } = e.detail;
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
}) 