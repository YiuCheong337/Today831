export interface User {
	username: string;
	password: string;
	id: number;
}

export interface Memo {
	text: string | string[];
	like_by: number[];
	image?: string;
}
