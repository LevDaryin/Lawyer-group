const hamburger = document.querySelector(".hamburger");
const navigation = document.querySelector(".navigation");
const menu = document.querySelectorAll(".link");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("hamburger_active");
  navigation.classList.toggle("navigation_active");
});

menu.forEach(item => {
  item.addEventListener('click', () => {
    hamburger.classList.toggle("hamburger_active");
    navigation.classList.toggle("navigation_active");
  });
});

$(document).ready(function(){
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
            minlength: jQuery.validator.format("Введите {0} символа")
        },
        phone: "Пожалуйста, введите свой номер телефона",
        checkbox: {
          required: "Пожалуйста, подтвердите своё согласие с политикой конфиденциальности",
        }
      }
    });
  };

  validateForm('#consultation-form');

  $('input[name=phone]').mask("+7 (999)-999-99-99");

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
        $('.modal').fadeIn('slow');

        $('form').trigger('reset');
    });
    return false
  });

  $('.close').on('click', function() {
    $('.modal').fadeOut('slow');
  });
});