window.onload = async () => {
	// should be inside window.onload
	const searchParams = new URLSearchParams(location.search);
	const userID = searchParams.get('user_id');

	// Use the id to fetch data from
	const res = await fetch(`/like_memos?user_id=${userID}`);

	const liked_memos = await res.json();
	// Rest of the code

	const memosContainer = document.querySelector('#memos-container');

	for (let memo of liked_memos) {
		memosContainer.innerHTML += `<textarea class="memo">${memo.text}</textarea>`;
	}
};
