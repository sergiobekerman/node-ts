import * as _ from "lodash";

class ArrayUtilities {
    reverseArray(array: Array<any>) {
        return _.reverse(array);
    } 
    lastItemOfArray(array: Array<any>) {
        return _.last(array);
    }
    firstItemOfArray(array: Array<any>) {
        return _.first(array);
    }
    concatenateArray(array1: Array<any>, array2: Array<any>) {
        return _.concat(array1, array2);
    }
}

export default new ArrayUtilities;
