const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext("2d");

let tissueElementsArr = [];
let tileSize = 64;

const horizontalTilesAmount = Math.ceil(canvas.width/tileSize);

const verticalTilesAmount = Math.ceil(canvas.height/tileSize);

let xPos = 0;
let yPos = 0;

let cursorX = undefined;
let cursorY = undefined;

window.addEventListener("mousemove", function(e) {
    cursorX = e.x;
    cursorY = e.y;
});

function Tile(xPos, yPos, color) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.color = color;

    this.draw = function() {
        this.color = Math.sqrt(
            Math.pow(this.xPos + tileSize / 2 - cursorX, 2) +
                Math.pow(this.yPos + tileSize / 2 - cursorY, 2),
        );

        this.color = 160 - (this.color / 2);

        context.fillStyle = `rgb(1, ${this.color}, 1)`;
        context.fillRect(xPos, yPos, tileSize, tileSize);
    }
}

function genController() {
    for(let i = 0; i < verticalTilesAmount; i++) {
        xPos = 0;
        genRow();
        yPos += tileSize;
    }
}

function genRow() {
    for(let i = 0; i < horizontalTilesAmount; i++) {
        tissueElementsArr.push(new Tile(xPos, yPos, 1));
        xPos += tileSize;
    }
}

genController();

function animate() {
    requestAnimationFrame(animate);
    for(let i = 0; i < tissueElementsArr.length; i++) {
        tissueElementsArr[i].draw();
    }
}

animate();
