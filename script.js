let characterData = [];
let api = `https://rickandmortyapi.com/api/character`;

let pagedData = [];

let pageControl = {
    page: 0,
    maxPages: 0,
    getMaxPage: async function () {
        const response = await fetch(api);
        const data = await response.json();
        this.maxPages = Math.ceil(data.info.count / 6);
    },
    showPage: async function () {
        await loadPage(this.page);
        window.scrollTo(300, 0);
    },
    previousPage: async function () {
        if (this.page > 0) {
            this.page--;
            await this.showPage();
        }
    },
    nextPage: async function () {
        if (this.page <= this.maxPages) {
            this.page++;
            await this.showPage();
        }
    },
}

document.body.onload = () => {
    pageControl.showPage();
    pageControl.getMaxPage();
}

async function getData() {
    try {
        if (api) {
            const response = await fetch(api);
            const data = await response.json();

            api = data.info.next;
            // console.log("fetch ", data.results);
            return data.results;
        }
    } catch (error) {
        console.log(error);
    }
    return [];
}

async function loadPage(page) {
    // console.log(page);
    if (page % 4 === 0) {
        let newData = [];
        for (let i = 0; i < 3; i++) {
            const data = await getData();
            if (data) newData = newData.concat(data);
        }
        characterData = [...characterData, ...newData];
        // console.log(characterData);

        pagedData = []
        for (let i = 0; i < characterData.length; i++) {
            if (i % 6 !== 0) {
                pagedData[pagedData.length - 1].push(characterData[i]);
            } else {
                pagedData.push([characterData[i]])
            }
        }
        // console.log(pagedData);
    }
    // console.log(page);
    display(page);
}

function display(page) {
    document.getElementById('showPageNo').innerText = page + 1;
    const div = document.getElementById('displayCharacter');
    div.innerHTML = '';

    pagedData[page].forEach(element => {
        // console.log(element);
        const card = document.createElement('div');
        card.className = 'card';

        const image = document.createElement('img');
        image.src = element.image;
        image.alt = element.name;
        card.appendChild(image);

        const cardData = document.createElement('div');
        cardData.className = 'card-data';

        const name = document.createElement('h2');
        name.innerText = element.name;
        cardData.appendChild(name);

        const status = document.createElement('p');
        status.innerText = element.status + " - " + element.species;
        cardData.appendChild(status);

        const grey1 = document.createElement('p')
        grey1.className = 'grey';
        grey1.innerText = 'Last known location: ';
        cardData.appendChild(grey1)

        const origin = document.createElement('p')
        origin.innerText = element.origin.name;
        cardData.appendChild(origin)

        const grey2 = document.createElement('p')
        grey2.className = 'grey';
        grey2.innerText = 'First seen in: ';
        cardData.appendChild(grey2)

        const firstSeen = document.createElement('p');
        fetch(element.episode[0])
            .then(response => response.json())
            .then(data => firstSeen.innerText = data.name)
            .catch(error => firstSeen.innerText = "Unknown")
        cardData.appendChild(firstSeen)

        card.appendChild(cardData);
        div.appendChild(card)
    });
}