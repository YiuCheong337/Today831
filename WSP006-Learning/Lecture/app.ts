import express, {Request, Response} from 'express'
import path from 'path'
import expressSession from 'express-session'
import jsonfile from 'jsonfile'

const app = express()

//Body Parser either one for handling "BODY"
app.use(express.urlencoded({extended:true}))
app.use(express.json())

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
    req.session.name = "YaMa"
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

app.get('/students/:grade', async (req, res)=>{
    // console.log(req.query)
    // console.log(req.params)
    const students = await jsonfile.readFile('./students.json')
    // console.log(students)
    res.json(students)
    console.log('i m here now')
    // res.send(students) 
    // res.send(`We are in GET /students by the name of ${req.params.grade}`)

            // be careful the below function has no await, so the above async will not need
            // app.get('/students/:name/loc/:location', (req, res)=>{
            //     console.log(req.session)
            //     const name = req.params.name
            //     const location = req.params.location
            //     res.end(`NAME is ${name}, LOCATION is ${location}`)
})

app.post('/students', (req, res)=>{
    console.log(req.body)
    // const ed = req.body.educations[0]
    // console.log(ed)
    res.end("We are now in POST /students")
})

app.put('/students', (req, res)=>{
    console.log(req)

    res.end("WE ARE IN PUT /student")
})

app.delete('/students', (req, res)=>{
    console.log(req)

    res.end("We are now in DELETE /student")
})

app.use(express.static('public'))

// 當所有嘢唔中，先會嚟到呢度
app.use(function(req,res){
    // Catch all middleware
    res.status(404).sendFile(path.resolve('public/404.html'))
})

const PORT = 8080
app.listen(PORT, ()=>{
    console.log(`Listening at http://localhost:${PORT}`)
})