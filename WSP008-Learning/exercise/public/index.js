// Typescript 嘅import 方法 ES6 Module
import { loadMemos } from './load-memos.js'
import './create-memo.js'
// for FormData
document
	.querySelector('#login-form')
	.addEventListener('submit', async (event) => {
		event.preventDefault() // To prevent the form from submitting synchronously

		const form = event.target

		//... create your form object with the form inputs
		let formObject = {
			username: form.username.value,
			password: form.password.value
		}

		const res = await fetch('/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formObject)
		})

		form.reset()
	})

loadMemos()

window.addEventListener('load', () => {
	loadMemos()
})
