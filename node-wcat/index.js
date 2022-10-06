const fs = require('fs');

let argument = process.argv[2];
let flags = [];
let filenames = [];

for (let arg of argument) {
    if (arg[0] == '-') {
        flags.push(arg);
    } else {
        filenames.push(arg);
    }
}

if (flags.length == 0 && filenames.length != 0) {
    for (let file of filenames) {
        console.log(file);
    }
}