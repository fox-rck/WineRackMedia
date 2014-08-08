/*! jQuery Color v@2.1.0 http://github.com/jquery/jquery-color | jquery.org/license */
(function (a, b) { function m(a, b, c) { var d = h[b.type] || {}; return a == null ? c || !b.def ? null : b.def : (a = d.floor ? ~ ~a : parseFloat(a), isNaN(a) ? b.def : d.mod ? (a + d.mod) % d.mod : 0 > a ? 0 : d.max < a ? d.max : a) } function n(b) { var c = f(), d = c._rgba = []; return b = b.toLowerCase(), l(e, function (a, e) { var f, h = e.re.exec(b), i = h && e.parse(h), j = e.space || "rgba"; if (i) return f = c[j](i), c[g[j].cache] = f[g[j].cache], d = c._rgba = f._rgba, !1 }), d.length ? (d.join() === "0,0,0,0" && a.extend(d, k.transparent), c) : k[b] } function o(a, b, c) { return c = (c + 1) % 1, c * 6 < 1 ? a + (b - a) * c * 6 : c * 2 < 1 ? b : c * 3 < 2 ? a + (b - a) * (2 / 3 - c) * 6 : a } var c = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor", d = /^([\-+])=\s*(\d+\.?\d*)/, e = [{ re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/, parse: function (a) { return [a[1], a[2], a[3], a[4]] } }, { re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/, parse: function (a) { return [a[1] * 2.55, a[2] * 2.55, a[3] * 2.55, a[4]] } }, { re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/, parse: function (a) { return [parseInt(a[1], 16), parseInt(a[2], 16), parseInt(a[3], 16)] } }, { re: /#([a-f0-9])([a-f0-9])([a-f0-9])/, parse: function (a) { return [parseInt(a[1] + a[1], 16), parseInt(a[2] + a[2], 16), parseInt(a[3] + a[3], 16)] } }, { re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/, space: "hsla", parse: function (a) { return [a[1], a[2] / 100, a[3] / 100, a[4]] } }], f = a.Color = function (b, c, d, e) { return new a.Color.fn.parse(b, c, d, e) }, g = { rgba: { props: { red: { idx: 0, type: "byte" }, green: { idx: 1, type: "byte" }, blue: { idx: 2, type: "byte"}} }, hsla: { props: { hue: { idx: 0, type: "degrees" }, saturation: { idx: 1, type: "percent" }, lightness: { idx: 2, type: "percent"}}} }, h = { "byte": { floor: !0, max: 255 }, percent: { max: 1 }, degrees: { mod: 360, floor: !0} }, i = f.support = {}, j = a("<p>")[0], k, l = a.each; j.style.cssText = "background-color:rgba(1,1,1,.5)", i.rgba = j.style.backgroundColor.indexOf("rgba") > -1, l(g, function (a, b) { b.cache = "_" + a, b.props.alpha = { idx: 3, type: "percent", def: 1} }), f.fn = a.extend(f.prototype, { parse: function (c, d, e, h) { if (c === b) return this._rgba = [null, null, null, null], this; if (c.jquery || c.nodeType) c = a(c).css(d), d = b; var i = this, j = a.type(c), o = this._rgba = [], p; d !== b && (c = [c, d, e, h], j = "array"); if (j === "string") return this.parse(n(c) || k._default); if (j === "array") return l(g.rgba.props, function (a, b) { o[b.idx] = m(c[b.idx], b) }), this; if (j === "object") return c instanceof f ? l(g, function (a, b) { c[b.cache] && (i[b.cache] = c[b.cache].slice()) }) : l(g, function (b, d) { var e = d.cache; l(d.props, function (a, b) { if (!i[e] && d.to) { if (a === "alpha" || c[a] == null) return; i[e] = d.to(i._rgba) } i[e][b.idx] = m(c[a], b, !0) }), i[e] && a.inArray(null, i[e].slice(0, 3)) < 0 && (i[e][3] = 1, d.from && (i._rgba = d.from(i[e]))) }), this }, is: function (a) { var b = f(a), c = !0, d = this; return l(g, function (a, e) { var f, g = b[e.cache]; return g && (f = d[e.cache] || e.to && e.to(d._rgba) || [], l(e.props, function (a, b) { if (g[b.idx] != null) return c = g[b.idx] === f[b.idx], c })), c }), c }, _space: function () { var a = [], b = this; return l(g, function (c, d) { b[d.cache] && a.push(c) }), a.pop() }, transition: function (a, b) { var c = f(a), d = c._space(), e = g[d], i = this.alpha() === 0 ? f("transparent") : this, j = i[e.cache] || e.to(i._rgba), k = j.slice(); return c = c[e.cache], l(e.props, function (a, d) { var e = d.idx, f = j[e], g = c[e], i = h[d.type] || {}; if (g === null) return; f === null ? k[e] = g : (i.mod && (g - f > i.mod / 2 ? f += i.mod : f - g > i.mod / 2 && (f -= i.mod)), k[e] = m((g - f) * b + f, d)) }), this[d](k) }, blend: function (b) { if (this._rgba[3] === 1) return this; var c = this._rgba.slice(), d = c.pop(), e = f(b)._rgba; return f(a.map(c, function (a, b) { return (1 - d) * e[b] + d * a })) }, toRgbaString: function () { var b = "rgba(", c = a.map(this._rgba, function (a, b) { return a == null ? b > 2 ? 1 : 0 : a }); return c[3] === 1 && (c.pop(), b = "rgb("), b + c.join() + ")" }, toHslaString: function () { var b = "hsla(", c = a.map(this.hsla(), function (a, b) { return a == null && (a = b > 2 ? 1 : 0), b && b < 3 && (a = Math.round(a * 100) + "%"), a }); return c[3] === 1 && (c.pop(), b = "hsl("), b + c.join() + ")" }, toHexString: function (b) { var c = this._rgba.slice(), d = c.pop(); return b && c.push(~ ~(d * 255)), "#" + a.map(c, function (a, b) { return a = (a || 0).toString(16), a.length === 1 ? "0" + a : a }).join("") }, toString: function () { return this._rgba[3] === 0 ? "transparent" : this.toRgbaString() } }), f.fn.parse.prototype = f.fn, g.hsla.to = function (a) { if (a[0] == null || a[1] == null || a[2] == null) return [null, null, null, a[3]]; var b = a[0] / 255, c = a[1] / 255, d = a[2] / 255, e = a[3], f = Math.max(b, c, d), g = Math.min(b, c, d), h = f - g, i = f + g, j = i * .5, k, l; return g === f ? k = 0 : b === f ? k = 60 * (c - d) / h + 360 : c === f ? k = 60 * (d - b) / h + 120 : k = 60 * (b - c) / h + 240, j === 0 || j === 1 ? l = j : j <= .5 ? l = h / i : l = h / (2 - i), [Math.round(k) % 360, l, j, e == null ? 1 : e] }, g.hsla.from = function (a) { if (a[0] == null || a[1] == null || a[2] == null) return [null, null, null, a[3]]; var b = a[0] / 360, c = a[1], d = a[2], e = a[3], f = d <= .5 ? d * (1 + c) : d + c - d * c, g = 2 * d - f, h, i, j; return [Math.round(o(g, f, b + 1 / 3) * 255), Math.round(o(g, f, b) * 255), Math.round(o(g, f, b - 1 / 3) * 255), e] }, l(g, function (c, e) { var g = e.props, h = e.cache, i = e.to, j = e.from; f.fn[c] = function (c) { i && !this[h] && (this[h] = i(this._rgba)); if (c === b) return this[h].slice(); var d, e = a.type(c), k = e === "array" || e === "object" ? c : arguments, n = this[h].slice(); return l(g, function (a, b) { var c = k[e === "object" ? a : b.idx]; c == null && (c = n[b.idx]), n[b.idx] = m(c, b) }), j ? (d = f(j(n)), d[h] = n, d) : f(n) }, l(g, function (b, e) { if (f.fn[b]) return; f.fn[b] = function (f) { var g = a.type(f), h = b === "alpha" ? this._hsla ? "hsla" : "rgba" : c, i = this[h](), j = i[e.idx], k; return g === "undefined" ? j : (g === "function" && (f = f.call(this, j), g = a.type(f)), f == null && e.empty ? this : (g === "string" && (k = d.exec(f), k && (f = j + parseFloat(k[2]) * (k[1] === "+" ? 1 : -1))), i[e.idx] = f, this[h](i))) } }) }), f.hook = function (b) { var c = b.split(" "); l(c, function (b, c) { a.cssHooks[c] = { set: function (b, d) { var e, g, h = ""; if (a.type(d) !== "string" || (e = n(d))) { d = f(e || d); if (!i.rgba && d._rgba[3] !== 1) { g = c === "backgroundColor" ? b.parentNode : b; while ((h === "" || h === "transparent") && g && g.style) try { h = a.css(g, "backgroundColor"), g = g.parentNode } catch (j) { } d = d.blend(h && h !== "transparent" ? h : "_default") } d = d.toRgbaString() } try { b.style[c] = d } catch (d) { } } }, a.fx.step[c] = function (b) { b.colorInit || (b.start = f(b.elem, c), b.end = f(b.end), b.colorInit = !0), a.cssHooks[c].set(b.elem, b.start.transition(b.end, b.pos)) } }) }, f.hook(c), a.cssHooks.borderColor = { expand: function (a) { var b = {}; return l(["Top", "Right", "Bottom", "Left"], function (c, d) { b["border" + d + "Color"] = a }), b } }, k = a.Color.names = { aqua: "#00ffff", black: "#000000", blue: "#0000ff", fuchsia: "#ff00ff", gray: "#808080", green: "#008000", lime: "#00ff00", maroon: "#800000", navy: "#000080", olive: "#808000", purple: "#800080", red: "#ff0000", silver: "#c0c0c0", teal: "#008080", white: "#ffffff", yellow: "#ffff00", transparent: [null, null, null, 0], _default: "#ffffff"} })(jQuery);

/*
* jQuery.Rule - Css Rules manipulation, the jQuery way.
* Copyright (c) 2007-2011 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
* Dual licensed under MIT and GPL.
* Date: 02/7/2011
* @author Ariel Flesler
* @version 1.0.2
*/
(function (f) { var c = f('<style rel="alternate stylesheet" type="text/css" />').appendTo("head")[0], k = c.sheet ? "sheet" : "styleSheet", i = c[k], m = i.rules ? "rules" : "cssRules", g = i.deleteRule ? "deleteRule" : "removeRule", d = i.ownerNode ? "ownerNode" : "owningElement", e = /^([^{]+)\{([^}]*)\}/m, l = /([^:]+):([^;}]+)/; i.disabled = true; var j = f.rule = function (n, o) { if (!(this instanceof j)) { return new j(n, o) } this.sheets = j.sheets(o); if (n && e.test(n)) { n = j.clean(n) } if (typeof n == "object" && !n.exec) { b(this, n.get ? n.get() : n.splice ? n : [n]) } else { b(this, this.sheets.cssRules().get()); if (n) { return this.filter(n) } } return this }; f.extend(j, { sheets: function (p) { var n = p; if (typeof n != "object") { n = f.makeArray(document.styleSheets) } n = f(n).not(i); if (typeof p == "string") { n = n.ownerNode().filter(p).sheet() } return n }, rule: function (n) { if (n.selectorText) { return ["", n.selectorText, n.style.cssText] } return e.exec(n) }, appendTo: function (q, n, o) { switch (typeof n) { case "string": n = this.sheets(n); case "object": if (n[0]) { n = n[0] } if (n[k]) { n = n[k] } if (n[m]) { break } default: if (typeof q == "object") { return q } n = i } var t; if (!o && (t = this.parent(q))) { q = this.remove(q, t) } var s = this.rule(q); if (n.addRule) { n.addRule(s[1], s[2] || ";") } else { if (n.insertRule) { n.insertRule(s[1] + "{" + s[2] + "}", n[m].length) } } return n[m][n[m].length - 1] }, remove: function (o, q) { q = q || this.parent(o); if (q != i) { var n = q ? f.inArray(o, q[m]) : -1; if (n != -1) { o = this.appendTo(o, 0, true); q[g](n) } } return o }, clean: function (n) { return f.map(n.split("}"), function (o) { if (o) { return j.appendTo(o + "}") } }) }, parent: function (o) { if (typeof o == "string" || !f.browser.msie) { return o.parentStyleSheet } var n; this.sheets().each(function () { if (f.inArray(o, this[m]) != -1) { n = this; return false } }); return n }, outerText: function (n) { return !n || !n.selectorText ? "" : [n.selectorText + "{", "\t" + n.style.cssText, "}"].join("\n").toLowerCase() }, text: function (o, n) { if (n !== undefined) { o.style.cssText = n } return !o ? "" : o.style.cssText.toLowerCase() } }); j.fn = j.prototype = { pushStack: function (n, p) { var o = j(n, p || this.sheets); o.prevObject = this; return o }, end: function () { return this.prevObject || j(0, []) }, filter: function (n) { var p; if (!n) { n = /./ } if (n.split) { p = f.trim(n).toLowerCase().split(/\s*,\s*/); n = function () { var o = this.selectorText || ""; return !!f.grep(o.toLowerCase().split(/\s*,\s*/), function (q) { return f.inArray(q, p) != -1 }).length } } else { if (n.exec) { p = n; n = function () { return p.test(this.selectorText) } } } return this.pushStack(f.grep(this, function (q, o) { return n.call(q, o) })) }, add: function (n, o) { return this.pushStack(f.merge(this.get(), j(n, o))) }, is: function (n) { return !!(n && this.filter(n).length) }, not: function (p, o) { p = j(p, o); return this.filter(function () { return f.inArray(this, p) == -1 }) }, append: function (n) { var p = this, o; f.each(n.split(/\s*;\s*/), function (r, q) { if ((o = l.exec(q))) { p.css(o[1], o[2]) } }); return this }, text: function (n) { return !arguments.length ? j.text(this[0]) : this.each(function () { j.text(this, n) }) }, outerText: function () { return j.outerText(this[0]) } }; f.each({ ownerNode: d, sheet: k, cssRules: m }, function (n, o) { var p = o == m; f.fn[n] = function () { return this.map(function () { return p ? f.makeArray(this[o]) : this[o] }) } }); f.fn.cssText = function () { return this.filter("link,style").eq(0).sheet().cssRules().map(function () { return j.outerText(this) }).get().join("\n") }; f.each("remove,appendTo,parent".split(","), function (n, o) { j.fn[o] = function () { var p = f.makeArray(arguments), q = this; p.unshift(0); return this.each(function (r) { p[0] = this; q[r] = j[o].apply(j, p) || q[r] }) } }); f.each(("each,index,get,size,eq,slice,map,attr,andSelf,css,show,hide,toggle,queue,dequeue,stop,animate,fadeIn,fadeOut,fadeTo").split(","), function (n, o) { j.fn[o] = f.fn[o] }); function b(o, n) { o.length = 0; Array.prototype.push.apply(o, n) } var h = f.curCSS; f.curCSS = function (o, n) { return ("selectorText" in o) ? o.style[n] || f.prop(o, n == "opacity" ? 1 : 0, "curCSS", 0, n) : h.apply(this, arguments) }; j.cache = {}; var a = function (n) { return function (p) { var o = p.selectorText; if (o) { arguments[0] = j.cache[o] = j.cache[o] || {} } return n.apply(f, arguments) } }; f.data = a(f.data); f.removeData = a(f.removeData); f(window).unload(function () { f(i).cssRules().remove() }) })(jQuery);

/* fade css hover */

(function ($) {
    $.fn.fadeCssHover = function (options, callback) {
        var _getAffectedElementDataByTarget = function (affectedElementDataArray, targetElement) {
            var affectedElementData = null;

            $(affectedElementDataArray).each(function () {
                if (this.targetElement === targetElement) {
                    affectedElementData = this;
                    return false;
                }
            });

            return affectedElementData;
        }

        var _addElementToArray = function (array, element) {
            var elementAlreadyInArray = false;
            $(array).each(function () {
                if (this === element) {
                    elementAlreadyInArray = true;
                    return false;
                }
            });
            if (!elementAlreadyInArray) {
                array.push(element);
            }
            return array;
        }


        var makeItSo = function () {
            var targetElements = [];
            //first cyle through all css rules and identify all hover targets, and the elements they affect
            $.rule(data.target).sheets.each(function (sheetIndex) {
                var sheet = this;
                try {
                    $(sheet.cssRules).each(function (ruleIndex) {
                        var cssRule = this; //sheet.cssRules[ruleIndex];
                        var splitRules = cssRule.cssText.split(',');
                        $(splitRules).each(function (splitRuleIndex) {
                            var splitRule = this;
                            var ruleText = splitRule;
                            var hoverKey = ':hover';
                            var hoverIndex = ruleText.indexOf(hoverKey);
                            if (hoverIndex !== -1) {
                                var hoverTargetSelector = $.trim(ruleText.substr(0, ruleText.length - (ruleText.substr(hoverIndex).length)));
                                var nonHoverSelector = $.trim(ruleText.substr(hoverIndex + hoverKey.length).split('{')[0]);
                                var hoverBackgroundColor = cssRule.style.backgroundColor;
                                var hoverTextColor = cssRule.style.color;
                                var hoverBackgroundImage = cssRule.style.backgroundImage;
                                var hoverTop = cssRule.style.top;
                                var hoverRight = cssRule.style.right;
                                var hoverBottom = cssRule.style.bottom;
                                var hoverLeft = cssRule.style.left;
                                var hoverDisplay = cssRule.style.display;
                                if (hoverBackgroundImage === '' || hoverBackgroundImage === 'initial') { hoverBackgroundImage = 'none' };
                                //check to see if there's a background color or text color change
                                if (
									hoverBackgroundColor !== ''
									|| hoverTextColor !== ''
									|| hoverBackgroundImage !== 'none'
                                //check for sprites
									|| hoverTop !== ''
									|| hoverRight !== ''
									|| hoverBottom !== ''
									|| hoverLeft !== ''
									|| hoverDisplay !== ''
									) {
                                    $(hoverTargetSelector).each(function (elementIndex) {
                                        var targetElement = this;
                                        _addElementToArray(targetElements, targetElement);
                                        var affectedChildElements = nonHoverSelector !== '' ? $(nonHoverSelector, targetElement).get() : $(this).get();
                                        var nonHoverBackgroundColor = $(affectedChildElements[0]).css('background-color');
                                        var nonHoverTextColor = $(affectedChildElements[0]).css('color');
                                        var nonHoverBackgroundImage = $(affectedChildElements[0]).css('background-image');
                                        var nonHoverDisplay = $(affectedChildElements[0]).css('display');
                                        var nonHoverTop = $(affectedChildElements[0]).css('top');
                                        var nonHoverRight = $(affectedChildElements[0]).css('right');
                                        var nonHoverBottom = $(affectedChildElements[0]).css('bottom');
                                        var nonHoverLeft = $(affectedChildElements[0]).css('left');

                                        if (nonHoverBackgroundImage === '' || nonHoverBackgroundImage === 'initial') { nonHoverBackgroundImage = 'none'; }
                                        var targetData = $(targetElement).data('fadeCssHover');
                                        if (!targetData) {
                                            targetData = {
                                                needsClone: false,
                                                affectedChildElements: []
                                            };
                                            $(targetElement).data('fadeCssHover', targetData);
                                        }
                                        if (!targetData.affectedChildElements) {
                                            targetData.affectedChildElements = [];
                                        }
                                        if (!targetData.needsClone) {
                                            targetData.needsClone = false;
                                        }
                                        //we need to add data to each affectedChildElement to prevent multiple hover events from being fired, and to allow proper css overrides
                                        $(affectedChildElements).each(function () {
                                            var affectedChildElement = this;
                                            _addElementToArray(targetData.affectedChildElements, affectedChildElement);
                                            var affectedChildElementData = $(affectedChildElement).data('fadeCssHover');
                                            if (!affectedChildElementData) {
                                                affectedChildElementData = {};
                                                $(affectedChildElement).data('fadeCssHover', affectedChildElementData);
                                            }
                                            var fadeChanges = affectedChildElementData.fadeChanges;
                                            if (!fadeChanges) {
                                                affectedChildElementData.fadeChanges = fadeChanges = [];
                                            }
                                            var affectedElementDataForTarget = _getAffectedElementDataByTarget(fadeChanges, targetElement);
                                            if (!affectedElementDataForTarget) {
                                                affectedElementDataForTarget = {
                                                    targetElement: targetElement,
                                                    hoverBackgroundColor: '',
                                                    hoverTextColor: '',
                                                    hoverBackgroundImage: '',
                                                    hoverDisplay: '',
                                                    hoverTop: '',
                                                    hoverRight: '',
                                                    hoverLeft: '',
                                                    hoverBottom: '',
                                                    nonHoverBackgroundColor: '',
                                                    nonHoverTextColor: '',
                                                    nonHoverBackgroundImage: '',
                                                    nonHoverdisplay: '',
                                                    nonHoverTop: '',
                                                    nonHoverRight: '',
                                                    nonHoverLeft: '',
                                                    nonHoverBottom: ''
                                                };
                                                fadeChanges.push(affectedElementDataForTarget);
                                            }
                                            var newData = {};
                                            if (hoverBackgroundColor !== '') { newData.hoverBackgroundColor = hoverBackgroundColor; }
                                            if (hoverTextColor !== '') { newData.hoverTextColor = hoverTextColor; }
                                            if (hoverBackgroundImage !== '') { newData.hoverBackgroundImage = hoverBackgroundImage; }
                                            if (hoverDisplay !== '') { newData.hoverDisplay = hoverDisplay; }
                                            if (hoverTop !== '') { newData.hoverTop = hoverTop; }
                                            if (hoverRight !== '') { newData.hoverRight = hoverRight; }
                                            if (hoverBottom !== '') { newData.hoverBottom = hoverBottom; }
                                            if (hoverLeft !== '') { newData.hoverLeft = hoverLeft; } if (nonHoverBackgroundColor !== '') { newData.nonHoverBackgroundColor = nonHoverBackgroundColor; }
                                            if (nonHoverTextColor !== '') { newData.nonHoverTextColor = nonHoverTextColor; }
                                            if (nonHoverBackgroundImage !== '') { newData.nonHoverBackgroundImage = nonHoverBackgroundImage; }
                                            if (nonHoverDisplay !== '') { newData.nonHoverDisplay = nonHoverDisplay; }
                                            if (nonHoverTop !== '') { newData.nonHoverTop = nonHoverTop; }
                                            if (nonHoverRight !== '') { newData.nonHoverRight = nonHoverRight; }
                                            if (nonHoverBottom !== '') { newData.nonHoverBottom = nonHoverBottom; }
                                            if (nonHoverLeft !== '') { newData.nonHoverLeft = nonHoverLeft; }
                                            affectedElementDataForTarget = $.extend(affectedElementDataForTarget, newData);
                                            if (
												affectedElementDataForTarget.hoverBackgroundImage !== '' && affectedElementDataForTarget.hoverBackgroundImage !== nonHoverBackgroundImage
												|| affectedElementDataForTarget.hoverTop !== '' && affectedElementDataForTarget.hoverTop !== nonHoverTop
												|| affectedElementDataForTarget.hoverRight !== '' && affectedElementDataForTarget.hoverRight !== nonHoverRight
												|| affectedElementDataForTarget.hoverBottom !== '' && affectedElementDataForTarget.hoverBottom !== nonHoverBottom
												|| affectedElementDataForTarget.hoverLeft !== '' && affectedElementDataForTarget.hoverLeft !== nonHoverLeft
												) {
                                                targetData.needsClone = true;
                                            }
                                        });
                                    });
                                }
                            }
                        });
                    });
                } catch (e) { console.log(e); }
            });

            //now add a jquery hover event to each target that either animates affected elements for simple color changes, or fades in a cloned element for background-image changes
            $(targetElements).each(function () {
                var targetElement = this;
                var targetData = $(targetElement).data('fadeCssHover');
                var affectedChildElements = targetData.affectedChildElements;

                $(affectedChildElements).each(function () {
                    $(this).css('color', $(this).css('color'))
						.css('top', $(this).css('top'))
						.css('right', $(this).css('right'))
						.css('bottom', $(this).css('bottom'))
						.css('left', $(this).css('left'))
						.css('background-color', $(this).css('background-color'))
						.css('background-image', $(this).css('background-image'))
						.css('display', $(this).css('display'));
                });

                if (targetData.needsClone) {
                    //We need to clone!
                    if ($(targetElement).css('position') == 'static' || $(targetElement).css('position') == 'relative') {

                        //clone the target
                        var hoverClone = $(targetElement).clone();


                        //insert clone before target
                        $(hoverClone).insertBefore(targetElement);

                        //append the original target to the clone
                        $(targetElement).appendTo(hoverClone);

                        //apply all hover states to any affectedChildElements under the target
                        $(affectedChildElements).each(function () {
                            var affectedElement = this;
                            var fadeChanges = $(affectedElement).data('fadeCssHover').fadeChanges;
                            var affectedElementDataForTarget = _getAffectedElementDataByTarget(fadeChanges, targetElement);
                            var backgroundColorToAnimate = affectedElementDataForTarget.hoverBackgroundColor !== '' ?
								affectedElementDataForTarget.hoverBackgroundColor : $(affectedElement).css('background-color');
                            var textColorToAnimate = affectedElementDataForTarget.hoverTextColor !== '' ?
								affectedElementDataForTarget.hoverTextColor : $(affectedElement).css('color');
                            var backgroundImageToAnimate = affectedElementDataForTarget.hoverBackgroundImage !== '' ?
								affectedElementDataForTarget.hoverBackgroundImage : $(affectedElement).css('background-image');
                            var displayToAnimate = affectedElementDataForTarget.hoverDisplay !== '' ?
								affectedElementDataForTarget.hoverDisplay : $(affectedElement).css('display');
                            var topToAnimate = affectedElementDataForTarget.hoverTop !== '' ?
								affectedElementDataForTarget.hoverTop : $(affectedElement).css('top');
                            var rightToAnimate = affectedElementDataForTarget.hoverRight !== '' ?
								affectedElementDataForTarget.hoverRight : $(affectedElement).css('right');
                            var bottomToAnimate = affectedElementDataForTarget.hoverBottom !== '' ?
								affectedElementDataForTarget.hoverBottom : $(affectedElement).css('bottom');
                            var leftToAnimate = affectedElementDataForTarget.hoverLeft !== '' ?
								affectedElementDataForTarget.hoverLeft : $(affectedElement).css('left');
                            $(affectedElement)
								.css('top', topToAnimate)
								.css('right', rightToAnimate)
								.css('bottom', bottomToAnimate)
								.css('left', leftToAnimate)
								.css('display', displayToAnimate)
								.css('background-image', backgroundImageToAnimate)
								.css('background-color', backgroundColorToAnimate)
								.css('color', textColorToAnimate);
                        });

                        //make clone relatively positioned 
                        $(hoverClone).css('position', 'relative');

                        //make the target absolutely positioned and display none
                        $(targetElement).css('display', 'none')
							.css('position', 'absolute')
							.css('top', '0')
							.css('left', '0')

                        //set up hover events on clone
                        $(hoverClone).hover(
							function () {
							    $(targetElement).stop().fadeIn(data.options.fadeInDuration);
							},
							function () {
							    $(targetElement).stop().fadeOut(data.options.fadeOutDuration);
							}
						);
                    }
                } else {
                    $(targetElement).hover(
						function () {
						    $(affectedChildElements).each(function () {
						        var affectedElement = this;
						        var fadeChanges = $(affectedElement).data('fadeCssHover').fadeChanges;
						        var affectedElementDataForTarget = _getAffectedElementDataByTarget(fadeChanges, targetElement);
						        var backgroundColorToAnimate = affectedElementDataForTarget.hoverBackgroundColor !== '' ?
									affectedElementDataForTarget.hoverBackgroundColor : $(affectedElement).css('background-color');
						        var textColorToAnimate = affectedElementDataForTarget.hoverTextColor !== '' ?
									affectedElementDataForTarget.hoverTextColor : $(affectedElement).css('color');
						        var displayToAnimate = affectedElementDataForTarget.hoverDisplay !== '' ?
									affectedElementDataForTarget.hoverDisplay : $(affectedElement).css('display');

						        $(affectedElement).stop().animate({ backgroundColor: backgroundColorToAnimate, color: textColorToAnimate }, data.options.fadeInDuration);
						        if (displayToAnimate != $(affectedElement).css('display')) {
						            if (displayToAnimate === 'none') {
						                $(affectedElement).fadeOut(data.options.fadeOutDuration, function () {
						                    $(this).css('display', 'none');
						                });
						            } else {
						                $(affectedElement).fadeIn(data.options.fadeInDuration, function () {
						                    $(this).css('display', 'block');
						                });
						            }
						        }
						    });
						},
						function () {
						    $(affectedChildElements).each(function () {
						        var affectedElement = this;
						        var fadeChanges = $(affectedElement).data('fadeCssHover').fadeChanges;
						        var affectedElementDataForTarget = _getAffectedElementDataByTarget(fadeChanges, targetElement);
						        var backgroundColorToAnimate = affectedElementDataForTarget.nonHoverBackgroundColor !== '' ?
									affectedElementDataForTarget.nonHoverBackgroundColor : $(affectedElement).css('background-color');
						        var textColorToAnimate = affectedElementDataForTarget.nonHoverTextColor !== '' ?
									affectedElementDataForTarget.nonHoverTextColor : $(affectedElement).css('color');
						        var displayToAnimate = affectedElementDataForTarget.nonHoverDisplay !== '' ?
									affectedElementDataForTarget.nonHoverDisplay : $(affectedElement).css('display');

						        $(affectedElement).stop().animate({ backgroundColor: backgroundColorToAnimate, color: textColorToAnimate }, data.options.fadeInDuration);
						        if (displayToAnimate != $(affectedElement).css('display')) {
						            if (displayToAnimate === 'none') {
						                $(affectedElement).fadeOut(data.options.fadeOutDuration, function () {
						                    $(this).css('display', 'none');
						                });
						            } else {
						                $(affectedElement).fadeIn(data.options.fadeInDuration, function () {
						                    $(this).css('display', 'block');
						                });
						            }
						        }
						    });
						}
					);
                }
            });

            //now call callback
            if (typeof (callback) === "function") {
                callback.apply();
            }
        };

        var defaultOptions = {
            fadeInDuration: 200,
            fadeOutDuration: 200
        };

        var data = $(this).data('fadeCssHover');
        if (!data) {
            //ininialize this beast
            data = {
                target: $(this),
                options: options ? $.extend(defaultOptions, options) : defaultOptions
            };
            $(this).data('fadeCssHover', data);

            $(document).ready(function () {
                if (!Modernizr.touch) { //this plugin makes no sense on touchscreen
                    makeItSo.apply();
                } else {
                    //now call callback
                    if (typeof (callback) === "function") {
                        callback.apply();
                    }
                }
            });
        } else {
            data.options = options ? $.extend(true, data.options, options) : defaultOptions;
        }


    }
})(jQuery);

