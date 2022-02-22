/**
 * @author Paulo Godinho
 *
 *
 ==============ANIM-Vitrinismo Video=================================================
 <!--NodeFire Stage Widget
 Copyright NodeFire - All Rights Reserved.
 http://www.nodefire.com -->
 ===============================================================
 */

var NF = new _NF;
function _NF() {
	Array.prototype.NFisArray = 1
}
_NF.prototype._util = function() {
	function j() {
		function d(a) {
			return RegExp("\\b" + a + "\\b", "g")
		}

		var e = this;
		e.addClass = e.aC = function(a, b) {
			var c;
			if (a && "string" == typeof ( c = a.className) && 0 > c.search(d(b)))
				return a.className += ( c ? " " : "") + b, a.className = a.className.replace(/\s{2,}/g, " "), !0
		};
		e.removeClass = e.rC = function(a, b) {
			if (a && "string" == typeof a.className) {
				var c = a.className;
				a.className = a.className.replace(d(b), "");
				return c != a.className
			}
		};
		e.hasClass = e.hC = function(a, b, c) {
			b.NFisArray || ( b = [b]);
			var k, f = 0, e = b.length;
			if (a && ( k = a.className)) {
				for ( a = 0; a < e; a++)
					if (d(b[a]).test(k)) {
						if (!c || 1 == e)
							return b[a];
						f++
					}
				if (c && f == e)
					return b
			}
		};
		e.isDescendant = e.iD = function(a, b) {
			if (a && b)
				for (; b = b.parentNode; )
					if (b == a)
						return !0
		};
		e.isRelation = function(a, b) {
			if (a && b) {
				if (e.iD(a, b))
					return "ancestor";
				if (e.iD(b, a))
					return "descendant"
			}
		};
		e.getChild = function(a, b, c, k) {
			for (var f = 0, d, a = a.childNodes, h = 0; h < a.length; h++)
				if (!c || c && e.hC(a[h], c, k))
					if (f++, "first-child" == b) {
						d = a[h];
						break
					} else
						"last-child" == b ? d = a[h] : "number" == typeof b && b == f && ( d = a[h]);
			return d
		};
		e.getElementsByAttribute = function(a, b) {
			for (var c = [], k = a.getElementsByTagName("*"), f = 0; f < k.length; f++)
				k[f].getAttribute(b) && c.push(k[f]);
			return c
		};
		e.getElementsByClassName = e.getNodesByClassName = e.gEBCN = function(a, b, c, k) {
			var f = [];
			if (a.getElementsByClassName)
				for (var b = a.getElementsByClassName(b), d = 0; d < b.length; d++)
					(!k || k && b[d].parentNode == a) && f.push(b[d]);
			else if (a.getElementsByTagName)
				for (var h = a.getElementsByTagName("*"), d = 0; d < h.length; d++)
					e.hC(h[d], b.split(" "), !0) && (!k || k && h[d].parentNode == a) && f.push(h[d]);
			return c && f.length ? f[0] : f || []
		};
		e.getElementsFromCoordinates = function(a, b, c, k, f) {
			for (var d = [], h = 0; h < a.length; h++)
				if (!a[h][f]) {
					var g = e.getLocation(a[h]), i = g.x + a[h].offsetWidth, z = g.y + a[h].offsetHeight;
					if (b && !c && b.x > g.x && b.x < i && b.y > g.y && b.y < z)
						d.push(a[h]);
					else {
						var v;
						if ( v = b)
							if ( v = c) {
								v = g.x;
								var A = g.y, D = z, l = c.x, p = b.y, x = c.y;
								v = !(b.x > i || l < v || p > D || x < A)
							}
						v && (k && b.x < g.x || c.x > i || b.y < g.y || c.y > z) && d.push(a[h])
					}
				}
			return d
		};
		e.getFirstAncestorByClassName = e.gFPN = function(a, b, c) {
			for (; a = a.parentNode; ) {
				if (NF.u.d.hC(a, b))
					return a;
				if (c && NF.u.d.hC(a, c))
					return !1
			}
		};
		e.getFirstDecendantByClassName = e.gFD = function(a, b, c) {
			var d = b;
			if (d) {
				d.NFisArray || ( d = [b]);
				if (c && NF.u.d.hC(a, d))
					return a;
				for ( b = 0; b < d.length; b++)
					if ( c = NF.u.d.gEBCN(a, d[b], !0))
						return c
			}
		};
		e.getSibling = function(a, b, c, d, f) {
			for (; a = a[b + "Sibling"]; ) {
				if (!c && !d)
					return a;
				if (c && e.hC(a, c) || d && a.tagName.toLowerCase() == d.toLowerCase())
					if (!f || f(a))
						return a
			}
		};
		e.createNodeFromHTML = function(a) {
			if (a) {
				var b = document.createElement("DIV");
				b.innerHTML = a;
				a = b.childNodes[0];
				if (a.tagName)
					return a
			}
		};
		e.addNode = function(a, b, c) {
			a = a.split("-");
			if ("child" == a[1])
				return "replace" == a[0] && e.removeChildren(c), e.addChild(a[0], b, c);
			if (a[1] && 0 == a[1].indexOf(".")) {
				var d = e.getChild(c, "last-child", a[1].substring(1));
				if (d)
					c = d;
				else
					return e.addChild(a[2] || "", b, c)
			}
			b = c.parentNode.insertBefore(b, "after" == a[0] ? c.nextSibling : c);
			"replace" == a[0] && c.parentNode.removeChild(c);
			return b
		};
		e.addChild = function(a, b, c) {
			var d;
			return a.match("first") && ( d = c.childNodes).length ? c.insertBefore(b, d[0]) : c.appendChild(b)
		};
		e.removeChildren = function(a, b) {
			for (var c = [], d = a.childNodes, f = 0; f < d.length; f++)
				if (!b || e.hC(d[f], b))
					c.push(a.removeChild(d[f])), f--;
			return c
		};
		e.moveNode = function(a, b) {
			a.NFisArray || ( a = [a]);
			for (var c = [], d = 0; d < a.length; d++)
				c.push(b.appendChild(a[d].parentNode.removeChild(a[d])));
			return c
		};
		e.removeNode = function(a) {
			a.NFisArray || ( a = [a]);
			for (var b = [], c = 0; c < a.length; c++)
				b.push(a[c].parentNode.removeChild(a[c]));
			return b
		};
		e.wrapNode = function(a, b, c) {
			if (b)
				return b = "string" == typeof b ? e.createNodeFromHTML(b) : b, c || ( c = b), e.removeChildren(c), c.appendChild(a.parentNode.replaceChild(b, a)), b
		};
		e.unwrapNode = function(a, b) {
			return a.parentNode.replaceChild(b, a)
		};
		e.getDimensions = function(a) {
			var b = 0, c = 0;
			a.getBoundingClientRect ? ( a = a.getBoundingClientRect(), b = a.right - a.left, c = a.bottom - a.top) : ( b = a.offsetWidth, c = a.offsetHeight);
			return {
				x : b,
				y : c,
				width : b,
				height : c,
				w : b,
				h : c
			}
		};
		e.getLocation = function(a, b) {
			var c = 0, d = 0;
			if (a.getBoundingClientRect) {
				var d = a.getBoundingClientRect(), f = b ? b.getBoundingClientRect() : {
					top : 0,
					left : 0
				}, e = c = 0;
				b && ( c = b.clientTop, e = b.clientLeft);
				c = d.top - f.top - c;
				d = d.left - f.left - e
			}
			return {
				top : c,
				left : d,
				x : d,
				y : c
			}
		};
		e.getFullOffset = function(a, b) {
			var c = {
				x : 0,
				y : 0
			}, d = 0;
			do !NF.u.browser.firefox && d && (c.x += a.clientLeft, c.y += a.clientTop), c.x += a.offsetLeft - (a.scrollLeft || 0), c.y += a.offsetTop - (a.scrollTop || 0), d++;
			while(a=a.offsetParent);
			if (b) {
				NF.u.browser.firefox && (c.x -= b.clientLeft, c.y -= b.clientTop);
				do NF.u.browser.firefox || (c.x -= b.clientLeft, c.y -= b.clientTop), c.x -= b.offsetLeft - (b.scrollLeft || 0), c.y -= b.offsetTop - (b.scrollTop || 0);
				while(b=b.offsetParent)
			}
			return c
		};
		e.getOffsets = function(a, b) {
			r = {
				top : a.offsetTop,
				left : a.offsetLeft
			};
			NF.u.browser.firefox && (r.top -= b.clientTop, r.left -= b.clientLeft);
			r.x = r.left;
			r.y = r.top;
			return r
		}
	}

	function i() {
		this.getBrowserSpecifcStyleName = function(d) {
			var e = d, a = "";
			if (NF.util.browser.ie8Down)
				e = "";
			else {
				for (var b = document.createElement("DIV"), c = " Moz Webkit ms O Khtml".split(" "), k = " -moz- -webkit- -ms- -o- -khtml-".split(" "), f = 0; f < c.length; f++)
					if ( e = c[f], e += !c[f] ? d : NF.util.string.capitalize(d), "undefined" != typeof b.style[e]) {
						a = k[f];
						break
					}
				delete b
			}
			return {
				styleName : e,
				cssPrefix : a
			}
		};
		this.getBrowserSpecifcCSSPrefix = function() {
			var d = "", e = NF.util.browser;
			e.firefox ? d = "-moz-" : e.chrome || e.safari ? d = "-webkit-" : e.opera ? d = "-o-" : e.ie && ( d = "-ms-");
			return d
		};
		this.getComputedStyle = this.gCS = function(d, e, a) {
			if (d)
				try {
					var b;
					if (( b = document.defaultView) && ( b = b.getComputedStyle))
						return b(d, null).getPropertyValue(e);
					if ( b = d.currentStyle)
						return b[a]
				} catch(c) {
					return null
				}
		};
		this.addSheet = function(d) {
			var e = document.getElementsByTagName("head")[0], a = document.createElement("style");
			e.appendChild(a);
			NF.u.browser.ie8Down ? a.styleSheet.cssText = d : a.appendChild(document.createTextNode(d))
		}
	}

	function t() {
		var d = navigator.userAgent, e = d.toLowerCase();
		this.smallMobile = (this.mobile = e.indexOf("mobile") + 1) && 1 < window.devicePixelRatio;
		this.ipad = e.indexOf("ipad") + 1;
		this.ios = e.indexOf("like mac") + 1;
		this.android = e.indexOf("android") + 1;
		this.ie7 = (this.ie = d.indexOf("MSIE") + 1) && d.indexOf("MSIE 7") + 1;
		this.ie8 = this.ie && d.indexOf("MSIE 8") + 1;
		this.ie9 = this.ie && d.indexOf("MSIE 9") + 1;
		this.ie9Up = this.ie && d.indexOf("MSIE 1") + 1 || this.ie9;
		this.ie6Down = this.ie && !window.XMLHttpRequest;
		this.ie7Down = this.ie7 || this.ie6Down;
		this.ie8Down = this.ie8 || this.ie7Down;
		this.ie9Down = this.ie9 || this.ie8Down;
		this.firefox = e.indexOf("firefox") + 1;
		this.chrome = e.indexOf("chrome") + 1;
		this.safari = !this.chrome && e.indexOf("safari") + 1;
		this.opera = e.indexOf("opera") + 1;
		this.webkit = e.indexOf("webkit") + 1;
		this.no3d = this.ie9Down || this.opera;
		this.noCSS3 = this.ie8Down;
		this.hasStyle = function(a) {
			for (var b = document.createElement("DIV"), c = " Moz Webkit ms O Khtml".split(" "), d = 0; d < c.length; d++)
				if (null != b.style[c[d] + (c[d] ? a : NF.u.string.capitalize(a))])
					return !0
		}
	}

	function n() {
		function d(a) {
			NF.u.browser.opera || NF.u.browser.firefox || NF.u.browser.ie9Up || NF.u.browser.webkit ? document.addEventListener("DOMContentLoaded", a, !1) : NF.u.browser.ie ? (document.write("<scr" + "ipt id='NFreadytest' type='text/javascr" + "ipt' defer='defer' src='javascr" + "ipt:void(0)'><\/scr" + "ipt>"), document.getElementById("NFreadytest").onreadystatechange = function() {
				"complete" == this.readyState && NF.u.e.fire(document, "ready")
			}) : setTimeout(function() {
				NF.u.e.fire(document, "ready")
			}, 1E3)
		}

		var e = this;
		e.addListener = function(a, b, c) {
			if (a) {
				a.NFisArray || ( a = [a]);
				for (var e = 0; e < a.length; e++) {
					b && !b.NFisArray && ( b = [b]);
					for (var f = 0; f < b.length; f++) {
						var g;
						if (!( g = a[e].NF_eventStore))
							g = a[e].NF_eventStore = new NF.util.eventStore(a[e]);
						g.addEvent(b[f], c);
						"ready" == b[f] && d(c)
					}
				}
			}
		};
		e.addDomListener = function(a, b, c, d, f) {
			if ("ready" == b)
				NF.u.e.addListener(document, b, c);
			else {
				d && ( c = function(b) {
					a[d](b)
				});
				b.NFisArray || ( b = [b]);
				for (var e = 0; e < b.length; e++)
					a.addEventListener ? a.addEventListener(b[e], c, f) : a.attachEvent && a.attachEvent("on" + b[e], c)
			}
		};
		e.addDomListener(window, "load", function() {
			e.loaded = !0
		});
		e.removeDomListener = function(a, b, c) {
			b.NFisArray || ( b = [b]);
			for (var d = 0; d < b.length; d++)
				a.removeEventListener ? a.removeEventListener(b[d], c) : a.detachEvent && a.detachEvent("on" + b[d], c)
		};
		e.fire = function(a, b, c) {
			var d = a.NF_eventStore;
			if (d)
				return c ? c.NFisArray ? "object" != typeof c[0] && (c[0] = {}) : c = [c] : c = [{}], c[0].type = b, c[0].target = a, d.fire(b, c)
		};
		e.bubbleSkip = function(a, b, c) {
			e.stopPropogation(a);
			c && a.type != c || ( c = document.createEvent("Event"), c.initEvent(a.type, !0, !0), b.dispatchEvent(c))
		};
		e.stopPropogation = function(a, b) {
			if (a)
				return a.cancelBubble = !0, a.stopPropagation && a.stopPropagation(), b && a.preventDefault && a.preventDefault(), !1
		};
		e.preventDefault = function(a) {
			a && (a.preventDefault && a.preventDefault(), a.returnValue = !1)
		}
	}

	function g() {
		function d() {
			this._linear = {
				_ : function(a, b, c, d) {
					return c * a / d + b
				}
			};
			this.css_linear = {
				_ : "0.250, 0.250, 0.750, 0.750"
			};
			this._in = {
				quadratic : function(a, b, c, d) {
					return c * (a /= d) * a + b
				},
				cubic : function(a, b, c, d) {
					return c * (a /= d) * a * a + b
				},
				quartic : function(a, b, c, d) {
					return c * (a /= d) * a * a * a + b
				},
				quintic : function(a, b, c, d) {
					return c * (a /= d) * a * a * a * a + b
				},
				sinusoidal : function(a, b, c, d) {
					return -c * Math.cos(a / d * (Math.PI / 2)) + c + b
				},
				exponential : function(a, b, c, d) {
					return 0 == a ? b : c * Math.pow(2, 10 * (a / d - 1)) + b
				},
				circular : function(a, b, c, d) {
					return -c * (Math.sqrt(1 - (a /= d) * a) - 1) + b
				},
				elastic : function(a, b, c, d, f, e) {
					f = 0;
					if (0 == a)
						return b;
					if (1 == (a /= d))
						return b + c;
					e || ( e = 0.3 * d);
					f < Math.abs(c) ? ( f = c, c = e / 4) : c = e / (2 * Math.PI) * Math.asin(c / f);
					return -(f * Math.pow(2, 10 * (a -= 1)) * Math.sin((a * d - c) * 2 * Math.PI / e)) + b
				},
				back : function(a, b, c, d, f) {
					void 0 == f && ( f = 1.70158);
					return c * (a /= d) * a * ((f + 1) * a - f) + b
				},
				bounce : function(a, b, c, d) {
					return c - NF.u.a.ease._out.bounce(d - a, 0, c, d) + b
				}
			};
			this.css_in = {
				quadratic : "0.550, 0.085, 0.680, 0.530",
				cubic : "0.550, 0.055, 0.675, 0.190",
				quartic : "0.895, 0.030, 0.685, 0.220",
				quintic : "0.755, 0.050, 0.855, 0.060",
				sinusoidal : "0.470, 0.000, 0.745, 0.715",
				exponential : "0.950, 0.050, 0.795, 0.035",
				circular : "0.600, 0.040, 0.980, 0.335",
				back : "0.600, -0.280, 0.735, 0.045"
			};
			this._out = {
				quadratic : function(a, b, c, d) {
					return -c * (a /= d) * (a - 2) + b
				},
				cubic : function(a, b, c, d) {
					return c * (( a = a / d - 1) * a * a + 1) + b
				},
				quartic : function(a, b, c, d) {
					return -c * (( a = a / d - 1) * a * a * a - 1) + b
				},
				quintic : function(a, b, c, d) {
					return c * (( a = a / d - 1) * a * a * a * a + 1) + b
				},
				sinusoidal : function(a, b, c, d) {
					return c * Math.sin(a / d * (Math.PI / 2)) + b
				},
				exponential : function(a, b, c, d) {
					return a == d ? b + c : c * (-Math.pow(2, -10 * a / d) + 1) + b
				},
				circular : function(a, b, c, d) {
					return c * Math.sqrt(1 - ( a = a / d - 1) * a) + b
				},
				elastic : function(a, b, c, d, f, e) {
					f = 0;
					if (0 == a)
						return b;
					if (1 == (a /= d))
						return b + c;
					e || ( e = 0.3 * d);
					if (f < Math.abs(c))
						var f = c, h = e / 4;
					else
						h = e / (2 * Math.PI) * Math.asin(c / f);
					return f * Math.pow(2, -10 * a) * Math.sin((a * d - h) * 2 * Math.PI / e) + c + b
				},
				back : function(a, b, c, d, f) {
					void 0 == f && ( f = 1.70158);
					return c * (( a = a / d - 1) * a * ((f + 1) * a + f) + 1) + b
				},
				bounce : function(a, b, c, d) {
					return (a /= d) < 1 / 2.75 ? c * 7.5625 * a * a + b : a < 2 / 2.75 ? c * (7.5625 * (a -= 1.5 / 2.75) * a + 0.75) + b : a < 2.5 / 2.75 ? c * (7.5625 * (a -= 2.25 / 2.75) * a + 0.9375) + b : c * (7.5625 * (a -= 2.625 / 2.75) * a + 0.984375) + b
				}
			};
			this.css_out = {
				quadratic : "0.250, 0.460, 0.450, 0.940",
				cubic : "0.215, 0.610, 0.355, 1.000",
				quartic : "0.165, 0.840, 0.440, 1.000",
				quintic : "0.230, 1.000, 0.320, 1.000",
				sinusoidal : "0.390, 0.575, 0.565, 1.000",
				exponential : "0.190, 1.000, 0.220, 1.000",
				circular : "0.075, 0.820, 0.165, 1.000",
				back : "0.175, 0.885, 0.320, 1.275"
			};
			this._inout = {
				quadratic : function(a, b, c, d) {
					return 1 > (a /= d / 2) ? c / 2 * a * a + b : -c / 2 * (--a * (a - 2) - 1) + b
				},
				cubic : function(a, b, c, d) {
					return 1 > (a /= d / 2) ? c / 2 * a * a * a + b : c / 2 * ((a -= 2) * a * a + 2) + b
				},
				quartic : function(a, b, c, d) {
					return 1 > (a /= d / 2) ? c / 2 * a * a * a * a + b : -c / 2 * ((a -= 2) * a * a * a - 2) + b
				},
				quintic : function(a, b, c, d) {
					return 1 > (a /= d / 2) ? c / 2 * a * a * a * a * a + b : c / 2 * ((a -= 2) * a * a * a * a + 2) + b
				},
				sinusoidal : function(a, b, c, d) {
					return -c / 2 * (Math.cos(Math.PI * a / d) - 1) + b
				},
				exponential : function(a, b, c, d) {
					return 0 == a ? b : a == d ? b + c : 1 > (a /= d / 2) ? c / 2 * Math.pow(2, 10 * (a - 1)) + b : c / 2 * (-Math.pow(2, -10 * --a) + 2) + b
				},
				circular : function(a, b, c, d) {
					return 1 > (a /= d / 2) ? -c / 2 * (Math.sqrt(1 - a * a) - 1) + b : c / 2 * (Math.sqrt(1 - (a -= 2) * a) + 1) + b
				},
				elastic : function(a, b, c, d, f, e) {
					f = 0;
					if (0 == a)
						return b;
					if (2 == (a /= d / 2))
						return b + c;
					e || ( e = d * 0.3 * 1.5);
					if (f < Math.abs(c))
						var f = c, h = e / 4;
					else
						h = e / (2 * Math.PI) * Math.asin(c / f);
					return 1 > a ? -0.5 * f * Math.pow(2, 10 * (a -= 1)) * Math.sin((a * d - h) * 2 * Math.PI / e) + b : 0.5 * f * Math.pow(2, -10 * (a -= 1)) * Math.sin((a * d - h) * 2 * Math.PI / e) + c + b
				},
				back : function(a, b, c, d, f) {
					void 0 == f && ( f = 1.70158);
					return 1 > (a /= d / 2) ? c / 2 * a * a * (((f *= 1.525) + 1) * a - f) + b : c / 2 * ((a -= 2) * a * (((f *= 1.525) + 1) * a + f) + 2) + b
				},
				bounce : function(a, b, c, d) {
					return a < d / 2 ? 0.5 * NF.u.a.ease._in.bounce(2 * a, 0, c, d) + b : 0.5 * NF.u.a.ease._out.bounce(2 * a - d, 0, c, d) + 0.5 * c + b
				}
			};
			this.css_inout = {
				quadratic : "0.455, 0.030, 0.515, 0.955",
				cubic : "0.645, 0.045, 0.355, 1.000",
				quartic : "0.770, 0.000, 0.175, 1.000",
				quintic : "0.860, 0.000, 0.070, 1.000",
				sinusoidal : "0.445, 0.050, 0.550, 0.950",
				exponential : "1.000, 0.000, 0.000, 1.000",
				circular : "0.785, 0.135, 0.150, 0.860",
				back : "0.680, -0.550, 0.265, 1.550"
			}
		}

		var e = this;
		this.tween = function(a) {
			var b = parseFloat(a.startValue), d = parseFloat(a.endValue), g = a.frameDistance;
			return b == d || isNaN(b) || isNaN(d) || 0 == g ? a.startValue : e.ease["_"+a.ease.direction][a.ease.type](a.framePos - a.startFrame, b, d - b, g)
		};
		d.prototype = this;
		this.ease = new d
	}
	this.string = new function(){this.capitalize=function(d){if(0<d.length)return d.substring(0,1).toUpperCase()+d.substring(1)};this.generateUniqueId=function(d){var e=((new Date).getTime()+"").substring(3);return d+"_"+e}};
	this.object = new function(){var d=this;this.clone=function(e,a){if(!e||"object"!=typeof e||e.nodeType)return e;var a=a||[],b;for(b in a)if(e==a[b])return e;a.push(e);var c=e.NFisArray?[]:{};for(b in e)c[b]=d.clone(e[b],a);return c};this.convertAttributeToObject=function(d,a){d=d.getAttribute(a,2);return eval("("+d+")")||{}}};
	this.array = new function(){this.sortNumericArray=function(d){return d.sort(function(d,a){return d-a})}};
	j.prototype = this;
	this.d = this.dom = new j;
	i.prototype = this;
	this.c = this.css = new i;
	t.prototype = this;
	this.browser = new t;
	this.eventStore = function(d) {
		var e = {};
		this.addEvent = function(a, b) {
			e[a] = {
				handle : b
			}
		};
		this.getHandle = function(a) {
			if ( a = e[a])
				return a.handle
		};
		this.fire = function(a, b) {
			this.lastEvent = {
				type : a,
				args : b
			};
			b.NFisArray || ( b = Array(b));
			var c;
			if ( c = this.getHandle(a))
				return c.apply(d, b)
		}
	};
	n.prototype = this;
	this.e = this.event = new n;
	g.prototype = this;
	this.a = this.animate = new g
};
NF._util.prototype = NF;
_NF.prototype.u = _NF.prototype.util = new NF._util;
_NF.prototype.stageManager = new function(){function j(d){for(var e in g.hold)NF.u.d.rC(g.hold[e],"nfHold");g.hold=null;t(d.target||d.srcElement,["click"]);t(d.target||d.srcElement,["mousehold"],!0)}function i(d){t(d.target||d.srcElement,["mousedown","active"])}function t(d,e,a){for(;d;){if(d.nfUid&&!a)return;d=d.parentNode}for(d=0;d<e.length;d++)for(var b in g.stages)g.stages[b].BF||(g.stages[b].stopActionTimelines(e[d],null),"active"==e[d]&&g.setElementActive())}function n(){function d(){if(!a.showElm){var b=document.createElement("TEXTAREA"),d=b.style;d.position="absolute";d.top="5px";d.left="5px";d.color="#000";d.backgroundColor="rgb(255,255,255)";d.border="solid 2px #333";d.fontFamily="Arial";d.fontSize="12px";d.padding="5px";d.overflow="auto";d.height="58px";d.width="40%";d.minWidth="40px";d.zIndex=999999;d.boxShadow="1px 1px 5px #222";document.body.appendChild(b);a.showElm=b;NF.u.e.addDomListener(b,"dblclick",function(b){a.showElm.value="";b.target.style.display="none";a.errorLog=[]});NF.u.e.addDomListener(b,"mousedown",function(){clearTimeout(a.hideTimer)})}return a.showElm}function e(b){clearTimeout(a.hideTimer);b?d().style.display="none":a.hideTimer=setTimeout(function(){e(!0)},5E3)}var a=this;a.showElm;a.errorLog=[];a.logEnabled;a.hideTimer;this.show=function(a){var c=d();c.style.display="block";c.value=a+"\n\n/*Double click to hide this message.*/";e()};this.enableLog=function(){a.logEnabled=!0};this.logError=function(b){if(a.logEnabled){a.errorLog.push(b);var c=d();c.style.display="block";c.scrollTop=0;c.value=a.errorLog.length+":\t"+b+(c.value?"\n"+c.value:"\n\n/*Double click to hide this message.*/");e()}}}var g=this;g.stages={};g.curStage;g.activeElm;g.classDefs={_0:"Stage",_1:"Box",_2:"Circle",_3:"Grid",_4:"List",_5:"Floatleft",_6:"Floatright",_7:"RotatorH",_8:"RotatorV",_9:"Item",_10:"SlideshowH",_11:"SlideshowV",_12:"Frames"};g.cds={_9:1};window.requestAnimationFrame=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame;window.cancelAnimationFrame=window.cancelAnimationFrame||window.mozCancelAnimationFrame||window.webkitCancelAnimationFrame||window.msCancelAnimationFrame;NF.u.e.addListener(document,"ready",function(){var d=NF.u.e.addDomListener;d(document,"mouseup",j);d(document,"mousedown",i);d=".nfStage {cursor:default;-webkit-transform:translateZ(0);-moz-transform:translateZ(0);-ms-transform:translateZ(0);transform:translateZ(0);position:relative;user-select:none;-webkit-user-select:none;-moz-user-select:none;-o-user-select:none;-ms-user-select:none;background-color:#fff;border:solid 1px #333;width:800px;height:400px;font-family:Arial, Verdana, Sans-Serif;font-size:12px;color:#333;font-weight:normal;line-height:normal;}.nfStage * {cursor:inherit;}.nfCenterBlock {position:absolute;margin:auto;left:0px;right:0px;top:0px;bottom:0px;}";d+=".nfStage, .nfStage .nfA {background-repeat:no-repeat;background-position:center center;background-size:contain;}";d+=".nfStage, .nfStage .nfA, .nfStage .nfA>nfB, .nfBorderBox {box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;-ms-box-sizing:border-box;-o-box-sizing:border-box;box-sizing:border-box;}";d+=".nfStage .nfA {position:absolute;}";d+=".nfStage .nfA {width:10px;height:10px;border:solid 0px #333;background-color:#b2d1f0;background-color:rgba(0,102,204,.3);}";d+=".nfStage .nfA>.nfB {position:relative;width:100%;}";d+=".nfStage .nfA.nfGrid>.nfItem {background-color:transparent;}";d+=".nfStage .nfA.nfList>.nfItem {position:relative;padding:5px;}";d+=".nfStage .nfA.nfFloatleft>.nfItem {position:relative;float:left;padding:10px;}";d+=".nfStage .nfA.nfFloatright>.nfItem {position:relative;float:right;padding:10px;}";d+=".nfStage #nfDownLevelContent {display:none;}";d+=".nfStage .nfA.nf_hoverMenu>.nfA, .nfStage.nf_hoverMenu>.nfA, .nfStage .nfA.nf_clickMenu>.nfA, .nfStage.nf_clickMenu>.nfA{display:none;}";d+=".nfStage .nfA.nf_hoverMenu.nfDelayHoverLineage>.nfA, .nfStage.nf_hoverMenu.nfDelayHoverLineage>.nfA, .nfStage .nfA.nf_clickMenu.nfActiveLineage>.nfA, .nfStage.nf_clickMenu.nfActiveLineage>.nfA{display:block;z-index:1;}";d+=".nfStage .nfRotatorH, .nfStage .nfRotatorV {background-color:transparent;}";d+=".nfStage .nfSlideshowH, .nfStage .nfSlideshowV {overflow:hidden;}";d+=".nfStage .nfSlideshowH>.nfSlideshowFrames, .nfStage .nfSlideshowV>.nfSlideshowFrames {height:100%;width:100%;background-color:transparent;}";d+=".nfStage .nfSlideshowH>.nfSlideshowFrames>.nfItem, .nfStage .nfSlideshowV>.nfSlideshowFrames>.nfItem {top:0px;left:0px;width:100%;height:100%;border:solid 1px #999;}";NF.u.css.addSheet(d);for(var e=NF.u.d.getNodesByClassName(document,"nfStage"),d=0;d<e.length;d++){var a=NF.u.object.convertAttributeToObject(e[d],"data-nfw");"stage"==a.type&&(new NF.stage(e[d],a)).create()}for(d in g.stages)if((e=g.stages[d].params.browsers)&&(e.css3&&NF.u.browser.noCSS3||e.css3D&&NF.u.browser.no3d)){e=g.stages[d].root.children;for(a=0;a<e.length;a++)e[a].style.display="nfDownLevelContent"==e[a].id?"block":"none"}else g.stages[d].params.autoRun&&g.playEvent(g.stages[d],"ready")});NF.u.e.addDomListener(window,"load",function(){for(var d in g.stages)g.stages[d].params.autoRun&&g.playEvent(g.stages[d],"load")});this.setElementActive=function(d,e){var a=g.activeElm;g.activeElm&&a.element!=e&&a.stage.setElementInactive(a.element);if(null!=d){if(!a||a.element!=e)d.setElementActive(e),g.activeElm={stage:d,element:e}}else g.activeElm=null};this.add=function(d){g.stages[d.root.nfUid]=d;g.curStage=d};this.playEvent=function(d,e,a,b,c){if(d=d.data.events[e])for(var g in d.timelines)if(!(a&&a!=g)){if(null!=c){var e=d.timelines[g],f=c;f>e.framePos.max&&(f=e.framePos.max);e.setTime(e.getTime(f))}d.timelines[g][b||"play"]()}};n.prototype=this;this.debug=new n};
_NF.prototype.stage = function(j, i) {
	function t(a) {
		if (a.loadCount == a.images.length)
			return a = a.nfUid, f.elements[a] && e(f.elements[a], "preloadelement", "play"), h.count++, h.count == h.elmCount && q.playEvent(f, "preloadall"), !0
	}

	function n(a) {
		u[a] || (u[a] = {
			nfUid : a,
			raw : "",
			images : [],
			loadCount : 0
		}, h.elmCount++);
		return u[a]
	}

	function g(a, b) {
		if ((f.BF || b) && a)
			a = a.replace(/\&\#10\;/g, "\n"), a = a.replace(/\&\#13\;/g, "\r");
		return a
	}

	function d(b) {
		if (!f.BF) {
			var d = NF.u.e.addDomListener;
			d(b, "mouseover", function(d) {
				for (var e = d.target || d.srcElement; e && !e.nfUid; )
					e = e.parentNode;
				e && e == b && (NF.u.d.aC(e, "nfHover"), clearTimeout(f.dly.over), f.dly.over = setTimeout(function() {
					var b = e;
					f.stopActionTimelines("mouseout", b, !0);
					NF.u.d.aC(b, "nfDelayHover");
					for (var d = b; d && d.nfUid; )
						NF.u.d.aC(d, "nfDelayHoverLineage"), d = d.parentNode;
					a("mouseover", b)
				}, c(e, "over")), q.hold && (q.hold[e.nfUid] && NF.u.d.hC(e, "nf_button")) && (k(e), a("mousehold", e)))
			});
			d(b, "mouseout", function(d) {
				for (var e = d.target || d.srcElement; e && !e.nfUid; )
					e = e.parentNode;
				for (var l = d.toElement || d.relatedTarget, d = l; l && !l.nfUid; )
					l = l.parentNode;
				l = l || d;
				if (e && l && e == b) {
					NF.u.d.rC(e, "nfHover");
					clearTimeout(f.dly.out);
					f.dly.init_a || (f.dly.init_a = e);
					f.dly.elms[e.nfUid] = e;
					var v, h;
					for (h in f.dly.elms) {
						v = c(f.dly.elms[h], "out");
						break
					}
					f.dly.out = setTimeout(function() {
						var b = l;
						f.stopActionTimelines("mouseover", b);
						for (var d in f.dly.elms) {
							var c = f.dly.elms[d];
							for (c != b && NF.u.d.rC(c, "nfDelayHover"); c && c.nfUid && c != b && !NF.u.d.isDescendant(c, b); )
								NF.u.d.rC(c, "nfDelayHoverLineage"), c = c.parentNode
						}
						a("mouseout", f.dly.init_a, null, b);
						f.dly.init_a = null;
						f.dly.elms = {}
					}, v);
					if (q.hold && q.hold[e.nfUid] && NF.u.d.hC(e, "nf_button")) {
						f.stopActionTimelines("mousehold", l);
						for ( v = l; e && e != f.root; )
							q.hold[e.nfUid] && (e != v && !NF.u.d.isDescendant(e, v)) && NF.u.d.rC(e, "nfHold"), e = e.parentNode
					}
				}
			});
			d(b, "mousedown", function(d) {
				for ( d = d.target || d.srcElement; d && !d.nfUid; )
					d = d.parentNode;
				d && d == b && (k(d), f.stopActionTimelines("mousedown", d), a("mousedown", d, !0, null, !0), a("mousehold", d), q.setElementActive(f, d))
			});
			d(b, "click", function(d) {
				for (var c = d.target || d.srcElement; c && !c.nfUid; )
					c = c.parentNode;
				if (c && c == b && (f.stopActionTimelines("click", c), a("click", c, !0, null, !0), ( d = c.nfLink) && !f.editorDesignMode)) {
					d.code && f.executeCode(d.code, c);
					var c = {_self:1,_parent:1}[d.where || "_self"], e = f.params.linksWhere;
					d.link && window.open(d.link, e && c ? e : d.where || "_self")
				}
			})
		}
	}

	function e(a, b, d, c) {
		"stop" == d && c.nfOptions["P" + b.replace("mouse", "")] && ( d = "pause");
		var e = a.nfTimelines;
		if (e && ( e = e[b]))
			return e.targElm = c || a, e[d](), !0
	}

	function a(a, d, c, e, l) {
		do
			if (!e || !("descendant" == NF.u.d.isRelation(e, d) || e == d)) {
				var p = d.nfTimelines;
				if (p && p[a] && (!l || !p[a].options.block || !p[a].isPlaying()))
					(!f.act[a][a][d.nfUid] || c) && b(p[a].parentObj.actType, d, d, c);
				for (var h = d; h != f.root && ( h = h.parentNode); ) {
					var p = h.nfTimelines, g;
					for (g in p) {
						var m = p[g].parentObj.actType;
						if (m.base == a && (m.isChildren || m.className) && (!f.act[m.base][g][d.nfUid] || c) && !(m.isChildren && d.parentNode != h))
							if (!m.className || NF.u.d.hC(d, m.className))
								(!l || !p[g].options.block || !p[g].isPlaying()) && b(m, h, d, c)
					}
				}
			}
		while(d!=f.root&&(d=d.parentNode))
	}

	function b(a, b, d, c) {
		c && e(b, a.uid, "stop", d);
		if ((c || !f.act[a.base][a.uid][d.nfUid]) && e(b, a.uid, "play", d))
			f.act[a.base][a.uid][d.nfUid] = {
				tElm : d,
				eElm : b
			}
	}

	function c(a, b) {
		do
			if (null != a.nfOptions[b])
				return a.nfOptions[b];
		while(a!=f.root&&(a=a.parentNode));
		return 0
	}

	function k(a) {
		for (q.hold = {}; a && a != f.root; )
			q.hold[a.nfUid] = a, NF.u.d.aC(a, "nfHold"), a = a.parentNode
	}

	var f = this;
	var _this = this;
	f.root = j;
	f.nfUid
	f.data
	f.styleDefs
	f.params = i;
	f.elements = {};
	f.seoElements = {};
	f.act = {};
	f.my = {};
	f.rules = {};
	f.sheet
	f.dly = {
		elms : {}
	};
	f.BF = i.bigFace;
	f.editorDesignMode
	var u = {}, h = {
		elmCount : 0,
		count : 0
	}, q = NF.stageManager, w = NF.stageDataManager;
	(function() {
		var a;
		if ( a = i.nfUid)
			NF.u.d.aC(j, a), j.nfUid = a, i.data = i.data || window[a].data;
		f.nfUid = j.nfUid;
		NF.u.d.aC(j, "nfSP1");
		NF.u.d.aC(j, "nfSP2");
		NF.u.d.aC(j, "nfSP3");
		q.add(f);
		a = document.createElement("style");
		document.getElementsByTagName("head")[0].appendChild(a);
		f.sheet = document.styleSheets[document.styleSheets.length - 1];
		f.data = new NF.stageData(f);
		f.styleDefs = w.getStyleDefs();
		f.seoElements[f.nfUid] = j;
		a = NF.u.d.getNodesByClassName(f.root, "nfA");
		for (var b = 0; b < a.length; b++) {
			var c = NF.u.object.convertAttributeToObject(a[b], "data-nfw");
			c.nfUid && (f.seoElements["NodeFire_" + c.nfUid] = a[b], a[b].nfAppended = !0)
		}
		a = NF.u.d.getNodesByClassName(f.root, "nfB");
		for ( b = 0; b < a.length; b++)
			a[b].parentNode.nfContentElm = a[b];
		d(f.root)
	})();
	this.applyCSS = function(a, b, d, c, e, p) {
		f.rules[p] ? f.rules[p].style[d] = e ? "" : c : e || (f.sheet.insertRule ? ( d = f.sheet.cssRules, d = 0 < d.length ? d.length - 1 : 0, f.sheet.insertRule(a + "{" + b + ":" + c + ";}", d), f.rules[p] = f.sheet.cssRules[d]) : (f.sheet.addRule(a, b + ":" + c + ";"), f.rules[p] = f.sheet.rules[sheet.rules.length - 1]))
	};
	this.getStyleDefNodeFromPointer = function(a, b) {
		for (var a = a.split(b), d = f.styleDefs[a[0]], c = 1; c < a.length; c++)
			d = d[a[c]];
		return d
	};
	this.create = function(a) {
		a = a || {};
		if (f.params.data) {
			var b = f.params.data, c = b.data.elmOrder;
			f.createElement(f.nfUid, b.data);
			for (var e in c)
			c[e].rule ? f.elements[e] = {
				rule : c[e].rule,
				sName : c[e].sName,
				id : c[e].id,
				nfUid : e,
				nfUColor : c[e].uColor
			} : f.createElement("NodeFire" + e, c[e]);
			for (e in c)
			if ( b = f.elements["NodeFire" + e]) {
				var l;
				if (!b.nfAppended && ( l = b.nfUidParent))
					f.elements[l].appendChild(b), NF.u.e.fire(f, "elementAdded", {
						element : b
					});
				d(b)
			} else
				delete f.elements["NodeFire" + e];
			l = f.params.data;
			for (var p in l)
			if ("data" != p) {
				b = l[p];
				c = f.data.addEvent({
					nfUid : p
				});
				e = c.actType.base;
				f.act[e] || (f.act[e] = {});
				f.act[e][p] = {};
				for (var h in b)
				if ("d" != h) {
					var s = b[h];
					e = c.addTimeline(f.elements["NodeFire" + h]);
					e.options = s.d.o || {};
					for (var m in s)
					if ("d" != m) {
						var B = s[m], y = e.addElement(f.elements[(l.data.elmOrder[m] && l.data.elmOrder[m].rule ? "" : "NodeFire") + m]), q;
						for (q in B) {
							var i = B[q];
							if ("d" != q) {
								var k = y.addStyle(f.getStyleDefNodeFromPointer(q, "_")), t = k.styleDefNode, w;
								for (w in i)
								if ("d" != w) {
									var j = i[w];
									"string" == typeof j.v && (j.v = g(j.v, !0));
									var u = j.p || {}, E = u.e ? {
										direction : u.e.d,
										type : u.e.t
									} : {
										direction : "linear",
										type : "_"
									}, C = "def" == w ? 0 : parseInt(w.substring(1)), F = e.getTime(C);
									k.addKey(j.v, {
										uid : w,
										unit : u.unit,
										framePos : C,
										seconds : F,
										ease : E
									}, w);
									t.data.isImage && j.v && ( u = n("NodeFire" + m), -1 == u.raw.indexOf(j.v) && (u.raw += j.v, u.images.push(j.v)))
								}
								if (k.hasKey(!0) || "ready" != p)
									k = k.styleDefNodeRoot.data.transElms, i = y.domElement.nfUid, (k[i]=k[i]||{})[p + "_NodeFire" + h] = y
							} else
								y.cust = i.cust
						}
					} else
						e.saveData = NF.u.object.clone(s[m])
				}
			}
			if (!f.BF && NF.u.browser.hasStyle("transition"))
				for (p in f.data.events)
				for (h in f.data.events[p].timelines)
				for (m in e = f.data.events[p].timelines[h], e.elements)
				for (q in l = e.elements[m], l.styles)
				if ( k = l.styles[q], k.hasKey(!0)) {
					b = 0;
					if (!k.styleDefNode.data.cssName)
						for (w in k.styleDefNodeRoot.data.transElms[l.domElement.nfUid])
						b++;
					2 > b && k.setTransStatus()
				}
			!f.BF && !a.noPreload && f.preloadImages();
			NF.u.e.fire(f, "stageCreated", {});
			return !0
		}
	};
	this.preloadImages = function() {
		h.count = 0;
		var a, b;
		for (b in u)
		if (!t(u[b])) {
			a = !0;
			for (var d = u[b].images, c = 0; c < d.length; c++) {
				var e = document.createElement("img");
				e.trackPreLoads = function() {
					this.nfImgData.loadCount++;
					t(this.nfImgData)
				};
				e.onload = e.trackPreLoads;
				e.onerror = e.trackPreLoads;
				e.onabort = e.trackPreLoads;
				e.nfImgData = u[b];
				e.src = d[c]
			}
		}
		a || q.playEvent(f, "preloadall")
	};
	this.createElement = function(a, b) {
		if (!f.elements[a]) {
			var d = f.elements["NodeFire" + b.pUid], c = f.seoElements[a];
			c || ( c = document.createElement("DIV"), NF.u.d.aC(c, a), NF.u.d.aC(c, "nfA"), c.id = b.id);
			if (!c.nfContentElm) {
				var e = g(b.con), h = document.createElement("DIV");
				NF.u.d.aC(h, "nfB");
				if (e) {
					var x;
					x = e ? document.createElement("DIV").innerHTML = e : "";
					h.innerHTML = x
				}
				NF.u.d.addChild("first-child", h, c);
				c.nfContent = e;
				c.nfContentElm = h
			}
			c.nfLink = {};
			if (b.link)
				for (var s in b.link)
				c.nfLink[s] = g(b.link[s], !0);
			c.nfOptions = b.opt ? b.opt : {};
			if (b.cn)
				for (s in c.nfClass = b.cn, b.cn)
				NF.u.d.aC(c, s);
			if (b.c) {
				b.c = b.c.NFisArray ? b.c : [b.c];
				for ( s = 0; s < b.c.length; s++)
					NF.u.d.aC(c, "nf" + q.classDefs["_" + b.c[s]])
			}
			b.nfElmType && (c.nfElmType = b.nfElmType);
			d != f.root && NF.u.d.aC(d, "nfParent");
			c.nfUid = a;
			c.nfUidParent = "NodeFire" + b.pUid;
			b.uColor && (c.nfUColor = b.uColor);
			f.elements[a] = c;
			a: {
				x = c.children;
				for ( e = 0; e < x.length; e++)
					if (NF.u.d.hC(x[e], "nfB")) {
						d = x[e].innerHTML.match(/url\(.*\)/ig) || [];
						for ( h = 0; h < d.length; h++)
							d[h] = d[h].replace(/url\(|\)/ig, "");
						e = x[e].getElementsByTagName("IMG");
						for ( h = 0; h < e.length; h++)
							d.push(e[h].src);
						if (0 < d.length) {
							c = n(c.nfUid);
							for ( e = 0; e < d.length; e++)
								c.images.push(d[e])
						}
						break a
					}
			}
		}
		return f.elements[a]
	};
	this.addElmEvents = d;
	this.executeCode = function(a) {
		if (!a || !f.BF || !a.match(/\.open\(/))
			try {
				eval(a)
			} catch(b) {
				q.debug.logError(b)
			}
	};
	this.stopActionTimelines = function(a, b, d) {
		for (var c in f.act[a]) {
			var l = f.act[a][c], h;
			for (h in l) {
				var g = l[h].tElm, s = l[h].eElm;
				if (b != g || d) {
					var m;
					if (!b || (!( m = NF.u.d.isRelation(b, g)) || "ancestor" == m) && !d || d && ("descendant" == m || b == g))
						e(s, c, "stop", g),
						delete l[h]
				}
			}
		}
	};
	this.setElementInactive = function(b) {
		a("inactive", b);
		for (NF.u.d.rC(b, "nfActive"); b && b.nfUid; )
			NF.u.d.rC(b, "nfActiveLineage"), b = b.parentNode
	};
	this.setElementActive = function(b) {
		f.stopActionTimelines("active", b);
		a("active", b);
		for (NF.u.d.aC(b, "nfActive"); b && b.nfUid; )
			NF.u.d.aC(b, "nfActiveLineage"), b = b.parentNode
	}
};
_NF.prototype.stageDataManager = new function(){function j(i,t,n,g,d,e){t?t.isRoot=!1:(t={isRoot:!0},n="");var e=e||0,a;for(a in i){var b=n+a,c;if(c=i[a].data){c.uid=b;c.order=e++;t.isRoot||(c.parentObj=i);if(c.cssName)if(t.isRoot&&(d=i[a]),g=i[a],c.jsName=c.jsName||a,c.transElms={},c.vendorSpecific){var k=c.vendorSpecific={},f=NF.u.css.getBrowserSpecifcStyleName(c.jsName);k.js=f.styleName;k.css=f.cssPrefix+c.cssName}else c.vendorSpecific={};t.isRoot||(c.parentObj=i);c.id=a;c.cssRootNode=g;c.cssTopNode=d;c.lastV={}}"data"!=a&&new j(i[a],NF.util.object.clone(t),b+"_",g,d,e)}}this.getStyleDefs=function(){var i={transition:{data:{cssName:"transition",vendorSpecific:1}},width:{data:{format:{type:"float",alt:{auto:1,inherit:1},unit:"px",units:["px","%"],dInc:1,sDec:0,range:{min:0}},cssName:"width",cssTrans:1,m:2}},height:{data:{format:{type:"float",alt:{auto:1,inherit:1},unit:"px",units:["px","%"],dInc:1,sDec:0,range:{min:0}},cssName:"height",cssTrans:1,m:2}},top:{data:{format:{type:"float",alt:{auto:1,inherit:1},unit:"px",units:["px","%"],dInc:1,sDec:0},cssName:"top",cssTrans:1,m:2}},left:{data:{format:{type:"float",alt:{auto:1,inherit:1},unit:"px",units:["px","%"],dInc:1,sDec:0},cssName:"left",cssTrans:1,m:2}},right:{data:{format:{type:"float",alt:{auto:1,inherit:1},unit:"px",units:["px","%"],dInc:1,sDec:0},cssName:"right",cssTrans:1,m:2}},bottom:{data:{format:{type:"float",alt:{auto:1,inherit:1},unit:"px",units:["px","%"],dInc:1,sDec:0},cssName:"bottom",cssTrans:1,m:2}},backgroundColor:{data:{format:{type:"color",defVal:"rgba(0,0,0,1)",left:"rgba(",right:")"},cssName:"background-color",header:!0,isColor:!0,cssTrans:1,m:[1,3]},Red:{data:{format:{type:"int",right:",",range:{min:0,max:255}}}},Green:{data:{format:{type:"int",right:",",range:{min:0,max:255}}}},Blue:{data:{format:{type:"int",right:",",range:{min:0,max:255}}}},Alpha:{data:{format:{type:"float",defVal:"1",range:{min:0,max:1}}}}},opacity:{data:{format:{type:"float",defVal:"1",range:{min:0,max:1}},cssName:"opacity",cssTrans:1,m:3}},backgroundImage:{data:{format:{type:"string",alt:{none:1,inherit:1},left:"url(",right:")",defVal:"http://"},noTween:!0,cssName:"background-image",isImage:!0,m:[0,3]}},backgroundSize:{data:{format:{type:"string",defVal:"auto",select:["auto","cover","contain"]},cssName:"border-size",cssName:"background-size",dualHeader:!0,m:3},Width:{data:{format:{type:"float",defVal:"auto",unit:"px",units:["px","%"],alt:{auto:1},right:" ",range:{min:0},dInc:1,sDec:0}}},Height:{data:{format:{type:"float",defVal:"auto",unit:"px",units:["px","%"],alt:{auto:1},range:{min:0},dInc:1,sDec:0}}}},backgroundRepeat:{data:{format:{type:"string",defVal:"repeat",select:["repeat","repeat-x","repeat-y","no-repeat","inherit"]},noTween:!0,cssName:"background-repeat",m:3}},backgroundPosition:{data:{format:{},cssName:"background-position",header:!0,m:3},X:{data:{format:{type:"float",alt:{center:1,left:1,right:1},unit:"px",units:["px","%"],dInc:1,sDec:0,right:" "}}},Y:{data:{format:{type:"float",alt:{center:1,top:1,bottom:1},unit:"px",units:["px","%"],dInc:1,sDec:0}}}},background:{data:{format:{type:"gradient"},cssName:"background",header:!0,m:3},angle:{data:{format:{right:", "}}},stopN:{data:{multiQty:!0,format:{},header:!0},color:{data:{format:{type:"color",defVal:"rgba(0,0,0,1)",left:"rgba(",right:")"},header:!0,isColor:!0},Red:{data:{format:{type:"int",right:","}}},Green:{data:{format:{type:"int",right:","}}},Blue:{data:{format:{type:"int",right:","}}},Alpha:{data:{format:{type:"float",defVal:"1"}}}},location:{data:{format:{type:"int",unit:"%"}}}}},transformOrigin:{data:{format:{},cssName:"transform-origin",vendorSpecific:!0,header:!0,m:4},X:{data:{format:{type:"int",unit:"px",units:["px","%"],right:" "}}},Y:{data:{format:{type:"int",unit:"px",units:["px","%"]}}}},transform:{data:{format:{type:"function"},voidDefs:1,cssName:"transform",cssName:"transform",vendorSpecific:!0,header:!0,isTransform:!0,cssTrans:1,m:4},scaleX:{data:{format:{type:"float",left:"scaleX(",right:")",range:{min:0}}}},scaleY:{data:{format:{type:"float",left:"scaleY(",right:")",range:{min:0}}}},scaleZ:{data:{format:{type:"float",defVal:"1",left:"scaleZ(",right:")",range:{min:0}},is3d:1}},rotate:{data:{format:{type:"float",unit:"deg",dInc:1,sDec:0,left:"rotate(",right:")"}}},rotateX:{data:{format:{type:"float",unit:"deg",dInc:1,sDec:0,left:"rotateX(",right:")"},is3d:1}},rotateY:{data:{format:{type:"float",unit:"deg",dInc:1,sDec:0,left:"rotateY(",right:")"},is3d:1}},rotateZ:{data:{format:{type:"float",unit:"deg",dInc:1,sDec:0,left:"rotateZ(",right:")"},is3d:1}},skewX:{data:{format:{type:"float",unit:"deg",dInc:1,sDec:0,left:"skewX(",right:")"}}},skewY:{data:{format:{type:"float",unit:"deg",dInc:1,sDec:0,left:"skewY(",right:")"}}},translateX:{data:{format:{type:"int",unit:"px",units:["px","%"],left:"translateX(",right:")"}}},translateY:{data:{format:{type:"int",unit:"px",units:["px","%"],left:"translateY(",right:")"}}},translateZ:{data:{format:{type:"int",unit:"px",units:["px","%"],left:"translateZ(",right:")"},is3d:1}}},transformStyle:{data:{format:{type:"string",defVal:"flat",select:["flat","preserve-3d"]},cssName:"transform-style",noTween:!0,vendorSpecific:!0,m:4}},perspective:{data:{format:{type:"int",unit:"px",units:["px","%"]},cssName:"perspective",vendorSpecific:!0,m:4}},borderWidth:{data:{format:{type:"int",unit:"px",range:{min:0}},cssName:"border-width",cssTrans:1,m:5},Top:{data:{format:{type:"int",unit:"px",range:{min:0}},cssName:"border-top-width",jsName:"borderTopWidth",cssTrans:1}},Right:{data:{format:{type:"int",unit:"px",range:{min:0}},cssName:"border-right-width",jsName:"borderRightWidth",cssTrans:1}},Bottom:{data:{format:{type:"int",unit:"px",range:{min:0}},cssName:"border-bottom-width",jsName:"borderBottomWidth",cssTrans:1}},Left:{data:{format:{type:"int",unit:"px",range:{min:0}},cssName:"border-left-width",jsName:"borderLeftWidth",cssTrans:1}}},borderColor:{data:{format:{type:"color",defVal:"rgba(0,0,0,1)",left:"rgba(",right:")"},cssName:"border-color",header:!0,isColor:!0,cssTrans:1,m:[1,5]},Red:{data:{format:{type:"int",right:",",range:{min:0,max:255}}}},Green:{data:{format:{type:"int",right:",",range:{min:0,max:255}}}},Blue:{data:{format:{type:"int",right:",",range:{min:0,max:255}}}},Alpha:{data:{format:{type:"float",defVal:"1",range:{min:0,max:1}}}}},borderStyle:{data:{format:{type:"string",defVal:"solid",select:"none solid dashed dotted double groove ridge inset outset inherit".split(" ")},noTween:!0,cssName:"border-style",m:5}},borderRadius:{data:{format:{type:"int",unit:"px",units:["px","%"],range:{min:0}},cssName:"border-radius",cssTrans:1,m:6},TopLeft:{data:{format:{type:"int",unit:"px",units:["px","%"],range:{min:0}},cssName:"border-top-left-radius",jsName:"borderTopLeftRadius",dualHeader:!0,cssTrans:1},Radius:{data:{format:{type:"int",unit:"px",units:["px","%"],range:{min:0},right:" "}}},Axis:{data:{format:{type:"int",unit:"px",units:["px","%"],range:{min:0}}}}},TopRight:{data:{format:{type:"int",unit:"px",units:["px","%"],range:{min:0}},cssName:"border-top-right-radius",jsName:"borderTopRightRadius",dualHeader:!0,cssTrans:1},Radius:{data:{format:{type:"int",unit:"px",units:["px","%"],range:{min:0},right:" "}}},Axis:{data:{format:{type:"int",unit:"px",units:["px","%"],range:{min:0}}}}},BottomRight:{data:{format:{type:"int",unit:"px",units:["px","%"],range:{min:0}},cssName:"border-bottom-right-radius",jsName:"borderBottomRightRadius",dualHeader:!0,cssTrans:1},Radius:{data:{format:{type:"int",unit:"px",units:["px","%"],range:{min:0},right:" "}}},Axis:{data:{format:{type:"int",unit:"px",units:["px","%"],range:{min:0}}}}},BottomLeft:{data:{format:{type:"int",unit:"px",units:["px","%"],range:{min:0}},cssName:"border-bottom-left-radius",jsName:"borderBottomLeftRadius",dualHeader:!0,cssTrans:1},Radius:{data:{format:{type:"int",unit:"px",units:["px","%"],range:{min:0},right:" "}}},Axis:{data:{format:{type:"int",unit:"px",units:["px","%"],range:{min:0}}}}}},boxShadow:{data:{format:{type:"shadow",defVal:"5px 5px 0px 0px rgba(0,0,0,1)"},cssName:"box-shadow",header:!0,cssTrans:1,m:7},X:{data:{format:{type:"int",unit:"px",right:" "}}},Y:{data:{format:{type:"int",unit:"px",right:" "}}},Blur:{data:{format:{type:"int",unit:"px",right:" "}}},Spread:{data:{format:{type:"int",unit:"px",right:" "}}},Color:{data:{format:{type:"color",defVal:"rgba(0,0,0,1)",left:"rgba(",right:")"},header:!0,isColor:!0},Red:{data:{format:{type:"int",right:",",range:{min:0,max:255}}}},Green:{data:{format:{type:"int",right:",",range:{min:0,max:255}}}},Blue:{data:{format:{type:"int",right:",",range:{min:0,max:255}}}},Alpha:{data:{format:{type:"float",defVal:"1",range:{min:0,max:1}}}}}},clip:{data:{format:{type:"clip",left:"rect(",right:")"},cssName:"clip",header:!0,cssTrans:1,m:10},Top:{data:{format:{type:"int",unit:"px",right:",",range:{min:0}}}},Right:{data:{format:{type:"int",unit:"px",right:",",range:{min:0}}}},Bottom:{data:{format:{type:"int",unit:"px",right:",",range:{min:0}}}},Left:{data:{format:{type:"int",unit:"px",range:{min:0}}}}},padding:{data:{format:{type:"int",unit:"px",units:["px","%"],range:{min:0}},cssName:"padding",m:8},Top:{data:{format:{type:"int",unit:"px",units:["px","%"],range:{min:0}},cssName:"padding-top",jsName:"paddingTop"}},Right:{data:{format:{type:"int",unit:"px",units:["px","%"],range:{min:0}},cssName:"padding-right",jsName:"paddingRight"}},Bottom:{data:{format:{type:"int",unit:"px",units:["px","%"],range:{min:0}},cssName:"padding-bottom",jsName:"paddingBottom"}},Left:{data:{format:{type:"int",unit:"px",units:["px","%"],range:{min:0}},cssName:"padding-left",jsName:"paddingLeft"}}},margin:{data:{format:{type:"float",alt:{auto:1,inherit:1},unit:"px",units:["px","%"],dInc:1,sDec:0},cssName:"margin",m:8},Top:{data:{format:{type:"float",alt:{auto:1,inherit:1},unit:"px",units:["px","%"],dInc:1,sDec:0},cssName:"margin-top",jsName:"marginTop"}},Right:{data:{format:{type:"float",alt:{auto:1,inherit:1},unit:"px",units:["px","%"],dInc:1,sDec:0},cssName:"margin-right",jsName:"marginRight"}},Bottom:{data:{format:{type:"float",alt:{auto:1,inherit:1},unit:"px",units:["px","%"],dInc:1,sDec:0},cssName:"margin-bottom",jsName:"marginBottom"}},Left:{data:{format:{type:"float",alt:{auto:1,inherit:1},unit:"px",units:["px","%"],dInc:1,sDec:0},cssName:"margin-left",jsName:"marginLeft"}}},fontSize:{data:{format:{type:"float",alt:{inherit:1},unit:"px",units:["px","%","em"],range:{min:0},dInc:1,sDec:0},cssName:"font-size",cssTrans:1,m:9}},lineHeight:{data:{format:{type:"float",alt:{normal:1,inherit:1},unit:"px",units:["px","%","em"],range:{min:0},dInc:1,sDec:0},cssName:"line-height",m:9}},color:{data:{format:{type:"color",defVal:"rgba(0,0,0,1)",left:"rgba(",right:")"},cssName:"color",header:!0,isColor:!0,cssTrans:1,m:[1,9]},Red:{data:{format:{type:"int",right:",",range:{min:0,max:255}}}},Green:{data:{format:{type:"int",right:",",range:{min:0,max:255}}}},Blue:{data:{format:{type:"int",right:",",range:{min:0,max:255}}}},Alpha:{data:{format:{type:"float",defVal:"1",range:{min:0,max:1}}}}},fontFamily:{data:{format:{type:"string",defVal:"Arial",select:"Georgia, serif;Arial, Helvetica, sans-serif;Arial;Helvetica;sans-serif;Verdana;Courier New;Courier;Times New Roman;Georgia;serif;Tahoma;Impact;Cursive".split(";")},cssName:"font-family",noTween:!0,m:9}},fontStyle:{data:{format:{type:"string",defVal:"normal",select:["normal","italic","oblique","inherit"]},cssName:"font-style",noTween:!0,m:9}},fontWeight:{data:{format:{type:"string",defVal:"normal",select:["normal","bold","bolder","lighter","inherit"]},cssName:"font-weight",noTween:!0,m:9}},textDecoration:{data:{format:{type:"string",defVal:"none",select:"none underline overline line-through blink inherit".split(" ")},cssName:"text-decoration",noTween:!0,m:9}},fontVariant:{data:{format:{type:"string",defVal:"normal",select:["normal","small-caps","inherit"]},cssName:"font-variant",noTween:!0,m:9}},textAlign:{data:{format:{type:"string",defVal:"left",select:["left","center","right","justify","inherit"]},cssName:"text-align",noTween:!0,m:9}},direction:{data:{format:{type:"string",defVal:"ltr",select:["ltr","rtl","inherit"]},cssName:"direction",noTween:!0,m:9}},overflow:{data:{format:{type:"string",defVal:"visible",select:["visible","hidden","scroll","auto","inherit"]},cssName:"overflow",noTween:!0,m:11}},position:{data:{format:{type:"string",defVal:"absolute",select:["absolute","relative","fixed","static","inherit"]},cssName:"position",noTween:!0,m:11}},zIndex:{data:{format:{type:"int",defVal:"0"},cssName:"z-index",m:11}},visibility:{data:{format:{type:"string",defVal:"inherit",select:["visible","hidden","inherit"]},cssName:"visibility",noTween:!0,m:11}},display:{data:{format:{type:"string",defVal:"block",select:["none","block","inherit"]},cssName:"display",noTween:!0,m:11}},cssFloat:{data:{format:{type:"string",defVal:"none",select:["none","left","right","inherit"]},cssName:"float",noTween:!0,m:11}},clear:{data:{format:{type:"string",defVal:"none",select:["none","both","left","right","inherit"]},cssName:"clear",noTween:!0,m:11}},cursor:{data:{format:{type:"string",defVal:"default",select:"auto default pointer progress help text move wait inherit".split(" ")},cssName:"cursor",noTween:!0,m:11}},userSelect:{data:{format:{type:"string",defVal:"default",select:["none","text","all","element"]},cssName:"user-select",vendorSpecific:!0,noTween:!0,m:11}},whiteSpace:{data:{format:{type:"string",defVal:"normal",select:["normal","nowrap","pre","pre-line","interit"]},cssName:"white-space",noTween:!0,m:11}},pointerEvents:{data:{format:{type:"string",defVal:"auto",select:"auto none visiblePainted visibleFill visibleStroke visible painted fill stroke all inherit".split(" ")},cssName:"pointer-events",noTween:!0,m:11}},onKey:{data:{format:{type:"string"},cssName:"eval",noTween:!0,isCode:!0,onKey:!0,SK:1}},onFrames:{data:{format:{type:"string"},cssName:"call",noTween:!0,isCode:!0,onFrames:!0}},innerHTML:{data:{format:{type:"string"},isAfter:1,cssName:"content",noTween:!0,isContent:!0,SK:1}}};j(i);return i};this.getDefaultStyleValue=function(i){var j=i.data.format.defVal,i=i.data.format.type;return null!=j?j:"int"==i||"float"==i?0:""}};
_NF.prototype.stageData = function(j) {
	var i = this;
	i.stage = j;
	i.events = {};
	i.addEvent = function(j) {
		var n = j.nfUid;
		if (!i.events[n]) {
			var g;
			(i.events[n] = new i.event(i, j)).actType = {
				className : 0 < ( g = n.search("_nfClass_")) ? "." + n.substring(g + 9) : !1,
				isChildren : n.match("_children"),
				base : 0 < ( g = n.search("_")) ? n.substring(0, g) : n,
				uid : n
			}
		}
		return i.events[n]
	};
	i.event = function(i, j) {
		var g = this;
		g.params = j || {};
		g.parentObj = i;
		g.timelines = {};
		g.addTimeline = function(d) {
			g.timelines[d.nfUid] || (g.timelines[d.nfUid] = new g.timeline(g, d), d.nfTimelines || (d.nfTimelines = {}), d.nfTimelines[g.params.nfUid] = g.timelines[d.nfUid]);
			return g.timelines[d.nfUid]
		};
		g.timeline = function(d, e) {
			function a() {
				f && (f(i), i = null);
				clearTimeout(c);
				c = null;
				b.startTime = null
			}

			var b = this;
			b.parentObj = d;
			b.eventElement = e;
			b.elements = {};
			b.framePos = {
				cur : 0,
				seconds : 0,
				fps : 60,
				max : 0
			};
			b.options = {};
			b.startTime
			var c, g = window.requestAnimationFrame, f = window.cancelAnimationFrame, i;
			b.play = function(d) {
				if (!d) {
					if (b.isPlaying())
						return;
					b.startTime = null;
					b.framePos.max = 0;
					for (var e in b.elements)
					for (var f in b.elements[e].styles) {
						var z, v;
						for (v in z = b.elements[e].styles[f].keys)z[v].frame > b.framePos.max && (b.framePos.max = z[v].frame)
					}
					b.framePos.cur >= b.framePos.max && (b.framePos.cur = 0);
					NF.u.e.fire(b, "playStart", {})
				}
				var A;
				b.startTime || (b.setStartTime(), A = {
					init : 1,
					isPlay : !d
				});
				d = b.setTime((Date.now() - b.startTime) / 1E3, A, b.framePos.max);
				NF.u.e.fire(b, "playFrame", {
					timeline : b,
					seconds : b.framePos.seconds
				});
				if (d >= b.framePos.max)
					if (b.options.loop)
						b.startTime = null, b.framePos.cur = 0;
					else {
						a();
						NF.u.e.fire(b, "playEnd", {});
						return
					}
				g ? i = g(b.play, b.parentObj.parentObj.stage.root) : c = window.setTimeout(function() {
					b.play(!0)
				}, 1E3 / b.framePos.fps)
			};
			this.setStartTime = function() {
				b.startTime = Date.now() - 1E3 * b.getTime(b.framePos.cur)
			};
			b.pause = function() {
				a()
			};
			b.stop = function() {
				a();
				b.framePos.cur && b.setTime(0, {
					reset : 1
				})
			};
			b.reset = function() {
				b.framePos = {
					cur : 0,
					seconds : 0,
					fps : 60,
					max : 0
				};
				b.setFramePos(0)
			};
			b.isPlaying = function() {
				if (c || i)
					return !0
			};
			b.addElement = function(a) {
				if (!b.elements[a.nfUid]) {
					b.elements[a.nfUid] = new b.element(b, a);
					var d;
					try {
						d = a instanceof HTMLElement
					} catch(c) {
						d = 1 == a.nodeType
					}
					d ? b.elements[a.nfUid].isDomElement = !0 : b.elements[a.nfUid].setRule(a.rule)
				}
				return b.elements[a.nfUid]
			};
			b.setTime = function(a, d, c) {
				b.framePos.seconds = a;
				a = b.getFrame(a);
				null != c && a >= c && (b.framePos.seconds = b.getTime(c), a = c);
				b.setFramePos(a, d);
				return a
			};
			b.getFrame = function(a) {
				return Math.round(b.framePos.fps * a)
			};
			b.getTime = function(a) {
				return a / b.framePos.fps
			};
			b.setFramePos = function(a, d) {
				if (a != b.framePos.cur || d) {
					b.framePos.cur = a;
					var c = b.moveElements(d);
					NF.u.e.fire(b, "frameChange", {
						timeline : b,
						framePosition : a,
						changed : c
					})
				}
			};
			b.moveElements = function(a) {
				var d, c;
				for (c in b.elements) {
					var e = b.moveElement(b.elements[c], null, a);
					e && ( d = d || {}, d[c] = e)
				}
				return d
			};
			b.moveElement = function(a, d, c) {
				if ( d = b.getElementStyleChanges(a, d, c)) {
					a.applyTransition();
					for (var e in d.topChanged)
					a.apply(d.topChanged[e].styleDefNode);
					NF.u.e.fire(b, "elementChanged", {
						elm : a
					})
				}
				return d
			};
			b.getElementStyleChanges = function(a, b, d) {
				var c, e = {}, a = a.styles, f;
				for (f in a)
				if (!(b && a[f].styleDefNodeTop != b.data.cssTopNode)) {
					var g = a[f].applyPos(d);
					if (g) {
						c = c || {};
						var l = g.styleDefNodeTop.data.uid;
						c[l] = a[l];
						e[f] = g;
						e[l] = a[l]
					}
				}
				if (c)
					return {
						topChanged : c,
						allChanged : e
					}
			};
			b.element = function(a, b) {
				function d(a, b) {
					c.styles[a.data.uid] || (c.styles[a.data.uid] = new c.style(c, a));
					for (var e in a)"data" != e && new d(a[e], b, !0)
				}

				var c = this;
				var _this = this;
				c.parentObj = a;
				c.timeline = a;
				c.event = a.parentObj;
				c.stage = c.event.parentObj.stage;
				c.domElement = b;
				c.isDomElement
				c.styles = {};
				c.rule
				c.ruleR
				b.nfTrans || (b.nfTrans = {}, b.nfTransV = "");
				c.addStyle = function(a) {
					var b = a.data.uid;
					c.styles[b] || d(a.data.cssTopNode, a);
					return c.styles[b]
				};
				c.setRule = function(a) {
					c.rule = a;
					c.domElement.nfUid.match("CR_") && ( a = "[stageName] " + a);
					a = a.replace("[stageID]", "." + c.stage.root.nfUid);
					a = a.replace("[stageName]", "#" + c.stage.root.id);
					c.ruleR = a
				};
				c.executeCode = function(a) {
					if (!c.stage.BF)
						try {
							eval(a)
						} catch(b) {
							NF.stageManager.debug.logError(b)
						}
				};
				c.applyTransition = function() {
					var a = c.domElement, b = a.nfTrans, d = "", e;
					for (e in b)var f = c.timeline.getTime(b[e].endFrame + 1) - (Date.now() - c.timeline.startTime) / 1E3, d = d + (( d ? "," : "") + b[e].cssName + " " + f + "s " + b[e].ease);
					d != a.nfTransV && ( b = c.stage.styleDefs.transition.data, e = b.vendorSpecific.js || b.jsName, c.rule ? c.stage.applyCSS(c.rule, b.vendorSpecific.css || b.cssName, e, d, null, c.domElement.nfUid) : a.style[e] = d, a.nfTransV = d)
				};
				c.apply = function(a, b, d) {
					var e = c.buildValue(a);
					if (null != e) {
						var f, g = c.styles[a.data.uid];
						g.removeValue && (b && d && ( f = !0), g.removeValue = !1, e = "");
						a.data.header && (g.value = !e ? null : e);
						if (a.data.isCode)
							a.data.onFrames && c.executeCode(e);
						else if (!f)
							try {
								var s = g.styleDefNodeRoot.data, m = s.vendorSpecific.js || s.jsName;
								if (c.isDomElement)
									c.domElement.style[m] = e;
								else {
									var h = c.ruleR, b = e, i = c.domElement.nfUid;
									if (s.isAfter)
										var j = e.match(/url\(|counter/i) ? "" : '"', h = h + (h.match(/\:before|\:after/i) ? "" : ">.nfB:after"), b = j + e.replace(/\"/g, '"') + j, i = i + "_after", m = "content";
									c.stage.applyCSS(h, s.vendorSpecific.css || s.cssName, m, b, null, i)
								}
							} catch(k) {
							}
						f || NF.u.e.fire(c, "applyStyle", {
							domElement : c.domElement,
							style : g,
							element : c.domElement
						})
					}
					for (var n in a)"data" != n && a[n].data.cssName && new c.apply(a[n], !0, e)
				};
				this.buildValue = function(a, b, d) {
					b || ( b = {});
					var e = a.data.format.left || "", f = c.styles[a.data.uid], g = !1, h = NF.u.browser.ie8Down;
					if (NF.u.browser.no3d && a.data.is3d || h && "Alpha" == a.data.id)
						e = "", g = 1;
					else {
						if (a.data.isColor && "transparent" == f.value)
							return "transparent";
						h && a.data.isColor && ( e = "rgb(", a.Blue.data.format.right = "");
						var m;
						a: {
							if (a.data.dualHeader)
								for (m in a)
								if ("data" != m && ( h = c.styles[a[m].data.uid], null != h.value && !h.removeValue)) {
									m = !0;
									break a
								}
							m =
							void 0
						}
						if (!a.data.header && !m) {
							var i, h = f.value;
							if (null != h && !f.removeValue)
								e += h, b.hit = !0;
							else {
								f.removeValue && (b.removeHit = !0);
								d && (f.removeValue = !1);
								var y;
								if (null != ( y = a.data.lastV[c.domElement.nfUid]) && null != y.v)
									i = y.u, b.hit = !0, f.removeValue = !1, e += y.v;
								else {
									var j;
									if (( j = a.data.parentObj) && j.data.voidDefs && null == a.data.format.defVal)
										return "";
									e += h = NF.stageDataManager.getDefaultStyleValue(a)
								}
							}
							if (!a.data.format.alt || !a.data.format.alt[h])
								e += i || f.unit || a.data.format.unit || ""
						}
						if (!a.data.dualHeader || m)
							for (var k in a)"data" != k && !a[k].data.cssName && (e += c.buildValue(a[k], b, !0))
					}
					if (d || b.hit || b.removeHit)
						return !d && b.removeHit && !b.hit ? "" : e + ( g ? "" : a.data.format.right || "")
				};
				c.style = function(a, b) {
					function d(a, b, e, f, g) {
						var h = {};
						0 == e && f && ( h = f);
						try {
							return a.v(c.parentObj.stage.my, b, c, {
								isTween : !(c.keys["_" + e] && !h.reset),
								isReset : h.reset,
								isInit : g && !h.reset || h.init
							})
						} catch(i) {
							return null
						}
					}

					var c = this;
					c.parentObj = a;
					c.styleDefNode = b;
					c.styleDefNodeRoot = b.data.cssRootNode;
					c.styleDefNodeTop = b.data.cssTopNode;
					c.keys = {};
					c.framePos = c.parentObj.parentObj.framePos;
					c.value
					c.unit
					c.vFuncStr
					c.removeValue
					c.addKey = function(a, b, d) {
						b = b || {};
						c.keys[d] || (c.keys[d] = new c.key(c, b));
						c.keys[d].setValue(a, b.unit, b.applyPrevValue);
						return c.keys[d]
					};
					c.setTransStatus = function() {
						for (var a in c.keys)
						if ("def" != a) {
							var b = {};
							if (c.styleDefNodeTop.data.cssTrans) {
								var d;
								if ( d = c.getNextKey(c.keys[a].frame)) {
									var e = c.keys[a].params.ease;
									if (!e || NF.u.a.ease["css_"+e.direction][e.type])
										if (c.styleDefNode.data.cssName)
											c.setKeyTrans(c.keys[a]), c.setKeyTrans(d);
										else
											for (var f in c.styleDefNodeTop)
											if ( e = c.styleDefNodeTop[f], "data" != f)
												if (e != c.styleDefNode) {
													var g;
													if (( g = c.parentObj.styles[e.data.uid]) && g.hasKey()) {
														var h = g.keys[c.keys[a].params.uid], i = g.keys["_" + d.frame];
														if (h || g.getNextKey(c.keys[a].frame))
															if (h && i)
																b[e.data.uid + "_s"] = h, b[e.data.uid + "_e"] = i;
															else {
																b = {};
																break
															}
													}
												} else
													b[c.styleDefNode.data.uid + "_s"] = c.keys[a], b[c.styleDefNode.data.uid + "_e"] = d
								}
							}
							for (a in b)
							c.setKeyTrans(b[a])
						}
					};
					c.setKeyTrans = function(a) {
						!a.vFunc && null != a.value && (a.isTrans = !0)
					};
					c.hasPreviousKey = function(a) {
						for (var b in c.keys)
						if ("def" != b && c.keys[b].frame <= a)
							return c.keys[b]
					};
					c.getNextKey = function(a) {
						var b, d, e;
						for (e in c.keys)
						if (c.keys[e].frame > a && (null == d || c.keys[e].frame < d))
							d = c.keys[e].frame, b = c.keys[e];
						return b
					};
					c.hasKey = function(a) {
						for (var b in c.keys)
						if (!(a && "def" == b))
							return !0
					};
					c.applyPos = function(a) {
						if (c.hasKey()) {
							var b = c.styleDefNode.data, e = c.parentObj.domElement.nfUid, f = c.framePos.cur, g = {}, h = {}, i;
							for (i in c.keys)c.keys[i].frame <= f && !(g && g.diff < f - c.keys[i].frame) && ( g = {
								id : i,
								key : c.keys[i],
								diff : f - c.keys[i].frame
							}), c.keys[i].frame >= f && !(h && h.diff < c.keys[i].frame - f) && ( h = {
								id : i,
								key : c.keys[i],
								diff : c.keys[i].frame - f
							});
							if (!g.key || g.key.isDef && null == g.key.value && h.key && h.key != g.key)
								i = b.lastV[e], g.key = {
									value : null != i ? i.v : null,
									unit : null != i ? i.u : null,
									params : {},
									isDef : !0,
									sim : 1
								};
							if (!g.key.isDef || a && a.isPlay || g.key.value != c.value || c.parentObj.stage.BF) {
								if (g.key.isDef || !h.key)
									h = g;
								i = g.key.vFunc ? d(g.key.vFunc, g.key, f, a, c.lKey != g.key) : g.key.value;
								var j = h.key.vFunc ? d(h.key.vFunc, h.key, null, a) : h.key.value, k = c.styleDefNodeRoot.data, n = c.parentObj.domElement;
								if (g.key.isTrans && h.key.isTrans && g.key != h.key && (!a || !a.reset)) {
									i = j;
									var q = g.key.params.ease, q = "cubic-bezier(" + (( q ? NF.u.a.ease["css_"+q.direction][q.type] : "0.250, 0.250, 0.750, 0.750") || "0.250, 0.250, 0.750, 0.750") + ")";
									n.nfTrans[k.uid] || (n.nfTrans[k.uid] = {
										endFrame : h.key.frame,
										ease : q,
										cssName : k.vendorSpecific.css || k.cssName
									})
								} else
									delete n.nfTrans[k.uid];
								f = b.noTween ? i : NF.u.a.tween({
									startValue : i,
									endValue : j,
									frameDistance : h.key.frame - g.key.frame,
									startFrame : g.key.frame,
									framePos : f,
									ease : g.key.params.ease || {
										direction : "linear",
										type : "_"
									}
								});
								null != f && "int" == b.format.type && ( f = Math.round(f));
								if (b.SK && !g.key.sim && c.lKey != g.key && !(null == c.lKey && h == g))
									if (b.onKey)
										c.parentObj.executeCode(i);
									else if (b.isContent && ( j = c.parentObj.domElement, c.parentObj.isDomElement && ( j = j.nfContentElm)))
										j.innerHTML = i || "";
								c.lKey = h.key == g.key ? null : g.key;
								if (c.value != f || c.unit != g.key.unit || g.key.vFunc || c.vFuncStr && g.key.vFunc != c.vFuncStr || a || c.parentObj.stage.BF && c.hasKey(!0))
									return c.vFuncStr = g.key.vFunc ? g.key.value : null, c.unit = g.key.unit, c.removeValue = null == f && null != c.value && !b.header ? !0 : !1, b.lastV[e] = {
										v : f,
										u : c.unit,
										c : c.vFuncStr
									}, c.value = f, c
							}
						}
					};
					c.key = function(a, b) {
						var c = this;
						c.params = b;
						c.parentObj = a;
						c.frame = b.framePos;
						c.seconds = b.seconds;
						c.value
						c.prevValue
						c.unit
						c.prevUnit
						c.isDef = "def" == b.uid ? !0 : null;
						c.vFunc
						c.my = {};
						this.setValue = function(a, b, d) {
							d && (c.prevValue = c.value, c.prevUnit = c.unit);
							c.vFunc = (a + "").match("v:function") ? eval("({" + a + "})") : null;
							c.value = a;
							c.unit = b
						}
					}
				}
			}
		}
	}
};

NodeFire_1951907382 = {
	nfUid : 'NodeFire_1951907382',
	data : {
		data : {
			elmId : "Linhas",
			elmOrder : {
				_0764239314 : {
					id : "Botao_Voltar",
					pUid : "_1951907382",
					c : 1,
					link : {
						link : "vitrinismo.html"
					},
					cn : {
						nf_button : 1,
						red_button : 1,
						red_button_hoverMenu : 1,
						red_button_clickMenu : 1,
						red_button_class_name : 1
					},
					con : "<h3>Voltar</h3>"
				},
				_0767707637 : {
					id : "Titulo",
					pUid : "_1951907382",
					c : 1,
					con : "<h1>Vida Ativa 2013</h1><h3>Work in Progress</h3>"
				},
				_0792066054 : {
					id : "Linha_Horizontal_1",
					pUid : "_1951907382",
					c : 1
				},
				_0792551309 : {
					id : "Curva_1",
					pUid : "_1951907382",
					c : 1
				},
				_0793005751 : {
					id : "Linha_Vertical_1",
					pUid : "_1951907382",
					c : 1
				},
				_0793788573 : {
					id : "Curva_2",
					pUid : "_1951907382",
					c : 1
				},
				_0794227652 : {
					id : "Linha_Horizontal_2",
					pUid : "_1951907382",
					c : 1
				},
				_1384131310 : {
					id : "Menu_de_rodape",
					pUid : "_1951907382",
					c : 1,
					cn : {
						nf_hoverMenu : 1,
						nf_menu : 1,
						nf_button : 1,
						my_class_ : 1,
						my_class_menuRodape : 1
					}
				},
				_1384131375 : {
					id : "Conferencia_Rodape",
					pUid : "_1384131310",
					c : 1,
					link : {
						link : "../conferencia/conferencia.html"
					},
					con : "Conferência"
				},
				_1384131445 : {
					id : "WorkInProgress_Rodape",
					pUid : "_1384131310",
					c : 1,
					link : {
						link : "workInProgress.html"
					},
					con : "Work in Progress"
				},
				_1384131491 : {
					id : "Menu_up",
					pUid : "_1384131310",
					c : 1,
					cn : {
						nf_button : 1,
						my_class_menuRodapeUp : 1
					}
				},
				_1384131535 : {
					id : "ListaDeLinksConferencia",
					pUid : "_1384131491",
					c : 4
				},
				_1384131604 : {
					id : "Sobre",
					pUid : "_1384131535",
					c : 9,
					link : {
						link : "../conferencia/sobre.html"
					},
					cn : {
						nf_button : 1,
						nf_hoverMenu : 1,
						nf_menu : 1
					},
					con : "Sobre"
				},
				_1384131677 : {
					id : "Inscricoes",
					pUid : "_1384131535",
					c : 9,
					link : {
						link : "../conferencia/inscricao.html"
					},
					cn : {
						nf_button : 1,
						nf_hoverMenu : 1,
						nf_menu : 1
					},
					con : "Inscrições"
				},
				_1384131724 : {
					id : "Horario",
					pUid : "_1384131535",
					c : 9,
					link : {
						link : "../conferencia/horario.html"
					},
					cn : {
						nf_button : 1,
						nf_hoverMenu : 1,
						nf_menu : 1
					},
					con : "Horário"
				},
				_1384131758 : {
					id : "Parcerias",
					pUid : "_1384131535",
					c : 9,
					link : {
						link : "../conferencia/parcerias.html"
					},
					cn : {
						nf_button : 1,
						nf_hoverMenu : 1,
						nf_menu : 1
					},
					con : "Parcerias"
				},
				_1384131791 : {
					id : "Contatos",
					pUid : "_1384131535",
					c : 9,
					link : {
						link : "../conferencia/contatos.html"
					},
					cn : {
						nf_button : 1,
						nf_hoverMenu : 1,
						nf_menu : 1
					},
					con : "Contatos"
				},
				_1384131822 : {
					id : "ListaDeLinksWork",
					pUid : "_1384131491",
					c : 4
				},
				_1384131855 : {
					id : "Administrativos",
					pUid : "_1384131822",
					c : 9,
					link : {
						link : "administrativos.html"
					},
					cn : {
						nf_button : 1,
						nf_hoverMenu : 1,
						nf_menu : 1
					},
					con : "Administrativos"
				},
				_1384131901 : {
					id : "Hotelaria",
					pUid : "_1384131822",
					c : 9,
					link : {
						link : "hotelaria.html"
					},
					cn : {
						nf_button : 1,
						nf_hoverMenu : 1,
						nf_menu : 1
					},
					con : "Hotelaria"
				},
				_1384131932 : {
					id : "Vitrinismo",
					pUid : "_1384131822",
					c : 9,
					link : {
						link : "vitrinismo.html"
					},
					cn : {
						nf_button : 1,
						nf_hoverMenu : 1,
						nf_menu : 1
					},
					con : "Vitrinismo"
				},
				_1384131965 : {
					id : "Java",
					pUid : "_1384131822",
					c : 9,
					link : {
						link : "java.html"
					},
					cn : {
						nf_button : 1,
						nf_hoverMenu : 1,
						nf_menu : 1
					},
					con : "Java"
				},
				_1384131997 : {
					id : "Videos",
					pUid : "_1384131822",
					c : 9,
					link : {
						link : "videos.html"
					},
					cn : {
						nf_button : 1,
						nf_hoverMenu : 1,
						nf_menu : 1
					},
					con : "Vídeos"
				},
				_1780040973 : {
					id : "Video",
					pUid : "_1951907382",
					c : 1,
					con : "<iframe src=\"https://docs.google.com/presentation/d/1ATISr6TbW1HEcYWVtNM_BJs1m12_joqZAp8W0GQ1NBw/embed?start=true&amp;loop=true&amp;delayms=2500\" frameborder=\"0\" width=\"825\" height=\"400\" allowfullscreen=\"true\" mozallowfullscreen=\"true\" webkitallowfullscreen=\"true\"></iframe>"
				},
				_1780652235 : {
					id : "Botao_Vitrinismo",
					pUid : "_1951907382",
					c : 1,
					link : {
						link : "vitrinismo.html"
					},
					cn : {
						nf_button : 1,
						red_button : 1,
						red_button_hoverMenu : 1,
						red_button_clickMenu : 1,
						red_button_class_name : 1
					},
					con : "<h3>Vitrinismo</h3>"
				},
				_1781007690 : {
					id : "Botao_MaisInfo",
					pUid : "_1951907382",
					c : 1,
					link : {
						link : "vitrinismoSaberMais.html"
					},
					cn : {
						nf_button : 1,
						red_button : 1,
						red_button_hoverMenu : 1,
						red_button_clickMenu : 1,
						red_button_class_name : 1
					},
					con : "<h3>Mais informação</h3>"
				}
			}
		},
		ready : {
			_1951907382 : {
				d : {
					o : {}
				},
				_1951907382 : {
					top : {
						def : {
							v : 0
						}
					},
					left : {
						def : {
							v : -1
						}
					},
					width : {
						_0 : {
							v : 1024
						}
					},
					height : {
						_0 : {
							v : 680
						}
					}
				},
				_0764239314 : {
					width : {
						def : {
							v : 145
						}
					},
					height : {
						def : {
							v : 50
						}
					},
					top : {
						def : {
							v : 180
						}
					},
					left : {
						def : {
							v : 10
						}
					},
					backgroundColor : {
						def : {
							v : "rgba(255,255,255,1)"
						},
						_230 : {
							v : "rgba(255,255,255,1)"
						}
					},
					backgroundColor_Red : {
						def : {
							v : 255
						},
						_230 : {
							v : 255
						}
					},
					backgroundColor_Green : {
						def : {
							v : 255
						},
						_230 : {
							v : 255
						}
					},
					backgroundColor_Blue : {
						def : {
							v : 255
						},
						_230 : {
							v : 255
						}
					},
					backgroundColor_Alpha : {
						def : {
							v : 1
						},
						_230 : {
							v : 1
						}
					},
					textAlign : {
						def : {
							v : "Center"
						}
					},
					fontFamily : {
						def : {
							v : "Helvetica"
						}
					},
					color : {
						def : {
							v : "rgba(255,255,255,1)"
						}
					},
					color_Red : {
						def : {
							v : 255
						}
					},
					color_Green : {
						def : {
							v : 255
						}
					},
					color_Blue : {
						def : {
							v : 255
						}
					},
					color_Alpha : {
						def : {
							v : 1
						}
					},
					borderRadius : {
						def : {
							v : 15
						}
					},
					cursor : {
						def : {
							v : "pointer"
						}
					},
					borderStyle : {
						def : {
							v : "solid"
						}
					},
					backgroundImage : {
						def : {
							v : "https://lh3.googleusercontent.com/-eKVxcFPsz0g/Ub499xVBnhI/AAAAAAAAAtk/0TqqBw35deQ/s145/RedButton.jpg"
						}
					},
					borderColor : {
						def : {
							v : "rgba(255,247,247,1)"
						}
					},
					borderColor_Red : {
						def : {
							v : 255
						}
					},
					borderColor_Green : {
						def : {
							v : 247
						}
					},
					borderColor_Blue : {
						def : {
							v : 247
						}
					},
					borderColor_Alpha : {
						def : {
							v : 1
						}
					},
					backgroundPosition_X : {
						def : {
							v : -3
						}
					},
					backgroundPosition_Y : {
						def : {
							v : -3
						}
					},
					opacity : {
						def : {
							v : 0
						},
						_30 : {
							v : 1
						}
					},
					backgroundRepeat : {
						def : {
							v : "no-repeat"
						}
					}
				},
				_0767707637 : {
					width : {
						def : {
							v : 400
						}
					},
					height : {
						def : {
							v : 82
						}
					},
					top : {
						def : {
							v : 30
						}
					},
					left : {
						def : {
							v : 20
						}
					},
					lineHeight : {
						def : {
							v : 10
						}
					},
					fontSize : {
						def : {
							v : 20
						}
					},
					backgroundColor : {
						def : {
							v : "transparent"
						}
					},
					opacity : {
						_10 : {
							v : 1
						},
						_0 : {
							v : 1
						}
					},
					color : {
						_0 : {
							v : "rgba(0,0,0,1)"
						},
						_10 : {
							v : "rgba(0,0,0,1)"
						}
					},
					color_Red : {
						_0 : {
							v : 0
						},
						_10 : {
							v : 0
						}
					},
					color_Green : {
						_0 : {
							v : 0
						},
						_10 : {
							v : 0
						}
					},
					color_Blue : {
						_0 : {
							v : 0
						},
						_10 : {
							v : 0
						}
					},
					color_Alpha : {
						_0 : {
							v : 1
						},
						_10 : {
							v : 1
						}
					}
				},
				_0792066054 : {
					width : {
						def : {
							v : 0
						},
						_10 : {
							v : 0
						},
						_30 : {
							v : 155
						}
					},
					height : {
						def : {
							v : 25
						},
						_10 : {
							v : 25
						}
					},
					top : {
						def : {
							v : 265
						},
						_10 : {
							v : 150
						},
						_30 : {
							v : 150
						}
					},
					left : {
						def : {
							v : 0
						},
						_10 : {
							v : 0
						},
						_30 : {
							v : 0
						}
					},
					borderWidth : {
						def : {
							v : 2
						},
						_10 : {
							v : 2
						},
						_30 : {
							v : 2
						}
					},
					borderWidth_Left : {
						_10 : {
							v : 0
						},
						_30 : {
							v : 0
						}
					},
					backgroundColor : {
						def : {
							v : "rgba(255,0,0,1)"
						}
					},
					backgroundColor_Red : {
						def : {
							v : 255
						}
					},
					backgroundColor_Green : {
						def : {
							v : 0
						}
					},
					backgroundColor_Blue : {
						def : {
							v : 0
						}
					},
					backgroundColor_Alpha : {
						def : {
							v : 1
						}
					},
					borderColor : {
						def : {
							v : "rgba(255,255,255,1)"
						}
					},
					borderColor_Red : {
						def : {
							v : 255
						}
					},
					borderColor_Green : {
						def : {
							v : 255
						}
					},
					borderColor_Blue : {
						def : {
							v : 255
						}
					},
					borderColor_Alpha : {
						def : {
							v : 1
						}
					},
					opacity : {
						def : {
							v : 1
						}
					}
				},
				_0792551309 : {
					width : {
						def : {
							v : 0
						},
						_40 : {
							v : 25
						},
						_30 : {
							v : 0
						}
					},
					height : {
						def : {
							v : 25
						},
						_40 : {
							v : 25
						},
						_30 : {
							v : 25
						}
					},
					top : {
						def : {
							v : 150
						}
					},
					left : {
						def : {
							v : 160
						}
					},
					borderWidth : {
						def : {
							v : 2
						}
					},
					backgroundColor : {
						def : {
							v : "rgba(255,0,0,1)"
						}
					},
					backgroundColor_Red : {
						def : {
							v : 255
						}
					},
					backgroundColor_Green : {
						def : {
							v : 0
						}
					},
					backgroundColor_Blue : {
						def : {
							v : 0
						}
					},
					backgroundColor_Alpha : {
						def : {
							v : 1
						}
					},
					borderColor : {
						def : {
							v : "rgba(255,255,255,1)"
						}
					},
					borderColor_Red : {
						def : {
							v : 255
						}
					},
					borderColor_Green : {
						def : {
							v : 255
						}
					},
					borderColor_Blue : {
						def : {
							v : 255
						}
					},
					borderColor_Alpha : {
						def : {
							v : 1
						}
					},
					borderRadius_TopRight : {
						_30 : {
							v : 90
						},
						_40 : {
							v : 90
						}
					}
				},
				_0793005751 : {
					width : {
						def : {
							v : 25
						},
						_40 : {
							v : 25
						},
						_60 : {
							v : 25
						}
					},
					height : {
						def : {
							v : 0
						},
						_40 : {
							v : 0
						},
						_60 : {
							v : 400
						}
					},
					top : {
						def : {
							v : 294
						},
						_60 : {
							v : 180
						},
						_40 : {
							v : 180
						}
					},
					left : {
						def : {
							v : 230
						},
						_60 : {
							v : 160
						},
						_40 : {
							v : 160
						}
					},
					backgroundColor : {
						def : {
							v : "rgba(255,0,0,1)"
						}
					},
					backgroundColor_Red : {
						def : {
							v : 255
						}
					},
					backgroundColor_Green : {
						def : {
							v : 0
						}
					},
					backgroundColor_Blue : {
						def : {
							v : 0
						}
					},
					backgroundColor_Alpha : {
						def : {
							v : 1
						}
					},
					borderWidth : {
						_40 : {
							v : 2
						},
						_60 : {
							v : 2
						}
					},
					borderColor : {
						def : {
							v : "rgba(255,255,255,1)"
						}
					},
					borderColor_Red : {
						def : {
							v : 255
						}
					},
					borderColor_Green : {
						def : {
							v : 255
						}
					},
					borderColor_Blue : {
						def : {
							v : 255
						}
					},
					borderColor_Alpha : {
						def : {
							v : 1
						}
					}
				},
				_0793788573 : {
					width : {
						def : {
							v : 0
						},
						_60 : {
							v : 0
						},
						_70 : {
							v : 25
						}
					},
					height : {
						def : {
							v : 0
						},
						_60 : {
							v : 0
						},
						_70 : {
							v : 25
						}
					},
					top : {
						def : {
							v : 561
						},
						_70 : {
							v : 585
						},
						_60 : {
							v : 600
						}
					},
					left : {
						def : {
							v : 240
						},
						_60 : {
							v : 160
						},
						_70 : {
							v : 160
						}
					},
					borderWidth : {
						def : {
							v : 2
						},
						_60 : {
							v : 2
						},
						_70 : {
							v : 2
						}
					},
					backgroundColor : {
						def : {
							v : "rgba(255,0,0,1)"
						}
					},
					backgroundColor_Red : {
						def : {
							v : 255
						}
					},
					backgroundColor_Green : {
						def : {
							v : 0
						}
					},
					backgroundColor_Blue : {
						def : {
							v : 0
						}
					},
					backgroundColor_Alpha : {
						def : {
							v : 1
						}
					},
					borderColor : {
						def : {
							v : "rgba(255,255,255,1)"
						}
					},
					borderColor_Red : {
						def : {
							v : 255
						}
					},
					borderColor_Green : {
						def : {
							v : 255
						}
					},
					borderColor_Blue : {
						def : {
							v : 255
						}
					},
					borderColor_Alpha : {
						def : {
							v : 1
						}
					},
					borderRadius_BottomLeft : {
						_60 : {
							v : 90
						},
						_70 : {
							v : 90
						}
					}
				},
				_0794227652 : {
					width : {
						def : {
							v : 0
						},
						_70 : {
							v : 0
						},
						_90 : {
							v : 832
						}
					},
					height : {
						def : {
							v : 25
						},
						_70 : {
							v : 25
						},
						_90 : {
							v : 25
						}
					},
					top : {
						def : {
							v : 658
						},
						_70 : {
							v : 585
						},
						_90 : {
							v : 585
						}
					},
					left : {
						def : {
							v : 270
						},
						_70 : {
							v : 190
						},
						_90 : {
							v : 190
						}
					},
					borderWidth : {
						def : {
							v : 2
						},
						_90 : {
							v : 2
						},
						_70 : {
							v : 2
						}
					},
					borderWidth_Right : {
						_90 : {
							v : 0
						}
					},
					backgroundColor : {
						def : {
							v : "rgba(255,0,0,1)"
						}
					},
					backgroundColor_Red : {
						def : {
							v : 255
						}
					},
					backgroundColor_Green : {
						def : {
							v : 0
						}
					},
					backgroundColor_Blue : {
						def : {
							v : 0
						}
					},
					backgroundColor_Alpha : {
						def : {
							v : 1
						}
					},
					borderColor : {
						def : {
							v : "rgba(255,255,255,1)"
						}
					},
					borderColor_Red : {
						def : {
							v : 255
						}
					},
					borderColor_Green : {
						def : {
							v : 255
						}
					},
					borderColor_Blue : {
						def : {
							v : 255
						}
					},
					borderColor_Alpha : {
						def : {
							v : 1
						}
					}
				},
				_1384131310 : {
					width : {
						def : {
							v : 100,
							p : {
								unit : '%'
							}
						}
					},
					height : {
						def : {
							v : 25
						}
					},
					top : {
						def : {
							v : 630
						}
					},
					left : {
						def : {
							v : 0
						}
					},
					visibility : {
						def : {
							v : "visible"
						}
					},
					display : {
						def : {
							v : "block"
						}
					},
					overflow : {
						def : {
							v : "visible"
						}
					},
					backgroundColor : {
						def : {
							v : "rgba(121,121,121,1)"
						}
					},
					backgroundColor_Red : {
						def : {
							v : 121
						}
					},
					backgroundColor_Green : {
						def : {
							v : 121
						}
					},
					backgroundColor_Blue : {
						def : {
							v : 121
						}
					},
					backgroundColor_Alpha : {
						def : {
							v : 1
						}
					},
					borderColor : {
						def : {
							v : "rgba(0,0,0,0.40)"
						}
					},
					borderColor_Red : {
						def : {
							v : 0
						}
					},
					borderColor_Green : {
						def : {
							v : 0
						}
					},
					borderColor_Blue : {
						def : {
							v : 0
						}
					},
					borderColor_Alpha : {
						def : {
							v : 0.4
						}
					},
					cursor : {
						def : {
							v : "pointer"
						}
					},
					borderWidth : {
						def : {
							v : 2
						}
					},
					margin_Right : {
						def : {
							v : "auto"
						}
					},
					margin_Left : {
						def : {
							v : "auto"
						}
					},
					right : {
						def : {
							v : 0
						}
					},
					bottom : {
						def : {
							v : 0
						}
					},
					opacity : {
						def : {
							v : 1
						},
						_0 : {
							v : 0
						},
						_90 : {
							v : 1
						}
					}
				},
				_1384131375 : {
					width : {
						def : {
							v : 50,
							p : {
								unit : '%'
							}
						}
					},
					height : {
						def : {
							v : 100,
							p : {
								unit : '%'
							}
						}
					},
					left : {
						def : {
							v : 0
						}
					},
					visibility : {
						def : {
							v : "visible"
						}
					},
					display : {
						def : {
							v : "block"
						}
					},
					bottom : {
						def : {
							v : 0
						}
					},
					textAlign : {
						def : {
							v : "center"
						}
					},
					lineHeight : {
						def : {
							v : 20
						}
					},
					fontSize : {
						def : {
							v : 18
						}
					},
					fontWeight : {
						def : {
							v : "normal"
						}
					},
					color : {
						def : {
							v : "rgba(255,255,255,1)"
						}
					},
					color_Red : {
						def : {
							v : 255
						}
					},
					color_Green : {
						def : {
							v : 255
						}
					},
					color_Blue : {
						def : {
							v : 255
						}
					},
					color_Alpha : {
						def : {
							v : 1
						}
					},
					opacity : {
						def : {
							v : 1
						}
					},
					borderWidth_Right : {
						def : {
							v : 4
						}
					},
					borderColor : {
						def : {
							v : "rgba(255,255,255,1)"
						}
					},
					borderColor_Red : {
						def : {
							v : 255
						}
					},
					borderColor_Green : {
						def : {
							v : 255
						}
					},
					borderColor_Blue : {
						def : {
							v : 255
						}
					},
					borderColor_Alpha : {
						def : {
							v : 1
						}
					},
					backgroundColor : {
						def : {
							v : "rgba(121,121,121,1)"
						}
					},
					backgroundColor_Red : {
						def : {
							v : 121
						}
					},
					backgroundColor_Green : {
						def : {
							v : 121
						}
					},
					backgroundColor_Blue : {
						def : {
							v : 121
						}
					},
					backgroundColor_Alpha : {
						def : {
							v : 1
						}
					}
				},
				_1384131445 : {
					width : {
						def : {
							v : 50,
							p : {
								unit : '%'
							}
						}
					},
					height : {
						def : {
							v : 100,
							p : {
								unit : '%'
							}
						}
					},
					top : {
						def : {
							v : 0
						}
					},
					visibility : {
						def : {
							v : "visible"
						}
					},
					display : {
						def : {
							v : "block"
						}
					},
					margin_Top : {
						def : {
							v : "auto"
						}
					},
					margin_Bottom : {
						def : {
							v : "auto"
						}
					},
					right : {
						def : {
							v : 0
						}
					},
					bottom : {
						def : {
							v : 0
						}
					},
					textAlign : {
						def : {
							v : "center"
						}
					},
					lineHeight : {
						def : {
							v : 20
						}
					},
					fontSize : {
						def : {
							v : 18
						}
					},
					fontWeight : {
						def : {
							v : "normal"
						}
					},
					color : {
						def : {
							v : "rgba(255,255,255,1)"
						}
					},
					color_Red : {
						def : {
							v : 255
						}
					},
					color_Green : {
						def : {
							v : 255
						}
					},
					color_Blue : {
						def : {
							v : 255
						}
					},
					color_Alpha : {
						def : {
							v : 1
						}
					},
					opacity : {
						def : {
							v : 1
						}
					},
					borderWidth_Left : {
						def : {
							v : 4
						}
					},
					borderColor : {
						def : {
							v : "rgba(255,255,255,1)"
						}
					},
					borderColor_Red : {
						def : {
							v : 255
						}
					},
					borderColor_Green : {
						def : {
							v : 255
						}
					},
					borderColor_Blue : {
						def : {
							v : 255
						}
					},
					borderColor_Alpha : {
						def : {
							v : 1
						}
					},
					backgroundColor : {
						def : {
							v : "rgba(121,121,121,1)"
						}
					},
					backgroundColor_Red : {
						def : {
							v : 121
						}
					},
					backgroundColor_Green : {
						def : {
							v : 121
						}
					},
					backgroundColor_Blue : {
						def : {
							v : 121
						}
					},
					backgroundColor_Alpha : {
						def : {
							v : 1
						}
					}
				},
				_1384131491 : {
					width : {
						def : {
							v : 100,
							p : {
								unit : '%'
							}
						}
					},
					height : {
						def : {
							v : 200
						}
					},
					top : {
						def : {
							v : -200
						}
					},
					visibility : {
						def : {
							v : "visible"
						}
					},
					overflow : {
						def : {
							v : "auto"
						}
					},
					opacity : {
						def : {
							v : 1
						}
					},
					backgroundColor : {
						def : {
							v : "rgba(10,6,6,0.54)"
						}
					},
					backgroundColor_Red : {
						def : {
							v : 10
						}
					},
					backgroundColor_Green : {
						def : {
							v : 6
						}
					},
					backgroundColor_Blue : {
						def : {
							v : 6
						}
					},
					backgroundColor_Alpha : {
						def : {
							v : 0.54
						}
					},
					fontWeight : {
						def : {
							v : "normal"
						}
					},
					borderWidth : {
						def : {
							v : 5
						}
					},
					borderWidth_Bottom : {
						def : {
							v : 1
						}
					},
					borderColor : {
						def : {
							v : "rgba(121,121,121,0.75)"
						}
					},
					borderColor_Red : {
						def : {
							v : 121
						}
					},
					borderColor_Green : {
						def : {
							v : 121
						}
					},
					borderColor_Blue : {
						def : {
							v : 121
						}
					},
					borderColor_Alpha : {
						def : {
							v : 0.75
						}
					},
					position : {
						def : {
							v : "absolute"
						}
					},
					margin_Right : {
						def : {
							v : "auto"
						}
					},
					margin_Left : {
						def : {
							v : "auto"
						}
					},
					left : {
						def : {
							v : 0
						}
					},
					right : {
						def : {
							v : 0
						}
					},
					padding : {
						def : {
							v : 5
						}
					},
					borderRadius_TopLeft : {
						def : {
							v : 47
						}
					},
					borderRadius_TopRight : {
						def : {
							v : 47
						}
					},
					cursor : {
						def : {
							v : "default"
						}
					}
				},
				_1384131535 : {
					width : {
						def : {
							v : 50,
							p : {
								unit : '%'
							}
						}
					},
					height : {
						def : {
							v : 100,
							p : {
								unit : '%'
							}
						}
					},
					top : {
						def : {
							v : 0
						}
					},
					left : {
						def : {
							v : 0
						}
					},
					bottom : {
						def : {
							v : 0
						}
					},
					backgroundColor : {
						def : {
							v : "rgba(140,140,140,0.50)"
						}
					},
					backgroundColor_Red : {
						def : {
							v : 124
						}
					},
					backgroundColor_Green : {
						def : {
							v : 124
						}
					},
					backgroundColor_Blue : {
						def : {
							v : 124
						}
					},
					backgroundColor_Alpha : {
						def : {
							v : 0.5
						}
					},
					borderRadius_TopLeft : {
						def : {
							v : 45
						}
					},
					cssFloat : {
						def : {
							v : "left"
						}
					}
				},
				_1384131604 : {
					width : {
						def : {
							v : "auto",
							p : {
								unit : '%'
							}
						}
					},
					height : {
						def : {
							v : 25
						}
					},
					top : {
						def : {
							v : "auto"
						}
					},
					left : {
						def : {
							v : "auto"
						}
					},
					backgroundColor : {
						def : {
							v : "rgba(123,123,123,0.50)"
						}
					},
					backgroundColor_Red : {
						def : {
							v : 124
						}
					},
					backgroundColor_Green : {
						def : {
							v : 124
						}
					},
					backgroundColor_Blue : {
						def : {
							v : 124
						}
					},
					backgroundColor_Alpha : {
						def : {
							v : 0.5
						}
					},
					fontSize : {
						def : {
							v : 14
						}
					},
					color : {
						def : {
							v : "rgba(255,255,255,1)"
						}
					},
					color_Red : {
						def : {
							v : 255
						}
					},
					color_Green : {
						def : {
							v : 255
						}
					},
					color_Blue : {
						def : {
							v : 255
						}
					},
					color_Alpha : {
						def : {
							v : 1
						}
					},
					cursor : {
						def : {
							v : "pointer"
						}
					},
					borderRadius_TopLeft : {
						def : {
							v : 45
						}
					},
					textAlign : {
						def : {
							v : "center"
						}
					},
					padding : {
						def : {
							v : 10
						}
					},
					margin : {
						def : {
							v : 10
						}
					},
					lineHeight : {
						def : {
							v : 5
						}
					}
				},
				_1384131677 : {
					backgroundColor : {
						def : {
							v : "rgba(124,124,124,0.80)"
						}
					},
					backgroundColor_Red : {
						def : {
							v : 124
						}
					},
					backgroundColor_Green : {
						def : {
							v : 124
						}
					},
					backgroundColor_Blue : {
						def : {
							v : 124
						}
					},
					backgroundColor_Alpha : {
						def : {
							v : 0.8
						}
					},
					width : {
						def : {
							v : "auto"
						}
					},
					height : {
						def : {
							v : "auto"
						}
					},
					top : {
						def : {
							v : "auto"
						}
					},
					left : {
						def : {
							v : "auto"
						}
					},
					fontSize : {
						def : {
							v : 14
						}
					},
					color : {
						def : {
							v : "rgba(255,255,255,1)"
						}
					},
					color_Red : {
						def : {
							v : 255
						}
					},
					color_Green : {
						def : {
							v : 255
						}
					},
					color_Blue : {
						def : {
							v : 255
						}
					},
					color_Alpha : {
						def : {
							v : 1
						}
					},
					cursor : {
						def : {
							v : "pointer"
						}
					},
					textAlign : {
						def : {
							v : "center"
						}
					},
					padding : {
						def : {
							v : 10
						}
					},
					margin : {
						def : {
							v : 10
						}
					},
					lineHeight : {
						def : {
							v : 5
						}
					}
				},
				_1384131724 : {
					backgroundColor : {
						def : {
							v : "rgba(124,124,124,0.80)"
						}
					},
					backgroundColor_Red : {
						def : {
							v : 124
						}
					},
					backgroundColor_Green : {
						def : {
							v : 124
						}
					},
					backgroundColor_Blue : {
						def : {
							v : 124
						}
					},
					backgroundColor_Alpha : {
						def : {
							v : 0.8
						}
					},
					width : {
						def : {
							v : "auto"
						}
					},
					height : {
						def : {
							v : "auto"
						}
					},
					top : {
						def : {
							v : "auto"
						}
					},
					left : {
						def : {
							v : "auto"
						}
					},
					fontSize : {
						def : {
							v : 14
						}
					},
					color : {
						def : {
							v : "rgba(255,255,255,1)"
						}
					},
					color_Red : {
						def : {
							v : 255
						}
					},
					color_Green : {
						def : {
							v : 255
						}
					},
					color_Blue : {
						def : {
							v : 255
						}
					},
					color_Alpha : {
						def : {
							v : 1
						}
					},
					cursor : {
						def : {
							v : "pointer"
						}
					},
					textAlign : {
						def : {
							v : "center"
						}
					},
					padding : {
						def : {
							v : 10
						}
					},
					margin : {
						def : {
							v : 10
						}
					},
					lineHeight : {
						def : {
							v : 5
						}
					}
				},
				_1384131758 : {
					width : {
						def : {
							v : "auto"
						}
					},
					height : {
						def : {
							v : "auto"
						}
					},
					top : {
						def : {
							v : "auto"
						}
					},
					left : {
						def : {
							v : "auto"
						}
					},
					backgroundColor : {
						def : {
							v : "rgba(124,124,124,0.80)"
						}
					},
					backgroundColor_Red : {
						def : {
							v : 124
						}
					},
					backgroundColor_Green : {
						def : {
							v : 124
						}
					},
					backgroundColor_Blue : {
						def : {
							v : 124
						}
					},
					backgroundColor_Alpha : {
						def : {
							v : 0.5
						}
					},
					fontSize : {
						def : {
							v : 14
						}
					},
					color : {
						def : {
							v : "rgba(255,255,255,1)"
						}
					},
					color_Red : {
						def : {
							v : 255
						}
					},
					color_Green : {
						def : {
							v : 255
						}
					},
					color_Blue : {
						def : {
							v : 255
						}
					},
					color_Alpha : {
						def : {
							v : 1
						}
					},
					cursor : {
						def : {
							v : "pointer"
						}
					},
					textAlign : {
						def : {
							v : "center"
						}
					},
					padding : {
						def : {
							v : 10
						}
					},
					margin : {
						def : {
							v : 10
						}
					},
					lineHeight : {
						def : {
							v : 5
						}
					},
					fontWeight : {
						def : {
							v : "normal"
						}
					}
				},
				_1384131791 : {
					width : {
						def : {
							v : "auto"
						}
					},
					height : {
						def : {
							v : "auto"
						}
					},
					top : {
						def : {
							v : "auto"
						}
					},
					left : {
						def : {
							v : "auto"
						}
					},
					backgroundColor : {
						def : {
							v : "rgba(124,124,124,0.80)"
						}
					},
					backgroundColor_Red : {
						def : {
							v : 124
						}
					},
					backgroundColor_Green : {
						def : {
							v : 124
						}
					},
					backgroundColor_Blue : {
						def : {
							v : 124
						}
					},
					backgroundColor_Alpha : {
						def : {
							v : 0.5
						}
					},
					fontSize : {
						def : {
							v : 14
						}
					},
					color : {
						def : {
							v : "rgba(255,255,255,1)"
						}
					},
					color_Red : {
						def : {
							v : 255
						}
					},
					color_Green : {
						def : {
							v : 255
						}
					},
					color_Blue : {
						def : {
							v : 255
						}
					},
					color_Alpha : {
						def : {
							v : 1
						}
					},
					cursor : {
						def : {
							v : "pointer"
						}
					},
					textAlign : {
						def : {
							v : "center"
						}
					},
					padding : {
						def : {
							v : 10
						}
					},
					margin : {
						def : {
							v : 10
						}
					},
					lineHeight : {
						def : {
							v : 5
						}
					},
					fontWeight : {
						def : {
							v : "normal"
						}
					}
				},
				_1384131822 : {
					width : {
						def : {
							v : 50,
							p : {
								unit : '%'
							}
						}
					},
					height : {
						def : {
							v : 100,
							p : {
								unit : '%'
							}
						}
					},
					top : {
						def : {
							v : 0
						}
					},
					right : {
						def : {
							v : 0
						}
					},
					bottom : {
						def : {
							v : 0
						}
					},
					backgroundColor : {
						def : {
							v : "rgba(140,140,140,0.50)"
						}
					},
					backgroundColor_Red : {
						def : {
							v : 124
						}
					},
					backgroundColor_Green : {
						def : {
							v : 124
						}
					},
					backgroundColor_Blue : {
						def : {
							v : 124
						}
					},
					backgroundColor_Alpha : {
						def : {
							v : 0.5
						}
					},
					borderRadius_TopRight : {
						def : {
							v : 45
						}
					},
					margin_Top : {
						def : {
							v : "auto"
						}
					},
					margin_Bottom : {
						def : {
							v : "auto"
						}
					},
					cssFloat : {
						def : {
							v : "left"
						}
					}
				},
				_1384131855 : {
					width : {
						def : {
							v : "auto",
							p : {
								unit : '%'
							}
						}
					},
					height : {
						def : {
							v : 25
						}
					},
					top : {
						def : {
							v : "auto"
						}
					},
					left : {
						def : {
							v : "auto"
						}
					},
					backgroundColor : {
						def : {
							v : "rgba(124,124,124,0.80)"
						}
					},
					backgroundColor_Red : {
						def : {
							v : 124
						}
					},
					backgroundColor_Green : {
						def : {
							v : 124
						}
					},
					backgroundColor_Blue : {
						def : {
							v : 124
						}
					},
					backgroundColor_Alpha : {
						def : {
							v : 0.5
						}
					},
					fontSize : {
						def : {
							v : 14
						}
					},
					color : {
						def : {
							v : "rgba(255,255,255,1)"
						}
					},
					color_Red : {
						def : {
							v : 255
						}
					},
					color_Green : {
						def : {
							v : 255
						}
					},
					color_Blue : {
						def : {
							v : 255
						}
					},
					color_Alpha : {
						def : {
							v : 1
						}
					},
					cursor : {
						def : {
							v : "pointer"
						}
					},
					borderRadius_TopRight : {
						def : {
							v : 45
						}
					},
					textAlign : {
						def : {
							v : "center"
						}
					},
					padding : {
						def : {
							v : 10
						}
					},
					margin : {
						def : {
							v : 10
						}
					},
					lineHeight : {
						def : {
							v : 5
						}
					}
				},
				_1384131901 : {
					width : {
						def : {
							v : "auto"
						}
					},
					height : {
						def : {
							v : "auto"
						}
					},
					top : {
						def : {
							v : "auto"
						}
					},
					left : {
						def : {
							v : "auto"
						}
					},
					backgroundColor : {
						def : {
							v : "rgba(124,124,124,0.80)"
						}
					},
					backgroundColor_Red : {
						def : {
							v : 124
						}
					},
					backgroundColor_Green : {
						def : {
							v : 124
						}
					},
					backgroundColor_Blue : {
						def : {
							v : 124
						}
					},
					backgroundColor_Alpha : {
						def : {
							v : 0.5
						}
					},
					fontSize : {
						def : {
							v : 14
						}
					},
					color : {
						def : {
							v : "rgba(255,255,255,1)"
						}
					},
					color_Red : {
						def : {
							v : 255
						}
					},
					color_Green : {
						def : {
							v : 255
						}
					},
					color_Blue : {
						def : {
							v : 255
						}
					},
					color_Alpha : {
						def : {
							v : 1
						}
					},
					cursor : {
						def : {
							v : "pointer"
						}
					},
					textAlign : {
						def : {
							v : "center"
						}
					},
					padding : {
						def : {
							v : 10
						}
					},
					margin : {
						def : {
							v : 10
						}
					},
					lineHeight : {
						def : {
							v : 5
						}
					},
					fontWeight : {
						def : {
							v : "normal"
						}
					}
				},
				_1384131932 : {
					width : {
						def : {
							v : "auto"
						}
					},
					height : {
						def : {
							v : "auto"
						}
					},
					top : {
						def : {
							v : "auto"
						}
					},
					left : {
						def : {
							v : "auto"
						}
					},
					backgroundColor : {
						def : {
							v : "rgba(124,124,124,0.80)"
						}
					},
					backgroundColor_Red : {
						def : {
							v : 124
						}
					},
					backgroundColor_Green : {
						def : {
							v : 124
						}
					},
					backgroundColor_Blue : {
						def : {
							v : 124
						}
					},
					backgroundColor_Alpha : {
						def : {
							v : 0.5
						}
					},
					fontSize : {
						def : {
							v : 14
						}
					},
					color : {
						def : {
							v : "rgba(255,255,255,1)"
						}
					},
					color_Red : {
						def : {
							v : 255
						}
					},
					color_Green : {
						def : {
							v : 255
						}
					},
					color_Blue : {
						def : {
							v : 255
						}
					},
					color_Alpha : {
						def : {
							v : 1
						}
					},
					cursor : {
						def : {
							v : "pointer"
						}
					},
					textAlign : {
						def : {
							v : "center"
						}
					},
					padding : {
						def : {
							v : 10
						}
					},
					margin : {
						def : {
							v : 10
						}
					},
					lineHeight : {
						def : {
							v : 5
						}
					},
					fontWeight : {
						def : {
							v : "normal"
						}
					}
				},
				_1384131965 : {
					width : {
						def : {
							v : "auto"
						}
					},
					height : {
						def : {
							v : "auto"
						}
					},
					top : {
						def : {
							v : "auto"
						}
					},
					left : {
						def : {
							v : "auto"
						}
					},
					backgroundColor : {
						def : {
							v : "rgba(124,124,124,0.80)"
						}
					},
					backgroundColor_Red : {
						def : {
							v : 124
						}
					},
					backgroundColor_Green : {
						def : {
							v : 124
						}
					},
					backgroundColor_Blue : {
						def : {
							v : 124
						}
					},
					backgroundColor_Alpha : {
						def : {
							v : 0.5
						}
					},
					fontSize : {
						def : {
							v : 14
						}
					},
					color : {
						def : {
							v : "rgba(255,255,255,1)"
						}
					},
					color_Red : {
						def : {
							v : 255
						}
					},
					color_Green : {
						def : {
							v : 255
						}
					},
					color_Blue : {
						def : {
							v : 255
						}
					},
					color_Alpha : {
						def : {
							v : 1
						}
					},
					cursor : {
						def : {
							v : "pointer"
						}
					},
					textAlign : {
						def : {
							v : "center"
						}
					},
					padding : {
						def : {
							v : 10
						}
					},
					margin : {
						def : {
							v : 10
						}
					},
					lineHeight : {
						def : {
							v : 5
						}
					},
					fontWeight : {
						def : {
							v : "normal"
						}
					}
				},
				_1384131997 : {
					width : {
						def : {
							v : "auto"
						}
					},
					height : {
						def : {
							v : "auto"
						}
					},
					top : {
						def : {
							v : "auto"
						}
					},
					left : {
						def : {
							v : "auto"
						}
					},
					backgroundColor : {
						def : {
							v : "rgba(124,124,124,0.80)"
						}
					},
					backgroundColor_Red : {
						def : {
							v : 124
						}
					},
					backgroundColor_Green : {
						def : {
							v : 124
						}
					},
					backgroundColor_Blue : {
						def : {
							v : 124
						}
					},
					backgroundColor_Alpha : {
						def : {
							v : 0.5
						}
					},
					fontSize : {
						def : {
							v : 14
						}
					},
					color : {
						def : {
							v : "rgba(255,255,255,1)"
						}
					},
					color_Red : {
						def : {
							v : 255
						}
					},
					color_Green : {
						def : {
							v : 255
						}
					},
					color_Blue : {
						def : {
							v : 255
						}
					},
					color_Alpha : {
						def : {
							v : 1
						}
					},
					cursor : {
						def : {
							v : "pointer"
						}
					},
					textAlign : {
						def : {
							v : "center"
						}
					},
					padding : {
						def : {
							v : 10
						}
					},
					margin : {
						def : {
							v : 10
						}
					},
					lineHeight : {
						def : {
							v : 5
						}
					},
					fontWeight : {
						def : {
							v : "normal"
						}
					}
				},
				_1780040973 : {
					width : {
						def : {
							v : 820
						}
					},
					height : {
						def : {
							v : 400
						}
					},
					top : {
						def : {
							v : 185
						}
					},
					left : {
						def : {
							v : 192
						}
					},
					backgroundColor : {
						def : {
							v : "transparent"
						}
					},
					opacity : {
						def : {
							v : 0
						},
						_0 : {
							v : 0
						},
						_70 : {
							v : 0
						},
						_90 : {
							v : 1
						}
					}
				},
				_1780652235 : {
					width : {
						def : {
							v : 125
						}
					},
					height : {
						def : {
							v : 25
						}
					},
					top : {
						def : {
							v : 150
						}
					},
					left : {
						def : {
							v : 191
						}
					},
					backgroundColor : {
						def : {
							v : "rgba(0,0,0,1)"
						}
					},
					backgroundColor_Red : {
						def : {
							v : 0
						}
					},
					backgroundColor_Green : {
						def : {
							v : 0
						}
					},
					backgroundColor_Blue : {
						def : {
							v : 0
						}
					},
					backgroundColor_Alpha : {
						def : {
							v : 1
						}
					},
					textAlign : {
						def : {
							v : "Center"
						}
					},
					fontFamily : {
						def : {
							v : "Helvetica"
						}
					},
					color : {
						def : {
							v : "rgba(255,255,255,1)"
						}
					},
					color_Red : {
						def : {
							v : 255
						}
					},
					color_Green : {
						def : {
							v : 255
						}
					},
					color_Blue : {
						def : {
							v : 255
						}
					},
					color_Alpha : {
						def : {
							v : 1
						}
					},
					borderRadius : {
						def : {
							v : 15
						}
					},
					cursor : {
						def : {
							v : "pointer"
						}
					},
					borderStyle : {
						def : {
							v : "solid"
						}
					},
					borderColor : {
						def : {
							v : "rgba(0,0,0,1)"
						}
					},
					borderColor_Red : {
						def : {
							v : 0
						}
					},
					borderColor_Green : {
						def : {
							v : 0
						}
					},
					borderColor_Blue : {
						def : {
							v : 0
						}
					},
					borderColor_Alpha : {
						def : {
							v : 1
						}
					},
					lineHeight : {
						def : {
							v : 0
						}
					},
					opacity : {
						def : {
							v : 0
						},
						_40 : {
							v : 0
						},
						_0 : {
							v : 0
						},
						_70 : {
							v : 1
						}
					},
					backgroundImage : {
						def : {
							v : "http://"
						}
					},
					right : {
						def : {
							v : 0
						}
					}
				},
				_1781007690 : {
					width : {
						def : {
							v : 250
						}
					},
					height : {
						def : {
							v : 25
						}
					},
					top : {
						def : {
							v : 150
						}
					},
					left : {
						def : {
							v : 456
						}
					},
					backgroundColor : {
						def : {
							v : "rgba(122,122,122,1)"
						}
					},
					backgroundColor_Red : {
						def : {
							v : 122
						}
					},
					backgroundColor_Green : {
						def : {
							v : 122
						}
					},
					backgroundColor_Blue : {
						def : {
							v : 122
						}
					},
					backgroundColor_Alpha : {
						def : {
							v : 1
						}
					},
					textAlign : {
						def : {
							v : "Center"
						}
					},
					fontFamily : {
						def : {
							v : "Helvetica"
						}
					},
					color : {
						def : {
							v : "rgba(255,255,255,1)"
						}
					},
					color_Red : {
						def : {
							v : 255
						}
					},
					color_Green : {
						def : {
							v : 255
						}
					},
					color_Blue : {
						def : {
							v : 255
						}
					},
					color_Alpha : {
						def : {
							v : 1
						}
					},
					borderRadius : {
						def : {
							v : 15
						}
					},
					cursor : {
						def : {
							v : "pointer"
						}
					},
					borderStyle : {
						def : {
							v : "solid"
						}
					},
					borderColor : {
						def : {
							v : "rgba(0,0,0,1)"
						}
					},
					borderColor_Red : {
						def : {
							v : 0
						}
					},
					borderColor_Green : {
						def : {
							v : 0
						}
					},
					borderColor_Blue : {
						def : {
							v : 0
						}
					},
					borderColor_Alpha : {
						def : {
							v : 1
						}
					},
					lineHeight : {
						def : {
							v : 0
						}
					},
					opacity : {
						def : {
							v : 0
						},
						_0 : {
							v : 0
						},
						_90 : {
							v : 1
						}
					},
					backgroundImage : {
						def : {
							v : "http://"
						}
					},
					right : {
						def : {
							v : 0
						}
					}
				}
			},
			_1384131535 : {
				d : {
					o : {}
				},
				_1384131535 : {
					backgroundColor : {
						_0 : {
							v : "rgba(123,123,123,0.50)"
						}
					},
					backgroundColor_Red : {
						_0 : {
							v : 123
						}
					},
					backgroundColor_Green : {
						_0 : {
							v : 123
						}
					},
					backgroundColor_Blue : {
						_0 : {
							v : 123
						}
					},
					backgroundColor_Alpha : {
						_0 : {
							v : 0.5
						}
					}
				}
			},
			_1384131822 : {
				d : {
					o : {}
				},
				_1384131822 : {
					backgroundColor : {
						_0 : {
							v : "rgba(123,123,123,0.50)"
						}
					},
					backgroundColor_Red : {
						_0 : {
							v : 123
						}
					},
					backgroundColor_Green : {
						_0 : {
							v : 123
						}
					},
					backgroundColor_Blue : {
						_0 : {
							v : 123
						}
					},
					backgroundColor_Alpha : {
						_0 : {
							v : 0.5
						}
					}
				}
			},
			_1384131855 : {
				d : {
					o : {}
				},
				_1384131855 : {
					textDecoration : {
						_0 : {
							v : "none"
						}
					},
					fontWeight : {
						_0 : {
							v : "normal"
						}
					}
				},
				_1384131822 : {
					backgroundColor : {
						_0 : {
							v : "rgba(123,123,123,0.50)"
						}
					},
					backgroundColor_Red : {
						_0 : {
							v : 123
						}
					},
					backgroundColor_Green : {
						_0 : {
							v : 123
						}
					},
					backgroundColor_Blue : {
						_0 : {
							v : 123
						}
					},
					backgroundColor_Alpha : {
						_0 : {
							v : 0.5
						}
					}
				},
				_1384131535 : {
					backgroundColor : {
						_0 : {
							v : "rgba(123,123,123,0.50)"
						}
					},
					backgroundColor_Red : {
						_0 : {
							v : 123
						}
					},
					backgroundColor_Green : {
						_0 : {
							v : 123
						}
					},
					backgroundColor_Blue : {
						_0 : {
							v : 123
						}
					},
					backgroundColor_Alpha : {
						_0 : {
							v : 0.5
						}
					}
				}
			},
			_1384131375 : {
				d : {
					o : {}
				},
				_1384131375 : {
					backgroundColor : {
						_0 : {
							v : "rgba(121,121,121,1)"
						}
					},
					backgroundColor_Red : {
						_0 : {
							v : 121
						}
					},
					backgroundColor_Green : {
						_0 : {
							v : 121
						}
					},
					backgroundColor_Blue : {
						_0 : {
							v : 121
						}
					},
					backgroundColor_Alpha : {
						_0 : {
							v : 1
						}
					}
				},
				_1384131445 : {
					backgroundColor : {
						_0 : {
							v : "rgba(121,121,121,1)"
						}
					},
					backgroundColor_Red : {
						_0 : {
							v : 121
						}
					},
					backgroundColor_Green : {
						_0 : {
							v : 121
						}
					},
					backgroundColor_Blue : {
						_0 : {
							v : 121
						}
					},
					backgroundColor_Alpha : {
						_0 : {
							v : 1
						}
					}
				}
			},
			_1384131445 : {
				d : {
					o : {}
				},
				_1384131445 : {
					backgroundColor : {
						_0 : {
							v : "rgba(121,121,121,1)"
						}
					},
					backgroundColor_Red : {
						_0 : {
							v : 121
						}
					},
					backgroundColor_Green : {
						_0 : {
							v : 121
						}
					},
					backgroundColor_Blue : {
						_0 : {
							v : 121
						}
					},
					backgroundColor_Alpha : {
						_0 : {
							v : 1
						}
					}
				}
			},
			_0764239314 : {
				d : {
					o : {}
				},
				_0764239314 : {
					borderWidth : {
						_0 : {
							v : 0
						}
					},
					backgroundImage : {
						_0 : {
							v : "https://lh3.googleusercontent.com/-eKVxcFPsz0g/Ub499xVBnhI/AAAAAAAAAtk/0TqqBw35deQ/s145/RedButton.jpg"
						}
					},
					backgroundPosition_X : {
						_0 : {
							v : null
						}
					},
					backgroundPosition_Y : {
						_0 : {
							v : null
						}
					}
				}
			}
		},
		load : {
			_1384131535 : {
				d : {
					o : {}
				},
				_1384131535 : {
					backgroundColor : {
						_0 : {
							v : "rgba(123,123,123,0.50)"
						}
					},
					backgroundColor_Red : {
						_0 : {
							v : 123
						}
					},
					backgroundColor_Green : {
						_0 : {
							v : 123
						}
					},
					backgroundColor_Blue : {
						_0 : {
							v : 123
						}
					},
					backgroundColor_Alpha : {
						_0 : {
							v : 0.5
						}
					}
				}
			},
			_1384131822 : {
				d : {
					o : {}
				},
				_1384131822 : {
					backgroundColor : {
						_0 : {
							v : "rgba(123,123,123,0.50)"
						}
					},
					backgroundColor_Red : {
						_0 : {
							v : 123
						}
					},
					backgroundColor_Green : {
						_0 : {
							v : 123
						}
					},
					backgroundColor_Blue : {
						_0 : {
							v : 123
						}
					},
					backgroundColor_Alpha : {
						_0 : {
							v : 0.5
						}
					}
				}
			},
			_1384131855 : {
				d : {
					o : {}
				},
				_1384131535 : {
					backgroundColor : {
						_0 : {
							v : "rgba(123,123,123,0.50)"
						}
					},
					backgroundColor_Red : {
						_0 : {
							v : 123
						}
					},
					backgroundColor_Green : {
						_0 : {
							v : 123
						}
					},
					backgroundColor_Blue : {
						_0 : {
							v : 123
						}
					},
					backgroundColor_Alpha : {
						_0 : {
							v : 0.5
						}
					}
				},
				_1384131822 : {
					backgroundColor : {
						_0 : {
							v : "rgba(123,123,123,0.50)"
						}
					},
					backgroundColor_Red : {
						_0 : {
							v : 123
						}
					},
					backgroundColor_Green : {
						_0 : {
							v : 123
						}
					},
					backgroundColor_Blue : {
						_0 : {
							v : 123
						}
					},
					backgroundColor_Alpha : {
						_0 : {
							v : 0.5
						}
					}
				}
			},
			_1384131375 : {
				d : {
					o : {}
				},
				_1384131375 : {
					backgroundColor : {
						_0 : {
							v : "rgba(121,121,121,1)"
						}
					},
					backgroundColor_Red : {
						_0 : {
							v : 121
						}
					},
					backgroundColor_Green : {
						_0 : {
							v : 121
						}
					},
					backgroundColor_Blue : {
						_0 : {
							v : 121
						}
					},
					backgroundColor_Alpha : {
						_0 : {
							v : 1
						}
					}
				},
				_1384131445 : {
					backgroundColor : {
						_0 : {
							v : "rgba(121,121,121,1)"
						}
					},
					backgroundColor_Red : {
						_0 : {
							v : 121
						}
					},
					backgroundColor_Green : {
						_0 : {
							v : 121
						}
					},
					backgroundColor_Blue : {
						_0 : {
							v : 121
						}
					},
					backgroundColor_Alpha : {
						_0 : {
							v : 1
						}
					}
				}
			},
			_1384131445 : {
				d : {
					o : {}
				},
				_1384131445 : {
					backgroundColor : {
						_0 : {
							v : "rgba(121,121,121,1)"
						}
					},
					backgroundColor_Red : {
						_0 : {
							v : 121
						}
					},
					backgroundColor_Green : {
						_0 : {
							v : 121
						}
					},
					backgroundColor_Blue : {
						_0 : {
							v : 121
						}
					},
					backgroundColor_Alpha : {
						_0 : {
							v : 1
						}
					}
				}
			},
			_0764239314 : {
				d : {
					o : {}
				},
				_0764239314 : {
					borderWidth : {
						_0 : {
							v : 0
						}
					},
					backgroundImage : {
						_0 : {
							v : "https://lh3.googleusercontent.com/-eKVxcFPsz0g/Ub499xVBnhI/AAAAAAAAAtk/0TqqBw35deQ/s145/RedButton.jpg"
						}
					},
					backgroundPosition_X : {
						_0 : {
							v : null
						}
					},
					backgroundPosition_Y : {
						_0 : {
							v : null
						}
					},
					borderColor : {
						_0 : {
							v : "rgba(255,255,255,1)"
						}
					},
					borderColor_Red : {
						_0 : {
							v : 255
						}
					},
					borderColor_Green : {
						_0 : {
							v : 255
						}
					},
					borderColor_Blue : {
						_0 : {
							v : 255
						}
					},
					borderColor_Alpha : {
						_0 : {
							v : 1
						}
					}
				}
			},
			_1951907382 : {
				d : {
					o : {}
				},
				_0764239314 : {
					backgroundImage : {
						_0 : {
							v : "https://lh3.googleusercontent.com/-eKVxcFPsz0g/Ub499xVBnhI/AAAAAAAAAtk/0TqqBw35deQ/s145/RedButton.jpg"
						}
					}
				}
			}
		},
		active : {},
		preloadelement : {},
		preloadall : {},
		mouseover : {
			_1384131535 : {
				d : {
					o : {}
				},
				_1384131535 : {
					backgroundColor : {
						_0 : {
							v : "rgba(123,123,123,0.50)"
						}
					},
					backgroundColor_Red : {
						_0 : {
							v : 123
						}
					},
					backgroundColor_Green : {
						_0 : {
							v : 123
						}
					},
					backgroundColor_Blue : {
						_0 : {
							v : 123
						}
					},
					backgroundColor_Alpha : {
						_0 : {
							v : 0.5
						}
					}
				}
			},
			_1384131604 : {
				d : {
					o : {}
				},
				_1384131604 : {
					backgroundColor : {
						_0 : {
							v : "rgba(0,0,0,0.50)"
						}
					},
					backgroundColor_Red : {
						_0 : {
							v : 0
						}
					},
					backgroundColor_Green : {
						_0 : {
							v : 0
						}
					},
					backgroundColor_Blue : {
						_0 : {
							v : 0
						}
					},
					backgroundColor_Alpha : {
						_0 : {
							v : 0.5
						}
					},
					fontWeight : {
						_0 : {
							v : "bold"
						}
					}
				}
			},
			_1384131677 : {
				d : {
					o : {}
				},
				_1384131677 : {
					backgroundColor : {
						_0 : {
							v : "rgba(0,0,0,0.50)"
						}
					},
					backgroundColor_Red : {
						_0 : {
							v : 0
						}
					},
					backgroundColor_Green : {
						_0 : {
							v : 0
						}
					},
					backgroundColor_Blue : {
						_0 : {
							v : 0
						}
					},
					backgroundColor_Alpha : {
						_0 : {
							v : 0.5
						}
					},
					fontWeight : {
						_0 : {
							v : "bold"
						}
					}
				}
			},
			_1384131724 : {
				d : {
					o : {}
				},
				_1384131724 : {
					backgroundColor : {
						_0 : {
							v : "rgba(0,0,0,0.50)"
						}
					},
					backgroundColor_Red : {
						_0 : {
							v : 0
						}
					},
					backgroundColor_Green : {
						_0 : {
							v : 0
						}
					},
					backgroundColor_Blue : {
						_0 : {
							v : 0
						}
					},
					backgroundColor_Alpha : {
						_0 : {
							v : 0.5
						}
					},
					fontWeight : {
						_0 : {
							v : "bold"
						}
					}
				}
			},
			_1384131758 : {
				d : {
					o : {}
				},
				_1384131758 : {
					backgroundColor : {
						_0 : {
							v : "rgba(0,0,0,0.50)"
						}
					},
					backgroundColor_Red : {
						_0 : {
							v : 0
						}
					},
					backgroundColor_Green : {
						_0 : {
							v : 0
						}
					},
					backgroundColor_Blue : {
						_0 : {
							v : 0
						}
					},
					backgroundColor_Alpha : {
						_0 : {
							v : 0.5
						}
					},
					fontWeight : {
						_0 : {
							v : "bold"
						}
					}
				}
			},
			_1384131791 : {
				d : {
					o : {}
				},
				_1384131791 : {
					backgroundColor : {
						_0 : {
							v : "rgba(0,0,0,0.50)"
						}
					},
					backgroundColor_Red : {
						_0 : {
							v : 0
						}
					},
					backgroundColor_Green : {
						_0 : {
							v : 0
						}
					},
					backgroundColor_Blue : {
						_0 : {
							v : 0
						}
					},
					backgroundColor_Alpha : {
						_0 : {
							v : 0.5
						}
					},
					fontWeight : {
						_0 : {
							v : "bold"
						}
					}
				}
			},
			_1384131822 : {
				d : {
					o : {}
				},
				_1384131822 : {
					backgroundColor : {
						_0 : {
							v : "rgba(123,123,123,0.50)"
						}
					},
					backgroundColor_Red : {
						_0 : {
							v : 123
						}
					},
					backgroundColor_Green : {
						_0 : {
							v : 123
						}
					},
					backgroundColor_Blue : {
						_0 : {
							v : 123
						}
					},
					backgroundColor_Alpha : {
						_0 : {
							v : 0.5
						}
					}
				}
			},
			_1384131855 : {
				d : {
					o : {}
				},
				_1384131855 : {
					backgroundColor : {
						_0 : {
							v : "rgba(0,0,0,0.50)"
						}
					},
					backgroundColor_Red : {
						_0 : {
							v : 0
						}
					},
					backgroundColor_Green : {
						_0 : {
							v : 0
						}
					},
					backgroundColor_Blue : {
						_0 : {
							v : 0
						}
					},
					backgroundColor_Alpha : {
						_0 : {
							v : 0.5
						}
					},
					fontWeight : {
						_0 : {
							v : "bold"
						}
					}
				},
				_1384131901 : {
					backgroundColor : {
						_0 : {
							v : "rgba(124,124,124,0.80)"
						}
					},
					backgroundColor_Red : {
						_0 : {
							v : 124
						}
					},
					backgroundColor_Green : {
						_0 : {
							v : 124
						}
					},
					backgroundColor_Blue : {
						_0 : {
							v : 124
						}
					},
					backgroundColor_Alpha : {
						_0 : {
							v : 0.8
						}
					}
				},
				_1384131535 : {
					backgroundColor : {
						_0 : {
							v : "rgba(123,123,123,0.50)"
						}
					},
					backgroundColor_Red : {
						_0 : {
							v : 123
						}
					},
					backgroundColor_Green : {
						_0 : {
							v : 123
						}
					},
					backgroundColor_Blue : {
						_0 : {
							v : 123
						}
					},
					backgroundColor_Alpha : {
						_0 : {
							v : 0.5
						}
					}
				},
				_1384131822 : {
					backgroundColor : {
						_0 : {
							v : "rgba(123,123,123,0.50)"
						}
					},
					backgroundColor_Red : {
						_0 : {
							v : 123
						}
					},
					backgroundColor_Green : {
						_0 : {
							v : 123
						}
					},
					backgroundColor_Blue : {
						_0 : {
							v : 123
						}
					},
					backgroundColor_Alpha : {
						_0 : {
							v : 0.5
						}
					}
				}
			},
			_1384131901 : {
				d : {
					o : {}
				},
				_1384131901 : {
					backgroundColor : {
						_0 : {
							v : "rgba(0,0,0,0.50)"
						}
					},
					backgroundColor_Red : {
						_0 : {
							v : 0
						}
					},
					backgroundColor_Green : {
						_0 : {
							v : 0
						}
					},
					backgroundColor_Blue : {
						_0 : {
							v : 0
						}
					},
					backgroundColor_Alpha : {
						_0 : {
							v : 0.5
						}
					},
					fontWeight : {
						_0 : {
							v : "bold"
						}
					}
				}
			},
			_1384131932 : {
				d : {
					o : {}
				},
				_1384131932 : {
					backgroundColor : {
						_0 : {
							v : "rgba(0,0,0,0.50)"
						}
					},
					backgroundColor_Red : {
						_0 : {
							v : 0
						}
					},
					backgroundColor_Green : {
						_0 : {
							v : 0
						}
					},
					backgroundColor_Blue : {
						_0 : {
							v : 0
						}
					},
					backgroundColor_Alpha : {
						_0 : {
							v : 0.5
						}
					},
					fontWeight : {
						_0 : {
							v : "bold"
						}
					}
				}
			},
			_1384131965 : {
				d : {
					o : {}
				},
				_1384131965 : {
					backgroundColor : {
						_0 : {
							v : "rgba(0,0,0,0.50)"
						}
					},
					backgroundColor_Red : {
						_0 : {
							v : 0
						}
					},
					backgroundColor_Green : {
						_0 : {
							v : 0
						}
					},
					backgroundColor_Blue : {
						_0 : {
							v : 0
						}
					},
					backgroundColor_Alpha : {
						_0 : {
							v : 0.5
						}
					},
					fontWeight : {
						_0 : {
							v : "bold"
						}
					}
				}
			},
			_1384131997 : {
				d : {
					o : {}
				},
				_1384131997 : {
					backgroundColor : {
						_0 : {
							v : "rgba(0,0,0,0.50)"
						}
					},
					backgroundColor_Red : {
						_0 : {
							v : 0
						}
					},
					backgroundColor_Green : {
						_0 : {
							v : 0
						}
					},
					backgroundColor_Blue : {
						_0 : {
							v : 0
						}
					},
					backgroundColor_Alpha : {
						_0 : {
							v : 0.5
						}
					},
					fontWeight : {
						_0 : {
							v : "bold"
						}
					}
				}
			},
			_1951907382 : {
				d : {
					o : {}
				},
				_0764239314 : {
					cursor : {
						_0 : {
							v : "pointer"
						}
					}
				}
			},
			_1384131375 : {
				d : {
					o : {}
				},
				_1384131445 : {
					backgroundColor : {
						_0 : {
							v : "rgba(121,121,121,1)"
						}
					},
					backgroundColor_Red : {
						_0 : {
							v : 121
						}
					},
					backgroundColor_Green : {
						_0 : {
							v : 121
						}
					},
					backgroundColor_Blue : {
						_0 : {
							v : 121
						}
					},
					backgroundColor_Alpha : {
						_0 : {
							v : 1
						}
					}
				},
				_1384131375 : {
					backgroundColor : {
						_0 : {
							v : "rgba(69,69,69,1)"
						}
					},
					backgroundColor_Red : {
						_0 : {
							v : 69
						}
					},
					backgroundColor_Green : {
						_0 : {
							v : 69
						}
					},
					backgroundColor_Blue : {
						_0 : {
							v : 69
						}
					},
					backgroundColor_Alpha : {
						_0 : {
							v : 1
						}
					}
				}
			},
			_1384131445 : {
				d : {
					o : {}
				},
				_1384131445 : {
					backgroundColor : {
						_0 : {
							v : "rgba(81,81,81,1)"
						}
					},
					backgroundColor_Red : {
						_0 : {
							v : 81
						}
					},
					backgroundColor_Green : {
						_0 : {
							v : 81
						}
					},
					backgroundColor_Blue : {
						_0 : {
							v : 81
						}
					},
					backgroundColor_Alpha : {
						_0 : {
							v : 1
						}
					}
				}
			},
			_0764239314 : {
				d : {
					o : {}
				},
				_0764239314 : {
					borderWidth : {
						_0 : {
							v : 2
						}
					},
					backgroundImage : {
						_0 : {
							v : "https://lh6.googleusercontent.com/-GMY4PnfS6B8/Ub4947eM1KI/AAAAAAAAAtc/HGrLZ3VULd4/s145/RedButton_Over.jpg"
						}
					}
				}
			}
		},
		mouseover_nfClass_nf_hoverMenu : {},
		mouseout : {
			_1384131535 : {
				d : {
					o : {}
				},
				_1384131535 : {
					backgroundColor : {
						_0 : {
							v : "rgba(123,123,123,0.50)"
						}
					},
					backgroundColor_Red : {
						_0 : {
							v : 123
						}
					},
					backgroundColor_Green : {
						_0 : {
							v : 123
						}
					},
					backgroundColor_Blue : {
						_0 : {
							v : 123
						}
					},
					backgroundColor_Alpha : {
						_0 : {
							v : 0.5
						}
					}
				}
			},
			_1384131604 : {
				d : {
					o : {}
				},
				_1384131604 : {
					backgroundColor : {
						_0 : {
							v : "rgba(125,125,125,0.80)"
						}
					},
					backgroundColor_Red : {
						_0 : {
							v : 125
						}
					},
					backgroundColor_Green : {
						_0 : {
							v : 125
						}
					},
					backgroundColor_Blue : {
						_0 : {
							v : 125
						}
					},
					backgroundColor_Alpha : {
						_0 : {
							v : 0.8
						}
					},
					fontWeight : {
						_0 : {
							v : "normal"
						}
					}
				}
			},
			_1384131677 : {
				d : {
					o : {}
				},
				_1384131677 : {
					backgroundColor : {
						_0 : {
							v : "rgba(125,125,125,0.80)"
						}
					},
					backgroundColor_Red : {
						_0 : {
							v : 125
						}
					},
					backgroundColor_Green : {
						_0 : {
							v : 125
						}
					},
					backgroundColor_Blue : {
						_0 : {
							v : 125
						}
					},
					backgroundColor_Alpha : {
						_0 : {
							v : 0.8
						}
					},
					fontWeight : {
						_0 : {
							v : "normal"
						}
					}
				}
			},
			_1384131724 : {
				d : {
					o : {}
				},
				_1384131724 : {
					backgroundColor : {
						_0 : {
							v : "rgba(125,125,125,0.80)"
						}
					},
					backgroundColor_Red : {
						_0 : {
							v : 125
						}
					},
					backgroundColor_Green : {
						_0 : {
							v : 125
						}
					},
					backgroundColor_Blue : {
						_0 : {
							v : 125
						}
					},
					backgroundColor_Alpha : {
						_0 : {
							v : 0.8
						}
					},
					fontWeight : {
						_0 : {
							v : "normal"
						}
					}
				}
			},
			_1384131758 : {
				d : {
					o : {}
				},
				_1384131758 : {
					backgroundColor : {
						_0 : {
							v : "rgba(125,125,125,0.80)"
						}
					},
					backgroundColor_Red : {
						_0 : {
							v : 125
						}
					},
					backgroundColor_Green : {
						_0 : {
							v : 125
						}
					},
					backgroundColor_Blue : {
						_0 : {
							v : 125
						}
					},
					backgroundColor_Alpha : {
						_0 : {
							v : 0.8
						}
					},
					fontWeight : {
						_0 : {
							v : "normal"
						}
					}
				}
			},
			_1384131791 : {
				d : {
					o : {}
				},
				_1384131791 : {
					backgroundColor : {
						_0 : {
							v : "rgba(125,125,125,0.80)"
						}
					},
					backgroundColor_Red : {
						_0 : {
							v : 125
						}
					},
					backgroundColor_Green : {
						_0 : {
							v : 125
						}
					},
					backgroundColor_Blue : {
						_0 : {
							v : 125
						}
					},
					backgroundColor_Alpha : {
						_0 : {
							v : 0.8
						}
					},
					fontWeight : {
						_0 : {
							v : "normal"
						}
					}
				}
			},
			_1384131822 : {
				d : {
					o : {}
				},
				_1384131822 : {
					backgroundColor : {
						_0 : {
							v : "rgba(123,123,123,0.50)"
						}
					},
					backgroundColor_Red : {
						_0 : {
							v : 123
						}
					},
					backgroundColor_Green : {
						_0 : {
							v : 123
						}
					},
					backgroundColor_Blue : {
						_0 : {
							v : 123
						}
					},
					backgroundColor_Alpha : {
						_0 : {
							v : 0.5
						}
					}
				}
			},
			_1384131855 : {
				d : {
					o : {}
				},
				_1384131855 : {
					backgroundColor : {
						_0 : {
							v : "rgba(124,124,124,0.80)"
						}
					},
					backgroundColor_Red : {
						_0 : {
							v : 124
						}
					},
					backgroundColor_Green : {
						_0 : {
							v : 124
						}
					},
					backgroundColor_Blue : {
						_0 : {
							v : 124
						}
					},
					backgroundColor_Alpha : {
						_0 : {
							v : 0.8
						}
					},
					fontWeight : {
						_0 : {
							v : "normal"
						}
					},
					opacity : {
						_0 : {
							v : null
						}
					},
					textDecoration : {
						_0 : {
							v : "none"
						}
					}
				},
				_1384131901 : {
					fontWeight : {
						_0 : {
							v : "normal"
						}
					}
				},
				_1384131822 : {
					backgroundColor : {
						_0 : {
							v : "rgba(123,123,123,0.50)"
						}
					},
					backgroundColor_Red : {
						_0 : {
							v : 123
						}
					},
					backgroundColor_Green : {
						_0 : {
							v : 123
						}
					},
					backgroundColor_Blue : {
						_0 : {
							v : 123
						}
					},
					backgroundColor_Alpha : {
						_0 : {
							v : 0.5
						}
					}
				},
				_1384131535 : {
					backgroundColor : {
						_0 : {
							v : "rgba(123,123,123,0.50)"
						}
					},
					backgroundColor_Red : {
						_0 : {
							v : 123
						}
					},
					backgroundColor_Green : {
						_0 : {
							v : 123
						}
					},
					backgroundColor_Blue : {
						_0 : {
							v : 123
						}
					},
					backgroundColor_Alpha : {
						_0 : {
							v : 0.5
						}
					}
				}
			},
			_1384131901 : {
				d : {
					o : {}
				},
				_1384131901 : {
					backgroundColor : {
						_0 : {
							v : "rgba(125,125,125,0.80)"
						}
					},
					backgroundColor_Red : {
						_0 : {
							v : 125
						}
					},
					backgroundColor_Green : {
						_0 : {
							v : 125
						}
					},
					backgroundColor_Blue : {
						_0 : {
							v : 125
						}
					},
					backgroundColor_Alpha : {
						_0 : {
							v : 0.8
						}
					},
					fontWeight : {
						_0 : {
							v : "normal"
						}
					}
				}
			},
			_1384131932 : {
				d : {
					o : {}
				},
				_1384131932 : {
					backgroundColor : {
						_0 : {
							v : "rgba(125,125,125,0.80)"
						}
					},
					backgroundColor_Red : {
						_0 : {
							v : 125
						}
					},
					backgroundColor_Green : {
						_0 : {
							v : 125
						}
					},
					backgroundColor_Blue : {
						_0 : {
							v : 125
						}
					},
					backgroundColor_Alpha : {
						_0 : {
							v : 0.8
						}
					},
					fontWeight : {
						_0 : {
							v : "normal"
						}
					}
				}
			},
			_1384131965 : {
				d : {
					o : {}
				},
				_1384131965 : {
					backgroundColor : {
						_0 : {
							v : "rgba(125,125,125,0.80)"
						}
					},
					backgroundColor_Red : {
						_0 : {
							v : 125
						}
					},
					backgroundColor_Green : {
						_0 : {
							v : 125
						}
					},
					backgroundColor_Blue : {
						_0 : {
							v : 125
						}
					},
					backgroundColor_Alpha : {
						_0 : {
							v : 0.8
						}
					},
					fontWeight : {
						_0 : {
							v : "normal"
						}
					}
				}
			},
			_1384131997 : {
				d : {
					o : {}
				},
				_1384131997 : {
					backgroundColor : {
						_0 : {
							v : "rgba(125,125,125,0.80)"
						}
					},
					backgroundColor_Red : {
						_0 : {
							v : 125
						}
					},
					backgroundColor_Green : {
						_0 : {
							v : 125
						}
					},
					backgroundColor_Blue : {
						_0 : {
							v : 125
						}
					},
					backgroundColor_Alpha : {
						_0 : {
							v : 0.8
						}
					},
					fontWeight : {
						_0 : {
							v : "normal"
						}
					}
				}
			},
			_1384131375 : {
				d : {
					o : {}
				},
				_1384131375 : {
					backgroundColor : {
						_0 : {
							v : "rgba(121,121,121,1)"
						}
					},
					backgroundColor_Red : {
						_0 : {
							v : 121
						}
					},
					backgroundColor_Green : {
						_0 : {
							v : 121
						}
					},
					backgroundColor_Blue : {
						_0 : {
							v : 121
						}
					},
					backgroundColor_Alpha : {
						_0 : {
							v : 1
						}
					}
				},
				_1384131445 : {
					backgroundColor : {
						_0 : {
							v : "rgba(121,121,121,1)"
						}
					},
					backgroundColor_Red : {
						_0 : {
							v : 121
						}
					},
					backgroundColor_Green : {
						_0 : {
							v : 121
						}
					},
					backgroundColor_Blue : {
						_0 : {
							v : 121
						}
					},
					backgroundColor_Alpha : {
						_0 : {
							v : 1
						}
					}
				}
			},
			_1384131445 : {
				d : {
					o : {}
				},
				_1384131445 : {
					backgroundColor : {
						_0 : {
							v : "rgba(121,121,121,1)"
						}
					},
					backgroundColor_Red : {
						_0 : {
							v : 121
						}
					},
					backgroundColor_Green : {
						_0 : {
							v : 121
						}
					},
					backgroundColor_Blue : {
						_0 : {
							v : 121
						}
					},
					backgroundColor_Alpha : {
						_0 : {
							v : 1
						}
					}
				}
			},
			_0764239314 : {
				d : {
					o : {}
				},
				_0764239314 : {
					borderWidth : {
						_0 : {
							v : 0
						}
					},
					backgroundImage : {
						_0 : {
							v : "https://lh3.googleusercontent.com/-eKVxcFPsz0g/Ub499xVBnhI/AAAAAAAAAtk/0TqqBw35deQ/s145/RedButton.jpg"
						}
					},
					backgroundPosition_X : {
						_0 : {
							v : null
						}
					},
					backgroundPosition_Y : {
						_0 : {
							v : null
						}
					}
				}
			}
		},
		click : {
			_0764239314 : {
				d : {
					o : {}
				},
				_0764239314 : {
					backgroundImage : {
						_0 : {
							v : "https://lh5.googleusercontent.com/-QqgJLmh2wIY/Ub4_004TAmI/AAAAAAAAAt8/JwpF0r8EjZE/s145/BlackButton.jpg"
						}
					},
					borderWidth : {
						_0 : {
							v : 3
						}
					},
					borderColor : {
						_0 : {
							v : "rgba(255,247,247,1)"
						}
					},
					borderColor_Red : {
						_0 : {
							v : 255
						}
					},
					borderColor_Green : {
						_0 : {
							v : 247
						}
					},
					borderColor_Blue : {
						_0 : {
							v : 247
						}
					},
					borderColor_Alpha : {
						_0 : {
							v : 1
						}
					},
					backgroundPosition_X : {
						_0 : {
							v : null
						}
					},
					backgroundPosition_Y : {
						_0 : {
							v : null
						}
					}
				}
			}
		},
		mousedown : {
			_0764239314 : {
				d : {
					o : {}
				},
				_0764239314 : {
					borderWidth : {
						_0 : {
							v : 5
						}
					},
					borderColor : {
						_0 : {
							v : "rgba(255,247,247,1)"
						}
					},
					borderColor_Red : {
						_0 : {
							v : 255
						}
					},
					borderColor_Green : {
						_0 : {
							v : 247
						}
					},
					borderColor_Blue : {
						_0 : {
							v : 247
						}
					},
					borderColor_Alpha : {
						_0 : {
							v : 1
						}
					}
				}
			}
		},
		mousehold : {
			_0764239314 : {
				d : {
					o : {}
				},
				_0764239314 : {
					borderWidth : {
						_0 : {
							v : 5
						}
					},
					borderColor : {
						_0 : {
							v : "rgba(255,247,247,1)"
						}
					},
					borderColor_Red : {
						_0 : {
							v : 255
						}
					},
					borderColor_Green : {
						_0 : {
							v : 247
						}
					},
					borderColor_Blue : {
						_0 : {
							v : 247
						}
					},
					borderColor_Alpha : {
						_0 : {
							v : 1
						}
					}
				}
			}
		}
	}
};

