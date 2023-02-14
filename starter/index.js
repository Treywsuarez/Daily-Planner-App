// Get the current date and time using Moment.js
var currentDate = moment();
var currentHour = currentDate.hour();

// Display the current day at the top of the calendar
document.getElementById("currentDay").innerHTML = currentDate.format("dddd, MMMM Do YYYY");
