//'use strict';
/* jshint devel:true */
function flipCards() {
  var flipCard1 = document.getElementById("card1");
  var flipCard2 = document.getElementById("card2");
  var flipCard3 = document.getElementById("card3");
  var flipCard_arr = [flipCard1,flipCard2,flipCard3];

  for (var i = 0; i < flipCard_arr.length; i++) {
        flipCard_arr[i].classList.toggle('flip'); 
  }
}

var flipAllCards = document.getElementById('flipAll');

flipAllCards.addEventListener('click', function() {
  flipCards();
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