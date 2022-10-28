//
// === Basics ===
// Semicolons are optional - recommended best practice is to use them.
//

let name = 'bob'; // string - either single-quote or double-quote. Stick to one of them.
let age = 23; // number (note: there is no int, double, float, etc. Just "number")
let isImpressed = false; // bool
let nada = undefined; // undefined aka nothing at all
let alsoNada = null; // null is nothing, but also something (it's a value). Yeah, it's weird...

// Note regarding null and undefined: If you want to ensure a value is set,
// you need to check for both null AND undefined. If you just check for null,
// you'll still get an exception if the value is undefined.

//
// === Objects ===
//

let person2 = {
    name: 'john',
    height: 190
};

// Object with nested object
let janeDoe = {
    name: 'jane',
    contactInfo: {
        email: 'jane@doe.com'
        phone: '11223344'
    }
};

//
// === Arrays ===
//

// An array of strings
let fruits = ['apple', 'orange', 'banana'];

// An array of car objects
let cars = [
    { make: 'ford', model: 'focus', colour: 'red' },
    { make: 'toyota', model: 'corolla', colour: 'black' },
    { make: 'mercedes', model: 'glc', colour: 'white' }
];

// Complex object with arrays and objects
let norway = {
    regions: [
        {
            name: 'Vestland',
            population: 638821,
            counties: [
                { name: 'Bergen' },
                { name: 'Dale' }
            ]
        },
        {
            name: 'Rogaland',
            population: 482645,
            counties: [
                { name: 'Stavanger' },
                { name: 'Haugesund' }
            ]
        }
    ]
};
let dale = norway.regions[0].counties[1].name;
let stavanger = norway.regions[1].counties[0].name;

//
// === Destructuring ===
//

// Destructure array
let cities = ['Bergen', 'Oslo', 'Trondheim', 'Kristiansand'];

let [ firstCity ] = cities;
console.log(firstCity); // Bergen

let [ , ...restOfTheCities ] = cities;
console.log(restOfTheCities); // ['Oslo', 'Trondheim', 'Kristiansand']

// Destructure object
let city = {
    name: 'Stavanger',
    population: 285900,
    municipality: 'Vestland',
    country: 'Norway',
    website: 'https://www.bergen.kommune.no'
};
let { population, website } = city;
console.log(population); // 285900
console.log(website); // 'https://www.bergen.kommune.no'

// Destructuring complex objects by combining array and object destructuring
let norway2 = {
    regions: [
        {
            name: 'Vestland',
            population: 638821,
            counties: [
                { name: 'Bergen' },
                { name: 'Dale' }
            ]
        },
        {
            name: 'Rogaland',
            population: 482645,
            counties: [
                { name: 'Stavanger' },
                { name: 'Haugesund' }
            ]
        }
    ]
};
let { regions: [ { name: firstRegionName }] } = norway2;
console.log(firstRegionName); // 'Vestland'

let { regions: [ , ...{ name: lastRegionName }] } = norway2;
console.log(lastRegionName); 'Rogaland'

let { regions: [ , ...{ counties: [, lastRegionLastCounty] }] } = norway2;

//
// === Functions ===
// Functions are first-class citizens in JavaScript and is the encapsulation/scoping
// boundary equal to a class in Java/C#
//

// There are two ways of defining a function:

// Assign an anonymous function (it has no name) to the variable sayHello:
// Anonymous functions are also called function expressions
let sayHello = function(){
    alert('Hello!');
}


// Or:

// The named function sayHelloWorld:
function sayHelloWorld(){
    alert('Hello World!');
}

// There are differences in how these two forms are treated behind the scenes,
// but for now just use the second version to avoid some quirks.

// Function with two parameters (note: no type constraint):

function greeter(name, sender) {
    return 'Greetings from ' + sender + ', ' + name;
}

// Even though there are two parameters to a function, you can pass as few or
// as many as you want...

greeter('bob'); // <- only one param = still valid

// This will leave the second parameter as undefined, aka nothing at all.
// JavaScript thinks is ok until you do something with the second parameter inside the function

// Immediately Invoked Function Expression (IIFE):
// We often use this to prevent global scope sharing (having variables globally accessible)
// and to start initialization logic that runs without having to do a action
(function(){

}()); // <- Invokes itself

// Functions can nest functions...

(function(){

    function hello(){
        function world(){
            return 'world';
        }
        return 'hello' + world();
    }

}());

// Functions can be passed as arguments to functions...

(function(){

    function world(){
        return 'world';
    }

    function hello(worldFunction){
        return 'hello' + worldFunction();
    }

    let helloWorld = hello(world);

}());

// Encapsulation/closure and "this"

(function(){

    function Person(firstName, lastName, age){
        this.fullName = firstName + ' ' + lastName;
        this.age = age;

        this.greet = function(){
            alert('Greetings, ' + fullName); // TODO: <- name is not available
        }
    }

    let bob = new Person('bob', 'bobson', 30); // When a function is supposed to be newed/instantiated, the common convention is to use uppercase first letter.
    bob.greet();

}());

//
// === arrow functions
// 

// Arrow function syntax is a compact alternative to a function expression /
// named function:

// Traditional anonymus function
let bob = function (a) {
    return a + 100;
}

// Traditional Function
function bob2(a) {
    return a + 100;
}
  
 // Arrow Function (no braces and no return means the return is implied)
const bob3 = (a) => a + 100;

// Arrow function with body braces and explicit return statement
const bob4 = (a) => {
    // do stuff
    return a + 100;
};

// Arrow function with single argument needs no argument parentheses
const bob5 = a => a + 100;

 // Arrow Function with multiple arguments needs argument parentheses
const bob6 = (a, b) => a + 100 + b;

//
// === var / const / let ===
//

// var is scoped to the entire function, module or globally (depending on 
// where it is declared)
var foo = 1;

// let is scoped to the block it is declared in, where a block is delimited 
// by a pair of braces: {}
// Examples of blocks include for-loops are if-statements.
let bar = 2;

// const is like let, except that values cannot be changed through re-assignment
const fooBar = 3;
fooBar = 4; // Will throw an error: TypeError: invalid assignment to const `fooBar'

// Recommentation: Never use var, use let or const instead.

// Scoping examples using var and let
const varTest = () => {
    var x = 1;
    if (true) {
        var x = 2; // same variable!
        console.log(x); // 2
    }
    console.log(x); // 2
}
  
const letTest = () => {
    let x = 1;
    if (true) {
        let x = 2; // different variable
        console.log(x); // 2
    }
    console.log(x); // 1
}

//
// === Loops ===
//

// While:

while (learningIsFun){
    learnMore++;
};

// Do/While:

do {
    learnMore++;
} while(learningIsFun)

// For-loop:

for (let i = 0; i < items.length; i++){
    console.log(items[i]);
}

// For of loop:
let cars2 = ['Volkswagen', 'Ferrari', 'Ford'];
for(let car of cars2) {
    console.log(car); // 0 1 2
}

// For-in loop:
let car = {
    model: 'Passat',
    make: 'Volkswagen'
}
for(let carProperty in car) {
    console.log(carProperty); // 'model' 'make'
}

//
// === Conditionals ===
//

// Switch:

switch (name){
    case 'bob':
        greetBob();
        break;
    case 'sarah':
        greetSarah();
        break;
    default:
        greetAnon();
};

// If:

if (name === 'bob'){
    greetBob();
} else if (name === 'sarah'){
    greetSarah();
} else {
    greetAnon();
}

//
// === Equality check quirks ===
//
// TL;DR: Always use === and !== instead of == and !=
// http://stackoverflow.com/questions/359494/does-it-matter-which-equals-operator-vs-i-use-in-javascript-comparisons