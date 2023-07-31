$(document).ready(function(){
  let carousel = new Swiper('.carousel__wrapper', {
    loop: true,
    pagination: {
      enabled: true,
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      enabled: false,
      nextEl: '.carousel__button-next',
      prevEl: '.carousel__button-prev',
    },
    breakpoints: {
      992: {
        navigation: {
          enabled: true,
        },
        pagination: {
          enabled: false,
        },
      },
    },
  });
  
  
  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });
  
  
  function toggleSlide(item) {
    $(item).each(function(i) {
      $(this).on('click', function(e) {
        e.preventDefault();
        $('.catalog-item__wrapper').eq(i).toggleClass('catalog-item__wrapper_active');
      }) 
    });
  };
  toggleSlide('.catalog-item__more');
  toggleSlide('.catalog-item__back');

  // $('.footer__social-circle').mouseenter(
  //     function(){ $('.footer__social-runner').toggleClass('footer__social-runner_active-hover').removeClass('footer__social-runner_unHover')},
  // );
  // $('.footer__social-circle').mouseleave(
  //   function(){ $('.footer__social-runner').toggleClass('footer__social-runner_active-hover').addClass('footer__social-runner_unHover')},
  // );

  function toggleCircle(item) {
    $(item).each(function(i) {
      $(this).on('mouseenter', function() {
        $('.footer__social-runner').eq(i).toggleClass('footer__social-runner_active-hover').removeClass('footer__social-runner_unHover');
      });
    });
  };
  toggleCircle('.footer__social-circle');


  $('[data-modal = consultation]').on('click', function(){
    $('#consultation').css('display', 'flex');
    $('.overlay, #consultation, #consultation .modal__close').fadeIn(500);
  });

  $('.modal__close').on('click', function(){
    $('.overlay, #consultation, #consultation .modal__close, #order, #order .modal__close,  #thanks, #thanks .modal__close').fadeOut(500);
  });

  $('.button_catalog-item').each(function(i){
    $(this).on('click', function(){
      $('#order .modal__subtitle').text($('.catalog-item__subtitle').eq(i).text());
      $('#order').css('display', 'flex');
      $('.overlay, #order, #order .modal__close').fadeIn(500);
    });
  });

  function formValide (form) {
    $(form) .validate({
      rules: {
        name: "required",
        phone: "required",
        email: {
          required: true,
          email: true
        },
      },
      messages: {
        name: "Поле обязательно для заполнения",
        phone: "Поле обязательно для заполнения",
        email: {
          required: "Поле обязательно для заполнения",
          email: "Некорректный E-mail"
        }
      },
    });
  }
  formValide('#consultation-form');
  formValide('#consultation form');
  formValide('#order form');

  $('form').submit(function(e){
    e.preventDefault();
    if (!$(this).valid()) {
      return;
    }
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize(),
    }).done(function(){
      $(this).find('input').val('');
      $('#consultation, #consultation .modal__close, #order, #order .modal__close').fadeOut();
      $('#thanks').css('display', 'flex');
      $('.overlay, #thanks, #thanks .modal__close').fadeIn(500);
      $('form').trigger('reset');
    });
    return false;
  });

  $(window).scroll(function(){
    if ($(this).scrollTop() > 1600) {
      $('.pageUp').fadeIn();
    } else {
      $('.pageUp').fadeOut();
    }
  });

  $("a[href^='#']").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      let hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
  new WOW().init();
});


