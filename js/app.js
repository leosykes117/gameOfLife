const canvas = document.getElementById('canvas');
const cxt = canvas.getContext('2d');
let universeLength = 40;
let cells;
let idInterval;


function startGame() {
    let tempCells = [];
    for (let x = 0; x < universeLength; x++) {
        let row = [];
        for (let y = 0; y < universeLength; y++) {
            if (cells[x][y] == 0) {
                row.push(aliveNeighbours(x, y, false));
            }
            else {row.push(aliveNeighbours(x, y, true));
            }
        }
        tempCells.push(row);
    }

    cells = tempCells;
}

function randomState() {
    cells = [];
    for (let i = 0; i < universeLength; i++) {
        let row = []
        for (let j = 0; j < universeLength; j++) {
            row.push(Math.floor(Math.random() * 2));
        }
        cells.push(row);
    }
}

function drawMatrix() {
    for (let x = 0; x < universeLength; x++) {
        for (let y = 0; y < universeLength; y++) {
            if (cells[x][y] == 0) {
                drawPixel(x, y, 10, 255, 255, 255);
            } else {
                drawPixel(x, y, 10, 0, 0, 0);
            }
        }
    }
}


function drawPixel(x, y, pixelLength, ...color) {
    for (let i = 0; i < pixelLength; i++) {
        for (let j = 0; j < pixelLength; j++) {
            setPixel(i + (x * pixelLength), j + (y * pixelLength), `rgb(${color.join()})`);
        }
    }
}


function setPixel(x, y, color) {
    cxt.fillStyle = color;
    cxt.beginPath();
    cxt.fillRect(x, y, 10, 10);
    cxt.fill();
}


function aliveNeighbours(x, y, isAlive) {
    let count = 0,
        newState;

    if (x > 0 && y > 0)
        if (cells[x - 1][y - 1] == 1)
            count++;

    if (y > 0)
        if (cells[x][y - 1] == 1)
            count++;

    if (x < universeLength - 1 && y > 0)
        if (cells[x + 1][y - 1] == 1)
            count++;

    if (x > 0)
        if (cells[x - 1][y] == 1)
            count++;

    if (x < universeLength - 1)
        if (cells[x + 1][y] == 1)
            count++;

    if (x > 0 && y < universeLength - 1)
        if (cells[x - 1][y + 1] == 1)
            count++;

    if (y < universeLength - 1)
        if (cells[x][y + 1] == 1)
            count++;
    
    if (x < universeLength - 1 && y < universeLength - 1)
        if (cells[x + 1][y + 1] == 1)
            count++;

    if (isAlive) {
        newState = (count == 2 || count == 3) ? 1 : 0; //evalua si en la siguiente iteración está viva o muerta.
    } else {
        newState = count == 3 ? 1 : 0; //NACE
    }
    return newState;
}


document.getElementById('btnRandom').onclick = () => {
    randomState();
    drawMatrix();
}


document.getElementById('btnInicia').onclick = () => {
    document.getElementById("btnInicia").className = "buttonload";
    document.getElementById("btnInicia").innerHTML = "<i class='fas fa-sync fa-spin'></i> Trabajando..."
    idInterval = window.setInterval(() => {
        startGame();
        drawMatrix();
    }, 100);
}

document.getElementById('btnPausa').onclick = () => {
    document.getElementById("btnInicia").className = "btn btn-green";
    document.getElementById("btnInicia").innerHTML = "Inicia"
    clearInterval(idInterval);
}