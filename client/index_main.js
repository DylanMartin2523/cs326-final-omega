const range = document.getElementById('deg-range');
const degProgress = document.getElementById('deg-progress');
let degProgressColor = 'bg-warning';
let degProgressText = "grey";
degProgress.classList.add(degProgressColor);
let temp = 1;
let ghg = 0;
let mainRow = document.getElementById('main-row');
let mainRow2 = document.getElementById('main-row2');
function load() {
    range.addEventListener('mousemove', slide);
    range.addEventListener('mousedown', slide);
    function renderDisplay() {
        for (let i = 0; i < 2; i++) {
            let row = document.createElement("div");
            row.classList.add("row");
            row.classList.add("margin");
            row.id = `row${i}`;
            mainRow.appendChild(row);
        }
    }
    renderDisplay();
}
//synchronizes the position of range thumb with degProgress bar
function slide() {

    function roundTemp() {
        return Math.round(temp * 10) / 10;
    }
    async function globalTemps() {
        let globalTemps = await fetch('https://global-warming-cs326.herokuapp.com/global-temps.JSON', {})
            .then(response => response.json());
        globalTemps = globalTemps.data;
        temp = parseFloat(globalTemps[range.value]);
        degProgress.innerText = `${roundTemp()}°C`;
        degProgress.setAttribute('style', `width: ${Math.round((parseFloat(temp) / 0.030044444444444447 - (-.46 / 0.030044444444444447)) * 10) / 10}%`);
    }
    globalTemps();
    async function globalGHGs() {
        let globalGHGs = await fetch('https://global-warming-cs326.herokuapp.com/global-ghgs.JSON', {})
            .then(response => response.json());
        ghg = parseFloat(globalGHGs[range.value]);
        if (!isNaN(ghg)) {
            document.getElementById('year-ghg').innerText = `Year: ${range.value}\nGHGs: ${ghg} ppm [2]`;
        }
        else {
            document.getElementById('year-ghg').innerText = `Year: ${range.value}\n\n`;

        }
    }
    globalGHGs();
    async function getEffects() {
        let effects;
        if (range.value > 2021) {
            effects = await fetch('https://global-warming-cs326.herokuapp.com/future-effects.JSON')
                .then((response) => response.json());
        }
        else if (range.value < 2018) {
            effects = await fetch('https://global-warming-cs326.herokuapp.com/solutions.JSON')
                .then((response) => response.json());
        }
        else {
            effects = await fetch('https://global-warming-cs326.herokuapp.com/current-effects.JSON')
                .then((response) => response.json());
        }
        for (let i = 0; i < 2; i++) {
            document.getElementById(`row${i}`).innerHTML = '';
        }
        for (let i = 0; i < 8; i++) {
            let col = document.createElement('div');
            col.classList.add("col");
            //create checkered pattern
            if ((i % 2 === 0 && Math.floor(i / 4) % 2 === 0) || (i % 2 === 1 && Math.floor(i / 4) % 2 === 1)) {
                col.classList.add("effect");
                col.classList.add("card");
                let text = document.createElement('p');
                text.id = `col-text${i}`;
                text.classList.add('card-text');
                text.innerText = effects[Math.floor(i / 2)];
                col.appendChild(text);
            }
            document.getElementById(`row${Math.floor(i / 4)}`).appendChild(col);
        }
    }
    getEffects();
    if (roundTemp() < 1) {
        degProgress.classList.remove(degProgressColor);
        degProgress.classList.remove(degProgressText);
        degProgressColor = 'bg-info';
        degProgressText = 'white';
        degProgress.classList.add(degProgressColor);
        degProgress.classList.add(degProgressText);
    }
    else if (roundTemp() >= 1 && roundTemp() < 2) {
        degProgress.classList.remove(degProgressColor);
        degProgress.classList.remove(degProgressText);
        degProgressColor = 'bg-warning';
        degProgressText = 'black';
        degProgress.classList.add(degProgressColor);
        degProgress.classList.add(degProgressText);
    }
    else {
        degProgress.classList.remove(degProgressColor);
        degProgress.classList.remove(degProgressText);
        degProgressColor = 'bg-danger';
        degProgressText = 'white';
        degProgress.classList.add(degProgressColor);
        degProgress.classList.add(degProgressText);
    }
    if (range.value >= 2020) {
        document.getElementById('temp-label').innerText = 'Projected °C warming relative to pre-industrial levels [6]';
    }
    else {
        document.getElementById('temp-label').innerText = 'Historical °C warming since relative to 20th century average [1]';
    }
}
async function getPosts() {
    function renderRows() {
        if (document.getElementById('row2')) {
            document.getElementById('row2').innerHTML = '';
        }
        if (document.getElementById('row3')) {
            document.getElementById('row3').innerHTML = '';
        }
        for (let i = 2; i < 4; i++) {
            let row = document.createElement("div");
            row.classList.add("row");
            row.classList.add("margin");
            row.id = `row${i}`;
            mainRow2.appendChild(row);
        }
    }
    renderRows();
    document.getElementById('row2').innerHTML = '';
    document.getElementById('row3').innerHTML = '';
    let res = await fetch('https://global-warming-cs326.herokuapp.com/forum', {
    }).then(response => response.json());
    for (let i = 0; i < 8; i++) {
        if (res.length === 0) {
            break;
        }
        //console.log(res[x].body);
        let col = document.createElement('div');
        col.classList.add("col");
        //create checkered pattern
        col.classList.add("effect");
        col.classList.add("card");
        let text = document.createElement('p');
        text.id = `col-text${i}`;
        text.classList.add('card-text');
        let x = Math.floor(Math.random() * res.length);
        text.innerText = res[x].body;
        col.appendChild(text);
        document.getElementById(`row${Math.floor(i / 4) + 2}`).appendChild(col);
        let id = res[x]._id;
        col.addEventListener("click", () => {
            location.replace('https://global-warming-cs326.herokuapp.com/forum-comments.html?id=' + id);
        });
        res.splice(x, 1);
    }
}
window.addEventListener('load', getPosts);
window.addEventListener('load', load);
window.addEventListener('load', slide);

