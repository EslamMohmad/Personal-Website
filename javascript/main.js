$(window).ready(function () {
  //set max-width to parent-sections
  $(function () {
    function mainWidth() {
      const ele = $(".parent .nav-bar");
      let winWidth = $(window).innerWidth();
      let remainWidth = winWidth - $(".parent .nav-bar").outerWidth();
      if (winWidth <= 1200) {
        ele.addClass("active");
        $(".parent .parnet-sections").css("width", winWidth);
        $(".parent .section-four .container .over-lay").css("width", winWidth);
      } else {
        $(".parent .parnet-sections").css("width", remainWidth);
        ele.removeClass("active");
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

  function getCssValue(element, property) {
    return window
      .getComputedStyle(element)
      .getPropertyValue(property)
      .replace("px", "");
  }

  const settingIcon = document.querySelector(".parnet-sections .setting");
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
  const targetElemet = $(".parent .nav-bar .row ul");
  $(".parnet-sections .setting .colors li").on("click", function () {
    //add bgcolor to all elements that have bgcolor-style class
    $(".bgcolor-style").css(
      "background-color",
      "var(--" + $(this).attr("class") + ")"
    );

    //add class to parent of list [ul]
    targetElemet.attr("class", $(this).attr("class"));
    $(".parent .nav-bar .row ul li.active").attr(
      "class",
      "heading " + targetElemet.attr("class") + " active"
    );

    //change scrollbar color
    $(".parnet-sections").attr("data-scrollbar-color", $(this).attr("class"));

    //add color to any text that has color-style class
    $(".color-style").css("color", "var(--" + $(this).attr("class") + ")");

    //add color-class to services section
    $(".parent .section-three .row .content").attr(
      "class",
      "content grid " + $(this).attr("class")
    );

    //add border-color-class to portofolio section
    $(".parent .section-four .content .filter-list ul").attr(
      "class",
      $(this).attr("class")
    );

    //store currentColor in sessionStorage
    window.sessionStorage.setItem(
      "currentColor",
      $(this).css("background-color")
    );

    //store currentColorClass in sessionStorage
    window.sessionStorage.setItem("currentColorClass", $(this).attr("class"));
  });

  //when click on nav-bar items
  $(".parent .nav-bar .row ul li").on("click", function () {
    $(this)
      .addClass("heading " + targetElemet.attr("class") + " active")
      .siblings()
      .removeClass("" + targetElemet.attr("class") + " active");
  });

  //switch between dark/light mode
  $(".parnet-sections .input input").on("click", function () {
    $(".parent").attr("class", "parent " + $(this).attr("class"));

    //store currentMood in sessionStorage
    window.sessionStorage.setItem("currentMood", $(".parent").attr("class"));
  });

  //function to check about radio input status (setting section)
  function inputRadioCheck() {
    if ($(".parent").hasClass("light")) {
      $(".parnet-sections .input input[class='light']")
        .attr("checked", "")
        .siblings()
        .removeAttr("checked");
    } else if ($(".parent").hasClass("dark")) {
      $(".parnet-sections .input input[class='dark']")
        .attr("checked", "")
        .siblings()
        .removeAttr("checked");
    }
  }

  //translate nav-bar section
  $(".color-style.fas.fa-bars").on("click", function () {
    $(this).toggleClass("fa-times active");
    if ($(this).hasClass("active")) {
      $(".parent .nav-bar").addClass("translated");
    } else {
      $(".parent .nav-bar").removeClass("translated");
    }
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
            <a href="${templetesArr["template-link"]}" target="_blank" class="bgcolor-style">live preview</a>
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
      currentColor = window.sessionStorage.getItem("currentColor"),
      currentClass = window.sessionStorage.getItem("currentColorClass");

    //check if there is mood value in sessionStorage
    $(".parent").attr("class", mood || "parent light");

    $(".parnet-sections").attr(
      "data-scrollbar-color",
      currentClass || "redColor"
    );

    $(".bgcolor-style").css("background-color", currentColor);
    $(".color-style").css("color", currentColor);

    $(".parent .nav-bar .row ul").attr("class", currentClass);

    $(".parent .nav-bar .row ul li.active").attr(
      "class",
      "heading " + currentClass + " active"
    );
    if ($(".parent .nav-bar .row ul li").hasClass("null")) {
      $(".parent .nav-bar .row ul li.active")
        .attr("class", "heading redColor active")
        .parent()
        .attr("class", "redColor");
    } else {
      $(".parent .nav-bar .row ul li.active")
        .attr("class", "heading " + currentClass + " active")
        .parent()
        .attr("class", currentClass);
    }

    $(".parent .section-three .row .content").attr(
      "class",
      "content grid " + currentClass
    );
    $(".parent .section-four .content .filter-list ul").attr(
      "class",
      currentClass
    );
  }

  sessionStorage.removeItem("IsThisFirstTime_Log_From_LiveServer");

  //close nav-bar
  $(function () {
    function closeNavBar(target) {
      target.on("click", function () {
        $(".nav-bar").attr("class", "nav-bar active");
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
    stopPropagation($(".parent .parnet-sections .setting"));
  });
});
