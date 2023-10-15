export type EquipmentRequired = {
	id: string;
	name: string;
	category: EquipmentCategory;
	thumbnailUrl: string;
};

export type EquipmentCategory =
	| "other"
	| "barbells"
	| "dumbbels"
	| "free_weight"
	| "weight_machine"
	| "cable_machine"
	| "benches";
