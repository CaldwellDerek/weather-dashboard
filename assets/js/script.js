let leftSide = document.querySelector('.left-side');
let searchField = document.querySelector('.search-field');
let searchButton = document.querySelector('.search-btn');
let forecast = document.querySelector('.forecast');

searchButton.addEventListener('click', ()=> {
    let text = searchField.value;
    let searchResult = document.createElement('button');
    searchResult.textContent = text;
    leftSide.append(searchResult);
    createCard();
})

// function createCard() {
//     let container = document.createElement('div');
//     container.setAttribute("class", "card");

//     let forecastDate = document.createElement('h3');
//     forecastDate.textContent = "TEST DATE";

//     let forecastImage = document.createElement('img');
//     forecastImage.src = "https://via.placeholder.com/25";

//     let forecastTemp = document.createElement('p');
//     forecastTemp.textContent = "TEST TEMP";

//     let forecastWind = document.createElement('p');
//     forecastWind.textContent = "TEST WIND";

//     let forecastHumidity = document.createElement('p');
//     forecastHumidity.textContent = "TEST HUMIDITY";

//     container.append(forecastDate, forecastImage, forecastTemp, forecastWind, forecastHumidity);

//     forecast.append(container);
// }