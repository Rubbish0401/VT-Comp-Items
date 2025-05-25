//

const HUE_CONTROL_KEY = "hue";
const HUE_STYLE_KEY = "hue";

//

var progress;
var label;

//

document.addEventListener("DOMContentLoaded", root_event => {
	let params = (new URL(location.href)).searchParams;
	if(params.has(HUE_CONTROL_KEY)){
		let value = Number(params.get(HUE_CONTROL_KEY));
		if(!isNaN(value)) document.querySelector(":root").style.setProperty(`--${HUE_STYLE_KEY}`, value);
	}

	//
	progress = document.getElementById("progress");
	label = document.getElementById("label");
});

window.addEventListener("load", root_event => {
	sync();
	controller.addEventListener("import", obj => { sync(); });
});

//
function sync(){
	progress.style.width = `${controller.prop * 100}%`;
	label.innerText = `${controller.label} Progress`;
}