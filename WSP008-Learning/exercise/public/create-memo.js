import { loadMemos } from './load-memos.js'

document
	.querySelector('#memo-form')
	.addEventListener('submit', async (event) => {
		event.preventDefault() // To prevent the form from submitting synchronously

		const form = event.target
		const formData = new FormData()

		formData.append('text', form.text.value)
		formData.append('image', form.image.files[0])

		const res = await fetch('/memos', {
			method: 'POST',
			body: formData
		})

		// Clear the form here
		form.reset()

		await loadMemos()
	})
