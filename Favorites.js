
// Function to load favorites from local storage
function loadFavouritesFromLocalStorage() {
    const storedFavourites = localStorage.getItem('Favourites');
    return storedFavourites ? JSON.parse(storedFavourites) : [];
};

// Function to save the current list of favorites to local storage
function saveFavouritesToLocalStorage(){
    localStorage.setItem('Favourites',JSON.stringify(Favourites));
}

// Load favorites from local storage on page load
let Favourites = loadFavouritesFromLocalStorage();
// Get reference to the list element in the DOM
let listEl = document.getElementById('list');


// Function to add favorites to the DOM
function addFavouritesToDom() {
    console.log(Favourites);
    Favourites.forEach(Hero => {
        let id = `hero-${Hero.id}`;
        const { path, extension } = Hero.thumbnail;
        const imgSrc = `${path}/standard_large.${extension}`;
        listEl.insertAdjacentHTML('beforeend', `
        <li>
            <img src="${imgSrc}" alt="${Hero.name}">
            <div class="name">${Hero.name}</div>
            <button id="${id}"> Remove </button>
            <div class="">

        </li>
        
        `);

        let RemoveEl = document.getElementById(`${id}`);
        RemoveEl.addEventListener('click', () => {
            removeFromFavourites(Hero)
        });

    })
};
// Add favorites to the DOM on page load
addFavouritesToDom();

function updateFavouritesDOM() {
    // Clear the existing content in the list element
    listEl.innerHTML = '';

    // Add the updated list of favorites to the DOM
    addFavouritesToDom();
}


// Function to update the favorites list in the DOM
function removeFromFavourites(hero) {
    const exists = Favourites.some(favHero => favHero.id === hero.id)
    if (exists) {
        const index = Favourites.findIndex(favHero => favHero.id === hero.id);

        Favourites.splice(index, 1);

        saveFavouritesToLocalStorage();
        updateFavouritesDOM();

    }
}




