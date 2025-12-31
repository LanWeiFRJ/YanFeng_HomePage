import { NewsItem, TimelineEvent, HistoryEvent } from './types';

// RAG Knowledge Base: This text is injected into the Gemini System Instruction
export const YANFENG_KNOWLEDGE_BASE = `
关于檐枫动漫社 (Yanfeng Anime Club):
1. **简介**: 檐枫动漫社是一个致力于推广ACG文化的高校社团，成立于2010年。
2. **主要活动**:
    - **冬日祭 (Winter Festival)**: 每年12月举办的大型舞台表演和摊位活动。
    - **GMA (Golden Maple Awards)**: 社团内部的年度颁奖典礼，表彰优秀作品和成员。
    - **社庆**: 每年5月举办，庆祝社团生日。
3. **部门架构**:
    - **Cosplay部**: 负责舞台剧、平面拍摄。
    - **宅舞部**: 负责各类舞蹈排练与演出。
    - **声乐部**: 翻唱、乐队演出。
    - **绘画部**: 负责宣传海报绘制、周边设计。
    - **后勤部**: 道具制作、场地布置。
4. **近期大事件**:
    - 2023年冬日祭主题为“时空列车”。
    - 第十届GMA将于今年11月举行。
5. **吉祥物**: 是一只名叫“枫糖”的小狐狸，戴着红色围巾。
`;


export const WECHAT_ARTICLES: NewsItem[] = [
  {
    id: '1',
    title: '【招新】2024秋季招新正式启动！',
    date: '2024-09-01',
    summary: '加入我们，一起在这个秋天燃烧中二之魂！五大部门等你来挑战。',
    tag: '招新',
    source: 'WeChat',
    link: '#',
    coverUrl: 'https://picsum.photos/seed/yanfeng1/400/200'
  },
  {
    id: '2',
    title: '【活动回顾】第14届夏日祭圆满落幕',
    date: '2024-07-15',
    summary: '感谢所有staff的辛勤付出，本次活动参与人数创历史新高！现场返图已上传。',
    tag: '回顾',
    source: 'WeChat',
    link: '#',
    coverUrl: 'https://picsum.photos/seed/yanfeng2/400/200'
  },
   {
    id: '3',
    title: '【GMA前瞻】入围名单大公开！',
    date: '2024-10-25',
    summary: '究竟花落谁家？年度最佳Cosplay奖项竞争激烈。',
    tag: 'GMA',
    source: 'WeChat',
    link: '#',
    coverUrl: 'https://picsum.photos/seed/yanfeng3/400/200'
  },
  {
    id: '4',
    title: '【通知】关于本周五例行活动的调整通知',
    date: '2024-10-20',
    summary: '由于场地原因，原定于活动中心的例会改至3号教学楼201教室。',
    tag: '通知',
    source: 'WeChat',
    link: '#'
  }
];

export const MOCK_NEWS: NewsItem[] = [
  {
    id: 'res-1',
    title: '2024年社团年鉴电子版',
    date: '2024-12-01',
    summary: '记录了这一年所有的美好回忆，点击下载PDF版本。',
    tag: '年鉴',
    source: 'System',
    link: '#'
  },
  {
    id: 'res-2',
    title: '檐枫Logo矢量图下载',
    date: '2024-09-10',
    summary: '社团官方Logo资源，包含AI、PNG格式，供宣传制作使用。',
    tag: '资源',
    source: 'System',
    link: '#'
  },
  {
    id: 'res-3',
    title: '官方组介绍',
    date: '2024-03-01',
    summary: '更新后的大学生活动中心场地申请流程，各部门请仔细阅读。',
    tag: '文档',
    source: 'System',
    link: '#'
  },
  {
    id: 'res-4',
    title: '社团章程（2024修订版）',
    date: '2024-02-15',
    summary: '檐枫动漫社最新版章程，包含会员权利与义务说明。',
    tag: '文档',
    source: 'System',
    link: '#'
  },
  {
    id: 'res-5',
    title: '活动报销申请表模板',
    date: '2024-01-10',
    summary: '各部门举办活动需填写的报销表格，下载后打印使用。',
    tag: '表格',
    source: 'System',
    link: '#'
  },
  {
    id: 'res-6',
    title: 'GMA参赛报名表',
    date: '2024-10-01',
    summary: '第十届金枫叶奖参赛报名专用表格。',
    tag: '报名',
    source: 'System',
    link: '#'
  },
  {
    id: 'res-7',
    title: '社团器材借用管理办法',
    date: '2023-12-05',
    summary: '关于摄影器材、音响设备借用的具体规定及赔偿标准。',
    tag: '规定',
    source: 'System',
    link: '#'
  },

  {
    id: 'res-8',
    title: '2024春季学期社团值班表',
    date: '2024-03-05',
    summary: '新学期活动室值班安排，请各位干事准时到岗。',
    tag: '公示',
    source: 'System',
    link: '#'
  },
  {
    id: 'res-9',
    title: '社团活动室使用规范',
    date: '2023-11-20',
    summary: '保持环境整洁，爱护公物，人人有责。',
    tag: '规定',
    source: 'System',
    link: '#'
  }
];

export const HISTORY_DATA: HistoryEvent[] = [
  { year: '2004', title: '社团成立', description: '几位热爱动漫的学长学姐在旧活动室创立了檐枫。' },
  { year: '2012', title: '社刊创刊', description: '首期《檐艺》正式发行，收录社员原创图文作品。' },
  { year: '2015', title: '首届GMA', description: '确立了年度颁奖典礼的传统，标志着社团正规化。' },
  { year: '2019', title: '全省高校金奖', description: '《代号：枫》舞台剧荣获全省高校动漫联展金奖。' },
  { year: '2021', title: '云端相聚', description: '在特殊时期成功举办首届线上冬日祭，连接你我。' },
  { year: '2023', title: '百人社团', description: '注册会员突破500人，活跃干事超过100人。' },
];

export const TIMELINE_DATA: TimelineEvent[] = [
  { month: '10月', title: '社团游园会&社团大会' },
  { month: '12月', title: '冬日祭' },
  { month: '2月', title: 'GMA&新年祭' },
  { month: '5月', title: '社庆' },
];