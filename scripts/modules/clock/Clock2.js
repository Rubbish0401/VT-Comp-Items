import { ClockBase } from "./ClockBase.js";

//

const STYLES = [
	"/styles/clock/clock2/clock2-structure.css",
	"/styles/clock/clock2/clock2-face.css",
];

const CLOCK_SIZE_WIDTH = 500;
const CLOCK_SIZE_HEIGHT = 500;

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

export class Clock2{
	
	#back;

	constructor(){
		let now = new Date();
		let gap_seconds = now.getSeconds() + now.getMilliseconds() / 1000;

		// Create Elements
		let back = document.createElement("div");

		let layer0 = document.createElement("div");	// clock face
		let layer1 = document.createElement("div");	// clock mark
		let layer2 = document.createElement("div");	// hour hand
		let layer3 = document.createElement("div");	// minute hand
		let layer4 = document.createElement("div");	// second hand
		let layer5 = document.createElement("div");	// digital clock

		let marks = [...(function*(){
			let length = 12;
			let width = 6, height = 60;
			let gap = 16;

			for(let i = 0; i < length; i++){
				let item = document.createElement("div");
				item.classList.add("clock2", "mark");

				item.style.transform = [
					`translate(${[
						`calc(1px * (var(--clock-width) / 2 + ${- height / 2 - gap}) * cos(1turn * ${i} / ${length}))`,
						`calc(1px * (var(--clock-height) / 2 + ${- height / 2 - gap}) * sin(1turn *${i} / ${length}))`
					].join(", ")})`,
					`rotate(calc(0.25turn + 1turn * ${i} / ${length}))`
				].join(" ");
				item.style.width = width;
				item.style.height = height;

				yield item;
			}
		})()];

		let hourHand = document.createElement("div");
		let minuteHand = document.createElement("div");
		let secondHand = document.createElement("div");

		// Set Classes
		back.classList.add("clock2", "layer", "container");

		layer0.classList.add("clock2", "layer", "layer-0");
		layer1.classList.add("clock2", "layer", "layer-1");
		layer2.classList.add("clock2", "layer", "layer-2");
		layer3.classList.add("clock2", "layer", "layer-3");
		layer4.classList.add("clock2", "layer", "layer-4");
		layer5.classList.add("clock2", "layer", "layer-5");

		hourHand.classList.add("clock2", "layer-2", "hand");
		minuteHand.classList.add("clock2", "layer-3", "hand");
		secondHand.classList.add("clock2", "layer-4", "hand");

		// Customise Properties
		back.style.setProperty("--clock-width", CLOCK_SIZE_WIDTH);
		back.style.setProperty("--clock-height", CLOCK_SIZE_HEIGHT);

		layer2.style.animationDelay = `-${gap_seconds + now.getMinutes() * 60 + now.getHours() * 3600}s`;	// gap of hours
		layer3.style.animationDelay = `-${gap_seconds + now.getMinutes() * 60}s`;	// gap of minutes
		layer4.style.animationDelay = `-${gap_seconds}s`;	// gap of seconds

		// Add Event Listener

		// Append
		back.append(layer0, layer1, layer2, layer3, layer4, layer5);
		layer1.append(...marks);
		layer2.append(hourHand);
		layer3.append(minuteHand);
		layer4.append(secondHand);

		// Others
		this.#back = back;
	}

	//

	get(){ return this.#back; }
}