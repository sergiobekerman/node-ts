//***********
//Functions 
//***********

//Named
function add(x, y) {
    return x + y;
}

// Anonymous function
let myAdd = function (x, y) { return x + y; };


//can refer outside values
let z = 100;

function addToZ(x, y) {
    return x + y + z;
}

//typing functions

function addTyped(x: number, y: number): number {
    return x + y;
}

//typescript can determine the return type easily.

//writing function type
let myAddType: (x: number, y: number) => number =
    function(x: number, y: number): number { return x + y; };

//optional params
function buildName(firstName: string, lastName?: string) {
    if (lastName)
        return firstName + " " + lastName;
    else
        return firstName;
}

let result1 = buildName("Bob");                  // works correctly now
let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result3 = buildName("Bob", "Adams");         // ah, just right


//default values

function buildNames(firstName: string, lastName = "Smith") {
    return firstName + " " + lastName;
}

let result1 = buildNames("Bob");                  // works correctly now, returns "Bob Smith"
let result2 = buildNames("Bob", undefined);       // still works, also returns "Bob Smith"
let result3 = buildNames("Bob", "Adams", "Sr.");  // error, too many parameters
let result4 = buildNames("Bob", "Adams");         // ah, just right

//buildName and buildNames share the function type
let functionTypeShared: (firstName: string, lastName?: string) => string

//param array params
function buildNameArray(firstName: string, ...restOfName: string[]) {
    return firstName + " " + restOfName.join(" ");
}

let buildNameFunDef: (fname: string, ...rest: string[]) => string = buildName;






//***********
//Context and scope
//***********



