const planetsElem = document.querySelector('.newPage');
const planetsList = document.querySelectorAll('aside');
const mainElmt = document.querySelector('main');
const h1Elm = document.querySelector('h1');
const h3Elm = document.querySelector('h3');
const footer = document.querySelector('footer');
let planetData = ''; // Declare a variable to store planet data

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
            <p class="moon"> ${planet.moons} </p>
            <button class="back">Back Button</button>
            <figure class="firstSun"></figure>
            <figure class="secondSun"></figure>
            <figure class="thirdSun"></figure>
        </article>`;
    planetsElem.innerHTML = planetInfo;

    const backButton = document.querySelector('.back');
    backButton.addEventListener('click', () => {
        planetsElem.style.display = 'none';
        mainElmt.style.display = 'block';
        h1Elm.style.display = 'block';
        h3Elm.style.display = 'block';
        footer.style.display = 'block';
    });
};
// async function getApiKey() {
//     try {
//         let resp = await fetch(""https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies"); // Replace with your actual endpoint
//         const data = await resp.json();
//         return data.apiKey;
//     } catch (error) {
//         console.log('Could not fetch API key');
//         throw error;
//     }
// }
async function getPlanets() {
    try {
        let resp = await fetch("https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies", {
            method: "GET",
            headers: { "x-zocom": "solaris-1Cqgm3S6nlMechWO" },
        });
        const data = await resp.json();
        planetData = data.bodies;
        console.log(planetData); // Store planet data in the variable
    } catch (error) {
        console.log('Could not get planets');
    }
}

getPlanets();

planetsList.forEach((planets, i) => {
    planets.addEventListener('click', () => {
        const clickedPlanet = planetData[i]; // Access planet data from the stored variable
        displayPlanetInfo(clickedPlanet);
        planetsElem.style.display = 'block';
        mainElmt.style.display = 'none';
        h1Elm.style.display = 'none';
        h3Elm.style.display = 'none';
        footer.style.display = 'none';
    });
});
