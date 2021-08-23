console.info("%cWelcome to Tetraminos.", 'color: green;');

window.onload = () => {
    console.info("Initializing...");

    canvas = document.getElementById("thecanvas");
    console.log(window.height);
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    canvasContext = canvas.getContext("2d");

    boardRows = 24;
    minosSize = Math.floor(window.innerHeight / (boardRows + 1));
    boardBottom = (minosSize * boardRows);
    boardColumns = Math.floor(window.innerWidth / minosSize);
    board = new Array(boardColumns * boardRows).fill(0);

    colors = ['cyan', 'red', 'blue', 'orange', 'green', 'purple', 'yellow'];

    tetraminos = [
        { 'shape': [1, 1, 1, 1, 0, 0, 0, 0], 'color': 0 },
        { 'shape': [1, 1, 0, 0, 0, 1, 1, 0], 'color': 1 },
        { 'shape': [1, 1, 1, 0, 0, 0, 1, 0], 'color': 2 },
        { 'shape': [1, 1, 1, 0, 1, 0, 0, 0], 'color': 3 },
        { 'shape': [0, 0, 1, 1, 0, 1, 1, 0], 'color': 4 },
        { 'shape': [1, 1, 1, 0, 0, 1, 0, 0], 'color': 5 },
        { 'shape': [1, 1, 0, 0, 1, 1, 0, 0], 'color': 6 }
    ];
    currentTetramino = undefined;

    var framesPerSecond = 10;
    setInterval(function () {
        updateTetramino();
        selectTetramino();
        drawEverything();
    }, 1000 / framesPerSecond);
}

function updateTetramino() {
    if (currentTetramino == undefined) { return; }

    if (currentTetramino.y < boardBottom - minosSize) {
        currentTetramino.y += minosSize;
    } else {
        currentTetramino = undefined;
    }
}

function selectTetramino() {
    if (currentTetramino == undefined) {
        console.log('yes');
        currentTetramino = {
            'id': Math.floor(Math.random() * tetraminos.length),
            'x': 0,
            'y': 0,
            'rotation': 0
        }
    }
}

function drawEverything() {
    // Canvas
    canvasContext.fillStyle = 'black';
    drawRect(0, 0, canvas.width, canvas.height);

    // Footer
    canvasContext.fillStyle = 'white';
    drawRect(0, boardBottom, canvas.width, canvas.height - boardBottom);

    // Board
    for(var i = 0; i < board.length; i++) {
        if (board[i]) {
            let column = i % boardColumns;
            let row = Math.floor(i / boardColumns);
            drawRect(column * minosSize, row * minosSize, minosSize, minosSize, colors[board[i]]);
        }
    }

    let piece = tetraminos[currentTetramino.id];
    drawTetramino(currentTetramino.x, currentTetramino.y, colors[piece.color], piece.shape)

    debug();
}

function drawTetramino(x, y, color, shape) {
    for (var i = 0; i < shape.length; i++) {
        let mods = i % 4;
        if (shape[i]) {
            drawRect(x + (mods * minosSize), y + (Math.floor(i / 4) * minosSize), minosSize, minosSize, color);
        }
    }
}

function debug() {
    debugInfo = `Width: ${canvas.width}, Height: ${canvas.height}, minosSize: ${minosSize}, boardRows: ${boardRows}, boardColumns: ${boardColumns}`;
    canvasContext.fillStyle = 'black';
    canvasContext.textAlign = 'right';
    canvasContext.fillText(debugInfo, canvas.width - 20, canvas.height - 20);
}

function drawRect(x, y, width, height, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height);
}