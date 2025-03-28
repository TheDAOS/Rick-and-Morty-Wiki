function darkMode() {
    const mode = document.getElementById('mode');
    const root = document.documentElement;

    if (localStorage.getItem('mode') === "Dark Mode") {
        mode.innerText = 'Light Mode';
        localStorage.setItem('mode', 'Light Mode');
        root.style.setProperty('--color-3', 'ghostwhite');
    } else {
        mode.innerText = 'Dark Mode';
        localStorage.setItem('mode', 'Dark Mode');
        root.style.setProperty('--color-3', '#000E0F');
    }
}

if (localStorage.getItem('mode') === "Light Mode") {
    document.getElementById('mode').innerText = 'Light Mode';
    document.documentElement.style.setProperty('--color-3', 'ghostwhite');
}