const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");

canvas.height = document.documentElement.clientHeight;
canvas.width = document.documentElement.clientWidth;

const moveSpeedX = 0.1;
const moveSpeedY = 0.1;
const moveSpeedZ = 0.1;

//---------------CUBE------------------
const CubePoints3D = function(x, y, z) {
    this.x =x;
    this.y =y;
    this.z =z;
};

let positionX = canvas.width / 2;
let positionY = canvas.height / 2;
let positionZ = 0;
let cubeSize = canvas.height / 5;

let vertices = [
    new CubePoints3D (
        positionX - cubeSize,
        positionY - cubeSize,
        positionZ - cubeSize,
    ),
    new CubePoints3D (
        positionX + cubeSize,
        positionY - cubeSize,
        positionZ - cubeSize,
    ),
    new CubePoints3D (
        positionX + cubeSize,
        positionY + cubeSize,
        positionZ - cubeSize,
    ),
    new CubePoints3D (
        positionX - cubeSize,
        positionY + cubeSize,
        positionZ - cubeSize,
    ),
    new CubePoints3D (
        positionX - cubeSize,
        positionY - cubeSize,
        positionZ + cubeSize,
    ),
    new CubePoints3D (
        positionX + cubeSize,
        positionY - cubeSize,
        positionZ + cubeSize,
    ),
    new CubePoints3D (
        positionX + cubeSize,
        positionY + cubeSize,
        positionZ + cubeSize,
    ),
    new CubePoints3D (
        positionX - cubeSize,
        positionY + cubeSize,
        positionZ + cubeSize,
    ),
]

let edges = [
    [0, 1], [1, 2], [2, 3], [3, 0],
    [4, 5], [5, 6], [6, 7], [7, 4],
    [0, 4], [1, 5], [2, 6], [3, 7],
];


//---------------Loop Func--------------------
let time, timeLast = 0

function loop(currentTime) {
    time = currentTime - timeLast;
    timeLast = currentTime

    update();
    render();
    requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

//---------------Rotation--------------------
let angle;

function moveX() {
    angle = time * 0.001 * moveSpeedX * Math.PI * 2;

    for(let v of vertices) {
        let dy = v.y - positionY;
        let dz = v.z - positionZ;
        let y = dy * Math.cos(angle) - dz * Math.sin(angle);
        let z = dy * Math.sin(angle) + dz * Math.cos(angle);
        v.y = y + positionY;
        v.z = z + positionZ;
    }
}

function moveY() {
    angle = time * 0.001 * moveSpeedY * Math.PI * 2;

    for(let v of vertices) {
        let dx = v.x - positionX;
        let dz = v.z - positionZ;
        let x = dz * Math.sin(angle) + dx * Math.cos(angle);
        let z = dz * Math.cos(angle) - dx * Math.sin(angle);
        v.x = x + positionX;
        v.z= z + positionZ;
    }
}

function moveZ() {
    angle = time * 0.001 * moveSpeedZ * Math.PI * 2;

    for(let v of vertices) {
        let dx = v.x - positionX;
        let dy = v.y - positionY;
        let x = dx * Math.cos(angle) - dy * Math.sin(angle);
        let y = dx * Math.sin(angle) + dy * Math.cos(angle);
        v.x = x + positionX;
        v.y = y + positionY;
    }
}



function update() {
    moveX();
    moveY();
    moveZ();
}

//---------------Render All--------------------


function render() {
    context.fillStyle = "black"; //bg color
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = "yellow"; //cube color
    context.lineWidth = canvas.width / 100;
    context.lineCap = "round";
    
    for(let edge of edges) {
        context.beginPath();
        context.moveTo(vertices[edge[0]].x, vertices[edge[0]].y);
        context.lineTo(vertices[edge[1]].x, vertices[edge[1]].y);
        context.stroke();
    }
}
