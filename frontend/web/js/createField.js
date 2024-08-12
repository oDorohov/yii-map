let isFieldCreated = false; // Переменная для отслеживания состояния

// Функция для переключения состояния создания поля
function toggleField(button) {
    if (isFieldCreated) {
        map.removeInteraction(drawInteraction);
        button.classList.remove('btn-danger');
        button.classList.add('btn-success');
        button.textContent = 'Создать поле';
    } else {
        createField();
        button.classList.remove('btn-success');
        button.classList.add('btn-danger');
        button.textContent = 'Остановить поле';
    }
    isFieldCreated = !isFieldCreated; // Переключаем состояние
}

// Создание источника данных для рисования
const drawSource = new ol.source.Vector({
    projection: 'EPSG:4326',
});

const previewLine = new ol.Feature({
    geometry: new ol.geom.LineString([]),
});

// Создание слоев для рисования и предпросмотра
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
    }, { hitTolerance: 10, layerFilter: layer => layer === drawVector });

    if (!hit) {
        previewLine.getGeometry().setCoordinates([]);
        tracingFeature = null;
    }
};

// Функция обработки перемещения указателя мыши
const handlePointerMove = event => {
    if (tracingFeature && drawing) {
        const coord = map.getCoordinateFromPixel(event.pixel);
        endPoint = tracingFeature.getGeometry().getClosestPoint(coord);
        const previewCoords = getPartialRingCoords(tracingFeature, startPoint, endPoint);
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

    drawInteraction.on('drawend', (event) => {
        setTimeout(() => {
            const coordinates = getFormattedCoordinates();
            console.log("Coordinates after drawend:", coordinates);
            if (coordinates) {
                // Отправка координат на сервер с функцией-обработчиком при успешном сохранении
                sendToServer("/fields/create", { 'Fields[coordinates]': coordinates }, "POST", (data) => {
                    // Обработчик успешного сохранения
					console.log(data.id);
                    const feature = event.feature; // Получаем объект feature, который был нарисован
                    feature.set('serverId', data.id); // Пример: добавляем ID от сервера в атрибуты feature
                    console.log("Feature updated with server response:", feature);
                });
            } else {
                console.log("No features found in drawSource.");
            }
        }, 500);

        previewLine.getGeometry().setCoordinates([]);
        tracingFeature = null;
        drawing = false;
    });

    map.addInteraction(drawInteraction);
}

// Обработка нажатий клавиш
const handleKeyUp = event => {
    if (event.keyCode === 27) { // Esc key
        drawInteraction.removeLastPoint();
    }
};

// Функция для получения отформатированных координат
function getFormattedCoordinates() {
    const feature = drawSource.getFeatures().at(-1); // Получаем последнюю добавленную фигуру
    if (!feature) return '';

    feature.getGeometry().transform('EPSG:3857', 'EPSG:4326');
    const coords = feature.getGeometry().getCoordinates();
    feature.getGeometry().transform('EPSG:4326', 'EPSG:3857');

    return coords.length > 0 
        ? coords[0].map(coord => coord.join(' ')).join(', ')
        : '';
}

// Функция отправки данных на сервер
function sendToServer(url, params = {}, method = 'GET', onSuccess = null) {
    params.ajax = true;

    const ajaxOptions = {
        url: url,
        method: method.toUpperCase(),
        data: method.toUpperCase() === 'POST' ? $.param(params) : params,
        contentType: method.toUpperCase() === 'POST' ? 'application/x-www-form-urlencoded' : undefined,
        success: data => {
            console.log("Save successful");
            if (onSuccess) onSuccess(data); // Вызов обработчика при успешном сохранении
        },
        error: (xhr, status, error) => {
            console.log("Error:", error);
        }
    };

    $.ajax(ajaxOptions);
}



