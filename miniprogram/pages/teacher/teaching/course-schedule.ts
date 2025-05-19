interface Weekday {
  name: string;
  date: number;
  isWeekend: boolean;
  fullDate: string; // YYYY-MM-DD 格式
}

interface ScheduleItem {
  id: string;
  type: 'class' | 'note';
  number?: number; // 第几节课，仅课程有
  timeRange: string;
  hasClass?: boolean; // 仅课程有
  className?: string;
  courseName?: string;
  topic?: string;
  location: string;
  title?: string; // 仅备注有
}

interface ScheduleData {
  [key: string]: ScheduleItem[];
}

Page({
  data: {
    currentYear: new Date().getFullYear(),
    currentMonth: new Date().getMonth() + 1,
    currentWeek: 15, // 示例数据
    currentDayIndex: 4, // 默认选中周五
    weekdays: [
      { name: '一', date: 8, isWeekend: false, fullDate: '2024-05-08' },
      { name: '二', date: 9, isWeekend: false, fullDate: '2024-05-09' },
      { name: '三', date: 10, isWeekend: false, fullDate: '2024-05-10' },
      { name: '四', date: 11, isWeekend: false, fullDate: '2024-05-11' },
      { name: '五', date: 12, isWeekend: false, fullDate: '2024-05-12' },
      { name: '六', date: 13, isWeekend: true, fullDate: '2024-05-13' },
      { name: '日', date: 14, isWeekend: true, fullDate: '2024-05-14' }
    ] as Weekday[],
    schedule: {
      '2024-05-12': [
        {
          id: '1',
          type: 'class',
          number: 1,
          timeRange: '08:00-08:45',
          hasClass: true,
          className: '高三（2）班',
          courseName: '数学',
          topic: '函数的导数与应用',
          location: '三楼302教室'
        },
        {
          id: '2',
          type: 'class',
          number: 2,
          timeRange: '09:00-09:45',
          hasClass: false,
          location: ''
        },
        {
          id: '3',
          type: 'class',
          number: 3,
          timeRange: '10:10-10:55',
          hasClass: true,
          className: '高三（1）班',
          courseName: '数学',
          topic: '概率论基础',
          location: '三楼301教室'
        },
        {
          id: '4',
          type: 'class',
          number: 4,
          timeRange: '11:10-11:55',
          hasClass: false,
          location: ''
        },
        {
          id: '5',
          type: 'note',
          title: '数学教研组会议',
          timeRange: '14:00-15:30',
          location: '三楼会议室'
        },
        {
          id: '6',
          type: 'class',
          number: 5,
          timeRange: '14:30-15:15',
          hasClass: true,
          className: '高二（3）班',
          courseName: '数学',
          topic: '三角函数与三角恒等式',
          location: '二楼205教室'
        },
        {
          id: '7',
          type: 'class',
          number: 6,
          timeRange: '15:30-16:15',
          hasClass: false,
          location: ''
        }
      ],
      '2024-05-08': [
        {
          id: '8',
          type: 'class',
          number: 1,
          timeRange: '08:00-08:45',
          hasClass: true,
          className: '高二（1）班',
          courseName: '数学',
          topic: '立体几何',
          location: '二楼203教室'
        },
        {
          id: '9',
          type: 'class',
          number: 2,
          timeRange: '09:00-09:45',
          hasClass: true,
          className: '高二（1）班',
          courseName: '数学',
          topic: '立体几何',
          location: '二楼203教室'
        }
      ]
    } as ScheduleData,
    currentDaySchedule: [] as ScheduleItem[]
  },

  onLoad() {
    // 初始化当前日期的课程安排
    this.updateCurrentDaySchedule();
  },

  // 切换到上一周
  prevWeek() {
    // 真实环境下应该基于当前日期计算上一周的日期
    wx.showToast({
      title: '已切换到上一周',
      icon: 'none'
    });
  },

  // 切换到下一周
  nextWeek() {
    // 真实环境下应该基于当前日期计算下一周的日期
    wx.showToast({
      title: '已切换到下一周',
      icon: 'none'
    });
  },

  // 选择某一天
  selectDay(e: WechatMiniprogram.Touch) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      currentDayIndex: index
    });
    this.updateCurrentDaySchedule();
  },

  // 更新当前选中日期的课程安排
  updateCurrentDaySchedule() {
    const fullDate = this.data.weekdays[this.data.currentDayIndex].fullDate;
    const daySchedule = this.data.schedule[fullDate] || [];
    
    this.setData({
      currentDaySchedule: daySchedule
    });
  },

  // 查看课程详情
  viewClassDetail(e: WechatMiniprogram.Touch) {
    const id = e.currentTarget.dataset.id;
    const classItem = this.data.currentDaySchedule.find(item => item.id === id && item.type === 'class');
    
    if (!classItem || !classItem.hasClass) return;
    
    // 跳转到课堂页面
    wx.navigateTo({
      url: `/pages/teacher/teaching/classroom?className=${classItem.className}&courseName=${classItem.courseName}`
    });
  }
}) 