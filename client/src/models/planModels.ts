export type Plan = {
	id: string;
	name: string;
	created_at: string;
	updated_at: string;
	status: "private" | "public";
	user_id: number;
	like_count: number;
	picture: string;
};
