//setting variables to be used

var requestUrl = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}";
var APIKey = "ba85e2551d84032dd058206d20a27efe";
var city = $('#city');
var currently = $('#current');
var temp =$('#temp');
var humidity = $('humidity');
var windy = $('#wind');
var weekDays =$('#fiveDay');
var searching = $('#searchBtn');
var useIn = $('#userInput');
var longitude = "";
var latitude = "";

//event listeners for search btn or userinput
searching.on('click', onSearchClick)
function onSearchClick() {
    var cityname = useIn.val()
getLongitudeLatitude(cityname);
};

//new function takes city name from search btn
function getLongitudeLatitude (name) {
    console.log(name)
    fetch (`https://api.openweathermap.org/data/2.5/forecast?q=${name}&appid=${APIKey}`)
    .then(function (response){
        // console.log(response.json())
        return response.json();
    })
    .then(function (data){
        console.log(data)
        longitude = data.city.coord.lon
        latitude = data.city.coord.lat
        console.log(longitude, latitude)
        getWeatherResults(longitude,latitude);
    })
}

//build next function to process long and lat
function getWeatherResults (lon,lat){
    console.log(lon,lat)
    fetch (`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`)
.then(function (response){
    return response.json();
})
    .then(function (data){
        console.log(data)
    })
 temp.text(`Current Temp: ${data.currently.temp}`);
 windy.text(`Wind: ${data.currently.wind.speed} MPH`);
 humidity.text(`Humidity: ${data.currently.wind.humidity}%`);

 //repeat in a loop to create cards for the preceding 5 day forecast
weekDays.empty();

console.log(data.daily)
var dazeArray = data.daily
for (var i = 0; i<5; i++){
    var iconData=dazeArray[i].weather[0].icon;
    var iurl = "https://openweathermap.org/img/wn/" + iconData + ".png";
    fetch(iurl)
    .then(data => {
$("fiveDayIcon").attr('src', data.url);
    });
    fivescards(getDate(dailyArray[i].dt), iurl, dailyArray[i].temp.max, dailyArray[i].temp.min,
    dailyArray[i].wind.speed, dailyArray[i].humidity);
}

};

