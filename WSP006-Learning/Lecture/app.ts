import express, {Request, Response} from 'express'
import path from 'path'
import expressSession from 'express-session'
import jsonfile from 'jsonfile'
import fs from 'fs'
import formidable  from 'formidable'
import { parse } from './util'

const uploadDir = 'public/uploads'
fs.mkdirSync(uploadDir, { recursive: true })

const form = formidable({
    uploadDir: uploadDir,
    keepExtensions: true,
    maxFiles: 1,
    maxFileSize: 200 * 1024 ** 2,
    filename: (originalName, originalExt, part, form) => {
        let fieldName = part.name
        let timestamp = Date.now()
        let ext = part.mimetype?.split('/').pop()
        return `${fieldName}-${timestamp}.${ext}`
    }
})

const app = express()

// bodyParser

// URL Encoded Form
app.use(express.urlencoded({extended:true})); // x-www-urlencoded
// JSON Format
app.use(express.json()); // application/json

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

// GET /students
app.get('/students/:grade', async (req,res)=>{
    console.log(req.query) // { name: 'Tecky', location: 'HK' }
    console.log(req.params)

    const students = await jsonfile.readFile('./students.json')
    res.json(students)
})

// POST /students  (HTTP Method + Route)
app.post('/students',async (req,res)=>{
    console.log(req.body)

    const [fields, files ] = await parse(form,req)

    await jsonfile.writeFile('./users.json', fields)
    console.log(files)

    // 保證唔會因為撳Refresh 就重新post 一次
    // Post 完之後，記住redirect
    res.redirect('/')

})

// PUT /students  (HTTP Method + Route)
app.put('/students',(req,res)=>{
    console.log(req)

    res.end("You are calling PUT /students")
})

// DELETE /students  (HTTP Method + Route)
app.delete('/students',(req,res)=>{
    console.log(req)

    res.end("You are calling DELETE /students")
})

app.use(express.static('public'))

// 當所有嘢唔中，先會嚟到呢度
app.use(function(req,res){
    // Catch all middleware
    // res.status(404).sendFile(path.resolve('public/404.html'))

    res.redirect('/')
})


const PORT = 8080
app.listen(PORT, ()=>{
    console.log(`Listening at http://localhost:${PORT}`)
})