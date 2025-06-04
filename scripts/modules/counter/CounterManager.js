import { INITIAL_LABEL, INITIAL_COUNT, INITIAL_MAX } from "./CounterController.js";

export class CounterManager{
	#profiles = [];
	
	#callback = {
		"global": [],
		"import": [],
		"modify": [],
		"add": [],
		"set": [],
		"remove": [],
	};

	constructor(){
		this.import([]);
	}

	//
	toObject(){
		let self = this;
		return [...(function*(){
			for(let i = 0; i < self.length; i++) yield self.get(i);
		})()];
	}

	import(arr){
		let before = this.toObject();

		//
		if(Array.isArray(arr)){
			arr.filter(obj => typeof obj == "object");
			if(arr.length > 0){
				this.#profiles = [...(function*(){
					for(let obj of arr) yield newSaveData(obj);
				})()];
			}
		}

		//
		let after = this.toObject();
		for(let callback of this.#callback["global"]) callback({ type: "global", target: this, before: before, after: after});
		for(let callback of this.#callback["import"]) callback({ type: "global", target: this, before: before, after: after});
	}

	//
	#get(key){
		for(let profile of this.#profiles){
			if(profile.identifier == key) return profile;
		}

		key = Number.parseInt(key);
		if(!isNaN(key) && 0 <= key && key < this.length) return this.#profiles[key];
	}

	get(key){
		let target = this.#get(key);

		if(target) return {
			createDate: target.createDate,
			identifier: target.identifier,

			label: target.label,
			count: target.count,
			max: target.max
		};
		else return null;
	}

	getLength(){ return this.#profiles.length; }
	getIDs(){
		let self = this;
		return [...(function*(){for(let i = 0; i < self.length; i++) yield self.get(i).identifier; })()];
	}

	get length(){ return this.getLength(); }
	get ids(){ return this.getIDs(); }

	//
	add(obj, index = this.length){
		let before = this.toObject();

		//
		this.#profiles.splice(index, 0, newSaveData(obj));
		
		//
		let after = this.toObject();
		for(let callback of this.#callback["global"]) callback({ type: "global", target: this, before: before, after: after});
		for(let callback of this.#callback["modify"]) callback({ type: "global", target: this, before: before, after: after});
		for(let callback of this.#callback["add"]) callback({ type: "global", target: this, before: before, after: after});
	}

	set(key, obj){
		let before = this.toObject();

		//
		let target = this.#get(key);
		if(target){
			let data = newSaveData(obj);
			target.label = data.label;
			target.count = data.count;
			target.max = data.max;
		}

		//
		let after = this.toObject();
		for(let callback of this.#callback["global"]) callback({ type: "global", target: this, before: before, after: after});
		for(let callback of this.#callback["modify"]) callback({ type: "global", target: this, before: before, after: after});
		for(let callback of this.#callback["set"]) callback({ type: "global", target: this, before: before, after: after});
	}

	remove(index){
		let before = this.toObject();
		
		//
		this.#profiles.splice(index, 1);

		//
		let after = this.toObject();
		for(let callback of this.#callback["global"]) callback({ type: "global", target: this, before: before, after: after});
		for(let callback of this.#callback["modify"]) callback({ type: "global", target: this, before: before, after: after});
		for(let callback of this.#callback["remove"]) callback({ type: "global", target: this, before: before, after: after});
	}

	//
	addEventListener(key, callback){
		if(this.#callback.hasOwnProperty(key)){
			this.#callback[key].push(callback);
		}
	}

	removeEventListener(key, callback){
		if(this.#callback.hasOwnProperty(key)){
			this.#callback[key].filter(value => value != callback);
		}
	}
}

//
const ID_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const ID_LENGTH = 4;
function generateID(){
	let result = "";
	for(let i = 0; i < ID_LENGTH; i++) result += ID_CHARS.charAt(Math.floor(Math.random() * ID_CHARS.length));

	return result;
}

//
function newSaveData(base){
	return {
		createDate: String(new Date()),
		identifier: generateID(),

		label: base.label || INITIAL_LABEL,
		count: !isNaN(base.count) && base.count >= 0 ? base.count : INITIAL_COUNT,
		max: !isNaN(base.max) && base.max >= 0 ? base.max : INITIAL_MAX,
	}
}