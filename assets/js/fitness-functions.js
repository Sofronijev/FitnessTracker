function showHomeScreen() {

    //removes back button and detailed information about one day
    document.getElementById("backBtn").style.display = "none";
    document.getElementById("dayDetails").style.display = "none";
    //removes class for lower opacity of header element
    document.getElementById("header").classList.remove("lowOpacity");
    //change title font color
    document.getElementById("title").classList.remove("whiteText");
    //change subtitle font color and opacity
    document.getElementById("subtitle").classList.remove("whiteText");
    //change opacity of subtitle
    document.getElementById("subtitle").style.opacity = "1";
    // show review for the whole week
    document.getElementById("home").style.display = "block";
    //Set text in header
    document.getElementById("title").textContent = "Welcome!";
    document.getElementById("subtitle").textContent = "Overview of your activity";

    let request = new XMLHttpRequest();

    request.open("GET", "https://api.myjson.com/bins/1gwnal", true);

    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            //gets JSON data
            let data = JSON.parse(this.response);

            let stepsNum = 0;
            data.forEach(data => {
                stepsNum += data.steps;
            });

            // calculating average time spent on activity during week (5 days)
            let avgSeconds = Math.round((stepsNum * 0.5) / 5);
            let hours = Math.floor(avgSeconds / 3600);
            let minutes = Math.round((avgSeconds % 3600) / 60);
            // Calculating average distance in km with 2 decimal places for 5 days
            let avgDistance = (stepsNum * 0.762 / 1000 / 5).toFixed(2);
            //adds average time spent on activity during week (5 days)
            document.getElementById("avgTime").textContent = `${hours}h ${minutes}min`;
            // adds total number of steps to the screen, toLocaleString adds comma to number
            document.getElementById("numOfSteps").textContent = stepsNum.toLocaleString();
            //adds total number of burned calories to the screen
            document.getElementById("numOfCalories").textContent = Math.round(stepsNum * 0.05);
            //adds average distance to the screen          
            document.getElementById("avgKm").textContent = avgDistance;

        }
    }
    request.send();
}


function showDetailedInfo(selectedDate) {

    const daysInWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    // create date object from selected date
    const createDate = new Date(selectedDate);
    const day = createDate.getDay();
    const dayDate = createDate.getDate();
    const month = createDate.getMonth();
    const year = createDate.getFullYear();

    //shows back button and detailed information about one day
    document.getElementById("backBtn").style.display = "block";
    document.getElementById("dayDetails").style.display = "block";
    //lowers opacity of header element
    document.getElementById("header").classList.add("lowOpacity");
    //change title font color
    document.getElementById("title").classList.add("whiteText");
    //change subtitle font color and opacity
    document.getElementById("subtitle").classList.add("whiteText");
    document.getElementById("subtitle").style.opacity = "0.7";
    // hide review for the whole week
    document.getElementById("home").style.display = "none";
    //Set text in header
    document.getElementById("title").textContent = daysInWeek[day];
    document.getElementById("subtitle").textContent = `${months[month]} ${dayDate}, ${year}.`;

    let request = new XMLHttpRequest();

    request.open("GET", "https://api.myjson.com/bins/1gwnal", true);

    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            //gets JSON data
            let data = JSON.parse(this.response);

            let stepsNum = 0;
            data.forEach(data => {
                let date = new Date(data.timestamp);
                // finds selected date in JSON and calculates total number of steps for that day
                if (selectedDate === date.toDateString()) {
                    stepsNum += data.steps;
                }
            });
            let seconds = Math.round(stepsNum * 0.5);
            let hours = Math.floor(seconds / 3600);
            let minutes = Math.round((seconds % 3600) / 60);

            // if number of minutes is single digit add 0 before            
            minutes < 10 ? minutes = "0" + minutes : minutes;

            // adds total number of steps for selected date to the screen, toLocaleString adds comma to number
            document.getElementById("numDailySteps").textContent = stepsNum.toLocaleString();
            //converts number of steps into km for that day, number is fixed with two decimals
            document.getElementById("km").textContent = (stepsNum * 0.762 / 1000).toFixed(2);
            //converts number of steps into calories burned for that day
            document.getElementById("cal").textContent = Math.round(stepsNum * 0.05);
            //writes total time spent on physical activity
            document.getElementById("hours").textContent = `${hours}:${minutes}`;
        }
    }
    request.send();
}

//calculates last 5 days and shows them on screen
function last5Days() {

    for (let i = 0; i < 5; i++) {
        //because of limited number of days, today is set as 14.06.2019.
        let today = new Date(2019, 5, 14);
        today.setDate(today.getDate() - i);
        //starts from last child
        let day = document.querySelector("#week").children[4 - i];
        let dateString = today.toDateString();
        //sets data-date atribute
        day.dataset.date = dateString;
        //use dateString to get day and date
        let splitDate = dateString.split(" ");
        day.textContent = `${splitDate[2]} ${splitDate[0].toUpperCase()}`;
    }

}

