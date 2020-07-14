// ------------------------------ task 1 ------------------------------
const inString = document.querySelector("#in_task_1");
const outString = document.querySelector("#out_task_1");
const btn = document.querySelector("#btn_1");

btn.addEventListener('click', function(event) {
  outString.value = getVowels(inString.value);
  console.log(outString.value);
});

function getVowels(str) {
  const arr = ["а", "е", "ё", "и", "о", "у", "ы", "э", "ю", "я"];
  var getString = "";
  
  str = str.toLowerCase();

  for(let i = 0; i < str.length; i++) {
    for(let n = 0; n < arr.length; n++) {
      if (str[i].includes(arr[n])) {
        getString = getString + arr[n];
      }
    }
  }

  return getString;
}

// ------------------------------ task 2 ------------------------------

const inName_2 = document.querySelector("#in_name_task_2");
const inSalary_2 = document.querySelector("#in_salary_task_2");
const outName_2 = document.querySelector("#out_task_2");
const inStaff_2 = document.querySelector("#in_staff_2");
const inBtn_2 = document.querySelector("#in_btn_2");
const outBtn_2 = document.querySelector("#out_btn_2");

var inArrStaff_2 = [
  {"name": "John", "salary": 500},
  {"name": "Mike", "salary": 1300},
  {"name": "Linda", "salary": 1500}];

var outArrStaff_2 = [];
var i = inArrStaff_2.length;

inArrStaff_2.forEach(element => {
  inStaff_2.value = inStaff_2.value + element.name + ", зарплата: " + element.salary + "\n";
});

inBtn_2.addEventListener('click', function(event) {  
  inArrStaff_2.push({name: inName_2.value, salary: inSalary_2.value});  
  inStaff_2.value = inStaff_2.value + inArrStaff_2[i].name + ", зарплата: " + inArrStaff_2[i].salary + "\n";

  i++;

  inName_2.value = "";
  inSalary_2.value = "";
});

outBtn_2.addEventListener('click', function(event) {  
  outArrStaff_2 = [];

  inArrStaff_2.forEach(function(element) {
    if(element.salary > 1000) {
      outArrStaff_2.push(element.name);
    }
  });

  outName_2.value = outArrStaff_2;
  console.log(outName_2.value);
});

// ------------------------------ task 3 ------------------------------

const inPath_3 = document.querySelector("#in_task_3");
const out_3 = document.querySelector("#out_task_3");
const btn_3 = document.querySelector("#btn_3");

btn_3.addEventListener('click', function(event) {  
  if(inPath_3.value.slice(-5) == ".html") {
    out_3.value = "Файл имеет расширение .html";
    console.log(inPath_3.value.slice(-5) == ".html");
  } else {
    out_3.value = "Файл не имеет расширение .html";
    console.log(inPath_3.value.slice(-5) == ".html");
  }
});

// ------------------------------ task 4 ------------------------------

const inArr_4 = document.querySelector("#arr_4");
const inElemArr_4 = document.querySelector("#in_elem_arr_2");
const inBtn_4 = document.querySelector("#in_btn_4");
const outBtn_4 = document.querySelector("#out_btn_4");
const outArr_4 = document.querySelector("#out_arr_4");

var beginMixedArray = [3,13,74,14,66,15,22,4];
var endMixedArray = [];

inArr_4.value = beginMixedArray;

inBtn_4.addEventListener('click', function(event) {  
  beginMixedArray.push(inElemArr_4.value);
  inElemArr_4.value = "";
  inArr_4.value = beginMixedArray;
});

outBtn_4.addEventListener('click', function(event) {  
  endMixedArray = [];

  beginMixedArray.forEach(function(element) {    
    if(element % 2 == 0) {
      endMixedArray.push(element);
    }    
  });

  outArr_4.value = endMixedArray;
  console.log(outArr_4.value);
});

// ------------------------------ task 5 ------------------------------

const sliderList = document.querySelector("#slider__list");
const controlLeft = document.querySelector("#slider__control-left");
const controlRight = document.querySelector("#slider__control-right");

const minLeft = 0;
const maxLeft = -250;
const step = -50;
var counterSlider = 0;

controlRight.addEventListener('click', function(event) {
  if(counterSlider == maxLeft) {
    event.preventDefault();
  } else {
    counterSlider = counterSlider + step;
    sliderList.style.left = counterSlider + "px";
  }
});

controlLeft.addEventListener('click', function(event) {
  if(counterSlider == minLeft) {
    event.preventDefault();
  } else {
    counterSlider = counterSlider - step;
    sliderList.style.left = counterSlider + "px";
  }
});

// ------------------------------ task 6 ------------------------------

const buttonOpen = document.querySelector("#btn_open");
const modalContainer = document.querySelector("#modal-container");

buttonOpen.addEventListener("click", function() {
  createOverlay("Hello, <b>world</b>!");
});

function createOverlay(content) {
  const overlayElement = document.createElement("div");
  overlayElement.classList.add("overlay");
  
  const modalElement = document.createElement("div");
  modalElement.classList.add("modal");  
  modalElement.innerHTML = content;

  const closeElement = document.createElement("div");
  closeElement.classList.add("close");  
  closeElement.textContent = "x";
  
  modalContainer.append(overlayElement);
  overlayElement.append(modalElement);
  modalElement.append(closeElement);

  overlayElement.addEventListener("click", function(event) {
    if(event.target == overlayElement) {
      deleteOverlay();
    }
  });

  closeElement.addEventListener("click", function() {  
    deleteOverlay();
  });

  function deleteOverlay() {    
    closeElement.remove();
    modalElement.remove();
    overlayElement.remove();
  }
}

// ------------------------------ task 7 ------------------------------

const counterElement = document.querySelector(".counter");
const colorElement = document.querySelector(".color");
const containerElement = document.querySelector(".container");

var controlChange = false;

counterElement.addEventListener("change", function(event) {
  createNewElement(counterElement.value);
});

function createNewElement(number) {  
  let NewElements = "";

  for (let i = 0; i < number; i++) {
    const NewElement = document.createElement("div");
    NewElement.className = "new_element";
    NewElement.textContent = i + 1;
    NewElements = NewElements + NewElement.outerHTML;
  }

  containerElement.innerHTML = NewElements;
};

colorElement.addEventListener("change", function(event) {  
  controlChange = !controlChange;

  const color = event.target.value;
  const arrNewElements = containerElement.querySelectorAll(".new_element");

  for (let i = 0; i < arrNewElements.length; i++) {
    const numberNewElement = i + 1;
    const NewElement = arrNewElements[i];

    if (controlChange) {
      if (numberNewElement % 2 != 0) {
        NewElement.style.backgroundColor = color;
      } else {
        NewElement.style.backgroundColor = "#fff";
      }
    } else {
      if (numberNewElement % 2 == 0) {
        NewElement.style.backgroundColor = color;
      } else {
        NewElement.style.backgroundColor = "#fff";
      }
    }
  }
});