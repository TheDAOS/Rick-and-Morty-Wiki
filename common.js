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
    sendCharacterDetails: async function (id = null) {
        if (id) {
            this.characterURL = this.url + '/' + id;
        } else {
            await this.getCharacterURL();
        }
        localStorage.setItem('characterURL', this.characterURL);
        this.redirectToCharacter();
    },
    receiveCharacterDetails: async function () {
        this.characterURL = localStorage.getItem('characterURL')
        if (!this.characterURL) {
            await this.getCharacterURL();
        }
        await this.fetchCharacterData();
        this.displayCharacterData();
    },
    randomCharacterButton: async function () {
        await this.getCharacterURL();
        localStorage.setItem('characterURL', this.characterURL);
        await this.fetchCharacterData();
        this.displayCharacterData();
    },
    redirectToCharacter: function () {
        window.location.href = 'character.html';
    },
    fetchCharacterData: async function () {
        try {
            const response = await fetch(this.characterURL);
            const data = await response.json();

            this.character = data;
            console.log(this.character);
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
    displayCharacterData: async function () {
        const div = document.getElementById('displayCharacter');
        div.innerHTML = '';
        const card = document.createElement('div');
        card.className = 'character-card';


        const image = document.createElement('img');
        image.src = this.character.image;
        image.alt = this.character.name;
        image.style.borderRadius = '8px';
        card.appendChild(image)

        const name = document.createElement('h2');
        name.innerText = this.character.name;
        card.appendChild(name)



        div.appendChild(card);
    }
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
