import { CounterManager } from "../modules/counter/CounterManager.js";

document.addEventListener("DOMContentLoaded", root_event => {
	manager = new CounterManager();
	manager.addEventListener("modify", obj => { saveData(obj.after); });
	window.addEventListener("storage", event => { manager.import(getData()); });

	let data = getData();
	if(data) manager.import(data);
});

//
function getData(){
	let data = localStorage.getItem(SAVEDATA_KEY);
	return JSON.parse(data);
}

function saveData(obj){
	let data = JSON.stringify(obj);
	localStorage.setItem(SAVEDATA_KEY, data);
}