let pokemonTags = {};

async function loadPokemonTags() {
    try {
        const response = await fetch('assets/js/data/pokemon_tags.json');
        if (response.ok) {
            pokemonTags = await response.json();
        }
    } catch (error) {
        console.log('Using default tags');
    }
    
    if (Object.keys(pokemonTags).length === 0) {
        pokemonTags = generateDefaultTags();
    }
}

function generateDefaultTags() {
    return {
        "1": { battle: 0.3, collector: 0.2, popular: 0.8, story: 0.4 },
        "2": { battle: 0.4, collector: 0.2, popular: 0.7, story: 0.4 },
        "3": { battle: 0.7, collector: 0.4, popular: 0.6, story: 0.5 },
        "4": { battle: 0.3, collector: 0.2, popular: 0.8, story: 0.4 },
        "5": { battle: 0.4, collector: 0.2, popular: 0.7, story: 0.4 },
        "6": { battle: 0.8, collector: 0.5, popular: 0.8, story: 0.6 },
        "7": { battle: 0.3, collector: 0.2, popular: 0.8, story: 0.4 },
        "8": { battle: 0.4, collector: 0.2, popular: 0.7, story: 0.4 },
        "9": { battle: 0.7, collector: 0.4, popular: 0.6, story: 0.5 },
        "25": { battle: 0.5, collector: 0.6, popular: 1.0, story: 0.7 },
        "133": { battle: 0.4, collector: 0.7, popular: 0.9, breeder: 0.8 },
        "144": { battle: 0.6, collector: 0.9, story: 0.8 },
        "145": { battle: 0.7, collector: 0.9, story: 0.8 },
        "146": { battle: 0.7, collector: 0.9, story: 0.8 },
        "150": { battle: 0.95, collector: 0.95, story: 0.9 },
        "151": { battle: 0.9, collector: 1.0, story: 0.95 }
    };
}

function getRecommendations(pokemonList, profile, limit = 12) {
    const weightedList = pokemonList.map(pokemon => {
        const id = pokemon.pokedexNumber || pokemon.id;
        const tags = pokemonTags[id] || { battle: 0.5, collector: 0.3, popular: 0.5, story: 0.3, breeder: 0.3 };
        
        let score = 0;
        Object.keys(profile.weights).forEach(tag => {
            score += (tags[tag] || 0) * profile.weights[tag];
        });
        
        const totalStats = (parseInt(pokemon.hpBase) || 0) + 
                          (parseInt(pokemon.attackBase) || 0) + 
                          (parseInt(pokemon.defenseBase) || 0) + 
                          (parseInt(pokemon.spAttackBase) || 0) + 
                          (parseInt(pokemon.spDefenseBase) || 0) + 
                          (parseInt(pokemon.speedBase) || 0);
        
        score += totalStats / 1000;
        
        const isLegendary = [144, 145, 146, 150, 151].includes(parseInt(id));
        if (isLegendary) score += 0.3;
        
        return {
            pokemon: pokemon,
            score: score,
            reason: getRecommendationReason(tags, profile.primaryType)
        };
    });
    
    weightedList.sort((a, b) => b.score - a.score);
    return weightedList.slice(0, limit);
}

function getRecommendationReason(tags, primaryType) {
    const reasons = {
        battle: "对战热门",
        collector: "稀有收藏",
        breeder: "培育首选",
        story: "剧情关键",
        popular: "超人气宝可梦"
    };
    
    let maxTag = 'popular';
    let maxScore = 0;
    
    Object.keys(tags).forEach(tag => {
        if (tags[tag] > maxScore) {
            maxScore = tags[tag];
            maxTag = tag;
        }
    });
    
    return reasons[primaryType] || reasons[maxTag] || "推荐宝可梦";
}
