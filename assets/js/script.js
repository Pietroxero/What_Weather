//setting variables to be used

var requestUrl =
  "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}";
var APIKey = "ba85e2551d84032dd058206d20a27efe";
var city = $("#travel");
var currently = $("#currentPlace");
var temp = $("#temp");
var humidity = $("#humidity");
var windy = $("#wind");
var future = $("#futureDays");
var searching = $("#searchBtn");
var userIn = $("#userInput");
var icon = $("#icon");
var longitude = "";
var latitude = "";


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

//clear button function
// $("#clearhistoryBtn").on("click", function () {
//   localStorage.clear();
//   $("user-recent-list").empty();
// });

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
