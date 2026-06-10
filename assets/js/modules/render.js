// 渲染模块 - 使用JSON文件加载中文翻译

let pokemonNames = {};
const typeNames = {
    "Normal": "一般", "Fire": "火", "Water": "水", "Grass": "草",
    "Electric": "电", "Ice": "冰", "Bug": "虫", "Flying": "飞行",
    "Ground": "地面", "Rock": "岩石", "Fighting": "格斗", "Psychic": "超能力",
    "Ghost": "幽灵", "Poison": "毒", "Dark": "恶", "Steel": "钢",
    "Dragon": "龙", "Fairy": "妖精"
};

// 从JSON文件加载中文名称
async function loadChineseNames() {
    try {
        const response = await fetch('/assets/js/data/pokemon_chinese_names.json');
        if (response.ok) {
            pokemonNames = await response.json();
            console.log('中文名称数据加载成功，共 ' + Object.keys(pokemonNames).length + ' 条');
        } else {
            console.warn('加载中文名称失败，使用默认值');
        }
    } catch (error) {
        console.warn('加载中文名称时发生错误:', error);
    }
}

// 获取宝可梦中文名称
function getChineseName(pokemon) {
    const name = pokemon.pokemon || pokemon.name || '';
    return pokemonNames[name] || null;
}

// 获取属性中文名称
function getTypeChineseName(englishType) {
    return typeNames[englishType] || englishType;
}

// 预加载中文名称数据
loadChineseNames();

function renderPokemonCard(pokemon, showRecommendation = false, recommendationReason = '') {
    const card = document.createElement('div');
    card.className = 'card pokemon-card';
    
    const type1 = (pokemon.type1 || '').toLowerCase();
    const type2 = (pokemon.type2 || '').toLowerCase();
    
    // 获取中文属性名
    const type1Chinese = getTypeChineseName(pokemon.type1);
    const type2Chinese = getTypeChineseName(pokemon.type2);
    
    let typesHTML = `<span class="type-badge type-${type1}">${type1Chinese || '未知'}</span>`;
    if (type2) {
        typesHTML += `<span class="type-badge type-${type2}">${type2Chinese}</span>`;
    }
    
    let recommendationHTML = '';
    if (showRecommendation && recommendationReason) {
        recommendationHTML = `<div class="recommendation-tag">${recommendationReason}</div>`;
    }
    
    // 获取中文名称
    const englishName = pokemon.pokemon || pokemon.name;
    const chineseName = getChineseName(pokemon);
    
    // 检查是否已收藏
    const pokemonId = pokemon.pokedexNumber || pokemon.id;
    const isFavorite = typeof isCollected === 'function' && isCollected(pokemonId);
    
    card.innerHTML = `
        <button class="favorite-btn" onclick="event.stopPropagation(); toggleFavoriteCard('${pokemonId}', this)">
            ${isFavorite ? '❤️' : '♡'}
        </button>
        <img alt="${englishName}" class="pokemon-img">
        <div class="name">${englishName}</div>
        ${chineseName ? `<div class="chinese-name">${chineseName}</div>` : ''}
        <div class="types">${typesHTML}</div>
        ${recommendationHTML}
    `;
    
    card.onclick = () => {
        window.location.href = `/pokedex/detail.html?id=${encodeURIComponent(pokemon.id)}`;
    };
    
    setTimeout(() => {
        const img = card.querySelector('.pokemon-img');
        if (img) setPokemonImage(img, pokemon);
    }, 0);
    
    return card;
}

function toggleFavoriteCard(id, btn) {
    if (typeof toggleCollection === 'function') {
        toggleCollection(id);
        btn.textContent = isCollected(id) ? '❤️' : '♡';
    }
}

function renderPokemonGrid(container, pokemonList, showRecommendations = false, recommendations = []) {
    container.innerHTML = '';
    
    pokemonList.forEach((pokemon, index) => {
        const reason = showRecommendations && recommendations[index] 
            ? recommendations[index].reason 
            : '';
        const card = renderPokemonCard(pokemon, showRecommendations, reason);
        container.appendChild(card);
    });
}

function filterPokemon(pokemonList, searchTerm = '', generation = 'all') {
    return pokemonList.filter(pokemon => {
        const name = (pokemon.pokemon || pokemon.name || '').toLowerCase();
        
        const matchesSearch = searchTerm === '' || 
            name.includes(searchTerm.toLowerCase());
        
        return matchesSearch;
    });
}