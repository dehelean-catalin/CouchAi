const routes = {
	PLAN: "Home",
	CREATE_PLAN: "Create plan",
	EXERCISE: "Exercise",
	CREATE_EXERCISE: "Create exercise",
	EXERCISE_DETAILS: "Exercise details",
} as const;

type RouteKeys = keyof typeof routes;
export type RouteValues = (typeof routes)[RouteKeys];

export default routes;
