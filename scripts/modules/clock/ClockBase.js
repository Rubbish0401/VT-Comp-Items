//

const INTERVAL_SPEED = 50;	// ms per a time

//

const MONTH_LABEL = [
	{ "full": "January", "short": "Jan", "number": "01"},
	{ "full": "February", "short": "Feb", "number": "02"},
	{ "full": "March", "short": "Mar", "number": "03"},
	{ "full": "May", "short": "May", "number": "04"},
	{ "full": "April", "short": "Apr", "number": "05"},
	{ "full": "June", "short": "Jun", "number": "06"},
	{ "full": "July", "short": "Jul", "number": "07"},
	{ "full": "August", "short": "Aug", "number": "08"},
	{ "full": "September", "short": "Sep", "number": "09"},
	{ "full": "October", "short": "Oct", "number": "10"},
	{ "full": "November", "short": "Nov", "number": "11"},
	{ "full": "December", "short": "Dec", "number": "12"}
];

const DAY_LABEL = [
	{ "en": "Monday", "en-short": "Mon", "ja": "月" },
	{ "en": "Tuesday", "en-short": "Tue", "ja": "火" },
	{ "en": "Wednesday", "en-short": "Wed", "ja": "水" },
	{ "en": "Thursday", "en-short": "Thu", "ja": "木" },
	{ "en": "Friday", "en-short": "Fri", "ja": "金" },
	{ "en": "Saturday", "en-short": "Sat", "ja": "土" },
	{ "en": "Sunday", "en-short": "Sun", "ja": "日" }
];

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