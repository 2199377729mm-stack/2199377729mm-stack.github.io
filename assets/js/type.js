let allPokemon = [];
let typeData = [];
let typeMapping = {};

async function initType() {
    console.log('[Type Module] 开始初始化属性浏览模块...');
    
    // 初始化搜索功能
    initSearchModule();
    
    // 加载属性名称映射
    try {
        console.log('[Type Module] 加载属性名称映射...');
        const mappingResponse = await fetch('/assets/js/data/type_mapping.json', { 
            cache: 'no-cache',
            headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate' }
        });
        
        if (!mappingResponse.ok) {
            throw new Error(`HTTP错误: ${mappingResponse.status}`);
        }
        
        typeMapping = await mappingResponse.json();
        console.log('[Type Module] 成功加载属性名称映射');
    } catch (error) {
        console.error('[Type Module] 加载属性名称映射失败:', error.message);
        typeMapping = getDefaultTypeMapping();
    }
    
    // 加载属性定义
    try {
        console.log('[Type Module] 加载属性数据...');
        const typeResponse = await fetch('/assets/js/data/types.json', { 
            cache: 'no-cache',
            headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate' }
        });
        
        if (!typeResponse.ok) {
            throw new Error(`HTTP错误: ${typeResponse.status}`);
        }
        
        typeData = await typeResponse.json();
        console.log('[Type Module] 成功加载', typeData.types.length, '种属性');
    } catch (error) {
        console.error('[Type Module] 加载属性数据失败:', error.message);
        typeData = getDefaultTypes();
        console.log('[Type Module] 使用默认属性数据');
    }
    
    // 加载宝可梦数据
    console.log('[Type Module] 加载宝可梦数据...');
    allPokemon = await loadPokemonData();
    console.log('[Type Module] 成功加载', allPokemon.length, '只宝可梦');
    
    // 渲染属性网格
    renderTypeGrid();
}

function initSearchModule() {
    // 创建搜索框
    createSearchBox('search-container', '搜索宝可梦（名称、编号、属性）...');
    
    // 设置搜索回调
    pokemonSearch.setCallback((results, term) => {
        const typeGrid = document.getElementById('type-grid');
        const pokemonList = document.getElementById('pokemon-list');
        const title = document.getElementById('current-type-title');
        const pokemonGrid = document.getElementById('pokemon-grid');
        
        if (term.trim()) {
            // 显示搜索结果
            typeGrid.style.display = 'none';
            pokemonList.style.display = 'block';
            title.textContent = `搜索结果: "${term}" (${results.length}只)`;
            renderPokemonGrid(pokemonGrid, results);
            
            document.getElementById('back-btn').onclick = () => {
                // 清空搜索框并返回属性列表
                document.getElementById('search-input').value = '';
                typeGrid.style.display = 'grid';
                pokemonList.style.display = 'none';
            };
        } else {
            // 恢复属性列表
            typeGrid.style.display = 'grid';
            pokemonList.style.display = 'none';
        }
    });
}

function getDefaultTypeMapping() {
    return {
        "火": ["Fire"],
        "水": ["Water"],
        "草": ["Grass"],
        "电": ["Electric"],
        "超能力": ["Psychic"],
        "普通": ["Normal"],
        "格斗": ["Fighting"],
        "飞行": ["Flying"],
        "毒": ["Poison"],
        "地面": ["Ground"],
        "岩石": ["Rock"],
        "虫": ["Bug"],
        "幽灵": ["Ghost"],
        "钢": ["Steel"],
        "冰": ["Ice"],
        "龙": ["Dragon"],
        "恶": ["Dark"],
        "妖精": ["Fairy"]
    };
}

function getDefaultTypes() {
    return {
        types: [
            { "name": "火", "icon": "🔥", "color": "#FF6B35" },
            { "name": "水", "icon": "💧", "color": "#4F9DFF" },
            { "name": "草", "icon": "🌿", "color": "#4CAF50" },
            { "name": "电", "icon": "⚡", "color": "#FFD700" },
            { "name": "超能力", "icon": "🔮", "color": "#9C27B0" },
            { "name": "普通", "icon": "⬜", "color": "#A8A878" },
            { "name": "格斗", "icon": "🥊", "color": "#C03028" },
            { "name": "飞行", "icon": "🕊️", "color": "#A890F0" },
            { "name": "毒", "icon": "☠️", "color": "#A040A0" },
            { "name": "地面", "icon": "🌍", "color": "#E0C068" },
            { "name": "岩石", "icon": "🪨", "color": "#B8A038" },
            { "name": "虫", "icon": "🐛", "color": "#A8B820" },
            { "name": "幽灵", "icon": "👻", "color": "#705898" },
            { "name": "钢", "icon": "🔩", "color": "#B8B8D0" },
            { "name": "冰", "icon": "❄️", "color": "#98D8D8" },
            { "name": "龙", "icon": "🐉", "color": "#7038F8" },
            { "name": "恶", "icon": "🌑", "color": "#705848" },
            { "name": "妖精", "icon": "✨", "color": "#EE99AC" }
        ]
    };
}

// 检查宝可梦是否属于指定属性
function hasType(pokemon, chineseTypeName) {
    const englishTypes = typeMapping[chineseTypeName] || [];
    const type1 = (pokemon.type1 || '').toLowerCase().trim();
    const type2 = (pokemon.type2 || '').toLowerCase().trim();
    
    return englishTypes.some(engType => 
        engType.toLowerCase() === type1 || engType.toLowerCase() === type2
    );
}

function renderTypeGrid() {
    const grid = document.getElementById('type-grid');
    if (!grid) {
        console.error('[Type Module] 找不到 type-grid 容器');
        return;
    }
    
    grid.innerHTML = '';
    
    typeData.types.forEach(type => {
        // 计算该属性有多少只宝可梦
        const count = allPokemon.filter(p => hasType(p, type.name)).length;
        
        const card = document.createElement('div');
        card.className = 'card type-card';
        card.innerHTML = `
            <div class="type-icon" style="background-color: ${type.color}20; color: ${type.color}; border-color: ${type.color}40;">${type.icon}</div>
            <h3>${type.name}</h3>
            <p>${count}只宝可梦</p>
        `;
        card.onclick = () => showType(type);
        grid.appendChild(card);
    });
    
    console.log('[Type Module] 属性网格渲染完成');
}

function showType(type) {
    console.log('[Type Module] 显示', type.name, '属性宝可梦');
    
    const typeGrid = document.getElementById('type-grid');
    const pokemonList = document.getElementById('pokemon-list');
    const title = document.getElementById('current-type-title');
    const pokemonGrid = document.getElementById('pokemon-grid');
    
    if (!typeGrid || !pokemonList || !title || !pokemonGrid) {
        console.error('[Type Module] 找不到必要的DOM元素');
        return;
    }
    
    typeGrid.style.display = 'none';
    pokemonList.style.display = 'block';
    title.textContent = `${type.icon} ${type.name}属性宝可梦`;
    
    // 根据属性筛选宝可梦
    const filtered = allPokemon.filter(p => hasType(p, type.name));
    
    console.log('[Type Module] 筛选出', filtered.length, '只', type.name, '属性宝可梦');
    
    if (filtered.length === 0) {
        pokemonGrid.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #666;">
                <p>暂未找到${type.name}属性的宝可梦</p>
            </div>
        `;
    } else {
        renderPokemonGrid(pokemonGrid, filtered);
    }
    
    document.getElementById('back-btn').onclick = () => {
        console.log('[Type Module] 返回属性列表');
        typeGrid.style.display = 'grid';
        pokemonList.style.display = 'none';
    };
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initType);