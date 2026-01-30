const drinkBtn = document.getElementById('drinkBtn');
const logList = document.getElementById('logList');
const currentTimeDiv = document.getElementById('currentTime');
const toastDiv = document.getElementById('toast');
const reminderToggle = document.getElementById('reminderToggle');
const goalInput = document.getElementById('goalInput');

function showToast(message, duration = 3000) {
    toastDiv.textContent = message;
    toastDiv.classList.add('show');
    setTimeout(() => {
        toastDiv.classList.remove('show');
    }, duration);
}

function formatDate(date) {
    return date.toLocaleString();
}

// Retrieve stored data
let logs = JSON.parse(localStorage.getItem('waterLogs')) || [];
let lastDrink = localStorage.getItem('lastDrinkTime');
let lastDrinkTime = lastDrink ? new Date(lastDrink) : null;
let reminderEnabled = reminderToggle.checked;
let dailyGoal = parseInt(goalInput.value, 10) || 8;

function renderLogs() {
    logList.innerHTML = '';
    logs.slice().reverse().forEach(entry => {
        const li = document.createElement('li');
        li.textContent = entry;
        logList.appendChild(li);
    });
}

function updateCurrentTime() {
    const now = new Date();
    currentTimeDiv.textContent = `Current time: ${now.toLocaleTimeString()}`;
}

// Update time every second
setInterval(updateCurrentTime, 1000);

// Reminder check every minute
setInterval(() => {
    if (reminderToggle.checked && lastDrinkTime) {
        const now = new Date();
        if (now - lastDrinkTime >= 15 * 60 * 1000) {
            showToast('Time to drink water!');
            lastDrinkTime = now; // reset to avoid repeated toasts
        }
    }
}, 60 * 1000);

drinkBtn.addEventListener('click', () => {
    const now = new Date();
    const entry = formatDate(now);
    logs.push(entry);
    localStorage.setItem('waterLogs', JSON.stringify(logs));
    localStorage.setItem('lastDrinkTime', now.toISOString());
    lastDrinkTime = now;
    renderLogs();
    showToast('Water drank!');
});

reminderToggle.addEventListener('change', () => {
    localStorage.setItem('reminderEnabled', reminderToggle.checked);
});

goalInput.addEventListener('change', () => {
    const val = parseInt(goalInput.value, 10) || 8;
    localStorage.setItem('dailyGoal', val);
});

// Load initial settings
reminderToggle.checked = localStorage.getItem('reminderEnabled') === 'true';
goalInput.value = localStorage.getItem('dailyGoal') || 8;

// Initial rendering
renderLogs();
updateCurrentTime();
