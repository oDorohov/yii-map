let isFieldCreated = false; // Переменная для отслеживания состояния

function toggleField(button) {
    if (isFieldCreated) {
        map.removeInteraction(drawInteraction);
        button.classList.remove('btn-danger'); // Убираем цвет остановки
        button.classList.add('btn-success'); // Возвращаем начальный цвет
        button.textContent = 'Создать поле'; // Обновляем текст
    } else {
        createField();
        button.classList.remove('btn-success'); // Убираем начальный цвет
        button.classList.add('btn-danger'); // Устанавливаем цвет остановки
        button.textContent = 'Остановить поле'; // Обновляем текст
    }
    isFieldCreated = !isFieldCreated; // Переключаем состояние
}

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

let drawInteraction, tracingFeature, startPoint, endPoint;
let drawing = false;

const getFeatureOptions = {
    hitTolerance: 10,
    layerFilter: layer => layer === drawVector,
};
let previewCoords = [];

// Функция обработки кликов на карте
const handleClick = event => {
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
    }
};

// Функция создания поля
function createField() {
    map.on('click', handleClick);
    map.on('pointermove', handlePointerMove);
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

        // Добавляем задержку перед получением координат
        setTimeout(() => {
            // Получаем координаты в нужном формате
            const coordinates = getFormattedCoordinates();
            console.log("Coordinates after drawend:", coordinates);

            if (coordinates) {
                // Передаем URL и параметры в функцию globalModal
                globalModal("/fields/create", { 'Fields[coordinates]': coordinates }, "POST");
            } else {
                console.log("No features found in drawSource.");
            }
        }, 500); // 500ms задержка, можно настроить по необходимости
    });

    map.addInteraction(drawInteraction);
}

// Обработка нажатий клавиш
const handleKeyUp = event => {
    if (event.keyCode === 27) {
        drawInteraction.removeLastPoint();
    }
};

function getFormattedCoordinates() {
    let coordinates = '';
    const feature = drawSource.getFeatures()[0];

    if (feature) {
        // Преобразуем координаты в EPSG:4326
        feature.getGeometry().transform('EPSG:3857', 'EPSG:4326');
        const coords = feature.getGeometry().getCoordinates();

        if (coords.length > 0) {
            // Преобразуем координаты в строку
            coordinates = coords[0].map(coord => coord.join(' ')).join(', ');
        }

        // Возвращаем координаты в исходную систему
        feature.getGeometry().transform('EPSG:4326', 'EPSG:3857');
    }
    return coordinates;
}	
