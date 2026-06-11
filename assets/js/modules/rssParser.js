// RSS 解析模块 - 获取宝可梦资讯
const RSS_FEEDS = {
    serebii: 'https://www.serebii.net/news/index.shtml',
    serebiiRss: 'https://www.serebii.net/news.rss'
};

// 本地资讯数据文件路径
const LOCAL_NEWS_FILE = '../assets/js/data/news.json';

/**
 * 解析 RSS XML 数据
 * @param {string} xmlString - RSS XML 字符串
 * @returns {Array} - 资讯列表
 */
function parseRSS(xmlString) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'application/xml');
    
    const items = xmlDoc.querySelectorAll('item');
    const newsItems = [];
    
    items.forEach(item => {
        const title = item.querySelector('title')?.textContent || '';
        const link = item.querySelector('link')?.textContent || '';
        const description = item.querySelector('description')?.textContent || '';
        const pubDate = item.querySelector('pubDate')?.textContent || '';
        
        newsItems.push({
            title: title.trim(),
            link: link.trim(),
            description: description.trim(),
            pubDate: formatDate(pubDate),
            source: 'Serebii.net'
        });
    });
    
    return newsItems;
}

/**
 * 格式化日期
 * @param {string} dateString - 原始日期字符串
 * @returns {string} - 格式化后的日期
 */
function formatDate(dateString) {
    if (!dateString) return '';
    
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch {
        return dateString;
    }
}

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
 * 尝试从外部源获取最新资讯
 * @returns {Promise<Array>} - 资讯列表
 */
async function fetchFreshNews() {
    const proxies = [
        'https://api.allorigins.win/raw?url=',
        'https://corsproxy.io/?url=',
        'https://cors-anywhere.herokuapp.com/',
        'https://thingproxy.freeboard.io/fetch/'
    ];
    
    for (let i = 0; i < proxies.length; i++) {
        try {
            console.log(`Trying proxy ${i + 1}: ${proxies[i]}`);
            const response = await fetch(proxies[i] + encodeURIComponent(RSS_FEEDS.serebiiRss));
            
            if (response.ok) {
                const xmlString = await response.text();
                const newsItems = parseRSS(xmlString);
                
                if (newsItems.length > 0) {
                    console.log(`Successfully fetched ${newsItems.length} news items`);
                    return newsItems;
                }
            }
        } catch (error) {
            console.warn(`Proxy ${i + 1} failed:`, error.message);
        }
    }
    
    // 如果所有代理都失败，尝试从其他可靠来源获取
    return await fetchAlternativeNews();
}

/**
 * 从备用来源获取资讯
 */
async function fetchAlternativeNews() {
    // 可以添加其他可靠的资讯源
    // 这里返回空数组，使用本地数据作为后备
    return [];
}

/**
 * 获取宝可梦资讯（优先使用本地数据，其次使用缓存）
 * @returns {Promise<Array>} - 资讯列表
 */
async function getPokemonNews() {
    // 1. 首先检查 localStorage 缓存
    const cachedNews = localStorage.getItem('cachedNews');
    if (cachedNews) {
        try {
            const news = JSON.parse(cachedNews);
            if (news.length > 0) {
                console.log('Loaded news from localStorage cache');
                return news;
            }
        } catch (error) {
            console.error('Failed to parse cached news:', error);
        }
    }
    
    // 2. 加载本地数据文件
    let newsItems = await loadLocalNews();
    
    // 3. 如果本地数据为空，使用模拟数据
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
            title: '《宝可梦 朱/紫》DLC「零之秘宝」第二弹「蓝之圆盘」现已发布',
            link: 'https://www.serebii.net',
            description: '探索蓝莓学园的神秘故事，遇见新的传说宝可梦！本次更新包含大量新宝可梦、新地图和新剧情。',
            pubDate: '2024年12月14日',
            source: 'Serebii.net'
        },
        {
            title: '宝可梦卡牌游戏「猩红与紫罗兰」扩展包即将发售',
            link: 'https://www.serebii.net',
            description: '全新扩展包包含195张卡牌，包括大量稀有闪卡和全新的VSTAR卡牌。',
            pubDate: '2024年12月10日',
            source: 'Serebii.net'
        },
        {
            title: '宝可梦官方公布全新动画系列《宝可梦 地平线》详情',
            link: 'https://www.serebii.net',
            description: '新动画将以莉可和罗伊为主角，展开全新的冒险故事，敬请期待！',
            pubDate: '2024年12月5日',
            source: 'Serebii.net'
        },
        {
            title: '2024年全球宝可梦锦标赛即将开幕',
            link: 'https://www.serebii.net',
            description: '来自世界各地的顶尖训练家齐聚夏威夷，争夺世界冠军宝座！',
            pubDate: '2024年11月28日',
            source: 'Serebii.net'
        },
        {
            title: '宝可梦 Sleep 推出冬季更新',
            link: 'https://www.serebii.net',
            description: '新增睡眠分析功能和冬季限定宝可梦，让你的睡眠更加有趣！',
            pubDate: '2024年11月20日',
            source: 'Serebii.net'
        },
        {
            title: '《宝可梦 GO》万圣节活动圆满结束',
            link: 'https://www.serebii.net',
            description: '本次活动吸引了超过1亿玩家参与，捕获了大量幽灵属性宝可梦。',
            pubDate: '2024年11月5日',
            source: 'Serebii.net'
        },
        {
            title: '全新宝可梦「铁斑叶」和「走鲸」正式公布',
            link: 'https://www.serebii.net',
            description: '来自帕底亚地区的古代和未来形态宝可梦，拥有独特的属性组合！',
            pubDate: '2024年10月25日',
            source: 'Serebii.net'
        },
        {
            title: '宝可梦中心推出限定周边商品',
            link: 'https://www.serebii.net',
            description: '包含最新宝可梦毛绒玩具、卡牌套装和限定周边，限时发售！',
            pubDate: '2024年10月15日',
            source: 'Serebii.net'
        }
    ];
}

// 导出函数
window.getPokemonNews = getPokemonNews;
window.fetchFreshNews = fetchFreshNews;