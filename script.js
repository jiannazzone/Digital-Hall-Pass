const currentTimeElement = document.getElementById('current-time');
const currentDateElement = document.getElementById('current-date');

setInterval(function () {
    const currentDate = new Date();
    const dateText = currentDate.toLocaleDateString();
    const timeText = currentDate.toLocaleTimeString();
    currentDateElement.innerText = dateText;
    currentTimeElement.innerText = timeText;
}, 1000);

function getURLData() {
    const thisURL = window.location.href;
    const parameters = new URLSearchParams(thisURL);
    const validDate = parameters.getAll('date');
    const startTime = parameters.getAll('time');
    const duration = parameters.getAll('duration');
    console.log(validDate + ' - ' + startTime + ' - ' + duration);
}

function requestPass() {
    const studentName = document.getElementById('student-name-input').value;
    const studentDestination = document.getElementById('destination-input').value;
    const studentDuration = document.getElementById('duration-input').value;


    // Check for invalid inputs
    if (studentName == "" | studentDestination == "" | studentDuration == "") {
        alert("Please complete all three forms before requesting a pass.");
        return;
    }

    try {
        studentDuration = float(studentDuration);
        studentDuration = studentDuration.toFixed();
    } catch (error) {
        alert("Please enter a valid whole number for your pass duration.");
        
    }

    console.log(studentName);
    console.log(studentDestination);
    console.log(studentDuration);
}

function updateDuration() {
    const duration = document.getElementById('duration-input').value;
    const durationDisplay = document.getElementById('duration-display').innerHTML = duration + ' minutes';
}