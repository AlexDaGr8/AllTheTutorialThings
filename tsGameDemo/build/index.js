class Util {
    static random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}
class Pos {
    constructor(pos) {
        this.pos = pos;
    }
    createBlock(ctx, w, h, fill) {
        ctx.beginPath();
        ctx.rect(this.pos.x, this.pos.y, w, h);
        ctx.fillStyle = fill;
        ctx.fill();
        ctx.closePath();
    }
}
var EntityType;
(function (EntityType) {
    EntityType["BOMB"] = "pink";
    EntityType["FLAG"] = "seagreen";
    EntityType["PLAYER"] = "steelblue";
    EntityType["PIECE"] = "grey";
    EntityType["HOME"] = "gold";
})(EntityType || (EntityType = {}));
class Entity extends Pos {
    constructor(entity, x, y) {
        super({ x: entity.x, y: entity.y });
        this._type = entity.type;
        this._x = x;
        this._y = y;
    }
    get x() { return this._x; }
    set x(val) { this._x = val; }
    get y() { return this._y; }
    set y(val) { this._y = val; }
    get type() { return this._type; }
    set type(val) { this._type = val; }
    /**
     * @description move the player one to the left on the board
     */
    moveLeft() {
        console.log('move left');
    }
    moveRight() {
    }
    moveUp() {
    }
    moveDown() {
    }
}
class Game {
    constructor(ctx, size, canvasWidth, canvasHeight) {
        this.gutter = 3;
        this.fill = 'grey';
        this.ctx = ctx;
        this.board = [];
        this.size = size;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this._pieceSize = {
            w: (this.canvasWidth) / (this.size.w + 1),
            h: this.canvasHeight / (this.size.h + 1)
        };
        let xVal = 0, yVal = 0;
        for (let i = this.gutter; i < this.canvasWidth; i += this._pieceSize.w + this.gutter) {
            for (let j = this.gutter; j < this.canvasHeight; j += this._pieceSize.h + this.gutter) {
                if (i + this._pieceSize.w < this.canvasWidth && j + this._pieceSize.h < this.canvasHeight) {
                    let entity = new Entity({ x: i, y: j, type: EntityType.PIECE }, xVal, yVal);
                    // entity.xB = i;
                    // entity.yB = j;
                    this.board.push(entity);
                    yVal++;
                }
            }
            xVal++;
        }
        //this.setPlayer();
        this.setFlags();
        this.setBombs();
        this.setHome();
        this.createBoard();
    }
    get pieceSize() { return this._pieceSize; }
    /**
     * @description Set the flags on random Non pieces of the board;
     */
    setFlags() {
        for (let i = 0; i < 5; i++) {
            this.getPieces()[Util.random(1, this.getPieces().length - 1)].type = EntityType.FLAG;
        }
    }
    setBombs() {
        for (let i = 0; i < 10; i++) {
            this.getPieces()[Util.random(1, this.getPieces().length - 1)].type = EntityType.BOMB;
        }
    }
    setHome() {
        this.getPieces()[Util.random(1, this.getPieces().length - 1)].type = EntityType.HOME;
    }
    setPlayer() {
        this.getPieces()[0].type = EntityType.PLAYER;
    }
    createBoard() {
        this.board.forEach(d => {
            d.createBlock(this.ctx, this.pieceSize.w, this.pieceSize.h, d.type);
        });
    }
    /**
     *
     * @param x value of x on the board
     * @param y value of y on the board
     * @returns specific entity that corresponds to the x and y
     */
    getPiece(x, y) {
        return this.board.find(d => d.x === x && d.y === y);
    }
    getPieces() {
        return this.board.filter(p => p.type === EntityType.PIECE);
    }
    getBombs() {
        return this.board.filter(b => b.type === EntityType.BOMB);
    }
    getFlags() {
        return this.board.filter(b => b.type === EntityType.FLAG);
    }
    /**
     *
     * @description get the player from the board
     */
    getPlayer() {
        return this.board.find(d => d.type = EntityType.PLAYER);
    }
}
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let width = canvas.width, height = canvas.height;
let game = new Game(ctx, { w: 10, h: 10 }, width, height);
let initialPos = game.getPiece(0, 0);
let player = new Entity({ x: initialPos.pos.x, y: initialPos.pos.y, type: EntityType.PLAYER }, 0, 0);
player.createBlock(ctx, game.pieceSize.w, game.pieceSize.h, EntityType.PLAYER);
window.addEventListener('keydown', (e) => {
    console.log('e', e);
    switch (e.keyCode) {
        case 37:
            // left key pressed
            player.moveLeft();
            break;
        case 38:
            // up key pressed
            break;
        case 39:
            // right key pressed
            break;
        case 40:
            // down key pressed
            break;
    }
});
