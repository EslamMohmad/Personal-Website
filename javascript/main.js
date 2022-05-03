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

  //translate setting section
  $(".parnet-sections .setting .icon").on("click", function () {
    const eleWidth = $(this).parent().outerWidth();
    if ($(this).hasClass("active")) {
      $(this)
        .parent()
        .animate({
          right: -eleWidth + "px",
        })
        .children(".icon")
        .removeClass("active");
    } else {
      $(this)
        .parent()
        .animate({
          right: 0,
        })
        .children(".icon")
        .addClass("active");
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

  //fetch data
  const templates = document.querySelector(
    ".parent .section-four .content .items.grid"
  );
  fetch("DataBase/data.json")
    .then((response) => response.json())
    .then((data) => {
      const sections = Object.keys(data);
      sections.forEach((sec) => {
        data[sec].forEach((templetesArr) => {
          const content = `
        <div class="bord ${sec}">
            <img alt="${sec}" src="${templetesArr["img-local-src"]}"/>
            <a href="${templetesArr["template-link"]}" target="_blank" class="bgcolor-style">live preview</a>
        </div>
      `;
          templates.innerHTML += content;
        });
      });
      PortofolioFunc();
      //check if sessionStorage is empty or not

      //set that function here becase we create element from here
      $(function () {
        if (window.sessionStorage.length >= 1) {
          local();
          inputRadioCheck();
        } else {
          inputRadioCheck();
        }
      });
    });

  function PortofolioFunc() {
    [...templates.children].forEach((element) => {
      //multi events
      ["mouseover", "mouseleave"].forEach((event) => {
        element.firstElementChild.addEventListener(
          event,
          function ({ target }) {
            if (event === "mouseover") {
              const imgsHeight = +window
                .getComputedStyle(target)
                .getPropertyValue("height")
                .replace("px", "");
              const imgParentHeight = +window
                .getComputedStyle(target.parentElement)
                .getPropertyValue("height")
                .replace("px", "");
              target.style.top = `-${imgsHeight - imgParentHeight}px`;
            } else if (event === "mouseleave") {
              target.style.top = `0px`;
            }
          }
        );
      });
    });
  }

  //section-four filter items
  $(".parent .section-four .content .filter-list ul li").on(
    "click",
    function () {
      $(this).addClass("active").siblings().removeClass("active");
      let item = $(".bord." + $(this).text());
      const parent = $(".parent .section-four .content .grid").children();
      if ($(this).text() == "all") {
        parent.fadeIn().parent().removeClass("short"); // grid setting
      } else {
        parent.fadeOut(function () {
          parent.parent().addClass("short");
        });
        item.delay(400).fadeIn();
      }
    }
  );

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
