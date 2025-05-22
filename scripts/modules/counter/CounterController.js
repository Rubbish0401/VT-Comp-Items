//

const MAX_DIGIT = 5;

//

const INITIAL_LABEL = "おはよう";
const INITIAL_MAX = 1;
const INITIAL_COUNT = 0;

//

export class CounterController{
	
	#label = INITIAL_LABEL;
	#max = INITIAL_MAX;
	#count = INITIAL_COUNT;

	#listeners = {
		"global": [],
		"change-max": [],
		"change-count": [],
		"change-label": [],
		"import": [],
	};

	constructor(max, init_count){
		if(max || init_count) this.import({ max: max, count: init_count });
	}

	//

	get(){
		return {
			label: this.label,
			max: this.max,
			count: this.count
		}
	}

	getMax(){ return this.#max; }
	getCount(){ return this.#count; }
	getPropotion(){ return this.max > 0 ? this.count / this.max : void 0; }
	getLabel(){ return this.#label; }

	//

	get data(){ return this.get(); }
	get count(){ return this.getCount(); }
	get max(){ return this.getMax(); }
	get prop(){ return this.getPropotion(); }
	get label(){ return this.getLabel(); }
	
	//

	setMax(max){
		let before = this.max;
		
		this.import({ max: max });

		let after = this.max;
		for(let func of this.#listeners["global"]) func({ type: "global", target: this, before: before, after: after });
		for(let func of this.#listeners["change-max"]) func({ type: "change-max", target: this, before: before, after: after });
	}

	addMax(count){
		if(!isNaN(count)) this.setMax(this.max + count);
	}

	setCount(count, in_range = false){
		let before = this.count;

		if(!isNaN(count) && 0 <= count && (!in_range || count <= this.max)) this.import({ count: count });

		let after = this.count;
		for(let func of this.#listeners["global"]) func({ type: "global", target: this, before: before, after: after });
		for(let func of this.#listeners["change-count"]) func({ type: "change-count", target: this, before: before, after: after });
	}
	
	addCount(count){
		if(!isNaN(count)) this.setCount(this.count + count);
	}
	
	setLabel(str){
		let before = this.label;

		this.import({ label: str });

		let after = this.label;
		for(let func of this.#listeners["global"]) func({ type: "global", target: this, before: before, after: after });
		for(let func of this.#listeners["change-label"]) func({ type: "change-label", target: this, before: before, after: after });
	}

	import(obj){
		let before = this.get();

		if(typeof obj == "object"){
			if(obj.hasOwnProperty("label")){
				let text = String(obj.label);
				this.#label = text.length > 0 ? String(obj.label) : INITIAL_LABEL;
			}

			if(obj.hasOwnProperty("max")) this.#max = !isNaN(obj.max) && 0 < obj.max && obj.max < 10 ** MAX_DIGIT ? Number.parseInt(obj.max) : INITIAL_MAX;
			if(obj.hasOwnProperty("count")) this.#count = !isNaN(obj.count) ? Number.parseInt(obj.count) : INITIAL_COUNT;
		}

		let after = this.get();
		for(let func of this.#listeners["global"]) func({ type: "global", target: this, before: before, after: after });
		for(let func of this.#listeners["import"]) func({ type: "import", target: this, before: before, after: after });
	}

	//

	addEventListener(key, func){
		if(this.#listeners.hasOwnProperty(key)){
			this.#listeners[key].push(func);
		}
	}

	removeEventListener(key, func){
		if(this.#listeners.hasOwnProperty(key)){
			this.#listeners[key].filter(value => value != func);
		}
	}
}