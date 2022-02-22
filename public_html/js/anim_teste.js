/**
 * @author Paulo Godinho
 */

var NF = new _NF;
function _NF() {
	Array.prototype.NFisArray = 1
}
_NF.prototype._util = function() {
	function m() {
		function d(a) {
			return RegExp("\\b" + a + "\\b", "g")
		}

		var c = this;
		c.addClass = c.aC = function(a, b) {
			var e;
			if (a && "string" == typeof ( e = a.className) && 0 > e.search(d(b)))
				return a.className += ( e ? " " : "") + b, a.className = a.className.replace(/\s{2,}/g, " "), !0
		};
		c.removeClass = c.rC = function(a, b) {
			if (a && "string" == typeof a.className) {
				var e = a.className;
				a.className = a.className.replace(d(b), "");
				return e != a.className
			}
		};
		c.hasClass = c.hC = function(a, b, e) {
			b.NFisArray || ( b = [b]);
			var c, f = 0, x = b.length;
			if (a && ( c = a.className)) {
				for ( a = 0; a < x; a++)
					if (d(b[a]).test(c)) {
						if (!e || 1 == x)
							return b[a];
						f++
					}
				if (e && f == x)
					return b
			}
		};
		c.isDescendant = c.iD = function(a, b) {
			if (a && b)
				for (; b = b.parentNode; )
					if (b == a)
						return !0
		};
		c.isRelation = function(a, b) {
			if (a && b) {
				if (c.iD(a, b))
					return "ancestor";
				if (c.iD(b, a))
					return "descendant"
			}
		};
		c.getChild = function(a, b, e, g) {
			for (var f = 0, d, a = a.childNodes, i = 0; i < a.length; i++)
				if (!e || e && c.hC(a[i], e, g))
					if (f++, "first-child" == b) {
						d = a[i];
						break
					} else
						"last-child" == b ? d = a[i] : "number" == typeof b && b == f && ( d = a[i]);
			return d
		};
		c.getElementsByAttribute = function(a, b) {
			for (var e = [], c = a.getElementsByTagName("*"), f = 0; f < c.length; f++)
				c[f].getAttribute(b) && e.push(c[f]);
			return e
		};
		c.getElementsByClassName = c.getNodesByClassName = c.gEBCN = function(a, b, e, g) {
			var f = [];
			if (a.getElementsByClassName)
				for (var b = a.getElementsByClassName(b), d = 0; d < b.length; d++)
					(!g || g && b[d].parentNode == a) && f.push(b[d]);
			else if (a.getElementsByTagName)
				for (var i = a.getElementsByTagName("*"), d = 0; d < i.length; d++)
					c.hC(i[d], b.split(" "), !0) && (!g || g && i[d].parentNode == a) && f.push(i[d]);
			return e && f.length ? f[0] : f || []
		};
		c.getElementsFromCoordinates = function(a, b, e, g, f) {
			for (var d = [], i = 0; i < a.length; i++)
				if (!a[i][f]) {
					var n = c.getLocation(a[i]), h = n.x + a[i].offsetWidth, C = n.y + a[i].offsetHeight;
					if (b && !e && b.x > n.x && b.x < h && b.y > n.y && b.y < C)
						d.push(a[i]);
					else {
						var q;
						if ( q = b)
							if ( q = e) {
								q = n.x;
								var D = n.y, I = C, j = e.x, u = b.y, J = e.y;
								q = !(b.x > h || j < q || u > I || J < D)
							}
						q && (g && b.x < n.x || e.x > h || b.y < n.y || e.y > C) && d.push(a[i])
					}
				}
			return d
		};
		c.getFirstAncestorByClassName = c.gFPN = function(a, b, e) {
			for (; a = a.parentNode; ) {
				if (NF.u.d.hC(a, b))
					return a;
				if (e && NF.u.d.hC(a, e))
					return !1
			}
		};
		c.getFirstDecendantByClassName = c.gFD = function(a, b, e) {
			var c = b;
			if (c) {
				c.NFisArray || ( c = [b]);
				if (e && NF.u.d.hC(a, c))
					return a;
				for ( b = 0; b < c.length; b++)
					if ( e = NF.u.d.gEBCN(a, c[b], !0))
						return e
			}
		};
		c.getSibling = function(a, b, e, g, f) {
			for (; a = a[b + "Sibling"]; ) {
				if (!e && !g)
					return a;
				if (e && c.hC(a, e) || g && a.tagName.toLowerCase() == g.toLowerCase())
					if (!f || f(a))
						return a
			}
		};
		c.createNodeFromHTML = function(a) {
			if (a) {
				var b = document.createElement("DIV");
				b.innerHTML = a;
				a = b.childNodes[0];
				if (a.tagName)
					return a
			}
		};
		c.addNode = function(a, b, e) {
			a = a.split("-");
			if ("child" == a[1])
				return "replace" == a[0] && c.removeChildren(e), c.addChild(a[0], b, e);
			if (a[1] && 0 == a[1].indexOf(".")) {
				var g = c.getChild(e, "last-child", a[1].substring(1));
				if (g)
					e = g;
				else
					return c.addChild(a[2] || "", b, e)
			}
			b = e.parentNode.insertBefore(b, "after" == a[0] ? e.nextSibling : e);
			"replace" == a[0] && e.parentNode.removeChild(e);
			return b
		};
		c.addChild = function(a, b, e) {
			var c;
			return a.match("first") && ( c = e.childNodes).length ? e.insertBefore(b, c[0]) : e.appendChild(b)
		};
		c.removeChildren = function(a, b) {
			for (var e = [], g = a.childNodes, f = 0; f < g.length; f++)
				if (!b || c.hC(g[f], b))
					e.push(a.removeChild(g[f])), f--;
			return e
		};
		c.moveNode = function(a, b) {
			a.NFisArray || ( a = [a]);
			for (var e = [], c = 0; c < a.length; c++)
				e.push(b.appendChild(a[c].parentNode.removeChild(a[c])));
			return e
		};
		c.removeNode = function(a) {
			a.NFisArray || ( a = [a]);
			for (var b = [], e = 0; e < a.length; e++)
				b.push(a[e].parentNode.removeChild(a[e]));
			return b
		};
		c.wrapNode = function(a, b, e) {
			if (b)
				return b = "string" == typeof b ? c.createNodeFromHTML(b) : b, e || ( e = b), c.removeChildren(e), e.appendChild(a.parentNode.replaceChild(b, a)), b
		};
		c.unwrapNode = function(a, b) {
			return a.parentNode.replaceChild(b, a)
		};
		c.getDimensions = function(a) {
			var b = 0, e = 0;
			a.getBoundingClientRect ? ( a = a.getBoundingClientRect(), b = a.right - a.left, e = a.bottom - a.top) : ( b = a.offsetWidth, e = a.offsetHeight);
			return {
				x : b,
				y : e,
				width : b,
				height : e,
				w : b,
				h : e
			}
		};
		c.getLocation = function(a, b) {
			var e = 0, c = 0;
			if (a.getBoundingClientRect) {
				var c = a.getBoundingClientRect(), f = b ? b.getBoundingClientRect() : {
					top : 0,
					left : 0
				}, d = e = 0;
				b && ( e = b.clientTop, d = b.clientLeft);
				e = c.top - f.top - e;
				c = c.left - f.left - d
			}
			return {
				top : e,
				left : c,
				x : c,
				y : e
			}
		};
		c.getFullOffset = function(a, b) {
			var e = {
				x : 0,
				y : 0
			}, c = 0;
			do !NF.u.browser.firefox && c && (e.x += a.clientLeft, e.y += a.clientTop), e.x += a.offsetLeft - (a.scrollLeft || 0), e.y += a.offsetTop - (a.scrollTop || 0), c++;
			while(a=a.offsetParent);
			if (b) {
				NF.u.browser.firefox && (e.x -= b.clientLeft, e.y -= b.clientTop);
				do NF.u.browser.firefox || (e.x -= b.clientLeft, e.y -= b.clientTop), e.x -= b.offsetLeft - (b.scrollLeft || 0), e.y -= b.offsetTop - (b.scrollTop || 0);
				while(b=b.offsetParent)
			}
			return e
		};
		c.getOffsets = function(a, b) {
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

	function h() {
		this.getBrowserSpecifcStyleName = function(d) {
			var c = d, a = "";
			if (NF.util.browser.ie8Down)
				c = "";
			else {
				for (var b = document.createElement("DIV"), e = " Moz Webkit ms O Khtml".split(" "), g = " -moz- -webkit- -ms- -o- -khtml-".split(" "), f = 0; f < e.length; f++)
					if ( c = e[f], c += !e[f] ? d : NF.util.string.capitalize(d), "undefined" != typeof b.style[c]) {
						a = g[f];
						break
					}
				delete b
			}
			return {
				styleName : c,
				cssPrefix : a
			}
		};
		this.getBrowserSpecifcCSSPrefix = function() {
			var d = "", c = NF.util.browser;
			c.firefox ? d = "-moz-" : c.chrome || c.safari ? d = "-webkit-" : c.opera ? d = "-o-" : c.ie && ( d = "-ms-");
			return d
		};
		this.getComputedStyle = this.gCS = function(d, c, a) {
			if (d)
				try {
					var b;
					if (( b = document.defaultView) && ( b = b.getComputedStyle))
						return b(d, null).getPropertyValue(c);
					if ( b = d.currentStyle)
						return b[a]
				} catch(e) {
					return null
				}
		}
	}

	function s() {
		var d = navigator.userAgent, c = d.toLowerCase();
		this.smallMobile = (this.mobile = c.indexOf("mobile") + 1) && 1 < window.devicePixelRatio;
		this.ipad = c.indexOf("ipad") + 1;
		this.ios = c.indexOf("like mac") + 1;
		this.android = c.indexOf("android") + 1;
		this.ie7 = (this.ie = d.indexOf("MSIE") + 1) && d.indexOf("MSIE 7") + 1;
		this.ie8 = this.ie && d.indexOf("MSIE 8") + 1;
		this.ie9 = this.ie && d.indexOf("MSIE 9") + 1;
		this.ie9Up = this.ie && d.indexOf("MSIE 1") + 1 || this.ie9;
		this.ie6Down = this.ie && !window.XMLHttpRequest;
		this.ie7Down = this.ie7 || this.ie6Down;
		this.ie8Down = this.ie8 || this.ie7Down;
		this.ie9Down = this.ie9 || this.ie8Down;
		this.firefox = c.indexOf("firefox") + 1;
		this.chrome = c.indexOf("chrome") + 1;
		this.safari = !this.chrome && c.indexOf("safari") + 1;
		this.opera = c.indexOf("opera") + 1;
		this.webkit = c.indexOf("webkit") + 1;
		this.no3d = this.ie9Down || this.opera;
		this.noCSS3 = this.ie8Down;
		this.hasStyle = function(a) {
			for (var b = document.createElement("DIV"), e = " Moz Webkit ms O Khtml".split(" "), c = 0; c < e.length; c++)
				if (null != b.style[e[c] + (e[c] ? a : NF.u.string.capitalize(a))])
					return !0
		}
	}

	function p() {
		function d(a) {
			NF.u.browser.opera || NF.u.browser.firefox || NF.u.browser.ie9Up || NF.u.browser.webkit ? document.addEventListener("DOMContentLoaded", a, !1) : NF.u.browser.ie ? (document.write("<scr" + "ipt id='NFreadytest' type='text/javascr" + "ipt' defer='defer' src='javascr" + "ipt:void(0)'><\/scr" + "ipt>"), document.getElementById("NFreadytest").onreadystatechange = function() {
				"complete" == this.readyState && NF.u.e.fire(document, "ready")
			}) : setTimeout(function() {
				NF.u.e.fire(document, "ready")
			}, 1E3)
		}

		var c = this;
		c.addListener = function(a, b, e) {
			if (a) {
				a.NFisArray || ( a = [a]);
				for (var c = 0; c < a.length; c++) {
					b && !b.NFisArray && ( b = [b]);
					for (var f = 0; f < b.length; f++) {
						var h;
						if (!( h = a[c].NF_eventStore))
							h = a[c].NF_eventStore = new NF.util.eventStore(a[c]);
						h.addEvent(b[f], e);
						"ready" == b[f] && d(e)
					}
				}
			}
		};
		c.addDomListener = function(a, b, c, g, f) {
			if ("ready" == b)
				NF.u.e.addListener(document, b, c);
			else {
				g && ( c = function(b) {
					a[g](b)
				});
				b.NFisArray || ( b = [b]);
				for (var d = 0; d < b.length; d++)
					a.addEventListener ? a.addEventListener(b[d], c, f) : a.attachEvent && a.attachEvent("on" + b[d], c)
			}
		};
		c.addDomListener(window, "load", function() {
			c.loaded = !0
		});
		c.removeDomListener = function(a, b, c) {
			b.NFisArray || ( b = [b]);
			for (var g = 0; g < b.length; g++)
				a.removeEventListener ? a.removeEventListener(b[g], c) : a.detachEvent && a.detachEvent("on" + b[g], c)
		};
		c.fire = function(a, b, c) {
			var g = a.NF_eventStore;
			if (g)
				return c ? c.NFisArray ? "object" != typeof c[0] && (c[0] = {}) : c = [c] : c = [{}], c[0].type = b, c[0].target = a, g.fire(b, c)
		};
		c.bubbleSkip = function(a, b, e) {
			c.stopPropogation(a);
			e && a.type != e || ( e = document.createEvent("Event"), e.initEvent(a.type, !0, !0), b.dispatchEvent(e))
		};
		c.stopPropogation = function(a, b) {
			if (a)
				return a.cancelBubble = !0, a.stopPropagation && a.stopPropagation(), b && a.preventDefault && a.preventDefault(), !1
		};
		c.preventDefault = function(a) {
			a && (a.preventDefault && a.preventDefault(), a.returnValue = !1)
		}
	}

	function l() {
		function d() {
			this._linear = {
				_ : function(a, b, c, g) {
					return c * a / g + b
				}
			};
			this.css_linear = {
				_ : "0.250, 0.250, 0.750, 0.750"
			};
			this._in = {
				quadratic : function(a, b, c, g) {
					return c * (a /= g) * a + b
				},
				cubic : function(a, b, c, g) {
					return c * (a /= g) * a * a + b
				},
				quartic : function(a, b, c, g) {
					return c * (a /= g) * a * a * a + b
				},
				quintic : function(a, b, c, g) {
					return c * (a /= g) * a * a * a * a + b
				},
				sinusoidal : function(a, b, c, g) {
					return -c * Math.cos(a / g * (Math.PI / 2)) + c + b
				},
				exponential : function(a, b, c, g) {
					return 0 == a ? b : c * Math.pow(2, 10 * (a / g - 1)) + b
				},
				circular : function(a, b, c, g) {
					return -c * (Math.sqrt(1 - (a /= g) * a) - 1) + b
				},
				elastic : function(a, b, c, g, f, d) {
					f = 0;
					if (0 == a)
						return b;
					if (1 == (a /= g))
						return b + c;
					d || ( d = 0.3 * g);
					f < Math.abs(c) ? ( f = c, c = d / 4) : c = d / (2 * Math.PI) * Math.asin(c / f);
					return -(f * Math.pow(2, 10 * (a -= 1)) * Math.sin((a * g - c) * 2 * Math.PI / d)) + b
				},
				back : function(a, b, c, g, f) {
					void 0 == f && ( f = 1.70158);
					return c * (a /= g) * a * ((f + 1) * a - f) + b
				},
				bounce : function(a, b, c, g) {
					return c - NF.u.a.ease._out.bounce(g - a, 0, c, g) + b
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
				quadratic : function(a, b, c, g) {
					return -c * (a /= g) * (a - 2) + b
				},
				cubic : function(a, b, c, g) {
					return c * (( a = a / g - 1) * a * a + 1) + b
				},
				quartic : function(a, b, c, g) {
					return -c * (( a = a / g - 1) * a * a * a - 1) + b
				},
				quintic : function(a, b, c, g) {
					return c * (( a = a / g - 1) * a * a * a * a + 1) + b
				},
				sinusoidal : function(a, b, c, g) {
					return c * Math.sin(a / g * (Math.PI / 2)) + b
				},
				exponential : function(a, b, c, g) {
					return a == g ? b + c : c * (-Math.pow(2, -10 * a / g) + 1) + b
				},
				circular : function(a, b, c, g) {
					return c * Math.sqrt(1 - ( a = a / g - 1) * a) + b
				},
				elastic : function(a, b, c, g, f, d) {
					f = 0;
					if (0 == a)
						return b;
					if (1 == (a /= g))
						return b + c;
					d || ( d = 0.3 * g);
					if (f < Math.abs(c))
						var f = c, i = d / 4;
					else
						i = d / (2 * Math.PI) * Math.asin(c / f);
					return f * Math.pow(2, -10 * a) * Math.sin((a * g - i) * 2 * Math.PI / d) + c + b
				},
				back : function(a, b, c, g, f) {
					void 0 == f && ( f = 1.70158);
					return c * (( a = a / g - 1) * a * ((f + 1) * a + f) + 1) + b
				},
				bounce : function(a, b, c, g) {
					return (a /= g) < 1 / 2.75 ? c * 7.5625 * a * a + b : a < 2 / 2.75 ? c * (7.5625 * (a -= 1.5 / 2.75) * a + 0.75) + b : a < 2.5 / 2.75 ? c * (7.5625 * (a -= 2.25 / 2.75) * a + 0.9375) + b : c * (7.5625 * (a -= 2.625 / 2.75) * a + 0.984375) + b
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
				quadratic : function(a, b, c, g) {
					return 1 > (a /= g / 2) ? c / 2 * a * a + b : -c / 2 * (--a * (a - 2) - 1) + b
				},
				cubic : function(a, b, c, g) {
					return 1 > (a /= g / 2) ? c / 2 * a * a * a + b : c / 2 * ((a -= 2) * a * a + 2) + b
				},
				quartic : function(a, b, c, g) {
					return 1 > (a /= g / 2) ? c / 2 * a * a * a * a + b : -c / 2 * ((a -= 2) * a * a * a - 2) + b
				},
				quintic : function(a, b, c, g) {
					return 1 > (a /= g / 2) ? c / 2 * a * a * a * a * a + b : c / 2 * ((a -= 2) * a * a * a * a + 2) + b
				},
				sinusoidal : function(a, b, c, g) {
					return -c / 2 * (Math.cos(Math.PI * a / g) - 1) + b
				},
				exponential : function(a, b, c, g) {
					return 0 == a ? b : a == g ? b + c : 1 > (a /= g / 2) ? c / 2 * Math.pow(2, 10 * (a - 1)) + b : c / 2 * (-Math.pow(2, -10 * --a) + 2) + b
				},
				circular : function(a, b, c, g) {
					return 1 > (a /= g / 2) ? -c / 2 * (Math.sqrt(1 - a * a) - 1) + b : c / 2 * (Math.sqrt(1 - (a -= 2) * a) + 1) + b
				},
				elastic : function(a, b, c, g, f, d) {
					f = 0;
					if (0 == a)
						return b;
					if (2 == (a /= g / 2))
						return b + c;
					d || ( d = g * 0.3 * 1.5);
					if (f < Math.abs(c))
						var f = c, i = d / 4;
					else
						i = d / (2 * Math.PI) * Math.asin(c / f);
					return 1 > a ? -0.5 * f * Math.pow(2, 10 * (a -= 1)) * Math.sin((a * g - i) * 2 * Math.PI / d) + b : 0.5 * f * Math.pow(2, -10 * (a -= 1)) * Math.sin((a * g - i) * 2 * Math.PI / d) + c + b
				},
				back : function(a, b, c, g, f) {
					void 0 == f && ( f = 1.70158);
					return 1 > (a /= g / 2) ? c / 2 * a * a * (((f *= 1.525) + 1) * a - f) + b : c / 2 * ((a -= 2) * a * (((f *= 1.525) + 1) * a + f) + 2) + b
				},
				bounce : function(a, b, c, g) {
					return a < g / 2 ? 0.5 * NF.u.a.ease._in.bounce(2 * a, 0, c, g) + b : 0.5 * NF.u.a.ease._out.bounce(2 * a - g, 0, c, g) + 0.5 * c + b
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

		var c = this;
		this.tween = function(a) {
			var b = parseFloat(a.startValue), e = parseFloat(a.endValue), g = a.frameDistance;
			return b == e || isNaN(b) || isNaN(e) || 0 == g ? a.startValue : c.ease["_"+a.ease.direction][a.ease.type](a.framePos - a.startFrame, b, e - b, g)
		};
		d.prototype = this;
		this.ease = new d
	}
	this.string = new function(){this.capitalize=function(d){if(0<d.length)return d.substring(0,1).toUpperCase()+d.substring(1)};this.generateUniqueId=function(d){var c=((new Date).getTime()+"").substring(3);return d+"_"+c}};
	this.object = new function(){var d=this;this.clone=function(c,a){if(!c||"object"!=typeof c||c.nodeType)return c;var a=a||[],b;for(b in a)if(c==a[b])return c;a.push(c);var e=c.NFisArray?[]:{};for(b in c)e[b]=d.clone(c[b],a);return e};this.convertAttributeToObject=function(c,a){c=c.getAttribute(a,2);return eval("("+c+")")||{}}};
	this.array = new function(){this.sortNumericArray=function(d){return d.sort(function(c,a){return c-a})}};
	m.prototype = this;
	this.d = this.dom = new m;
	h.prototype = this;
	this.c = this.css = new h;
	s.prototype = this;
	this.browser = new s;
	this.eventStore = function(d) {
		var c = {};
		this.addEvent = function(a, b) {
			c[a] = {
				handle : b
			}
		};
		this.getHandle = function(a) {
			if ( a = c[a])
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
	p.prototype = this;
	this.e = this.event = new p;
	l.prototype = this;
	this.a = this.animate = new l
};
NF._util.prototype = NF;
_NF.prototype.u = _NF.prototype.util = new NF._util;
_NF.prototype.stageManager = new function(){function m(c,a){var b=a;b>c.framePos.max&&(b=c.framePos.max);c.setTime(c.getTime(b))}function h(c){for(var a in d.hold)NF.u.d.rC(d.hold[a],"nfHold");d.hold=null;p(c.target||c.srcElement,["click"]);p(c.target||c.srcElement,["mousehold"],!0)}function s(c){p(c.target||c.srcElement,["mousedown","active"])}function p(c,a,b){for(;c;){if(c.nfUid&&!b)return;c=c.parentNode}for(c=0;c<a.length;c++)for(var e in d.stages)d.stages[e].stopActionTimelines(a[c],null),"active"==a[c]&&d.setElementActive()}function l(){function c(){if(!b.showElm){var a=document.createElement("TEXTAREA"),c=a.style;c.position="absolute";c.top="5px";c.left="5px";c.color="#000";c.backgroundColor="rgb(255,255,255)";c.border="solid 2px #333";c.fontFamily="Arial";c.fontSize="12px";c.padding="5px";c.overflow="auto";c.height="58px";c.width="40%";c.minWidth="40px";c.zIndex=999999;c.boxShadow="1px 1px 5px #222";document.body.appendChild(a);b.showElm=a;NF.u.e.addDomListener(a,"dblclick",function(a){b.showElm.value="";a.target.style.display="none";b.errorLog=[]});NF.u.e.addDomListener(a,"mousedown",function(){clearTimeout(b.hideTimer)})}return b.showElm}function a(e){clearTimeout(b.hideTimer);e?c().style.display="none":b.hideTimer=setTimeout(function(){a(!0)},5E3)}var b=this;b.showElm;b.errorLog=[];b.logEnabled;b.hideTimer;this.show=function(b){var d=c();d.style.display="block";d.value=b+"\n\n/*Double click to hide this message.*/";a()};this.enableLog=function(){b.logEnabled=!0};this.logError=function(e){if(b.logEnabled){b.errorLog.push(e);var d=c();d.style.display="block";d.scrollTop=0;d.value=b.errorLog.length+":\t"+e+(d.value?"\n"+d.value:"\n\n/*Double click to hide this message.*/");a()}}}var d=this;d.stages={};d.curStage;d.activeElm;d.classDefs={_0:"Stage",_1:"Box",_2:"Circle",_3:"Grid",_4:"List",_5:"Floatleft",_6:"Floatright",_7:"RotatorH",_8:"RotatorV",_9:"Item",_10:"SlideshowH",_11:"SlideshowV",_12:"Frames"};d.cds={_9:1};window.requestAnimationFrame=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame;window.cancelAnimationFrame=window.cancelAnimationFrame||window.mozCancelAnimationFrame||window.webkitCancelAnimationFrame||window.msCancelAnimationFrame;NF.u.e.addListener(document,"ready",function(){if(!NF.bigFace){var c=NF.u.e.addDomListener;c(document,"mouseup",h);c(document,"mousedown",s)}var a=document.getElementsByTagName("head")[0],c=".nfStage {cursor:default;-webkit-transform:translateZ(0);-moz-transform:translateZ(0);-ms-transform:translateZ(0);transform:translateZ(0);position:relative;user-select:none;-webkit-user-select:none;-moz-user-select:none;-o-user-select:none;-ms-user-select:none;background-color:#fff;border:solid 1px #333;width:800px;height:400px;font-family:Arial, Verdana, Sans-Serif;font-size:12px;color:#333;font-weight:normal;line-height:normal;}.nfStage * {cursor:inherit;}.nfCenterBlock {position:absolute;margin:auto;left:0px;right:0px;top:0px;bottom:0px;}",c=c+".nfStage, .nfStage .nfA, .nfStage .nfA>nfB {box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;-ms-box-sizing:border-box;-o-box-sizing:border-box;box-sizing:border-box;}",c=c+".nfStage .nfA {position:absolute;}",c=c+".nfStage .nfA {width:10px;height:10px;border:solid 0px #333;background-color:#b2d1f0;background-color:rgba(0,102,204,.3);}",c=c+".nfStage .nfA>.nfB {position:relative;width:100%;}",c=c+".nfStage .nfA.nfGrid>.nfItem {background-color:transparent;}",c=c+".nfStage .nfA.nfList>.nfItem {position:relative;padding:5px;}",c=c+".nfStage .nfA.nfFloatleft>.nfItem {position:relative;float:left;padding:10px;}",c=c+".nfStage .nfA.nfFloatright>.nfItem {position:relative;float:right;padding:10px;}",c=c+".nfStage #nfDownLevelContent {display:none;}",c=c+".nfStage .nfA.nf_hoverMenu>.nfA, .nfStage.nf_hoverMenu>.nfA, .nfStage .nfA.nf_clickMenu>.nfA, .nfStage.nf_clickMenu>.nfA{display:none;}",c=c+".nfStage .nfA.nf_hoverMenu.nfDelayHoverLineage>.nfA, .nfStage.nf_hoverMenu.nfDelayHoverLineage>.nfA, .nfStage .nfA.nf_clickMenu.nfActiveLineage>.nfA, .nfStage.nf_clickMenu.nfActiveLineage>.nfA{display:block;z-index:1;}",c=c+".nfStage .nfRotatorH, .nfStage .nfRotatorV {background-color:transparent;}",c=c+".nfStage .nfSlideshowH, .nfStage .nfSlideshowV {overflow:hidden;}",c=c+".nfStage .nfSlideshowH>.nfSlideshowFrames, .nfStage .nfSlideshowV>.nfSlideshowFrames {height:100%;width:100%;background-color:transparent;}",c=c+".nfStage .nfSlideshowH>.nfSlideshowFrames>.nfItem, .nfStage .nfSlideshowV>.nfSlideshowFrames>.nfItem {top:0px;left:0px;width:100%;height:100%;border:solid 1px #999;}",b=document.createElement("style");a.appendChild(b);NF.u.browser.ie8Down?b.styleSheet.cssText=c:b.appendChild(document.createTextNode(c));b=NF.u.d.getNodesByClassName(document,"nfStage");for(a=0;a<b.length;a++){var e=NF.u.object.convertAttributeToObject(b[a],"data-nfw");"stage"==e.type&&(c=b[a],NF.u.d.aC(c,e.nfUid),c.nfUid=e.nfUid,NF.u.d.aC(c,"nfSP1"),NF.u.d.aC(c,"nfSP2"),NF.u.d.aC(c,"nfSP3"),e.data=window[e.nfUid].data,(new NF.stage(c,e)).create())}for(a in d.stages)if((c=d.stages[a].params.browsers)&&(c.css3&&NF.u.browser.noCSS3||c.css3D&&NF.u.browser.no3d)){c=d.stages[a].root.children;for(b=0;b<c.length;b++)c[b].style.display="nfDownLevelContent"==c[b].id?"block":"none"}else d.stages[a].params.autoRun&&d.playEvent(d.stages[a],"ready")});NF.u.e.addDomListener(window,"load",function(){for(var c in d.stages)d.stages[c].params.autoRun&&d.playEvent(d.stages[c],"load")});this.setElementActive=function(c,a){var b=d.activeElm;d.activeElm&&b.element!=a&&b.stage.setElementInactive(b.element);if(null!=c){if(!b||b.element!=a)c.setElementActive(a),d.activeElm={stage:c,element:a}}else d.activeElm=null};this.add=function(c){d.stages[c.root.nfUid]=c;d.curStage=c};this.playStage=function(c,a,b){d.playEvent(c,"ready",null,null,a,b);d.playEvent(c,"load",null,null,a,b)};this.pauseStage=function(c,a){d.playEvent(c,"ready",null,"pause",a);d.playEvent(c,"load",null,"pause",a)};this.playEvent=function(c,a,b,e,d,f){e=e||"play";if(c=c.data.events[a])if(b){if(b=c.timelines[b])null!=f&&m(b,f),b[e](null,d)}else for(var h in c.timelines)null!=f&&m(c.timelines[h],f),c.timelines[h][e](null,d)};l.prototype=this;this.debug=new l};
_NF.prototype.stage = function(m, h) {
	function s(a) {
		x[a] || (x[a] = {
			nfUid : a,
			raw : "",
			images : [],
			loadCount : 0
		}, i.elmCount++);
		return x[a]
	}

	function p(a, c) {
		if ((NF.bigFace || c) && a)
			a = a.replace(/\&\#10\;/g, "\n"), a = a.replace(/\&\#13\;/g, "\r");
		return a
	}

	function l(a, c) {
		if (!f.elements[a]) {
			var b = f.elements["NodeFire" + c.pUid], e = f.seoElements[a];
			e || ( e = document.createElement("DIV"), NF.u.d.aC(e, a), NF.u.d.aC(e, "nfA"), e.id = c.id);
			if (!e.nfContentElm) {
				var j = p(c.con), d = document.createElement("DIV");
				NF.u.d.aC(d, "nfB");
				if (j) {
					var g;
					g = j ? document.createElement("DIV").innerHTML = j : "";
					d.innerHTML = g
				}
				NF.u.d.addChild("first-child", d, e);
				e.nfContent = j;
				e.nfContentElm = d
			}
			e.nfLink = {};
			if (c.link)
				for (var k in c.link)
				e.nfLink[k] = p(c.link[k], !0);
			e.nfOptions = c.opt ? c.opt : {};
			if (c.cn)
				for (k in e.nfClass = c.cn, c.cn)
				NF.u.d.aC(e, k);
			if (c.c) {
				c.c = c.c.NFisArray ? c.c : [c.c];
				for ( k = 0; k < c.c.length; k++)
					NF.u.d.aC(e, "nf" + n.classDefs["_" + c.c[k]])
			}
			c.nfElmType && (e.nfElmType = c.nfElmType);
			b != f.root && NF.u.d.aC(b, "nfParent");
			e.nfUid = a;
			e.nfUidParent = "NodeFire" + c.pUid;
			c.uColor && (e.uColor = c.uColor);
			f.elements[a] = e;
			a: {
				g = e.children;
				for ( j = 0; j < g.length; j++)
					if (NF.u.d.hC(g[j], "nfB")) {
						b = g[j].innerHTML.match(/url\(.*\)/ig) || [];
						for ( d = 0; d < b.length; d++)
							b[d] = b[d].replace(/url\(|\)/ig, "");
						j = g[j].getElementsByTagName("IMG");
						for ( d = 0; d < j.length; d++)
							b.push(j[d].src);
						if (0 < b.length) {
							e = s(e.nfUid);
							for ( j = 0; j < b.length; j++)
								e.images.push(b[j])
						}
						break a
					}
			}
		}
		return f.elements[a]
	}

	function d(c) {
		if (!NF.bigFace) {
			var b = NF.u.e.addDomListener;
			b(c, "mouseover", function(b) {
				for (var d = b.target || b.srcElement; d && !d.nfUid; )
					d = d.parentNode;
				d && d == c && (NF.u.d.aC(d, "nfHover"), clearTimeout(f.dly.over), f.dly.over = setTimeout(function() {
					var c = d;
					f.stopActionTimelines("mouseout", c, !0);
					NF.u.d.aC(c, "nfDelayHover");
					for (var b = c; b && b.nfUid; )
						NF.u.d.aC(b, "nfDelayHoverLineage"), b = b.parentNode;
					a("mouseover", c)
				}, e(d, "over")), n.hold && (n.hold[d.nfUid] && NF.u.d.hC(d, "nf_button")) && (g(d), a("mousehold", d)))
			});
			b(c, "mouseout", function(b) {
				for (var d = b.target || b.srcElement; d && !d.nfUid; )
					d = d.parentNode;
				for (var j = b.toElement || b.relatedTarget, b = j; j && !j.nfUid; )
					j = j.parentNode;
				j = j || b;
				if (d && j && d == c) {
					NF.u.d.rC(d, "nfHover");
					clearTimeout(f.dly.out);
					f.dly.init_a || (f.dly.init_a = d);
					f.dly.elms[d.nfUid] = d;
					var q, g;
					for (g in f.dly.elms) {
						q = e(f.dly.elms[g], "out");
						break
					}
					f.dly.out = setTimeout(function() {
						var c = j;
						f.stopActionTimelines("mouseover", c);
						for (var b in f.dly.elms) {
							var d = f.dly.elms[b];
							for (d != c && NF.u.d.rC(d, "nfDelayHover"); d && d.nfUid && d != c && !NF.u.d.isDescendant(d, c); )
								NF.u.d.rC(d, "nfDelayHoverLineage"), d = d.parentNode
						}
						a("mouseout", f.dly.init_a, null, c);
						f.dly.init_a = null;
						f.dly.elms = {}
					}, q);
					if (n.hold && n.hold[d.nfUid] && NF.u.d.hC(d, "nf_button")) {
						f.stopActionTimelines("mousehold", j);
						for ( q = j; d && d != f.root; )
							n.hold[d.nfUid] && (d != q && !NF.u.d.isDescendant(d, q)) && NF.u.d.rC(d, "nfHold"), d = d.parentNode
					}
				}
			});
			b(c, "mousedown", function(b) {
				for ( b = b.target || b.srcElement; b && !b.nfUid; )
					b = b.parentNode;
				b && b == c && (g(b), f.stopActionTimelines("mousedown", b), a("mousedown", b, !0, null, !0), a("mousehold", b), n.setElementActive(f, b))
			});
			b(c, "click", function(b) {
				for ( b = b.target || b.srcElement; b && !b.nfUid; )
					b = b.parentNode;
				if (b && b == c) {
					f.stopActionTimelines("click", b);
					a("click", b, !0, null, !0);
					var d = b.nfLink;
					d && (d.code && f.executeCode(d.code, b), d.link && window.open(d.link, d.where || "_self"))
				}
			})
		}
	}

	function c(a, b, c, d) {
		"stop" == c && d.nfOptions["P" + b.replace("mouse", "")] && ( c = "pause");
		var j = a.nfTimelines;
		if (j && ( j = j[b]))
			return j.targElm = d || a, j[c](), !0
	}

	function a(a, c, d, e, j) {
		do
			if (!e || !("descendant" == NF.u.d.isRelation(e, c) || e == c)) {
				var g = c.nfTimelines;
				if (g && g[a] && (!j || !g[a].options.block || !g[a].isPlaying()))
					(!f.act[a][a][c.nfUid] || d) && b(g[a].parentObj.actType, c, c, d);
				for (var i = c; i != f.root && ( i = i.parentNode); ) {
					var g = i.nfTimelines, k;
					for (k in g) {
						var t = g[k].parentObj.actType;
						if (t.base == a && (t.isChildren || t.className) && (!f.act[t.base][k][c.nfUid] || d) && !(t.isChildren && c.parentNode != i))
							if (!t.className || NF.u.d.hC(c, t.className))
								(!j || !g[k].options.block || !g[k].isPlaying()) && b(t, i, c, d)
					}
				}
			}
		while(c!=f.root&&(c=c.parentNode))
	}

	function b(a, b, d, e) {
		e && c(b, a.uid, "stop", d);
		if ((e || !f.act[a.base][a.uid][d.nfUid]) && c(b, a.uid, "play", d))
			f.act[a.base][a.uid][d.nfUid] = {
				tElm : d,
				eElm : b
			}
	}

	function e(a, c) {
		do
			if (null != a.nfOptions[c])
				return a.nfOptions[c];
		while(a!=f.root&&(a=a.parentNode));
		return 0
	}

	function g(a) {
		for (n.hold = {}; a && a != f.root; )
			n.hold[a.nfUid] = a, NF.u.d.aC(a, "nfHold"), a = a.parentNode
	}

	var f = this;
	var _this = this;
	f.root = m;
	f.nfUid = m.nfUid;
	f.data
	f.styleDefs
	f.params = h;
	f.elements = {};
	f.seoElements = {};
	f.act = {};
	f.my = {};
	f.rules = {};
	f.sheet
	f.dly = {
		elms : {}
	};
	var x = {}, i = {
		elmCount : 0,
		count : 0
	}, n = NF.stageManager, E = NF.stageDataManager;
	(function() {
		n.add(f);
		var a = document.createElement("style");
		document.getElementsByTagName("head")[0].appendChild(a);
		f.sheet = document.styleSheets[document.styleSheets.length - 1];
		f.data = new NF.stageData(f);
		f.styleDefs = E.getStyleDefs();
		f.seoElements[f.nfUid] = m;
		for (var a = NF.u.d.getNodesByClassName(f.root, "nfA"), c = 0; c < a.length; c++) {
			var b = NF.u.object.convertAttributeToObject(a[c], "data-nfw");
			b.nfUid && (f.seoElements["NodeFire_" + b.nfUid] = a[c], a[c].nfAppended = !0)
		}
		a = NF.u.d.getNodesByClassName(f.root, "nfB");
		for ( c = 0; c < a.length; c++)
			a[c].parentNode.nfContentElm = a[c];
		d(f.root)
	})();
	this.applyCSS = function(a, c, b, d, j, e) {
		f.rules[e] ? f.rules[e].style[b] = j ? "" : d : j || (f.sheet.insertRule ? ( b = f.sheet.cssRules, b = 0 < b.length ? b.length - 1 : 0, f.sheet.insertRule(a + "{" + c + ":" + d + ";}", b), f.rules[e] = f.sheet.cssRules[b]) : (f.sheet.addRule(a, c + ":" + d + ";"), f.rules[e] = f.sheet.rules[sheet.rules.length - 1]))
	};
	this.getStyleDefNodeFromPointer = function(a, c) {
		for (var a = a.split(c), b = f.styleDefs[a[0]], d = 1; d < a.length; d++)
			b = b[a[d]];
		return b
	};
	this.create = function() {
		if (f.params.data) {
			var a = f.params.data, b = a.data.elmOrder;
			l(f.nfUid, a.data);
			for (var e in b)
			b[e].rule ? f.elements[e] = {
				rule : b[e].rule,
				sName : b[e].sName,
				id : b[e].id,
				nfUid : e,
				nfUColor : b[e].uColor,
				isCustom : b[e].cr
			} : l("NodeFire" + e, b[e]);
			for (e in b)
			if ( a = f.elements["NodeFire" + e]) {
				var g;
				if (!a.nfAppended && ( g = a.nfUidParent))
					f.elements[g].appendChild(a), NF.u.e.fire(f, "elementAdded", {
						element : a
					});
				d(a)
			} else
				delete f.elements["NodeFire" + e];
			g = f.params.data;
			for (var j in g)
			if ("data" != j) {
				a = g[j];
				b = f.data.addEvent({
					nfUid : j
				});
				e = b.actType.base;
				f.act[e] || (f.act[e] = {});
				f.act[e][j] = {};
				for (var u in a)
				if ("d" != u) {
					var h = a[u];
					e = b.addTimeline(f.elements["NodeFire" + u]);
					e.options = h.d.o || {};
					for (var k in h)
					if ("d" != k) {
						var t = h[k], w = e.addElement(f.elements[(g.data.elmOrder[k] && g.data.elmOrder[k].rule ? "" : "NodeFire") + k]), y;
						for (y in t)
						if ("d" != y) {
							var B = t[y], v = w.addStyle(f.getStyleDefNodeFromPointer(y, "_")), E = v.styleDefNode, m;
							for (m in B)
							if ("d" != m) {
								var z = B[m];
								"string" == typeof z.v && (z.v = p(z.v, !0));
								var A = z.p || {}, K = A.e ? {
									direction : A.e.d,
									type : A.e.t
								} : {
									direction : "linear",
									type : "_"
								}, G = "def" == m ? 0 : parseInt(m.substring(1)), L = e.getTime(G);
								v.addKey(z.v, {
									uid : m,
									unit : A.unit,
									framePos : G,
									seconds : L,
									ease : K
								}, m);
								E.data.isImage && z.v && ( A = s("NodeFire" + k), -1 == A.raw.indexOf(z.v) && (A.raw += z.v, A.images.push(z.v)))
							}
							if (v.hasKey(!0) || "ready" != j)
								v = v.styleDefNodeRoot.data.transElms, B = w.domElement.nfUid, (v[B]=v[B]||{})[j + "_NodeFire" + u] = w
						}
					} else
						e.saveData = NF.u.object.clone(h[k])
				}
			}
			if (!NF.bigFace && NF.u.browser.hasStyle("transition"))
				for (j in f.data.events)
				for (u in f.data.events[j].timelines)
				for (k in e = f.data.events[j].timelines[u], e.elements)
				for (y in g = e.elements[k], g.styles)
				if ( v = g.styles[y], v.hasKey(!0)) {
					a = 0;
					if (!v.styleDefNode.data.cssName)
						for (m in v.styleDefNodeRoot.data.transElms[g.domElement.nfUid])
						a++;
					2 > a && v.setTransStatus()
				}
			if (!NF.bigFace) {
				var H, F;
				for (F in x) {
					H = !0;
					j = x[F].images;
					for ( u = 0; u < j.length; u++)
						k = document.createElement("img"), k.trackPreLoads = function() {
							this.nfImages.loadCount++;
							if (this.nfImages.loadCount == this.nfImages.images.length) {
								var a = this.nfImages.nfUid;
								f.elements[a] && c(f.elements[a], "preloadelement", "play");
								i.count++;
								i.count == i.elmCount && n.playEvent(f, "preloadall")
							}
						}, k.onload = k.trackPreLoads, k.onerror = k.trackPreLoads, k.onabort = k.trackPreLoads, k.nfImages = x[F], k.src = j[u]
				}
				H || n.playEvent(f, "preloadall")
			}
			NF.u.e.fire(f, "stageCreated", {});
			return !0
		}
	};
	this.executeCode = function(a) {
		if (!a || !NF.bigFace || !a.match(/\.open\(/))
			try {
				eval(a)
			} catch(b) {
				n.debug.logError(b)
			}
	};
	this.stopActionTimelines = function(a, b, d) {
		for (var e in f.act[a]) {
			var j = f.act[a][e], g;
			for (g in j) {
				var i = j[g].tElm, k = j[g].eElm;
				if (b != i || d) {
					var t;
					if (!b || (!( t = NF.u.d.isRelation(b, i)) || "ancestor" == t) && !d || d && ("descendant" == t || b == i))
						c(k, e, "stop", i),
						delete j[g]
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
_NF.prototype.stageDataManager = new function(){function m(h,s,p,l,d){s?s.isRoot=!1:(s={isRoot:!0},p="");for(var c in h){var a=p+c;if(h[c].data){h[c].data.uid=a;s.isRoot||(h[c].data.parentObj=h);if(h[c].data.cssName)if(s.isRoot&&(d=h[c]),l=h[c],h[c].data.jsName=h[c].data.jsName||c,h[c].data.transElms={},h[c].data.vendorSpecific){var b=h[c].data.vendorSpecific={},e=NF.u.css.getBrowserSpecifcStyleName(h[c].data.jsName);b.js=e.styleName;b.css=e.cssPrefix+h[c].data.cssName}else h[c].data.vendorSpecific={};s.isRoot||(h[c].data.parentObj=h);h[c].data.id=c;h[c].data.cssRootNode=l;h[c].data.cssTopNode=d;h[c].data.lastV={}}"data"!=c&&new m(h[c],NF.util.object.clone(s),a+"_",l,d)}}this.getStyleDefs=function(){var h={transition:{data:{cssName:"transition",vendorSpecific:1}},width:{data:{format:{type:"float",alt:{auto:1},unit:"px",units:["px","%"],dInc:1,sDec:0,range:{min:0}},cssName:"width",cssTrans:1}},height:{data:{format:{type:"float",alt:{auto:1},unit:"px",units:["px","%"],dInc:1,sDec:0,range:{min:0}},cssName:"height",cssTrans:1}},top:{data:{format:{type:"float",alt:{auto:1},unit:"px",units:["px","%"],dInc:1,sDec:0},cssName:"top",cssTrans:1}},left:{data:{format:{type:"float",alt:{auto:1},unit:"px",units:["px","%"],dInc:1,sDec:0},cssName:"left",cssTrans:1}},right:{data:{format:{type:"float",alt:{auto:1},unit:"px",units:["px","%"],dInc:1,sDec:0},cssName:"right",cssTrans:1}},bottom:{data:{format:{type:"float",alt:{auto:1},unit:"px",units:["px","%"],dInc:1,sDec:0},cssName:"bottom",cssTrans:1}},backgroundColor:{data:{format:{type:"color",defVal:"rgba(0,0,0,1)",left:"rgba(",right:")"},cssName:"background-color",header:!0,isColor:!0,cssTrans:1},Red:{data:{format:{type:"int",right:",",range:{min:0,max:255}}}},Green:{data:{format:{type:"int",right:",",range:{min:0,max:255}}}},Blue:{data:{format:{type:"int",right:",",range:{min:0,max:255}}}},Alpha:{data:{format:{type:"float",defVal:"1",range:{min:0,max:1}}}}},opacity:{data:{format:{type:"float",defVal:"1",range:{min:0,max:1}},cssName:"opacity",cssTrans:1}},backgroundImage:{data:{format:{type:"string",left:"url(",right:")",defVal:"http://"},noTween:!0,cssName:"background-image",isImage:!0}},backgroundRepeat:{data:{format:{type:"string",defVal:"repeat",select:["repeat","repeat-x","repeat-y","no-repeat","inherit"]},noTween:!0,cssName:"background-repeat"}},backgroundPosition:{data:{format:{},cssName:"background-position",header:!0},X:{data:{format:{type:"float",alt:{center:1,left:1,right:1},unit:"px",units:["px","%"],dInc:1,sDec:0,right:" "}}},Y:{data:{format:{type:"float",alt:{center:1,top:1,bottom:1},unit:"px",units:["px","%"],dInc:1,sDec:0}}}},background:{data:{format:{type:"gradient"},cssName:"background",header:!0},angle:{data:{format:{right:", "}}},stopN:{data:{multiQty:!0,format:{},header:!0},color:{data:{format:{type:"color",defVal:"rgba(0,0,0,1)",left:"rgba(",right:")"},header:!0,isColor:!0},Red:{data:{format:{type:"int",right:","}}},Green:{data:{format:{type:"int",right:","}}},Blue:{data:{format:{type:"int",right:","}}},Alpha:{data:{format:{type:"float",defVal:"1"}}}},location:{data:{format:{type:"int",unit:"%"}}}}},transformOrigin:{data:{format:{},cssName:"transform-origin",vendorSpecific:!0,header:!0},X:{data:{format:{type:"int",unit:"px",units:["px","%"],right:" "}}},Y:{data:{format:{type:"int",unit:"px",units:["px","%"]}}}},transform:{data:{format:{type:"function"},voidDefs:1,cssName:"transform",cssName:"transform",vendorSpecific:!0,header:!0,isTransform:!0,cssTrans:1},scaleX:{data:{format:{type:"float",left:"scaleX(",right:")",range:{min:0}}}},scaleY:{data:{format:{type:"float",left:"scaleY(",right:")",range:{min:0}}}},scaleZ:{data:{format:{type:"float",defVal:"1",left:"scaleZ(",right:")",range:{min:0}},is3d:1}},rotate:{data:{format:{type:"float",unit:"deg",dInc:1,sDec:0,left:"rotate(",right:")"}}},rotateX:{data:{format:{type:"float",unit:"deg",dInc:1,sDec:0,left:"rotateX(",right:")"},is3d:1}},rotateY:{data:{format:{type:"float",unit:"deg",dInc:1,sDec:0,left:"rotateY(",right:")"},is3d:1}},rotateZ:{data:{format:{type:"float",unit:"deg",dInc:1,sDec:0,left:"rotateZ(",right:")"},is3d:1}},skewX:{data:{format:{type:"float",unit:"deg",dInc:1,sDec:0,left:"skewX(",right:")"}}},skewY:{data:{format:{type:"float",unit:"deg",dInc:1,sDec:0,left:"skewY(",right:")"}}},translateX:{data:{format:{type:"int",unit:"px",units:["px","%"],left:"translateX(",right:")"}}},translateY:{data:{format:{type:"int",unit:"px",units:["px","%"],left:"translateY(",right:")"}}},translateZ:{data:{format:{type:"int",unit:"px",units:["px","%"],left:"translateZ(",right:")"},is3d:1}}},transformStyle:{data:{format:{type:"string",defVal:"flat",select:["flat","preserve-3d"]},cssName:"transform-style",noTween:!0,vendorSpecific:!0}},perspective:{data:{format:{type:"int",unit:"px",units:["px","%"]},cssName:"perspective",vendorSpecific:!0}},borderWidth:{data:{format:{type:"int",unit:"px",range:{min:0}},cssName:"border-width",cssTrans:1},Top:{data:{format:{type:"int",unit:"px",range:{min:0}},cssName:"border-top-width",jsName:"borderTopWidth",cssTrans:1}},Right:{data:{format:{type:"int",unit:"px",range:{min:0}},cssName:"border-right-width",jsName:"borderRightWidth",cssTrans:1}},Bottom:{data:{format:{type:"int",unit:"px",range:{min:0}},cssName:"border-bottom-width",jsName:"borderBottomWidth",cssTrans:1}},Left:{data:{format:{type:"int",unit:"px",range:{min:0}},cssName:"border-left-width",jsName:"borderLeftWidth",cssTrans:1}}},borderColor:{data:{format:{type:"color",defVal:"rgba(0,0,0,1)",left:"rgba(",right:")"},cssName:"border-color",header:!0,isColor:!0,cssTrans:1},Red:{data:{format:{type:"int",right:",",range:{min:0,max:255}}}},Green:{data:{format:{type:"int",right:",",range:{min:0,max:255}}}},Blue:{data:{format:{type:"int",right:",",range:{min:0,max:255}}}},Alpha:{data:{format:{type:"float",defVal:"1",range:{min:0,max:1}}}}},borderStyle:{data:{format:{type:"string",defVal:"solid",select:"none solid dashed dotted double groove ridge inset outset inherit".split(" ")},noTween:!0,cssName:"border-style"}},borderRadius:{data:{format:{type:"int",unit:"px",units:["px","%"],range:{min:0}},cssName:"border-radius",cssTrans:1},TopLeft:{data:{format:{type:"int",unit:"px",units:["px","%"],range:{min:0}},cssName:"border-top-left-radius",jsName:"borderTopLeftRadius",dualHeader:!0,cssTrans:1},Radius:{data:{format:{type:"int",unit:"px",units:["px","%"],range:{min:0},right:" "}}},Axis:{data:{format:{type:"int",unit:"px",units:["px","%"],range:{min:0}}}}},TopRight:{data:{format:{type:"int",unit:"px",units:["px","%"],range:{min:0}},cssName:"border-top-right-radius",jsName:"borderTopRightRadius",dualHeader:!0,cssTrans:1},Radius:{data:{format:{type:"int",unit:"px",units:["px","%"],range:{min:0},right:" "}}},Axis:{data:{format:{type:"int",unit:"px",units:["px","%"],range:{min:0}}}}},BottomRight:{data:{format:{type:"int",unit:"px",units:["px","%"],range:{min:0}},cssName:"border-bottom-right-radius",jsName:"borderBottomRightRadius",dualHeader:!0,cssTrans:1},Radius:{data:{format:{type:"int",unit:"px",units:["px","%"],range:{min:0},right:" "}}},Axis:{data:{format:{type:"int",unit:"px",units:["px","%"],range:{min:0}}}}},BottomLeft:{data:{format:{type:"int",unit:"px",units:["px","%"],range:{min:0}},cssName:"border-bottom-left-radius",jsName:"borderBottomLeftRadius",dualHeader:!0,cssTrans:1},Radius:{data:{format:{type:"int",unit:"px",units:["px","%"],range:{min:0},right:" "}}},Axis:{data:{format:{type:"int",unit:"px",units:["px","%"],range:{min:0}}}}}},boxShadow:{data:{format:{type:"shadow",defVal:"5px 5px 0px 0px rgba(0,0,0,1)"},cssName:"box-shadow",header:!0,cssTrans:1},X:{data:{format:{type:"int",unit:"px",right:" "}}},Y:{data:{format:{type:"int",unit:"px",right:" "}}},Blur:{data:{format:{type:"int",unit:"px",right:" "}}},Spread:{data:{format:{type:"int",unit:"px",right:" "}}},Color:{data:{format:{type:"color",defVal:"rgba(0,0,0,1)",left:"rgba(",right:")"},header:!0,isColor:!0},Red:{data:{format:{type:"int",right:",",range:{min:0,max:255}}}},Green:{data:{format:{type:"int",right:",",range:{min:0,max:255}}}},Blue:{data:{format:{type:"int",right:",",range:{min:0,max:255}}}},Alpha:{data:{format:{type:"float",defVal:"1",range:{min:0,max:1}}}}}},clip:{data:{format:{type:"clip",left:"rect(",right:")"},cssName:"clip",header:!0,cssTrans:1},Top:{data:{format:{type:"int",unit:"px",right:",",range:{min:0}}}},Right:{data:{format:{type:"int",unit:"px",right:",",range:{min:0}}}},Bottom:{data:{format:{type:"int",unit:"px",right:",",range:{min:0}}}},Left:{data:{format:{type:"int",unit:"px",range:{min:0}}}}},padding:{data:{format:{type:"int",unit:"px",units:["px","%"],range:{min:0}},cssName:"padding"},Top:{data:{format:{type:"int",unit:"px",units:["px","%"],range:{min:0}},cssName:"padding-top",jsName:"paddingTop"}},Right:{data:{format:{type:"int",unit:"px",units:["px","%"],range:{min:0}},cssName:"padding-right",jsName:"paddingRight"}},Bottom:{data:{format:{type:"int",unit:"px",units:["px","%"],range:{min:0}},cssName:"padding-bottom",jsName:"paddingBottom"}},Left:{data:{format:{type:"int",unit:"px",units:["px","%"],range:{min:0}},cssName:"padding-left",jsName:"paddingLeft"}}},margin:{data:{format:{type:"float",alt:{auto:1,inherit:1},unit:"px",units:["px","%"],dInc:1,sDec:0},cssName:"margin"},Top:{data:{format:{type:"float",alt:{auto:1,inherit:1},unit:"px",units:["px","%"],dInc:1,sDec:0},cssName:"margin-top",jsName:"marginTop"}},Right:{data:{format:{type:"float",alt:{auto:1,inherit:1},unit:"px",units:["px","%"],dInc:1,sDec:0},cssName:"margin-right",jsName:"marginRight"}},Bottom:{data:{format:{type:"float",alt:{auto:1,inherit:1},unit:"px",units:["px","%"],dInc:1,sDec:0},cssName:"margin-bottom",jsName:"marginBottom"}},Left:{data:{format:{type:"float",alt:{auto:1,inherit:1},unit:"px",units:["px","%"],dInc:1,sDec:0},cssName:"margin-left",jsName:"marginLeft"}}},fontSize:{data:{format:{type:"float",alt:{inherit:1},unit:"px",units:["px","%","em"],range:{min:0},dInc:1,sDec:0},cssName:"font-size",cssTrans:1}},lineHeight:{data:{format:{type:"float",alt:{normal:1,inherit:1},unit:"px",units:["px","%","em"],range:{min:0},dInc:1,sDec:0},cssName:"line-height"}},color:{data:{format:{type:"color",defVal:"rgba(0,0,0,1)",left:"rgba(",right:")"},cssName:"color",header:!0,isColor:!0,cssTrans:1},Red:{data:{format:{type:"int",right:",",range:{min:0,max:255}}}},Green:{data:{format:{type:"int",right:",",range:{min:0,max:255}}}},Blue:{data:{format:{type:"int",right:",",range:{min:0,max:255}}}},Alpha:{data:{format:{type:"float",defVal:"1",range:{min:0,max:1}}}}},fontFamily:{data:{format:{type:"string",defVal:"Arial",select:"Georgia, serif;Arial, Helvetica, sans-serif;Arial;Helvetica;sans-serif;Verdana;Courier New;Courier;Times New Roman;Georgia;serif;Tahoma;Impact;Cursive".split(";")},cssName:"font-family",noTween:!0}},fontStyle:{data:{format:{type:"string",defVal:"normal",select:["normal","italic","oblique","inherit"]},cssName:"font-style",noTween:!0}},fontWeight:{data:{format:{type:"string",defVal:"normal",select:["normal","bold","bolder","lighter","inherit"]},cssName:"font-weight",noTween:!0}},textDecoration:{data:{format:{type:"string",defVal:"none",select:"none underline overline line-through blink inherit".split(" ")},cssName:"text-decoration",noTween:!0}},fontVariant:{data:{format:{type:"string",defVal:"normal",select:["normal","small-caps","inherit"]},cssName:"font-variant",noTween:!0}},textAlign:{data:{format:{type:"string",defVal:"left",select:["left","center","right","justify","inherit"]},cssName:"text-align",noTween:!0}},direction:{data:{format:{type:"string",defVal:"ltr",select:["ltr","rtl","inherit"]},cssName:"direction",noTween:!0}},overflow:{data:{format:{type:"string",defVal:"visible",select:["visible","hidden","scroll","auto","inherit"]},cssName:"overflow",noTween:!0}},position:{data:{format:{type:"string",defVal:"absolute",select:["absolute","relative","fixed","static","inherit"]},cssName:"position",noTween:!0}},zIndex:{data:{format:{type:"int",defVal:"0"},cssName:"z-index"}},visibility:{data:{format:{type:"string",defVal:"inherit",select:["visible","hidden","inherit"]},cssName:"visibility",noTween:!0}},display:{data:{format:{type:"string",defVal:"block",select:["none","block","inherit"]},cssName:"display",noTween:!0}},cssFloat:{data:{format:{type:"string",defVal:"none",select:["none","left","right","inherit"]},cssName:"float",noTween:!0}},clear:{data:{format:{type:"string",defVal:"none",select:["none","both","left","right","inherit"]},cssName:"clear",noTween:!0}},cursor:{data:{format:{type:"string",defVal:"default",select:"auto default pointer progress help text move wait inherit".split(" ")},cssName:"cursor",noTween:!0}},userSelect:{data:{format:{type:"string",defVal:"default",select:["none","text","all","element"]},cssName:"user-select",vendorSpecific:!0,noTween:!0}},whiteSpace:{data:{format:{type:"string",defVal:"normal",select:["normal","nowrap","pre","pre-line","interit"]},cssName:"white-space",noTween:!0}},pointerEvents:{data:{format:{type:"string",defVal:"auto",select:"auto none visiblePainted visibleFill visibleStroke visible painted fill stroke all inherit".split(" ")},cssName:"pointer-events",noTween:!0}},onKey:{data:{format:{type:"string"},cssName:"eval",noTween:!0,isCode:!0,onKey:!0,SK:1}},onFrames:{data:{format:{type:"string"},cssName:"call",noTween:!0,isCode:!0,onFrames:!0}},innerHTML:{data:{format:{type:"string"},isAfter:1,cssName:"content",noTween:!0,isContent:!0,SK:1}}};m(h);return h};this.getDefaultStyleValue=function(h){var m=h.data.format.defVal,h=h.data.format.type;return null!=m?m:"int"==h||"float"==h?0:""}};
_NF.prototype.stageData = function(m) {
	var h = this;
	h.stage = m;
	h.events = {};
	h.addEvent = function(m) {
		var p = m.nfUid;
		if (!h.events[p]) {
			var l;
			(h.events[p] = new h.event(h, m)).actType = {
				className : 0 < ( l = p.search("_nfClass_")) ? "." + p.substring(l + 9) : !1,
				isChildren : p.match("_children"),
				base : 0 < ( l = p.search("_")) ? p.substring(0, l) : p,
				uid : p
			}
		}
		return h.events[p]
	};
	h.event = function(h, m) {
		var l = this;
		l.params = m || {};
		l.parentObj = h;
		l.timelines = {};
		l.addTimeline = function(d) {
			l.timelines[d.nfUid] || (l.timelines[d.nfUid] = new l.timeline(l, d), d.nfTimelines || (d.nfTimelines = {}), d.nfTimelines[l.params.nfUid] = l.timelines[d.nfUid]);
			return l.timelines[d.nfUid]
		};
		l.timeline = function(d, c) {
			function a() {
				f && (f(h), h = null);
				clearTimeout(e);
				e = null;
				b.startTime = null
			}

			var b = this;
			b.parentObj = d;
			b.eventElement = c;
			b.elements = {};
			b.framePos = {
				cur : 0,
				seconds : 0,
				fps : 60,
				max : 0
			};
			b.options = {};
			b.startTime
			var e, g = window.requestAnimationFrame, f = window.cancelAnimationFrame, h;
			b.play = function(c) {
				if (!c) {
					if (b.isPlaying())
						return;
					b.startTime = null;
					b.framePos.max = 0;
					for (var d in b.elements)
					for (var f in b.elements[d].styles) {
						var C, q;
						for (q in C = b.elements[d].styles[f].keys)C[q].frame > b.framePos.max && (b.framePos.max = C[q].frame)
					}
					b.framePos.cur >= b.framePos.max && (b.framePos.cur = 0);
					NF.u.e.fire(b, "playStart", {})
				}
				var D;
				b.startTime || (b.setStartTime(), D = {
					init : 1,
					isPlay : !c
				});
				c = b.setTime((Date.now() - b.startTime) / 1E3, D, b.framePos.max);
				NF.u.e.fire(b, "playFrame", {
					timeline : b,
					seconds : b.framePos.seconds
				});
				if (c >= b.framePos.max)
					if (b.options.loop)
						b.startTime = null, b.framePos.cur = 0;
					else {
						a();
						NF.u.e.fire(b, "playEnd", {});
						return
					}
				g ? h = g(b.play, b.parentObj.parentObj.stage.root) : e = window.setTimeout(function() {
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
				if (e || h)
					return !0
			};
			b.addElement = function(a) {
				if (!b.elements[a.nfUid]) {
					b.elements[a.nfUid] = new b.element(b, a);
					var c;
					try {
						c = a instanceof HTMLElement
					} catch(d) {
						c = 1 == a.nodeType
					}
					c ? b.elements[a.nfUid].isDomElement = !0 : b.elements[a.nfUid].setRule(a.rule)
				}
				return b.elements[a.nfUid]
			};
			b.setTime = function(a, c, d) {
				b.framePos.seconds = a;
				a = b.getFrame(a);
				null != d && a >= d && (b.framePos.seconds = b.getTime(d), a = d);
				b.setFramePos(a, c);
				return a
			};
			b.getFrame = function(a) {
				return Math.round(b.framePos.fps * a)
			};
			b.getTime = function(a) {
				return a / b.framePos.fps
			};
			b.setFramePos = function(a, c) {
				if (a != b.framePos.cur || c) {
					b.framePos.cur = a;
					var d = b.moveElements(c);
					NF.u.e.fire(b, "frameChange", {
						timeline : b,
						framePosition : a,
						changed : d
					})
				}
			};
			b.moveElements = function(a) {
				var c, d;
				for (d in b.elements) {
					var e = b.moveElement(b.elements[d], null, a);
					e && ( c = c || {}, c[d] = e)
				}
				return c
			};
			b.moveElement = function(a, c, d) {
				if ( c = b.getElementStyleChanges(a, c, d)) {
					a.applyTransition();
					for (var e in c.topChanged)
					a.apply(c.topChanged[e].styleDefNode)
				}
				return c
			};
			b.getElementStyleChanges = function(a, b, c) {
				var d, e = {}, a = a.styles, f;
				for (f in a)
				if (!(b && a[f].styleDefNodeTop != b.data.cssTopNode)) {
					var g = a[f].applyPos(c);
					if (g) {
						d = d || {};
						var j = g.styleDefNodeTop.data.uid;
						d[j] = a[j];
						e[f] = g;
						e[j] = a[j]
					}
				}
				if (d)
					return {
						topChanged : d,
						allChanged : e
					}
			};
			b.element = function(a, b) {
				function c(a, b) {
					d.styles[a.data.uid] || (d.styles[a.data.uid] = new d.style(d, a));
					for (var e in a)"data" != e && new c(a[e], b, !0)
				}

				var d = this;
				var _this = this;
				d.parentObj = a;
				d.timeline = a;
				d.event = a.parentObj;
				d.stage = d.event.parentObj.stage;
				d.domElement = b;
				d.isDomElement
				d.styles = {};
				d.rule
				d.ruleR
				b.nfTrans || (b.nfTrans = {}, b.nfTransV = "");
				d.addStyle = function(a) {
					var b = a.data.uid;
					d.styles[b] || c(a.data.cssTopNode, a);
					return d.styles[b]
				};
				d.setRule = function(a) {
					d.rule = a;
					d.domElement.nfUid.match("CR_") && ( a = "[stageName] " + a);
					a = a.replace("[stageID]", "." + d.stage.root.nfUid);
					a = a.replace("[stageName]", "#" + d.stage.root.id);
					d.ruleR = a
				};
				d.executeCode = function(a) {
					if (!NF.bigFace)
						try {
							eval(a)
						} catch(b) {
							NF.stageManager.debug.logError(b)
						}
				};
				d.applyTransition = function() {
					var a = d.domElement, b = a.nfTrans, c = "", e;
					for (e in b)var f = d.timeline.getTime(b[e].endFrame + 1) - (Date.now() - d.timeline.startTime) / 1E3, c = c + (( c ? "," : "") + b[e].cssName + " " + f + "s " + b[e].ease);
					c != a.nfTransV && ( b = d.stage.styleDefs.transition.data, e = b.vendorSpecific.js || b.jsName, d.rule ? d.stage.applyCSS(d.rule, b.vendorSpecific.css || b.cssName, e, c, null, d.domElement.nfUid) : a.style[e] = c, a.nfTransV = c)
				};
				d.apply = function(a, b, c) {
					var e = d.buildValue(a);
					if (null != e) {
						var f, g = d.styles[a.data.uid];
						g.removeValue && (b && c && ( f = !0), g.removeValue = !1, e = "");
						a.data.header && (g.value = !e ? null : e);
						if (a.data.isCode)
							a.data.onFrames && d.executeCode(e);
						else if (!f)
							try {
								var k = g.styleDefNodeRoot.data, h = k.vendorSpecific.js || k.jsName;
								if (d.isDomElement)
									d.domElement.style[h] = e;
								else {
									var w = d.ruleR, b = e, y = d.domElement.nfUid;
									if (k.isAfter)
										var i = e.match(/url\(|counter/i) ? "" : '"', w = w + (w.match(/\:before|\:after/i) ? "" : ">.nfB:after"), b = i + e.replace(/\"/g, '"') + i, y = y + "_after", h = "content";
									d.stage.applyCSS(w, k.vendorSpecific.css || k.cssName, h, b, null, y)
								}
							} catch(m) {
							}
						f || NF.u.e.fire(d, "applyStyle", {
							domElement : d.domElement,
							style : g,
							element : d.domElement
						})
					}
					for (var l in a)"data" != l && a[l].data.cssName && new d.apply(a[l], !0, e)
				};
				this.buildValue = function(a, b, c) {
					b || ( b = {});
					var e = a.data.format.left || "", f = d.styles[a.data.uid], g = !1, k = NF.u.browser.ie8Down;
					if (NF.u.browser.no3d && a.data.is3d || k && "Alpha" == a.data.id)
						e = "", g = 1;
					else {
						if (a.data.isColor && "transparent" == f.value)
							return "transparent";
						k && a.data.isColor && ( e = "rgb(", a.Blue.data.format.right = "");
						var h;
						a: {
							if (a.data.dualHeader)
								for (h in a)
								if ("data" != h && ( k = d.styles[a[h].data.uid], null != k.value && !k.removeValue)) {
									h = !0;
									break a
								}
							h =
							void 0
						}
						if (!a.data.header && !h) {
							var w;
							if (null != f.value && !f.removeValue)
								e += f.value, b.hit = !0;
							else {
								f.removeValue && (b.removeHit = !0);
								c && (f.removeValue = !1);
								var i;
								if (null != ( i = a.data.lastV[d.domElement.nfUid]) && null != i.v)
									w = i.u, b.hit = !0, f.removeValue = !1, e += i.v;
								else {
									var B;
									if (( B = a.data.parentObj) && B.data.voidDefs && null == a.data.format.defVal)
										return "";
									e += NF.stageDataManager.getDefaultStyleValue(a)
								}
							}
							if (!a.data.format.alt || !a.data.format.alt[f.value])
								e += w || f.unit || a.data.format.unit || ""
						}
						if (!a.data.dualHeader || h)
							for (var l in a)"data" != l && !a[l].data.cssName && (e += d.buildValue(a[l], b, !0))
					}
					if (c || b.hit || b.removeHit)
						return !c && b.removeHit && !b.hit ? "" : e + ( g ? "" : a.data.format.right || "")
				};
				d.style = function(a, b) {
					function c(a, b, e, f, g) {
						var h = {};
						0 == e && f && ( h = f);
						try {
							return a.v(d.parentObj.stage.my, b, d, {
								isTween : !(d.keys["_" + e] && !h.reset),
								isReset : h.reset,
								isInit : g && !h.reset || h.init
							})
						} catch(i) {
							return null
						}
					}

					var d = this;
					d.parentObj = a;
					d.styleDefNode = b;
					d.styleDefNodeRoot = b.data.cssRootNode;
					d.styleDefNodeTop = b.data.cssTopNode;
					d.keys = {};
					d.framePos = d.parentObj.parentObj.framePos;
					d.value
					d.unit
					d.vFuncStr
					d.removeValue
					d.addKey = function(a, b, c) {
						b = b || {};
						d.keys[c] || (d.keys[c] = new d.key(d, b));
						d.keys[c].setValue(a, b.unit, b.applyPrevValue);
						return d.keys[c]
					};
					d.setTransStatus = function() {
						for (var a in d.keys)
						if ("def" != a) {
							var b = {};
							if (d.styleDefNodeTop.data.cssTrans) {
								var c;
								if ( c = d.getNextKey(d.keys[a].frame)) {
									var e = d.keys[a].params.ease;
									if (!e || NF.u.a.ease["css_"+e.direction][e.type])
										if (d.styleDefNode.data.cssName)
											d.setKeyTrans(d.keys[a]), d.setKeyTrans(c);
										else
											for (var f in d.styleDefNodeTop)
											if ( e = d.styleDefNodeTop[f], "data" != f)
												if (e != d.styleDefNode) {
													var g;
													if (( g = d.parentObj.styles[e.data.uid]) && g.hasKey()) {
														var h = g.keys[d.keys[a].params.uid], i = g.keys["_" + c.frame];
														if (h || g.getNextKey(d.keys[a].frame))
															if (h && i)
																b[e.data.uid + "_s"] = h, b[e.data.uid + "_e"] = i;
															else {
																b = {};
																break
															}
													}
												} else
													b[d.styleDefNode.data.uid + "_s"] = d.keys[a], b[d.styleDefNode.data.uid + "_e"] = c
								}
							}
							for (a in b)
							d.setKeyTrans(b[a])
						}
					};
					d.setKeyTrans = function(a) {
						!a.vFunc && null != a.value && (a.isTrans = !0)
					};
					d.hasPreviousKey = function(a) {
						for (var b in d.keys)
						if ("def" != b && d.keys[b].frame <= a)
							return d.keys[b]
					};
					d.getNextKey = function(a) {
						var b, c, e;
						for (e in d.keys)
						if (d.keys[e].frame > a && (null == c || d.keys[e].frame < c))
							c = d.keys[e].frame, b = d.keys[e];
						return b
					};
					d.hasKey = function(a) {
						for (var b in d.keys)
						if (!(a && "def" == b))
							return !0
					};
					d.applyPos = function(a) {
						if (d.hasKey()) {
							var b = d.styleDefNode.data, e = d.parentObj.domElement.nfUid, f = d.framePos.cur, g = {}, h = {}, i;
							for (i in d.keys)d.keys[i].frame <= f && !(g && g.diff < f - d.keys[i].frame) && ( g = {
								id : i,
								key : d.keys[i],
								diff : f - d.keys[i].frame
							}), d.keys[i].frame >= f && !(h && h.diff < d.keys[i].frame - f) && ( h = {
								id : i,
								key : d.keys[i],
								diff : d.keys[i].frame - f
							});
							if (!g.key || g.key.isDef && null == g.key.value && h.key && h.key != g.key)
								i = b.lastV[e], g.key = {
									value : null != i ? i.v : null,
									unit : null != i ? i.u : null,
									params : {},
									isDef : !0,
									sim : 1
								};
							if (!g.key.isDef || a && a.isPlay || g.key.value != d.value || NF.bigFace) {
								if (g.key.isDef || !h.key)
									h = g;
								i = g.key.vFunc ? c(g.key.vFunc, g.key, f, a, d.lKey != g.key) : g.key.value;
								var l = h.key.vFunc ? c(h.key.vFunc, h.key, null, a) : h.key.value, m = d.styleDefNodeRoot.data, p = d.parentObj.domElement;
								if (g.key.isTrans && h.key.isTrans && g.key != h.key && (!a || !a.reset)) {
									i = l;
									var n = g.key.params.ease, n = "cubic-bezier(" + (( n ? NF.u.a.ease["css_"+n.direction][n.type] : "0.250, 0.250, 0.750, 0.750") || "0.250, 0.250, 0.750, 0.750") + ")";
									p.nfTrans[m.uid] || (p.nfTrans[m.uid] = {
										endFrame : h.key.frame,
										ease : n,
										cssName : m.vendorSpecific.css || m.cssName
									})
								} else
									delete p.nfTrans[m.uid];
								f = b.noTween ? i : NF.u.a.tween({
									startValue : i,
									endValue : l,
									frameDistance : h.key.frame - g.key.frame,
									startFrame : g.key.frame,
									framePos : f,
									ease : g.key.params.ease || {
										direction : "linear",
										type : "_"
									}
								});
								null != f && "int" == b.format.type && ( f = Math.round(f));
								if (b.SK && !g.key.sim && d.lKey != g.key && !(null == d.lKey && h == g))
									if (b.onKey)
										d.parentObj.executeCode(i);
									else if (b.isContent && ( l = d.parentObj.domElement, d.parentObj.isDomElement && ( l = l.nfContentElm)))
										l.innerHTML = i || "";
								d.lKey = h.key == g.key ? null : g.key;
								if (d.value != f || d.unit != g.key.unit || g.key.vFunc || d.vFuncStr && g.key.vFunc != d.vFuncStr || a || NF.bigFace && d.hasKey(!0))
									return d.vFuncStr = g.key.vFunc ? g.key.value : null, d.unit = g.key.unit, d.removeValue = null == f ? !0 : !1, b.lastV[e] = {
										v : f,
										u : d.unit
									}, d.value = f, d
							}
						}
					};
					d.key = function(a, b) {
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

NodeFire_1400212601 = {
	nfUid : 'NodeFire_1400212601',
	data : {
		data : {
			elmId : "Linhas",
			elmOrder : {
				_0764239314 : {
					id : "Botao_Conferencia",
					pUid : "_1400212601",
					c : 1,
					link : {
						link : "html/home.html"
					},
					cn : {
						nf_button : 1,
						red_button : 1,
						red_button_hoverMenu : 1,
						red_button_clickMenu : 1,
						red_button_class_name : 1
					},
					con : "<center><h2>Conferência</h2></center>"
				},
				_0764413491 : {
					id : "Botao_Formacao",
					pUid : "_1400212601",
					c : 1,
					link : {
						link : "html/template.html"
					},
					cn : {
						nf_button : 1,
						red_button : 1,
						red_button_hoverMenu : 1,
						red_button_clickMenu : 1,
						red_button_class_name : 1
					},
					con : "<center><h2>Formação</h2></center>"
				},
				_0767707637 : {
					id : "Titulo",
					pUid : "_1400212601",
					c : 1,
					con : "<h1>Vida Ativa 2013</h1><h3>Work in Progress</h3>"
				},
				_0792066054 : {
					id : "Linha_Horizontal_1",
					pUid : "_1400212601",
					c : 1
				},
				_0792551309 : {
					id : "Curva_1",
					pUid : "_1400212601",
					c : 1
				},
				_0808842638 : {
					id : "Botao_Inscricoes",
					pUid : "_1400212601",
					c : 1,
					cn : {
						nf_button : 1,
						red_button : 1,
						red_button_hoverMenu : 1,
						red_button_clickMenu : 1,
						red_button_class_name : 1
					},
					con : "<h3>Inscrições</h3>"
				},
				_0793005751 : {
					id : "Linha_Vertical_1",
					pUid : "_1400212601",
					c : 1
				},
				_0793788573 : {
					id : "Curva_2",
					pUid : "_1400212601",
					c : 1
				},
				_0809010507 : {
					id : "Botao_Sobre",
					pUid : "_1400212601",
					c : 1,
					cn : {
						nf_button : 1,
						red_button : 1,
						red_button_hoverMenu : 1,
						red_button_clickMenu : 1,
						red_button_class_name : 1
					},
					con : "<h3>Sobre</h3>"
				},
				_0794227652 : {
					id : "Linha_Horizontal_2",
					pUid : "_1400212601",
					c : 1
				},
				_0803927635 : {
					id : "Curva_3",
					pUid : "_1400212601",
					c : 1
				},
				_0809169025 : {
					id : "Botao_Contatos",
					pUid : "_1400212601",
					c : 1,
					cn : {
						nf_button : 1,
						red_button : 1,
						red_button_hoverMenu : 1,
						red_button_clickMenu : 1,
						red_button_class_name : 1
					},
					con : "<h3>Contatos</h3>"
				},
				_0804448183 : {
					id : "Linha_Vertical_2",
					pUid : "_1400212601",
					c : 1
				},
				_0805033499 : {
					id : "Curva_4",
					pUid : "_1400212601",
					c : 1
				},
				_0809330797 : {
					id : "Botao_Contatos",
					pUid : "_1400212601",
					c : 1,
					cn : {
						nf_button : 1,
						red_button : 1,
						red_button_hoverMenu : 1,
						red_button_clickMenu : 1,
						red_button_class_name : 1
					},
					con : "<h3>Parcerias</h3>"
				},
				_0806890302 : {
					id : "Linha_Horizontal_3",
					pUid : "_1400212601",
					c : 1
				},
				_0807466513 : {
					id : "Curva_5",
					pUid : "_1400212601",
					c : 1
				},
				_0807895648 : {
					id : "Linha_Vertical_4",
					pUid : "_1400212601",
					c : 1
				},
				_0808268679 : {
					id : "Curva_6",
					pUid : "_1400212601",
					c : 1
				},
				_0809757980 : {
					id : "Botao_Horario",
					pUid : "_1400212601",
					c : 1,
					cn : {
						nf_button : 1,
						red_button : 1,
						red_button_hoverMenu : 1,
						red_button_clickMenu : 1,
						red_button_class_name : 1
					},
					con : "<h3>Horário</h3>"
				},
				_0808520704 : {
					id : "Linha_Horizontal_4",
					pUid : "_1400212601",
					c : 1
				},
				_1384131310 : {
					id : "Menu_de_rodape",
					pUid : "_1400212601",
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
					con : "Conferência"
				},
				_1384131445 : {
					id : "WorkInProgress_Rodape",
					pUid : "_1384131310",
					c : 1,
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
					cn : {
						nf_button : 1,
						nf_hoverMenu : 1,
						nf_menu : 1
					},
					con : "Vídeos"
				}
			}
		},
		ready : {
			_1400212601 : {
				d : {
					o : {}
				},
				_1400212601 : {
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
							v : 125
						}
					},
					height : {
						def : {
							v : 50
						}
					},
					top : {
						def : {
							v : 319
						}
					},
					left : {
						def : {
							v : 50
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
					}
				},
				_0764413491 : {
					width : {
						def : {
							v : 125
						}
					},
					height : {
						def : {
							v : 50
						}
					},
					top : {
						def : {
							v : 375
						}
					},
					left : {
						def : {
							v : 50
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
					userSelect : {
						def : {
							v : "default"
						}
					},
					pointerEvents : {
						def : {
							v : "auto"
						}
					}
				},
				_0767707637 : {
					width : {
						def : {
							v : 350
						}
					},
					height : {
						def : {
							v : 82
						}
					},
					top : {
						def : {
							v : 32
						}
					},
					left : {
						def : {
							v : 50
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
							v : 236
						}
					},
					height : {
						def : {
							v : 25
						},
						_30 : {
							v : 25
						}
					},
					top : {
						def : {
							v : 265
						},
						_10 : {
							v : 265
						},
						_30 : {
							v : 265
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
							v : 265
						}
					},
					left : {
						def : {
							v : 240
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
							v : null
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
							v : 260
						}
					},
					top : {
						def : {
							v : 294
						},
						_60 : {
							v : 294
						},
						_40 : {
							v : 294
						}
					},
					left : {
						def : {
							v : 230
						},
						_60 : {
							v : 240
						},
						_40 : {
							v : 240
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
							v : 558
						},
						_60 : {
							v : 558
						}
					},
					left : {
						def : {
							v : 240
						},
						_60 : {
							v : 240
						},
						_70 : {
							v : 240
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
							v : 549
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
							v : 558
						},
						_90 : {
							v : 558
						}
					},
					left : {
						def : {
							v : 270
						},
						_70 : {
							v : 269
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
				_0803927635 : {
					width : {
						def : {
							v : 0
						},
						_90 : {
							v : 0
						},
						_100 : {
							v : 25
						}
					},
					height : {
						def : {
							v : 25
						},
						_90 : {
							v : 25
						},
						_100 : {
							v : 25
						}
					},
					top : {
						def : {
							v : 558
						},
						_90 : {
							v : 558
						},
						_100 : {
							v : 558
						}
					},
					left : {
						def : {
							v : 821
						},
						_90 : {
							v : 821
						},
						_100 : {
							v : 821
						}
					},
					borderWidth : {
						def : {
							v : 2
						},
						_90 : {
							v : 2
						},
						_100 : {
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
					borderRadius : {
						_100 : {
							v : null
						}
					},
					borderRadius_BottomRight : {
						_90 : {
							v : 0
						},
						_100 : {
							v : 90
						}
					}
				},
				_0804448183 : {
					width : {
						def : {
							v : 25
						},
						_100 : {
							v : 25
						}
					},
					height : {
						def : {
							v : 0
						},
						_100 : {
							v : 0
						},
						_120 : {
							v : 444
						}
					},
					top : {
						def : {
							v : 553
						},
						_100 : {
							v : 553
						},
						_120 : {
							v : 112
						}
					},
					left : {
						def : {
							v : 821
						},
						_100 : {
							v : 821
						},
						_120 : {
							v : 821
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
						def : {
							v : 2
						},
						_100 : {
							v : 2
						},
						_120 : {
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
				_0805033499 : {
					width : {
						def : {
							v : 0
						},
						_129 : {
							v : 25
						},
						_120 : {
							v : 0
						}
					},
					height : {
						def : {
							v : 25
						},
						_129 : {
							v : 25
						},
						_120 : {
							v : 0
						}
					},
					top : {
						def : {
							v : 83
						},
						_129 : {
							v : 82
						},
						_120 : {
							v : 83
						}
					},
					left : {
						def : {
							v : 825
						},
						_129 : {
							v : 821
						},
						_120 : {
							v : 825
						}
					},
					borderWidth : {
						def : {
							v : 2
						},
						_129 : {
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
						_129 : {
							v : 90
						},
						def : {
							v : 0
						}
					}
				},
				_0806890302 : {
					width : {
						def : {
							v : 0
						},
						_129 : {
							v : 0
						},
						_150 : {
							v : 342
						}
					},
					height : {
						def : {
							v : 25
						},
						_129 : {
							v : 25
						},
						_150 : {
							v : 25
						}
					},
					top : {
						def : {
							v : 82
						},
						_129 : {
							v : 82
						},
						_150 : {
							v : 82
						}
					},
					left : {
						def : {
							v : 813
						},
						_129 : {
							v : 813
						},
						_150 : {
							v : 475
						}
					},
					borderWidth : {
						def : {
							v : 2
						},
						_129 : {
							v : 2
						},
						_150 : {
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
					}
				},
				_0807466513 : {
					width : {
						def : {
							v : 0
						},
						_150 : {
							v : 0
						},
						_160 : {
							v : 25
						}
					},
					height : {
						def : {
							v : 25
						},
						_150 : {
							v : 25
						},
						_160 : {
							v : 25
						}
					},
					top : {
						def : {
							v : 82
						},
						_150 : {
							v : 82
						},
						_160 : {
							v : 83
						}
					},
					left : {
						def : {
							v : 467
						},
						_150 : {
							v : 467
						},
						_160 : {
							v : 446
						}
					},
					borderWidth : {
						def : {
							v : 2
						},
						_150 : {
							v : 2
						},
						_160 : {
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
					borderRadius_TopLeft : {
						_150 : {
							v : null
						},
						_160 : {
							v : 90
						},
						_149 : {
							v : 90
						}
					},
					borderRadius_TopRight : {
						def : {
							v : 0
						}
					}
				},
				_0807895648 : {
					width : {
						def : {
							v : 25
						},
						_160 : {
							v : 25
						},
						_180 : {
							v : 25
						}
					},
					height : {
						def : {
							v : 0
						},
						_160 : {
							v : 0
						},
						_180 : {
							v : 253
						}
					},
					top : {
						def : {
							v : 114
						},
						_160 : {
							v : 114
						},
						_180 : {
							v : 114
						}
					},
					left : {
						def : {
							v : 446
						},
						_160 : {
							v : 446
						},
						_180 : {
							v : 446
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
						def : {
							v : 2
						},
						_160 : {
							v : 2
						},
						_180 : {
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
				_0808268679 : {
					width : {
						def : {
							v : 0
						},
						_180 : {
							v : 0
						},
						_190 : {
							v : 25
						}
					},
					height : {
						def : {
							v : 0
						},
						_180 : {
							v : 0
						},
						_190 : {
							v : 25
						}
					},
					top : {
						def : {
							v : 374
						},
						_180 : {
							v : 372
						},
						_190 : {
							v : 372
						}
					},
					left : {
						def : {
							v : 446
						},
						_180 : {
							v : 446
						},
						_190 : {
							v : 446
						}
					},
					borderWidth : {
						def : {
							v : 2
						},
						_180 : {
							v : 2
						},
						_190 : {
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
						_180 : {
							v : null
						},
						_190 : {
							v : 90
						}
					}
				},
				_0808520704 : {
					width : {
						def : {
							v : 0
						},
						_190 : {
							v : 0
						},
						_210 : {
							v : 542
						}
					},
					height : {
						def : {
							v : 25
						},
						_190 : {
							v : 25
						},
						_210 : {
							v : 25
						}
					},
					top : {
						def : {
							v : 372
						},
						_190 : {
							v : 372
						},
						_210 : {
							v : 372
						}
					},
					left : {
						def : {
							v : 478
						},
						_190 : {
							v : 478
						},
						_210 : {
							v : 478
						}
					},
					borderWidth : {
						def : {
							v : 2
						},
						_190 : {
							v : 2
						},
						_210 : {
							v : 2
						}
					},
					borderWidth_Right : {
						_210 : {
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
				_0808842638 : {
					width : {
						def : {
							v : 125
						},
						_40 : {
							v : 125
						},
						_61 : {
							v : 125
						}
					},
					height : {
						def : {
							v : 25
						},
						_40 : {
							v : 25
						},
						_61 : {
							v : 25
						}
					},
					top : {
						def : {
							v : 266
						},
						_40 : {
							v : 266
						},
						_61 : {
							v : 266
						}
					},
					left : {
						def : {
							v : 270
						},
						_40 : {
							v : 270
						},
						_61 : {
							v : 270
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
						_61 : {
							v : 1
						}
					},
					backgroundImage : {
						def : {
							v : "http://"
						}
					}
				},
				_0809010507 : {
					width : {
						def : {
							v : 125
						},
						_70 : {
							v : 125
						},
						_90 : {
							v : 125
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
							v : 558
						},
						_70 : {
							v : 558
						},
						_90 : {
							v : 558
						}
					},
					left : {
						def : {
							v : 110
						},
						_70 : {
							v : 110
						},
						_90 : {
							v : 110
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
						_70 : {
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
					}
				},
				_0809169025 : {
					width : {
						def : {
							v : 125
						},
						_100 : {
							v : 125
						},
						_120 : {
							v : 125
						}
					},
					height : {
						def : {
							v : 25
						},
						_100 : {
							v : 25
						},
						_120 : {
							v : 25
						}
					},
					top : {
						def : {
							v : 559
						},
						_100 : {
							v : 559
						},
						_120 : {
							v : 559
						}
					},
					left : {
						def : {
							v : 851
						},
						_100 : {
							v : 851
						},
						_120 : {
							v : 851
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
						_100 : {
							v : 0
						},
						_120 : {
							v : 1
						}
					},
					backgroundImage : {
						def : {
							v : "http://"
						}
					}
				},
				_0809330797 : {
					width : {
						def : {
							v : 125
						},
						_129 : {
							v : 125
						}
					},
					height : {
						def : {
							v : 25
						},
						_129 : {
							v : 25
						}
					},
					top : {
						def : {
							v : 83
						},
						_129 : {
							v : 83
						},
						_149 : {
							v : 83
						}
					},
					left : {
						def : {
							v : 851
						},
						_129 : {
							v : 851
						},
						_149 : {
							v : 851
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
						_129 : {
							v : 0
						},
						_149 : {
							v : 1
						}
					},
					backgroundImage : {
						def : {
							v : "http://"
						}
					},
					right : {
						_149 : {
							v : null
						}
					},
					bottom : {
						_149 : {
							v : null
						}
					}
				},
				_0809757980 : {
					width : {
						def : {
							v : 125
						},
						_190 : {
							v : 125
						},
						_210 : {
							v : 125
						}
					},
					height : {
						def : {
							v : 25
						},
						_190 : {
							v : 25
						},
						_210 : {
							v : 25
						}
					},
					top : {
						def : {
							v : 372
						},
						_190 : {
							v : 372
						},
						_210 : {
							v : 372
						}
					},
					left : {
						def : {
							v : 317
						},
						_190 : {
							v : 317
						},
						_210 : {
							v : 317
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
						_190 : {
							v : 0
						},
						_210 : {
							v : 1
						}
					},
					backgroundImage : {
						def : {
							v : "http://"
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
							v : 190
						}
					},
					top : {
						def : {
							v : -190
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
							v : "rgba(10,6,6,0.70)"
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
							v : 0.70
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
							v : "rgba(140,140,140,0.72)"
						}
					},
					backgroundColor_Red : {
						def : {
							v : 140
						}
					},
					backgroundColor_Green : {
						def : {
							v : 140
						}
					},
					backgroundColor_Blue : {
						def : {
							v : 140
						}
					},
					backgroundColor_Alpha : {
						def : {
							v : 0.72
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
							v : "rgba(140,140,140,0.72)"
						}
					},
					backgroundColor_Red : {
						def : {
							v : 140
						}
					},
					backgroundColor_Green : {
						def : {
							v : 140
						}
					},
					backgroundColor_Blue : {
						def : {
							v : 140
						}
					},
					backgroundColor_Alpha : {
						def : {
							v : 0.72
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
			_1400212601 : {
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
			}
		}
	}
}; 