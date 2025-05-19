interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'word' | 'excel';
  uploadDate: string;
  size: string;
  downloads: number;
  rating: number;
  category: 'slides' | 'plans' | 'exercises';
  url: string;
}

Page({
  data: {
    currentTab: 'all', // 当前选中的标签：all, slides, plans, exercises
    searchKeyword: '',
    resources: [
      {
        id: '1',
        title: '《函数》教学课件',
        type: 'pdf' as const,
        uploadDate: '2024-05-10',
        size: '2.5MB',
        downloads: 128,
        rating: 4.8,
        category: 'slides' as const,
        url: 'https://example.com/resources/function-slides.pdf'
      },
      {
        id: '2',
        title: '《三角函数》教案',
        type: 'word' as const,
        uploadDate: '2024-05-08',
        size: '1.8MB',
        downloads: 96,
        rating: 4.6,
        category: 'plans' as const,
        url: 'https://example.com/resources/trigonometry-plan.docx'
      },
      {
        id: '3',
        title: '《概率统计》习题集',
        type: 'excel' as const,
        uploadDate: '2024-05-05',
        size: '3.2MB',
        downloads: 156,
        rating: 4.9,
        category: 'exercises' as const,
        url: 'https://example.com/resources/probability-exercises.xlsx'
      },
      {
        id: '4',
        title: '高中数学重点知识汇总',
        type: 'pdf' as const,
        uploadDate: '2024-05-01',
        size: '5.6MB',
        downloads: 203,
        rating: 4.7,
        category: 'slides' as const,
        url: 'https://example.com/resources/math-summary.pdf'
      },
      {
        id: '5',
        title: '解析几何单元教案',
        type: 'word' as const,
        uploadDate: '2024-04-28',
        size: '2.1MB',
        downloads: 87,
        rating: 4.5,
        category: 'plans' as const,
        url: 'https://example.com/resources/analytic-geometry.docx'
      }
    ] as Resource[],
    filteredResources: [] as Resource[]
  },

  onLoad() {
    // 初始化筛选的资源列表
    this.filterResources();
  },

  // 切换标签
  switchTab(e: WechatMiniprogram.Touch) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({
      currentTab: tab
    });
    this.filterResources();
  },

  // 根据条件筛选资源
  filterResources() {
    let filtered = [...this.data.resources];
    
    // 按分类筛选
    if (this.data.currentTab !== 'all') {
      filtered = filtered.filter(resource => 
        resource.category === this.data.currentTab
      );
    }
    
    // 按关键词搜索
    if (this.data.searchKeyword) {
      const keyword = this.data.searchKeyword.toLowerCase();
      filtered = filtered.filter(resource => 
        resource.title.toLowerCase().includes(keyword)
      );
    }
    
    this.setData({
      filteredResources: filtered
    });
  },

  // 搜索资源
  searchResource(e: WechatMiniprogram.Input) {
    const keyword = e.detail.value.trim();
    this.setData({
      searchKeyword: keyword
    });
    this.filterResources();
  },

  // 查看资源详情
  viewResourceDetail(e: WechatMiniprogram.Touch) {
    const resourceId = e.currentTarget.dataset.id;
    const resource = this.data.resources.find(item => item.id === resourceId);
    
    if (!resource) return;
    
    // 根据资源类型不同，处理预览逻辑
    wx.showLoading({
      title: '正在准备资源...'
    });
    
    setTimeout(() => {
      wx.hideLoading();
      
      wx.showModal({
        title: '资源预览',
        content: '是否下载或预览该资源？',
        confirmText: '确认',
        cancelText: '取消',
        success: (res) => {
          if (res.confirm) {
            this.downloadOrPreviewResource(resource);
          }
        }
      });
    }, 800);
  },

  // 下载或预览资源
  downloadOrPreviewResource(resource: Resource) {
    // 真实环境下应该根据资源类型和url进行处理
    wx.showToast({
      title: '开始下载',
      icon: 'success'
    });
    
    // 模拟下载过程
    setTimeout(() => {
      wx.showToast({
        title: '下载成功',
        icon: 'success'
      });
      
      // 更新下载次数
      const updatedResources = this.data.resources.map(item => {
        if (item.id === resource.id) {
          return { ...item, downloads: item.downloads + 1 };
        }
        return item;
      });
      
      this.setData({
        resources: updatedResources
      });
      
      this.filterResources();
    }, 1500);
  },

  // 显示资源操作选项
  showResourceOptions(e: WechatMiniprogram.Touch) {
    const resourceId = e.currentTarget.dataset.id;
    
    wx.showActionSheet({
      itemList: ['下载', '分享', '收藏', '删除'],
      success: (res) => {
        switch (res.tapIndex) {
          case 0: // 下载
            const resource = this.data.resources.find(item => item.id === resourceId);
            if (resource) {
              this.downloadOrPreviewResource(resource);
            }
            break;
          case 1: // 分享
            wx.showToast({
              title: '分享功能开发中',
              icon: 'none'
            });
            break;
          case 2: // 收藏
            wx.showToast({
              title: '已收藏',
              icon: 'success'
            });
            break;
          case 3: // 删除
            this.confirmDelete(resourceId);
            break;
        }
      }
    });
  },

  // 确认删除资源
  confirmDelete(resourceId: string) {
    wx.showModal({
      title: '确认删除',
      content: '确定要删除该资源吗？删除后无法恢复。',
      confirmText: '删除',
      confirmColor: '#ff4d4f',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          // 在真实环境中应该调用API删除资源
          const updatedResources = this.data.resources.filter(item => item.id !== resourceId);
          
          this.setData({
            resources: updatedResources
          });
          
          this.filterResources();
          
          wx.showToast({
            title: '删除成功',
            icon: 'success'
          });
        }
      }
    });
  },

  // 上传资源
  uploadResource() {
    wx.showActionSheet({
      itemList: ['选择文件', '拍照上传'],
      success: (res) => {
        switch (res.tapIndex) {
          case 0: // 选择文件
            wx.showToast({
              title: '文件选择功能开发中',
              icon: 'none'
            });
            break;
          case 1: // 拍照上传
            wx.showToast({
              title: '拍照上传功能开发中',
              icon: 'none'
            });
            break;
        }
      }
    });
  }
}) 