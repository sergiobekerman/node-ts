
//****************
//Namespaces
//****************

//avoid colissions
//group logically

//interface or classes available outside the namespace needs to be expored
//Namespace can be multi file
//add reference to inform the compiler
//sample

//ZooAnimals.ts
namespace Zoo {	
    interface Animal { //note that we do not need the *export* here since this interface will only be accessible only by entities from within the Zoo namespace
		 skinType: string;
        isMammal(): boolean;
    }
}
//ZooWild.ts
/// <reference path="ZooAnimals.ts" />
namespace Zoo {
    export class Reptile implements Animal { //note that we need the *export* here to be able to acccess this class and instantiate objects of the Reptile type
		 skinType ="scales";
        isMammal(){
            return false;
        }
    }
}
//ZooBirds.ts
/// <reference path="ZooAnimals.ts" />
namespace Zoo {
    export class Bird implements Animal {   //note that we need the *export* here to be able to acccess this class and instantiate objects of the Bird type
		 skinType ="feather";
        isMammal(){
            return false;
        }
    }
}

//we can concanate into a single file using --outfile as follows
//tsc --outFile zoo.js ZooAnimals.ts ZooWild.ts ZooBirds.ts

//referencing exported types

let parrot = new Zoo.Bird();
console.log(parrot.isMammal());

//we can have aliases

import rep = Zoo.Reptile;
let lizard: rep;
console.log(lizard.skinType);

//sample video https://youtu.be/6iW2Vq3rj94