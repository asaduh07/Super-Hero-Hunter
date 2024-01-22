
// Get references to the search bar and search results elements
let searchBar = document.getElementById('search');
let searchResults = document.getElementById('search-results');

// Add event listeners to the search bar for input and keydown events
searchBar.addEventListener('input', () => fetchHeroesList(searchBar.value));
searchBar.addEventListener('keydown', handleKeyDown);
// Arrays to store search results and favorite heroes
let results = [];
let Favourites = [];

// Function to be executed when the document is loaded
function documentLoad(){
    if(searchBar.value){
        fetchHeroesList(searchBar.value);
    }
};
// Add a 'load' event listener to execute documentLoad function when the window is loaded
window.addEventListener('load', ()=>{
    documentLoad();
});


// Function to handle keydown events in the search bar
async function handleKeyDown(event) {
    
    if (event.key === 'Backspace' || event.key === 'Delete' || searchBar.value.trim() === '') {
        // Clear the search results when backspace or delete key is pressed
        searchResults.innerHTML = '';
    }


}

// Function to fetch the list of heroes based on the search query
async function fetchHeroesList(hero) {
    try {
        const response = await fetch(`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${hero}&orderBy=name&limit=10&apikey=d405829ff0871721459fd4cd5a7adfd4`);
        const data = await response.json();
        results = data.data.results;
        
    } catch (error) {
        console.log("error fetching data:", error)

    }

    addListToDOM(results);

}

// Function to add the list of heroes to the DOM
async function addListToDOM(results) {
        searchResults.innerHTML = "";
        document.getElementById('banner').style.display="none";
        console.log(results);

    await results.forEach(Hero => {
        let id=`${Hero.id}`;
        const { path, extension } = Hero.thumbnail;
        const imgSrc = `${path}/standard_fantastic.${extension}`;
        searchResults.insertAdjacentHTML('beforeend',`
        <li>
            <img src="${imgSrc}" alt="${Hero.name}" style="width: 100%; border-radius: inherit;">
            <div class="name">${Hero.name}</div>
            <i class="fa-solid fa-star" style="color: #f6f6f6;" id="fav-${id}"></i>
            <button id="${id}"> Know More</button>
            

        </li>
        
        `);
        
    let FavouriteEl=document.getElementById(`fav-${id}`);
    FavouriteEl.addEventListener('click',()=>{
        addToFavourites(Hero);
        FavouriteEl.style.color='yellow';
    } )

    let knowmoreEl=document.getElementById(`${id}`);
    knowmoreEl.addEventListener('click',()=>{
        redirectToHeroDetails(id);

    }
    )


    });


}

// Function to redirect to the hero details page
function redirectToHeroDetails(heroId) {
    // Redirect to the hero-details.html page with the heroId parameter
    window.location.href = `superhero.html?id=${heroId}`;
}
// Function to add a hero to the favorites list
function addToFavourites(hero) {
    const exists= Favourites.some(favHero=> favHero.id===hero.id)

    if(!exists){
        Favourites.push(hero);
        console.log(Favourites);

        saveFavouritesToLocalStorage();
        
    }else{
        console.log("Already added");

    }
    
};

// Function to save the favorites list to local storage

function saveFavouritesToLocalStorage(){
    localStorage.setItem('Favourites',JSON.stringify(Favourites));
}

// Function to load favorites from local storage
function loadFavouritesFromLocalStorage(){
    const storedFavourites= localStorage.getItem('Favourites');
    if(storedFavourites){
        Favourites=JSON.parse(storedFavourites);
    }
};

// Load favorites from local storage on page load
loadFavouritesFromLocalStorage();











