import MONTH_LABEL from "/data/month-label.json" with { type: "json" };
import DAY_LABEL from "/data/day-label.json" with { type: "json" };

//

const INTERVAL_SPEED = 50;	// ms per a time

//

export class ClockBase{

	#month_flag = "full";
	#lang = "en";
	#fill_flag = true;

	#interval;
	#interval_func;

	#year;
	#month;
	#date;
	#day;

	#hours;
	#minutes;
	#seconds;
	#milliseconds;

	constructor(fill = true, lang = "en-short", mon = "short", mon_par = false){
		let self = this;

		// Create Elements
		let year = document.createElement("div");
		let month = document.createElement("div");
		let date = document.createElement("div");
		let day = document.createElement("div");

		let hours = document.createElement("div");
		let minutes = document.createElement("div");
		let seconds = document.createElement("div");
		let milliseconds = document.createElement("div");

		// Append

		// Others

		this.#year = year;
		this.#month = month;
		this.#date = date;
		this.#day = day;

		this.#hours = hours;
		this.#minutes = minutes;
		this.#seconds = seconds;
		this.#milliseconds = milliseconds;
	
		this.#interval_func = function(){
			let now = new Date();
			
			year.innerText = fillChars(now.getFullYear(), fill * 4);
			month.innerText = MONTH_LABEL[now.getMonth()][mon];
			date.innerText = fillChars(now.getDate(), fill * 2);
			day.innerText = DAY_LABEL[now.getDay()][lang];
			if(mon_par) day.innerText = `(${day.innerText})`;

			hours.innerText = fillChars(now.getHours(), fill * 2);
			minutes.innerText = fillChars(now.getMinutes(), fill * 2);
			seconds.innerText = fillChars(now.getSeconds(), fill * 2);
			milliseconds.innerText = fillChars(now.getMilliseconds(), fill * 3);
		};

		this.resume();
	}

	//
	getElements(){
		return {
			year: this.#year,
			month: this.#month,
			date: this.#date,
			day: this.#day,

			hours: this.#hours,
			minutes: this.#minutes,
			seconds: this.#seconds,
			milliseconds: this.#milliseconds,
		};
	}

	//
	pause(){ clearInterval(this.#interval); this.#interval = null; }
	resume(){ this.#interval = setInterval(this.#interval_func, INTERVAL_SPEED); }
	status(){ return ["running", "paused"][Number(!this.#interval)]; }
}

//

function fillChars(text = "", length = 0, char = "0", direction = 0) {
	text = String(text);

	if(length > 0 && char.length > 0){
		let filler = "";
		for (let i = 0; i < Math.max(0, length - text.length); i++) filler += char;

		return [
			filler + text,
			text + filler
		][direction];
	}else{
		return text;
	}
		
}