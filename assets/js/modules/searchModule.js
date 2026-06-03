class PokemonSearch {
    constructor() {
        this.searchTerm = '';
        this.currentResults = [];
        this.onResultsReady = null;
    }
    
    setCallback(callback) {
        this.onResultsReady = callback;
    }
    
    search(pokemonList, term) {
        this.searchTerm = term.toLowerCase().trim();
        
        if (!this.searchTerm) {
            this.currentResults = pokemonList;
            this.notifyResults();
            return;
        }
        
        const results = pokemonList.filter(pokemon => {
            // 按名称搜索
            const name = (pokemon.pokemon || pokemon.name || '').toLowerCase();
            if (name.includes(this.searchTerm)) return true;
            
            // 按图鉴编号搜索
            const pokedexNum = (pokemon.pokedexNumber || pokemon.id || '').toString();
            if (pokedexNum.includes(this.searchTerm)) return true;
            
            // 按属性搜索
            const type1 = (pokemon.type1 || '').toLowerCase();
            const type2 = (pokemon.type2 || '').toLowerCase();
            if (type1.includes(this.searchTerm) || type2.includes(this.searchTerm)) return true;
            
            // 按分类搜索
            const species = (pokemon.species || '').toLowerCase();
            if (species.includes(this.searchTerm)) return true;
            
            return false;
        });
        
        this.currentResults = results;
        this.notifyResults();
    }
    
    notifyResults() {
        if (typeof this.onResultsReady === 'function') {
            this.onResultsReady(this.currentResults, this.searchTerm);
        }
    }
    
    getResults() {
        return this.currentResults;
    }
}

const pokemonSearch = new PokemonSearch();

function initSearch(inputId, resultsCallback) {
    const input = document.getElementById(inputId);
    if (!input) return;
    
    pokemonSearch.setCallback(resultsCallback);
    
    input.addEventListener('input', (e) => {
        if (typeof allPokemon !== 'undefined' && allPokemon.length > 0) {
            pokemonSearch.search(allPokemon, e.target.value);
        }
    });
    
    // 按回车键搜索
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && typeof allPokemon !== 'undefined') {
            pokemonSearch.search(allPokemon, input.value);
        }
    });
}

function createSearchBox(containerId, placeholder = '搜索宝可梦...') {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = `
        <div class="search-box">
            <input type="text" id="search-input" placeholder="${placeholder}">
            <button class="search-btn" onclick="handleSearch()">
                <span>🔍</span>
            </button>
        </div>
    `;
}

function handleSearch() {
    const input = document.getElementById('search-input');
    if (input && typeof allPokemon !== 'undefined') {
        pokemonSearch.search(allPokemon, input.value);
    }
}