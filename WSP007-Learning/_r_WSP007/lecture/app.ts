import express from 'express'
import expressSession from 'express-session'
import jsonfile from 'jsonfile'
import fs from 'fs'
import formidable  from 'formidable'
import { parse } from './util'

const uploadDir = 'public/uploads'
fs.mkdirSync(uploadDir, { recursive: true })

export const form = formidable({
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

interface Student{
    id: number
    firstName: string,
    lastName: string,
    email: string
    age: number,
    description: string
}


let studentIdCounter = 0;

jsonfile.readFile('./students.json')
    .then(students=>{
        const maxId = students.reduce((acc:number,student:Student)=>{
            if(acc > student.id){
                return acc
            }else{
                return student.id
            }
        } , 0)
        studentIdCounter= maxId + 1;
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

// GET /students
app.get('/students', async (req,res)=>{
    const students = await jsonfile.readFile('./students.json')
    res.json(students) // Object -> Text
})


// POST /students  (HTTP Method + Route)
app.post('/students',async (req,res)=>{

    const students = await jsonfile.readFile('./students.json')
    const newId = studentIdCounter
    studentIdCounter += 1
    students.push({
        ...req.body,
        id: newId
    })
    await jsonfile.writeFile('./students.json', students, {spaces:4})

    // 保證唔會因為撳Refresh 就重新post 一次
    // Post 完之後，記住redirect
    res.json({id: newId})
})


app.post('/students/upload', async(req,res)=>{
    const [fields, files] = await parse(form, req)
    console.log(fields,files)
    res.json({success:true})
})

// PUT /students  (HTTP Method + Route)
app.put('/students/:id',(req,res)=>{
    // read Students
    // Update 要改果個student
    // 寫返落去
    res.end("You are calling PUT /students")
})

// DELETE /students  (HTTP Method + Route)
app.delete('/students/:id',(req,res)=>{
    console.log(req)
    // read Students
    // Filter 要delete 果個students
    // 寫返落去
    res.end("You are calling DELETE /students")
})

// // listing or Searching
// app.get('/apples', (req,res)=>{

// })

// // Detail
// app.get('/apples/:id', (req,res)=>{

// })

// // Create new apples
// app.post('/apples', (req,res)=>{

// })

// // Update apple(用id 去identify)
// app.put('/apples/:id',(req, res)=>{

// })

// // Delete apple (用id 去identify)
// app.delete('/apples/:id',(req, res)=>{

// })

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