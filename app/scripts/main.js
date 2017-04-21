//'use strict';
/* jshint devel:true */
var flipCard1 = document.getElementById("card1");
var flipCard2 = document.getElementById("card2");
var flipCard3 = document.getElementById("card3");
var btnGo = document.getElementById("btnGo");

//click flip cards
function flipCards() {
  var flipCard_arr = [flipCard1,flipCard2,flipCard3];
  for (var i = 0; i < flipCard_arr.length; i++) {
        flipCard_arr[i].classList.toggle('flip'); 
  }
}


var flipAllCards = document.getElementById('flipAll');
flipAllCards.addEventListener('click', function() {
  flipCards();
});

//reset all cards
function resetCards() {
  var flipCard_arr = [flipCard1,flipCard2,flipCard3];
  btnGo.style.opacity = "0";
  for (var i = 0; i < flipCard_arr.length; i++) {
        flipCard_arr[i].style.opacity = "1";
        flipCard_arr[i].style.transform = "scale(1,1)";
        
  }
}


//click change styles for cards
flipCard1.addEventListener('click', function() {
  resetCards();
  btnGo.style.opacity = "1";
  var arr_1 = [flipCard2,flipCard3];
  for (var i = 0; i < arr_1.length; i++) {
        arr_1[i].style.transform = "scale(0.85,0.85)";
        arr_1[i].style.opacity = "0.85";
  }
});

flipCard2.addEventListener('click', function() {
  resetCards();
  btnGo.style.opacity = "1";
  var arr_2 = [flipCard1,flipCard3];
  for (var i = 0; i < arr_2.length; i++) {
        arr_2[i].style.transform = "scale(0.85,0.85)";
        arr_2[i].style.opacity = "0.85";
  }
});

flipCard3.addEventListener('click', function() {
  resetCards();
  btnGo.style.opacity = "1";
  var arr_3 = [flipCard1,flipCard2];
  for (var i = 0; i < arr_3.length; i++) {
        arr_3[i].style.transform = "scale(0.85,0.85)";
        arr_3[i].style.opacity = "0.85";
  }
});

//lock blockchain button when click outside div
function blockInfoLock(e) {
   e.stopPropagation();
}
//if click outside cards will reset
document.onclick = check;
function check(e){ 
  var target = (e && e.target) || (event && event.target);
  var container = document.getElementById("container-body");
  if (!checkParent(target, container)) {
    resetCards();
  }
  else if (flipAllCards.onclick != blockInfoLock) {
    flipAllCards.addEventListener("click", blockInfoLock, false);
  }
   else {
    return;
  }
}

function checkParent(t, elm) {
  while(t.parentNode) {
    if( t == elm ) {
      return true;
    }
    t = t.parentNode;
  }
  return false;
}

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