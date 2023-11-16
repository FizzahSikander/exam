const planetsElem = document.querySelector('.newPage');
const planetsList = document.querySelectorAll('aside');
const mainElement = document.querySelector('main');
const h1Elm = document.querySelector('h1');
const h3Elm = document.querySelector('h3');
const footer = document.querySelector('footer');
const API_KEY_URL = "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys";
const PLANETS_URL = "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies";
let planetData = ''; // Declared variable to store planet data
let key = ""; // Declared variable to store key fetched from API
// function to get the data wanted from the entire source of data of API
function displayPlanetInfo(planet) {
    const planetInfo = `
        <article>
            <h1>${planet.name}</h1>
            <h4>${planet.latinName}</h4>
            <p class="desc">${planet.desc}</p>
            <hr class="hr1">
            <h3 class="omkrets"> OMKRETS </h3>
            <p class="omkret">${planet.circumference} km</p>
            <h3 class="maxtemp"> MAX TEMPERATURE </h3>
            <p class="max">${planet.temp.day} C</p>
            <h3 class="mintemp"> MIN TEMPERATURE </h3>
            <p class="min">${planet.temp.night} C</p>
            <h3 class="km"> KM FRÅN SOLEN</h3>
            <p class="kilo">${planet.distance} </p>
            <hr class="hr2">
            <h3 class="moons">MÅNAR</h3>
            <p class="moon"> ${planet.moons.join(', ')} </p>
            <button class="back">Back Button</button>
        </article>`;
    planetsElem.innerHTML = planetInfo;
    // Back button on click function
    const backButton = document.querySelector('.back');
    backButton.addEventListener('click', () => {
        planetsElem.style.display = 'none';
        mainElement.style.display = 'grid';
        h1Elm.style.display = 'block';
        h3Elm.style.display = 'block';
        footer.style.display = 'grid';
    });
};
// Function to fetch api key from data 
async function getApiKey() {
    try {
        let resp = await fetch(API_KEY_URL, {
            method: "POST"
        });
        const data = await resp.json();
        console.log(data.key);
        key = data.key;
        await getPlanets();
    } catch (error) {
        console.log('Could not fetch API key', error);
        throw error;
    }
}
// function to get the data of API 
async function getPlanets() {
    try {
        let resp = await fetch(PLANETS_URL, {
            method: "GET",
            headers: { "x-zocom": key },
        });
        const data = await resp.json();
        planetData = data.bodies;
        console.log(planetData); // Store planet data in the variable
    } catch (error) {
        console.log('Could not get planets', error);
        throw error;
    }
}
// Function used to show the data of only the planet being clicked on
planetsList.forEach((planets, i) => {
    planets.addEventListener('click', async () => {
        try {
            await getApiKey();
            const clickedPlanet = planetData[i];
            displayPlanetInfo(clickedPlanet);
            planetsElem.style.display = 'block';
            mainElement.style.display = 'none';
            h1Elm.style.display = 'none';
            h3Elm.style.display = 'none';
            footer.style.display = 'none';
        } catch (error) {
            console.error('Error processing planet click', error);
        }
    });
});