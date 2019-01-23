const pi = 3.14;
let result = pi * 2;
document.body.innerHTML = result.toString();

let color: string = "blue";
color = 'red';

let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string = `Hello, my name is ${ fullName }. 
    I'll be ${ age + 1} years old next month.`;
    
sentence.toUpperCase();

enum Color {Red =1, Green, Blue}
let colorName: string = Color[2];

//alert(colorName); //Green


let list: any[] = [1, true, "free"];
//alert(list[1]); // true

function warnUser(): void {
    alert("This is my warning message");
}

//warnUser();


//cast

let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length;

//or 

someValue = "this is a string";

strLength = (someValue as string).length;