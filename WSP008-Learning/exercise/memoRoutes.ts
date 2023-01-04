import express, { Request, Response } from 'express'
import { logger } from './logger'
import jsonfile from 'jsonfile'
import { Memo } from './models'
import { form, parse } from './util'
import formidable from 'formidable'
import { isLoggedInAPI } from './guard'

export const memoRoutes = express.Router()

// GET /memos
// POST /memos
// PUT /memos
memoRoutes.get('/', getMemos)
memoRoutes.post('/', postMemos)
memoRoutes.put('/:id', isLoggedInAPI, updateMemos)
memoRoutes.delete('/:id', isLoggedInAPI, deleteMemos)

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

async function postMemos(req: Request, res: Response) {
	const [fields, files] = await parse(form, req)
	const memo: Memo[] = await jsonfile.readFile('memos.json')

	memo.push({
		text: fields.text,
		image: (files.image as formidable.File)?.newFilename
	})

	await jsonfile.writeFile('memos.json', memo, { spaces: 4 })

	res.json(memo)
}

async function updateMemos(req: Request, res: Response) {
	const memoIndex = req.params.id
	console.log('body', req.body)
	const newContent = req.body.text

	const memo: Memo[] = await jsonfile.readFile('memos.json')

	memo[memoIndex].text = newContent
	console.log(memo)

	await jsonfile.writeFile('memos.json', memo, { spaces: 4 })
	res.json({ state: 'OK' })
}

async function deleteMemos(req: Request, res: Response) {
	const memoIndex: number = Number(req.params.id)

	const memo: Memo[] = await jsonfile.readFile('memos.json')

	memo.splice(memoIndex, 1)
	console.log(memo)

	await jsonfile.writeFile('memos.json', memo, { spaces: 4 })
	res.json({ state: 'successfully delete' })
}
