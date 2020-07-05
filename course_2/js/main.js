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

$('.form__wrapper').submit(e => {
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