$(document).ready(function() {
    $('#id_profile').on('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                $('#profile-pic').attr('src', e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    // $("#id_birthdate").datepicker({
    //     dateFormat: "yy-mm-dd" 
    // });

    $('#log_btn').on('click', function(event) {
        event.preventDefault(); 
        $('.loading_animation').show();
        $('.loading_animation').css('display', 'flex');
        setTimeout(()=>{
            $('#login_form').submit();
        },2000);
    });

    $('input[name="amount[]"]').number(true, 2);
    $('input[name="price[]"]').number(true, 2);

    $('#item_btn').on('click', function () {
        
        $('#item_table tbody').append(
            '<tr>' +
            '<td class="text-center"><input type="text" class="form-control form-control-plaintext" name="code[]" value="304-36852"></td>' +
            '<td class="text-center"><input type="text" class="form-control form-control-plaintext" name="product-name[]" value="Brake Discs, Pads & Calipers"></td>' +
            '<td class="text-center"><input type="number" class="form-control form-control-plaintext" name="quantity[]" value="4"></td>' +
            '<td class="text-center"><input type="text" class="form-control form-control-plaintext" name="price[]" value="111.36"></td>' +
            '<td class="text-center"><input type="text" class="form-control form-control-plaintext" name="amount[]" value="445.44"></td>' +
            '</tr>'
        );

        $('input[name="amount[]"]').number(true, 2);
        $('input[name="price[]"]').number(true, 2);
       
    });
    
});
