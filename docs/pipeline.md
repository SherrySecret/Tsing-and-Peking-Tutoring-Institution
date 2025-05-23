小程序需求文档
一、用户角色
教师

学生/家长

二、核心页面结构
入口页 → 角色选择 → 主框架页
  ├─ 班级导航
  ├─ 名师导航
  ├─ 功能导航
  └─ 我的导航
三、详细页面说明
1. 入口页面
功能模块：

角色选择按钮（教师 / 学生家长）

机构LOGO展示区

2. 主框架页（底部导航）
导航栏配置：

班级

名师

功能

我的

3. 班级模块
3.1 班级主页
核心元素：

班级卡片列表（支持多班级展示）

底部悬浮按钮【加入新班级】

3.2 加入班级流程
页面流程：

搜索页（顶部搜索栏 + 班级列表）

学生选择页（关联家长账户下的学生）

确认加入页

3.3 班级详情页
页面结构：

固定头部（班级名称）

基本信息区（头像/班主任/科目）

功能模块入口：

成员管理

学生成绩

作业管理

文件中心

通知公告流

3.4 子页面体系
班级成员页：

分组展示（班主任/教师/学生）

教师可点击查看（个人资料+微信二维码）

成绩管理页：

考试列表

成绩趋势图（科目选择器）

班级排名展示

作业详情页：

作业描述区

提交窗口（文本+附件）

操作按钮（提交/返回）

文件中心页：

文件列表（时间倒序）

下载按钮

通知详情页：

富文本展示区

附件下载功能

4. 名师模块
主页设计：

教师列表（带头像/科目/简介）

顶部搜索栏

详情页：

与班级成员页教师信息页复用

联系方式模块（需做访问权限控制）

5. 功能模块
功能矩阵布局：

课程表（日历视图）

一对一辅导（预约系统）

英语练习（题库入口）

AI问答（对话界面入口）

更多功能扩展位

6. 我的模块
个人信息页：

用户头像/姓名/电话

学生档案管理：

现有学生列表

【添加学生】按钮

系统功能：

修改资料

退出登录

添加学生页：

表单字段（姓名/年级/关系证明）

证件上传功能

四、交互要求
角色选择后记忆登录状态

班级模块需支持多端适配：

教师端显示管理功能

家长端显示关联学生切换

文件中心需标注上传时间格式（YYYY-MM-DD HH:mm）

成绩图表要求支持横屏查看

五、页面关系图
[入口页]
   ↓
[主框架]
   ├─ 班级 → 详情页 → (成员/成绩/作业/文件/通知)
   ├─ 名师 → 教师详情
   ├─ 功能 → 各工具页
   └─ 我的 → 档案管理
六、特别说明
需设计统一的班级头部组件

教师角色在"我的"模块不显示学生档案

家长账户需支持多个学生绑定

所有列表页需设计加载状态和空数据提示

此文档可直接导入Cursor进行原型图生成，建议采用以下设计规范：

使用微信小程序标准配色

教师端采用蓝色系，家长端采用绿色系

底部导航图标需区分选中/未选中状态

列表项高度不低于96rpx

所有点击区域需符合Fitts定律设计