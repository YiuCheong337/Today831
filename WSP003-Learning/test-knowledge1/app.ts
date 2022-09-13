// function failurePromise(){
//     return new Promise(function(resolve,reject){
//         console.log("Step 2")
//         reject(true);
//     });
// }
// console.log("Step 1")
// failurePromise()
//     .then(()=>{
//         console.log("Step 3");
//         return failurePromise()
//     })
//     .catch(()=>{
//         console.log("Step 4");
//     })

// Q3

import fs from 'fs'

function fsReadFilePromise(file:string){
    return new Promise(function(resolve,reject){
        fs.readFile(file,function(err:Error,data:Buffer){
            if(err){
                reject(err);
                return;
            }
            resolve(data);
            console.log(data);
        });
    });
}

fsReadFilePromise('abc.txt');

// function fsReadFilePromise(file:string,resolve,reject){
//     return fs.readFile(file,function(err:Error,data:Buffer){
//         if(err){
//             reject(err);
//         }
//         resolve(data);
//         console.log(data);
//     });
// }

// fsReadFilePromise('abc.txt');