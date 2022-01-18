/*!
 * vClock v2.3
 * Copyright 2015-2021 Comfort Software Group
 * All rights reserved
 */
var isEmbed = $("body").hasClass("embed");
function langInit() {
  var a = "";
  if (langC.swOff !== "") {
    a += ".switch-button label:before {content: '" + langC.swOff + "'}";
  }
  if (langC.swOn !== "") {
    a +=
      ".switch-button input[type='checkbox']:checked + span label:before {content: '" +
      langC.swOn +
      "'}";
  }
  if (langC.swYes !== "") {
    a +=
      ".switch-button.switch-button-yesno input[type='checkbox']:checked + span label:before {content: '" +
      langC.swYes +
      "'}";
  }
  if (langC.swNo !== "") {
    a +=
      ".switch-button.switch-button-yesno label:before {content: '" +
      langC.swNo +
      "'}";
  }
  if (a !== "") {
    $("body").append("<style>" + a + "</style>");
  }
}
langInit();
var dayLC = langC.day.toLowerCase();
var daysLC = langC.days.toLowerCase();
(function (C) {
  var A,
    j = {},
    c = window,
    h = console,
    g = Math,
    q = "postMessage",
    b = 0,
    a = "hasOwnProperty",
    t = [].slice,
    u = "fail",
    B = c.Worker;
  function n() {
    do {
      b = 2147483647 > b ? b + 1 : 0;
    } while (j[a](b));
    return b;
  }
  if (!/MSIE 10/i.test(navigator.userAgent)) {
    try {
      C = c.URL.createObjectURL(
        new Blob([
          "var f={},p=postMessage,r='hasOwnProperty';onmessage=function(e){var d=e.data,i=d.i,t=d[r]('t')?d.t:0;switch(d.n){case'a':f[i]=setInterval(function(){p(i)},t);break;case'b':if(f[r](i)){clearInterval(f[i]);delete f[i]}break;case'c':f[i]=setTimeout(function(){p(i);if(f[r](i))delete f[i]},t);break;case'd':if(f[r](i)){clearTimeout(f[i]);delete f[i]}break}}",
        ])
      );
    } catch (k) {}
  }
  if (typeof B !== "undefined") {
    try {
      A = new B(C);
      c.setInterval = function (f, e) {
        var d = n();
        j[d] = { c: f, p: t.call(arguments, 2) };
        A[q]({ n: "a", i: d, t: e });
        return d;
      };
      c.clearInterval = function (d) {
        if (j[a](d)) {
          delete j[d], A[q]({ n: "b", i: d });
        }
      };
      c.setTimeout = function (f, e) {
        var d = n();
        j[d] = { c: f, p: t.call(arguments, 2), t: !0 };
        A[q]({ n: "c", i: d, t: e });
        return d;
      };
      c.clearTimeout = function (d) {
        if (j[a](d)) {
          delete j[d], A[q]({ n: "d", i: d });
        }
      };
      A.onmessage = function (l) {
        var f = l.data,
          o,
          m;
        if (j[a](f)) {
          m = j[f];
          o = m.c;
          if (m[a]("t")) {
            delete j[f];
          }
        }
        if (typeof o == "string") {
          try {
            o = new Function(o);
          } catch (d) {}
        }
        if (typeof o == "function") {
          o.apply(c, m.p);
        }
      };
    } catch (k) {
      h.log(u);
    }
  } else {
    h.log(u);
  }
})("vClockTimerWorker");
var configC = {
  themeNightMode: false,
  themeColorId: 0,
  themeDigitalFont: true,
  themeFullScreen: false,
  clock12hour: true,
  clockDateVisible: true,
  buttonsVisible: true,
  alarmFontSizeId: 1,
  alarmHash: "",
  alarmAudioCode: "bells",
  alarmAudioLoop: true,
  timerFontSizeId: 1,
  timerHash: "",
  timerAudioCode: "xylophone",
  timerAudioLoop: true,
  swFontSizeId: 1,
  swHash: "",
  swTimeFormat: 1,
  clockFontSizeId: 1,
  clockPanels: "",
  audioPlayDuration: 600000,
  audioCustomName: "",
  restoreCommon: function () {
    if (isEmbed || typeof localStorage === "undefined") {
      return;
    }
    this.clock12hour = langC.is12Default;
    this.restore("themeNightMode");
    this.restore("themeColorId");
    this.restore("clock12hour");
    this.restore("clockDateVisible");
    this.restore("themeDigitalFont");
    this.restore("audioCustomName");
  },
  restoreAlarm: function () {
    if (isEmbed || typeof localStorage === "undefined") {
      return;
    }
    this.restore("alarmFontSizeId");
    this.restore("alarmHash");
    this.restore("alarmAudioCode");
    this.restore("alarmAudioLoop");
  },
  restoreTimer: function () {
    if (isEmbed || typeof localStorage === "undefined") {
      return;
    }
    this.restore("timerFontSizeId");
    this.restore("timerHash");
    this.restore("timerAudioCode");
    this.restore("timerAudioLoop");
  },
  restoreStopwatch: function () {
    if (isEmbed || typeof localStorage === "undefined") {
      return;
    }
    this.restore("swFontSizeId");
    this.restore("swHash");
    this.restore("swTimeFormat");
  },
  restoreClock: function () {
    if (isEmbed || typeof localStorage === "undefined") {
      return;
    }
    this.restore("clockFontSizeId");
    this.restore("clockPanels");
  },
  save: function (a) {
    if (isEmbed || typeof localStorage === "undefined") {
      return;
    }
    try {
      localStorage.setItem(a, this[a]);
    } catch (b) {
      console.log(b);
    }
  },
  restore: function (a) {
    var c = localStorage.getItem(a);
    if (c === null) {
      return;
    }
    var b = typeof this[a];
    this[a] =
      b === "boolean" ? c === "true" : b === "number" ? parseFloat(c) : c;
  },
};
var DIGIT_COLORS = [
  ["#555", "#eee"],
  ["#EF6C00", "#FF9500"],
  ["#c62828", "#d32f2f"],
  ["#2E7D32", "#388E3C"],
  ["#1565C0", "#1976D2"],
];
var MIN_LABEL_HEIGHT = 30;
var MIN_TIME_HEIGHT = 70;
var MIN_FONT_SIZE = 10;
var MIN_TITLE_FONT_SIZE = isEmbed ? 14 : 18;
var MIN_DATE_FONT_SIZE = isEmbed ? 12 : 16;
var MIN_BOTTOM_MARGIN = isEmbed ? 0 : 30;
var FONT_SIZES = [74, 128, 220, 700];
var FONT_SIZE_LEN = 3;
var ORIGINAL_TITLE = document.title;
var PRIMARY_COLOR = getStyleValue("color", ".text-primary");
(function () {
  window.isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  window.isIOS = isMobile && /iPhone|iPad|iPod/i.test(navigator.userAgent);
  window.isWindows = /Windows/i.test(navigator.userAgent);
  window.isOperaMini = /Opera Mini/i.test(navigator.userAgent);
  if (!isEmbed) {
    try {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        configC.themeNightMode = true;
        configC.themeColorId = D();
      }
    } catch (B) {}
  }
  configC.restoreCommon();
  if (isOperaMini) {
    $(".am-left-sidebar, .am-right-sidebar").hide();
    $(".page-title").css("min-height", "40px");
    $(".am-toggle-top-header-menu>.ci-angle-down")
      .html("≡")
      .removeClass("icon ci-angle-down");
    $(".am-toggle-top-header-menu")
      .css("min-height", "35px")
      .css("font-size", "34px");
    $(".ci-angle-down").removeClass("ci-angle-down");
    $(".navbar-nav>li, .dropdown-menu>li").css("min-height", "30px");
    if ($(window).width() < 768) {
      $(".dropdown-menu>li> a").css("color", "#fff");
      $(".dropdown-menu").css("color", "#777").removeClass("dropdown-menu");
    }
    $(".icon, .icon-bar, .am-icons-nav, .panel-tools, .tools").remove();
  }
  if (window.navigator.userAgent.indexOf("MSIE ") > 0) {
    configC.themeDigitalFont = false;
    $("#group-dt-check").hide();
    $("#group-dt-radio").removeClass("hidden-xs");
  }
  $("head").append('<meta name="theme-color" content="' + PRIMARY_COLOR + '">');
  b();
  a();
  $("#switch-night-mode")
    .prop("checked", configC.themeNightMode)
    .change(function () {
      configC.themeNightMode = $("#switch-night-mode").prop("checked");
      a();
    });
  $("#btn-night-mode").click(function () {
    configC.themeNightMode = !configC.themeNightMode;
    configC.themeColorId = D();
    $("#switch-night-mode").prop("checked", configC.themeNightMode);
    f();
    a();
  });
  $(".am-toggle-right-sidebar").click(function () {
    f();
  });
  window.setDigitFontNames = z;
  function z() {
    if (configC.themeDigitalFont) {
      $(".digit").addClass("font-digit");
      $(".digit-text").addClass("font-digit-text");
      if (langC.am != "AM") {
        $("#lbl-noon").css("position", "relative").css("top", "-6%");
      }
    } else {
      $(".digit").removeClass("font-digit");
      $(".digit-text").removeClass("font-digit-text");
      if (langC.am != "AM") {
        $("#lbl-noon").css("position", "").css("top", "");
      }
    }
  }
  window.getSizeDT = h;
  function h(e) {
    return Math.round(e / (e > 80 ? 4 : e > 40 ? 3 : 2));
  }
  window.setColors = a;
  function a() {
    if (configC.themeColorId >= DIGIT_COLORS.length) {
      configC.themeColorId = DIGIT_COLORS.length - 1;
    }
    if (configC.themeColorId < 0) {
      configC.themeColorId = 0;
    }
    if (configC.themeNightMode) {
      $("html").addClass("dark-theme");
    } else {
      $("html").removeClass("dark-theme");
    }
    if (!isEmbed) {
      document.cookie =
        "dark-theme=" + configC.themeNightMode + "; path=/; max-age=63072000";
    }
    $("#color-style").html(
      ".colored {color:" +
        DIGIT_COLORS[configC.themeColorId][configC.themeNightMode ? 1 : 0] +
        "!important;} "
    );
    k();
    $(".btn-digit-color").removeClass("ci-circle ci-checkmark-outline");
    for (var e = 0; e < DIGIT_COLORS.length; e++) {
      $("#digit-color-" + e)
        .removeClass("ci-circle ci-checkmark-outline")
        .addClass(
          configC.themeColorId == e ? "ci-checkmark-outline" : "ci-circle"
        );
    }
    configC.save("themeNightMode");
    configC.save("themeColorId");
  }
  function k() {
    if (isEmbed) {
      return;
    }
    $("meta[name='theme-color']").attr(
      "content",
      configC.themeNightMode
        ? "#000"
        : configC.themeFullScreen
        ? "#fff"
        : PRIMARY_COLOR
    );
  }
  window.getDefaultColorId = D;
  function D() {
    return configC.themeNightMode ? 1 : 0;
  }
  window.setSelectedColor = t;
  function t(e) {
    if (e === undefined) {
      return;
    }
    e.css("background-color", "#0090dd");
    e.find(".colored").attr("style", function (G, H) {
      return (H || "") + ";color: #fff !important;";
    });
  }
  window.setDefaultColor = n;
  function n(e) {
    if (e === undefined) {
      return;
    }
    e.css("background-color", "");
    e.find(".colored").css("color", "");
  }
  window.fadeHighlight = u;
  function u(H, e) {
    if (H === undefined) {
      return;
    }
    H.css("background-color", "hsl(206,100%,50%)");
    var I = e;
    for (var G = 50; 0 <= G && G <= 100; G += configC.themeNightMode ? -1 : 1) {
      I += 10;
      (function (L, J, K) {
        setTimeout(function () {
          if (J === 0 || J === 100) {
            n(L);
          } else {
            L.css("background-color", "hsl(206,100%," + J + "%)");
          }
        }, K);
      })(H, G, I);
    }
  }
  function b() {
    var G = "";
    for (var e = 0; e < DIGIT_COLORS.length; e++) {
      G +=
        '<span class="btn-digit-color icon ci-circle" style="color: ' +
        (e == 0 ? "#eee" : DIGIT_COLORS[e][1]) +
        '" id="digit-color-' +
        e +
        '"></span>';
    }
    $("#pnl-colors").html(G);
    $(".btn-digit-color").click(function () {
      configC.themeColorId = parseInt($(this)[0].id.split("-")[2], 10);
      a();
    });
  }
  window.processURIParam = l;
  function l(G, e) {
    switch (G) {
      case "theme":
        configC.themeNightMode = parseInt(e, 10) === 1;
        $("#switch-night-mode").prop("checked", configC.themeNightMode);
        configC.themeColorId = D();
        a();
        break;
      case "color":
        configC.themeColorId = parseInt(e, 10);
        a();
        break;
      case "digital":
        C(parseInt(e, 10) === 1);
        $("#switch-digital").prop("checked", configC.themeDigitalFont);
        break;
      case "ampm":
        y(parseInt(e, 10) === 1);
        $("#switch-12hour").prop("checked", configC.clock12hour);
        break;
      case "showdate":
        E(parseInt(e, 10) === 1);
        $("#switch-date").prop("checked", configC.clockDateVisible);
        break;
      case "showbuttons":
        r(parseInt(e, 10) === 1);
        break;
      case "format":
        d(parseInt(e, 10));
        $("#select-format-time").val(configC.swTimeFormat);
        break;
    }
  }
  function C(e) {
    if (configC.themeDigitalFont === e) {
      return;
    }
    configC.themeDigitalFont = e;
    configC.save("themeDigitalFont");
    if (typeof refreshSettings === "function") {
      refreshSettings();
    }
  }
  $("#switch-digital")
    .prop("checked", configC.themeDigitalFont)
    .change(function () {
      C($("#switch-digital").prop("checked"));
    });
  function y(e) {
    if (configC.clock12hour === e) {
      return;
    }
    configC.clock12hour = e;
    configC.save("clock12hour");
    if (typeof refreshSettings === "function") {
      refreshSettings();
    }
  }
  $("#switch-12hour")
    .prop("checked", configC.clock12hour)
    .change(function () {
      y($("#switch-12hour").prop("checked"));
    });
  function E(e) {
    if (configC.clockDateVisible === e) {
      return;
    }
    configC.clockDateVisible = e;
    configC.save("clockDateVisible");
    if (typeof refreshSettings === "function") {
      refreshSettings();
    }
  }
  $("#switch-date")
    .prop("checked", configC.clockDateVisible)
    .change(function () {
      E($("#switch-date").prop("checked"));
    });
  function r(e) {
    if (configC.buttonsVisible === e) {
      return;
    }
    configC.buttonsVisible = e;
    if (typeof refreshSettings === "function") {
      refreshSettings();
    }
  }
  function d(e) {
    if (configC.swTimeFormat === e) {
      return;
    }
    configC.swTimeFormat = e;
    configC.save("swTimeFormat");
    if (typeof refreshSettings === "function") {
      refreshSettings();
    }
  }
  $("#select-format-time").change(function () {
    d(parseInt($("#select-format-time").val(), 10));
    if (typeof onMainResize === "function") {
      onMainResize();
    }
  });
  $("#btn-options-close").click(function (G) {
    $(document).trigger("mousedown", G);
  });
  function o(G) {
    if (isEmbed) {
      return;
    }
    G.tooltip({ trigger: "hover", container: "body" });
  }
  if (!isEmbed) {
    o($("[data-toggle='tooltip'],.btn-share"));
  }
  window.hideTooltips = f;
  function f() {
    $(".tooltip").hide();
  }
  $(document)
    .on("fullscreenchange", A)
    .on("webkitfullscreenchange", A)
    .on("mozfullscreenchange", A)
    .on("MSFullscreenChange", A);
  $("#btn-full-screen").click(function () {
    f();
    if (configC.themeFullScreen) {
      return;
    }
    var e = $(".main-content");
    var G = e.detach();
    $(".am-wrapper, .am-footer").hide();
    $("#pnl-full-screen").show().append(G);
    $("#pnl-description,#pnl-links,#pnl-share,#btn-tool-share").hide();
    e.css("background-color", configC.themeNightMode ? "#000" : "#fff");
    k();
    $("#btn-full-screen").hide();
    $("#btn-full-screen-exit").show();
    var H = e[0];
    if (H.requestFullscreen) {
      H.requestFullscreen();
    } else {
      if (H.webkitRequestFullscreen) {
        H.webkitRequestFullscreen();
      } else {
        if (H.mozRequestFullScreen) {
          H.mozRequestFullScreen();
        } else {
          if (H.msRequestFullscreen) {
            H.msRequestFullscreen();
          }
        }
      }
    }
    configC.themeFullScreen = true;
    $(document).trigger("resize");
    setTimeout(function () {
      $(document).trigger("resize");
    }, 1000);
  });
  $("#btn-full-screen-exit").click(function () {
    f();
    if (!configC.themeFullScreen) {
      return;
    }
    var e = $(".main-content");
    var G = e.detach();
    $("#pnl-full-screen").hide();
    $(".am-content").append(G);
    $(".am-wrapper, .am-footer").show();
    $("#pnl-description,#pnl-links,#pnl-share,#btn-tool-share").show();
    e.css("background-color", "");
    k();
    $("#btn-full-screen-exit").hide();
    $("#btn-full-screen").show();
    closeAllNotifications();
    configC.themeFullScreen = false;
    $(document).trigger("resize");
  });
  window.cancelFullScreen = s;
  function s() {
    if (document.cancelFullscreen) {
      document.cancelFullscreen();
    } else {
      if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      } else {
        if (document.mozFullScreen) {
          document.mozCancelFullScreen();
        } else {
          if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
        }
      }
    }
  }
  function A() {
    var e =
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement;
    if (e !== undefined && e !== null) {
      $(".main-content").css("width", "100%").css("height", "100%");
    } else {
      $(".main-content").css("width", "").css("height", "");
      $("#btn-full-screen-exit").trigger("click");
    }
    $(document).trigger("resize");
  }
  var c;
  var F;
  var m;
  var g = false;
  function x(G, e) {
    if (G !== undefined) {
      c = G;
    }
    if (e !== undefined) {
      F = parseInt(e, 10);
    }
    if (F < 0 && c.selectedIndex <= 0) {
      c.selectedIndex = c.length - 1;
    } else {
      if (F > 0 && c.selectedIndex >= c.length - 1) {
        c.selectedIndex = 0;
      } else {
        c.selectedIndex += F;
      }
    }
    clearTimeout(m);
    m = setTimeout(
      function () {
        x();
      },
      G === undefined ? 100 : 400
    );
  }
  $(".btn-mp")
    .on("touchstart mousedown", function (e) {
      if (e.type === "touchstart") {
        g = true;
      } else {
        if (g) {
          return;
        }
        g = false;
      }
      x($("#edt-" + $(this)[0].id.split("-")[1])[0], $(this)[0].value);
    })
    .on("touchend mouseup mouseleave", function (e) {
      if (g && e.type !== "touchend") {
        return;
      }
      clearTimeout(m);
    });
  var q = $(".sidebar-elements > li > a", $(".am-left-sidebar"));
  q.on("mousedown touchstart", function () {
    q.css("background-color", "").css("color", "");
    $(this).css("background-color", "#afafaf").css("color", "#000");
  }).on("mouseout touchmove touchend", function () {
    $(this).css("background-color", "").css("color", "");
  });
  if (!isEmbed) {
    setTimeout(function () {
      var G = $("#pnl-ne0n");
      if (G.length && G.height() <= 30) {
        if (navigator.platform.toUpperCase().indexOf("MAC") > -1) {
        } else {
          if (isWindows) {
            var e = "alarm";
            if (typeof vTimer !== "undefined") {
              e = "timer";
            } else {
              if (typeof vStopwatch !== "undefined") {
                e = "stopwatch";
              } else {
                if (typeof vClock !== "undefined") {
                  e = "clock";
                }
              }
            }
            G.load("/inf0/hot.php?type=" + e + "&hl=" + langC.id);
          }
        }
      }
    }, 5000);
  }
  var j = "a";
  var p = "b";
  j += "to" + p;
  if (typeof window[j] === "function") {
    var v = window[j]("bWV0YVtuYW1lPWF1dGhvcl0=");
    var w = window[j]("Y29udGVu") + "t";
    v = $(v).attr(w);
    if (
      v === undefined ||
      v !== window[j]("Q29tZm9ydCBTb2Z0d2FyZSBHcm91cA==")
    ) {
      setTimeout(function () {
        $("div").remove();
      }, 5555);
    }
  }
})();
function getDateText(c, b, a) {
  return getDateTextByParts(
    c.getDay(),
    c.getDate(),
    c.getMonth(),
    c.getFullYear(),
    b,
    a
  );
}
function getDateTextByParts(b, d, f, e, c, a) {
  if (langC.isAsian) {
    return (
      e +
      langC.year +
      langC.monthDelimiter +
      (f + 1) +
      langC.month +
      langC.dayDelimiter +
      d +
      (langC.id == "kr" ? langC.day + " " + langC.weekDays[b] : "日")
    );
  }
  return (
    (a
      ? c
        ? langC.daysShort[b] + "  -  "
        : langC.weekDays[b] +
          (langC.weekDelimiter == " - " ? " &ndash; " : langC.weekDelimiter)
      : "") +
    (langC.isMonthFirst
      ? (c ? langC.monthsShort[f] : langC.months[f]) + " " + d + ", "
      : d + langC.dayDelimiter + langC.months[f] + langC.monthDelimiter) +
    e
  );
}
function getTimeText(h, b) {
  var a = h.getHours();
  var c = h.getMinutes();
  var g = h.getSeconds();
  var f;
  if (configC.clock12hour) {
    f = a < 12 ? langC.am : langC.pm;
    a = a % 12;
    if (a == 0) {
      a = 12;
    }
  }
  var e =
    intToStrHours(a) + ":" + intToStrTwo(c) + (b ? ":" + intToStrTwo(g) : "");
  if (configC.clock12hour) {
    if (langC.rtlTime) {
      return f + " " + e;
    } else {
      return e + " " + f;
    }
  }
  return e;
}
function getTimerBetween(e, d, b) {
  var f = Math.abs(Math.floor((d - e) / 1000)) + 1;
  var c = Math.floor(f / 60);
  f = f % 60;
  var a = Math.floor(c / 60);
  c = c % 60;
  var g = Math.floor(a / 24);
  a = a % 24;
  if (b && a == 0 && g == 0) {
    if (c == 0) {
      return f + " sec";
    } else {
      return intToStrTwo(c) + ":" + intToStrTwo(f);
    }
  } else {
    return (
      getCountDays(g) +
      intToStrTwo(a) +
      ":" +
      intToStrTwo(c) +
      ":" +
      intToStrTwo(f)
    );
  }
}
function getCountDays(a) {
  if (a == 0) {
    return "";
  }
  return a + " " + (a == 1 ? dayLC : daysLC) + " ";
}
function fillSelectHours(e) {
  if (e.length === 0) {
    return;
  }
  var d =
    "<option>" +
    (configC.clock12hour
      ? langC.rtlTime
        ? langC.am + " 12"
        : "12 " + langC.am
      : "00") +
    "&nbsp;&nbsp;</option>";
  for (var c = 1; c < 24; c++) {
    if (configC.clock12hour) {
      var f = c < 12 ? langC.am : langC.pm;
      var a = c % 12;
      if (a === 0) {
        a = 12;
      }
      d +=
        "<option>" +
        (langC.rtlTime
          ? f + " " + a
          : (a < 10 ? "&nbsp;&nbsp;" : "") + (a + " " + f)) +
        "</option>";
    } else {
      d += "<option>" + intToStrTwo(c) + "</option>";
    }
  }
  var b = e[0].selectedIndex;
  e.html(d);
  if (b > -1) {
    e[0].selectedIndex = b;
  }
}
function fillSelectInt(d, c) {
  if (d.length == 0) {
    return;
  }
  var b = "<option>00&nbsp;&nbsp;</option>";
  for (var a = 1; a < c; a++) {
    b += "<option>" + intToStrTwo(a) + "</option>";
  }
  d.html(b);
}
function getFormattedLocalDT(b, c, a) {
  if (!a && b.getHours() == 0 && b.getMinutes() == 0 && b.getSeconds() == 0) {
    return (
      b.getFullYear() +
      "-" +
      intToStrTwo(b.getMonth() + 1) +
      "-" +
      intToStrTwo(b.getDate())
    );
  }
  return (
    b.getFullYear() +
    "-" +
    intToStrTwo(b.getMonth() + 1) +
    "-" +
    intToStrTwo(b.getDate()) +
    "T" +
    intToStrTwo(b.getHours()) +
    ":" +
    intToStrTwo(b.getMinutes()) +
    (c ? ":" + intToStrTwo(b.getSeconds()) : "") +
    (a ? "." + intToStrThree(b.getMilliseconds()) : "")
  );
}
function getLocalDTFromStr(a) {
  var b = a.split(/\D/);
  if (b.length < 3) {
    return new Date();
  }
  if (b.length < 5) {
    return new Date(b[0], b[1] - 1, b[2], 0, 0, 0, 0);
  }
  return new Date(
    b[0],
    b[1] - 1,
    b[2],
    b[3],
    b[4],
    b.length < 6 ? 0 : b[5],
    b.length < 7 ? 0 : b[6]
  );
}
var audioC = (function () {
  var l = new Array(langC.audioNames.length);
  var s;
  var j = $("#edt-audio");
  var o = new Date();
  var g;
  var w = "alarm";
  var n = false;
  var v = false;
  var t = typeof localStorage !== "undefined" && !isMobile;
  if (j.length) {
    try {
      var y = document.createElement("audio");
      n = !!(y.canPlayType && y.canPlayType("audio/mpeg;").replace(/no/, ""));
    } catch (x) {}
  }
  function m(a) {
    w = a;
    if (j.length === 0) {
      return;
    }
    if (!n) {
      $("#group-audio").hide();
      return;
    }
    z();
    $("#chk-audio-repeat").change(function () {
      configC[w + "AudioLoop"] = $("#chk-audio-repeat").prop("checked");
      configC.save(w + "AudioLoop");
    });
    if (t) {
      $("#btn-audio-file").click(function () {
        $("#local-audio-file").click();
      });
      $("#local-audio-file").change(function () {
        b(this.files[0]);
      });
    } else {
      $("#btn-audio-file").hide();
      $("#local-audio-file").hide();
    }
  }
  function d() {
    if (j.length === 0) {
      return;
    }
    if (!n) {
      return;
    }
    var A = 6;
    var a = configC[w + "AudioCode"];
    if (a !== "custom") {
      for (var e = 0; e < langC.audioNames.length; e++) {
        if (langC.audioNames[e][1] === a) {
          A = e;
        }
      }
    } else {
      if (configC.audioCustomName !== "") {
        A = langC.audioNames.length;
      }
    }
    j.off("change");
    j[0].selectedIndex = A;
    j.change(q);
    q(true);
    $("#chk-audio-repeat").prop("checked", configC[w + "AudioLoop"]);
  }
  function z() {
    var e = "";
    for (var a = 0; a < langC.audioNames.length; a++) {
      e += "<option>" + langC.audioNames[a][0] + "</option>";
    }
    if (configC.audioCustomName !== "") {
      e += "<option>" + configC.audioCustomName + "</option>";
    }
    j.html(e);
  }
  function b(e) {
    if (typeof e === "undefined") {
      return;
    }
    configC.audioCustomName = e.name.replace(".mp3", "");
    if (configC.audioCustomName === "") {
      return;
    }
    configC.save("audioCustomName");
    f();
    var a = new FileReader();
    a.onload = function (A) {
      try {
        localStorage.audioFile = a.result;
        z();
        l.length = langC.audioNames.length;
        l.length = langC.audioNames.length + 1;
        j[0].selectedIndex = l.length - 1;
        p(false);
      } catch (A) {
        alert("Can't load audio file.");
      }
    };
    a.readAsDataURL(e);
  }
  function c(a) {
    console.log("Opened file system: " + a.name);
  }
  function h(a) {
    console.log(a);
  }
  function p(a) {
    if (!n) {
      return;
    }
    s = l[j[0].selectedIndex];
    if (typeof s === "undefined") {
      q(true);
    }
    if (typeof s === "undefined") {
      return;
    }
    s.loop = a && configC[w + "AudioLoop"];
    if (s.currentTime !== 0) {
      s.currentTime = 0;
    }
    v = false;
    var e = s.play();
    if (e !== undefined) {
      e["catch"](function (A) {
        console.log("Play error: " + A.message);
        v = true;
      });
    }
    r();
    if (s.loop) {
      g = setTimeout(f, configC.audioPlayDuration);
    }
  }
  function f() {
    if (!n) {
      return;
    }
    if (typeof s === "undefined") {
      return;
    }
    s.pause();
    clearTimeout(g);
  }
  function r() {
    if (typeof s === "undefined") {
      return;
    }
    if (s.paused || s.ended) {
      $("#audio-pause-icon").hide();
      $("#audio-play-icon").show();
    } else {
      $("#audio-play-icon").hide();
      $("#audio-pause-icon").show();
    }
  }
  function q(e) {
    if (!n) {
      return;
    }
    f();
    var a = j[0].selectedIndex;
    if (typeof l[a] === "undefined") {
      l[a] = document.createElement("audio");
      l[a].preload = "auto";
      l[a].onpause = r;
      l[a].onended = r;
      if (a !== langC.audioNames.length) {
        l[a].src = "/sound/" + langC.audioNames[a][1] + ".mp3";
      } else {
        if (typeof localStorage.audioFile === "undefined") {
          return;
        }
        l[a].src = localStorage.audioFile;
      }
    }
    s = l[a];
    if (e !== true) {
      p(false);
      o = new Date();
    }
    configC[w + "AudioCode"] =
      a !== langC.audioNames.length ? langC.audioNames[a][1] : "custom";
    configC.save(w + "AudioCode");
  }
  $("#btn-audio-play").click(function () {
    if ($("#audio-play-icon").is(":visible")) {
      p(false);
    } else {
      var a = new Date();
      if (a.getTime() - o.getTime() > 300) {
        f();
      }
    }
  });
  function u() {
    return (
      "&sound=" +
      configC[w + "AudioCode"] +
      "&loop=" +
      (configC[w + "AudioLoop"] ? "1" : "0")
    );
  }
  function k() {
    if (isEmbed) {
      return;
    }
    if (!isMobile) {
      return;
    }
    if (!n) {
      return;
    }
    p(false);
    if (typeof s === "undefined") {
      return;
    }
    var a = setInterval(function () {
      if (v) {
        clearInterval(a);
        return;
      }
      var e = 0.001;
      switch (langC.audioNames[j[0].selectedIndex][1]) {
        case "bells":
          e = 0.1;
          break;
      }
      if (s.currentTime < e) {
        return;
      }
      clearInterval(a);
      f();
    }, 10);
  }
  return { init: m, set: d, play: p, pause: f, url: u, check: k };
})();
var vNoSleep = (function () {
  var h;
  var j = false;
  var g = false;
  var c = false;
  var f = false;
  var e;
  function b() {
    if (g) {
      return;
    }
    if (isMobile) {
      if (typeof e === "undefined") {
        $.getScript("/lib/NoSleep.min.js", function () {
          e = new NoSleep();
          e.enable();
        });
      } else {
        e.enable();
      }
    } else {
      if (typeof h === "undefined") {
        try {
          h = document.createElement("audio");
          j = !!(
            h.canPlayType && h.canPlayType("audio/mpeg;").replace(/no/, "")
          );
        } catch (k) {}
        if (!j) {
          return;
        }
        h.preload = "none";
        h.loop = true;
        h.src = "/sound/noise.ogg";
        h.title = "No Sleep";
      }
      if (!j) {
        return;
      }
      d();
      if (!c) {
        c = true;
        window.addEventListener(
          "visibilitychange",
          function () {
            if (!g) {
              return;
            }
            if (!j) {
              return;
            }
            if (document.visibilityState === "hidden") {
              var l = h.play();
              if (l !== undefined) {
                l["catch"](function (m) {
                  console.log("Play error ns: " + m.message);
                });
              }
            } else {
              h.pause();
            }
          },
          true
        );
      }
    }
    g = true;
  }
  function a() {
    if (!g) {
      return;
    }
    if (isMobile) {
      if (typeof e !== "undefined") {
        e.disable();
      }
    } else {
      if (!j) {
        return;
      }
      h.pause();
    }
    g = false;
  }
  function d() {
    if (isEmbed) {
      return;
    }
    if (isMobile) {
      return;
    }
    if (!j) {
      return;
    }
    if (f) {
      return;
    }
    f = true;
    var k = h.play();
    if (k !== undefined) {
      k["catch"](function (l) {
        console.log("Play error fns: " + l.message);
      });
    }
    setTimeout(function () {
      if (document.visibilityState !== "hidden") {
        h.pause();
      }
    }, 1000);
  }
  return { enable: b, disable: a };
})();
$(".modal")
  .on("show.bs.modal", function () {
    if (isIOS) {
      $("html, body").css("overflow", "hidden");
    }
  })
  .on("hide.bs.modal", function () {
    if (isIOS) {
      $("html, body").css("overflow", "");
    }
  });
function intToStrTwo(a) {
  return a < 10 ? "0" + a : a;
}
function intToStrThree(a) {
  return a < 10 ? "00" + a : a < 100 ? "0" + a : a;
}
function intToStrHours(a) {
  return a < 10 && !configC.clock12hour && langC.timeFmtZero ? "0" + a : a;
}
function encodeTitle(a) {
  return a
    .replace(/&/g, "&amp;")
    .replace(/>/g, "&gt;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;");
}
function closeAllNotifications() {
  $.gritter.removeAll();
}
function getStyleValue(a, c, h) {
  var g = typeof h !== "undefined" ? [h] : document.styleSheets;
  for (var f = 0, b = g.length; f < b; f++) {
    h = g[f];
    if (!h.cssRules) {
      continue;
    }
    for (var e = 0, d = h.cssRules.length; e < d; e++) {
      var m = h.cssRules[e];
      if (m.selectorText && m.selectorText.split(",").indexOf(c) !== -1) {
        return m.style[a];
      }
    }
  }
  return null;
}
function isPlainURIParam(a) {
  return !/[\\~`!#$%\^&*+=\[\]/{}|":<>?]/g.test(a);
}
var pageTitleNotification = {
  originalTitle: "",
  intervalId: 0,
  on: function (b, a) {
    this.originalTitle = document.title;
    var c = this;
    c.intervalId = setInterval(
      function () {
        document.title =
          c.originalTitle == document.title ? b : c.originalTitle;
      },
      a ? a : 1000
    );
  },
  off: function () {
    if (this.intervalId == 0) {
      return;
    }
    clearInterval(this.intervalId);
    document.title = this.originalTitle;
    this.intervalId = 0;
  },
};
function scrollToTop(a) {
  $("html, body").animate({ scrollTop: 0 }, a);
}
var prevPnlBallsWidth = 0;
var prevPnlBallsHeight = 0;
function showFunnyBalls() {
  var g = $("#pnl-main");
  if (typeof g[0] === "undefined" || typeof g[0].animate === "undefined") {
    return;
  }
  if (prevPnlBallsWidth === g.width() && prevPnlBallsHeight === g.height()) {
    return;
  }
  prevPnlBallsWidth = g.width();
  prevPnlBallsHeight = g.height();
  g.css("overflow", "hidden");
  var f = g.first();
  $(".ball-div").remove();
  var j = Math.max((prevPnlBallsWidth * prevPnlBallsHeight) / 10000, 20);
  for (i = 0; i < j; i++) {
    f.before(
      '<div class="ball-div" style="left: ' +
        Math.floor(Math.random() * prevPnlBallsWidth) +
        "px; top: " +
        Math.floor(Math.random() * prevPnlBallsHeight) +
        'px;"><p></p></div>'
    );
  }
  try {
    var d = document.querySelectorAll(".ball-div > p");
    Array.prototype.slice.call(d).forEach(function (b, a) {
      var e = { x: Math.random() * 22 - 11, y: Math.random() * 22 - 11 };
      b.animate(
        [
          { transform: "translate(0,0) scale(1)", opacity: 0.5 },
          {
            transform:
              "translate(" +
              e.x +
              "rem," +
              e.y +
              "rem) scale(" +
              Math.random() +
              ")",
            opacity: Math.random() * 0.5,
          },
        ],
        {
          duration: (Math.random() + 1) * 2000,
          direction: "alternate",
          fill: "forwards",
          iterations: Infinity,
          easing: "ease-in-out",
          delay: 0,
        }
      );
    });
    var c = document.querySelectorAll(".ball-div");
    Array.prototype.slice.call(c).forEach(function (b, a) {
      b.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 5000,
        easing: "ease-out",
      });
    });
  } catch (h) {
    console.log(h);
  }
}
function sanitizeText(b) {
  var a = document.createElement("div");
  a.innerText = b;
  return a.innerHTML;
}
