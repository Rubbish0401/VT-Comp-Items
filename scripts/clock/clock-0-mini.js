import { Clock0Mini } from "/scripts/modules/clock/Clock0Mini.js";

//

const HUE_KEY = "theme";

//

document.addEventListener("DOMContentLoaded", root_event => {
	let clock = new Clock0Mini();
	document.body.append(clock.get());

	document.body.addEventListener("click", event => {
		if(clock.status() == "paused") clock.resume();
		else if(clock.status() == "running") clock.pause();
	});

	//
	let params = (new URL(location.href)).searchParams;
	if(params.has(HUE_KEY)){
		let hue = Number(params.get(HUE_KEY));
		if(!isNaN(hue)) clock.setHue(hue);
	}
});