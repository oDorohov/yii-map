// Инициализация всплывающего окна и добавление его на карту
function initPopupMenu(map, Source) {
    const popupElement = document.getElementById('popup');
    const popup = new ol.Overlay({
        element: popupElement,
        positioning: 'bottom-center',
        stopEvent: true,
        offset: [0, -10], // Смещение позиции всплывающего окна
    });
    map.addOverlay(popup);

    // Обработка кликов на карту
    map.on('click', function(event) {
        
		if (drawing) {
            return;
        }
		
		let clickedFeature = map.forEachFeatureAtPixel(event.pixel, function(feature) {
            return feature;
        });
		
        if (clickedFeature) {
			
			
            // Пример: добавление содержимого в всплывающее окно
            const content = `
                <p><strong>Feature ID:</strong> ${clickedFeature.getId()}</p>
                <button id="delete-feature">Удалить поле</button>
                <button id="edit-feature">Редактировать поле</button>
				<button id="edit-planting-entries">Посевы</button>
            `;
            document.getElementById('popup-content').innerHTML = content;

            // Устанавливаем позицию и показываем всплывающее окно
            popup.setPosition(event.coordinate);
            popupElement.style.display = 'block';

            // Обработка кликов на кнопки в всплывающем меню
            document.getElementById('delete-feature').onclick = function() {
				console.log(clickedFeature);
                
                popupElement.style.display = 'none';
                // Здесь можно добавить код для удаления объекта с сервера
				sendToServer(`/fields/delete?id=${clickedFeature.getId()}`, {}, "POST", (data) => {
                    // Обработчик успешного Удаления
                    Source.removeFeature(clickedFeature);
                });
            };

            document.getElementById('edit-feature').onclick = function() {
                // Здесь можно реализовать логику редактирования
                alert("Редактирование пока не реализовано.");
            };
			document.getElementById('edit-planting-entries').onclick = function() {
                // Здесь можно реализовать логику редактирования
                
				globalModal("/planting-entries/index", {field_id:clickedFeature.getId()}, "GET");
            };
        } else {
            // Скрываем всплывающее окно, если клик был не по полю
            popupElement.style.display = 'none';
        }
    });

    // Закрытие всплывающего окна при клике вне объекта
    map.on('click', function(event) {
        if (!map.hasFeatureAtPixel(event.pixel)) {
            popupElement.style.display = 'none';
        }
    });
}

