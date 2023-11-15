// UNIVERSAL METHODS

// Gets the school name
const parameters = new URLSearchParams(document.location.search);
const schoolName = decodeURIComponent(parameters.get('school'));
if (schoolName != 'null') {
    document.getElementById('title').innerHTML = schoolName.toUpperCase() + ' HALL PASS';
}

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
let duration = 5;
function updateDuration(action) {
    let increment = 5;
    if (action == "increase" && duration < 45) {
        duration += increment;
    } else if (action == "decrease" && duration > 5) {
        duration -= increment;
    }
    console.log(duration)
    const durationText = document.getElementById('duration-value');
    durationText.setAttribute('data-value', duration);
    durationText.innerHTML = duration + ' minutes'

}

function requestPass() {
    const studentName = document.getElementById('student-name-input').value;
    const studentDestination = document.getElementById('destination-input').value;
    const studentDuration = document.getElementById('duration-value').getAttribute('data-value');


    // Check for invalid inputs
    if (studentName == '' | studentDestination == '' | studentDuration == '') {
        alert('Please complete both fields before requesting a pass.');
        return;
    }

    // Scan the QR code
    document.getElementById('header').style.display = 'none';
    document.getElementById('scanner-container').style.display = 'block';
    document.getElementById('request-container').style.display = 'none';
    const videoElem = document.getElementById('qr-scanner');

    const qrScanner = new QrScanner(
        videoElem,
        result => {
            // Generate URL parameter string
            let urlParameters = 
                'name=' + encodeURIComponent(studentName) + 
                '&destination=' + encodeURIComponent(studentDestination) + 
                '&duration=' + encodeURIComponent(studentDuration) +
                '&school=' + encodeURIComponent(schoolName) +
                '&teacherName=' + result.data +
                '&date=' + encodeURIComponent(new Date());
            qrScanner.stop();
            window.location.href = 'pass.html?' + urlParameters;
        },
        {returnDetailedScanResult: true}, 
    );
    qrScanner.start();
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
    const teacherName = decodeURIComponent(parameters.get('teacherName'));

    const studentDate = passDate.toLocaleDateString();
    const studentStart = new Date(passDate.getTime() + 60000);
    studentEnd = new Date(studentStart.getTime() + duration*60000);

    // Add parameters to HTML
    document.getElementById('student-name').innerHTML = studentName;
    document.getElementById('destination').innerHTML = studentDestination;
    document.getElementById('date').innerHTML = studentDate;
    document.getElementById('start').innerHTML = studentStart.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    document.getElementById('end').innerHTML = studentEnd.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    document.getElementById('teacher-signature').innerHTML = teacherName;

    updateBackgroundColor();
    setInterval(updateBackgroundColor, 6000);
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