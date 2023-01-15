// Named export
export async function loadMemos() {
	const res = await fetch('/memos'); // Fetch from the correct url

	if (res.status !== 200) {
		const data = await res.json();
		alert(data.msg);
		return;
	}
	const memos = await res.json();

	console.log('memos', memos);

	const memosContainer = document.querySelector('#memos-container');

	memosContainer.innerHTML = '';

	for (let memo of memos) {
		memosContainer.innerHTML += `
            <div class="memo-item-container">
            <textarea class="memo">${memo.text}</textarea>
            <i class="bi bi-trash-fill"></i>
            <i class="bi bi-pencil-square"></i>
			<i class="bi bi-star-fill"></i>
            </div> 
        `;
	}

	const memoList = document.querySelectorAll('#memos-container .memo');
	const memoEditButtons = document.querySelectorAll(
		'.memo-item-container > .bi-pencil-square'
	);
	const memoDeleteButtons = document.querySelectorAll(
		'.memo-item-container > .bi-trash-fill'
	);
	const memoLikeButtons = document.querySelectorAll(
		'.memo-item-container > .bi-star-fill'
	);

	memoEditButtons.forEach((memo, index) => {
		memo.addEventListener('click', async () => {
			const res = await fetch(`/memos/${index}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ text: memoList[index].value })
			});
		});
	});

	memoDeleteButtons.forEach((memo, index) => {
		memo.addEventListener('click', async () => {
			const res = await fetch(`/memos/${index}`, {
				method: 'DELETE'
			});
			loadMemos();
		});
	});

	memoLikeButtons.forEach((memo, index) => {
		memo.addEventListener('click', async () => {
			const res = await fetch(`/like_memos/${index}`, {
				method: 'PUT'
			});
		});
	})
}
