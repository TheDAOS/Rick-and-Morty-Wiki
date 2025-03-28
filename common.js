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

let randomCharacter = {
    url: 'https://rickandmortyapi.com/api/character',
    characterURL: '',
    character: null,
    run: async function () {
        await this.getCharacterURL();
        this.redirectToCharacter();
        await this.fetchCharacterData();
    },
    openCharacterDetails: async function (url, id) {
        this.characterURL = url + '/' + id;
        this.redirectToCharacter();
        await this.fetchCharacterData();
        console.log(this.character);
    },
    redirectToCharacter: function () {
        window.location.href = 'character.html';
    },
    fetchCharacterData: async function () {
        try {
            const response = await fetch(this.characterURL);
            const data = await response.json();

            this.character = data;
            // console.log(this.character);
        } catch (error) {
            console.log(error);
        }
    },
    getCharacterURL: async function () {
        const id = await this.getRandomCharacterID();
        this.characterURL = this.url + '/' + id;
    },
    getRandomCharacterID: async function () {
        const max = await getTotalCharacters(this.url);
        const random = Math.floor(Math.random() * (max - 1 + 1)) + 1;
        // console.log(random);
        return random;

        async function getTotalCharacters(url) {
            try {
                const response = await fetch(url)
                const data = await response.json();

                return data.info.count;
            } catch (error) {
                console.log(error);
            }
            return 1;
        }
    },

}

function clock() {
    const now = new Date();
    let time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
    const weekDays = [
        'Sunday', 'Monday', 'Tuesday',
        'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ];
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    time += " " + `${weekDays[now.getDay()]} ${months[now.getMonth()]} ${now.getDate()} ${now.getFullYear()}`
    document.getElementById('footer').innerText = time;
}

setInterval(clock, 1000);
