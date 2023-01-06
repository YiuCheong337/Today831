// see exercise #2:  http://localhost:8080/like_memos.html?user_id=3
// see the id, so below search parameters => user_id = 3

window.onload = async () => {
	// should be inside window.onload
	const searchParams = new URLSearchParams(location.search)
	const id = searchParams.get('user_id')

	// Use the id to fetch data from
	const res = await fetch(`/like_memos?user_id=${userID}`)
	const liked_memos = await res.json()

	const memosContainer = document.querySelector('#memo-container')
	for (let memo of liked_memo) {
		memosContainer.innerHTML +=
			'textarea class = "memo">${memo.text}</textarea>'
	}
}
