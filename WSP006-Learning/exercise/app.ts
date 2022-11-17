import express from 'express';
import expressSession from 'express-session';
import path from 'path';

const app = express()

app.use(
    expressSession({
      secret: 'i love typescript',
      resave: true,
      saveUninitialized: true,
    }),
)
  
declare module 'express-session' {
    interface SessionData {
      counter?: number
    }
}

app.use((req, _, next) => {   // using _ to replace "res" because it does not require any response
    if(!req.session.counter)
    {
         req.session.counter = 1   
    } else 
    {
        req.session.counter++       
    }
    console.log(`counter value: ${req.session.counter}`)
    const time = new Date()
    console.log(`[${time.toLocaleString()}] Request ${req.path}`)
    next()
})

app.use(express.static(`./public`))

app.use((req, res) => {
    res.status(404)
    res.sendFile(path.resolve(`./public/404.html`))
  })

const PORT=8080

app.listen(PORT, ()=>{
    console.log(`listening on the port ${PORT}`)    
})
