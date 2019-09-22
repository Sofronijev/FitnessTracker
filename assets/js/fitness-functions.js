function showHomeScreen() {
    let request = new XMLHttpRequest();

    request.open('GET', 'https://api.myjson.com/bins/1gwnal', true);

    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            let data = JSON.parse(this.response);
            let stepsNum = 0;
            data.forEach(data => {
                stepsNum += data.steps;
            });
            //Set text in header
            document.getElementById('title').textContent = "Welcome!";
            document.getElementById('subtitle').textContent = "Overview of your activity";
            // calculating average time spent on activity during week (5 days)
            let avgSeconds = Math.round((stepsNum*0.5)/5);
            let hours = Math.floor(avgSeconds / 3600);
            let minutes = Math.round((avgSeconds%3600)/60); 
            // Calculating average distance in km with 2 decimal places for 5 days
            let avgDistance =(stepsNum*0.762/1000/5).toFixed(2);

            //adds average time spent on activity during week (5 days)
            document.getElementById('avgTime').textContent = `${hours}h ${minutes}min`;
            // adds total number of steps to the screen, toLocaleString adds comma tu number
            document.getElementById('numOfSteps').textContent = stepsNum.toLocaleString();
            //adds total number of burned calories to the screen
            document.getElementById('numOfCalories').textContent = Math.round(stepsNum * 0.05);
            //adds average distance to the screen          
            document.getElementById('avgKm').textContent = avgDistance;

        } 
    }
    request.send();
}