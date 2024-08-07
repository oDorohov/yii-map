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

function fieldStyle(feature){

	return new ol.style.Style({
			stroke: new ol.style.Stroke({
				color: 'black',
				width: 1.5,
			}),
			fill: new ol.style.Fill({
				color: feature.getProperties("properties").color,
			}),
			text: new ol.style.Text({
				//color: 'black',
				fill: new ol.style.Fill({
					color:'black',
				}),
				stroke: new ol.style.Stroke({
					color:'black',
				}),
				overflow: true,
				//text: ['foo', 'bold 10px sans-serif', ' bar', 'italic 10px sans-serif', ' baz', ''],
				offsetY: 0.1,
				
				text: feature.getProperties("properties").name,
				scale:1.3,
			}),
			image: new ol.style.Circle({
				geometry:"PointGeometryName",
				radius: map.getView().getZoom()/2,
				fill: new ol.style.Fill({color: 'white'}),
				stroke: new ol.style.Stroke({color: '#3399CC', width: 2}),
			}),
		});
	}



var fieldSource =new ol.source.Vector({
	format : new ol.format.GeoJSON(),
	projection:'EPSG:4326',
	
});

var fieldVector = new ol.layer.Vector({
	//title: idField,
	zIndex: 4,
	source: fieldSource,
	style: fieldStyle,
});





const layerGroup = new ol.layer.Group({
	// layers: [fieldVector]	
	layers: [
		fieldVector,	
	]	
});


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

//Добваление векторных слоев на карту
map.addLayer(layerGroup);
