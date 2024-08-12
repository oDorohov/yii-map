

// Создание источника данных для GeoJSON
var fieldsSource =new ol.source.Vector({
	url : "/fields/get",
	format : new ol.format.GeoJSON(),
});
	    
var fieldsLayer = new ol.layer.Vector({
	title:'fields',
	source: fieldsSource,
});



map.addLayer(fieldsLayer);

