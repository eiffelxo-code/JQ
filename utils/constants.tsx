import React from 'react';
import { AgentProfile, HeroCardData, ServiceCategory } from '../types';

export const SCENIC_NAME = "云峰屯堡";
export const WEATHER_INFO = {
  day: "周三",
  temp: "19°C",
  date: "12/10",
  condition: "Sunny"
};

// Image Assets - Updated with specific user provided URLs
const IMG_GUIDE = 'https://img.lenyiin.com/app/thumb.php?img=/image/2026/02/14/104535.webp';
const IMG_STORY = 'https://img.lenyiin.com/app/thumb.php?img=/image/2026/02/14/084557.webp';

const IMG_EVENT = 'https://img.lenyiin.com/app/thumb.php?img=/image/2026/02/14/104536_1.webp';
const IMG_PHOTO = 'https://img.lenyiin.com/app/thumb.php?img=/image/2026/02/14/084556.webp';
const IMG_LOCAL = 'https://img.lenyiin.com/app/thumb.php?img=/image/2026/02/14/104535_1.webp';

const IMG_SERVICE = 'https://img.lenyiin.com/app/thumb.php?img=/image/2026/02/14/104536.webp';
const IMG_NEW_MAIN = 'https://img.lenyiin.com/app/thumb.php?img=/image/2026/02/14/091911.webp';

// Keep MAIN_AVATAR as the original (Storyteller/Moyuan) image as requested
export const MAIN_AVATAR = IMG_NEW_MAIN; 

// 1. Guide (引路人)
// 2. Storyteller (说书人)
// 3. Event Assistant (活动助手)
// 4. Service Assistant (服务助手)
// 5. Photo Assistant (旅拍助手)
// 6. Local Explorer (周边玩家)

export const AGENTS: AgentProfile[] = [
  {
    id: 'guide',
    name: '引路人',
    role: 'Guide',
    type: 'guide',
    avatarUrl: IMG_GUIDE,
    description: '景区路线规划',
    defaultPrompt: '我在大门，请带我去最近的景点。'
  },
  {
    id: 'story',
    name: '说书人',
    role: 'Storyteller',
    type: 'culture',
    avatarUrl: IMG_STORY,
    description: '历史文化讲解',
    defaultPrompt: '给我讲讲这里发生的历史故事吧。'
  },
  {
    id: 'event',
    name: '活动助手',
    role: 'Event Assistant',
    type: 'planning',
    avatarUrl: IMG_EVENT,
    description: '演出活动资讯',
    defaultPrompt: '今天有哪些表演可以看？'
  },
  {
    id: 'service',
    name: '服务助手',
    role: 'Service Assistant',
    type: 'guide',
    avatarUrl: IMG_SERVICE,
    description: '便民设施指引',
    defaultPrompt: '请问最近的洗手间在哪里？'
  },
  {
    id: 'photo',
    name: '旅拍助手',
    role: 'Photo Assistant',
    type: 'local',
    avatarUrl: IMG_PHOTO,
    description: '最佳打卡点',
    defaultPrompt: '推荐几个适合拍照好看的地方。'
  },
  {
    id: 'local',
    name: '周边玩家',
    role: 'Local Explorer',
    type: 'local',
    avatarUrl: IMG_LOCAL,
    description: '吃喝玩乐推荐',
    defaultPrompt: '周边有什么好吃的特色菜？'
  }
];

export const HERO_CARDS: HeroCardData[] = [
  {
    id: 'guide',
    name: '云小途',
    tagline: '路线活地图',
    avatarUrl: IMG_GUIDE,
    cardImageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
    actions: [
      { label: '查看热力图', prompt: '请显示当前景区的游客热力图分布。' },
      { label: '避堵路线', prompt: '帮我规划一条避开拥堵的游览路线。' }
    ],
    style: 'efficient',
    tags: [
      { label: '精准度', score: 98 },
      { label: '响应快', score: 95 },
      { label: '全覆盖', score: 99 }
    ],
    description: '我是您的专属引路人。无论您身在何处，只要告诉我目的地，我都能为您规划出最省时、最便捷的路线。',
    usefulInfo: {
      type: 'comfort',
      color: 'green',
      title: '当前拥挤度',
      subtitle: '舒适 · 宜游览',
      emoji: '🍃'
    }
  },
  {
    id: 'story',
    name: '墨渊',
    tagline: '古今通晓',
    avatarUrl: IMG_STORY,
    cardImageUrl: 'https://images.unsplash.com/photo-1542640244-7e672d6bd4e8?auto=format&fit=crop&w=600&q=80',
    actions: [
      { label: '讲个趣闻', prompt: '给我讲一个关于这里的有趣历史传说。' },
      { label: '历史问答', prompt: '考考我关于这里的历史知识吧。' }
    ],
    style: 'friendly',
    tags: [
      { label: '博学值', score: 99 },
      { label: '故事力', score: 96 },
      { label: '沉浸感', score: 92 }
    ],
    description: '我是这里的说书人。每一块青石板，每一座老宅院，都有它尘封的往事。让我为您娓娓道来。',
    usefulInfo: {
      type: 'tip',
      color: 'blue',
      title: '当前位置',
      subtitle: '云峰博物馆附近',
      emoji: '📍'
    }
  },
  {
    id: 'event',
    name: '活力小七',
    tagline: '快乐制造机',
    avatarUrl: IMG_EVENT,
    cardImageUrl: 'https://images.unsplash.com/photo-1548545814-17c38c642e5d?auto=format&fit=crop&w=600&q=80',
    actions: [
      { label: '今日演出', prompt: '今天有哪些不容错过的演出表演？' },
      { label: '预约活动', prompt: '我想预约参加晚上的篝火晚会。' }
    ],
    style: 'enthusiastic',
    tags: [
      { label: '活力值', score: 98 },
      { label: '气氛组', score: 95 },
      { label: '资讯通', score: 94 }
    ],
    description: '我是活动助手！哪里热闹哪里就有我。想看地戏表演？想参加篝火晚会？跟着我，精彩不断！',
    usefulInfo: {
      type: 'event',
      color: 'purple',
      title: '正在热映',
      subtitle: '非遗地戏表演 (主舞台)',
      emoji: '🎭'
    }
  },
  {
    id: 'service',
    name: '暖暖',
    tagline: '贴心小棉袄',
    avatarUrl: IMG_SERVICE,
    cardImageUrl: 'https://images.unsplash.com/photo-1621257929497-22687a744265?auto=format&fit=crop&w=600&q=80',
    actions: [
      { label: '找洗手间', prompt: '请告诉我现在离我最近的洗手间在哪里？' },
      { label: '紧急呼叫', prompt: '我需要紧急帮助，请联系工作人员。' }
    ],
    style: 'friendly',
    tags: [
      { label: '亲和力', score: 99 },
      { label: '细心度', score: 97 },
      { label: '服务值', score: 96 }
    ],
    description: '我是服务助手。找厕所、找停车场、借轮椅……这些琐碎小事都交给我，让您的游玩体验无忧无虑。',
    usefulInfo: {
      type: 'tip',
      color: 'yellow',
      title: '最近设施',
      subtitle: '洗手间 (50m) · 停车场 (200m)',
      emoji: '🚻'
    }
  },
  {
    id: 'photo',
    name: '雅雅',
    tagline: '审美天花板',
    avatarUrl: IMG_PHOTO,
    cardImageUrl: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=600&q=80',
    actions: [
      { label: '推荐机位', prompt: '推荐几个现在光线最好的拍照机位。' },
      { label: '拍照指导', prompt: '教我几个适合这里的拍照姿势。' }
    ],
    style: 'efficient',
    tags: [
      { label: '审美力', score: 98 },
      { label: '出片率', score: 96 },
      { label: '构图感', score: 95 }
    ],
    description: '我是旅拍助手。不知道怎么摆pose？找不到最佳机位？让我带您去那些隐秘的绝美角落。',
    usefulInfo: {
      type: 'recommendation',
      color: 'blue',
      title: '最佳机位',
      subtitle: '云山屯古戏台 (距您120m)',
      emoji: '📸'
    }
  },
  {
    id: 'local',
    name: '阿福',
    tagline: '地道老饕',
    avatarUrl: IMG_LOCAL,
    cardImageUrl: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80',
    actions: [
      { label: '特色美食', prompt: '推荐几道必吃的本地特色菜。' },
      { label: '避雷指南', prompt: '有哪些网红店是不推荐去的？' }
    ],
    style: 'enthusiastic',
    tags: [
      { label: '寻味力', score: 99 },
      { label: '本地通', score: 95 },
      { label: '性价比', score: 92 }
    ],
    description: '我是周边玩家。我知道巷子深处阿婆做的辣子鸡，还有村口那家最正宗的烤小肠。',
    usefulInfo: {
      type: 'recommendation',
      color: 'red',
      title: '饭点提醒',
      subtitle: '周边3家好评餐厅排队少',
      emoji: '🍜'
    }
  }
];

export const OUTSIDE_CHIPS = [
  { label: "购门票", icon: "ticket" },
  { label: "怎么去", icon: "bus" },
  { label: "看攻略", icon: "map" },
  { label: "全部服务", icon: "grid" }
];

export const INSIDE_CHIPS = [
  { label: "找厕所", icon: "map-pin" },
  { label: "听讲解", icon: "headphones" },
  { label: "找美食", icon: "utensils" },
  { label: "全部服务", icon: "grid" }
];

export const ALL_SERVICES: ServiceCategory[] = [
  {
    title: "游前准备",
    items: [
      { name: "预约购票", icon: "ticket" },
      { name: "交通指南", icon: "bus" },
      { name: "景区介绍", icon: "info" },
      { name: "游玩攻略", icon: "map" },
    ]
  },
  {
    title: "游中服务",
    items: [
      { name: "语音讲解", icon: "headphones" },
      { name: "智慧厕所", icon: "map-pin" },
      { name: "智慧停车", icon: "car" },
      { name: "紧急求助", icon: "phone" },
      { name: "文创商店", icon: "shopping-bag" },
      { name: "餐饮推荐", icon: "coffee" },
    ]
  },
  {
    title: "游后互动",
    items: [
      { name: "投诉建议", icon: "message-square" },
      { name: "精彩瞬间", icon: "image" },
      { name: "满意度评价", icon: "star" },
    ]
  }
];