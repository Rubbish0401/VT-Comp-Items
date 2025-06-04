import { CounterController } from "../modules/counter/CounterController.js";

document.addEventListener("DOMContentLoaded", root_event => {
	let url = new URL(location.href);
	let params = url.searchParams;
	if(params.has(PROFILE_IDENTIFY_KEY)){
		let value = params.get(PROFILE_IDENTIFY_KEY);
		let data = manager.get(value);

		if(data && typeof data == "object"){
			profileKey = data.identifier;
		}else{
			params.set(PROFILE_IDENTIFY_KEY, profileKey);
			location.href = url.toString();
		}
	}

	//
	let savedData = getDataOld();
	if(savedData){
		manager.import([savedData]);
		saveData(savedData);
		localStorage.removeItem(COUNTER_SAVING_KEY);
	}
	
	controller = new CounterController();
	controller.import(manager.get(profileKey));

	controller.addEventListener("change-label", obj => { saveData(obj.target.get()); });
	controller.addEventListener("change-max", obj => { saveData(obj.target.get()); });
	controller.addEventListener("change-count", obj => { saveData(obj.target.get()); });

	manager.addEventListener("import", obj => { controller.import(manager.get(profileKey)); });

	//
});

//

function getDataOld(){
	let data = JSON.parse(localStorage.getItem(COUNTER_SAVING_KEY));
	return data;
}

function saveData(obj){
	if(manager.length == 0) manager.add({});
	manager.set(profileKey, obj);
}

//

//
getFlag = function(){
	let flag = JSON.parse(localStorage.getItem(FLAG_SAVING_KEY));
	return typeof flag == "boolean" ? flag : INITIAL_FLAG;
};

saveFlag = function(flag){
	if(typeof flag != "boolean") flag = INITIAL_FLAG;
	localStorage.setItem(FLAG_SAVING_KEY, String(flag));
	console.log("save flag", flag);
};