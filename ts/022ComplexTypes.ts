//*************
//Interface
//*************

//basic check object has the required property
/*
function printLabel(labelledObj: { label: string }) {
    alert(labelledObj.label);
}

let myObj = {size: 10, label: "Size 10 Object"};
printLabel(myObj);
*/

//same sample creating a interface
/*
interface LabelledValue {
    label: string;
}

function printLabel(labelledObj: LabelledValue) {
    alert(labelledObj.label);
}

let myObj = {size: 10, label: "Size 10 Object"};
printLabel(myObj);
*/


//*********************************
//Optional parameters in interfaces
//*********************************
/*
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): {color: string; area: number} {
    let newSquare = {color: "white", area: 100};
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}

let mySquare = createSquare({ width: 11 });
alert(`${mySquare.area} ${mySquare.color}`);
*/
//*********************************
//read-only props in interfaces
//*********************************

//Property use read-only
//var use const

/*
interface Point {
    readonly x: number;
    readonly y: number;
}

let p1: Point = { x: 10, y: 20 };
p1.x = 5; // error!


let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
ro[0] = 12; // error!
ro.push(5); // error!
ro.length = 100; // error!
a = ro; // error!

//On the last line of the snippet you can see that even assigning the entire ReadonlyArray back to a normal array is illegal. You can still override it with a type assertion, though:
a = ro as number[];

*/

//*********************************
//Excess Property Checks
//*********************************

//extra params are not allowed to avoid possible typos.
//the solution could to do type assertion ( 'cast')

let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);

//or allow extra properties in the interface

interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}

//majority of excess property errors are actually bugs

//*********************************
//*********************************
//Classes
//*********************************
//*********************************

//*********************************
//Implementing interface
//*********************************

//defines public content
/*
interface ClockInterface {
    currentTime: Date;
    setTime(d: Date);
}

class Clock implements ClockInterface {
    currentTime: Date;
    setTime(d: Date) {
        this.currentTime = d;
    }
    constructor(h: number, m: number) { }
}
*/

//constructor a statis so we can not include it in the same interface
/*
interface ClockConstructor {
    new (hour: number, minute: number): ClockInterface;
}
interface ClockInterface {
    tick();
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
    return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log("beep beep");
    }
}
class AnalogClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log("tick tock");
    }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);

*/
//*********************************
//*********************************
//Function types
//*********************************
//*********************************

//Interfaces can describe functions as well
/*
interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    let result = source.search(subString);
    return result > -1;
}

//names does not have to match also types can be inferred in the implementation side

let mySearch2: SearchFunc;
mySearch2 = function(src: string, sub: string): boolean {
    let result = src.search(sub);
    return result > -1;
}

*/

//*********************************
//*********************************
//Indexable types
//*********************************
//*********************************


//StringArray interface that has an index signature. This index signature states that when a StringArray is indexed with a number, it will return a string.
interface StringArray {
    [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];

//It can be readonly
interface ReadonlyStringArray {
    readonly [index: number]: string;
}
let myRoArray: ReadonlyStringArray = ["Alice", "Bob"];
myRoArray[2] = "Mallory"; // error!



//*********************************
//*********************************
//Indexable types
//*********************************
//*********************************

// notice that in the class when we refer to one of the members of the class we prepend this.. This denotes that it's a member access.
/*
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

let greeter = new Greeter("world");

//accessor are public by default
*/

//inheritance
//valid modifiers:
//private
//protected
//public
/*
class Animal {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

class Rhino extends Animal {
    constructor() { super("Rhino"); }
}

class Employee {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

let animal = new Animal("Goat");
let rhino = new Rhino();
let employee = new Employee("Bob");

animal = rhino;
animal = employee; // Error: 'Animal' and 'Employee' are not compatible
*/

//********************
//protected constructor / like abstract IMO
//********************
/*
class Person {
    protected name: string;
    protected constructor(theName: string) { this.name = theName; }
}

// Employee can extend Person
class Employee extends Person {
    private department: string;

    constructor(name: string, department: string) {
        super(name);
        this.department = department;
    }

    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
}

let howard = new Employee("Howard", "Sales");
let john = new Person("John"); // Error: The 'Person' constructor is protected

*/

//*******************
//Ready only modifier
//*******************
/*
class Octopus {
    readonly name: string;
    readonly numberOfLegs: number = 8;
    constructor (theName: string) {
        this.name = theName;
    }
}
let dad = new Octopus("Man with the 8 strong legs");
dad.name = "Man with the 3-piece suit"; // error! name is readonly.
*/

//*******************
//Accesor (get set)
//*******************
//verifies the passcode to set the name

let passcode = "secret passcode";

class Employee {
    private _fullName: string;

    get fullName(): string {
        return this._fullName;
    }

    set fullName(newName: string) {
        if (passcode && passcode == "secret passcode") {
            this._fullName = newName;
        }
        else {
            console.log("Error: Unauthorized update of employee!");
        }
    }
}

let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    console.log(employee.fullName);
}

//*******************
//Static properties
//*******************

class Grid {
    static origin = {x: 0, y: 0};
    calculateDistanceFromOrigin(point: {x: number; y: number;}) {
        let xDist = (point.x - Grid.origin.x);
        let yDist = (point.y - Grid.origin.y);
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    }
    constructor (public scale: number) { }
}

let grid1 = new Grid(1.0);  // 1x scale
let grid2 = new Grid(5.0);  // 5x scale

console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}));
console.log(grid2.calculateDistanceFromOrigin({ x: 10, y: 10 }));


//*******************
//Abstract classes
//*******************


abstract class Department {

    constructor(public name: string) {
    }

    printName(): void {
        console.log("Department name: " + this.name);
    }

    abstract printMeeting(): void; // must be implemented in derived classes
}

class AccountingDepartment extends Department {

    constructor() {
        super("Accounting and Auditing"); // constructors in derived classes must call super()
    }

    printMeeting(): void {
        console.log("The Accounting Department meets each Monday at 10am.");
    }

    generateReports(): void {
        console.log("Generating accounting reports...");
    }
}

let department: Department; // ok to create a reference to an abstract type
department = new Department(); // error: cannot create an instance of an abstract class
department = new AccountingDepartment(); // ok to create and assign a non-abstract subclass
department.printName();
department.printMeeting();
department.generateReports(); // error: method doesn't exist on declared abstract type

//*******************
//Using classes as interface
//*******************

class Point {
    x: number;
    y: number;
}

interface Point3d extends Point {
    z: number;
}

let point3d: Point3d = {x: 1, y: 2, z: 3};


//*******************
//*******************
//Inheritance
//*******************
//*******************

class Animal {
    name: string;
    constructor(theName: string) { this.name = theName; }
    move(distanceInMeters: number = 0) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}

class Snake extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 5) {
        console.log("Slithering...");
        super.move(distanceInMeters);
    }
}

class Horse extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 45) {
        console.log("Galloping...");
        super.move(distanceInMeters);
    }
}

let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");

sam.move();
//output
//Slithering...
//Sammy the Python moved 5m.

tom.move(34);
//output
//Galloping...
//Tommy the Palomino moved 34m.



//Summary video
//https://youtu.be/sGYaoszZnmU