let leftSide = document.querySelector('.left-side');
let searchField = document.querySelector('.search-field');
let searchButton = document.querySelector('.search-btn');

let cityName = document.querySelector('.city-name');
let cityTemp = document.querySelector('.city-temp');
let cityWind = document.querySelector('.city-wind');
let cityHumidity = document.querySelector('.city-humidity');

let forecast = document.querySelector('.forecast');

// fetch("http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}")
//     .then( (response)=> {
//         return response.json();
//     })
//     .then( (data)=> {
//         console.log(data);
//     });

searchButton.addEventListener('click', ()=> {
    // if (searchField.value) {
    //     let searchResult = document.createElement('button');
    //     searchResult.textContent = searchField.value;
    //     leftSide.append(searchResult);
    // } else {
    //     return;
    // }
    
    // Stores the value from the Search Field to be used in the fetch statements
    let cityName = searchField.value;
    // Fetches Geo Coordinates based off of the value user entered in the Search Field
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=a4d8e373cfe9f576408638aa9dba13f8`)
        .then( (response)=> {
            return response.json();
        })
        .then( (data)=> {
            // Retrieves Latitude and Longitude of the searched City
            let cityLatitude = data[0].lat;
            let cityLongitude = data[0].lon;
            // Uses the Latitude and Longitude to get the current weather information for the city
            fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${cityLatitude}&lon=${cityLongitude}&units=imperial&appid=a4d8e373cfe9f576408638aa9dba13f8`)
            .then( (response)=> {
                return response.json();
            })
            .then( (data)=> {
                console.log(data);
                setWeatherToday(data);
            });

        });
    
    
})

function setWeatherToday(fetchedData){
    cityName.textContent = fetchedData.name;
    cityTemp.textContent = `Temp: ${fetchedData.main.temp} \u00B0F`;
    cityWind.textContent = `Wind: ${fetchedData.wind.speed} MPH`;
    cityHumidity.textContent = `Humidity: ${fetchedData.main.humidity} %`;
}



// FUNCTION TO CREATE CARD AND APPEND IT TO FORECAST SECTION

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