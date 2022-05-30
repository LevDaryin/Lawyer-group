$(document).ready(function(){
    $(window).scroll(function() {
        if ($(this).scrollTop() > 400) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    

    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });

    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    });

    //validation

    function validateForm(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                checkbox: {
                    required: true,
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите своё имя",
                    minlength: jQuery.validator.format("Минимум {0} символа")
                },
                phone: "Пожалуйства, введите свой номер телефона",
                checkbox: {
                  required: "Пожалуйста, подтвердите своё согласие",
                }
            }
    
        });
    };

    validateForm('#consultation-form');
    validateForm('#secondForm');
    validateForm('#order form');

    $('input[name=phone]').mask("+7 (999)-999-99-99")

    //mail

    $('form').submit(function(e) {
        e.preventDefault();
        if (!$(this).valid()) {
            return;                     
        }
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false
    });
});

window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.header__navigation'),
    menuItem = document.querySelectorAll('.header__links'),
    hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('header__navigation_active');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active');
            menu.classList.toggle('header__navigation_active');
        })
    })
})