class Util {
    static random(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}

interface iPos {
    x: number;
    y: number;
}

class Pos {
    public pos: iPos;
    constructor (pos: iPos) {
        this.pos = pos;
    }
    createBlock(ctx: CanvasRenderingContext2D, w: number, h: number, fill: string) {
        ctx.beginPath();
        ctx.rect(this.pos.x, this.pos.y, w, h);
        ctx.fillStyle = fill;
        ctx.fill();
        ctx.closePath();
    }
}

enum EntityType {
    BOMB = 'pink',
    FLAG = 'seagreen',
    PLAYER = 'steelblue',
    PIECE = 'grey',
    HOME = 'gold'
}

// interface iType {
//     type: EntityType;
// }

// interface iPlayer extends iPos, iType {
//     name: string;
// }

// let player: iPlayer = { x: 8, y: 10, type: EntityType.BOMB, name: 'blah' };


interface iEntity extends iPos {
    type: EntityType;
}

class Entity extends Pos {
    private _x: number;
    public _y: number;
    private _type: EntityType;
    constructor(entity: iEntity, x:number, y:number) {
        super({ x: entity.x, y: entity.y});
        this._type = entity.type;
        this._x = x;
        this._y = y;
    }

    get x(): number { return this._x; }
    set x(val: number) { this._x = val; }

    get y(): number { return this._y; }
    set y(val: number) { this._y = val; }

    get type(): EntityType { return this._type; }
    set type(val: EntityType) { this._type = val; }

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

interface iGameSize {
    w: number;
    h: number;
}
class Game {
    private board: Entity[];
    private size: iGameSize;
    private canvasWidth: number;
    private canvasHeight: number;
    private _pieceSize: iGameSize;
    private gutter: number = 3;
    private fill: string = 'grey';
    private ctx: CanvasRenderingContext2D;
    constructor(ctx: CanvasRenderingContext2D, size: iGameSize, canvasWidth: number, canvasHeight: number) { 
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
        for (let i = this.gutter; i < this.canvasWidth; i+=this._pieceSize.w + this.gutter) {
            for (let j = this.gutter; j < this.canvasHeight; j+=this._pieceSize.h + this.gutter) {
                if (i + this._pieceSize.w < this.canvasWidth && j + this._pieceSize.h < this.canvasHeight) {
                    let entity = new Entity({ x: i, y: j, type: EntityType.PIECE},xVal,yVal);
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
    private setFlags() {
        for (let i = 0; i < 5; i++) {
            this.getPieces()[Util.random(1, this.getPieces().length-1)].type = EntityType.FLAG;
        }
    }
    private setBombs() {
        for (let i = 0; i < 10; i++) {
            this.getPieces()[Util.random(1, this.getPieces().length-1)].type = EntityType.BOMB;
        }
    }
    private setHome() {
        this.getPieces()[Util.random(1, this.getPieces().length-1)].type = EntityType.HOME;
    }
    private setPlayer() {
        this.getPieces()[0].type = EntityType.PLAYER;
    }
    private createBoard() {
        this.board.forEach(d => {
            d.createBlock(this.ctx,this.pieceSize.w,this.pieceSize.h,d.type)
        });
    }
    /**
     * 
     * @param x value of x on the board
     * @param y value of y on the board
     * @returns specific entity that corresponds to the x and y
     */
    getPiece(x:number,y:number): Entity {
        return this.board.find(d => d.x === x && d.y === y) as Entity;
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
    getPlayer(): Entity {
        return this.board.find(d => d.type = EntityType.PLAYER) as Entity;
    }
}

let canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
let ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;
let width = canvas.width, height = canvas.height;

let game = new Game(ctx, {w:10,h:10}, width, height);

let initialPos = game.getPiece(0,0);
let player = new Entity({x: initialPos.pos.x, y: initialPos.pos.y, type: EntityType.PLAYER}, 0, 0);
player.createBlock(ctx,game.pieceSize.w, game.pieceSize.h, EntityType.PLAYER);

window.addEventListener('keydown', (e) => {
    console.log('e', e);
    switch(e.keyCode) {
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
})