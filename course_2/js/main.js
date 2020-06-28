
const menuButton = document.querySelector(".btn-menu");
const menuBody = document.querySelector(".header__menu");
const menuButtonImg = document.querySelectorAll(".btn-menu__img");

var menuButtonChange = false;

menuButton.addEventListener("click", function() {
  menuButtonChange = !menuButtonChange;

  if (menuButtonChange) {    
    menuBody.style.display = "block";
    
    menuButtonImg.forEach(function(e) {      
      if(e.className == "btn-menu__img btn-menu__img--activ") {
        e.className = "btn-menu__img"
      } else {
        e.className = "btn-menu__img btn-menu__img--activ"
      }
    });
  } else {    
    menuBody.style.display = "none";

    menuButtonImg.forEach(function(e) {      
      if(e.className == "btn-menu__img btn-menu__img--activ") {
        e.className = "btn-menu__img"
      } else {
        e.className = "btn-menu__img btn-menu__img--activ"
      }
    });
  }
});