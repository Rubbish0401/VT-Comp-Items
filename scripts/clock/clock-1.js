import { Clock1 } from "/scripts/modules/clock/Clock1.js";

document.addEventListener("DOMContentLoaded", root_event => {
	let clock = new Clock1();
	document.body.append(clock.get());
});