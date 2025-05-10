import { ClockBase } from "./ClockBase.js";

//

const STYLES = [
	"/styles/clock/clock0-structure.css",
	"/styles/clock/clock0-face.css",
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

export class Clock0{

	#base;
	#back;

	constructor(hue = 270){
		this.#base = new ClockBase(true, void 0, "number");
		let part = this.#base.getElements();

		// Create Elements
		let back = document.createElement("div");
		let body = document.createElement("div");
		
		let datePane = document.createElement("div");
		let dateSection = document.createElement("div");
		let dateDivision = document.createElement("div");

		let separator = document.createElement("div");

		let timePane = document.createElement("div");
		let timeDivision1 = document.createElement("div");
		let timeDivision2 = document.createElement("div");

		// Set Classes
		back.classList.add("clock0", "back");
		body.classList.add("clock0", "body");

		datePane.classList.add("clock0", "pane", "date-pane");
		part.year.classList.add("clock0");
		dateSection.classList.add("clock0", "section", "date-section");

		separator.classList.add("clock0", "separator");

		timePane.classList.add("clock0", "pane", "time-pane");
		timeDivision1.classList.add("clock0", "time-division");
		timeDivision2.classList.add("clock0", "time-division");

		// Customise Properties
		this.setHue(hue);

		dateDivision.innerText = "/";
		timeDivision1.innerText = ":";
		timeDivision2.innerText = ":";

		part.day.style.setProperty("margin-left", "8px");

		// Add Event Listeners
		
		// Append
		back.append(body);
		body.append(datePane, separator, timePane);
		datePane.append(part.year, dateSection);
		dateSection.append(part.month, dateDivision, part.date, part.day);
		timePane.append(part.hours, timeDivision1, part.minutes, timeDivision2, part.seconds);

		// Others
		this.#back = back;
	}

	get(){ return this.#back; }

	setHue(hue){ document.querySelector(":root").style.setProperty("--theme-hue", hue); }

	//
	pause(){ this.#base.pause(); }
	resume(){ this.#base.resume(); }
	status(){ return this.#base.status(); }
}