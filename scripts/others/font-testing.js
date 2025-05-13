document.addEventListener("DOMContentLoaded", root_event => {
	// Get Elements
	fontSelect = document.getElementById("font-select");
	fontSamples = document.getElementById("font-samples");

	// Add EventListeners
	fontSelect.addEventListener("change", event => {
		fontSamples.style.fontFamily = String(fontSelect.value);
	});

	// Append
	fontSelect.append(...(function*(){
		for(let font of FONT_NAMES) if(font.length > 0) {
			let opt = document.createElement("option");
			opt.value = font;
			opt.innerText = font;
			opt.style.fontFamily = font;

			yield opt;
		}
	})());

	// Others
	fontSelect.dispatchEvent(new InputEvent("change", { data: FONT_NAMES[0] }));
});