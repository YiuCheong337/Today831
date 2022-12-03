import express from 'express';
import expressSession from 'express-session';
import path from 'path';
import jsonfile from 'jsonfile';
import formidable from 'formidable';
import {parse} from "./util";

const form = formidable({
    uploadDir: "public/upload",
    keepExtensions: true,
    maxFiles: 1,
    maxFileSize: 200 * 1024 ** 2, // the default limit is 200KB
    filter: part => part.mimetype?.startsWith('image/') || false,
    filename: (originalName, originalExt, part) => {
        let timestamp = Date.now()
        let ext = part.mimetype?.split('/').pop()
        return `image-${timestamp}.${ext}`
      }
  })

const app = express()

// Need this for form submissions
app.use(express.urlencoded({ extended: true }))
// Need for later lectures
app.use(express.json())

app.use(
    expressSession({
        secret: 'I love TypeScipt',
        resave: true,
        saveUninitialized: true,
    }),
)

// let lastID: string | null = null;

// app.use((req, res, next) => {
//     if (lastID === req.session.id) {
//         res.status(404);
//         res.sendFile(path.resolve('./public/404.html'))
//     } else {
//         lastID = req.session.id
//         next()
//     }
// })

declare module 'express-session' {
    interface SessionData {
        counter?: number
        user?: string
    }
}

app.use((req, _, next) => {
    if (!req.session.counter) {
        req.session.counter = 1;
    } else {
        // req.session.counter += 1;
        req.session.counter++;
    }

    console.log(`Counter value: ${req.session.counter}`)

    const time = new Date()
    console.log(`[${time.toLocaleString()}] Request ${req.path}`)
    next()
})

interface Record {
    text: string | string[];
    image?: string
}

app.post("/content", async (req, res) => {
   // console.log(req.body);
   // this console.log (req.body) no longer usable because in index.html we make the first form enctype="multipart/form-data"
   // so the data format is different and Express cannot understand it 
   // and that is why we have to define the form above in using formidable : Line 8 to 14
    const [fields, files] = await parse(form, req)
    console.log(fields)
    console.log(files)
    files
    const memo: Record[] = await jsonfile.readFile("memo.json")
    memo.push({
        //text: req.body.text 
        //no longer usable as it changes to multipart/form-data
        text: fields.text,
        image:(files.image as formidable.File)?.newFilename     // this "?" is very critical as it protects in case no image is upload
    })
    await jsonfile.writeFile("memo.json", memo, {spaces:4})
    res.redirect("/");
})

app.get("/memos", async (req, res) =>{
    const memo:Record[] = await jsonfile.readFile("memos.json")
    res.json(memo)
})

interface User {
    username: string;
    password: string
}

app.post("/login", async (req, res) => {
    console.log(req.body)
    const userList: User[] = await jsonfile.readFile("users.json");

    if (userList.some(user => user.username === req.body.username && user.password === req.body.password)){
        req.session.user = req.body.username
        console.log(req.session.user)
    }
    res.redirect("/")
})

app.use(express.static("./public"))

const isLoggedIn = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.log("req.session in")
    console.log(req.session)
    if (req.session?.user) {
      //called Next here
      console.log("here we are")
      next()
    } else {
      // redirect to index page
      res.status(404);
      res.sendFile(path.resolve('./public/404.html'))
    }
  }
  
// admin.html should be inside protected
app.use(isLoggedIn, express.static('protected'))

app.use((req, res) => {
    res.status(404);
    res.sendFile(path.resolve('./public/404.html'))
})

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`listening on Port: ${PORT}`)
})
