// UNIVERSAL METHODS

// Displays the current date and time
const currentTimeElement = document.getElementById('current-time');
const currentDateElement = document.getElementById('current-date');
let studentEnd;
let currentColor = 'darkgreen';

setInterval(function () {
    const currentDate = new Date();
    const dateText = currentDate.toLocaleDateString();
    const timeText = currentDate.toLocaleTimeString();
    currentDateElement.innerText = dateText;
    currentTimeElement.innerText = timeText;
}, 1000);

// END UNIVERSAL METHODS

// FORM.HTML METHODS
function updateDuration() {
    const duration = document.getElementById('duration-input').value;
    const durationDisplay = document.getElementById('duration-display').innerHTML = duration + ' minutes';
}

function requestPass() {
    const studentName = document.getElementById('student-name-input').value;
    const studentDestination = document.getElementById('destination-input').value;
    const studentDuration = document.getElementById('duration-input').value;


    // Check for invalid inputs
    if (studentName == '' | studentDestination == '' | studentDuration == '') {
        alert('Please complete all three forms before requesting a pass.');
        return;
    }

    // Generate URL parameter string
    let urlParameters = 'name=' + studentName + '&destination=' + studentDestination + '&duration=' + studentDuration;
    const safeDate = encodeURIComponent(new Date());
    urlParameters += '&date=' + safeDate;
    window.location.href = 'pass.html?' + urlParameters;
}

// END FORM.HTML METHODS

// PASS.HTML METHODS
// Gets URL search parameters for pass.html
function getURLData() {
    const parameters = new URLSearchParams(document.location.search);
    const studentName = parameters.get('name');
    const studentDestination = parameters.get('destination');
    const duration = parameters.get('duration');
    const passDate = new Date(decodeURIComponent(parameters.get('date')));

    const studentDate = passDate.toLocaleDateString();
    const studentStart = new Date(passDate.getTime() + 60000);
    studentEnd = new Date(studentStart.getTime() + duration*60000);

    // Add parameters to HTML
    document.getElementById('student-name').innerHTML = studentName;
    document.getElementById('destination').innerHTML = studentDestination;
    document.getElementById('date').innerHTML = studentDate;
    document.getElementById('start').innerHTML = studentStart.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    document.getElementById('end').innerHTML = studentEnd.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    
    updateBackgroundColor();
    setInterval(updateBackgroundColor, 6000);
}

function updateBackgroundColor() {
    
    
}

function updateBackgroundColor() {
    const date = new Date();
    const timeRemaining = studentEnd - date;

    // Update currentColor variable
    if (timeRemaining < 0) {
        currentColor = '#c80815'; // red
    } else if (timeRemaining <= 120000) {
        currentColor = '#ffc40c'; // yellow
    } else {
        currentColor = 'darkgreen';
    }

    // Apply Colors
    document.getElementsByTagName('body')[0].style.backgroundColor = currentColor;
    [...document.getElementsByClassName('color2')].forEach(element => {
        element.style.color = currentColor;
    });
}

// END PASS.HTML METHODS