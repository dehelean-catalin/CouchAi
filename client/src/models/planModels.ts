export type Plan = {
	id: string;
	name: string;
	created_at: string;
	updated_at: string;
	status: "private" | "public";
	user_id: number;
	like_count: number;
	picture: string;
	items: PlanItem[];
};

export type PlanItem = {
	id: string;
	name: string;
	exercises: PlanExercise[];
};

export type PlanExercise = Exercise & {
	id: number;
	restTime: string;
	minReps: number;
	maxReps: number;
};

export type Exercise = {
	id: number;
	name: string;
	picture: string;
	category: string;
	description: String;
};
