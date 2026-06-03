let nameMapping = {};

async function loadNameMapping() {
    try {
        const response = await fetch('/assets/js/data/pokemon_name_mapping.json', { cache: 'no-cache' });
        nameMapping = await response.json();
        console.log('加载名称映射:', Object.keys(nameMapping).length, '条');
    } catch (error) {
        console.error('加载名称映射失败:', error);
        nameMapping = {};
    }
}

function getImageName(pokemon) {
    const originalName = pokemon.pokemon || pokemon.name || '';
    return nameMapping[originalName] || originalName;
}

function getPokemonImagePath(pokemon, type = 'official') {
    const originalName = pokemon.pokemon || pokemon.name || '';
    const mappedName = getImageName(pokemon);
    
    let basePath = '/assets/images/pokemon/';
    switch(type) {
        case 'official':
            basePath += 'official/';
            break;
        case 'sprite':
            basePath += 'sprites/';
            break;
        case 'thumbnail':
            basePath += 'thumbnails/';
            break;
    }
    
    // 构建多种可能的路径
    const paths = [];
    
    // 原始名称（URL编码）
    paths.push(`${basePath}${encodeURIComponent(mappedName)}.png`);
    
    // _new 版本
    paths.push(`${basePath}${encodeURIComponent(mappedName)}_new.png`);
    
    // 转换为小写并替换空格为下划线
    const slug = mappedName.toLowerCase().replace(/[^a-z0-9]+/g, '_');
    paths.push(`${basePath}${slug}.png`);
    paths.push(`${basePath}${slug}_new.png`);
    paths.push(`${basePath}${slug}_normal.png`);
    
    return { paths: paths, mappedName: mappedName };
}

function setPokemonImage(imgElement, pokemon, type = 'official') {
    const imageData = getPokemonImagePath(pokemon, type);
    let attempts = 0;
    
    const tryNext = () => {
        if (attempts < imageData.paths.length) {
            imgElement.src = imageData.paths[attempts];
            attempts++;
        } else {
            // 所有路径都失败，显示默认占位图
            imgElement.src = 'data:image/svg+xml,' + encodeURIComponent(`
                <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
                    <rect fill="#f0f0f0" width="200" height="200"/>
                    <circle cx="100" cy="100" r="60" fill="#e0e0e0"/>
                    <text x="100" y="110" text-anchor="middle" font-size="40" fill="#999">?</text>
                </svg>
            `);
        }
    };
    
    imgElement.onerror = tryNext;
    tryNext();
}

// 预加载名称映射
loadNameMapping();