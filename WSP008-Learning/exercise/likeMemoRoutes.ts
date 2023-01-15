import express, { Request, Response } from 'express'
import jsonfile from 'jsonfile'
import path from 'path'
import { Memo, User } from './models'
import { isLoggedInAPI } from './guard'

declare module 'express-session' {
	interface SessionData {
		counter?: number
		user?: string
	}
}

export const likeMemosRoutes = express.Router()

likeMemosRoutes.get('/', getLikeMemo)
likeMemosRoutes.put('/:index', isLoggedInAPI, updateLikeMemo)

async function getLikeMemo(req: Request, res: Response) {
	const userId = parseInt(req.query.user_id as string)

	// read from Json files
	const memoList: Memo[] = await jsonfile.readFile(
		path.resolve('../memos.json')
	)
	const likeMemos = memoList.filter((memo) => memo.like_by.includes(userId))
	res.json(likeMemos)
}

async function updateLikeMemo(req: Request, res: Response) {
	const targetMemoIndex = parseInt(req.params.index)
	const username = req.session.user
	const userList: User[] = await jsonfile.readFile(path.resolve('users.json'))

	const userID = userList.find((user) => user.username === username)?.id

	const memoList: Memo[] = await jsonfile.readFile(path.resolve('memos.json'))

	if (userID) {
		if (!memoList[targetMemoIndex].like_by.includes(userID)) {
			memoList[targetMemoIndex].like_by.push(userID)
		}
		await jsonfile.writeFile('memo.json', memoList, { spaces: 4 })
		res.json({ msg: 'SUCCESS' })
	} else {
		res.status(500).json({ msg: 'SERVER ERROR' })
	}
}
