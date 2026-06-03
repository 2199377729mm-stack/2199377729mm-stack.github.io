let allPokemon = [];
let generationData = [];
let currentGen = null;

async function initGeneration() {
    console.log('[Generation Module] 开始初始化世代浏览模块...');
    
    // 初始化搜索功能
    initSearchModule();
    
    // 加载世代定义
    try {
        const genResponse = await fetch('/assets/js/data/generations.json', { 
            cache: 'no-cache',
            headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate' }
        });
        generationData = await genResponse.json();
        console.log('[Generation Module] 加载世代数据:', generationData.generations.length, '个世代');
    } catch (error) {
        console.error('[Generation Module] 加载世代数据失败:', error);
        generationData = getDefaultGenerations();
    }
    
    // 加载宝可梦数据
    allPokemon = await loadPokemonData();
    console.log('[Generation Module] 成功加载', allPokemon.length, '只宝可梦');
    
    renderGenGrid();
}

function initSearchModule() {
    // 创建搜索框
    createSearchBox('search-container', '搜索宝可梦（名称、编号、属性）...');
    
    // 设置搜索回调
    pokemonSearch.setCallback((results, term) => {
        const genGrid = document.getElementById('gen-grid');
        const pokemonList = document.getElementById('pokemon-list');
        const title = document.getElementById('current-gen-title');
        const pokemonGrid = document.getElementById('pokemon-grid');
        
        if (term.trim()) {
            // 显示搜索结果
            genGrid.style.display = 'none';
            pokemonList.style.display = 'block';
            title.textContent = `搜索结果: "${term}" (${results.length}只)`;
            renderPokemonGrid(pokemonGrid, results);
            
            document.getElementById('back-btn').onclick = () => {
                // 清空搜索框并返回世代列表
                document.getElementById('search-input').value = '';
                genGrid.style.display = 'grid';
                pokemonList.style.display = 'none';
            };
        } else {
            // 恢复世代列表
            genGrid.style.display = 'grid';
            pokemonList.style.display = 'none';
        }
    });
}

function getDefaultGenerations() {
    return {
        generations: [
            { gen: 1, name: '第一世代', icon: '🔴', region: '关都', pokemon: ['Bulbasaur', 'Ivysaur', 'Venusaur'] },
            { gen: 2, name: '第二世代', icon: '🟡', region: '城都', pokemon: ['Chikorita', 'Cyndaquil', 'Totodile'] },
            { gen: 3, name: '第三世代', icon: '🟢', region: '丰缘', pokemon: ['Treecko', 'Torchic', 'Mudkip'] },
        ]
    };
}

function renderGenGrid() {
    const grid = document.getElementById('gen-grid');
    grid.innerHTML = '';
    
    generationData.generations.forEach(gen => {
        const card = document.createElement('div');
        card.className = 'card gen-card';
        card.innerHTML = `
            <div class="gen-icon">${gen.icon}</div>
            <h3>${gen.name}</h3>
            <p>${gen.region}地区<br>${gen.pokemon.length}只宝可梦</p>
        `;
        card.onclick = () => showGen(gen);
        grid.appendChild(card);
    });
}

function showGen(gen) {
    currentGen = gen;
    
    document.getElementById('gen-grid').style.display = 'none';
    document.getElementById('pokemon-list').style.display = 'block';
    document.getElementById('current-gen-title').textContent = `${gen.name} - ${gen.region}地区`;
    
    // 根据世代筛选宝可梦
    const filtered = allPokemon.filter(p => {
        const pokemonName = p.pokemon || p.name || '';
        return gen.pokemon.some(genPkmn => pokemonName.toLowerCase() === genPkmn.toLowerCase());
    });
    
    console.log('[Generation Module] 筛选出', filtered.length, '只宝可梦');
    renderPokemonGrid(document.getElementById('pokemon-grid'), filtered);
    
    document.getElementById('back-btn').onclick = () => {
        document.getElementById('gen-grid').style.display = 'grid';
        document.getElementById('pokemon-list').style.display = 'none';
    };
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initGeneration);