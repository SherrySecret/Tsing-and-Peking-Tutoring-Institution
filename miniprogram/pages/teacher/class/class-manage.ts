 // 班级信息类型定义
interface ClassInfo {
    id: string;
    name: string;
    code: string;
    grade: string;
    headTeacher: string;
    studentCount: number;
    teacherCount: number;
    allowJoin: boolean;
    allowViewScores: boolean;
    privacyLevel: string;
  }
  
  Page({
    data: {
      classId: '',
      classInfo: {
        id: '1',
        name: '高三（1）班',
        code: 'HS301',
        grade: '高三',
        headTeacher: '李明强',
        studentCount: 38,
        teacherCount: 8,
        allowJoin: true,
        allowViewScores: true,
        privacyLevel: '仅班级成员'
      } as ClassInfo
    },
  
    onLoad(options: any) {
      if (options.id) {
        this.setData({
          classId: options.id
        });
        this.loadClassInfo(options.id);
      }
    },
  
    // 加载班级信息
    loadClassInfo(classId: string) {
      // 实际应用中，这里应该从API获取班级详情
      console.log(`加载班级ID: ${classId}的详情`);
      
      // 模拟不同班级数据
      if (classId === '2') {
        this.setData({
          classInfo: {
            id: '2',
            name: '高三（2）班',
            code: 'HS302',
            grade: '高三',
            headTeacher: '王丽',
            studentCount: 42,
            teacherCount: 7,
            allowJoin: true,
            allowViewScores: false,
            privacyLevel: '仅班级成员'
          }
        });
      } else if (classId === '3') {
        this.setData({
          classInfo: {
            id: '3',
            name: '高二（3）班',
            code: 'HS203',
            grade: '高二',
            headTeacher: '张伟',
            studentCount: 39,
            teacherCount: 6,
            allowJoin: true,
            allowViewScores: true,
            privacyLevel: '所有人可见'
          }
        });
      }
    },
  
    // 编辑班级名称
    editClassName() {
      wx.showModal({
        title: '修改班级名称',
        content: '请输入新的班级名称',
        editable: true,
        placeholderText: this.data.classInfo.name,
        success: (res) => {
          if (res.confirm && res.content) {
            this.setData({
              'classInfo.name': res.content
            });
            wx.showToast({
              title: '修改成功',
              icon: 'success'
            });
          }
        }
      });
    },
  
    // 编辑班级编号
    editClassCode() {
      wx.showModal({
        title: '修改班级编号',
        content: '请输入新的班级编号',
        editable: true,
        placeholderText: this.data.classInfo.code,
        success: (res) => {
          if (res.confirm && res.content) {
            this.setData({
              'classInfo.code': res.content
            });
            wx.showToast({
              title: '修改成功',
              icon: 'success'
            });
          }
        }
      });
    },
  
    // 修改年级
    editGrade() {
      wx.showActionSheet({
        itemList: ['高一', '高二', '高三'],
        success: (res) => {
          const gradeList = ['高一', '高二', '高三'];
          this.setData({
            'classInfo.grade': gradeList[res.tapIndex]
          });
          wx.showToast({
            title: '修改成功',
            icon: 'success'
          });
        }
      });
    },
  
    // 修改班主任
    editHeadTeacher() {
      // 实际应用中应该跳转到教师选择页面
      wx.showToast({
        title: '请前往教师管理页面修改',
        icon: 'none'
      });
    },
  
    // 修改隐私级别
    editPrivacyLevel() {
      wx.showActionSheet({
        itemList: ['仅班级成员', '所有人可见', '仅教师可见'],
        success: (res) => {
          const levelList = ['仅班级成员', '所有人可见', '仅教师可见'];
          this.setData({
            'classInfo.privacyLevel': levelList[res.tapIndex]
          });
          wx.showToast({
            title: '修改成功',
            icon: 'success'
          });
        }
      });
    },
  
    // 切换允许学生加入
    toggleAllowJoin(e: any) {
      this.setData({
        'classInfo.allowJoin': e.detail.value
      });
    },
  
    // 切换允许查看成绩
    toggleAllowViewScores(e: any) {
      this.setData({
        'classInfo.allowViewScores': e.detail.value
      });
    },
  
    // 解散班级
    disbandClass() {
      wx.showModal({
        title: '解散班级',
        content: '确定要解散该班级吗？此操作不可撤销。',
        confirmColor: '#e34d59',
        success: (res) => {
          if (res.confirm) {
            wx.showLoading({
              title: '处理中'
            });
            
            setTimeout(() => {
              wx.hideLoading();
              wx.showToast({
                title: '班级已解散',
                icon: 'success'
              });
              
              setTimeout(() => {
                wx.navigateBack();
              }, 1500);
            }, 2000);
          }
        }
      });
    },
  
    // 导航到指定页面
    navigateTo(e: any) {
      const url = e.currentTarget.dataset.url;
      wx.navigateTo({
        url: `${url}?classId=${this.data.classId}`
      });
    }
  });