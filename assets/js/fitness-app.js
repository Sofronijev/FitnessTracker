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
        //function for showing detailed info screen
        showDetailedInfo(date);
        //removes "active" state from day
        let days = document.querySelectorAll(".day");
        days.forEach(day => {
            day.classList.remove("dayActive");
        });
        //changes background to look "active"
        clickedElement.classList.add("dayActive");
        //adds history state
        history.pushState({ date }, "", `${date}`);
    }
});
//clicking on back button will return to home screen
document.getElementById("backBtn").addEventListener("click", function () {
    let days = document.querySelectorAll(".day");
    //removes "active" state from day
    days.forEach(day => {
        day.classList.remove("dayActive");
    });
    showHomeScreen();
    //add location to history
    history.pushState(null, "", `./`);
});

window.addEventListener("popstate", ev => {
    if (ev.state !== null) {
        showDetailedInfo(ev.state.date);
        let days = document.querySelectorAll(".day");
        days.forEach(day => {
            day.classList.remove("dayActive");
            if (day.getAttribute("data-date") === ev.state.date) {
                //changes background to look "active"
                day.classList.add("dayActive");
            }
        });
    } else {
        showHomeScreen();
        //removes "active" state from day
        let days = document.querySelectorAll(".day");
        days.forEach(day => {
            day.classList.remove("dayActive");
        });
    }
});
