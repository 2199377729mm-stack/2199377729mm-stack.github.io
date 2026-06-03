let currentQuestion = 0;
let quizAnswers = [];
let allPokemon = [];
let currentProfile = null;
let currentFilter = 'all';

async function init() {
    allPokemon = await loadPokemonData();
    await loadPokemonTags();
    
    currentProfile = getProfile();
    if (currentProfile) {
        showState('home');
        renderHome();
    } else {
        showState('welcome');
    }
}

function showState(state) {
    document.querySelectorAll('.state').forEach(el => el.classList.remove('active'));
    document.getElementById(`state-${state}`).classList.add('active');
}

function startQuiz() {
    currentQuestion = 0;
    quizAnswers = [];
    showState('quiz');
    renderQuestion();
}

function renderQuestion() {
    const question = quizQuestions[currentQuestion];
    document.getElementById('quiz-question').textContent = question.question;
    
    const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;
    
    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const card = document.createElement('div');
        card.className = 'card option-card';
        card.innerHTML = `<h3>${option.text}</h3>`;
        card.onclick = () => selectOption(option);
        optionsContainer.appendChild(card);
    });
}

function selectOption(option) {
    quizAnswers.push(option);
    currentQuestion++;
    
    if (currentQuestion < quizQuestions.length) {
        renderQuestion();
    } else {
        finishQuiz();
    }
}

function finishQuiz() {
    currentProfile = calculateProfile(quizAnswers);
    saveProfile(currentProfile);
    localStorage.setItem('quizAnswers', JSON.stringify(quizAnswers));
    
    showState('result');
    document.getElementById('player-type').textContent = currentProfile.typeInfo.name;
    document.getElementById('player-description').textContent = currentProfile.typeInfo.description;
    
    const representative = getPokemonByNumber(currentProfile.typeInfo.representative);
    if (representative) {
        const container = document.getElementById('representative-pokemon');
        container.innerHTML = '';
        container.appendChild(renderPokemonCard(representative));
    }
}

function restartQuiz() {
    clearProfile();
    currentProfile = null;
    showState('welcome');
}

function goToHome() {
    showState('home');
    renderHome();
}

function renderHome() {
    if (!currentProfile) return;
    
    document.getElementById('profile-tag').textContent = currentProfile.typeInfo.name;
    document.getElementById('profile-tag').style.backgroundColor = currentProfile.typeInfo.color;
    
    const recommendations = getRecommendations(allPokemon, currentProfile, 12);
    const recommendedContainer = document.getElementById('recommended-grid');
    renderPokemonGrid(
        recommendedContainer, 
        recommendations.map(r => r.pokemon), 
        true, 
        recommendations
    );
    
    renderAllPokemon();
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderAllPokemon();
        };
    });
}

function renderAllPokemon() {
    const searchTerm = document.getElementById('search-input').value;
    const filtered = filterPokemon(allPokemon, searchTerm, currentFilter);
    const container = document.getElementById('pokemon-grid');
    renderPokemonGrid(container, filtered);
}

function handleSearch() {
    renderAllPokemon();
}

init();
