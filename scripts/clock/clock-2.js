import { Clock2 } from "../modules/clock/Clock2.js";

//

const TICKING_KEY = "t";

//

document.addEventListener("DOMContentLoaded", root_event => {
	let params = (new URL(location.href)).searchParams;

	let clock = new Clock2();
	document.body.append(clock.get());
	if(params.has(TICKING_KEY)){
		let value = params.get(TICKING_KEY);
		if(["1", "true"].includes(value)) clock.setDoTicking(true);
	}
});