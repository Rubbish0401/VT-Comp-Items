//

const count = 50;

//

var container;
var bits;

//

document.addEventListener("DOMContentLoaded", root_event => {
	document.querySelector(":root").style.setProperty("--bit-count", count);

	//
	container = document.getElementById("progress");
	bits = [...(function*(){
		for(let i = 0; i < count; i++){
			let bit = document.createElement("div");
			bit.classList.add("bit");
			bit.style.setProperty("--hue", 360 * i / count);

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