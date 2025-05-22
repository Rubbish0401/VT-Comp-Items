//

const LONGCLICK_WAIT = 500;
const LONGCLICK_INTERVAL = 50;

//

var labelInput;

var display;

var maxDisplay;
var maxDecBtn;
var maxIncBtn;

var countDecBtn;
var countIncBtn;

//

var longclickPrepare;
var longclickInterval;

//

document.addEventListener("DOMContentLoaded", root_event => {
	// Get Elements
	labelInput = document.getElementById("label-input");

	display = document.getElementById("count");

	maxDisplay = document.getElementById("max-input");
	maxDecBtn = document.getElementById("max-decrease");
	maxIncBtn = document.getElementById("max-increase");
	countDecBtn = document.getElementById("count-decrease");
	countIncBtn = document.getElementById("count-increase");

	// Customise
	labelInput.value = controller.label;
	display.value = controller.count;
	maxDisplay.value = controller.max;

	// Add Event Listeners
	controller.addEventListener("import", obj => { 
		labelInput.value = controller.label;
		display.value = controller.count;
		maxDisplay.value = controller.max;
	});
	controller.addEventListener("change-max", obj => { maxDisplay.value = obj.target.max; });
	controller.addEventListener("change-count", obj => { display.value = obj.target.count; });

	labelInput.addEventListener("change", event => { controller.setLabel(String(event.target.value)); });
	labelInput.addEventListener("keydown", event => {
		if(event.key == "Enter"){
			labelInput.dispatchEvent(new InputEvent("change"));
			labelInput.blur();
		}
	});

	display.addEventListener("change", event => { controller.setCount(Number(event.target.value)); });
	display.addEventListener("keydown", event => {
		if(event.key == "Enter"){
			display.dispatchEvent(new InputEvent("change"));
			display.blur();
		}
	});
	
	maxDisplay.addEventListener("change", event => { controller.setMax(Number(maxDisplay.value)); });

	maxDecBtn.addEventListener("click", event => { controller.addMax(-1); });
	maxDecBtn.addEventListener("pointerdown", event => {
		if(!longclickInterval) longclickPrepare = setTimeout(() => {
			longclickInterval = setInterval(() => {
				controller.addMax(-1);
			}, LONGCLICK_INTERVAL);
			longclickPrepare = null;
		}, LONGCLICK_WAIT);
	});
	maxDecBtn.addEventListener("pointerup", cancelLongclick);
	maxDecBtn.addEventListener("pointerout", cancelLongclick);

	maxIncBtn.addEventListener("click", event => { controller.addMax(1); });
	maxIncBtn.addEventListener("pointerdown", event => {
		if(!longclickInterval) longclickPrepare = setTimeout(() => {
			longclickInterval = setInterval(() => {
				controller.addMax(1);
			}, LONGCLICK_INTERVAL);
			longclickPrepare = null;
		}, LONGCLICK_WAIT);
	});
	maxIncBtn.addEventListener("pointerup", cancelLongclick);
	maxIncBtn.addEventListener("pointerout", cancelLongclick);

	countDecBtn.addEventListener("click", event => { controller.addCount(-1); });
	countDecBtn.addEventListener("pointerdown", event => {
		if(!longclickInterval) longclickPrepare = setTimeout(() => {
			longclickInterval = setInterval(() => {
				controller.addCount(-1);
			}, LONGCLICK_INTERVAL);
			longclickPrepare = null;
		}, LONGCLICK_WAIT);
	});
	countDecBtn.addEventListener("pointerup", cancelLongclick);
	countDecBtn.addEventListener("pointerout", cancelLongclick);

	countIncBtn.addEventListener("click", event => { controller.addCount(1); });
	countIncBtn.addEventListener("pointerdown", event => {
		if(!longclickInterval) longclickPrepare = setTimeout(() => {
			longclickInterval = setInterval(() => {
				controller.addCount(1);
			}, LONGCLICK_INTERVAL);
			longclickPrepare = null;
		}, LONGCLICK_WAIT);
	});
	countIncBtn.addEventListener("pointerup", cancelLongclick);
	countIncBtn.addEventListener("pointerout", cancelLongclick);

	// Others
	
});

//
function cancelLongclick(event){
	if(longclickPrepare) clearTimeout(longclickPrepare);
	if(longclickInterval) clearInterval(longclickInterval);
	longclickPrepare = null;
	longclickInterval = null;
}