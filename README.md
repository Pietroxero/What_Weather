# What_Weather

## Description
The purpose of this project is to create a weather API service and use what we learned regarding fetch data requests. The idea for the this page
would be have a user input a city name (ex:Seattle) and have the current temperature, wind speed and humidity populate near the top of the page.
Along with that users would have the ability to clear their search history from localstorage.
Below that there 8 preset city buttons that a user could click on and have a 5 day forecast populate for the week based on the city that was clicked.

## User Stories
As A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly

## Acceptance Criteria
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city

## Table of contents
Description, user story, acceptance criteria, tests, screenshots, deployed site URL
## Tests
Much of the testing for this required multiple console.log(s) for functions. Along with checking if items were being grabbed from localstorage.
APIkey checks to ensure that I using the right key when creating fetch requests.

## Screenshots
![Screenshot](./assets/images/06-server-side-apis-homework-demo.png)

## Deployed website

(https://pietroxero.github.io/What_Weather/)