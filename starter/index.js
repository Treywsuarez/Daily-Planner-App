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

        // Declare a variable to store the current input activity in local storage
        let currentInputActivity = `inputActivity${index}`;
        // Get the stored schedule for this hour
        let storedSchedule = localStorage.getItem(currentInputActivity);

        // If there is a stored schedule
        if (storedSchedule) {
            // Split the stored schedule into its parts
            let splitInputActivity = storedSchedule.split("<>");
            // If the stored schedule is from today
            if (splitInputActivity[1] === today) {
                // Set the value of the schedule input to the stored activity
                scheduleInput.val(splitInputActivity[0]);
            } else {
                // If the stored schedule is not from today, remove it from local storage
                localStorage.removeItem(currentInputActivity);
            }
        }

        // Create a save button element
        let saveButton = $("<button>")
            .addClass("saveBtn col-2")
            .html("<i class='fas fa-save'></i>");

        // When the save button is clicked
        saveButton.click(function () {
            // Save the current schedule to local storage with the date
            localStorage.setItem(
                currentInputActivity,
                scheduleInput.val() + "<>" + today
            );

            // If there is a previous timeout, clear it
            if (timeout != null) {
                clearTimeout(timeout);
            } else {
                // If there is no previous timeout, add the save message to the page
                $(".jumbotron").append(saveMessage);
            }

            // Set a timeout for the save message to disappear, 3 seconds
            timeout = setTimeout(function () {
                saveMessage.remove();
                timeout = null;
            }, 3000);
        });

        timeBlock.append(hourElement).append(scheduleInput).append(saveButton);

        $(".container").append(timeBlock);

    });

    // check if the hour is in the past present or future and assign a class
    for (let i = 0; i < hours.length; i++) {

        // starts at 0 so +9 (0 + 9) so that it represents 9am
        let eachtimeBlock = moment().hour(i + 9);
        // input-${i} corresponds with the unique id of each element 
        let currentIndex = $(`#input-${i}`);

        if (moment().isBefore(eachtimeBlock)) {
            currentIndex.addClass("future");
        } else if (moment().isAfter(eachtimeBlock)) {
            currentIndex.addClass("past");
        } else {
            currentIndex.addClass("present");
        }
    }
});

