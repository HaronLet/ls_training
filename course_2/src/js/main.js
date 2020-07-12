;(function() {
//------------------------------ menu ------------------------------
const menuButton = document.querySelector(".btn-menu");
const menuBody = document.querySelector(".header__menu");
const menuButtonImg = document.querySelectorAll(".btn-menu__img");

var menuButtonChange = false;

menuButton.addEventListener("click", function() {
  menuButtonChange = !menuButtonChange;

  if (menuButtonChange) {    
    menuBody.style.display = "block";
    document.body.style.overflowY = "hidden";
    
    menuButtonImg.forEach(function(e) {      
      if(e.className == "btn-menu__img btn-menu__img--activ") {
        e.className = "btn-menu__img";
      } else {
        e.className = "btn-menu__img btn-menu__img--activ";
      }
    });
  } else {    
    menuBody.style.display = "none";
    document.body.style.overflowY = "visible";

    menuButtonImg.forEach(function(e) {      
      if(e.className == "btn-menu__img btn-menu__img--activ") {
        e.className = "btn-menu__img";
      } else {
        e.className = "btn-menu__img btn-menu__img--activ";
      }
    });
  }
});

//------------------------------ slideshow ------------------------------
const findBlockByAlias = (alias) => {
  return $(".rewievs__item").filter((ndx, item) => {
    return $(item).attr("data-review") === alias;
  });
};

$(".users__item").click((e) => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr("data-user");
  const itemToShow = findBlockByAlias(target);
  const cirItem = $this.closest(".users__item");

  itemToShow.addClass("rewievs__item--activ").siblings().removeClass("rewievs__item--activ");
  cirItem.addClass("users__item--activ").siblings().removeClass("users__item--activ");
});

//------------------------------ accordion ------------------------------
const openItem = (item) => {
  const container = item.closest(".team__item");
  const contentBlock = container.find(".member__body");
  const textBlock = contentBlock.find(".member__body-block");
  const reqHeight = textBlock.height();
  
  container.addClass("team__item--active");
  contentBlock.height(reqHeight);
};
  
const closeEveryItem = (container) => {
  const items = container.find(".member__body");
  const itemContainer = container.find(".team__item");
  const btn = container.find(".member__btn");
  
  itemContainer.removeClass("team__item--active");
  btn.removeClass("member__btn--active");
  items.height(0);
};
  
$(".member__btn").click((e) => {
  const $this = $(e.currentTarget);
  const container = $this.closest(".team__list");
  const elemContainer = $this.closest(".team__item");
  
  if (elemContainer.hasClass("team__item--active")) {
    closeEveryItem(container);
  } else {
    closeEveryItem(container);
    openItem($this);
    $this.addClass("member__btn--active");
  }
});

//------------------------------ slider ------------------------------
const slider = $('.slider__list').bxSlider({
  pager: false,
  controls: false
});

$('.slider__left').click(e => {
  slider.goToPrevSlide();
});

$('.slider__right').click(e => {
  slider.goToNextSlide();
});

//------------------------------ form ------------------------------
const validateFields = (form, fieldsArray) => {
  fieldsArray.forEach((field) => {
    field.removeClass("input-error");

    if (field.val().trim() === "") {
      field.addClass("input-error");
    }
  });

  const errorFields = form.find(".input-error");

  return errorFields.length === 0;
}

$('.form__wrapper').find("[name='tel']").keydown((e) => {
  let isDigit = false;
  let isDash = false;
  let isControl = false;

  if (e.key >= 0 && e.key <= 9) {
      isDigit = true;
  }

  if (e.key == '-') {
      isDash = true;
  }

  if (e.key == 'ArrowLeft' 
    || e.key == 'ArrowRight' 
    || e.key == 'Backspace' 
    || e.key == 'Delete') {
      isControl = true;
  }

  if (!isDigit && !isDash && !isControl) {
      e.preventDefault();
  }
});

$('.form__wrapper').submit((e) => {
  e.preventDefault();

  const form = $(e.currentTarget);
  const name = form.find("[name='name']");
  const phone = form.find("[name='tel']");
  const comment = form.find("[name='comment']");
  const to = form.find("[name='to']");

  const modal = $("#modal");
  const content = modal.find(".modal__contant");

  modal.removeClass("error-modal");

  const isValid = validateFields(form, [name, phone, comment, to]);

  if (isValid) {
    const request = $.ajax({
      url: "https://webdev-api.loftschool.com/sendmail",
      method: "post",
      data: {
        name: name.val(),
        phone: phone.val(),
        comment: comment.val(),
        to: to.val()
      }
    });

    request.done((data) => {
      content.text(data.message);
    });

    request.fail((data) => {
      const message = data.responseJSON.message;
      content.text(message);

      modal.addClass("error-modal");
    });

    request.always((data) => {
      $.fancybox.open({
        href: "#modal",
        type: "inline"
      });
    });
  }
});

$('.modal__btn').click(e => {
  $.fancybox.close();
});

//------------------------------ map ------------------------------
let myMap;
const init = () => {
 myMap = new ymaps.Map("map", {
   center: [55.750626, 37.599642],
   zoom: 14,
   controls: [],
 });
 
 let coords = [
     [55.758594, 37.582604],
     [55.741068, 37.581126],
     [55.749142, 37.602781],
     [55.755991, 37.622498],
   ],
   myCollection = new ymaps.GeoObjectCollection({}, {
     draggable: false,
     iconLayout: 'default#image',
     iconImageHref: './img/icons/map.svg',
     iconImageSize: [46, 57],
     iconImageOffset: [-35, -52]
   });
 
 for (let i = 0; i < coords.length; i++) {
   myCollection.add(new ymaps.Placemark(coords[i]));
 }
 
 myMap.geoObjects.add(myCollection);
 
 myMap.behaviors.disable('scrollZoom');
};
 
ymaps.ready(init);

//------------------------------ OnePageScroll ------------------------------
const sections = $("section");
const display = $(".maincontent");
const sideMenu = $(".radio-menu");
const menuItem = sideMenu.find(".radio-menu__item");

let inScroll = false;

sections.first().addClass("active");

const countSectionPosition = (sectionEq) => {
  const position = sectionEq * -100;

  if (isNaN(position)) {
    console.error("переданно не верное значение в countSectionPosition");
    return 0;
  }
  return position;
}

const resetActiveClassForItem = (item, itemEq, activeClass) => {
  item.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
}

const performTransition = (sectionEq) => { 
  if (inScroll) return;
  
  const transitionOver = 500;
  const mouseInertiaOver = 200;

  inScroll = true;
  
  const position = countSectionPosition(sectionEq);

  display.css({
    transform: `translateY(${position}%)`,
  });

  resetActiveClassForItem(sections, sectionEq, "active");
  resetActiveClassForItem(menuItem, sectionEq, "radio-menu__item--activ");
  
  setTimeout(() => {
    inScroll = false;      
  }, transitionOver + mouseInertiaOver);
};

const viewportScroller = (direction) => {
  const activeSection = sections.filter(".active");
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  return {
    next() {
      if (nextSection.length) { 
        performTransition(nextSection.index());
      }
    },
    prev () {
      if (prevSection.length) {
        performTransition(prevSection.index());
      }
    }
  }
};

$(window).on("wheel", (e) => { 
  const deltaY = e.originalEvent.deltaY;
  const scroller = viewportScroller();

  if (deltaY > 0) {
    scroller.next();
  }
    
  if (deltaY < 0) {   
    scroller.prev();
  }    
});
    
$(window).on("keydown", (e) => {
  const tagName = e.target.tagName.toLowerCase();
  const userTypingInInputs = tagName === "input" || tagName === "textarea";
  const scroller = viewportScroller();

  if (userTypingInInputs) return;

  switch (e.keyCode) { 
    case 38: //prev
      scroller.prev(); 
      break;
  
    case 40: //next
      scroller.next();
      break;
  }
});

$("[data-scroll-to]").click(e => {
  e.preventDefault();
  
  const $this = $(e.currentTarget);
  const target = $this.attr("data-scroll-to");
  const reqSection = $(`[data-section-id=${target}]`);
  
  performTransition(reqSection.index());
});

$(".wrapper").on("touchmove", e => e.preventDefault());

// https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
$("body").swipe( {
  swipe:function(event, direction) {
    const scroller = viewportScroller();
    let scrollDirection = "";

    if (direction === "up") scrollDirection = "next";
    if (direction === "down") scrollDirection = "prev";

    scroller[scrollDirection]();
  }
});

//------------------------------ accordeon ------------------------------

function accordeon(selector) {
  const acco = document.querySelector(selector);
  const items = acco.querySelector('[data-list]').children;
  
  acco.addEventListener('click', function(event) {
    const target = event.target.closest('[data-trigger]');

    if (!target) return;
    
    event.preventDefault();
    const activeClass = target.dataset.trigger;
    const item = target.closest('[data-item]');
    
    if (item.classList.contains(activeClass)) {
      item.classList.remove(activeClass);
    } else {
      for (let i = 0; i < items.length; i++) {
        items[i].classList.remove(activeClass);
      }

      item.classList.add(activeClass);
    }
  });
}

new accordeon('#acc-menu');

//------------------------------ player ------------------------------
function playerApiHtml5(selector) {
  const playerContainer = document.querySelector(selector);
  const player = playerContainer.querySelector('[data-player]');
  const playerControlMainPlay = playerContainer.querySelector('[data-control="mainPlay"]');

  const playerControlPlay = playerContainer.querySelector('[data-control="playPause"]');
  const playerControlPlayback = playerContainer.querySelector('[data-control="playback"]');
  const playerControlPlayCurrent = playerContainer.querySelector('[data-control="playCurrent"]');
  const playerControlPlaybackBtn = playerContainer.querySelector('[data-control="playbackBtn"]');

  const playerControlMuted = playerContainer.querySelector('[data-control="muted"]');
  const playerControlVolumeback = playerContainer.querySelector('[data-control="volumeback"]');
  const playerControlVolumeCurrent = playerContainer.querySelector('[data-control="volumeCurrent"]');
  const playerControlVolumebackBtn = playerContainer.querySelector('[data-control="volumebackBtn"]');
  
  playerContainer.addEventListener('click', function(e) {
    const target = e.target;
    const classPlay = "play";
    const classPause = "pause";
    const classMuted = "muted";

    let isPlay = player.paused;

    e.preventDefault();

    if (target.closest('[data-control]') === playerControlPlay) {
      if (isPlay) {
      player.play();
      target.classList.add(classPlay);
      target.classList.remove(classPause);

      playerControlMainPlay.classList.add(classPlay);
      playerControlMainPlay.classList.remove(classPause);
      } else {
      player.pause();
      target.classList.add(classPause);
      target.classList.remove(classPlay);

      playerControlMainPlay.classList.add(classPause);
      playerControlMainPlay.classList.remove(classPlay);
      }
    }

    if (target.closest('[data-control]') === playerControlMainPlay) {
      if (isPlay) {
      player.play();
      target.classList.add(classPlay);
      target.classList.remove(classPause);

      playerControlPlay.classList.add(classPlay);
      playerControlPlay.classList.remove(classPause);
      } else {
      player.pause();
      target.classList.add(classPause);
      target.classList.remove(classPlay);

      playerControlPlay.classList.add(classPause);
      playerControlPlay.classList.remove(classPlay);
      }
    }

    if (target.closest('[data-control]') === playerControlMuted) {
      if (player.muted) {
      player.muted = false;
      target.classList.remove(classMuted);
    } else {
      player.muted = true;
      target.classList.add(classMuted);
      }
    }

    if (target.closest('[data-control]') === playerControlPlayback) {
      const clickedPosition = e.offsetX;
      const widthElemStyle = getComputedStyle(target).width;
      const widthElem = widthElemStyle.slice(0, widthElemStyle.length-2);
      const newButtonPositionPercent = (clickedPosition / widthElem) * 100;
      
      player.currentTime = (player.duration / 100) * newButtonPositionPercent;
      
      playerControlPlaybackBtn.style.left = `${newButtonPositionPercent}%`;
      playerControlPlayCurrent.style.width = `${100 - newButtonPositionPercent}%`;
    }

    if (target.closest('[data-control]') === playerControlVolumeback) {
      const clickedPosition = e.offsetX;
      const widthElemStyle = getComputedStyle(target).width;
      const widthElem = widthElemStyle.slice(0, widthElemStyle.length-2);
      const newButtonPositionPercent = (clickedPosition / widthElem) * 100;
      
      player.volume = newButtonPositionPercent / 100;
      
      playerControlVolumebackBtn.style.left = `${newButtonPositionPercent}%`;
      playerControlVolumeCurrent.style.width = `${100 - newButtonPositionPercent}%`;
    }

    player.addEventListener("play", function() {
      playerControlVolumebackBtn.style.left = `${player.volume * 100}%`;
      playerControlVolumeCurrent.style.width = `${100 - player.volume * 100}%`;
    });

    player.addEventListener("timeupdate", function() {
      const newButtonPositionPercent = (player.currentTime / player.duration) * 100;

      playerControlPlaybackBtn.style.left = `${newButtonPositionPercent}%`;
      playerControlPlayCurrent.style.width = `${100 - newButtonPositionPercent}%`;
    });

    return;
  }); 
}

new playerApiHtml5('#player');

//------------------------------ youtube ------------------------------
// let player;
// const playerContainer = $(".player");
 
// let eventsInit = () => {
//  $(".player__start").click(e => {
//    e.preventDefault();
 
//    if (playerContainer.hasClass("paused")) {
//      player.pauseVideo();
//    } else {
//      player.playVideo();
//    }
//  });
 
//  $(".player__playback").click(e => {
//    const bar = $(e.currentTarget);
//    const clickedPosition = e.originalEvent.layerX;
//    const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
//    const newPlaybackPositionSec =
//      (player.getDuration() / 100) * newButtonPositionPercent;
 
//    $(".player__playback-button").css({
//      left: `${newButtonPositionPercent}%`
//    });
 
//    player.seekTo(newPlaybackPositionSec);
//  });
 
//  $(".player__splash").click(e => {
//    player.playVideo();
//  })
// };
 
// const formatTime = timeSec => {
//  const roundTime = Math.round(timeSec);
 
//  const minutes = addZero(Math.floor(roundTime / 60));
//  const seconds = addZero(roundTime - minutes * 60);
 
//  function addZero(num) {
//    return num < 10 ? `0${num}` : num;
//  }
 
//  return `${minutes} : ${seconds}`;
// };
 
// const onPlayerReady = () => {
//  let interval;
//  const durationSec = player.getDuration();
 
//  $(".player__duration-estimate").text(formatTime(durationSec));
 
//  if (typeof interval !== "undefined") {
//    clearInterval(interval);
//  }
 
//  interval = setInterval(() => {
//    const completedSec = player.getCurrentTime();
//    const completedPercent = (completedSec / durationSec) * 100;
 
//    $(".player__playback-button").css({
//      left: `${completedPercent}%`
//    });
 
//    $(".player__duration-completed").text(formatTime(completedSec));
//  }, 1000);
// };
 
// const onPlayerStateChange = event => {
//  /*
//    -1 (воспроизведение видео не начато)
//    0 (воспроизведение видео завершено)
//    1 (воспроизведение)
//    2 (пауза)
//    3 (буферизация)
//    5 (видео подают реплики).
//  */
//  switch (event.data) {
//    case 1:
//      playerContainer.addClass("active");
//      playerContainer.addClass("paused");
//      break;
 
//    case 2:
//      playerContainer.removeClass("active");
//      playerContainer.removeClass("paused");
//      break;
//  }
// };
 
// function onYouTubeIframeAPIReady() {
//  player = new YT.Player("yt-player", {
//    height: "405",
//    width: "660",
//    videoId: "LXb3EKWsInQ",
//    events: {
//      onReady: onPlayerReady,
//      onStateChange: onPlayerStateChange
//    },
//    playerVars: {
//      controls: 0,
//      disablekb: 0,
//      showinfo: 0,
//      rel: 0,
//      autoplay: 0,
//      modestbranding: 0
//    }
//  });
// }
 
// eventsInit();
})();