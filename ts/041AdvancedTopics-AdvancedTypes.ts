//***************
//Advanced types
//**************


//***************
//Iterators and Generators
//**************

//Iterables
//collection of objects that can be ierated to handle one by one.




//for ... in 
let list = [4, 5, 6];

for (let i in list) {
   console.log(i); // "0", "1", "2", the keys of the array are the indices of its items
}

//for ... of
for (let i of list) {
   console.log(i); // "4", "5", "6"
}


//***************
//Intersections and Unions
//*****************

//Union Types


//union allow different parameter types
//use

function padLeftUnion(value: string, padding: string | number) {
    // ...
}

//instead of

/**
 * Takes a string and adds "padding" to the left.
 * If 'padding' is a string, then 'padding' is appended to the left side.
 * If 'padding' is a number, then that number of spaces is added to the left side.
 */
function padLeft(value: string, padding: any) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}

padLeft("Hello world", 4); // returns "    Hello world"

//Also for return types


function getSmallPet(): Fish | Bird {
    // ...
}

let pet = getSmallPet();
pet.layEggs(); // okay
pet.swim();    // errors


//**************
//Type guards
//*************

//can use instanceof instead of typeof === "type"
function getRandomPadder() {
    return Math.random() < 0.5 ?
        new SpaceRepeatingPadder(4) :
        new StringPadder("  ");
}

// Type is 'SpaceRepeatingPadder | StringPadder'
let padder: Padder = getRandomPadder();

if (padder instanceof SpaceRepeatingPadder) {
    padder; // type narrowed to 'SpaceRepeatingPadder'
}
if (padder instanceof StringPadder) {
    padder; // type narrowed to 'StringPadder'
}

//***************
//Generics
//**************

function identity<T>(arg: T): T {
    return arg;
}

//usage
let output = identity<string>("myString");  // type of output will be 'string'

//Generic arrays

function loggingIdentity<T>(arg: T[]): T[] {
    console.log(arg.length);  // Array has a .length, so no more error
    return arg;
}

// or

function loggingIdentity<T>(arg: Array<T>): Array<T> {
    console.log(arg.length);  // Array has a .length, so no more error
    return arg;
}

//generic interfaces

interface GenericIdentityFn<T> {
    (arg: T): T;
}

//generic classes


class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };

