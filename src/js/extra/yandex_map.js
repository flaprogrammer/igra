ymaps.ready(init);
var myMap, 
	myPlacemark;

function init(){ 
	myMap = new ymaps.Map("map", {
		center: [55.78801412, 49.13286257],
		zoom: 17
	}); 
	
	myPlacemark = new ymaps.Placemark([55.78801412, 49.13286257], {
		hintContent: 'Игра',
		balloonContent: 'Театр-студия Игра'
	});
	
	myMap.geoObjects.add(myPlacemark);
}