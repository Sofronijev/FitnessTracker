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
        let days = document.querySelectorAll(".day");
        days.forEach(day => {
            day.classList.remove("dayActive");
        })
        clickedElement.classList.add("dayActive");
        document.getElementById("dayDetails").classList.add("slideIn");
        document.getElementById("home").classList.remove("slideLeft");
    }
});
//clicking on back button will return to home screen
document.getElementById("backBtn").addEventListener("click", function () {
    let days = document.querySelectorAll(".day");
    days.forEach(day => {
        day.classList.remove("dayActive");
    });
    document.getElementById("dayDetails").classList.remove("slideIn");
    document.getElementById("home").classList.add("slideLeft");

    showHomeScreen();
});

