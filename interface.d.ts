interface res_card{
	id?:number;
	name?:string;
	type?:number;
	level_type?:number;
	school?:number;
	class?:number;
	picture?:string;
}


interface res_card_detail{
	id?:number;
	card?:number;
	para?:number[];
}


interface res_dragonNode{
	id?:number;
	name?:string;
	source?:string;
	head?:string;
	baseBone?:string;
	path?:string;
	width?:number;
	height?:number;
}


interface res_gameConfig{
	key?:string;
	value?:string;
	type?:string;
}


interface res_hero{
	id?:number;
	name?:string;
	skill_talent?:number[];
	gender?:number;
	zhenqi?:number;
	quan?:number;
	jian?:number;
	neigong?:number;
	anqi?:number;
	speed?:number;
	hp?:number;
	show?:number;
}


interface res_skill{
	id?:number;
	card?:number;
	level?:number;
	condition?:number[];
	c_value?:number[][];
	result?:number[];
	r_value?:number[][];
	scope?:number;
	show_effect_type?:number;
	show_target_type?:number;
}


interface res_skill_condition{
	id?:number;
	detail?:string;
}


interface res_skill_result{
	id?:number;
	desc?:string;
}


