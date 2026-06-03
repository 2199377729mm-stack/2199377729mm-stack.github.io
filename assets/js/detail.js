let currentPokemon = null;
let statsChart = null;

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
    
    let typesHTML = `<span class="type-badge type-${type1}">${currentPokemon.type1 || 'Unknown'}</span>`;
    if (type2) {
        typesHTML += `<span class="type-badge type-${type2}">${currentPokemon.type2}</span>`;
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
        { id: 'breeding', title: '培育信息', priority: ['breeder'].includes(primaryType) },
        { id: 'description', title: '图鉴介绍', priority: ['story'].includes(primaryType) }
    ];
    
    sections.sort((a, b) => (b.priority ? 1 : 0) - (a.priority ? 1 : 0));
    
    let sectionsHTML = '';
    
    if (sections.find(s => s.id === 'stats')?.priority) {
        sectionsHTML += renderStatsSection(stats, true);
    }
    
    if (sections.find(s => s.id === 'chart')?.priority) {
        sectionsHTML += renderChartSection(true);
    }
    
    sectionsHTML += renderStatsSection(stats, sections.find(s => s.id === 'stats')?.priority);
    
    sectionsHTML += renderChartSection(sections.find(s => s.id === 'chart')?.priority);
    
    sectionsHTML += renderBreedingSection(sections.find(s => s.id === 'breeding')?.priority);
    
    sectionsHTML += renderDescriptionSection(sections.find(s => s.id === 'description')?.priority);
    
    container.innerHTML = `
        <div class="detail-header">
            <div class="detail-image">
                <img id="pokemon-image" alt="${currentPokemon.pokemon}">
            </div>
            <div class="detail-info">
                <h1>${currentPokemon.pokemon}</h1>
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

function renderBreedingSection(highlighted = false) {
    return `
        <div class="detail-section ${highlighted ? 'highlighted' : ''}">
            <h2>培育信息</h2>
            <div class="breeding-info">
                <div class="breeding-item">
                    <label>蛋组</label>
                    <div class="value">未知</div>
                </div>
                <div class="breeding-item">
                    <label>孵化步数</label>
                    <div class="value">约5,120步</div>
                </div>
                <div class="breeding-item">
                    <label>性别比例</label>
                    <div class="value">♂ 50% / ♀ 50%</div>
                </div>
            </div>
        </div>
    `;
}

function renderDescriptionSection(highlighted = false) {
    const description = currentPokemon.species 
        ? `${currentPokemon.pokemon}是${currentPokemon.species}。它是一种充满魅力的宝可梦，等待着训练家们的发现！`
        : '这是一种神秘的宝可梦，关于它的详细信息还在研究中。';
    
    return `
        <div class="detail-section ${highlighted ? 'highlighted' : ''}">
            <h2>图鉴介绍</h2>
            <p class="description">${description}</p>
        </div>
    `;
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
