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

    // Loop through the hours and create time blocks for each hour
    hours.forEach((hour, index) => {
        // Create a time block element
        let timeBlock = $("<div>").addClass("time-block row");
        // Create an element for the hour
        let hourElement = $("<div>").addClass("hour col-2").text(hour);
        // Create an input element for the schedule
        let scheduleInput = $("<input>")
            .addClass("scheduleInput col-8")
            .attr("id", `input-${index}`); // Set a unique id for each input