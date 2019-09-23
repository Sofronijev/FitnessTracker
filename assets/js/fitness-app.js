//get all information when app starts
showHomeScreen();
//calculates last 5 days and shows them on screen
last5Days();

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

document.getElementById("backBtn").addEventListener("click", function () {
    let days = document.querySelectorAll(".day");
    days.forEach(day => {
        day.classList.remove("dayActive");
    });
    document.getElementById("dayDetails").classList.remove("slideIn");
    document.getElementById("home").classList.add("slideLeft");

    showHomeScreen();
});

