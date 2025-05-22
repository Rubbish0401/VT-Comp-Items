//

const ANIMATION_KEY = "anim";
const HUE_CONTROLL_KEY = "hue";
const HUE_STYLE_KEY = "hue";

//

var barBack;
var countDisplay;
var progress;

//

document.addEventListener("DOMContentLoaded", root_event => {
	// Get or Create Elements
	barBack = document.getElementById("progressbar-back");
	countDisplay = document.getElementById("count");
	progress = document.getElementById("progress");

	//
	let params = (new URL(location.href)).searchParams;
	if(params.has(HUE_CONTROLL_KEY)){
		let value = Number(params.get(HUE_CONTROLL_KEY));
		if(!isNaN(value)) document.querySelector(":root").style.setProperty(`--${HUE_STYLE_KEY}`, value);
	}
});

window.addEventListener("load", root_event => {
	sync();

	// Add EventListener
	controller.addEventListener("import", obj => { sync(); });
});

//

function sync(){
	let count = controller.count, max = controller.max;
	let prop = count / max;

	countDisplay.innerText = `${count}/${max}`;
	progress.style.width = `${prop * 100}%`;

	if(prop >= 2){
		progress.classList.add(ANIMATION_KEY);
	}else{
		progress.classList.remove(ANIMATION_KEY);
	}
}