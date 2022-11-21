// TOP OF PAGE
// create an array for recent searches

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



// BODY OF PAGE
// create function to get items from local storage, then put into recent searches array, then render
// call dayjs

// function to get data from search bar { get value from search bar, to be used in fetch request }

// function to fetch main weather data 
// transform data
// get icon value from api --> if statement to find out type of weather -->
// assign data to var or create and append to page 



// AT BOTTOM OF PAGE
// run function to get recent searches 

// create button to run function when user inputs destination
// add event listener for recent searches

