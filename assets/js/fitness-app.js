//get all information when app starts
showHomeScreen();

document.getElementById("week").addEventListener("click", function (ev) {
    let clickedElement = ev.target;
    if (clickedElement.hasAttribute("data-date")) {
        let date = clickedElement.getAttribute("data-date");
        showDetailedInfo(date);
        let days = document.querySelectorAll(".day");
        days.forEach(day => {
            day.classList.remove("dayActive");
        })
        clickedElement.classList.add("dayActive");
    }
});

document.getElementById("backBtn").addEventListener("click", function () {
    let days = document.querySelectorAll(".day");
    days.forEach(day => {
        day.classList.remove("dayActive");
    })
    showHomeScreen();
});

