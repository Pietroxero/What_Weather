//setting variables to be used

var requestUrl = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}";
var APIKey = "ba85e2551d84032dd058206d20a27efe";
var city = $('#city');
var current = $('#current');
var temp =$('#temp');
var humidity = $('humidity');
var wind = $('#wind');
var fiveDay =$('#fiveDay');
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


}