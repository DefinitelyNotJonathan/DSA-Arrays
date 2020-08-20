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

function products(arr) {
    let prodArr = []

    for(i=0; i < arr.length; i++) {
        let product=1
        for(j=0; j<arr.length; j++) {
            if(j !== i) {
                product*arr[j]
            }
        }
        prodArr.push()
    }
    
}
// or multiply all together, then for loop and divide by i for each, and push into new array

function twoDArray(arr) {
    let arr2 = arr.map((a) => {
        return Array.from(a)
        //Array.from copies an array
    })
    for(y=0; y<arr.length; y++) {
        for(x=0; x<arr[y].length; x++) {
            if(arr[y][x] === 0) {
                for(y2 = 0; y2<arr.length; y2++) {
                    arr2[y2][x] = 0
                }
                for(x2=0; x2<arr[y].length; x2++) {
                    arr2[y][x2] = 0
                }
            }
        }
    }
    console.log(arr);
}

function areRotations(str1, str2){
    for(let i=0; i<str1.length; i++){
        let valid=true;
        for(let j=0; j<str1.length; j++){
            if(str1[(i+j)%str1.length]!==str2[j]){
                valid=false;
            }
        }
        if(valid){
            return true;
        }
    }
    return false;
}

console.log(areRotations("amazon", "azonma"))//false
console.log(areRotations("amazon", "azonam"))//true