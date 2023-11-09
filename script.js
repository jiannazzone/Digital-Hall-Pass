const timeElement = document.getElementById('current-time');
const dateElement = document.getElementById('current-date');

setInterval(function () {
    const currentDate = new Date();
    const dateText = currentDate.getMonth() + "/" + currentDate.getDay() + "/" + currentDate.getFullYear();
    const timeText = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
    dateElement.innerText = dateText;
    timeElement.innerText = timeText;
}, 1000);