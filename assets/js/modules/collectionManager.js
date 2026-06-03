function getCollection() {
    const saved = localStorage.getItem('pokemonCollection');
    return saved ? JSON.parse(saved) : [];
}

function addToCollection(id) {
    const collection = getCollection();
    if (!collection.includes(id)) {
        collection.push({
            id: id,
            addedAt: Date.now()
        });
        localStorage.setItem('pokemonCollection', JSON.stringify(collection));
    }
}

function removeFromCollection(id) {
    let collection = getCollection();
    collection = collection.filter(item => 
        (typeof item === 'object' ? item.id : item) != id
    );
    localStorage.setItem('pokemonCollection', JSON.stringify(collection));
}

function isCollected(id) {
    const collection = getCollection();
    return collection.some(item => 
        (typeof item === 'object' ? item.id : item) == id
    );
}

function toggleCollection(id) {
    if (isCollected(id)) {
        removeFromCollection(id);
        return false;
    } else {
        addToCollection(id);
        return true;
    }
}

function getCollectionCount() {
    return getCollection().length;
}
