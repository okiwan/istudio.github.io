console.info("%cWelcome to Tetraminos.", 'color: green;');

window.onload = () => {
    console.info("Initializing...");

    canvas = document.getElementById("thecanvas");
    console.log(window.height);
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    canvasContext = canvas.getContext("2d");

    tetraminos = [
        { 'shape': [1, 1, 1, 1, 0, 0, 0, 0], 'color': 'cyan' },
        { 'shape': [1, 1, 0, 0, 0, 1, 1, 0], 'color': 'red' },
        { 'shape': [1, 1, 1, 0, 0, 0, 1, 0], 'color': 'blue' },
        { 'shape': [1, 1, 1, 0, 1, 0, 0, 0], 'color': 'orange' },
        { 'shape': [0, 0, 1, 1, 0, 1, 1, 0], 'color': 'green' },
        { 'shape': [1, 1, 1, 0, 0, 1, 0, 0], 'color': 'purple' },
        { 'shape': [1, 1, 0, 0, 1, 1, 0, 0], 'color': 'yellow' }
    ];

    minosSize = 30;

    canvasContext.fillStyle = 'black';
    drawRect(0, 0, canvas.width, canvas.height);
    debug();

    var framesPerSecond = 30;
    setInterval(function () {
        draw();
    }, 1000 / framesPerSecond);
}

function draw() {

    var i = Math.floor(tetraminos.length * Math.random());
    var x = Math.floor(window.innerWidth * Math.random());
    var y = Math.floor(window.innerHeight * Math.random());
    drawTetramino(x, y, tetraminos[i].color, tetraminos[i].shape);
}

function drawTetramino(x, y, color, shape) {
    for (var i = 0; i < shape.length; i++) {
        const mods = i % 4;
        if (shape[i]) {
            drawRect(x + (mods * minosSize), y + (Math.floor(i / 4) * minosSize), minosSize, minosSize, color);
        }
    }
}

function debug() {
    debugInfo = 'Width: ' + canvas.width + ', Height: ' + canvas.height;
    canvasContext.fillStyle = 'white';
    canvasContext.textAlign = "right";
    canvasContext.fillText(debugInfo, canvas.width - 20, 20);
}

function drawRect(x, y, width, height, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height);
}