import express, { Request, Response } from 'express'
import { logger } from './logger'
import jsonfile from 'jsonfile'
import { Memo } from './models'

export const memoRoutes = express.Router()

// GET /memos
memoRoutes.get('/', getMemos)

async function getMemos(req: Request, res: Response) {
	try {
		logger.debug('Before reading memos.json')
		const memo: Memo[] = await jsonfile.readFile('memos.json')
		res.json(memo)
	} catch (e) {
		// 千祈唔好吞咗個error
		logger.error(e)
		res.status(500).json({ msg: '[MEM001]: Failed to get Memos' })
	}
}
