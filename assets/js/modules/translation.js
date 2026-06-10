// 翻译模块 - 提供宝可梦名称和属性的中文翻译

console.log('Translation module loaded');

const Translation = (function() {
    // 宝可梦中文名称映射
    const pokemonNames = {
        "Bulbasaur": "妙蛙种子",
        "Ivysaur": "妙蛙草",
        "Venusaur": "妙蛙花",
        "Charmander": "小火龙",
        "Charmeleon": "火恐龙",
        "Charizard": "喷火龙",
        "Squirtle": "杰尼龟",
        "Wartortle": "卡咪龟",
        "Blastoise": "水箭龟",
        "Caterpie": "绿毛虫",
        "Metapod": "铁甲蛹",
        "Butterfree": "巴大蝶",
        "Weedle": "独角虫",
        "Kakuna": "铁壳蛹",
        "Beedrill": "大针蜂",
        "Pidgey": "波波",
        "Pidgeotto": "比比鸟",
        "Pidgeot": "大比鸟",
        "Rattata": "小拉达",
        "Raticate": "拉达",
        "Spearow": "烈雀",
        "Fearow": "大嘴雀",
        "Ekans": "阿柏蛇",
        "Arbok": "阿柏怪",
        "Pikachu": "皮卡丘",
        "Raichu": "雷丘",
        "Sandshrew": "穿山鼠",
        "Sandslash": "穿山王",
        "Nidoran♀": "尼多兰",
        "Nidorina": "尼多娜",
        "Nidoqueen": "尼多后",
        "Nidoran♂": "尼多朗",
        "Nidorino": "尼多力诺",
        "Nidoking": "尼多王",
        "Clefairy": "皮皮",
        "Clefable": "皮可西",
        "Vulpix": "六尾",
        "Ninetales": "九尾",
        "Jigglypuff": "胖丁",
        "Wigglytuff": "胖可丁",
        "Zubat": "超音蝠",
        "Golbat": "大嘴蝠",
        "Oddish": "走路草",
        "Gloom": "臭臭花",
        "Vileplume": "霸王花",
        "Paras": "派拉斯",
        "Parasect": "派拉斯特",
        "Venonat": "毛球",
        "Venomoth": "摩翅蛾",
        "Diglett": "地鼠",
        "Dugtrio": "三地鼠",
        "Meowth": "喵喵",
        "Persian": "猫老大",
        "Psyduck": "可达鸭",
        "Golduck": "哥达鸭",
        "Mankey": "猴怪",
        "Primeape": "火爆猴",
        "Growlithe": "卡蒂狗",
        "Arcanine": "风速狗",
        "Poliwag": "蚊香蝌蚪",
        "Poliwhirl": "蚊香君",
        "Poliwrath": "蚊香泳士",
        "Abra": "凯西",
        "Kadabra": "勇基拉",
        "Alakazam": "胡地",
        "Machop": "腕力",
        "Machoke": "豪力",
        "Machamp": "怪力",
        "Bellsprout": "喇叭芽",
        "Weepinbell": "口呆花",
        "Victreebel": "大食花",
        "Tentacool": "玛瑙水母",
        "Tentacruel": "毒刺水母",
        "Geodude": "小拳石",
        "Graveler": "隆隆石",
        "Golem": "隆隆岩",
        "Ponyta": "小火马",
        "Rapidash": "烈焰马",
        "Slowpoke": "呆呆兽",
        "Slowbro": "呆壳兽",
        "Magnemite": "小磁怪",
        "Magneton": "三合一磁怪",
        "Farfetch'd": "大葱鸭",
        "Doduo": "嘟嘟",
        "Dodrio": "嘟嘟利",
        "Seel": "小海狮",
        "Dewgong": "白海狮",
        "Grimer": "臭泥",
        "Muk": "臭臭泥",
        "Shellder": "大舌贝",
        "Cloyster": "刺甲贝",
        "Gastly": "鬼斯",
        "Haunter": "鬼斯通",
        "Gengar": "耿鬼",
        "Onix": "大岩蛇",
        "Drowzee": "催眠貘",
        "Hypno": "引梦貘人",
        "Krabby": "大钳蟹",
        "Kingler": "巨钳蟹",
        "Voltorb": "霹雳电球",
        "Electrode": "顽皮雷弹",
        "Exeggcute": "蛋蛋",
        "Exeggutor": "椰蛋树",
        "Cubone": "卡拉卡拉",
        "Marowak": "嘎啦嘎啦",
        "Hitmonlee": "飞腿郎",
        "Hitmonchan": "快拳郎",
        "Lickitung": "大舌头",
        "Koffing": "瓦斯弹",
        "Weezing": "双弹瓦斯",
        "Rhyhorn": "铁甲犀牛",
        "Rhydon": "铁甲暴龙",
        "Chansey": "吉利蛋",
        "Tangela": "蔓藤怪",
        "Kangaskhan": "袋兽",
        "Horsea": "墨海马",
        "Seadra": "海刺龙",
        "Goldeen": "角金鱼",
        "Seaking": "金鱼王",
        "Staryu": "海星星",
        "Starmie": "宝石海星",
        "Mr. Mime": "魔墙人偶",
        "Scyther": "飞天螳螂",
        "Jynx": "迷唇姐",
        "Electabuzz": "电击兽",
        "Magmar": "鸭嘴火兽",
        "Pinsir": "凯罗斯",
        "Tauros": "肯泰罗",
        "Magikarp": "鲤鱼王",
        "Gyarados": "暴鲤龙",
        "Lapras": "乘龙",
        "Ditto": "百变怪",
        "Eevee": "伊布",
        "Vaporeon": "水伊布",
        "Jolteon": "雷伊布",
        "Flareon": "火伊布",
        "Porygon": "多边兽",
        "Omanyte": "菊石兽",
        "Omastar": "多刺菊石兽",
        "Kabuto": "化石盔",
        "Kabutops": "镰刀盔",
        "Aerodactyl": "化石翼龙",
        "Snorlax": "卡比兽",
        "Articuno": "急冻鸟",
        "Zapdos": "闪电鸟",
        "Moltres": "火焰鸟",
        "Dratini": "迷你龙",
        "Dragonair": "哈克龙",
        "Dragonite": "快龙",
        "Mewtwo": "超梦",
        "Mew": "梦幻"
    };

    // 属性中文名称映射
    const typeNames = {
        "Normal": "一般",
        "Fire": "火",
        "Water": "水",
        "Grass": "草",
        "Electric": "电",
        "Ice": "冰",
        "Bug": "虫",
        "Flying": "飞行",
        "Ground": "地面",
        "Rock": "岩石",
        "Fighting": "格斗",
        "Psychic": "超能力",
        "Ghost": "幽灵",
        "Poison": "毒",
        "Dark": "恶",
        "Steel": "钢",
        "Dragon": "龙",
        "Fairy": "妖精"
    };

    return {
        // 获取宝可梦中文名称
        getPokemonName: function(englishName) {
            if (!englishName) return null;
            return pokemonNames[englishName] || null;
        },

        // 获取属性中文名称
        getTypeName: function(englishType) {
            if (!englishType) return englishType || '未知';
            return typeNames[englishType] || englishType;
        },

        // 获取宝可梦对象的中文名称
        getPokemonChineseName: function(pokemon) {
            const name = pokemon.pokemon || pokemon.name || '';
            return this.getPokemonName(name);
        },

        // 获取宝可梦的中文属性（返回数组）
        getPokemonChineseTypes: function(pokemon) {
            const types = [];
            if (pokemon.type1) {
                types.push(this.getTypeName(pokemon.type1));
            }
            if (pokemon.type2) {
                types.push(this.getTypeName(pokemon.type2));
            }
            return types;
        },

        // 检查是否有中文翻译
        hasTranslation: function(englishName) {
            return !!pokemonNames[englishName];
        },

        // 获取翻译统计
        getStats: function() {
            return {
                pokemonCount: Object.keys(pokemonNames).length,
                typeCount: Object.keys(typeNames).length
            };
        }
    };
})();

// 为了兼容旧代码，保留全局函数
function getChineseName(pokemon) {
    return Translation.getPokemonChineseName(pokemon);
}

function getTypeChineseName(englishType) {
    return Translation.getTypeName(englishType);
}