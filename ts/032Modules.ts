//****************
//Modules
//*************

//instead of having a big file and load all the the code
//RequireJs do it async

//Export what matters
//Validation.ts
export interface StringValidator {
    isAcceptable(s: string): boolean;
}

//THEn IMPORT

import { ZipCodeValidator } from "./ZipCodeValidator";

let myValidator = new ZipCodeValidator();

//import can be renamed
import { ZipCodeValidator as ZCV } from "./ZipCodeValidator";
let myValidator = new ZCV();

//export default / main 
StaticZipCodeValidator.ts
const numberRegexp = /^[0-9]+$/;

export default function (s: string) {
    return s.length === 5 && numberRegexp.test(s);
}
Test.ts
import validate from "./StaticZipCodeValidator";

let strings = ["Hello", "98052", "101"];

// Use function validate
strings.forEach(s => {
  console.log(`"${s}" ${validate(s) ? " matches" : " does not match"}`);
});

//video modules https://youtu.be/5WzrzNkBekA
//use default and return a class to return several things.

//**********\
//Declaration files
//***********

//d.ts added typescript metada for code that will be available at run time.


//video declarations https://youtu.be/C0EX_eMy_Eo
//dts-gen is an npm package that generate .d.ts files based on javascript.



//Best approach is to use modules!

//************
//Working with external libraries
//*************

//Import libraries using
//1 definitelytyped.org downlad ts manually for javascript libraries
//2using typesearch

//video demo https://youtu.be/Sr_-_SjeMRM for TypeSearch

//video demo definitelytyped.org https://youtu.be/wp873Br8xEc
