function globalModal(url, params = {}, method = 'GET') {
    var modalElement = document.getElementById('globalModal');
    var modal = new bootstrap.Modal(modalElement);
    var modalContent = $('#modal-content', modalElement);

    // Добавляем параметр ajax в запрос
    params.ajax = true;

    // Настройки для AJAX запроса
    const ajaxOptions = {
        url: url,
        method: method,
        success: function(data) {
            modalContent.html(data);
            modal.show();
        },
        error: function(xhr, status, error) {
            modalContent.html('<p>An error occurred: ' + error + '</p>');
            modal.show();
        }
    };

    // Обработка данных в зависимости от метода запроса
    if (method.toUpperCase() === 'POST') {
        ajaxOptions.data = $.param(params); // Преобразуем параметры в формат application/x-www-form-urlencoded
        ajaxOptions.contentType = 'application/x-www-form-urlencoded'; // Устанавливаем правильный contentType для POST
    } else {
        ajaxOptions.data = params; // Для GET просто передаем параметры
    }

    $.ajax(ajaxOptions);
}


$(document).ready(function() {
    // Обработчик для кнопок, которые открывают модальное окно
    $(document).on('click', '[data-bs-toggle="modal"]', function (e) {
        var url = $(this).data('url'); // Получаем URL из атрибута data-url
        var params = $(this).data('params') || {}; // Получаем дополнительные параметры из data-атрибута

        globalModal(url, params); // Вызываем функцию для загрузки данных и открытия модального окна
    });
});
