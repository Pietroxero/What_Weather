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


//This section will be for the searching.on click functionality
searching.on('click', function (event) {
    
    event.preventDefault(); //added in prevent.default to prevent search results from not appearing in local
    var cityInput = userIn.val()
    if (cityInput == '') {
        return;
    } else {
        //line 27 found to cause an error in the console.log uncertain why so commented out
        currentlyData(cityInput);
        addRecentlySearched(cityInput);
    }
//   var cityname = useIn.val();
//   getLongitudeLatitude(cityname);
});



//search History

getRecentlySearched();

var locationData = [];

function addRecentlySearched(cityInput) {
    $('#userSearchrecent').show();

    //now we append li in the html
    var newSpot = $('<li>');
    newSpot.addClass('group-list');
    newSpot.text(cityInput);
    $('#user-recent-list').append(newSpot)

    var localObject = {
        cityInput: cityInput
    };
    locationData.push(localObject);

    //This will be adding values to localStorage
localStorage.setItem('search', JSON.stringify(locationData));

}

//this is where we get the recent items from localstorage
function getRecentlySearched () {
    var search = JSON.parse(localStorage.getItem('search'));
    if(search != null) {
        for (var i = 0; i < search.length; i++) {
            // new li creation similar to the above and appending
            var newSpot = $('<li>');
    newSpot.addClass('group-list');
    newSpot.text(search[i].cityInput);
    $('user-recent-list').append(newSpot);
        }
        $('#userSearchrecent').show();
    }else {
        $('#userSearchrecent').hide();
    }
}

//this is for clear button when user clicks will clear history
$("#clearhistoryBtn").on("click", function () {
    localStorage.clear();
    $("user-recent-list").empty();
  });

  //event listener for search btn/user input 'Let's GO
userIn.keypress(function(event){
    if (event.keycode === 13) {
        currentlyData(userIn.val())
        addRecentlySearched(userIn.val());
    }
});

  //This will be the click list event for searched items by the user
$('#user-recent-list').on('click', 'li.group-list', function(){
var userHistory = $(this).text();
stormsURL = `https://api.openweathermap.org/data/2.5/forecast?q=` + userHistory + `&units=imperial&appid=${APIKey}`;
//fetch request
fetch (stormsURL)
.then(response => response.json())
.then(data => {
longitude = data.city.coord.lon;
latitude = data.city.coord.lat;
var codeIcon = data.weather[0].icon;
var urlIcon = "https://openweathermap.org/img/wn/" + codeIcon + ".png";
//fetch request for the icon url above
fetch (urlIcon)
.then(data => {
    icon.attr('src', data.url)
});
Travel.text(`${data.name} (${getTimeyWimey(data.dt)})`);
todaysWeather();
});
});

//In this section we are taking the users input
//this input can be city name, state from the api
function currentlyData() {
    var userCityName = userIn.val();
    cloudyURL = `https://api.openweathermap.org/data/2.5/forecast?q=` + userCityName + `&units=imperial&appid=${APIKey}`;
    //changed from 'stormsURL' to avoid confusion for myself
    //recycled from line 92 event listener
//fetch request
fetch (cloudyURL)
.then(response => response.json())
.then(data => {
longitude = data.coord.lon;
latitude = data.coord.lat;
var codeIcon = data.weather[0].icon;
var urlIcon = "https://openweathermap.org/img/wn/" + codeIcon + ".png";
//fetch request for the icon url above
fetch (urlIcon)
.then(data => {
    icon.attr('src', data.url)
});
travel.text(`${data.name}`);
todaysWeather();
});
};

//This will be our date that will append to the page and the cards
function getTimeyWimey(){
    var month = data.getMonth();+1
    var day = data.getDate();

    var year = data.getFullYear();
    // var date = new Date(unix_time*1000);
    return`${year}/${month}/${day}`;
}


//in this area I will be using the API call to get the longitude and latitude
 function todaysWeather(lon, lat) {
      console.log(lon, lat);
      var result = fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
    
          // check the response from API to find the fields on data object, should be in the "list" and choose the "12" for noon
           temp.text(`Current Temp: ${data.list[12].main.temp}`);
           windy.text(`Wind: ${data.list[12].wind.speed} MPH`);
           humidity.text(`Humidity: ${data.list[12].main.humidity}%`);

//repeat in a loop to create cards for the preceding 5 day forecast
   futureDays.empty();

   var dazeArray = data.daily;
   for (var i=0; i<5; i++){
    var codeIcon = data.weather[0].icon;
var urlIcon = "https://openweathermap.org/img/wn/" + codeIcon + ".png"; 
fetch(urlIcon)
.then(data =>{
    $('#fiveIcon').attr('src', data.url);
});

multiFiveCards(getTimeyWimey(data.list[i].dt), urlIcon, data.list[i].main.temp, data.list[i].wind.speed, data.list[i].main.humidity);

   }

        });
    };        
    
//these are meant to manipulate our DOM elements.
function multiFiveCards(date, temp, wind, humidity) {
    futureDays.append(`<div class="card d-inline-flex mx-3" style ="width: 13rem; border-radius: 30px; background-color: grey;">
    <div class ="card-body text-center" id='futureDays'>
  <h5 class = "card-title" id = 'card-title'>${date}</h5>
  <img id ='fiveIcon' src =${icon}>
  <h6 class = "card-subtitle mb-2 text-muted" id = 'temp'>High ${temp}</h6>
  <h6 class = "card-subtitle mb-2 text-muted" id = 'temp'>High ${wind} MPH </h6>
  <h6 class = "card-subtitle mb-2 text-muted" id = 'temp'>High ${humidity}</h6>  
  </div>
  </div>`);
}

// searching.on("click", onSearchClick);
// function onSearchClick() {
//   var cityname = useIn.val();
//   getLongitudeLatitude(cityname);
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
//       usersData();
//     });
// }

//build next function to process long and lat
// function getWeatherResults(lon, lat) {
//   console.log(lon, lat);
//   var result = fetch(
//     `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`
//   )
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);

//       // check the response from API to find the fields on data object, should be in the "list" and choose the "12" for noon
//        temp.text(`Current Temp: ${data.list[12].main.temp}`);
//        windy.text(`Wind: ${data.list[12].wind.speed} MPH`);
//        humidity.text(`Humidity: ${data.list[12].main.humidity}%`);

//       //repeat in a loop to create cards for the preceding 5 day forecast
//       weekDays.empty();

    //   console.log(data.daily);
    //   var dazeArray = data.daily;
    //   for (var i = 0; i < 5; i++) {
    //     var iconData = dazeArray[i].weather[0].icon;
    //     var iurl = "https://openweathermap.org/img/wn/" + iconData + ".png";
    //     fetch(iurl).then((data) => {
    //       $("fiveDayIcon").attr("src", data.url);
    //     });
    //     fivescards(
    //       getDateEl(dailyArray[i].dt),
    //       iurl,
    //       dailyArray[i].temp.max,
    //       dailyArray[i].temp.min,
    //       dailyArray[i].wind.speed,
    //       dailyArray[i].humidity
    //     );
    //   }
//     });
// }

//search history
// var dataCity = [];

// function addRecentSearch(cityname) {
//   $("#recently-searched-list").show();

//   //new element
//   var cityQuery = $("<li>");
//   cityQuery.addClass("list-group-item");
//   cityQuery.text(cityname);
//   //append the item
//   $("#recently-searched-list").prepend(cityQuery);

//   //new object
//   var objectCities = {
//     input: cityname,
//   };

//   citiesData.push(objectCities);

//   //localstorage
//   localStorage.setItem("searches", JSON.stringify(citiesData));
// }

//load for recent searches from localstorage
// getSearches();

// get recently searched items
// function getSearches() {
//   var searches = JSON.parse(localStorage.getItem("searches"));
//   if (searches != null) {
//     for (var i = 0; i < searches.length; i++) {
//       //create element to append
//       var newPlace = $("<li>");
//       newPlace.addClass("list-group-item");
//       newPlace.text(searches[i].input);
//       //list to append
//       $("#recently-searched-list").prepend(newPlace);
//     }
//     $("#recently-searched").show();
//   } else {
//     $("recently-searched").hide();
//   }
// }

//clear button function


//function that will take user input city, state, country using fetch for longitude, latitude
// function usersData() {
//   var city_user = useIn.val();
//   stormURL =
//     "https://api.openweathermap.org/data/2.5/forecast?q=" +
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



//this loop is for the preset buttons for cities meant to update weather
var placeNames = [
    "Seattle",
    "Chicago",
    "Los Angeles",
    "Orlando",
    "San Francisco",
    "Austin",
    "Portland",
    "Atlanta",
  ];
  var uscity = [
    $("Washington"),
    $("Illinois"),
    $("Cali"),
    $("Florida"),
    $("San"),
    $("Texas"),
    $("Port"),
    $("Georgia"),
  ];
  for (var i = 0; i < uscity.length && placeNames.length; i++) {
    uscity[i].on("click", () => {
      stormFrontURL =
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
        placeNames[i] +
        `&units=imperial&appid=${APIKey}`;
      fetch(stormFrontURL);
then(response => response.json())
.then(data => {
longitude = data.city.coord.lon;
latitude = data.city.coord.lat;
var codeIcon = data.weather[0].icon;
var urlIcon = "https://openweathermap.org/img/wn/" + codeIcon + ".png";
//fetch request for the icon url above
fetch (urlIcon)
.then(data => {
    icon.attr('src', data.url)
});
Travel.text(`${data.name} (${getTimeyWimey(data.dt)})`);
todaysWeather();
      });
    });
  }

//function will be for established time (day, month year)
// function getDateEl(unix_time) {
//   var currentdate = new Date(unix_time * 1000);
//    var mm = date.getMm() + 1;
//   var dd = date.getDd();
//   var yyyy = date.getFullYear();
//   return `${yyyy}/${dd}/${mm}`;
// }




// this will be the click event for the preset buttons
// $("#presets").on('click', ".my-1", function(){
//     var city = $(this).text()
//     console.log(city);
//     var stormURL =
//       "https://api.openweathermap.org/data/2.5/weather?q=" +
//       city +
//       `&units=imperial&appid=${APIKey}`;
//     fetch(stormURL)
//     .then((response) => response.json())
//     .then((data) => {
//         console.log(data);
//       longitude = data.coord.lon;
//       latitude = data.coord.lat;
//       var icoding = data.weather[0].icon;
//       var iurl = "https://openweathermap.org/img/wn/" + icoding + ".png";
//       fivescards(data.dt, data.main.temp, data.main.temp_max, data.wind.speed, data.main.humidity, iurl);
//     //   fetch(iurl)
//     //   .then((data) => {
//     //     var icon = document.createElement("img")
//     //     icon.setAttribute("src", data.url);
//     //   });
//       city.text(`${data.name} (${getDateEl(data.dt)})`);
//       getWeatherResults();
//     });
// })