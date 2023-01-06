import express from 'express'
import path from 'path'

declare module 'express-session' {
	interface SessionData {
		counter?: number
		user?: string
	}
}

export const isLoggedIn = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	if (req.session?.user) {
		//called Next here
		console.log('user name', req.session.user)
		next()
	} else {
		// redirect to 404 page
		res.status(404).sendFile(path.resolve('./public/404.html'))
	}
}

export const isLoggedInAPI = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	if (req.session?.user) {
		//called Next here
		console.log('user name', req.session.user)
		next()
	} else {
		// redirect to index page
		// 400 is bad request
		res.status(400).json({ error: 'You have no permission' })
	}
}
