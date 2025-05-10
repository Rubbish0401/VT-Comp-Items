import { Clock1Mini } from "/scripts/modules/clock/Clock1Mini.js";

document.addEventListener("DOMContentLoaded", root_event => {
	let clock = new Clock1Mini();
	document.body.append(clock.get());
});