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
        name.innerText = "Name: " + this.character.name;
        card.appendChild(name)

        const status = document.createElement('div');
        status.innerText = "Status: " + this.character.status;
        card.appendChild(status)

        const species = document.createElement('div');
        species.innerText = "Species: " + this.character.species;
        card.appendChild(species)

        const type = document.createElement('div');
        type.innerText = "Type: " + (this.character.type || "Unknown");
        card.appendChild(type)

        const gender = document.createElement('div');
        gender.innerText = "Gender: " + this.character.gender;
        card.appendChild(gender)

        const origin = document.createElement('div');
        origin.innerText = "Origin: " + this.character.origin.name;
        card.appendChild(origin)

        const location = document.createElement('div');
        location.innerText = "Location: " + this.character.location.name;
        card.appendChild(location)

        const episodesLabel = document.createElement('div');
        episodesLabel.innerText = "Episodes: "
        card.appendChild(episodesLabel);

        const episodes = document.createElement('div');
        episodes.className = 'episodes';
        this.character.episode.forEach(epi => {
            const episode = document.createElement('div');
            episode.className = 'episode';

            fetch(epi)
                .then(response => response.json())
                .then(data => {
                    const episodeName = document.createElement('p');
                    episodeName.innerText = "Episode name: " + data.name;
                    episode.appendChild(episodeName)

                    const air_date = document.createElement('p');
                    air_date.innerText = "Air Date: " + data.air_date;
                    episode.appendChild(air_date)

                    const seasonAndEpisode = document.createElement('p');
                    seasonAndEpisode.innerText = "Episode: " + data.episode;
                    episode.appendChild(seasonAndEpisode)
                })


            episodes.appendChild(episode)
        });
        card.appendChild(episodes);

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
