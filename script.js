let characterData = [];
let api = `https://rickandmortyapi.com/api/character`;

let pagedData = [];
let currentPage = 0;


document.body.onload = async () => {
    await loadPage(currentPage);
    display(currentPage);
}
console.log(pagedData);

// loadPage(0);
// loadPage(1);
// loadPage(2);
// loadPage(3);
// loadPage(4);
// loadPage(5);

async function loadPage(page) {
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
        console.log(pagedData);
    }
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


function display(page) {
    const div = document.getElementById('displayCharacter');

    pagedData[page].forEach(element => {
        console.log(element);
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

        card.appendChild(cardData);
        div.appendChild(card)
    });
}