import { CounterController } from "../modules/counter/CounterController.js";

document.addEventListener("DOMContentLoaded", root_event => {
	let savedData = getData();
	
	controller = new CounterController();
	if(savedData) controller.import(savedData);

	controller.addEventListener("change-label", obj => { setData(obj.target.get()); });
	controller.addEventListener("change-max", obj => { setData(obj.target.get()); });
	controller.addEventListener("change-count", obj => { setData(obj.target.get()); });

	window.addEventListener("storage", event => { controller.import(getData()); });

	//
});

//

function getData(){
	let data = JSON.parse(localStorage.getItem(COUNTER_SAVING_KEY));
	return data;
}

function setData(obj){
	if(typeof obj == "object" && !(isNaN(obj.max) && isNaN(obj.count))){
		let data = {
			label: obj.label,
			max: obj.max,
			count: obj.count,
		};

		localStorage.setItem(COUNTER_SAVING_KEY, JSON.stringify(data));
	}
}