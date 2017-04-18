'use strict';
/* jshint devel:true */
$(window).resize(function () {
    $('.grid').masonry('bindResize');
});

// $(window).load(function(){
$('.grid').masonry({
    itemSelector: '.grid-item'
    //columnWidth: 300,
    // gutter: 5,
    // percentPosition: true,
    // isFitWidth: true
});  
//   });

$('.menu-icon').click(function(){
    $('.menu-icon').addClass('fadeOutRight');
});

$('.close-button').click(function(){
    $('.menu-icon').removeClass('fadeOutRight');
    $('.menu-icon').addClass('fadeInRight');
});


$(function(){
  if($('body').is('.ready-to-use')){

      $('.multiple-items').slick({
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 5,
        dots: true,
        responsive: [
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              infinite: true,
              dots: true,
              arrows: false
            }
          }
        ]
      });

      $('.single-item').slick({
        dots: true
      });
  }
});