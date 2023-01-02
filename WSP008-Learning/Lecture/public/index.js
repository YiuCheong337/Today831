import { loadMemos } from './memo-list.js'
import './create-memo.js'

/* for JSON format body */
// document
// 	.querySelector("#memo-form")
// 	.addEventListener("submit", async (event) => {
// 		event.preventDefault(); // To prevent the form from submitting synchronously

// 		const form = event.target;

// 		//... create your form object with the form inputs
// 		let formObject = {
// 			text: form.text.value,
// 		};

// 		const res = await fetch("/memos", {
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 			body: JSON.stringify(formObject),
// 		});

// 		// Clear the form here
// 		form.reset();
// 	});

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

window.addEventListener('load', () => {
	loadMemos()
})
