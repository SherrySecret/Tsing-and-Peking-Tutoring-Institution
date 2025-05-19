Page({
  data: {
    // 班级成员列表
    memberList: [
      { id: '20240101', name: '张三', avatar: '' },
      { id: '20240102', name: '李四', avatar: '' },
      { id: '20240103', name: '王五', avatar: '' },
      { id: '20240104', name: '赵六', avatar: '' }
    ],
    // 搜索相关
    searchValue: '',
    totalMembers: 38,
    filteredMembers: [] as any[]
  },

  onLoad() {
    // 页面加载时初始化过滤后的成员列表
    this.setData({
      filteredMembers: this.data.memberList
    });
  },
  
  // 搜索输入
  onSearchInput(e: any) {
    const searchValue = e.detail.value;
    this.setData({ searchValue });
    this.filterMembers();
  },
  
  // 根据搜索条件过滤成员
  filterMembers() {
    if (!this.data.searchValue) {
      this.setData({
        filteredMembers: this.data.memberList
      });
      return;
    }
    
    const filtered = this.data.memberList.filter(member => {
      return member.name.includes(this.data.searchValue) || 
        member.id.includes(this.data.searchValue);
    });
    
    this.setData({
      filteredMembers: filtered
    });
  },
  
  // 添加成员
  addMember() {
    wx.showToast({
      title: '添加成员功能开发中',
      icon: 'none'
    });
    // 实际项目中应该跳转到添加成员页面或显示添加成员弹窗
  },
  
  // 发送消息给成员
  sendMessage(e: any) {
    const id = e.currentTarget.dataset.id;
    const name = e.currentTarget.dataset.name;
    wx.showToast({
      title: `发送消息给: ${name}`,
      icon: 'none'
    });
    // 实际项目中应该跳转到聊天页面
  },
  
  // 查看成员详情
  viewMemberDetail(e: any) {
    const id = e.currentTarget.dataset.id;
    const name = e.currentTarget.dataset.name;
    wx.showToast({
      title: `查看成员: ${name}`,
      icon: 'none'
    });
    // 实际项目中应该跳转到成员详情页面
  }
}) 