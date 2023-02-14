$(document).ready(function () {

    // Get the current date and time and display it on the page
    let today = moment().format("dddd Do MMMM, YYYY");
    $("#currentDay").text(today);

    // Define an array to store the time values for each hour
    let hours = [];

    // Loop through the hours from 9am to 5pm and format them
    for (let i = 9; i <= 17; i++) {
        let hour = (i < 12 ? i + "am" : (i === 12 ? i + "pm" : (i - 12) + "pm"));
        hours.push(hour);
    }

    // Declare a variable to store the timeout for the save message
    let timeout;
    // Create a save message element
    let saveMessage = $("<p>").addClass("message").text("Your actvity has been saved");