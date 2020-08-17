const Memory = require('./memory');

let memory = new Memory();

class Array {
    constructor() {
        this.length = 0;
        this.ptr = memory.allocate(this.length);
    };
    get(index) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }
        return memory.get(this.ptr + index);
    }
    push(value) {
        if (this.length >= this._capacity) {
            this._resize((this.length + 1) * Array.SIZE_RATIO);
        }

        memory.set(this.ptr + this.length, value);
        this.length++;
    }
    pop() {
        if (this.length == 0) {
            throw new Error('Index error');
        }
        const value = memory.get(this.ptr + this.length - 1);
        this.length--;
        return value;
    }
    insert(index, value) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }

        if (this.length >= this._capacity) {
            this._resize((this.length + 1) * Array.SIZE_RATIO);
        }

        memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
        memory.set(this.ptr + index, value);
        this.length++;
    }
    remove(index) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }
        memory.copy(this.ptr + index, this.ptr + index + 1, this.length - index - 1);
        this.length--;
    }
    _resize(size) {
        const oldPtr = this.ptr;
        this.ptr = memory.allocate(size);
        if (this.ptr === null) {
            throw new Error('Out of memory');
        }
        memory.copy(this.ptr, oldPtr, this.length);
        memory.free(oldPtr);
        this._capacity = size;
    }
};
Array.SIZE_RATIO = 3;

function main(){

    Array.SIZE_RATIO = 3;

    // Create an instance of the Array class
    let arr = new Array();

    // Add an item to the array
    arr.push(3);
    arr.push(5);
    arr.push(15);
    arr.push(19);
    arr.push(45);
    arr.push(10);
    arr.pop();
    arr.pop();
    arr.pop();

    console.log(arr);
    console.log(arr.length * Array.SIZE_RATIO);
    console.log(arr[0]);
    arr.remove(1);
    arr.remove(2);
    console.log(arr);
    
    arr = [];
    console.log(arr);
    arr.push('Tauhida');
    console.log(arr);
}

main();

//URLify string
//wasnt sure exactly what the question was asking for, looked up answer
//can luke clarify question?
function URLify(string) {
    return string.trim().replace(/\s/g, '%20');
}

//look at with luke, pasted remove portion into from previous function
function lessFive(arr) {
    for(i=0; i<arr.length; i++) {
        if(arr[i] < 5) {
            arr.remove(arr[i]);
        }
    }
}

function maxSum(arr) {
    let base = 0
    for(i=0; i<arr.length; i++) {
        if(arr[i] > 0) {
            base = base + arr[i]
            return base
        } else if (arr[i] < 0) {
            if(arr[i+1] + arr[i] > 0) {
                base = base + arr[i]
                return base
            }
        }
    }
    return base
}

function mergeArr(arr1, arr2) {
    let mergedArr = []
    for(i=0; i < arr1.length; i++) {
        for(j=0; j < arr2.length; j++) {
            if(arr1[i] < arr2[j]) {
                mergedArr.push(arr1[i])
            }
            else if (arr1[i] > arr2[j]) {
                mergedArr.push(arr2[j])
            }
            else if (arr1[i] === arr2[j]) {
                mergedArr.push(arr1[i]);
                mergedArr.push(arr2[j]);
            }
        }
    }
}
// o(n^2)

function byeVowels(arr) {
    for(i=0; i < arr.length; i++) {
        if(arr[i] == 'a' || arr[i] == 'e' || arr[i] == 'i' || arr[i] == 'o' || arr[i] == 'u') {
            //remove it
            arr.remove(arr[i]);
        }
    }
    return arr
}

//I think I'm missing some type of array manipulation that can be used to solve this here.
function products(arr) {
    let prodArr = []
    for(i=0; i < arr.length; i++) {
        arr.slice(i,i)
    }
}
//struggling a little with this one. Should I try to find a way to reset the iterations if I find a 0,
//or should I dive deeper and add a 3rd and 4th for loop into the mix?
function twoDArray(arr) {
    for(i=0; i<arr.length; i++) {
        for(j=0; j<arr[i].length; j++) {
            if(arr[i][j] === 0) {
                // for(k = 0; k<arr[i].length; k++) {
                //     arr[i][k] = 0
                //     for(l=0; l<arr.length; l++) {
                        
                //     }
                // }

            }
            return //this moves on
        }
    }
}

//I want to take a single letter in str and compare it to each letter of rot. if it matches any of the 
//letters in rot, then push those each to arrays and compare the next letter in each string. If those
//match, push each into arrays and compare next letter

function stringRotation(str, rot) {
    let control = [];
    let compare = [];
    if (str.length !== rot.length) {
        return false
    }
    for (i=0; i<str.length; i++) {
        for (j = 0; j<rot.length; j++) {
            if ( str[i] == rot[j]) {
                control.push(str[i]); 
                compare.push(rot[j]);
                //I think this is all correct but I'm not sure what to return here
            }
            return false
        }
    }
    console.log(control)
    console.log(compare)
    if(control == compare) {
        return true
    }
}