// RSS 解析模块 - 获取宝可梦资讯
const RSS_FEEDS = {
    serebii: 'https://www.serebii.net/news/index.shtml',
    serebiiRss: 'https://www.serebii.net/news.rss'
};

// 本地资讯数据文件路径
const LOCAL_NEWS_FILE = '../assets/js/data/news.json';

/**
 * 加载本地资讯数据
 * @returns {Promise<Array>} - 资讯列表
 */
async function loadLocalNews() {
    try {
        console.log('Loading local news data...');
        const response = await fetch(LOCAL_NEWS_FILE);
        
        if (response.ok) {
            const data = await response.json();
            console.log(`Loaded ${data.news.length} news items from local file`);
            return data.news;
        }
    } catch (error) {
        console.error('Failed to load local news:', error);
    }
    
    return [];
}

/**
 * 获取宝可梦资讯（优先使用本地数据）
 * @returns {Promise<Array>} - 资讯列表
 */
async function getPokemonNews() {
    // 优先加载本地数据
    let newsItems = await loadLocalNews();
    
    // 如果本地数据为空，使用模拟数据
    if (!newsItems || newsItems.length === 0) {
        console.log('Local news not available, using mock data');
        newsItems = getMockNews();
    }
    
    return newsItems;
}

/**
 * 获取模拟资讯数据（备用）
 */
function getMockNews() {
    return [
        {
            title: '《宝可梦 朱/紫》DLC「零之秘宝」第二弹现已发布',
            link: 'https://www.serebii.net',
            description: '探索帕底亚地区的全新故事，遇见传说中的宝可梦！',
            pubDate: '2024年12月14日',
            source: 'Serebii.net'
        },
        {
            title: '全新宝可梦卡牌游戏扩展包即将发售',
            link: 'https://www.serebii.net',
            description: '包含大量新卡牌和稀有闪卡，收集爱好者不容错过！',
            pubDate: '2024年12月10日',
            source: 'Serebii.net'
        },
        {
            title: '宝可梦官方公布新动画系列详情',
            link: 'https://www.serebii.net',
            description: '全新主角和冒险故事即将展开，敬请期待！',
            pubDate: '2024年12月5日',
            source: 'Serebii.net'
        },
        {
            title: '全球宝可梦锦标赛即将开幕',
            link: 'https://www.serebii.net',
            description: '来自世界各地的训练家齐聚一堂，争夺冠军宝座！',
            pubDate: '2024年11月28日',
            source: 'Serebii.net'
        },
        {
            title: '宝可梦 Sleep 推出全新功能更新',
            link: 'https://www.serebii.net',
            description: '新增睡眠分析和宝可梦收集功能，让睡眠更加有趣！',
            pubDate: '2024年11月20日',
            source: 'Serebii.net'
        }
    ];
}

// 导出函数
window.getPokemonNews = getPokemonNews;