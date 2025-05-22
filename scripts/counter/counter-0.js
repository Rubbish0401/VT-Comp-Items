//

var countDisplay;
var labelDisplay;

//

document.addEventListener("DOMContentLoaded", root_event => {
	// Get Elements
	countDisplay = document.getElementById("count");
	labelDisplay = document.getElementById("label");

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
	labelDisplay.innerText = controller.label;
}