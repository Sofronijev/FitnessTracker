//get all information when app starts
showHomeScreen();
//calculates last 5 days and shows them on the screen
last5Days();

//clicking on any day will show detailed information about that day
document.getElementById("week").addEventListener("click", function (ev) {
    let clickedElement = ev.target;
    //we are looking for element with data-date
    if (clickedElement.hasAttribute("data-date")) {
        let date = clickedElement.getAttribute("data-date");
        showDetailedInfo(date);
        //removes "active" state from day
        let days = document.querySelectorAll(".day");
        days.forEach(day => {
            day.classList.remove("dayActive");
        });
        //changes background to look "active"
        clickedElement.classList.add("dayActive");
        //classes for animation
        document.getElementById("dayDetails").classList.add("slideIn");
        document.getElementById("home").classList.remove("slideLeft");
    }
});
//clicking on back button will return to home screen
document.getElementById("backBtn").addEventListener("click", function () {
    let days = document.querySelectorAll(".day");
    //removes "active" state from day
    days.forEach(day => {
        day.classList.remove("dayActive");
    });
    //classes for animation
    document.getElementById("dayDetails").classList.remove("slideIn");
    document.getElementById("home").classList.add("slideLeft");

    showHomeScreen();
});

