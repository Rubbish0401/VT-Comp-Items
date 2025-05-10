import { ClockBase } from "./ClockBase.js";

//

const STYLES = [
	"/styles/clock/clock1/clock1-mini-structure.css",
	"/styles/clock/clock1/clock1-mini-face.css",
];

//

document.addEventListener("DOMContentLoaded", root_event => {
	document.head.append(...(function*(){
		for(let path of STYLES){
			let link = document.createElement("link");
			link.rel = "stylesheet";
			link.href = path;

			yield link;
		}
	})());
});

//

export class Clock1Mini{
	#base;
	#back;
	
	constructor(){
		this.#base = new ClockBase();
		let part = this.#base.getElements();

		// Create Elements
		let back = document.createElement("div");
		let separator = document.createElement("div");

		// Set Classes
		back.classList.add("clock1", "back");
		separator.classList.add("clock1", "separator");

		// Customise Properties
		separator.innerText = ":";

		// Add EventListeners

		// Append
		back.append(
			part.hours,
			separator,
			part.minutes
		);

		// Others
		this.#back = back;
	}

	get(){ return this.#back; }
}