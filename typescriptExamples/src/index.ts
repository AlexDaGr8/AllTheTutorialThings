class Student {
    fullName: string;
    constructor(public firstName: string, public middleInitial: string, public lastName: string) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("Alex", "Q", "Hinton");

// let errUser = new Student(54, 32, 4);

console.log(greeter(user));

function Greet(greeting: string, ...names: string[]): string;
function Greet(): string {
    //console.log(arguments);
    return "hi";
    //return greeting + " " + names.join(", ") + "!";
}

//console.log(Greet("Hello", "Alex", "Travis"));

// function myCoolFunction(f: (x: number) => void, nums: number[]): void;
// function myCoolFunction(f: (x: number) => void, ...nums: number[]): void;
// function myCoolFunction() {
//     console.log(arguments.length)
//     if (arguments.length === 2 && !Array.isArray(arguments[1])) {
//         console.log('here');
//         var f = arguments[0];
//         var arr = arguments[1];
//         console.log(arr);
//         arr.forEach((d: number) => f.apply(d));
//     }
// };
// console.log('my cool function')
// myCoolFunction(function(x) { console.log('number', x); }, [1,2,3,4]);
// myCoolFunction(function(x) { console.log('diff number', x); }, 1, 2, 3, 4);

// working with this keyword
interface Card {
    suit: string,
    card: number
}

interface Deck {
    suits: string[],
    cards: number[],
    createCardPicker(this: Deck): () => Card,
}

let deck: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function(this: Deck) {
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);
            return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
        }
    },
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

console.log("card: " + pickedCard.card + " of " + pickedCard.suit);

let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x: Card[] ): number;
function pickCard(x: number): Card;
function pickCard(x: any): any {
    // check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x === "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    } 
    else if (typeof x === "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 }
    }
}

let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
let pickedCard1 = myDeck[pickCard(myDeck)];
console.log(`pickedCard1 func: card: ${pickedCard1.card}, suit: ${pickedCard1.suit}`);

let pickedCard2 = pickCard(15);

console.log(`pickedCard2 func: card: ${pickedCard2.card}, suit: ${pickedCard2.suit}`);

import { main } from './generics'
import { utilMain } from './utilityTypes'

main();
utilMain();

// instanceOf Example

interface Vehicular {
    name: string;
}

interface Car extends Vehicular {
    engine: string
}
interface Bicycle extends Vehicular  {
    pedals: string
}

// this is type guard, if this returns true than vehicle is car.
function isCar(vehicle: Car | Bicycle): vehicle is Car {
    return (<Car>vehicle).engine !== undefined;
}

function showVehicleGeneric<T extends Vehicular>(arg: Vehicular) {
    console.log(arg.name);
    // now we know it has a .length property, so no more error
    return arg;
}

function showVehicle(vehicle: Car | Bicycle) {
    console.log('name of vehicle', vehicle.name);
    if (isCar(vehicle)) {
        // we can access car properties
        return vehicle.engine;
    } else {
        // we know it's a bicycle
        return vehicle.pedals;
    }
}

const car: Car = {
    name: 'Lotus',
    engine: 'Old skool F1'
};
const bike: Bicycle = {
    name: 'Cannondale',
    pedals: 'spd',
}
console.log('is a car', showVehicle(car));
console.log('is a bike', showVehicle(bike));
console.log('is a car', showVehicleGeneric(car));
console.log('is a bike', showVehicleGeneric(bike));

type LinkedList<T> = T & { next?: LinkedList<T> };

var people: LinkedList<Pick<Person, 'firstName'>> = {
    firstName: "Alex",
    next: {
        firstName: 'Bob',
        next: {
            firstName: 'Travis',
        }
    }
};

/// <reference path="./Color.ts">

console.log(Color.mixColor('purple'))
console.log(Color)
console.log(Color.red)