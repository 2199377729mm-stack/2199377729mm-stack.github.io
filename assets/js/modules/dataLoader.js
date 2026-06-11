let pokemonData = [];

function parseCSV(text) {
    const lines = text.split('\n');
    if (lines.length < 2) return [];
    
    const headers = parseCSVLine(lines[0]);
    const data = [];
    
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        const values = parseCSVLine(line);
        const obj = {};
        
        headers.forEach((header, index) => {
            const key = camelCase(header);
            obj[key] = values[index] || '';
        });
        
        data.push(obj);
    }
    
    return data;
}

function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
            if (inQuotes && line[i + 1] === '"') {
                current += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    
    result.push(current.trim());
    return result;
}

function camelCase(str) {
    return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
}

function parseTypeField(typeStr) {
    if (!typeStr) return { type1: '', type2: '' };
    const types = typeStr.split(',').map(t => t.trim());
    return {
        type1: types[0] || '',
        type2: types[1] || ''
    };
}

function parsePokemonName(pokemonStr) {
    const match = pokemonStr.match(/^(\d+)[.\s]*(.+)$/);
    if (match) {
        return {
            id: match[1],
            name: match[2].trim()
        };
    }
    return {
        id: pokemonStr,
        name: pokemonStr
    };
}

async function loadPokemonData() {
    try {
        console.log('开始加载Pokemon数据...');
        const response = await fetch('/assets/js/data/pokedex.csv', {
            cache: 'no-cache',
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate'
            }
        });
        
        console.log('HTTP状态码:', response.status);
        console.log('Content-Length:', response.headers.get('Content-Length'));
        
        if (!response.ok) {
            throw new Error(`HTTP错误: ${response.status}`);
        }
        
        const text = await response.text();
        console.log('读取到的内容长度:', text.length);
        
        if (text.length === 0) {
            throw new Error('文件内容为空');
        }
        
        pokemonData = parseNewCSV(text);
        console.log('Loaded', pokemonData.length, 'Pokemon');
        return pokemonData;
    } catch (error) {
        console.error('Error loading Pokemon data:', error.message);
        console.error('使用样本数据代替');
        pokemonData = generateSampleData();
        return pokemonData;
    }
}

function parseNewCSV(text) {
    const lines = text.split('\n');
    if (lines.length < 2) return [];
    
    const headers = parseCSVLine(lines[0]);
    console.log('CSV Headers:', headers);
    console.log('CSV Headers after camelCase:', headers.map(h => camelCase(h)));
    const data = [];
    
    let rowId = 1;
    
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        const values = parseCSVLine(line);
        const obj = {};
        
        headers.forEach((header, index) => {
            const key = camelCase(header);
            let value = values[index] || '';
            obj[key] = value;
        });
        
        const typeInfo = parseTypeField(obj['type']);
        obj.type1 = typeInfo.type1;
        obj.type2 = typeInfo.type2;
        
        const pokemonName = obj['pokemon'] || '';
        obj.id = pokemonName;
        obj.pokedexNumber = pokemonName;
        obj.pokemon = pokemonName;
        obj.rowId = rowId;
        
        // 基础属性
        obj.hpBase = obj['hpBase'] || obj['hp_base'] || '0';
        obj.attackBase = obj['attackBase'] || obj['attack_base'] || '0';
        obj.defenseBase = obj['defenseBase'] || obj['defense_base'] || '0';
        obj.spAttackBase = obj['spAttackBase'] || obj['spAttack_base'] || obj['spAttack'] || '0';
        obj.spDefenseBase = obj['spDefenseBase'] || obj['spDefense_base'] || obj['spDefense'] || '0';
        obj.speedBase = obj['speedBase'] || obj['speed_base'] || '0';
        
        // 物理属性和特性
        obj.species = obj['species'] || '';
        obj.heightM = obj['height'] || '';
        obj.weightKg = obj['weight'] || '';
        obj.abilities = obj['abilities'] || '';
        
        // 培育信息 - 使用原始字段名直接访问（CSV中的字段名）
        obj.eggGroups = obj['eggGroups'] || obj['egg_groups'] || obj['egg groups'] || obj['Egg Groups'] || obj['egg groups'] || '';
        obj.eggCycles = obj['eggCycles'] || obj['egg_cycles'] || obj['egg cycles'] || obj['Egg Cycles'] || '';
        obj.gender = obj['gender'] || obj['Gender'] || '';
        
        // 调试：检查培育信息是否正确加载
        if (rowId === 1) {
            console.log('培育信息字段测试:', 'eggGroups=', obj.eggGroups, ', eggCycles=', obj.eggCycles, ', gender=', obj.gender);
        }
        
        data.push(obj);
        rowId++;
    }
    
    return data;
}

function getAllPokemon() {
    return pokemonData;
}

function getPokemonById(id) {
    // 支持通过名称、ID、pokedexNumber查找
    const searchId = String(id).trim();
    return pokemonData.find(p => 
        String(p.id).toLowerCase() === searchId.toLowerCase() || 
        String(p.pokedexNumber).toLowerCase() === searchId.toLowerCase() || 
        String(p.pokemon).toLowerCase() === searchId.toLowerCase()
    );
}

function getPokemonByNumber(num) {
    // 支持通过名称、ID、pokedexNumber、rowId查找
    const searchNum = String(num).trim();
    return pokemonData.find(p => 
        String(p.id).toLowerCase() === searchNum.toLowerCase() || 
        String(p.pokedexNumber).toLowerCase() === searchNum.toLowerCase() || 
        String(p.pokemon).toLowerCase() === searchNum.toLowerCase() || 
        String(p.rowId) === searchNum
    );
}

function generateSampleData() {
    return [
        { id: '1', pokedexNumber: '1', pokemon: 'Bulbasaur', type1: 'Grass', type2: 'Poison', hpBase: '45', attackBase: '49', defenseBase: '49', spAttackBase: '65', spDefenseBase: '65', speedBase: '45', heightM: '0.7', weightKg: '6.9', species: 'Seed Pokemon', eggGroups: 'Monster, Grass', eggCycles: '20 (4,884-5,140 steps)', gender: '50% male, 50% female' },
        { id: '2', pokedexNumber: '2', pokemon: 'Ivysaur', type1: 'Grass', type2: 'Poison', hpBase: '60', attackBase: '62', defenseBase: '63', spAttackBase: '80', spDefenseBase: '80', speedBase: '60', heightM: '1.0', weightKg: '13.0', species: 'Seed Pokemon', eggGroups: 'Monster, Grass', eggCycles: '20 (4,884-5,140 steps)', gender: '50% male, 50% female' },
        { id: '3', pokedexNumber: '3', pokemon: 'Venusaur', type1: 'Grass', type2: 'Poison', hpBase: '80', attackBase: '82', defenseBase: '83', spAttackBase: '100', spDefenseBase: '100', speedBase: '80', heightM: '2.0', weightKg: '100.0', species: 'Seed Pokemon', eggGroups: 'Monster, Grass', eggCycles: '20 (4,884-5,140 steps)', gender: '50% male, 50% female' },
        { id: '4', pokedexNumber: '4', pokemon: 'Charmander', type1: 'Fire', type2: '', hpBase: '39', attackBase: '52', defenseBase: '43', spAttackBase: '60', spDefenseBase: '50', speedBase: '65', heightM: '0.6', weightKg: '8.5', species: 'Lizard Pokemon', eggGroups: 'Monster, Dragon', eggCycles: '20 (4,884-5,140 steps)', gender: '87.5% male, 12.5% female' },
        { id: '5', pokedexNumber: '5', pokemon: 'Charmeleon', type1: 'Fire', type2: '', hpBase: '58', attackBase: '64', defenseBase: '58', spAttackBase: '80', spDefenseBase: '65', speedBase: '80', heightM: '1.1', weightKg: '19.0', species: 'Flame Pokemon', eggGroups: 'Monster, Dragon', eggCycles: '20 (4,884-5,140 steps)', gender: '87.5% male, 12.5% female' },
        { id: '6', pokedexNumber: '6', pokemon: 'Charizard', type1: 'Fire', type2: 'Flying', hpBase: '78', attackBase: '84', defenseBase: '78', spAttackBase: '109', spDefenseBase: '85', speedBase: '100', heightM: '1.7', weightKg: '90.5', species: 'Flame Pokemon', eggGroups: 'Monster, Dragon', eggCycles: '20 (4,884-5,140 steps)', gender: '87.5% male, 12.5% female' },
        { id: '7', pokedexNumber: '7', pokemon: 'Squirtle', type1: 'Water', type2: '', hpBase: '44', attackBase: '48', defenseBase: '65', spAttackBase: '50', spDefenseBase: '64', speedBase: '43', heightM: '0.5', weightKg: '9.0', species: 'Tiny Turtle Pokemon', eggGroups: 'Monster, Water 1', eggCycles: '20 (4,884-5,140 steps)', gender: '87.5% male, 12.5% female' },
        { id: '8', pokedexNumber: '8', pokemon: 'Wartortle', type1: 'Water', type2: '', hpBase: '59', attackBase: '63', defenseBase: '80', spAttackBase: '65', spDefenseBase: '80', speedBase: '58', heightM: '1.0', weightKg: '22.5', species: 'Turtle Pokemon', eggGroups: 'Monster, Water 1', eggCycles: '20 (4,884-5,140 steps)', gender: '87.5% male, 12.5% female' },
        { id: '9', pokedexNumber: '9', pokemon: 'Blastoise', type1: 'Water', type2: '', hpBase: '79', attackBase: '83', defenseBase: '100', spAttackBase: '85', spDefenseBase: '105', speedBase: '78', heightM: '1.6', weightKg: '85.5', species: 'Shellfish Pokemon', eggGroups: 'Monster, Water 1', eggCycles: '20 (4,884-5,140 steps)', gender: '87.5% male, 12.5% female' },
        { id: '25', pokedexNumber: '25', pokemon: 'Pikachu', type1: 'Electric', type2: '', hpBase: '35', attackBase: '55', defenseBase: '40', spAttackBase: '50', spDefenseBase: '50', speedBase: '90', heightM: '0.4', weightKg: '6.0', species: 'Mouse Pokemon', eggGroups: 'Field', eggCycles: '25 (6,100-6,360 steps)', gender: '50% male, 50% female' },
        { id: '144', pokedexNumber: '144', pokemon: 'Articuno', type1: 'Ice', type2: 'Flying', hpBase: '90', attackBase: '85', defenseBase: '100', spAttackBase: '95', spDefenseBase: '125', speedBase: '85', heightM: '1.7', weightKg: '55.4', species: 'Freeze Pokemon', eggGroups: 'Flying', eggCycles: '30 (7,320-7,580 steps)', gender: 'Genderless' },
        { id: '145', pokedexNumber: '145', pokemon: 'Zapdos', type1: 'Electric', type2: 'Flying', hpBase: '90', attackBase: '90', defenseBase: '85', spAttackBase: '125', spDefenseBase: '90', speedBase: '100', heightM: '1.6', weightKg: '52.6', species: 'Electric Pokemon', eggGroups: 'Flying', eggCycles: '30 (7,320-7,580 steps)', gender: 'Genderless' },
        { id: '146', pokedexNumber: '146', pokemon: 'Moltres', type1: 'Fire', type2: 'Flying', hpBase: '90', attackBase: '100', defenseBase: '90', spAttackBase: '125', spDefenseBase: '85', speedBase: '90', heightM: '2.0', weightKg: '60.0', species: 'Flame Pokemon', eggGroups: 'Flying', eggCycles: '30 (7,320-7,580 steps)', gender: 'Genderless' },
        { id: '150', pokedexNumber: '150', pokemon: 'Mewtwo', type1: 'Psychic', type2: '', hpBase: '106', attackBase: '110', defenseBase: '90', spAttackBase: '154', spDefenseBase: '90', speedBase: '130', heightM: '2.0', weightKg: '122.0', species: 'Genetic Pokemon', eggGroups: 'Undiscovered', eggCycles: 'Undiscovered', gender: 'Genderless' },
        { id: '151', pokedexNumber: '151', pokemon: 'Mew', type1: 'Psychic', type2: '', hpBase: '100', attackBase: '100', defenseBase: '100', spAttackBase: '100', spDefenseBase: '100', speedBase: '100', heightM: '0.4', weightKg: '4.0', species: 'New Species Pokemon', eggGroups: 'Undiscovered', eggCycles: 'Undiscovered', gender: 'Genderless' },
        { id: '133', pokedexNumber: '133', pokemon: 'Eevee', type1: 'Normal', type2: '', hpBase: '55', attackBase: '55', defenseBase: '50', spAttackBase: '45', spDefenseBase: '65', speedBase: '55', heightM: '0.3', weightKg: '6.5', species: 'Evolution Pokemon', eggGroups: 'Field', eggCycles: '20 (4,884-5,140 steps)', gender: '87.5% male, 12.5% female' }
    ];
}
