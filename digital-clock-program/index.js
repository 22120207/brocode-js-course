const digital_clock = document.getElementById("digital-clock");

function updateClock() {
    const now = new Date();

    const hours = now.getHours().toString().padStart(2, 0);
    const minutes = now.getMinutes().toString().padStart(2, 0);
    const seconds = now.getSeconds().toString().padStart(2, 0);

    const timeString = `${hours}:${minutes}:${seconds}`;

    digital_clock.textContent = timeString;
}

updateClock();
setInterval(updateClock, 990);