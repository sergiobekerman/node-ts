//**************
//Type compatibility
//**************

/*

interface Named {
    name: string;
}

class Person {
    name: string;
}

let p: Named;
// OK, because of structural typing
p = new Person();

//ts tweeks
/*
interface Named {
    name: string;
}

let x: Named;
// y's inferred type is { name: string; location: string; }
let y = { name: "Alice", location: "Seattle" };
x = y;
8?
*/

//**************
//Comparing functions
//**************

//it accepts less params
/*
let x = (a: number) => 0;
let y = (b: number, s: string) => 0;

y = x; // OK
x = y; // Error

//something similar for return type

let a = () => ({name: "Alice"});
let b = () => ({name: "Alice", location: "Seattle"});

a = b; // OK
b = a; // Error because x() lacks a location property

*/

//**************
//Comparing classes
//**************

//Classes work similarly to object literal types and interfaces with one exception: they have both a static and an instance type. When comparing two objects of a class type, only members of the instance are compared. Static members and constructors do not affect compatibility.

class Animal {
    feet: number;
    constructor(name: string, numFeet: number) { }
}

class Size {
    feet: number;
    constructor(numFeet: number) { }
}

let a: Animal;
let s: Size;

a = s;  //OK
s = a;  //OK


//**************
//**************
//Type inference
//**************
//**************

let i = 0; //type int

function f() { //return type string
 return "hello";
}

//**************
//Contextual type
//**************

//inferred by the context
window.onmousedown = function(mouseEvent) {
    console.log(mouseEvent.button);  //<- Error
};

//Summary video https://youtu.be/sueyRP3HklQ