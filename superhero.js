// Event listener to execute code once the DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get the heroId from the URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const heroId = urlParams.get('id');

    // Fetch hero details based on the heroId
    fetchHeroDetails(heroId);
    fetchheroEvents(heroId);
    fetchheroSeries(heroId);
    fetchheroStories(heroId);
    fetchheroComics(heroId);
    
});

// References to elements where event, series, stories, and comics data will be displayed
let eventEL=document.getElementById('events');
let seriesEl=document.getElementById('series');
let storyEl=document.getElementById('stories');
let comicsEl=document.getElementById('comics');
// Function to fetch hero details based on the provided heroId
async function fetchHeroDetails(heroId) {
    try {
        const response = await fetch(`https://gateway.marvel.com:443/v1/public/characters/${heroId}?apikey=d405829ff0871721459fd4cd5a7adfd4`);
        const data = await response.json();
        const heroDetails = data.data.results[0];
        
            addDetailsToDOM(heroDetails);
    
        
    } catch (error) {
        console.log("error fetching data:", error)

    }

}
// Function to add hero details to the DOM
 function addDetailsToDOM(heroDetails) {
    let superheroEl=document.getElementById('superhero-container');
    const Hero=heroDetails;
    console.log(Hero);
    const { path, extension } = Hero.thumbnail;
    const imgSrc = `${path}/standard_fantastic.${extension}`;
    // Insert HTML for hero details into the superhero container
    superheroEl.innerHTML=`
        <img src="${imgSrc}" alt="${Hero.name}">
        <div id="details">
        <h1 class="name">${Hero.name}</h1>
        <div class="description">${Hero.description}</div>
        </div>
           
    `;
};
// Function to fetch events related to the hero based on heroId
async function fetchheroEvents(heroId){

    
    try {
        const response = await fetch(`https://gateway.marvel.com:443/v1/public/characters/${heroId}/events?apikey=d405829ff0871721459fd4cd5a7adfd4`);
        const data = await response.json();
        const events = data.data.results;
        addEventToDom(events);
        
        
    } catch (error) {
        console.log("error fetching data:", error)

    }

}

// Function to add events to the DOM
function addEventToDom(events){
    if (events.length === 0) {
        eventEL.innerHTML = '<p>No content</p>';
        return;
    }

    events.forEach(event => {
        const { path, extension } = event.thumbnail;
        const imgSrc = `${path}/standard_fantastic.${extension}`;
        // Insert HTML for each event into the events container
        eventEL.insertAdjacentHTML('beforeend',`
        <div class="event">
            <img src="${imgSrc}" alt="${event.title}">
            <div class="title">${event.title}</div>
        </div>
        `);

})
};

// Similar functions for fetching series, stories, and comics with respective display functions
// ...

// Function to fetch series related to the hero based on heroId

async function fetchheroSeries(heroId){
    try {
        const response = await fetch(`https://gateway.marvel.com:443/v1/public/characters/${heroId}/series?apikey=d405829ff0871721459fd4cd5a7adfd4`);
        const data = await response.json();
        const series = data.data.results;
        addSeriesToDom(series);
        
        
    } catch (error) {
        console.log("error fetching data:", error)

    }

}

// Function to add series to the DOM

function addSeriesToDom(series){
    if (series.length === 0) {
        seriesEl.innerHTML = '<p>No content</p>';
        return;
    }

    series.forEach(serie => {
        const { path, extension } = serie.thumbnail;
        const imgSrc = `${path}/standard_fantastic.${extension}`;
        seriesEl.insertAdjacentHTML('beforeend',`
        <div class="serie">
            <img src="${imgSrc}" alt="${serie.title}">
            <div class="title">${serie.title}</div>
        </div>
        `);

})
};

// Function to fetch stories related to the hero based on heroId
async function fetchheroStories(heroId){
    try {
        const response = await fetch(`https://gateway.marvel.com:443/v1/public/characters/${heroId}/stories?apikey=d405829ff0871721459fd4cd5a7adfd4`);
        const data = await response.json();
        const stories = data.data.results;
        console.log(stories);
        addStoriesToDom(stories);
        
        
    } catch (error) {
        console.log("error fetching data:", error)

    }

};
// Function to add stories to the DOM
function addStoriesToDom(stories){
    if (stories.length === 0) {
        storyEl.innerHTML = '<p>No content</p>';
        return;
    }

    stories.forEach(story => {
        // const { path, extension } = serie.thumbnail;
        // const imgSrc = `${path}/standard_fantastic.${extension}`;
        storyEl.insertAdjacentHTML('beforeend',`
            <li class="title" style="none">${story.title}</li>
        `);

})
};
// Function to fetch comics related to the hero based on heroId
async function fetchheroComics(heroId){
    try {
        const response = await fetch(`https://gateway.marvel.com:443/v1/public/characters/${heroId}/comics?limit=15&apikey=d405829ff0871721459fd4cd5a7adfd4`);
        const data = await response.json();
        const comics = data.data.results;
        console.log(comics);
        addComicsToDom(comics);
        
        
    } catch (error) {
        console.log("error fetching data:", error)

    }

};

// Function to add comics to the DOM
function addComicsToDom(comics){
    if (comics.length === 0) {
        comicsEl.innerHTML = '<p>No content</p>';
        return;
    }

    comics.forEach(comic => {
        const { path, extension } = comic.thumbnail;
        const imgSrc = `${path}/standard_fantastic.${extension}`;
        comicsEl.insertAdjacentHTML('beforeend',`
        <div class="comic">
            <img src="${imgSrc}" alt="${comic.title}">
            <div class="title">${comic.title}</div>
        </div>
        `);

})
};
