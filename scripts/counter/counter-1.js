//

var countDisplay;
var labelDisplay1;
var labelDisplay2;

//

document.addEventListener("DOMContentLoaded", root_event => {
	// Get Elements
	countDisplay = document.getElementById("count");
	labelDisplay1 = document.getElementById("label-1");
	labelDisplay2 = document.getElementById("label-2");

	// Customise

	// Add EventListener
});

window.addEventListener("load", root_event => {
	sync();

	// Add EventListener
	controller.addEventListener("import", obj => { sync(); });
});

//

function sync(){
	countDisplay.innerText = `${controller.count}`;
	labelDisplay1.innerText = `${controller.label}カウンター`;
	labelDisplay2.innerText = `${controller.label}だよ！`;
}