var slider = tns({
    container: '.carousel__slider',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    mouseDrag: true,
    controls: false,
    navPosition: 'bottom',
    responsive: {
        0: {
            nav: true
        },
        992: {
            nav: false,
          },
    }
  });

document.querySelector('.next').onclick = function () {
  slider.goTo('next');
};

document.querySelector('.prev').onclick = function () {
  slider.goTo('prev');
};

  

$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
  $(this)
    .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
    .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
});

 

function toggleSlide(item) {
  $(item).each(function(i) {
    $(this).on('click', function(e) {
      e.preventDefault();
      $('.catalog-item__flipper').eq(i).toggleClass('catalog-item__flipper_active');
    }) 
  });
};
toggleSlide('.catalog-item__more');
toggleSlide('.catalog-item__back');
