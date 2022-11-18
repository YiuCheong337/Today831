import express, {Request, Response} from 'express'
import path from 'path'
import expressSession from 'express-session'

const app = express()


app.use(
    expressSession({
        secret: 'Tecky Academy teaches typescript',
        resave: true,
        saveUninitialized: true,
    }),
)

declare module 'express-session' {
    interface SessionData {
        name?: string
    }
}

app.use(function(req,res,next){
    req.session.name = "Gordon"
    console.log("I am a middleware")
    next()
})

app.get('/my-js-file', function(req,res){
    // 強行send 某一個file
    const filePath = path.resolve('./public/js/index.js')
    res.sendFile(filePath)
})

app.get('/hello', function(req:Request,res:Response){
    // 攞個req, 寫個res
    console.log(req.session)
    res.end("Hello World, HAHAHA!")
})

app.use(express.static('public'))

// 當所有嘢唔中，先會嚟到呢度
app.use(function(req,res){
    // Catch all middleware
    res.sendFile(path.resolve('public/404.html'))
})


const PORT = 8080
app.listen(PORT, ()=>{
    console.log(`Listening at http://localhost:${PORT}`)
})