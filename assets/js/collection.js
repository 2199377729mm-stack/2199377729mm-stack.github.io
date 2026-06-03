let allPokemon = [];
let currentSort = 'added';

async function initCollection() {
    allPokemon = await loadPokemonData();
    renderCollection();
    
    document.querySelectorAll('.sort-btn').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentSort = btn.dataset.sort;
            renderCollection();
        };
    });
}

function renderCollection() {
    const collection = getCollection();
    const container = document.getElementById('collection-grid');
    const emptyState = document.getElementById('empty-collection');
    const countElement = document.getElementById('collection-count');
    
    countElement.textContent = collection.length;
    
    if (collection.length === 0) {
        container.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }
    
    container.style.display = 'grid';
    emptyState.style.display = 'none';
    
    let collectionPokemon = collection.map(item => {
        const id = typeof item === 'object' ? item.id : item;
        const addedAt = typeof item === 'object' ? item.addedAt : Date.now();
        const pokemon = getPokemonByNumber(id) || getPokemonById(id);
        return { pokemon, addedAt, id };
    }).filter(item => item.pokemon);
    
    collectionPokemon = sortCollection(collectionPokemon);
    
    container.innerHTML = '';
    collectionPokemon.forEach(item => {
        const cardWrapper = document.createElement('div');
        cardWrapper.style.position = 'relative';
        
        const card = renderPokemonCard(item.pokemon);
        
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.textContent = '×';
        removeBtn.onclick = (e) => {
            e.stopPropagation();
            removeFromCollection(item.id);
            renderCollection();
        };
        
        cardWrapper.appendChild(card);
        cardWrapper.appendChild(removeBtn);
        container.appendChild(cardWrapper);
    });
}

function sortCollection(collection) {
    return collection.sort((a, b) => {
        switch(currentSort) {
            case 'number':
                const numA = parseInt(a.pokemon.pokedexNumber || a.pokemon.id);
                const numB = parseInt(b.pokemon.pokedexNumber || b.pokemon.id);
                return numA - numB;
            case 'name':
                const nameA = (a.pokemon.pokemon || a.pokemon.name || '').toLowerCase();
                const nameB = (b.pokemon.pokemon || b.pokemon.name || '').toLowerCase();
                return nameA.localeCompare(nameB);
            case 'added':
            default:
                return b.addedAt - a.addedAt;
        }
    });
}

initCollection();
