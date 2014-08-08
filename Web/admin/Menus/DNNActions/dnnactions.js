(function (b, a) { b.fn.dnnActionMenu = function (c) { var e = b.extend({}, b.fn.dnnActionMenu.defaultOptions, c), d = this; d.each(function () { var i = b(this); function h(m, j, l) { var k = m.children("." + e.borderClassName); if (k.size() === 0) { k = b('<div class="' + e.borderClassName + '"></div>').prependTo(m).css({ opacity: 0 }) } m.attr("style", "z-index:904;"); if (l) { m.find(e.menuActionSelector).fadeTo(e.fadeSpeed, j) } m.children("." + e.borderClassName).fadeTo(e.fadeSpeed, j) } function f(l, j, k) { l.removeAttr("style"); l.children("." + e.borderClassName).stop().fadeTo(e.fadeSpeed, 0); if (k) { l.find(e.menuActionSelector).stop().fadeTo(e.fadeSpeed, j) } } function g(j) { var m = i.find(e.menuSelector).show(), o = m.height(), n = b(a).height(), l = j.offset().top, k = (n - ((l - b(a).scrollTop()) + j.height())); if ((o > k) && (o <= l)) { m.position({ my: "left bottom", at: "left top", of: j, collision: "none" }) } else { m.position({ my: "left top", at: "left bottom", of: j, collision: "none" }) } } if (i.find(e.menuSelector).size() > 0) { i.hoverIntent({ sensitivity: e.hoverSensitivity, timeout: e.hoverTimeout, interval: e.hoverInterval, over: function () { h(b(this).data("intentExpressed", true), 1, true) }, out: function () { f(b(this).data("intentExpressed", false), e.defaultOpacity, true) } }); i.hover(function () { h(b(this), e.defaultOpacity, false) }, function () { var j = b(this); if (!j.data("intentExpressed")) { f(j, 0, false) } }); i.find(e.menuActionSelector).css({ opacity: e.defaultOpacity }); i.find(e.menuWrapSelector).hoverIntent({ sensitivity: e.hoverSensitivity, timeout: e.hoverTimeout, interval: e.hoverInterval, over: function () { g(b(this)); i.find(e.menuSelector).fadeTo(e.fadeSpeed, 1) }, out: function () { i.find(e.menuSelector).stop().fadeTo(e.fadeSpeed, 0).hide() } }); i.find(e.menuSelector).children().css({ opacity: 1 }); i.find(e.menuWrapSelector).draggable({ containment: i.children().eq(1), start: function (j, k) { i.find(e.menuSelector).hide() }, stop: function (j, k) { g(b(this)); i.find(e.menuSelector).show() } }) } }); return d }; b.fn.dnnActionMenu.defaultOptions = { menuWrapSelector: ".dnnActionMenu", menuActionSelector: ".dnnActionMenuTag", menuSelector: "ul.dnnActionMenuBody", defaultOpacity: 0.3, fadeSpeed: "fast", borderClassName: "dnnActionMenuBorder", hoverSensitivity: 2, hoverTimeout: 200, hoverInterval: 200 }; b(document).ready(function () { b(".DnnModule").dnnActionMenu() }) })(jQuery, window);