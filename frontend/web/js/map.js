const openStreet = new ol.source.XYZ({
		url: 'http://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    });

const map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: openStreet,
    }),
  ],
  view: new ol.View({
    center: [0, 0],
    zoom: 2,
  }),
  controls:[]
});



if(localStorage.getItem('lon') != null && localStorage.getItem('lat') != null){
	map.getView().setCenter(ol.proj.fromLonLat([localStorage.getItem('lon'),localStorage.getItem('lat')]));
}
if(localStorage.getItem('zoom')!=null){
	map.getView().setZoom(localStorage.getItem('zoom'));
}

function onMoveEnd (){
	var extent = ol.proj.transform(map.getView().getCenter(),'EPSG:3857', 'EPSG:4326');
	localStorage.setItem('lon',extent[0]);
	localStorage.setItem('lat',extent[1]);
	localStorage.setItem('zoom',map.getView().getZoom());
}

map.on('moveend',onMoveEnd);
let drawing = false;



function addFields(url,data) {
	$.ajax({
		url: url,
		data:data,
		type: 'get',
		success: function (data) {
			var format = new ol.format.GeoJSON({extractGeometryName:true});
			console.log(data);
			var features = format.readFeatures(data, {
				featureProjection: 'EPSG:3857',
				
			});
			if (features[0] != undefined){
				fieldSource.addFeatures(features);	
				viewMove(features[0].getGeometry().getLastCoordinate());
			}else{
				alert('Поля не найдены!');
			}
			
		},
		error: function(jqXHR, errMsg,thrownError) {
			if(jqXHR.status==404) {
				alert("поле не найдено");
			}else{
				alert(thrownError);
			}
		}
	});
}



