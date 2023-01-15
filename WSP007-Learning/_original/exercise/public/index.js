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

// for FormData
document
	.querySelector("#memo-form")
	.addEventListener("submit", async (event) => {
		event.preventDefault(); // To prevent the form from submitting synchronously

		const form = event.target;
		const formData = new FormData();

		formData.append("text", form.text.value);
		formData.append("image", form.image.files[0]);

		const res = await fetch("/memos", {
			method: "POST",
			body: formData,
		});

		// Clear the form here
		form.reset();

        await loadMemos();
	});

document
	.querySelector("#login-form")
	.addEventListener("submit", async (event) => {
		event.preventDefault(); // To prevent the form from submitting synchronously

		const form = event.target;

		//... create your form object with the form inputs
		let formObject = {
			username: form.username.value,
			password: form.password.value,
		};

		const res = await fetch("/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formObject),
		});

		form.reset();
	});

async function loadMemos() {
	const res = await fetch("/memos"); // Fetch from the correct url
	const memos = await res.json();

    console.log("memos", memos)

	const memosContainer = document.querySelector("#memos-container");

    memosContainer.innerHTML = ""

	for (let memo of memos) {
		memosContainer.innerHTML += `
            <div class="memo-item-container">
            <textarea class="memo">${memo.text}</textarea>
            <i class="bi bi-trash-fill"></i>
            <i class="bi bi-pencil-square"></i>
            </div> 
        `;
	}

    const memoList = document.querySelectorAll("#memos-container .memo")
    const memoEditButtons = document.querySelectorAll(".memo-item-container > .bi-pencil-square")
    const memoDeleteButtons = document.querySelectorAll(".memo-item-container > .bi-trash-fill")


    memoEditButtons.forEach((memo, index) => {
        memo.addEventListener("click" , async () => {
            const res = await fetch(`/memos/${index}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({text: memoList[index].value}),
            });
        })
    })

    memoDeleteButtons.forEach((memo, index) => {
        memo.addEventListener("click" , async () => {
            const res = await fetch(`/memos/${index}`, {
                method: "DELETE"
            });
            loadMemos()
        })
    })
}

window.addEventListener("load", () => {
    loadMemos();
})
