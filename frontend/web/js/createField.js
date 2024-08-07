// Ресурс создания полей
const drawSource = new ol.source.Vector({
    projection: 'EPSG:4326',
});

const previewLine = new ol.Feature({
    geometry: new ol.geom.LineString([]),
});

// Слои создания полей
const drawVector = new ol.layer.Vector({
    source: drawSource,
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'rgba(100, 255, 0, 1)',
            width: 2,
        }),
        fill: new ol.style.Fill({
            color: 'rgba(100, 255, 0, 0.3)',
        }),
    }),
});

const previewVector = new ol.layer.Vector({
    source: new ol.source.Vector({
        features: [previewLine],
    }),
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'rgba(255, 0, 0, 1)',
            width: 2,
        }),
    }),
});

// Добавление слоев на карту
map.addLayer(drawVector);
map.addLayer(previewVector);

const typeSelect = ["Polygon", "LineString"];

let drawInteraction, tracingFeature, startPoint, endPoint;
let drawing = false;
let coordar = [];
const getFeatureOptions = {
    hitTolerance: 10,
    layerFilter: layer => layer === drawVector,
};
let previewCoords = [];

// Функция обработки кликов на карте
const handleClick = event => {
    const coordinates = ol.proj.transform(event.coordinate, 'EPSG:3857', 'EPSG:4326');
    coordar.push(coordinates);
    console.log(coordar);

    if (!drawing) return;

    let hit = false;
    map.forEachFeatureAtPixel(event.pixel, feature => {
        if (tracingFeature && feature !== tracingFeature) return;

        hit = true;
        const coord = map.getCoordinateFromPixel(event.pixel);

        if (feature === tracingFeature) {
            endPoint = tracingFeature.getGeometry().getClosestPoint(coord);
            const appendCoords = getPartialRingCoords(tracingFeature, startPoint, endPoint);
            drawInteraction.removeLastPoint();
            drawInteraction.appendCoordinates(appendCoords);
            tracingFeature = null;
        }

        tracingFeature = feature;
        startPoint = tracingFeature.getGeometry().getClosestPoint(coord);
    }, getFeatureOptions);

    if (!hit) {
        previewLine.getGeometry().setCoordinates([]);
        tracingFeature = null;
    }
};

// Функция обработки перемещения указателя мыши
const handlePointerMove = event => {
    if (tracingFeature && drawing) {
        let coord = null;
        map.forEachFeatureAtPixel(event.pixel, feature => {
            if (tracingFeature === feature) {
                coord = map.getCoordinateFromPixel(event.pixel);
            }
        }, getFeatureOptions);

        if (coord) {
            endPoint = tracingFeature.getGeometry().getClosestPoint(coord);
            previewCoords = getPartialRingCoords(tracingFeature, startPoint, endPoint);
        }
        previewLine.getGeometry().setCoordinates(previewCoords);
        console.log(previewCoords);
    }
};

// Функция создания поля
function createField() {
    map.on('click', handleClick);
    map.on('pointermove', handlePointerMove);

    typeSelect.onchange = () => {
        map.removeInteraction(drawInteraction);
        addInteraction();
    };

    addInteraction();
}

// Функция добавления взаимодействия рисования
function addInteraction() {
    drawInteraction = new ol.interaction.Draw({
        source: drawVector.getSource(),
        type: 'Polygon',
    });

    drawInteraction.on('drawstart', () => {
        drawing = true;
        document.addEventListener('keyup', handleKeyUp);
    });

    drawInteraction.on('drawend', () => {
        map.removeInteraction(drawInteraction);
        drawing = false;
        previewLine.getGeometry().setCoordinates([]);
        tracingFeature = null;
    });

    map.addInteraction(drawInteraction);
}

// Обработка нажатий клавиш
const handleKeyUp = event => {
    if (event.keyCode === 27) {
        drawInteraction.removeLastPoint();
        coordar.pop();
    }
};

// Функция получения координат
function Coordinates() {
    let polygon = '';
    const feature = drawSource.getFeatures()[0];
    if (feature) {
        feature.getGeometry().transform('EPSG:3857', 'EPSG:4326');
        feature.getGeometry().getCoordinates().forEach(elem => {
            elem.forEach(el => {
                polygon += el.toString().replace(',', ' ') + ',';
            });
        });
        feature.getGeometry().transform('EPSG:4326', 'EPSG:3857');
        polygon = polygon.slice(0, -1);
        console.log(polygon);
    }
}


