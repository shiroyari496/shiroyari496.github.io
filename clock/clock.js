const unixTimeElement = document.getElementById('unix-time');
const localTimeElement = document.getElementById('local-time');
const utcTimeElement = document.getElementById('utc-time');

function toLocalISOTime(date) {
    'use strict';
    const pad = (num) => String(num).padStart(2, '0');

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    const tzOffset = -date.getTimezoneOffset();
    const tzSign = tzOffset >= 0 ? '+' : '-';
    const tzHours = pad(Math.floor(Math.abs(tzOffset) / 60));
    const tzMinutes = pad(Math.abs(tzOffset) % 60);

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${tzSign}${tzHours}:${tzMinutes}`;
}

function toUTCISOTime(date) {
    'use strict';
    return date.toISOString().replace(/\.\d+Z$/, 'Z');
}

function updateClock() {
    'use strict';
    const now = new Date();
    const unixTime = Math.floor(now.getTime() / 1000);
    const localTime = toLocalISOTime(now);
    const utcTime = toUTCISOTime(now);

    unixTimeElement.textContent = `${unixTime}`;
    localTimeElement.textContent = `${localTime}`;
    utcTimeElement.textContent = `${utcTime}`;

    const msUntilNextSecond = 1000 - now.getMilliseconds();
    setTimeout(updateClock, msUntilNextSecond);
}

updateClock();
