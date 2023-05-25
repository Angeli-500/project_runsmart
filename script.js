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