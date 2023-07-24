export type Plan = {
	id: number;
	name: string;
	created_at: string;
	updated_at: string;
	status: "private" | "public";
	user_id: number;
};
