import express, { Request, Response }  from 'express'

const app = express();

console.log("Step 1")
app.use((req:Request,res:Response,next)=>{
    console.log("Step 3")
    next();
})

app.use((req:Request,res:Response,next)=>{
    console.log("Step 4")
    res.status(200).json({success:true})
})

app.use((req:Request,res:Response,next)=>{
    console.log("Step 5")
    res.status(200).json({success:true})
})

console.log("Step 2")


// import fs from 'fs';
// import os from 'os'
// import path from 'path'

// async function readQuotes(){
//     try {
//         const data = await fs.promises.readFile('quote.txt')
//         console.log(data.toString('utf8'))
//     } catch(err){
//         console.log(err)
//     }
// }

// readQuotes()

// async function writeFile(){

//     const dijkstraQuote1 = "Computer science is no more about computers than astronomy is about telescopes.\n";
//     const dijkstraQuote2 = "Simplicity is prerequisite for reliability.\n";
    
//     try{
//         // Flag w overwrites the original content and create the if it does not exist
//         await fs.promises.writeFile('dijkstra.txt',dijkstraQuote1,{flag:'w+'})
//         // Flag a+ appends to the content and create the file if it does not exist
//         await fs.promises.writeFile('dijkstra.txt',dijkstraQuote2,{flag:'a+'})
//     }catch(err){
//         console.log(err)
//     }
// }

// async function writeFile(){

//     const dijkstraQuote1 = "Computer science is no more about computers than astronomy is about telescopes.\n";
//     const dijkstraQuote2 = "Simplicity is prerequisite for reliability.\n";
    
//     try{
        
//         const promise1 = fs.promises.writeFile('dijkstra.txt',dijkstraQuote1,{flag:'a+'})
//         const promise2 = fs.promises.writeFile('dijkstra.txt',dijkstraQuote2,{flag:'a+'})
//         const combined = Promise.all([promise1, promise2])
//         await combined
//     }catch(err){
//         console.log(err)
//     }
// }

// writeFile();

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

// console.log(os.cpus())
// console.log(os.freemem())
// console.log(os.homedir())
// console.log(os.hostname())

// console.log(path.join("/","/home//rexysexy/","/Codes", "strange_path"))