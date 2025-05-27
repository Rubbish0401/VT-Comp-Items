//

const HUE_CONTROL_KEY = "hue";

const count = 20;

//

var hue;

var container;
var bits;

//

document.addEventListener("DOMContentLoaded", root_event => {
	document.querySelector(":root").style.setProperty("--bit-count", count);

	//
	let params = (new URL(location.href)).searchParams;
	if(params.has(HUE_CONTROL_KEY)){
		let value = Number(params.get(HUE_CONTROL_KEY));
		if(!isNaN(value)) hue = value;
	}

	//
	container = document.getElementById("progress");
	bits = [...(function*(){
		for(let i = 0; i < count; i++){
			let bit = document.createElement("div");
			bit.classList.add("bit");
			bit.style.setProperty("--hue", hue ? hue : 360 * i / count);

			yield bit;
		}
	})()];

	// Append
	container.append(...bits);
});

window.addEventListener("load", root_event => {
	sync();
	controller.addEventListener("import", obj => { sync(); });
});

//
function sync(){
	let prop = controller.prop;
	for(let i = 0; i < bits.length; i++){
		let bit = bits[i];
		if(i < Math.floor(prop * count)) bit.classList.add("shown");
		else bit.classList.remove("shown");
	}
}