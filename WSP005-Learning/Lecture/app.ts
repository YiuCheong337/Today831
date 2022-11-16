import express, {Request, Response} from 'express'
import path from 'path' 

const app=express()

app.get('/my-js-file', function(req,res){
    const filePath = path.resolve('./public/js/index.js') 
    res.sendFile(filePath)
})

app.get('/hello', function(req: Request, res: Response){

 // res.send("Hello World! HahaHa !! vahalla")
    res.end("Hello World! HahahaHa !!")
})

app.use(express.static('public'))

const PORT = 4000
app.listen(PORT, ()=>(
    console.log(`I M Listening now at http:localhost:${PORT}\n`)
))


/* all below shows middleware illustration */

// console.log("Step 1")

// app.use((req,res,next)=>{
//     console.log("Step 3")
//     next();
// })

// app.use((req,res,next)=>{
//     console.log("Step 4")
//     res.status(200).json({success:true})
// })

// app.use((req,res,next)=>{
//     console.log("Step 5")
//     res.status(200).json({success:true})
// })

// console.log("Step 2")

// const PORT = 4000
// app.listen(PORT, ()=>(
//     console.log(`I M Listening now at http:localhost:${PORT}\n`)
// ))