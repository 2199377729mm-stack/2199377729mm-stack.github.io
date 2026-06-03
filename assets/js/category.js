let allPokemon = [];

const categories = [
    { name: '传说的宝可梦', icon: '⭐', names: ['Articuno', 'Zapdos', 'Moltres', 'Mewtwo', 'Lugia', 'Ho-Oh', 'Raikou', 'Entei', 'Suicune', 'Latias', 'Latios', 'Groudon', 'Kyogre', 'Rayquaza', 'Jirachi', 'Deoxys', 'Heatran', 'Regigigas', 'Giratina', 'Cresselia', 'Manaphy', 'Darkrai', 'Shaymin', ' Arceus', 'Victini', 'Reshiram', 'Zekrom', 'Kyurem', 'Keldeo', 'Meloetta', 'Genesect', 'Xerneas', 'Yveltal', 'Zygarde', 'Diancie', 'Hoopa', 'Volcanion', 'Type: Null', 'Silvally', 'Tapu Koko', 'Tapu Lele', 'Tapu Bulu', 'Tapu Fini', 'Cosmog', 'Cosmoem', 'Solgaleo', 'Lunala', 'Necrozma', 'Magearna', 'Marshadow', 'Zeraora', 'Meltan', 'Melmetal', 'Zacian', 'Zamazenta', 'Eternatus', 'Calyrex', 'Wo-Chien', 'Chien-Pao', 'Ting-Lu', 'Chi-Yu', 'Gouging Fire', 'Raging Bolt', 'Iron Boulder', 'Iron Crown', 'Pecharunt'] },
    { name: '幻之宝可梦', icon: '✨', names: ['Mew', 'Celebi', 'Jirachi', 'Deoxys', 'Manaphy', 'Darkrai', 'Shaymin', 'Phione', 'Arceus', 'Victini', 'Keldeo', 'Meloetta', 'Genesect', 'Diancie', 'Hoopa', 'Volcanion', 'Magearna', 'Marshadow', 'Zeraora', 'Meltan', 'Melmetal'] },
    { name: '初始宝可梦', icon: '🌱', names: ['Bulbasaur', 'Charmander', 'Squirtle', 'Chikorita', 'Cyndaquil', 'Totodile', 'Treecko', 'Torchic', 'Mudkip', 'Turtwig', 'Chimchar', 'Piplup', 'Snivy', 'Tepig', 'Oshawott', 'Chespin', 'Fennekin', 'Froakie', 'Rowlet', 'Litten', 'Popplio', 'Grookey', 'Scorbunny', 'Sobble', 'Sprigatito', 'Fuecoco', 'Quaxly'] },
    { name: '最终进化', icon: '💪', names: ['Venusaur', 'Charizard', 'Blastoise', 'Meganium', 'Typhlosion', 'Feraligatr', 'Sceptile', 'Blaziken', 'Swampert', 'Torterra', 'Infernape', 'Empoleon', 'Serperior', 'Emboar', 'Samurott', 'Chesnaught', 'Delphox', 'Greninja', 'Decidueye', 'Incineroar', 'Primarina', 'Rillaboom', 'Cinderace', 'Inteleon', 'Meowscarada', 'Skeledirge', 'Quaquaval'] },
    { name: '热门宝可梦', icon: '❤️', names: ['Pikachu', 'Eevee', 'Charizard', 'Bulbasaur', 'Squirtle', 'Gengar', 'Dragonite', 'Gyarados', 'Mewtwo', 'Snorlax', 'Lapras', 'Vaporeon', 'Jolteon', 'Flareon', 'Gardevoir', 'Garchomp', 'Lucario', 'Greninja', 'Decidueye', 'Incineroar'] },
    { name: '全部宝可梦', icon: '📖', names: null }
];

async function initCategory() {
    allPokemon = await loadPokemonData();
    renderCategoryGrid();
}

function renderCategoryGrid() {
    const grid = document.getElementById('category-grid');
    grid.innerHTML = '';
    
    categories.forEach(cat => {
        const card = document.createElement('div');
        card.className = 'card category-card';
        card.innerHTML = `
            <div class="cat-icon">${cat.icon}</div>
            <h3>${cat.name}</h3>
            <p>${cat.names ? cat.names.length + '只' : '全部'}</p>
        `;
        card.onclick = () => showCategory(cat);
        grid.appendChild(card);
    });
}

function showCategory(cat) {
    document.getElementById('category-grid').style.display = 'none';
    document.getElementById('pokemon-list').style.display = 'block';
    document.getElementById('current-category-title').textContent = `${cat.icon} ${cat.name}`;
    
    let filtered;
    if (cat.names === null) {
        filtered = allPokemon;
    } else {
        filtered = allPokemon.filter(p => {
            const pokemonName = p.pokemon || p.name || '';
            return cat.names.some(name => pokemonName.toLowerCase().includes(name.toLowerCase()));
        });
    }
    
    renderPokemonGrid(document.getElementById('pokemon-grid'), filtered);
    
    document.getElementById('back-btn').onclick = () => {
        document.getElementById('category-grid').style.display = 'grid';
        document.getElementById('pokemon-list').style.display = 'none';
    };
}

initCategory();
