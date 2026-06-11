// RSS 解析模块 - 获取宝可梦资讯
const RSS_FEEDS = {
    serebii: 'https://www.serebii.net/news/index.shtml',
    serebiiRss: 'https://www.serebii.net/news.rss'
};

// CORS 代理服务
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';

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
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('zh-CN', options);
    } catch {
        return dateString;
    }
}

/**
 * 获取 Serebii.net 的最新资讯
 * @returns {Promise<Array>} - 资讯列表
 */
async function getPokemonNews() {
    // 默认返回模拟数据
    let newsItems = getMockNews();
    
    try {
        console.log('Fetching Pokemon news from Serebii.net...');
        
        // 使用多个 CORS 代理备选
        const proxies = [
            'https://api.allorigins.win/raw?url=',
            'https://corsproxy.io/?url=',
            'https://cors-anywhere.herokuapp.com/'
        ];
        
        let success = false;
        
        for (let i = 0; i < proxies.length && !success; i++) {
            try {
                console.log(`Trying proxy ${i + 1}: ${proxies[i]}`);
                const response = await fetch(proxies[i] + encodeURIComponent(RSS_FEEDS.serebiiRss));
                
                if (response.ok) {
                    const xmlString = await response.text();
                    console.log('Received XML data:', xmlString.substring(0, 200) + '...');
                    
                    const parsedItems = parseRSS(xmlString);
                    
                    // 如果解析到有效数据，使用真实数据
                    if (parsedItems.length > 0) {
                        newsItems = parsedItems;
                        success = true;
                        console.log(`Successfully fetched ${newsItems.length} news items from Serebii.net`);
                    } else {
                        console.log('Parsed empty result, using mock data');
                    }
                }
            } catch (proxyError) {
                console.warn(`Proxy ${i + 1} failed:`, proxyError.message);
            }
        }
        
    } catch (error) {
        console.error('Error fetching news:', error);
    }
    
    // 确保至少返回模拟数据
    if (!newsItems || newsItems.length === 0) {
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