//

const HUE_ANIMATION_KEY = "g";
const HUE_ANIMATION_FLAG = ["1", "true"];
const HUE_ANIMATION_STYLE_KEY = "anim";

const HUE_CONTROLL_KEY = "hue";

//

var container;
var countDisplay;
var labelDisplay;

//

document.addEventListener("DOMContentLoaded", root_event => {
	let params = (new URL(location.href)).searchParams;

	// Get Elements
	container = document.getElementById("container");
	countDisplay = document.getElementById("count");
	labelDisplay = document.getElementById("label");

	// Set Classes
	if(params.has(HUE_ANIMATION_KEY) && HUE_ANIMATION_FLAG.includes(params.get(HUE_ANIMATION_KEY)))
		container.classList.add(HUE_ANIMATION_STYLE_KEY);

	// Customise

	// Add EventListener

	// Append

	// Others
	if(params.has(HUE_CONTROLL_KEY)){
		let value = Number(params.get(HUE_CONTROLL_KEY));
		if(!isNaN(value)) document.querySelector(":root").style.setProperty(`--${HUE_CONTROLL_KEY}`, value);
	}
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