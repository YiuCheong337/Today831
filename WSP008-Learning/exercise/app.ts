import express from 'express'
import expressSession from 'express-session'
import path from 'path'
import jsonfile from 'jsonfile'
import { memoRoutes } from './memoRoutes'
import { User } from './models'
import { isLoggedIn } from './guard'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(
	expressSession({
		secret: 'I love TypeScipt',
		resave: true,
		saveUninitialized: true
	})
)

declare module 'express-session' {
	interface SessionData {
		counter?: number
		user?: string
	}
}

// GET /memos/abc
// POST /memos/1
// PUT
// DELETE
app.use('/memos', memoRoutes)

app.post('/login', async (req, res) => {
	console.log(req.body)
	const userList: User[] = await jsonfile.readFile('users.json')

	if (
		userList.some(
			(user) =>
				user.username === req.body.username &&
				user.password === req.body.password
		)
	) {
		console.log('login success')
		req.session.user = req.body.username
	}

	res.redirect('/')
})

app.use(express.static('./public'))

// admin.html should be inside protected
app.use(isLoggedIn, express.static('protected'))

app.use((req, res) => {
	res.status(404)
	res.sendFile(path.resolve('./public/404.html'))
})

const PORT = 8080

app.listen(PORT, () => {
	console.log(`listening on Port: ${PORT}`)
})
