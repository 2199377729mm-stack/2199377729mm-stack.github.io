const quizQuestions = [
    {
        question: "你最看重宝可梦的什么特点？",
        options: [
            { text: "强大的战斗能力和属性克制", tags: { battle: 0.8 } },
            { text: "稀有度与收藏价值", tags: { collector: 0.8 } },
            { text: "可爱的外观设计", tags: { popular: 0.8 } },
            { text: "故事与背景设定", tags: { story: 0.8 } }
        ]
    },
    {
        question: "你在游戏中花最多时间做什么？",
        options: [
            { text: "研究对战配置和排位", tags: { battle: 0.7 } },
            { text: "完成图鉴收集", tags: { collector: 0.7 } },
            { text: "培育完美个体", tags: { breeder: 0.7 } },
            { text: "探索剧情和地图", tags: { story: 0.7 } }
        ]
    },
    {
        question: "你偏好哪种类型的宝可梦？",
        options: [
            { text: "高攻击高速度的强者", tags: { battle: 0.6 } },
            { text: "传说中的神秘宝可梦", tags: { collector: 0.6 } },
            { text: "小巧可爱的宝可梦", tags: { popular: 0.6 } },
            { text: "有深厚背景故事的宝可梦", tags: { story: 0.6 } }
        ]
    },
    {
        question: "你如何构建你的战斗队伍？",
        options: [
            { text: "追求极致的属性克制链", tags: { battle: 0.7 } },
            { text: "收集不同世代的代表宝可梦", tags: { collector: 0.7 } },
            { text: "精心培育拥有最佳个体值的宝可梦", tags: { breeder: 0.7 } },
            { text: "选择与剧情相关的宝可梦", tags: { story: 0.7 } }
        ]
    },
    {
        question: "你最喜欢的游戏模式是什么？",
        options: [
            { text: "在线对战和锦标赛", tags: { battle: 0.8 } },
            { text: "收集活动和限时任务", tags: { collector: 0.8 } },
            { text: "好友交换和培育协作", tags: { breeder: 0.8 } },
            { text: "剧情副本和支线任务", tags: { story: 0.8 } }
        ]
    },
    {
        question: "你对宝可梦的数值有多关注？",
        options: [
            { text: "精通个体值、努力值和性格搭配", tags: { battle: 0.7 } },
            { text: "只关心图鉴编号和稀有度", tags: { collector: 0.7 } },
            { text: "专注于培育出完美数值的宝可梦", tags: { breeder: 0.7 } },
            { text: "不太关注数值，享受游戏体验", tags: { story: 0.7 } }
        ]
    },
    {
        question: "你喜欢哪种进化方式？",
        options: [
            { text: "战斗升级进化", tags: { battle: 0.6 } },
            { text: "特殊道具进化（如进化石）", tags: { collector: 0.6 } },
            { text: "亲密度或时间触发进化", tags: { breeder: 0.6 } },
            { text: "剧情触发的特殊进化", tags: { story: 0.6 } }
        ]
    },
    {
        question: "你会如何获取新的宝可梦？",
        options: [
            { text: "通过对战捕获强力个体", tags: { battle: 0.7 } },
            { text: "完成图鉴任务获取稀有宝可梦", tags: { collector: 0.7 } },
            { text: "与好友交换获取不同版本专属", tags: { breeder: 0.7 } },
            { text: "通过剧情获得赠送的宝可梦", tags: { story: 0.7 } }
        ]
    },
    {
        question: "你最喜欢的宝可梦属性组合是？",
        options: [
            { text: "攻击型（火/格斗/龙）", tags: { battle: 0.6 } },
            { text: "稀有属性（钢/恶/妖精）", tags: { collector: 0.6 } },
            { text: "可爱属性（妖精/普通/水）", tags: { popular: 0.6 } },
            { text: "神秘属性（超能力/幽灵/龙）", tags: { story: 0.6 } }
        ]
    },
    {
        question: "你在团队中更倾向于？",
        options: [
            { text: "打造攻防兼备的均衡队伍", tags: { battle: 0.7 } },
            { text: "收集各世代的代表性宝可梦", tags: { collector: 0.7 } },
            { text: "培养拥有特殊特性的宝可梦", tags: { breeder: 0.7 } },
            { text: "选择与自己有共鸣的宝可梦", tags: { story: 0.7 } }
        ]
    }
];

const playerTypes = {
    battle: {
        name: "对战大师",
        color: "#E3350D",
        description: "你热衷于宝可梦对战，追求最强的阵容配置！精通属性克制、努力值分配和战术搭配。",
        representative: "Mewtwo"
    },
    collector: {
        name: "图鉴收藏家",
        color: "#FFD700",
        description: "你热爱收集稀有宝可梦，立志完成全国图鉴！对各种稀有形态和闪光宝可梦情有独钟。",
        representative: "Mew"
    },
    breeder: {
        name: "培育专家",
        color: "#7AC74C",
        description: "你享受培育宝可梦的过程，追求完美个体值、闪光和特殊特性！",
        representative: "Eevee"
    },
    story: {
        name: "剧情探索者",
        color: "#6390F0",
        description: "你被宝可梦世界的故事深深吸引，喜欢探索每个地区的风土人情！",
        representative: "Articuno"
    },
    popular: {
        name: "颜值达人",
        color: "#D685AD",
        description: "你喜欢可爱帅气的宝可梦，颜值就是正义！关注宝可梦的设计和人气排行。",
        representative: "Pikachu"
    }
};

function calculateProfile(answers) {
    const profile = {
        battle: 0,
        collector: 0,
        breeder: 0,
        story: 0,
        popular: 0
    };
    
    answers.forEach(answer => {
        Object.keys(answer.tags).forEach(tag => {
            profile[tag] += answer.tags[tag];
        });
    });
    
    // 计算总分
    const total = Object.values(profile).reduce((a, b) => a + b, 0);
    
    // 归一化权重
    const normalized = {};
    Object.keys(profile).forEach(tag => {
        normalized[tag] = total > 0 ? profile[tag] / total : 0;
    });
    
    // 找到主要类型
    const maxTag = Object.keys(normalized).reduce((a, b) => 
        normalized[a] > normalized[b] ? a : b
    );
    
    return {
        weights: normalized,
        primaryType: maxTag,
        typeInfo: playerTypes[maxTag],
        rawScores: profile,
        totalScore: total
    };
}

function saveProfile(profile) {
    localStorage.setItem('playerProfile', JSON.stringify(profile));
}

function getProfile() {
    const saved = localStorage.getItem('playerProfile');
    return saved ? JSON.parse(saved) : null;
}

function clearProfile() {
    localStorage.removeItem('playerProfile');
    localStorage.removeItem('quizAnswers');
}