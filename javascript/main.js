const colorsLists = document.querySelectorAll(
  ".parent-sections .setting .colors li"
);
const Parent = document.getElementById("parent");
const parentSections = document.querySelector(".parent-sections");
const elementsColors = document.querySelectorAll(".color");
const elementsbackColors = document.querySelectorAll(".background-color");
const templates = document.querySelector(
  ".parent .section-four .content .items.grid"
);
const filterationItems = document.querySelector(
  ".parent .section-four .content .filter-list ul"
);
const settingIcon = document.querySelector(".parent-sections .setting");
const sectionsLists = document.querySelectorAll(
  ".parent .aside.nav-bar .row ul li"
);
const navBarIcon = document.querySelector(".nav-bar .fas.fa-bars");
const inputMood = document.querySelectorAll(".parent-sections .input input");
const currentAge = document.getElementById("current-age");

const currentGlobalColor = Parent.getAttribute("data-current-color");

//set max-width to parent-sections
function mainWidth() {
  const navBar = navBarIcon.parentElement.offsetParent;
  let winWidth = window.innerWidth;
  let remainWidth = winWidth - getCssValue(navBar, "width");
  if (winWidth <= 1200) {
    navBar.className = "nav-bar aside active hide";
    navBarIcon.className = `${currentGlobalColor}-c fas color icon fa-bars`;
    parentSections.style.width = winWidth + "px";
  } else {
    navBar.className = "nav-bar aside show";
    parentSections.style.width = remainWidth + "px";
  }
}
mainWidth();
window.addEventListener("resize", () => mainWidth());

//set current age
(function setCurrentAge() {
  const currentYear = new Date().getFullYear();
  const myBirthday = 1998;
  currentAge.innerHTML = currentYear - myBirthday;
})();

//just fetching data
const getData = async () => {
  return fetch("DataBase/data.json").then((response) => response.json());
};

//set Templates data async function
(async function () {
  const data = await getData();
  const sections = Object.keys(data);
  sections.forEach((sec) => {
    data[sec].forEach((templetesArr) => {
      const content = `
      <div class="bord ${sec} show">
          <img alt="${sec}" src="${templetesArr["img-local-src"]}"/>
          <a class="redColor-bgc background-color" href="${templetesArr["template-link"]}" target="_blank" >live preview</a>
      </div>
    `;
      templates.innerHTML += content;
    });
  });
})();

//multi events async function on templates children
(async function () {
  await getData();
  /**
  - invoke getData() function for waiting fetching data first 
  - allow us to see templates.children 
   */
  [...templates.children].forEach((element) => {
    //multi events
    ["mouseover", "mouseleave"].forEach((event) => {
      element.firstElementChild.addEventListener(event, function ({ target }) {
        if (event === "mouseover") {
          const imgsHeight = getCssValue(target, "height");
          const imgParentHeight = getCssValue(target.parentElement, "height");
          target.style.top = `-${imgsHeight - imgParentHeight}px`;
        } else if (event === "mouseleave") {
          target.style.top = `0px`;
        }
      });
    });
  });
})();

//set filteration list items async function
(async function () {
  const data = await getData();
  Object.keys(data).forEach(
    (li) => (filterationItems.innerHTML += `<li class="heading">${li}</li>`)
  );
  [...filterationItems.children].forEach((list, idx, arr) => {
    list.addEventListener("click", function () {
      arr.forEach((e) => e.classList.remove("active"));
      this.classList.add("active");
      const listText = this.textContent;
      const {
        parentElement: {
          nextElementSibling: { children },
        },
      } = this.parentElement;
      if (listText === "all") {
        [...children].forEach((temp) =>
          temp.classList.replace(temp.classList[2], "show")
        );
      } else {
        const targetTemplates = [
          ...document.querySelectorAll(
            `.parent .section-four .content .items.grid .bord.${listText}`
          ),
        ];
        [...templates.children].forEach((e) =>
          e.classList.replace(e.classList[2], "hide")
        );
        targetTemplates.forEach((e) =>
          e.classList.replace(e.classList[2], "show")
        );
        templates.classList.add("short");
      }
    });
  });
})();

//coloring Live Preview Link
async function coloringLivePreviewLink(color) {
  /*
    we can't do effect on (Live Preview Links) even they
    have background-color class
    becase we created these from js
  */
  await getData();
  const templateslinks = document.querySelectorAll(
    ".portofolio a.background-color"
  );
  [...templateslinks].forEach((link) => {
    link.classList.replace(link.classList[0], color + "-bgc");
  });
}

//get css value func
function getCssValue(element, property) {
  return window
    .getComputedStyle(element)
    .getPropertyValue(property)
    .replace("px", "");
}

//toggle classes func
function toggleClassess(element, classArr) {
  classArr.forEach((cls) => {
    element.classList.toggle(cls);
  });
}

//click on window to close coloring and nav-bar section
window.addEventListener("click", function ({ target }) {
  //close coloring section
  if (settingIcon.firstElementChild.classList.contains("active")) {
    const colorSettingWidth = getCssValue(settingIcon, "width");
    settingIcon.style.right = `-${colorSettingWidth}px`;
    settingIcon.firstElementChild.classList.remove("active");
  }

  const { offsetParent: navBar } = sectionsLists[0].parentElement;
  if (!navBar.classList.contains("active")) {
    navBar.className = "nav-bar aside active hide";
    navBarIcon.className = `${currentGlobalColor}-c fas color icon fa-bars`;
  }
});

//click on icon color's setting
settingIcon.firstElementChild.addEventListener("click", function () {
  const colorSettingWidth = getCssValue(settingIcon, "width");
  const coloringSection = this.parentElement;
  if (this.classList.contains("active")) {
    this.classList.remove("active");
    coloringSection.style.right = `-${colorSettingWidth}px`;
  } else {
    this.classList.add("active");
    coloringSection.style.right = "0px";
  }
});

//coloring web
[...colorsLists].forEach((color) => {
  color.addEventListener("click", function () {
    Parent.setAttribute("data-current-color", this.classList[0]);
    coloringLivePreviewLink(this.classList[0]);
    targetColorsClass(this.classList[0], elementsColors, "-c");
    targetColorsClass(this.classList[0], elementsbackColors, "-bgc");
    window.sessionStorage.setItem("currentColor", this.classList[0]);
  });
});

//coloring all elements by determinded class [color, background-color]
function targetColorsClass(color, elments, spcialSearch) {
  [...elments].forEach((element) => {
    const colorClassIndex = [...element.classList].findIndex((cls) =>
      cls.includes(spcialSearch)
    );
    element.classList.replace(
      element.classList[colorClassIndex],
      color + spcialSearch
    );
  });
}

//when click on nav-bar items
sectionsLists.forEach((section, idx, arr) => {
  section.addEventListener("click", function () {
    const currColor = Parent.getAttribute("data-current-color");
    const classes = [currColor + "-c", "active", "color"];
    arr.forEach((e) => (e.className = "heading"));
    this.classList.add(...classes);
    toggleClassess(navBarIcon.parentElement.offsetParent, [
      "hide",
      "active",
      "show",
    ]);
    toggleClassess(navBarIcon, ["fa-times", "fa-bars"]);
  });
});

//switch between dark/light mode
inputMood.forEach((input) => {
  input.addEventListener("click", function () {
    Parent.className = `parent ${this.id}`;
    window.sessionStorage.setItem("currentMood", Parent.classList[1]);
  });
});

//translate nav-bar section
navBarIcon.addEventListener("click", function () {
  const navbar = this.offsetParent;
  toggleClassess(navbar, ["hide", "active", "show"]);
  toggleClassess(this, ["fa-bars", "fa-times"]);
});

//switch between sections
$(".parent .nav-bar .row ul li").on("click", function () {
  let ele = $("." + $(this).text());
  ele
    .css("z-index", "9")
    .animate(
      {
        left: "0%",
      },
      "fast"
    )
    .siblings(".section")
    .css("z-index", "8")
    .delay(650)
    .animate(
      {
        left: "100%",
      },
      function () {
        ele.css("z-index", "9");
      }
    );
});

// use what was stored in sessionStorage
(function getsessionStorageValue() {
  sessionStorage.removeItem("IsThisFirstTime_Log_From_LiveServer");

  let mood = window.sessionStorage.getItem("currentMood"),
    currentColor = window.sessionStorage.getItem("currentColor");

  //check if there is mood value in sessionStorage
  mood
    ? (Parent.className = `parent ${mood}`)
    : (Parent.className = "parent light");

  //same thing
  if (currentColor) {
    Parent.setAttribute("data-current-color", currentColor); //current mood
    targetColorsClass(currentColor, elementsColors, "-c"); //set current color to all element s has "color" style
    targetColorsClass(currentColor, elementsbackColors, "-bgc"); //set current color to all element s has "background-color" style
    coloringLivePreviewLink(currentColor);
  } else {
    Parent.setAttribute("data-current-color", "redColor"); //current mood
  }

  Parent.querySelector(`.setting .input input.${mood || "light"}`).setAttribute(
    "checked",
    "checked"
  );
})();

//stop propagation
function stopPropagation(target) {
  target.addEventListener("click", function (e) {
    e.stopPropagation(); //important
  });
}
stopPropagation(navBarIcon);
stopPropagation(navBarIcon.parentElement.offsetParent);
stopPropagation(settingIcon);

//import typing file (typing effect)
const jopsArr = [
  "frontEnd developer",
  "backEnd developer",
  "wordpress Developer",
  "photoshop desginer",
];
import typeEffect from "./typing.js";
typeEffect("type-effect", jopsArr);
