// VARIABLES ASSIGNED FROM CORRESPONDING HTML DOC ELEMENTS
let leftSide = document.querySelector('.left-side');
let searchField = document.querySelector('.search-field');
let searchButton = document.querySelector('.search-btn');
let cityName = document.querySelector('.city-name');
let cityConditions = document.querySelector('.city-conditions');
let cityTemp = document.querySelector('.city-temp');
let cityWind = document.querySelector('.city-wind');
let cityHumidity = document.querySelector('.city-humidity');
let forecast = document.querySelector('.forecast');

// SETS SEARCH HISTORY BUTTONS FROM LOCAL STORAGE
setSearchHistoryButtons();

// ADDS CLICK EVENT TO SEARCH BUTTON TO RETRIEVE DATA BASED OFF OF USER ENTERED VALUE AND CREATES A BUTTON FOR THE SEARCH HISTORY - STORES SEARCHED VALUE IN LOCAL STORAGE3
searchButton.addEventListener('click', ()=> {
    if (searchField.value) {
        getData(searchField.value);
        let searchResult = document.createElement('button');
        searchResult.setAttribute("class", "search-result-button");
        searchResult.textContent = searchField.value;
        localStorage.setItem(`${searchField.value}`, `${searchField.value}`);
        leftSide.append(searchResult);

        searchResult.addEventListener('click', ()=> {
            getData(searchResult.textContent);
        })

        searchField.value = "";
    } else {
        return;
    }
})

// FUNCTION TO ADD PREVIOUSLY SEARCHED CITIES AS BUTTONS FROM LOCAL STORAGE
function setSearchHistoryButtons() {
    for (let x = 0; x < localStorage.length; x++){
        let previousSearchResult = document.createElement('button');
        previousSearchResult.textContent = localStorage.key(x);
        leftSide.append(previousSearchResult);

        previousSearchResult.addEventListener('click', ()=>{
            getData(previousSearchResult.textContent);
        })
    }
}

// FUNCTION TO UPDATE THE CURRENT WEATHER FOR THE CITY 
function setWeatherToday(fetchedData){
    cityName.textContent = `${fetchedData.name} ${dayjs().format("MM/DD/YYYY")} `
    cityConditions.setAttribute("src", `http://openweathermap.org/img/wn/${fetchedData.weather[0].icon}@2x.png`); 
    cityConditions.setAttribute("style", "display: block;")
    cityTemp.textContent = `Temp: ${fetchedData.main.temp} \u00B0F`;
    cityWind.textContent = `Wind: ${fetchedData.wind.speed} MPH`;
    cityHumidity.textContent = `Humidity: ${fetchedData.main.humidity} %`;
}



// FUNCTION TO CREATE CARD AND APPEND IT TO FORECAST SECTION
function setWeatherForecast(obj) {
    let container = document.createElement('div');
    container.setAttribute("class", "card");

    let forecastDate = document.createElement('h3');
    forecastDate.textContent = dayjs(obj.dt_txt).format("MM/DD/YYYY");

    let forecastImage = document.createElement('img');
    forecastImage.src = `http://openweathermap.org/img/wn/${obj.weather[0].icon}@2x.png`;

    let forecastTemp = document.createElement('p');
    forecastTemp.textContent = `Temp: ${obj.main.temp}`;

    let forecastWind = document.createElement('p');
    forecastWind.textContent = `Wind: ${obj.wind.speed}`;

    let forecastHumidity = document.createElement('p');
    forecastHumidity.textContent = `Humidity: ${obj.main.humidity}`;

    container.append(forecastDate, forecastImage, forecastTemp, forecastWind, forecastHumidity);
    forecast.append(container);
}

// PROVIDES FETCH DATA BASED OFF OF USER SEARCH AND UPDATES CURRENT WEATHER AS WELL AS FORECAST INFORMATION
function getData(searchedCity) {
    // Removes any previous forecast information so new cards can be added
    while (forecast.children[0]){
        forecast.children[0].remove();
    }
    // Fetches Geo Coordinates based off of the value user entered in the Search Field
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${searchedCity}&limit=1&appid=a4d8e373cfe9f576408638aa9dba13f8`)
        .then( (response)=> {
            return response.json();
        })
        .then( (data)=> {
            // Retrieves Latitude and Longitude of the searched City
            let cityLatitude = data[0].lat;
            let cityLongitude = data[0].lon;
            // Uses the Latitude and Longitude to get the current weather information for the city
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${cityLatitude}&lon=${cityLongitude}&units=imperial&appid=a4d8e373cfe9f576408638aa9dba13f8`)
            .then( (response)=> {
                return response.json();
            })
            .then( (data)=> {
                setWeatherToday(data);
            });

            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${cityLatitude}&lon=${cityLongitude}&units=imperial&appid=a4d8e373cfe9f576408638aa9dba13f8`)
            .then( (response)=> {
                return response.json();
            })
            .then( (data)=> {
                for (let child of data.list){
                    if (dayjs(child.dt_txt).format("HH") == 12){
                        setWeatherForecast(child);
                    }
                }
            });

        });
}