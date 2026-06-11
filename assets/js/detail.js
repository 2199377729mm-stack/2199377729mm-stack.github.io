let currentPokemon = null;
let statsChart = null;

// 直接嵌入宝可梦中文名称数据（避免异步加载时序问题）
const pokemonNames = {
    "Bulbasaur": "妙蛙种子", "Ivysaur": "妙蛙草", "Venusaur": "妙蛙花",
    "Charmander": "小火龙", "Charmeleon": "火恐龙", "Charizard": "喷火龙",
    "Squirtle": "杰尼龟", "Wartortle": "卡咪龟", "Blastoise": "水箭龟",
    "Caterpie": "绿毛虫", "Metapod": "铁甲蛹", "Butterfree": "巴大蝶",
    "Weedle": "独角虫", "Kakuna": "铁壳蛹", "Beedrill": "大针蜂",
    "Pidgey": "波波", "Pidgeotto": "比比鸟", "Pidgeot": "大比鸟",
    "Rattata": "小拉达", "Raticate": "拉达", "Spearow": "烈雀",
    "Fearow": "大嘴雀", "Ekans": "阿柏蛇", "Arbok": "阿柏怪",
    "Pikachu": "皮卡丘", "Raichu": "雷丘", "Sandshrew": "穿山鼠",
    "Sandslash": "穿山王", "Nidoran♀": "尼多兰", "Nidorina": "尼多娜",
    "Nidoqueen": "尼多后", "Nidoran♂": "尼多朗", "Nidorino": "尼多力诺",
    "Nidoking": "尼多王", "Clefairy": "皮皮", "Clefable": "皮可西",
    "Vulpix": "六尾", "Ninetales": "九尾", "Jigglypuff": "胖丁",
    "Wigglytuff": "胖可丁", "Zubat": "超音蝠", "Golbat": "大嘴蝠",
    "Oddish": "走路草", "Gloom": "臭臭花", "Vileplume": "霸王花",
    "Paras": "派拉斯", "Parasect": "派拉斯特", "Venonat": "毛球",
    "Venomoth": "摩鲁蛾", "Diglett": "地鼠", "Dugtrio": "三地鼠",
    "Meowth": "喵喵", "Persian": "猫老大", "Psyduck": "可达鸭",
    "Golduck": "哥达鸭", "Mankey": "猴怪", "Primeape": "火爆猴",
    "Growlithe": "卡蒂狗", "Arcanine": "风速狗", "Poliwag": "蚊香蝌蚪",
    "Poliwhirl": "蚊香君", "Poliwrath": "蚊香泳士", "Abra": "凯西",
    "Kadabra": "勇基拉", "Alakazam": "胡地", "Machop": "腕力",
    "Machoke": "豪力", "Machamp": "怪力", "Bellsprout": "喇叭芽",
    "Weepinbell": "口呆花", "Victreebel": "大食花", "Tentacool": "玛瑙水母",
    "Tentacruel": "毒刺水母", "Geodude": "小拳石", "Graveler": "隆隆石",
    "Golem": "隆隆岩", "Ponyta": "小火马", "Rapidash": "烈焰马",
    "Slowpoke": "呆呆兽", "Slowbro": "呆壳兽", "Magnemite": "小磁怪",
    "Magneton": "三合一磁怪", "Farfetch'd": "大葱鸭", "Doduo": "嘟嘟",
    "Dodrio": "嘟嘟利", "Seel": "小海狮", "Dewgong": "白海狮",
    "Grimer": "臭泥", "Muk": "臭臭泥", "Shellder": "大舌贝",
    "Cloyster": "刺甲贝", "Gastly": "鬼斯", "Haunter": "鬼斯通",
    "Gengar": "耿鬼", "Onix": "大岩蛇", "Drowzee": "催眠貘",
    "Hypno": "引梦貘人", "Krabby": "大钳蟹", "Kingler": "巨钳蟹",
    "Voltorb": "霹雳电球", "Electrode": "顽皮雷弹", "Exeggcute": "蛋蛋",
    "Exeggutor": "椰蛋树", "Cubone": "卡拉卡拉", "Marowak": "嘎啦嘎啦",
    "Hitmonlee": "飞腿郎", "Hitmonchan": "快拳郎", "Lickitung": "大舌头",
    "Koffing": "瓦斯弹", "Weezing": "双弹瓦斯", "Rhyhorn": "铁甲犀牛",
    "Rhydon": "铁甲暴龙", "Chansey": "吉利蛋", "Tangela": "蔓藤怪",
    "Kangaskhan": "袋兽", "Horsea": "墨海马", "Seadra": "海刺龙",
    "Goldeen": "角金鱼", "Seaking": "金鱼王", "Staryu": "海星星",
    "Starmie": "宝石海星", "Mr. Mime": "魔墙人偶", "Scyther": "飞天螳螂",
    "Jynx": "迷唇姐", "Electabuzz": "电击兽", "Magmar": "鸭嘴火兽",
    "Pinsir": "凯罗斯", "Tauros": "肯泰罗", "Magikarp": "鲤鱼王",
    "Gyarados": "暴鲤龙", "Lapras": "乘龙", "Ditto": "百变怪",
    "Eevee": "伊布", "Vaporeon": "水伊布", "Jolteon": "雷伊布",
    "Flareon": "火伊布", "Porygon": "多边兽", "Omanyte": "菊石兽",
    "Omastar": "多刺菊石兽", "Kabuto": "化石盔", "Kabutops": "镰刀盔",
    "Aerodactyl": "化石翼龙", "Snorlax": "卡比兽", "Articuno": "急冻鸟",
    "Zapdos": "闪电鸟", "Moltres": "火焰鸟", "Dratini": "迷你龙",
    "Dragonair": "哈克龙", "Dragonite": "快龙", "Mewtwo": "超梦",
    "Mew": "梦幻", "Chikorita": "菊草叶", "Bayleef": "月桂叶",
    "Meganium": "大菊花", "Cyndaquil": "火球鼠", "Quilava": "火岩鼠",
    "Typhlosion": "火爆兽", "Totodile": "小锯鳄", "Croconaw": "蓝鳄",
    "Feraligatr": "大力鳄", "Sentret": "尾立", "Furret": "大尾立",
    "Hoothoot": "咕咕", "Noctowl": "猫头夜鹰", "Ledyba": "芭瓢虫",
    "Ledian": "安瓢虫", "Spinarak": "线球", "Ariados": "阿利多斯",
    "Crobat": "叉字蝠", "Chinchou": "灯笼鱼", "Lanturn": "电灯怪",
    "Pichu": "皮丘", "Cleffa": "皮宝宝", "Igglybuff": "宝宝丁",
    "Togepi": "波克比", "Togetic": "波克基古", "Natu": "天然雀",
    "Xatu": "天然鸟", "Mareep": "咩利羊", "Flaaffy": "茸茸羊",
    "Ampharos": "电龙", "Bellossom": "美丽花", "Marill": "玛丽露",
    "Azumarill": "玛丽露丽", "Sudowoodo": "胡说树", "Politoed": "蚊香蛙皇",
    "Hoppip": "毽子草", "Skiploom": "毽子花", "Jumpluff": "毽子棉",
    "Aipom": "长尾怪手", "Sunkern": "向日种子", "Sunflora": "向日花怪",
    "Yanma": "蜻蜻蜓", "Wooper": "乌波", "Quagsire": "沼王",
    "Espeon": "太阳伊布", "Umbreon": "月亮伊布", "Murkrow": "黑暗鸦",
    "Slowking": "呆呆王", "Misdreavus": "梦妖", "Unown": "未知图腾",
    "Wobbuffet": "果然翁", "Girafarig": "麒麟奇", "Pineco": "榛果球",
    "Forretress": "佛烈托斯", "Dunsparce": "大颚蚁", "Gligar": "天蝎",
    "Steelix": "大钢蛇", "Snubbull": "布鲁", "Granbull": "布鲁皇",
    "Qwilfish": "千针鱼", "Scizor": "巨钳螳螂", "Shuckle": "壶壶",
    "Heracross": "赫拉克罗斯", "Sneasel": "狃拉", "Teddiursa": "熊宝宝",
    "Ursaring": "圈圈熊", "Slugma": "熔岩虫", "Magcargo": "熔岩蜗牛",
    "Swinub": "小山猪", "Piloswine": "长毛猪", "Corsola": "太阳珊瑚",
    "Remoraid": "铁炮鱼", "Octillery": "章鱼桶", "Delibird": "信使鸟",
    "Mantine": "巨翅飞鱼", "Skarmory": "盔甲鸟", "Houndour": "戴鲁比",
    "Houndoom": "黑鲁加", "Kingdra": "刺龙王", "Phanpy": "小小象",
    "Donphan": "顿甲", "Porygon2": "多边兽Ⅱ", "Stantler": "惊角鹿",
    "Smeargle": "图图犬", "Tyrogue": "幼基拉斯", "Hitmontop": "战舞郎",
    "Smoochum": "迷唇娃", "Elekid": "电击怪", "Magby": "小鸭嘴龙",
    "Miltank": "大奶罐", "Blissey": "幸福蛋", "Raikou": "雷公",
    "Entei": "炎帝", "Suicune": "水君", "Lugia": "洛奇亚",
    "Ho-Oh": "凤王", "Celebi": "时拉比", "Treecko": "木守宫",
    "Grovyle": "森林蜥蜴", "Sceptile": "蜥蜴王", "Torchic": "火稚鸡",
    "Combusken": "力壮鸡", "Blaziken": "火焰鸡", "Mudkip": "水跃鱼",
    "Marshtomp": "沼跃鱼", "Swampert": "巨沼怪", "Poochyena": "土狼犬",
    "Mightyena": "大狼犬", "Zigzagoon": "蛇纹熊", "Linoone": "直冲熊",
    "Wurmple": "刺尾虫", "Silcoon": "甲壳茧", "Beautifly": "狩猎凤蝶",
    "Cascoon": "盾甲茧", "Dustox": "毒粉蛾", "Lotad": "莲叶童子",
    "Lombre": "莲帽小童", "Ludicolo": "乐天河童", "Seedot": "橡实果",
    "Nuzleaf": "长鼻叶", "Shiftry": "狡猾天狗", "Taillow": "傲骨燕",
    "Swellow": "大王燕", "Wingull": "长翅鸥", "Pelipper": "大嘴鸥",
    "Ralts": "拉鲁拉丝", "Kirlia": "奇鲁莉安", "Gardevoir": "沙奈朵",
    "Surskit": "溜溜糖球", "Masquerain": "雨翅蛾", "Shroomish": "蘑蘑菇",
    "Breloom": "斗笠菇", "Slakoth": "懒人獭", "Vigoroth": "过动猿",
    "Slaking": "请假王", "Nincada": "土居忍士", "Ninjask": "脱壳忍者",
    "Shedinja": "鬼蝉", "Whismur": "吼吼鲸", "Loudred": "爆音怪",
    "Exploud": "吼爆弹", "Makuhita": "幕下力士", "Hariyama": "超力王",
    "Azurill": "露力丽", "Nosepass": "朝北鼻", "Skitty": "向尾喵",
    "Delcatty": "优雅猫", "Sableye": "勾魂眼", "Mawile": "大嘴娃",
    "Aron": "可可多拉", "Lairon": "可多拉", "Aggron": "波士可多拉",
    "Meditite": "瑜伽王", "Medicham": "恰雷姆", "Electrike": "电击怪",
    "Manectric": "雷电兽", "Plusle": "正电拍拍", "Minun": "负电拍拍",
    "Volbeat": "电萤虫", "Illumise": "甜甜萤", "Roselia": "毒蔷薇",
    "Gulpin": "吞食兽", "Swalot": "吞食王", "Carvanha": "利牙鱼",
    "Sharpedo": "巨牙鲨", "Wailmer": "吼吼鲸", "Wailord": "吼鲸王",
    "Numel": "呆火驼", "Camerupt": "喷火驼", "Torkoal": "煤炭龟",
    "Spoink": "跳跳猪", "Grumpig": "噗噗猪", "Spinda": "晃晃斑",
    "Trapinch": "大颚蚁", "Vibrava": "超音波幼虫", "Flygon": "沙漠蜻蜓",
    "Cacnea": "刺球仙人掌", "Cacturne": "梦歌仙人掌", "Swablu": "青绵鸟",
    "Altaria": "七夕青鸟", "Zangoose": "猫鼬斩", "Seviper": "饭匙蛇",
    "Lunatone": "月石", "Solrock": "太阳岩", "Barboach": "泥鳅",
    "Whiscash": "鲶鱼王", "Corphish": "龙虾小兵", "Crawdaunt": "铁螯龙虾",
    "Baltoy": "天秤偶", "Claydol": "念力土偶", "Lileep": "摇篮百合",
    "Cradily": "太古羽虫", "Anorith": "太古羽虫", "Armaldo": "化石翼龙",
    "Feebas": "笨笨鱼", "Milotic": "美纳斯", "Castform": "漂浮泡泡",
    "Kecleon": "变隐龙", "Shuppet": "怨影娃娃", "Banette": "诅咒娃娃",
    "Duskull": "夜骷颅", "Dusclops": "夜巨人", "Tropius": "热带龙",
    "Chimecho": "风铃铃", "Absol": "阿勃梭鲁", "Wynaut": "果然翁",
    "Snorunt": "雪童子", "Glalie": "冰鬼护", "Spheal": "海豹球",
    "Sealeo": "海魔狮", "Walrein": "帝牙海狮", "Clamperl": "珍珠贝",
    "Huntail": "猎斑鱼", "Gorebyss": "樱花鱼", "Relicanth": "古空棘鱼",
    "Luvdisc": "爱心鱼", "Bagon": "宝贝龙", "Shelgon": "甲壳龙",
    "Salamence": "暴飞龙", "Beldum": "铁哑铃", "Metang": "金属怪",
    "Metagross": "巨金怪", "Regirock": "雷吉洛克", "Regice": "雷吉艾斯",
    "Registeel": "雷吉斯奇鲁", "Latias": "拉帝亚斯", "Latios": "拉帝欧斯",
    "Kyogre": "盖欧卡", "Groudon": "固拉多", "Rayquaza": "烈空坐",
    "Jirachi": "基拉祈", "Deoxys": "代欧奇希斯", "Turtwig": "草苗龟",
    "Grotle": "树林龟", "Torterra": "土台龟", "Chimchar": "小火焰猴",
    "Monferno": "猛火猴", "Infernape": "烈焰猴", "Piplup": "波加曼",
    "Prinplup": "波皇子", "Empoleon": "帝王拿波", "Starly": "姆克儿",
    "Staravia": "姆克鸟", "Staraptor": "姆克鹰", "Bidoof": "大牙狸",
    "Bibarel": "大尾狸", "Kricketot": "圆法师", "Kricketune": "音箱蟀",
    "Shinx": "小猫怪", "Luxio": "勒克猫", "Luxray": "伦琴猫",
    "Budew": "含羞苞", "Roserade": "罗丝雷朵", "Cranidos": "头盖龙",
    "Rampardos": "战槌龙", "Shieldon": "盾甲龙", "Bastiodon": "护城龙",
    "Burmy": "结草儿", "Wormadam": "结草贵妇", "Mothim": "绅士蛾",
    "Combee": "三蜜蜂", "Vespiquen": "蜂女王", "Pachirisu": "帕奇利兹",
    "Buizel": "泳圈鼬", "Floatzel": "浮潜鼬", "Cherubi": "樱花宝",
    "Cherrim": "樱花儿", "Shellos": "海兔兽", "Gastrodon": "海兔兽",
    "Ambipom": "双尾怪手", "Drifloon": "飘飘球", "Drifblim": "随风球",
    "Buneary": "卷卷耳", "Lopunny": "长耳兔", "Mismagius": "梦妖魔",
    "Honchkrow": "乌鸦头头", "Glameow": "魅力喵", "Purugly": "东施喵",
    "Chingling": "铃铛响", "Stunky": "臭鼬噗", "Skuntank": "坦克臭鼬",
    "Bronzor": "铜镜怪", "Bronzong": "青铜钟", "Bonsly": "盆才怪",
    "Sudowoodo": "胡说树", "Mime Jr.": "魔尼尼", "Happiny": "好运蛋",
    "Chatot": "聒噪鸟", "Spiritomb": "花岩怪", "Gible": "圆陆鲨",
    "Gabite": "尖牙陆鲨", "Garchomp": "烈咬陆鲨", "Munchlax": "小卡比兽",
    "Riolu": "利欧路", "Lucario": "路卡利欧", "Hippopotas": "河马兽",
    "Hippowdon": "河马王", "Skorupi": "毒蝎", "Drapion": "龙王蝎",
    "Croagunk": "不良蛙", "Toxicroak": "毒骷蛙", "Carnivine": "捕虫草",
    "Finneon": "荧光鱼", "Lumineon": "霓虹鱼", "Mantyke": "小球飞鱼",
    "Snover": "雪笠怪", "Abomasnow": "暴雪王", "Weavile": "玛狃拉",
    "Magnezone": "自爆磁怪", "Lickilicky": "大舌舔", "Rhyperior": "超铁暴龙",
    "Tangrowth": "巨蔓藤", "Electivire": "电击魔兽", "Magmortar": "鸭嘴炎兽",
    "Togekiss": "波克基斯", "Yanmega": "远古巨蜓", "Leafeon": "叶伊布",
    "Glaceon": "冰伊布", "Gliscor": "天蝎王", "Mamoswine": "象牙猪",
    "Porygon-Z": "多边兽Z", "Gallade": "艾路雷朵", "Probopass": "朝北巨鼻",
    "Dusknoir": "黑夜魔灵", "Froslass": "雪妖女", "Rotom": "洛托姆",
    "Uxie": "由克希", "Mesprit": "艾姆利多", "Azelf": "亚克诺姆",
    "Dialga": "帝牙卢卡", "Palkia": "帕路奇亚", "Heatran": "席多蓝恩",
    "Regigigas": "雷吉奇卡斯", "Giratina": "骑拉帝纳", "Cresselia": "克雷色利亚",
    "Phione": "霏欧纳", "Manaphy": "玛纳霏", "Darkrai": "达克莱伊",
    "Shaymin": "谢米", "Arceus": "阿尔宙斯", "Victini": "比克提尼",
    "Snivy": "藤藤蛇", "Servine": "青藤蛇", "Serperior": "君主蛇",
    "Tepig": "暖暖猪", "Pignite": "炒炒猪", "Emboar": "炎武王",
    "Oshawott": "水水獭", "Dewott": "双刃丸", "Samurott": "大剑鬼",
    "Patrat": "探探鼠", "Watchog": "步哨鼠", "Lillipup": "小约克",
    "Herdier": "哈约克", "Stoutland": "长毛狗", "Purrloin": "扒手猫",
    "Liepard": "酷豹", "Pansage": "花椰猴", "Simisage": "花椰猿",
    "Pansear": "爆香猴", "Simisear": "爆香猿", "Panpour": "冷水猴",
    "Simipour": "冷水猿", "Munna": "食梦梦", "Musharna": "梦梦蚀",
    "Pidove": "豆豆鸽", "Tranquill": "咕咕鸽", "Unfezant": "高傲雉鸡",
    "Blitzle": "斑斑马", "Zebstrika": "雷电斑马", "Roggenrola": "石丸子",
    "Boldore": "地幔岩", "Gigalith": "庞岩怪", "Woobat": "滚滚蝙蝠",
    "Swoobat": "心蝙蝠", "Drilbur": "螺钉地鼠", "Excadrill": "龙头地鼠",
    "Audino": "差不多娃娃", "Timburr": "搬运小匠", "Gurdurr": "铁骨土人",
    "Conkeldurr": "修缮老头", "Tympole": "圆蝌蚪", "Palpitoad": "蓝蟾蜍",
    "Seismitoad": "蟾蜍王", "Throh": "投摔鬼", "Sawk": "打击鬼",
    "Sewaddle": "虫宝包", "Swadloon": "宝包茧", "Leavanny": "保姆虫",
    "Venipede": "蜈蚣王", "Whirlipede": "车轮球", "Scolipede": "蜈蚣王",
    "Cottonee": "木棉球", "Whimsicott": "风妖精", "Petilil": "百合根娃娃",
    "Lilligant": "裙儿小姐", "Basculin": "野蛮鲈鱼", "Sandile": "混混鳄",
    "Krokorok": "流氓鳄", "Krookodile": "混混鳄", "Darumaka": "达摩狒狒",
    "Darmanitan": "达摩狒狒", "Maractus": "沙漠仙人掌", "Dwebble": "石居蟹",
    "Crustle": "岩殿居蟹", "Scraggy": "滑滑小子", "Scrafty": "头巾混混",
    "Sigilyph": "象征鸟", "Yamask": "死神棺", "Cofagrigus": "死神棺",
    "Tirtouga": "原盖海龟", "Carracosta": "肋骨海龟", "Archen": "始祖小鸟",
    "Archeops": "始祖大鸟", "Trubbish": "破破袋", "Garbodor": "灰尘山",
    "Zorua": "索罗亚", "Zoroark": "索罗亚克", "Minccino": "泡沫栗鼠",
    "Cinccino": "奇诺栗鼠", "Gothita": "哥特宝宝", "Gothorita": "哥特少女",
    "Gothitelle": "哥特萝莉", "Solosis": "单卵细胞球", "Duosion": "双卵细胞球",
    "Reuniclus": "人造细胞卵", "Ducklett": "鸭宝宝", "Swanna": "天鹅",
    "Vanillite": "迷你冰", "Vanillish": "多多冰", "Vanilluxe": "双倍多多冰",
    "Deerling": "四季鹿", "Sawsbuck": "萌芽鹿", "Emolga": "电飞鼠",
    "Karrablast": "盖盖虫", "Escavalier": "骑士蜗牛", "Foongus": "哎呀球菇",
    "Amoonguss": "败露球菇", "Frillish": "轻飘飘", "Jellicent": "胖嘟嘟",
    "Alomomola": "保姆曼波", "Joltik": "电电虫", "Galvantula": "电蜘蛛",
    "Ferroseed": "种子铁球", "Ferrothorn": "坚果哑铃", "Klink": "齿轮儿",
    "Klang": "齿轮组", "Klinklang": "齿轮怪", "Tynamo": "导电飞鼠",
    "Eelektrik": "电击魔兽", "Eelektross": "电龙", "Elgyem": "圆法师",
    "Beheeyem": "电灯怪", "Litwick": "烛光灵", "Lampent": "灯火幽灵",
    "Chandelure": "水晶灯火灵", "Axew": "牙牙", "Fraxure": "斧牙龙",
    "Haxorus": "双斧战龙", "Cubchoo": "喷嚏熊", "Beartic": "暴雪熊人",
    "Cryogonal": "几何雪花", "Shelmet": "小嘴蜗", "Accelgor": "敏捷虫",
    "Stunfisk": "泥巴鱼", "Mienfoo": "功夫鼬", "Mienshao": "师父鼬",
    "Druddigon": "赤面龙", "Golett": "齿轮怪", "Golurk": "泥偶巨人",
    "Pawniard": "驹刀小兵", "Bisharp": "劈斩司令", "Bouffalant": "爆炸头水牛",
    "Rufflet": "毛头小鹰", "Braviary": "勇士雄鹰", "Vullaby": "秃鹰丫头",
    "Mandibuzz": "秃鹰娜", "Heatmor": "熔蚁兽", "Durant": "铁蚁",
    "Deino": "单首龙", "Zweilous": "双首暴龙", "Hydreigon": "三首恶龙",
    "Larvesta": "燃烧虫", "Volcarona": "火神蛾", "Cobalion": "勾帕路翁",
    "Terrakion": "代拉基翁", "Virizion": "毕力吉翁", "Tornadus": "龙卷云",
    "Thundurus": "雷电云", "Landorus": "土地云", "Reshiram": "莱希拉姆",
    "Zekrom": "捷克罗姆", "Kyurem": "酋雷姆", "Keldeo": "凯路迪欧",
    "Meloetta": "美洛耶塔", "Genesect": "盖诺赛克特", "Chespin": "哈力栗",
    "Quilladin": "胖胖哈力", "Chesnaught": "布里卡隆", "Fennekin": "火狐狸",
    "Braixen": "长尾火狐", "Delphox": "妖火红狐", "Froakie": "呱呱泡蛙",
    "Frogadier": "呱头蛙", "Greninja": "甲贺忍蛙", "Bunnelby": "掘掘兔",
    "Diggersby": "掘地兔", "Fletchling": "小箭雀", "Fletchinder": "火箭雀",
    "Talonflame": "烈箭鹰", "Scatterbug": "粉蝶虫", "Spewpa": "粉蝶蛹",
    "Vivillon": "彩粉蝶", "Litleo": "小火狮", "Pyroar": "火焰狮",
    "Flabebe": "花蓓蓓", "Floette": "花叶蒂", "Florges": "花洁夫人",
    "Skiddo": "坐骑小羊", "Gogoat": "坐骑山羊", "Pancham": "顽皮熊猫",
    "Pangoro": "流氓熊猫", "Furfrou": "卷卷耳", "Espurr": "超能妙喵",
    "Meowstic": "超能妙喵", "Honedge": "独剑鞘", "Doublade": "双剑鞘",
    "Aegislash": "坚盾剑怪", "Spritzee": "芳香精", "Aromatisse": "芳香精",
    "Swirlix": "绵绵泡芙", "Slurpuff": "胖甜妮", "Inkay": "乌贼王",
    "Malamar": "乌贼王", "Binacle": "石丸子", "Barbaracle": "石居蟹",
    "Skrelp": "毒藻龙", "Dragalge": "毒藻龙", "Clauncher": "龙虾小兵",
    "Clawitzer": "铁螯龙虾", "Helioptile": "光电伞蜥", "Heliolisk": "光电伞蜥",
    "Tyrunt": "宝宝暴龙", "Tyrantrum": "暴龙", "Amaura": "冰雪龙",
    "Aurorus": "冰雪巨龙", "Sylveon": "仙子伊布", "Hawlucha": "摔角鹰人",
    "Dedenne": "咚咚鼠", "Carbink": "小碎钻", "Goomy": "黏黏宝",
    "Sliggoo": "黏美儿", "Goodra": "黏美龙", "Klefki": "钥圈儿",
    "Phantump": "小木灵", "Trevenant": "朽木妖", "Pumpkaboo": "南瓜精",
    "Gourgeist": "南瓜怪人", "Bergmite": "冰宝", "Avalugg": "冰岩怪",
    "Noibat": "嗡蝠", "Noivern": "音波龙", "Xerneas": "哲尔尼亚斯",
    "Yveltal": "伊裴尔塔尔", "Zygarde": "基格尔德", "Diancie": "蒂安希",
    "Hoopa": "胡帕", "Volcanion": "波尔凯尼恩", "Rowlet": "木木枭",
    "Dartrix": "投羽枭", "Decidueye": "狙射树枭", "Litten": "火斑喵",
    "Torracat": "炎热喵", "Incineroar": "炽焰咆哮虎", "Popplio": "球球海狮",
    "Brionne": "花漾海狮", "Primarina": "西狮海壬", "Pikipek": "小笃儿",
    "Trumbeak": "喇叭啄", "Toucannon": "铳嘴大鸟", "Yungoos": "猫鼬少",
    "Gumshoos": "猫鼬探长", "Grubbin": "虫电宝", "Charjabug": "虫电宝",
    "Vikavolt": "锹农炮虫", "Crabrawler": "好胜蟹", "Crabominable": "好胜毛蟹",
    "Oricorio": "花舞鸟", "Cutiefly": "甜舞妮", "Ribombee": "甜冷美后",
    "Rockruff": "岩狗狗", "Lycanroc": "鬃岩狼人", "Wishiwashi": "弱丁鱼",
    "Magearna": "玛机雅娜", "Type: Null": "属性：空", "Silvally": "银伴战兽",
    "Minior": "小陨星", "Komala": "树枕尾熊", "Turtonator": "爆焰龟兽",
    "Togedemaru": "托戈德玛尔", "Mimikyu": "谜拟Q", "Bruxish": "磨牙彩皮鱼",
    "Drampa": "老翁龙", "Dhelmise": "破破舵轮", "Jangmo-o": "杖尾鳞甲龙",
    "Hakamo-o": "鳞甲龙", "Kommo-o": "杖尾鳞甲龙", "Tapu Koko": "卡璞・鸣鸣",
    "Tapu Lele": "卡璞・蝶蝶", "Tapu Bulu": "卡璞・哞哞", "Tapu Fini": "卡璞・鳍鳍",
    "Cosmog": "科斯莫古", "Cosmoem": "科斯莫姆", "Solgaleo": "索尔迦雷欧",
    "Lunala": "露奈雅拉", "Nihilego": "虚吾伊德", "Buzzwole": "爆肌蚊",
    "Pheromosa": "费洛美螂", "Xurkitree": "电束木", "Celesteela": "铁火辉夜",
    "Kartana": "纸御剑", "Guzzlord": "恶食大王", "Necrozma": "奈克洛兹玛",
    "Magearna": "玛机雅娜", "Marshadow": "玛夏多", "Poipole": "毒贝比",
    "Naganadel": "四颚针龙", "Stakataka": "垒磊石", "Blacephalon": "爆焰龟兽",
    "Zeraora": "捷拉奥拉", "Grookey": "敲音猴", "Thwackey": "啪咚猴",
    "Rillaboom": "轰擂金刚猩", "Scorbunny": "炎兔儿", "Raboot": "腾蹴小将",
    "Cinderace": "闪焰王牌", "Sobble": "泪眼蜥", "Drizzile": "变涩蜥",
    "Inteleon": "千面避役", "Skwovet": "贪心栗鼠", "Greedent": "藏饱栗鼠",
    "Rookidee": "小鸽宝", "Corvisquire": "蓝鸦", "Corviknight": "钢铠鸦",
    "Blipbug": "刺尾虫", "Dottler": "盾甲茧", "Orbeetle": "音箱蟀",
    "Nickit": "偷儿狐", "Thievul": "狐大盗", "Gossifleur": "白蓬蓬",
    "Eldegoss": "棉絮宝", "Wooloo": "毛辫羊", "Dubwool": "毛毛角羊",
    "Chewtle": "咬咬龟", "Drednaw": "暴噬龟", "Yamper": "来电汪",
    "Boltund": "逐电犬", "Rolycoly": "炭小侍", "Carkol": "炭侍偶",
    "Coalossal": "巨炭山", "Applin": "苹裹龙", "Flapple": "苹龙",
    "Appletun": "苹裹龙", "Snom": "雪吞虫", "Frosmoth": "雪绒蛾",
    "Milcery": "霜奶仙", "Alcremie": "霜奶仙", "Falinks": "列阵兵",
    "Pincurchin": "啪嚓海胆", "Sizzlipede": "烧火蚣", "Centiskorch": "焚焰蚣",
    "Clobbopus": "八爪武师", "Grapploct": "八爪武师", "Sinistea": "来悲茶",
    "Polteageist": "怖思壶", "Hatenna": "迷布莉姆", "Hattrem": "提布莉姆",
    "Hatterene": "布莉姆温", "Impidimp": "捣蛋小妖", "Morgrem": "诈唬魔",
    "Grimmsnarl": "长毛巨魔", "Obstagoon": "堵拦熊", "Perrserker": "钢铠鸦",
    "Cursola": "魔灵珊瑚", "Sirfetch'd": "葱游兵", "Mr. Rime": "魔墙人偶",
    "Runerigus": "沙丘娃", "Milotic": "美纳斯", "Toxel": "毒电婴",
    "Toxtricity": "颤弦蝾螈", "Sandyghast": "沙丘娃", "Phantump": "小木灵",
    "Dracovish": "鳃鱼龙", "Dracozolt": "雷鸟龙", "Arctozolt": "雷鸟海兽",
    "Arctovish": "鳃鱼海兽", "Duraludon": "铝钢龙", "Dreepy": "幼基拉斯",
    "Drakloak": "刺甲贝", "Dragapult": "多龙巴鲁托", "Zacian": "苍响",
    "Zamazenta": "藏玛然特", "Eternatus": "无极汰那", "Kubfu": "武道熊师",
    "Urshifu": "武道熊师", "Zarude": "萨戮德", "Regieleki": "雷吉艾勒奇",
    "Regidrago": "雷吉铎拉戈", "Glastrier": "灵幽马", "Spectrier": "雪暴马",
    "Calyrex": "蕾冠王", "Wyrdeer": "诡角鹿", "Kleavor": "劈斧螳螂",
    "Typhlosion": "火爆兽", "Samurott": "大剑鬼", "Qwilfish": "千针鱼",
    "Sneasler": "洗翠索罗亚克", "Rotom": "洛托姆", "Basculegion": "幽尾玄驹",
    "Hisuian Zorua": "洗翠索罗亚", "Hisuian Zoroark": "洗翠索罗亚克",
    "Enamorus": "眷恋云", "Sprigatito": "新叶喵", "Floragato": "蒂蕾喵",
    "Meowscarada": "魔幻假面喵", "Fuecoco": "呆火鳄", "Crocalor": "炙烫鳄",
    "Skeledirge": "骨纹巨声鳄", "Quaxly": "润水鸭", "Quaxwell": "涌跃鸭",
    "Quaquaval": "狂欢浪舞鸭", "Lechonk": "爱吃豚", "Oinkologne": "飘香豚",
    "Tarountula": "电肚蛙", "Spidops": "电肚蛙", "Nymble": "虫滚泥",
    "Lokix": "虫滚泥", "Pawmi": "电海燕", "Pawmo": "电海燕",
    "Pawmot": "电海燕", "Tandemaus": "一家鼠", "Maushold": "一家鼠",
    "Fidough": "小锻匠", "Dachsbun": "小锻匠", "Smoliv": "橄榄油",
    "Dolliv": "橄榄油", "Arboliva": "橄榄油", "Nacli": "石丸子",
    "Naclstack": "石丸子", "Garganacl": "石丸子", "Charcadet": "炭小侍",
    "Ceruledge": "炭侍偶", "Armarouge": "巨炭山", "Tadbulb": "电电虫",
    "Bellibolt": "电蜘蛛", "Wattrel": "电海燕", "Kilowattrel": "电海燕",
    "Maschiff": "獒教父", "Mabosstiff": "獒教父", "Shroodle": "毒电婴",
    "Grafaiai": "颤弦蝾螈", "Bramblin": "布拨", "Brambleghast": "布拨",
    "Toedscool": "拖拖蚓", "Toedscruel": "拖拖蚓", "Capsakid": "甜竹竹",
    "Scovillain": "甜竹竹", "Rellor": "虫滚泥", "Rabsca": "虫滚泥",
    "Flittle": "迷你芙", "Espathra": "迷你芙", "Tinkatink": "小锻匠",
    "Tinkatuff": "小锻匠", "Tinkaton": "小锻匠", "Wiglett": "土龙弟弟",
    "Wugtrio": "土龙弟弟", "Bombirdier": "炸弹鸟", "Finizen": "海豚侠",
    "Palafin": "海豚侠", "Veluza": "龙鳍鳗", "Iron Bundle": "铁包袱",
    "Iron Hands": "铁臂膀", "Iron Jugulis": "铁脖颈", "Iron Moth": "铁毒蛾",
    "Iron Thorns": "铁荆棘", "Iron Valiant": "铁武者", "Iron Treads": "铁辙迹",
    "Frigibax": "冰砌鹅", "Arctibax": "冰砌鹅", "Baxcalibur": "冰砌鹅",
    "Gholdengo": "金币怪", "Ampharos": "电龙", "Magneton": "三合一磁怪",
    "Alolan Exeggutor": "椰蛋树", "Alolan Raichu": "雷丘", "Alolan Sandslash": "穿山王",
    "Alolan Ninetales": "九尾", "Alolan Dugtrio": "三地鼠", "Alolan Marowak": "嘎啦嘎啦",
    "Greninja": "甲贺忍蛙", "Pikachu": "皮卡丘", "Eevee": "伊布",
    "Zygarde": "基格尔德", "Necrozma": "奈克洛兹玛", "Mewtwo": "超梦",
    "Ho-Oh": "凤王", "Lugia": "洛奇亚", "Rayquaza": "烈空坐",
    "Groudon": "固拉多", "Kyogre": "盖欧卡", "Dialga": "帝牙卢卡",
    "Palkia": "帕路奇亚", "Giratina": "骑拉帝纳", "Arceus": "阿尔宙斯",
    "Reshiram": "莱希拉姆", "Zekrom": "捷克罗姆", "Kyurem": "酋雷姆",
    "Xerneas": "哲尔尼亚斯", "Yveltal": "伊裴尔塔尔", "Zygarde": "基格尔德",
    "Solgaleo": "索尔迦雷欧", "Lunala": "露奈雅拉", "Necrozma": "奈克洛兹玛",
    "Zacian": "苍响", "Zamazenta": "藏玛然特", "Eternatus": "无极汰那",
    "Koraidon": "故勒顿", "Miraidon": "密勒顿", "Walking Wake": "走鲸",
    "Iron Leaves": "铁叶", "Terapagos": "太乐巴戈斯", "Pecharunt": "桃歹郎"
};

// 属性中文名称映射
const typeNames = {
    "Normal": "一般", "Fire": "火", "Water": "水", "Grass": "草",
    "Electric": "电", "Ice": "冰", "Bug": "虫", "Flying": "飞行",
    "Ground": "地面", "Rock": "岩石", "Fighting": "格斗", "Psychic": "超能力",
    "Ghost": "幽灵", "Poison": "毒", "Dark": "恶", "Steel": "钢",
    "Dragon": "龙", "Fairy": "妖精"
};

// 获取宝可梦中文名称
function getChineseName(pokemon) {
    const name = pokemon.pokemon || pokemon.name || '';
    return pokemonNames[name] || null;
}

// 获取属性中文名称
function getTypeChineseName(englishType) {
    return typeNames[englishType] || englishType;
}

async function initDetail() {
    await loadPokemonData();
    
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonId = urlParams.get('id');
    
    if (!pokemonId) {
        window.location.href = '../index.html';
        return;
    }
    
    currentPokemon = getPokemonByNumber(pokemonId) || getPokemonById(pokemonId);
    
    if (!currentPokemon) {
        document.getElementById('detail-container').innerHTML = `
            <div style="text-align: center; padding: 60px;">
                <h1>未找到该宝可梦</h1>
                <a href="../index.html" class="btn btn-primary" style="display: inline-block; margin-top: 20px;">返回首页</a>
            </div>
        `;
        return;
    }
    
    renderDetail();
    updateFavoriteButton();
}

function renderDetail() {
    const container = document.getElementById('detail-container');
    const profile = getProfile();
    const primaryType = profile ? profile.primaryType : null;
    
    const type1 = (currentPokemon.type1 || '').toLowerCase();
    const type2 = (currentPokemon.type2 || '').toLowerCase();
    
    // 获取中文属性名
    const type1Chinese = getTypeChineseName(currentPokemon.type1);
    const type2Chinese = getTypeChineseName(currentPokemon.type2);
    
    let typesHTML = `<span class="type-badge type-${type1}">${type1Chinese || '未知'}</span>`;
    if (type2) {
        typesHTML += `<span class="type-badge type-${type2}">${type2Chinese}</span>`;
    }
    
    const stats = [
        { name: 'HP', value: parseInt(currentPokemon.hpBase) || 0, class: 'hp' },
        { name: '攻击', value: parseInt(currentPokemon.attackBase) || 0, class: 'attack' },
        { name: '防御', value: parseInt(currentPokemon.defenseBase) || 0, class: 'defense' },
        { name: '特攻', value: parseInt(currentPokemon.spAttackBase) || 0, class: 'spatk' },
        { name: '特防', value: parseInt(currentPokemon.spDefenseBase) || 0, class: 'spdef' },
        { name: '速度', value: parseInt(currentPokemon.speedBase) || 0, class: 'speed' }
    ];
    
    const totalStats = stats.reduce((sum, s) => sum + s.value, 0);
    
    const sections = [
        { id: 'stats', title: '种族值', priority: ['battle'].includes(primaryType) },
        { id: 'chart', title: '能力雷达图', priority: ['battle'].includes(primaryType) },
        { id: 'description', title: '图鉴介绍', priority: ['story'].includes(primaryType) }
    ];
    
    sections.sort((a, b) => (b.priority ? 1 : 0) - (a.priority ? 1 : 0));
    
    let sectionsHTML = '';
    
    // 种族值条形图 - 只渲染一次
    const statsPriority = sections.find(s => s.id === 'stats')?.priority;
    sectionsHTML += renderStatsSection(stats, statsPriority);
    
    // 能力雷达图 - 只渲染一次
    const chartPriority = sections.find(s => s.id === 'chart')?.priority;
    sectionsHTML += renderChartSection(chartPriority);
    
    sectionsHTML += renderDescriptionSection(sections.find(s => s.id === 'description')?.priority);
    
    // 获取中文名称
    const englishName = currentPokemon.pokemon || currentPokemon.name;
    const chineseName = getChineseName(currentPokemon);
    
    container.innerHTML = `
        <div class="detail-header">
            <div class="detail-image">
                <img id="pokemon-image" alt="${englishName}">
            </div>
            <div class="detail-info">
                <h1>${englishName}</h1>
                ${chineseName ? `<div class="chinese-name">${chineseName}</div>` : ''}
                <div class="number">#${String(currentPokemon.pokedexNumber || currentPokemon.id).padStart(3, '0')}</div>
                <div class="species">${currentPokemon.species || '未知宝可梦'}</div>
                <div class="types">${typesHTML}</div>
                <div class="basic-stats">
                    <div class="stat-item">
                        <label>身高</label>
                        <div class="value">${currentPokemon.heightM || '?'} m</div>
                    </div>
                    <div class="stat-item">
                        <label>体重</label>
                        <div class="value">${currentPokemon.weightKg || '?'} kg</div>
                    </div>
                    <div class="stat-item">
                        <label>总和</label>
                        <div class="value">${totalStats}</div>
                    </div>
                </div>
            </div>
        </div>
        ${sectionsHTML}
        <button id="favorite-btn" class="favorite-btn" onclick="toggleFavorite()">♡</button>
    `;
    
    const img = document.getElementById('pokemon-image');
    setPokemonImage(img, currentPokemon);
    
    setTimeout(() => {
        renderRadarChart(stats);
        // 加载图鉴信息
        loadAndDisplayPokedexInfo();
    }, 100);
}

function renderStatsSection(stats, highlighted = false) {
    let statsHTML = stats.map(stat => `
        <div class="stat-row">
            <label>${stat.name}</label>
            <div class="stat-bar">
                <div class="stat-fill ${stat.class}" style="width: ${Math.min(stat.value / 1.5, 100)}%">${stat.value}</div>
            </div>
        </div>
    `).join('');
    
    return `
        <div class="detail-section ${highlighted ? 'highlighted' : ''}">
            <h2>种族值</h2>
            <div class="stats-grid">
                ${statsHTML}
            </div>
        </div>
    `;
}

function renderChartSection(highlighted = false) {
    return `
        <div class="detail-section ${highlighted ? 'highlighted' : ''}">
            <h2>能力雷达图</h2>
            <div class="chart-container">
                <canvas id="radar-chart"></canvas>
            </div>
        </div>
    `;
}

function renderDescriptionSection(highlighted = false, pokedexDescription = '') {
    const description = pokedexDescription || (currentPokemon.species 
        ? `${currentPokemon.pokemon}是${currentPokemon.species}。它是一种充满魅力的宝可梦，等待着训练家们的发现！`
        : '这是一种神秘的宝可梦，关于它的详细信息还在研究中。');
    
    return `
        <div class="detail-section ${highlighted ? 'highlighted' : ''}">
            <h2>图鉴介绍</h2>
            <p class="description">${description}</p>
        </div>
    `;
}

// 异步获取图鉴信息并更新页面
async function loadAndDisplayPokedexInfo() {
    const pokemonId = currentPokemon.pokedexNumber || currentPokemon.id;
    if (!pokemonId) return;
    
    try {
        const description = await getPokedexDescription(pokemonId);
        if (description) {
            // 更新图鉴介绍部分
            const sections = document.querySelectorAll('.detail-section');
            for (const section of sections) {
                const h2 = section.querySelector('h2');
                if (h2 && h2.textContent === '图鉴介绍') {
                    const descriptionParagraph = section.querySelector('.description');
                    if (descriptionParagraph) {
                        descriptionParagraph.textContent = description;
                    }
                    break;
                }
            }
        }
    } catch (error) {
        console.error('Failed to load pokedex info:', error);
    }
}

function renderRadarChart(stats) {
    const ctx = document.getElementById('radar-chart');
    if (!ctx) return;
    
    if (statsChart) {
        statsChart.destroy();
    }
    
    statsChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: stats.map(s => s.name),
            datasets: [{
                label: '种族值',
                data: stats.map(s => s.value),
                backgroundColor: 'rgba(227, 53, 13, 0.2)',
                borderColor: 'rgba(227, 53, 13, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(227, 53, 13, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(227, 53, 13, 1)'
            }]
        },
        options: {
            scales: {
                r: {
                    beginAtZero: true,
                    max: 150,
                    ticks: {
                        stepSize: 30
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

function toggleFavorite() {
    const id = currentPokemon.pokedexNumber || currentPokemon.id;
    toggleCollection(id);
    updateFavoriteButton();
}

function updateFavoriteButton() {
    const btn = document.getElementById('favorite-btn');
    const id = currentPokemon.pokedexNumber || currentPokemon.id;
    
    if (isCollected(id)) {
        btn.textContent = '❤️';
        btn.classList.add('active');
    } else {
        btn.textContent = '♡';
        btn.classList.remove('active');
    }
}

initDetail();