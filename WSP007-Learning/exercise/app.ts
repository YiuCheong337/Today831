import express from 'express';
import expressSession from 'express-session';
import path from 'path';
import jsonfile from 'jsonfile'
// import formidable from 'formidable';
// import { parse } from "./util"

// const form = formidable({
//     uploadDir: "public/upload",
//     keepExtensions: true,
//     maxFiles: 1,
//     maxFileSize: 200 * 1024 ** 2, // the default limit is 200KB
//     filter: part => part.mimetype?.startsWith('image/') || false,
//     filename: (originalName, originalExt, part) => {
//         let timestamp = Date.now()
//         let ext = part.mimetype?.split('/').pop()
//         return `image-${timestamp}.${ext}`
//     }
// })

const app = express()

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

declare module 'express-session' {
    interface SessionData {
        counter?: number
        user?: string;
    }
}

interface Record {
    text: string | string[];
    image?: string;
}

app.post("/memos", async (req, res) => {
    const memo: Record[] = await jsonfile.readFile("memos.json")

    memo.push({
        text: req.body.text,
    })

    await jsonfile.writeFile("memos.json", memo, { spaces: 4 })
    res.redirect("/");
})

app.get("/memos", async (req, res) => {
    const memo: Record[] = await jsonfile.readFile("memos.json")
    res.json(memo);
})

interface User {
    username: string;
    password: string;
}

app.post("/login", async (req, res) => {
    console.log(req.body)
    const userList: User[] = await jsonfile.readFile("users.json");

    if (userList.some(user => user.username === req.body.username && user.password === req.body.password)) {
        console.log("login success")
        req.session.user = req.body.username;
    }

    res.redirect("/");
})

app.use(express.static("./public"))

const isLoggedIn = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    console.log(req.session)
    if (req.session?.user) {
        //called Next here
        console.log("user name", req.session.user)
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