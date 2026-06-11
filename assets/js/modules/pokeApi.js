// PokeAPI 模块 - 获取宝可梦图鉴信息
const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

// 缓存已获取的图鉴信息
const pokedexCache = new Map();

/**
 * 获取宝可梦的图鉴描述
 * @param {number|string} pokemonId - 宝可梦ID或名称
 * @returns {Promise<string>} - 图鉴描述文本
 */
async function getPokedexDescription(pokemonId) {
    // 检查缓存
    if (pokedexCache.has(pokemonId)) {
        console.log(`Using cached description for Pokemon ${pokemonId}`);
        return pokedexCache.get(pokemonId);
    }

    try {
        console.log(`Fetching pokedex description for Pokemon ${pokemonId}...`);
        const response = await fetch(`${POKEAPI_BASE_URL}/pokemon-species/${pokemonId}`);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch pokedex data: ${response.status}`);
        }

        const data = await response.json();
        console.log(`Received data for Pokemon ${pokemonId}:`, data.name);
        
        // 查找中文或英文的图鉴描述
        let description = '';
        
        // 优先查找中文描述
        const chineseEntry = data.flavor_text_entries.find(entry => 
            entry.language.name === 'zh-Hans' || entry.language.name === 'zh'
        );
        
        // 如果没有中文，查找英文描述
        const englishEntry = data.flavor_text_entries.find(entry => 
            entry.language.name === 'en'
        );

        if (chineseEntry) {
            description = chineseEntry.flavor_text;
            console.log(`Found Chinese description for Pokemon ${pokemonId}`);
        } else if (englishEntry) {
            description = englishEntry.flavor_text;
            console.log(`Found English description for Pokemon ${pokemonId}`);
        }

        // 清理文本格式（移除换行符等）
        description = description.replace(/\n/g, ' ').replace(/\f/g, ' ').trim();
        
        console.log(`Description for Pokemon ${pokemonId}: ${description.substring(0, 50)}...`);
        
        // 缓存结果
        pokedexCache.set(pokemonId, description);
        
        return description;
    } catch (error) {
        console.error('Error fetching pokedex description:', error);
        return '';
    }
}

/**
 * 获取宝可梦的基本信息
 * @param {number|string} pokemonId - 宝可梦ID或名称
 * @returns {Promise<Object|null>} - 宝可梦信息对象
 */
async function getPokemonInfo(pokemonId) {
    try {
        const response = await fetch(`${POKEAPI_BASE_URL}/pokemon/${pokemonId}`);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch pokemon data: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching pokemon info:', error);
        return null;
    }
}

/**
 * 获取宝可梦的进化链
 * @param {number} speciesId - 宝可梦物种ID
 * @returns {Promise<Object|null>} - 进化链数据
 */
async function getEvolutionChain(speciesId) {
    try {
        // 先获取物种信息，找到进化链URL
        const speciesResponse = await fetch(`${POKEAPI_BASE_URL}/pokemon-species/${speciesId}`);
        if (!speciesResponse.ok) {
            throw new Error(`Failed to fetch species data: ${speciesResponse.status}`);
        }
        
        const speciesData = await speciesResponse.json();
        const evolutionUrl = speciesData.evolution_chain.url;
        
        const evolutionResponse = await fetch(evolutionUrl);
        if (!evolutionResponse.ok) {
            throw new Error(`Failed to fetch evolution chain: ${evolutionResponse.status}`);
        }
        
        return await evolutionResponse.json();
    } catch (error) {
        console.error('Error fetching evolution chain:', error);
        return null;
    }
}

/**
 * 批量获取多个宝可梦的图鉴描述
 * @param {Array<number|string>} pokemonIds - 宝可梦ID或名称数组
 * @returns {Promise<Map>} - 宝可梦ID到图鉴描述的映射
 */
async function getMultiplePokedexDescriptions(pokemonIds) {
    const results = new Map();
    const promises = pokemonIds.map(async (id) => {
        const description = await getPokedexDescription(id);
        results.set(id, description);
    });
    
    await Promise.all(promises);
    return results;
}

// 导出函数
window.getPokedexDescription = getPokedexDescription;
window.getPokemonInfo = getPokemonInfo;
window.getEvolutionChain = getEvolutionChain;
window.getMultiplePokedexDescriptions = getMultiplePokedexDescriptions;