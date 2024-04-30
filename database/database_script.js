// функция которая отрабатывает при нажатии "submit" и отправляет ajax POST-запрос в php
$(document).ready(function(){
    $('#products').submit(function(e){
        e.preventDefault();
        var id = $('#id').val();
        var name = $('#name').val();
        var image = $('#image').val();
        var price = $('#price').val();
        $.ajax({
            type: 'POST',
            url: 'database/php/insert.php',
            data: {id: id, name: name, image: image, price: price},
            success: function(response){
                alert(response);
            }
        });
    });
});