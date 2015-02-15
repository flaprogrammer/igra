$(document).ready(function () {
	addListeners();
});

function addListeners () {
	var visible = false;
	$('.employees .hide_but').click(function () {
		$('.employees .hideable').slideToggle(1000, function () {
			visible = !visible;
			if(visible)
				$('.employees .hide_but').text('Свернуть');
			else 
				$('.employees .hide_but').text('Развернуть');
		});
	});
}

//todo
//slider
//hover for buttons
//popup
//ttf font
// прыжок при сворачивании