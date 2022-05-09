$(window).ready(function () {
  //set max-width to parent-sections
  $(function () {
    function mainWidth() {
      const ele = $(".parent .nav-bar");
      let winWidth = $(window).innerWidth();
      let remainWidth = winWidth - $(".parent .nav-bar").outerWidth();
      if (winWidth <= 1200) {
        ele.addClass("active hide");
        $(".parent .parent-sections").css("width", winWidth);
        $(".parent .section-four .container .over-lay").css("width", winWidth);
      } else {
        $(".parent .parent-sections").css("width", remainWidth);
        ele.removeClass("active hide");
        $(".parent .section-four .container .over-lay").css(
          "width",
          remainWidth
        );
      }
    }
    mainWidth();
    $(window).resize(function () {
      mainWidth();
    });
  });

  const templates = document.querySelector(
    ".parent .section-four .content .items.grid"
  );
  const filterationItems = document.querySelector(
    ".parent .section-four .content .filter-list ul"
  );

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
          <a class="redColor-bgc color" href="${templetesArr["template-link"]}" target="_blank" >live preview</a>
      </div>
    `;
        templates.innerHTML += content;
      });
    });
  })();

  //multi events async function on templates children
  (async function () {
    const data = await getData();
    /**
  - Declare data as vaiablue for waiting fetching data first 
  - allow us to see templates.children 
   */
    [...templates.children].forEach((element) => {
      //multi events
      ["mouseover", "mouseleave"].forEach((event) => {
        element.firstElementChild.addEventListener(
          event,
          function ({ target }) {
            if (event === "mouseover") {
              const imgsHeight = getCssValue(target, "height");
              const imgParentHeight = getCssValue(
                target.parentElement,
                "height"
              );
              target.style.top = `-${imgsHeight - imgParentHeight}px`;
            } else if (event === "mouseleave") {
              target.style.top = `0px`;
            }
          }
        );
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

  function getCssValue(element, property) {
    return window
      .getComputedStyle(element)
      .getPropertyValue(property)
      .replace("px", "");
  }

  const settingIcon = document.querySelector(".parent-sections .setting");
  //click on window to close coloring sections
  window.addEventListener("click", function ({ target }) {
    const colorSettingWidth = getCssValue(settingIcon, "width");
    settingIcon.style.right = `-${colorSettingWidth}px`;
    settingIcon.firstElementChild.classList.remove("active");
  });

  //click on icon color setting
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
  const colorsLists = document.querySelectorAll(
    ".parent-sections .setting .colors li"
  );
  const Parent = document.getElementById("parent");
  const parentSections = document.querySelector(".parent-sections");
  const elementsColors = document.querySelectorAll(".color");
  const elementsbackColors = document.querySelectorAll(".background-color");

  [...colorsLists].forEach((color) => {
    color.addEventListener("click", function () {
      Parent.setAttribute("data-current-color", this.classList[0]);
      const links = document.querySelectorAll("a.color");
      [...links].forEach((link) =>
        link.classList.replace(link.classList[0], this.classList[0] + "-bgc")
      );
      parentSections.setAttribute("data-scrollbar-color", this.classList[0]);
      targetColors(this.classList[0], elementsColors, "-c");
      targetColors(this.classList[0], elementsbackColors, "-bgc");
      const globalColor = window.sessionStorage.setItem(
        "currentColor",
        this.classList[0]
      );
    });
  });

  function targetColors(color, elments, spcialSearch) {
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
  const sectionsLists = document.querySelectorAll(
    ".parent .nav-bar .row ul li"
  );
  sectionsLists.forEach((section, idx, arr) => {
    section.addEventListener("click", function () {
      const currColor = Parent.getAttribute("data-current-color");
      const classes = [currColor + "-c", "active", "color"];
      arr.forEach((e) => (e.className = "heading"));
      this.classList.add(...classes);
    });
  });

  //switch between dark/light mode
  const inputMood = document.querySelectorAll(".parent-sections .input input");
  inputMood.forEach((input) => {
    input.addEventListener("click", function () {
      Parent.className = `parent ${this.id}`;
      window.sessionStorage.setItem("currentMood", Parent.classList[1]);
    });
  });

  //function to check about radio input status (setting section)
  function inputRadioCheck() {
    if ($(".parent").hasClass("light")) {
      $(".parent-sections .input input[class='light']")
        .attr("checked", "")
        .siblings()
        .removeAttr("checked");
    } else if ($(".parent").hasClass("dark")) {
      $(".parent-sections .input input[class='dark']")
        .attr("checked", "")
        .siblings()
        .removeAttr("checked");
    }
  }

  //translate nav-bar section
  const navBarIcon = document.querySelector(".nav-bar .fas.fa-bars");
  navBarIcon.addEventListener("click", function () {
    const navbar = this.parentElement.parentElement.classList;
    if (navbar.contains("hide")) {
      navbar.add("show");
    } else {
      navbar.remove("show");
    }
    navbar.toggle("hide");
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

  //check if sessionStorage is empty or not
  (function () {
    if (window.sessionStorage.length >= 1) {
      local();
      inputRadioCheck();
    } else {
      inputRadioCheck();
    }
  })();

  // use what was stored in localStorage
  function local() {
    let mood = window.sessionStorage.getItem("currentMood"),
      currentColor = window.sessionStorage.getItem("currentColor");

    //check if there is mood value in sessionStorage
    mood
      ? (Parent.className = `parent ${mood}`)
      : (Parent.className = "parent light");

    Parent.setAttribute("data-current-color", currentColor);
    targetColors(currentColor, elementsColors, "-c");
    targetColors(currentColor, elementsbackColors, "-bgc");
  }

  sessionStorage.removeItem("IsThisFirstTime_Log_From_LiveServer");

  //close nav-bar
  $(function () {
    function closeNavBar(target) {
      target.on("click", function () {
        $(".nav-bar").attr("class", "nav-bar active hide");
        $(".color-style.fas.fa-bars").removeClass("fa-times active");
      });
    }
    closeNavBar($(window));
    closeNavBar($(".parent .nav-bar .row ul li"));
  });

  //stop propagation
  $(function () {
    function stopPropagation(target) {
      target.on("click", function (e) {
        e.stopPropagation(); //important
      });
    }
    stopPropagation($(".color-style.fas.fa-bars"));
    stopPropagation($(".parent .nav-bar"));
    stopPropagation($(".parent .parent-sections .setting"));
  });
});

//import typing file (type effect)
const jopsArr = [
  "frontEnd developer",
  "backEnd developer",
  "wordpress Developer",
  "photoshop desginer",
];
import typeEffect from "./typing.js";
typeEffect("type-effect", jopsArr);
