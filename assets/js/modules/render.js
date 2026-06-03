function renderPokemonCard(pokemon, showRecommendation = false, recommendationReason = '') {
    const card = document.createElement('div');
    card.className = 'card pokemon-card';
    
    const type1 = (pokemon.type1 || '').toLowerCase();
    const type2 = (pokemon.type2 || '').toLowerCase();
    
    let typesHTML = `<span class="type-badge type-${type1}">${pokemon.type1 || 'Unknown'}</span>`;
    if (type2) {
        typesHTML += `<span class="type-badge type-${type2}">${pokemon.type2}</span>`;
    }
    
    let recommendationHTML = '';
    if (showRecommendation && recommendationReason) {
        recommendationHTML = `<div class="recommendation-tag">${recommendationReason}</div>`;
    }
    
    // 检查是否已收藏
    const pokemonId = pokemon.pokedexNumber || pokemon.id;
    const isFavorite = typeof isCollected === 'function' && isCollected(pokemonId);
    
    card.innerHTML = `
        <button class="favorite-btn" onclick="event.stopPropagation(); toggleFavoriteCard('${pokemonId}', this)">
            ${isFavorite ? '❤️' : '♡'}
        </button>
        <img alt="${pokemon.pokemon || pokemon.name}" class="pokemon-img">
        <div class="name">${pokemon.pokemon || pokemon.name}</div>
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
