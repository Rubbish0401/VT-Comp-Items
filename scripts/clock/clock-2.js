import { Clock2 } from "../modules/clock/Clock2.js";

document.addEventListener("DOMContentLoaded", root_event => {
	let clock = new Clock2();
	document.body.append(clock.get());
});