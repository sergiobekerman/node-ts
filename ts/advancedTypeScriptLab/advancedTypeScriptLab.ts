class genericClass<T> {
    val : T;
    setVal(val : T) {
        this.val = val;
    }
    getVal() : T {
        return this.val;
    }
}

let element1 = new genericClass<Element>();
let element2 = new genericClass<HTMLElement>();
let element3 = new genericClass<Element>();

//Let's go ahead and add some values to our classes using the setVal() function.

element1.setVal(document.createElement('div'));
element2.setVal(document.createElement('div'));
element3.setVal(document.createElement('div'));
// Note that because document.createElement('div') is assignable to both <Element> and <HTMLElement> this doesn't error out at all. Go ahead and change one element object to a string, and you can see Visual Studio flag it as an error. Then go ahead and change it back.

//Now we are going to create an array of our returned values from the classes.
let elementArray = [
    element1.getVal(),
    element2.getVal(),
    element3.getVal(),
]
//If you hover over element1.getVal(), you will see Visual Studio Code tell you that the type of the value returned is still <Element>. If you hover over element2.getVal(), you will see the type is <HTMLElement>.

//For our final action in this exercise, we are going to add a Type Guard function to our application to check to see if an element passed to the function is an HTMLElement. You will use this in the next exercise.
function isHTMLElement(x: any): x is HTMLElement {
    return x.style !== undefined;
}

//Note the return type x is HTMLElement This is called a Predicate Return Type. This is a special type of return that is designed solely for typechecking. This is necessary since <HTMLElement> is not a type that can be checked with the typeof operator. Our custom type guard function is checking to see whether the style property exists on the object, which it does in <HTMLElement>, but not in <Element>.
function convertElement(elem : Element | HTMLElement): HTMLElement {
    if (!isHTMLElement(elem)) {
        return <HTMLElement>elem;
    }
    else {
        return elem;
    }
}
//Note that we are accepting a Union Type for our parameter call signature for this function. This means that either an Element or an HTMLElement typed variable (and only those types) can be passed to this function. It is only returning the HTMLElement type.

//It will run the isHTMLElement function with our elem param, and if it does not match the type,it returns the element converted to HTMLElement with a type assertion. If it matches, it leaves it alone and returns it as-is.

function standardizeElements(elemArray: Array<any>) : Array<HTMLElement> {
    for (let elem of elemArray) {
        convertElement(elem)
    }
    return elemArray;
 }

 //The for...of syntax is exclusive to Typescript, and is a distinct differentiation from the for...in syntax. Whereas in the for...in syntax, the first parameter is a variable that will be assigned the index or key within the array for each iterated property, the for...of syntax assigns the value of each position to the variable instead.

 let standardElements = standardizeElements(elementArray);

// To Create a Mixin
//In this lab, we are going to use reusable classes to compose a class that will enhance an element with motion and animation.
//To accomplish this, we are going to leverage two specific features of TypeScript - Mixins and Decorators. Mixins are essentially composite classes built out of smaller classes. This is especially useful if you want to create a series of utility classes that you wish to apply to specific classes later in your development.
class Rotater {
    rotate (elem: HTMLElement) {
        elem.style.transform = "rotate(-315deg)"
    }
    rotateBack (elem: HTMLElement) {
        elem.style.transform = ""
    }
}

//Next we are going to do the same thing with a Mover class, which will make an element able to be moved using the transform:translateX property.
class Mover {
    move (elem: HTMLElement) {
        elem.style.transform = "translateX(50px)"
    }
    moveBack (elem: HTMLElement) {
        elem.style.transform = ""
    }
}

//Next we are going to build out our main movingElement class which will take these Mixin classes.
//Note that we are using implements here, essentially treating the classes as Interfaces. This allows us to write code for the values within the reusable classes even before we bind them to the main class, and Visual Studio Code will keep up on the types and autocomplete.

class movingElement implements Rotater, Mover {
    rotate: (elem: HTMLElement) => any
    move: (elem: HTMLElement) => any
    moveBack: (elem: HTMLElement) => any
    rotateBack: (elem: HTMLElement) => any
    element: HTMLElement
    constructor(elem: HTMLElement) {
        elem.onmousedown = () => {
            this.move(elem);
        }
        elem.onmouseup = () => {
            this.moveBack(elem);
        }
        elem.onmouseover = () => {
            this.rotate(elem);
        }
        elem.onmouseout = () => {
            this.rotateBack(elem);
        }
        this.element = elem;
    }
}

function applyMixins(derivedClass: any, baseClasses: any[]) {
    baseClasses.forEach(baseClass => {
        Object.getOwnPropertyNames(baseClass.prototype).forEach(name => {
            derivedClass.prototype[name] = baseClass.prototype[name];
        });
    });
}
applyMixins(movingElement, [Mover, Rotater])

//Finally, we are going to iterate through our standardizedElements array and append those to the body, after applying the class to them.
for (let elem of standardElements) {
    elem.style.width = "60px"
    elem.style.height = "60px"
    elem.style.backgroundColor = "green";
    elem.style.margin = "5px";
    let elemClass = new movingElement(elem);
    document.body.appendChild(elemClass.element);
}

//you can tsconfig.json to put some compile config

//also use visual studio task runner to build
//Press CTRL+SHIFT+P to open the Command Pallette, then type in "Configure Task Runner". Click on "Tasks: Configure Task Runner".Depending on the version of VS Code you are using, you might get a different menu, look for something that suggests configuring the build tasks, e.g. you may find "Configure Default Build Task" as the menu item in your VS Code. taskrunner
//Select "TypeScript - tsconfig.json" from the list. This will create a .vscode folder within your folder, as well as a tasks.json. taskrunner2

//Now you can press CTRL+SHIFT+B to run your compile task.



