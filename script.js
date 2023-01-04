// TOP OF PAGE
// create an array for recent searches
var searchedCities = document.querySelector('.list-group')

// create vars for apikey, apiurl
var APIkey = '79d946f64f75e61339731b7d14963b20';

$("#city-search").on("click", function(e){
    e.preventDefault();
    var city = $("#city-input").val();
    $("#city-input").val("");
    console.log(city);

    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${APIkey}`)
    .then(function(res){
        return res.json();
    })
    .then(function(data){
        currentWeatherInfo(data[0].lat, data[0].lon);
        saveLocaly(city);
        saveToBtnList(city)
    });
})

function currentWeatherInfo(lat, lon)
{
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${APIkey}`)
    .then(function(res){
        return res.json();
    })
    .then(function(data){
        console.log(JSON.stringify(data));

        var h2 = $("<h2>");
        // h2.text(data.name+"("+dayaJs().format("F")+")");

        var icon = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        var img = $("<img>");
        img.attr("src", icon);

        var temp  = $("<p>");
        temp.text("Temp: "+data.main.temp+" F");

        var humidity  = $("<p>");
        humidity.text("Humidity: "+data.main.humidity +" %");

        var windSpeed  = $("<p>");
        windSpeed.text("Wind Speed: "+data.wind.speed+" MPH");

        $("#city-detail").append(h2, img, temp, humidity, windSpeed);
    });
}

// create function to get items from local storage, then put into recent searches array, then render
// function getRecentCities() {
//  var userCityInput = localStorage.getItem('#city-search').value;

//  searchedCities.textContent = userCityInput;
// }

// city.addEventListener('click', function(event){
//     event.preventDefault();
// var userCityInput = document.querySelector("#city-search").value;

// localStorage.getItem(userCityInput);
// getRecentCities();
// })

// localStorage.getItem('userCityInput', userCityInput);

function saveLocaly(city){
    var localCities = localStorage.getItem('cities');

    if (localCities){
    var newCities = JSON.parse(localCities);
    newCities.push(city);
    localStorage.setItem('cities', JSON.stringify(newCities))
    } else {
    var newCities = [city];
    localStorage.setItem('cities', JSON.stringify(newCities))
    }
}

function getCities(){
    var localCities = localStorage.getItem('cities');

    if (localCities){
    var newCities = JSON.parse(localCities);
    var citiesLength = newCities.length > 5?5:newCities.length
    for (let index = citiesLength; index > 0; index--) {
        const city = newCities[index];
    var citybtn = document.createElement('button')
    citybtn.textContent = city;
    // TODO add classes for parent styling
    citybtn.className = 'btn';
    document.getElementById('city-buttons').appendChild(citybtn)
    }
    }
}

getCities()

function saveToBtnList(city) {
  var citybtn = document.createElement('button')
    citybtn.textContent = city;
    citybtn.className = 'btn';
    document.getElementById('city-buttons').appendChild(citybtn)  


}