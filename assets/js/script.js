//setting variables to be used and for reference

var requestUrl =
  "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}";
var APIKey = "ba85e2551d84032dd058206d20a27efe";
var locations = [];
var searching = $("#searchBtn");
var temp = $("#temp");
var humidity = $("#humidity");
var windy = $("#windy");
var icon = $("#icon");
var longitude = "";
var latitude = "";
var future = $("#futureDays");
var userIn = $("#searchArea");

$(document).ready(function(){
    searching.on("click", onSearchClick);
    function onSearchClick() {
        var cityName = $('#searchArea').val();
        if (cityName == ''){
            return;
        }
        cities = JSON.parse(localStorage.getItem("locations")) || [];
        if (cities.indexOf(cityName) == -1){
            cities.push(cityName)
            localStorage.setItem("locations", JSON.stringify(cities));

        }
            loadLocal();
            loadCityStorm(cityName, true);

    }
    // $('#stormData').hide();
    loadLocal();
    // $('#searchBtn').click(function (event){
    //     var event = event.target;
    //     var searchParameters = $('#searchArea').val();
    //     if(searchParameters !==""){
    //         var city = parseInt(searchParameters);
    //     } else {
    //         loadCityStorm(searchParameters, false);
    //     }
    // });
});


//clear button function
$("#clearhistoryBtn").on("click", function () {
  localStorage.clear();
  $("#searchHistory").empty();
});


//load locations from our local storage
function loadLocal (){
    var localArray = localStorage.getItem('locations');
    if (localArray){
        locations=JSON.parse(localArray);
        renderLocal();
    } else{
        localStorage.setItem('locations', JSON.stringify([]));
    }
}

function renderLocal(){
    var divLocals = $('#searchHistory');
    divLocals.empty();
    $.each(locations, function(index, item){
        var area = $('<a>').addClass("list-group-item list-group-item-action city").attr('data-city', 
        locations[index]).text(locations[index]);
        divLocals.append(area);
    });
    $('#searchHistory > a').off();
    $('#searchHistory > a').click(function (event){
        var element = event.target;
        var city = $(element).attr('data-city');
        console.log(city);

        loadCityStorm(city, true);
    });
}

//this function will save the locations from our user input to the array and our localstorage
function saveLocal(data){
    var city = data.city.name;
    locations.unshift(city);
    localStorage.setItem('locations', JSON.stringify(locations));
}



//this function will be to generate out forecast for current day
function currentCityStorm (city){
    //recycled from line 111
    var weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=imperial`;
    var AreaContainer = $('#searchAreaContainer');

    //in this section of the function we make the ajax call to the api as we did previously lines 24-27
 $.ajax({
    url: weatherURL,
    method: "GET"
 })
// rinse and repeat the above line 30 for same functionality
//however this will save the city name to local storage
.then(function(data){
    

    //here we load the previous function on line 19
    // getStormData(response.city.coord.lat, response.city.coord.lon, response.city.name);
 var urlIcon = "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png"
     $('#placeDate').html(city + " (" + new Date().toLocaleDateString()+ ") <img id=\"icon\" src=\"" + urlIcon + "\" alt=\"Weather icon\"/>");
    temp.text(`Current Temp: ${data.main.temp} \xB0F`);
  windy.text(`Wind: ${data.wind.speed} MPH`);
 humidity.text(`Humidity: ${data.main.humidity} %`);
});

}



function getStormData (lat, lon, city) {
    //recycling url variable frm previous version of function built see lines 171-189
    var stormURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`;

    //Ajax call to the API
    $.ajax({
        url: stormURL,
        method: "GET"
    })

    //make use of retrieved data and place inside an object
.then(function(response){
    console.log(response);
    showStormData(response, city);
    currentCityStorm(city);
});
};

// in this section it will be a rinse and repeat of the above
//however the difference being we will be calling the API for the city name a user inputs
//this will also call the function stated on line 31 to load our values.

function loadCityStorm (city, isClicked){
    //recycled from line 111
    var weatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}&units=imperial`;
    var AreaContainer = $('#searchAreaContainer');

    //in this section of the function we make the ajax call to the api as we did previously lines 24-27
 $.ajax({
    url: weatherURL,
    method: "GET"
 })
// rinse and repeat the above line 30 for same functionality
//however this will save the city name to local storage
.then(function(response){
    if (!isClicked){
        saveLocal(response);
        renderLocal();
    }

    //here we load the previous function on line 19
    getStormData(response.city.coord.lat, response.city.coord.lon, response.city.name);
});

}



//in this section we will be displaying the information we are pulling/saving
function showStormData (stormData, city) {


//within this section we are going to load the 5 day forecast cards
var fiveDays = $('#fiveForecast');
fiveDays.empty();

for (i=0; i < 40; i+=8) {
//here is where we will  create the elements that will display those 5 day cards and append in the html
var div = $("<div>").addClass('bg-primary').addClass('text-center').addClass('m-2');
var TimeyWimey = parseInt(stormData.list[i].dt);
var headerDay = $("<h6>").text(new Date(TimeyWimey*1000).toLocaleDateString());
var dayIcon = "https://openweathermap.org/img/wn/" + stormData.list[i].weather[0].icon + ".png"
var iconImg = $("<img>").attr('src', dayIcon);

temperature = (stormData.list[i].main.temp);
var weekTemp = $("<p>").html("Temp: " + temperature + "\xB0F");
var weekHum = $("<p>").html("Humidity: " + stormData.list[i].main.humidity + "%");
var weekWind = $("<p>").html("Wind Speed: " + stormData.list[i].wind.speed + "MPH");


div.append(headerDay);
div.append(iconImg);
div.append(weekTemp);
div.append(weekHum);
div.append(weekWind);
fiveDays.append(div);

}

$('#stormData').show();

}


//event listeners for search btn or userinput
// searching.on("click", onSearchClick);
// function onSearchClick() {
//   var cityName = userIn.val();
// //   if (cityName == ''){
// //     return;
// //   }else {
// //     presentData(cityName);
// //     addRecentSearch(cityName);
// //   }
//   getLongitudeLatitude(cityName);
// }

//new function takes city name from search btn
// function getLongitudeLatitude(name) {
//   console.log(name);
//   fetch(
//     `https://api.openweathermap.org/data/2.5/forecast?q=${name}&appid=${APIKey}`
//   )
//     .then(function (response) {
//       // console.log(response.json())
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       longitude = data.city.coord.lon;
//       latitude = data.city.coord.lat;
//       console.log(longitude, latitude);
//       getWeatherResults(longitude, latitude);
//     });
// }

//this will load from our localstorage
// getRecentSearch();


//event listeners for search items


//search history
// var dataCity = [];

// function addRecentSearch(cityName) {
//   $("#userSearchrecent").show();

//   //new element
//   var cityQuery = $("<li>");
//   cityQuery.addClass("group-item");
//   cityQuery.text(cityName);
//   //append the item
//   $("#userSearchrecent").append(cityQuery);

//   //new object
//   var objectCities = {
//     input: cityName,
//   };

//   citiesData.push(objectCities);

//   //localstorage
//   localStorage.setItem("searches", JSON.stringify(citiesData));
// }


//saves to local storage
// $("#user-recent-list").on("click", "li.group-item", function() {
//     var history = $(this).text();
      
//       weatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=`+ history +`&units=imperial&appid=${APIKey}`;
//       console.log(weatherURL);
//       fetch(weatherURL)
//       .then(response => response.json())
//       .then(data => {
//           longitude = data.coord.lon;
//           latitude = data.coord.lat;
//           var iconCode=data.weather[0].icon;
//           var iconURL = "https://openweathermap.org/img/wn/" + iconCode + ".png";
//       fetch(iconURL)
//           .then(data => {
//               icon.attr('src', data.url)
//           });
//           city.text(`${data.name} (${getDate(data.dt)})`);
//           presentData();
//       });
//     }); 

// get recently searched items
// function getRecentSearch() {
//   var searches = JSON.parse(localStorage.getItem("searches"));
//   if (searches != null) {
//     for (var i = 0; i < searches.length; i++) {
//       //create element to append
//       var newPlace = $("<li>");
//       newPlace.addClass("list-group-item");
//       newPlace.text(searches[i].input);
//       //list to append
//       $("#user-recent-list").append(newPlace);
//     }
//     $("#userSearchrecent").show();
//   } else {
//     $("userSearchrecent").hide();
//   }
// }



//function that will take user input city, state, country using fetch for longitude, latitude
// function usersData() {
//   var city_user = useIn.val();
//   stormURL =
//     "https://api.openweathermap.org/data/2.5/weather?q=" +
//     city_user +
//     `&units=imperial&appid=${APIKey}`;
//   console.log(stormURL);
//   then((response) => response.JSON());
//   then((data) => {
//     longitude = data.city.coord.lon;
//     latitude = data.city.coord.lat;
//     var icoding = data.weather[0].icon;
//     var iurl = "https://openweathermap.org/img/wn/" + icoding + ".png";
//     fetch(iurl);
//     then((data) => {
//       icon.attr("src", data.url);
//     });
//     city.text(`${data.name} (${getDateEl(data.dt)})`);
//     getWeatherResults();
//   });
// }

//build next function to process long and lat
// function getWeatherResults(lon, lat) {
//     console.log(lon, lat);
//     var result = fetch(
//       `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`
//     )
//       .then(function (response) {
//         return response.json();
//       })
//       .then(function (data) {
//         console.log(data);
  
//         // check the response from API to find the fields on data object, should be in the "list" and choose the "12" for noon
//         temp.text(`Current Temp: ${data.list[12].main.temp}`);
//               windy.text(`Wind: ${data.list[12].wind.speed} MPH`);
//             humidity.text(`Humidity: ${data.list[12].main.humidity}%`);
  
//       });
//   }


//function will be for established time (day, month year)
// function getDateEl(unix_time) {
//   var currentdate = new Date(unix_time * 1000);
//   var mm = date.getMm() + 1;
//   var dd = date.getDd();
//   var yyyy = date.getFullYear();
//   return `${yyyy}/${dd}/${mm}`;
// }

//this loop is for the preset buttons for cities meant to update weather

// this will be the click event for the preset buttons
