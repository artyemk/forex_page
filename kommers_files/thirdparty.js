/*!
 * Object.assign() Polyfill
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 */
"function"!=typeof Object.assign&&(Object.assign=function(n,t){"use strict";if(null==n)throw new TypeError("Cannot convert undefined or null to object");for(var r=Object(n),e=1;e<arguments.length;e++){var o=arguments[e];if(null!=o)for(var c in o)Object.prototype.hasOwnProperty.call(o,c)&&(r[c]=o[c])}return r});

/*!
 * Array.prototype.flat() Polyfill v1.0.0
 * Copyright 2019 Anton Zhukov
 * toxa@toxa.ru
 */
Array.prototype.flat||Object.defineProperties(Array.prototype,{flat:{configurable:!0,value:function(r){function t(e,i){var n,o=i+1;if(e instanceof Array&&i<=r)for(n=0;n<e.length;n++)n in e&&t(e[n],o);else a.push(e)}var a=[];return r=isNaN(r)?1:Number(r),t(this,0),a},writable:!0},flatMap:{configurable:!0,value:function(r){return Array.prototype.map.apply(this,arguments).flat()},writable:!0}});

/*!
 * Promise Polyfill
 * Copyright (c) 2014 Taylor Hakes
 * Copyright (c) 2014 Forbes Lindesay
 * https://github.com/taylorhakes/promise-polyfill
 */
!function(e){function n(){}function t(e,n){return function(){e.apply(n,arguments)}}function o(e){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],s(e,this)}function i(e,n){for(;3===e._state;)e=e._value;return 0===e._state?void e._deferreds.push(n):(e._handled=!0,void o._immediateFn(function(){var t=1===e._state?n.onFulfilled:n.onRejected;if(null===t)return void(1===e._state?r:u)(n.promise,e._value);var o;try{o=t(e._value)}catch(i){return void u(n.promise,i)}r(n.promise,o)}))}function r(e,n){try{if(n===e)throw new TypeError("A promise cannot be resolved with itself.");if(n&&("object"==typeof n||"function"==typeof n)){var i=n.then;if(n instanceof o)return e._state=3,e._value=n,void f(e);if("function"==typeof i)return void s(t(i,n),e)}e._state=1,e._value=n,f(e)}catch(r){u(e,r)}}function u(e,n){e._state=2,e._value=n,f(e)}function f(e){2===e._state&&0===e._deferreds.length&&o._immediateFn(function(){e._handled||o._unhandledRejectionFn(e._value)});for(var n=0,t=e._deferreds.length;n<t;n++)i(e,e._deferreds[n]);e._deferreds=null}function c(e,n,t){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof n?n:null,this.promise=t}function s(e,n){var t=!1;try{e(function(e){t||(t=!0,r(n,e))},function(e){t||(t=!0,u(n,e))})}catch(o){if(t)return;t=!0,u(n,o)}}var a=setTimeout;o.prototype["catch"]=function(e){return this.then(null,e)},o.prototype.then=function(e,t){var o=new this.constructor(n);return i(this,new c(e,t,o)),o},o.all=function(e){var n=Array.prototype.slice.call(e);return new o(function(e,t){function o(r,u){try{if(u&&("object"==typeof u||"function"==typeof u)){var f=u.then;if("function"==typeof f)return void f.call(u,function(e){o(r,e)},t)}n[r]=u,0===--i&&e(n)}catch(c){t(c)}}if(0===n.length)return e([]);for(var i=n.length,r=0;r<n.length;r++)o(r,n[r])})},o.resolve=function(e){return e&&"object"==typeof e&&e.constructor===o?e:new o(function(n){n(e)})},o.reject=function(e){return new o(function(n,t){t(e)})},o.race=function(e){return new o(function(n,t){for(var o=0,i=e.length;o<i;o++)e[o].then(n,t)})},o._immediateFn="function"==typeof setImmediate&&function(e){setImmediate(e)}||function(e){a(e,0)},o._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)},o._setImmediateFn=function(e){o._immediateFn=e},o._setUnhandledRejectionFn=function(e){o._unhandledRejectionFn=e},"undefined"!=typeof module&&module.exports?module.exports=o:e.Promise||(e.Promise=o)}(this);

/*!
 * requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
 *
 * Copyright (c) 2007-2015 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
 *
 * MIT license
 * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 * http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
 */
!function(){for(var n=0,i=["ms","moz","webkit","o"],e=0;e<i.length&&!window.requestAnimationFrame;++e)window.requestAnimationFrame=window[i[e]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[i[e]+"CancelAnimationFrame"]||window[i[e]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(i,e){var a=(new Date).getTime(),o=Math.max(0,16-(a-n)),t=window.setTimeout(function(){i(a+o)},o);return n=a+o,t}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(n){clearTimeout(n)})}();

/*!
 * jQuery MD5 Plugin 1.2.1
 * https://github.com/blueimp/jQuery-MD5
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://creativecommons.org/licenses/MIT/
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */
!function($){"use strict";function n(n,t){var r=(65535&n)+(65535&t),u=(n>>16)+(t>>16)+(r>>16);return u<<16|65535&r}function t(n,t){return n<<t|n>>>32-t}function r(r,u,e,o,c,f){return n(t(n(n(u,r),n(o,f)),c),e)}function u(n,t,u,e,o,c,f){return r(t&u|~t&e,n,t,o,c,f)}function e(n,t,u,e,o,c,f){return r(t&e|u&~e,n,t,o,c,f)}function o(n,t,u,e,o,c,f){return r(t^u^e,n,t,o,c,f)}function c(n,t,u,e,o,c,f){return r(u^(t|~e),n,t,o,c,f)}function f(t,r){t[r>>5]|=128<<r%32,t[(r+64>>>9<<4)+14]=r;var f,i,h,a,g,l=1732584193,d=-271733879,v=-1732584194,C=271733878;for(f=0;f<t.length;f+=16)i=l,h=d,a=v,g=C,l=u(l,d,v,C,t[f],7,-680876936),C=u(C,l,d,v,t[f+1],12,-389564586),v=u(v,C,l,d,t[f+2],17,606105819),d=u(d,v,C,l,t[f+3],22,-1044525330),l=u(l,d,v,C,t[f+4],7,-176418897),C=u(C,l,d,v,t[f+5],12,1200080426),v=u(v,C,l,d,t[f+6],17,-1473231341),d=u(d,v,C,l,t[f+7],22,-45705983),l=u(l,d,v,C,t[f+8],7,1770035416),C=u(C,l,d,v,t[f+9],12,-1958414417),v=u(v,C,l,d,t[f+10],17,-42063),d=u(d,v,C,l,t[f+11],22,-1990404162),l=u(l,d,v,C,t[f+12],7,1804603682),C=u(C,l,d,v,t[f+13],12,-40341101),v=u(v,C,l,d,t[f+14],17,-1502002290),d=u(d,v,C,l,t[f+15],22,1236535329),l=e(l,d,v,C,t[f+1],5,-165796510),C=e(C,l,d,v,t[f+6],9,-1069501632),v=e(v,C,l,d,t[f+11],14,643717713),d=e(d,v,C,l,t[f],20,-373897302),l=e(l,d,v,C,t[f+5],5,-701558691),C=e(C,l,d,v,t[f+10],9,38016083),v=e(v,C,l,d,t[f+15],14,-660478335),d=e(d,v,C,l,t[f+4],20,-405537848),l=e(l,d,v,C,t[f+9],5,568446438),C=e(C,l,d,v,t[f+14],9,-1019803690),v=e(v,C,l,d,t[f+3],14,-187363961),d=e(d,v,C,l,t[f+8],20,1163531501),l=e(l,d,v,C,t[f+13],5,-1444681467),C=e(C,l,d,v,t[f+2],9,-51403784),v=e(v,C,l,d,t[f+7],14,1735328473),d=e(d,v,C,l,t[f+12],20,-1926607734),l=o(l,d,v,C,t[f+5],4,-378558),C=o(C,l,d,v,t[f+8],11,-2022574463),v=o(v,C,l,d,t[f+11],16,1839030562),d=o(d,v,C,l,t[f+14],23,-35309556),l=o(l,d,v,C,t[f+1],4,-1530992060),C=o(C,l,d,v,t[f+4],11,1272893353),v=o(v,C,l,d,t[f+7],16,-155497632),d=o(d,v,C,l,t[f+10],23,-1094730640),l=o(l,d,v,C,t[f+13],4,681279174),C=o(C,l,d,v,t[f],11,-358537222),v=o(v,C,l,d,t[f+3],16,-722521979),d=o(d,v,C,l,t[f+6],23,76029189),l=o(l,d,v,C,t[f+9],4,-640364487),C=o(C,l,d,v,t[f+12],11,-421815835),v=o(v,C,l,d,t[f+15],16,530742520),d=o(d,v,C,l,t[f+2],23,-995338651),l=c(l,d,v,C,t[f],6,-198630844),C=c(C,l,d,v,t[f+7],10,1126891415),v=c(v,C,l,d,t[f+14],15,-1416354905),d=c(d,v,C,l,t[f+5],21,-57434055),l=c(l,d,v,C,t[f+12],6,1700485571),C=c(C,l,d,v,t[f+3],10,-1894986606),v=c(v,C,l,d,t[f+10],15,-1051523),d=c(d,v,C,l,t[f+1],21,-2054922799),l=c(l,d,v,C,t[f+8],6,1873313359),C=c(C,l,d,v,t[f+15],10,-30611744),v=c(v,C,l,d,t[f+6],15,-1560198380),d=c(d,v,C,l,t[f+13],21,1309151649),l=c(l,d,v,C,t[f+4],6,-145523070),C=c(C,l,d,v,t[f+11],10,-1120210379),v=c(v,C,l,d,t[f+2],15,718787259),d=c(d,v,C,l,t[f+9],21,-343485551),l=n(l,i),d=n(d,h),v=n(v,a),C=n(C,g);return[l,d,v,C]}function i(n){var t,r="";for(t=0;t<32*n.length;t+=8)r+=String.fromCharCode(n[t>>5]>>>t%32&255);return r}function h(n){var t,r=[];for(r[(n.length>>2)-1]=void 0,t=0;t<r.length;t+=1)r[t]=0;for(t=0;t<8*n.length;t+=8)r[t>>5]|=(255&n.charCodeAt(t/8))<<t%32;return r}function a(n){return i(f(h(n),8*n.length))}function g(n,t){var r,u,e=h(n),o=[],c=[];for(o[15]=c[15]=void 0,e.length>16&&(e=f(e,8*n.length)),r=0;16>r;r+=1)o[r]=909522486^e[r],c[r]=1549556828^e[r];return u=f(o.concat(h(t)),512+8*t.length),i(f(c.concat(u),640))}function l(n){var t,r,u="0123456789abcdef",e="";for(r=0;r<n.length;r+=1)t=n.charCodeAt(r),e+=u.charAt(t>>>4&15)+u.charAt(15&t);return e}function d(n){return unescape(encodeURIComponent(n))}function v(n){return a(d(n))}function C(n){return l(v(n))}function s(n,t){return g(d(n),d(t))}function A(n,t){return l(s(n,t))}$.md5=function(n,t,r){return t?r?s(t,n):A(t,n):r?v(n):C(n)}}("function"==typeof jQuery?jQuery:this);

/*!
 * Zoom 1.7.21
 * license: MIT
 * http://www.jacklmoore.com/zoom
 */
(function(o){var t={url:!1,callback:!1,target:!1,duration:120,on:"mouseover",touch:!0,onZoomIn:!1,onZoomOut:!1,magnify:1};o.zoom=function(t,n,e,i){var u,c,a,r,m,l,s,f=o(t),h=f.css("position"),d=o(n);return t.style.position=/(absolute|fixed)/.test(h)?h:"relative",t.style.overflow="hidden",e.style.width=e.style.height="",o(e).addClass("zoomImg").css({position:"absolute",top:0,left:0,opacity:0,width:e.width*i,height:e.height*i,border:"none",maxWidth:"none",maxHeight:"none"}).appendTo(t),{init:function(){c=f.outerWidth(),u=f.outerHeight(),n===t?(r=c,a=u):(r=d.outerWidth(),a=d.outerHeight()),m=(e.width-c)/r,l=(e.height-u)/a,s=d.offset()},move:function(o){var t=o.pageX-s.left,n=o.pageY-s.top;n=Math.max(Math.min(n,a),0),t=Math.max(Math.min(t,r),0),e.style.left=t*-m+"px",e.style.top=n*-l+"px"}}},o.fn.zoom=function(n){return this.each(function(){var e=o.extend({},t,n||{}),i=e.target&&o(e.target)[0]||this,u=this,c=o(u),a=document.createElement("img"),r=o(a),m="mousemove.zoom",l=!1,s=!1;if(!e.url){var f=u.querySelector("img");if(f&&(e.url=f.getAttribute("data-src")||f.currentSrc||f.src),!e.url)return}c.one("zoom.destroy",function(o,t){c.off(".zoom"),i.style.position=o,i.style.overflow=t,a.onload=null,r.remove()}.bind(this,i.style.position,i.style.overflow)),a.onload=function(){function t(t){f.init(),f.move(t),r.stop().fadeTo(o.support.opacity?e.duration:0,1,o.isFunction(e.onZoomIn)?e.onZoomIn.call(a):!1)}function n(){r.stop().fadeTo(e.duration,0,o.isFunction(e.onZoomOut)?e.onZoomOut.call(a):!1)}var f=o.zoom(i,u,a,e.magnify);"grab"===e.on?c.on("mousedown.zoom",function(e){1===e.which&&(o(document).one("mouseup.zoom",function(){n(),o(document).off(m,f.move)}),t(e),o(document).on(m,f.move),e.preventDefault())}):"click"===e.on?c.on("click.zoom",function(e){return l?void 0:(l=!0,t(e),o(document).on(m,f.move),o(document).one("click.zoom",function(){n(),l=!1,o(document).off(m,f.move)}),!1)}):"toggle"===e.on?c.on("click.zoom",function(o){l?n():t(o),l=!l}):"mouseover"===e.on&&(f.init(),c.on("mouseenter.zoom",t).on("mouseleave.zoom",n).on(m,f.move)),e.touch&&c.on("touchstart.zoom",function(o){o.preventDefault(),s?(s=!1,n()):(s=!0,t(o.originalEvent.touches[0]||o.originalEvent.changedTouches[0]))}).on("touchmove.zoom",function(o){o.preventDefault(),f.move(o.originalEvent.touches[0]||o.originalEvent.changedTouches[0])}).on("touchend.zoom",function(o){o.preventDefault(),s&&(s=!1,n())}),o.isFunction(e.callback)&&e.callback.call(a)},a.setAttribute("role","presentation"),a.alt="",a.src=e.url})},o.fn.zoom.defaults=t})(window.jQuery);

/*!
 * FitVids 1.1
 *
 * Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
 * Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
 * Released under the WTFPL license - http://sam.zoy.org/wtfpl/
 *
 */
(function($){"use strict";$.fn.fitVids=function(options){var settings={customSelector:null};if(!document.getElementById('fit-vids-style')){var head=document.head||document.getElementsByTagName('head')[0];var css='.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}';var div=document.createElement('div');div.innerHTML='<p>x</p><style id="fit-vids-style">'+css+'</style>';head.appendChild(div.childNodes[1])}if(options){$.extend(settings,options)}return this.each(function(){var selectors=["iframe[src*='player.vimeo.com']","iframe[src*='youtube.com']","iframe[src*='youtube-nocookie.com']","iframe[src*='kickstarter.com'][src*='video.html']","object","embed"];if(settings.customSelector){selectors.push(settings.customSelector)}var $allVideos=$(this).find(selectors.join(','));$allVideos=$allVideos.not("object object");$allVideos.each(function(){var $this=$(this);if(this.tagName.toLowerCase()==='embed'&&$this.parent('object').length||$this.parent('.fluid-width-video-wrapper').length){return}var height=(this.tagName.toLowerCase()==='object'||($this.attr('height')&&!isNaN(parseInt($this.attr('height'),10))))?parseInt($this.attr('height'),10):$this.height(),width=!isNaN(parseInt($this.attr('width'),10))?parseInt($this.attr('width'),10):$this.width(),aspectRatio=height/width;if(!$this.attr('id')){var videoID='fitvid'+Math.floor(Math.random()*999999);$this.attr('id',videoID)}$this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top',(aspectRatio*100)+"%");$this.removeAttr('height').removeAttr('width')})})}})(window.jQuery||window.Zepto);

/*!
 * scrollTo 2.1.2
 *
 * Copyright (c) 2007-2015 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
 * Licensed under MIT
 * @author Ariel Flesler
 * @version 2.1.2
 *
 */
(function(f){"use strict";"function"===typeof define&&define.amd?define(["jquery"],f):"undefined"!==typeof module&&module.exports?module.exports=f(require("jquery")):f(jQuery)})(function($){"use strict";function n(a){return!a.nodeName||-1!==$.inArray(a.nodeName.toLowerCase(),["iframe","#document","html","body"])}function h(a){return $.isFunction(a)||$.isPlainObject(a)?a:{top:a,left:a}}var p=$.scrollTo=function(a,d,b){return $(window).scrollTo(a,d,b)};p.defaults={axis:"xy",duration:0,limit:!0};$.fn.scrollTo=function(a,d,b){"object"=== typeof d&&(b=d,d=0);"function"===typeof b&&(b={onAfter:b});"max"===a&&(a=9E9);b=$.extend({},p.defaults,b);d=d||b.duration;var u=b.queue&&1<b.axis.length;u&&(d/=2);b.offset=h(b.offset);b.over=h(b.over);return this.each(function(){function k(a){var k=$.extend({},b,{queue:!0,duration:d,complete:a&&function(){a.call(q,e,b)}});r.animate(f,k)}if(null!==a){var l=n(this),q=l?this.contentWindow||window:this,r=$(q),e=a,f={},t;switch(typeof e){case "number":case "string":if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(e)){e= h(e);break}e=l?$(e):$(e,q);case "object":if(e.length===0)return;if(e.is||e.style)t=(e=$(e)).offset()}var v=$.isFunction(b.offset)&&b.offset(q,e)||b.offset;$.each(b.axis.split(""),function(a,c){var d="x"===c?"Left":"Top",m=d.toLowerCase(),g="scroll"+d,h=r[g](),n=p.max(q,c);t?(f[g]=t[m]+(l?0:h-r.offset()[m]),b.margin&&(f[g]-=parseInt(e.css("margin"+d),10)||0,f[g]-=parseInt(e.css("border"+d+"Width"),10)||0),f[g]+=v[m]||0,b.over[m]&&(f[g]+=e["x"===c?"width":"height"]()*b.over[m])):(d=e[m],f[g]=d.slice&& "%"===d.slice(-1)?parseFloat(d)/100*n:d);b.limit&&/^\d+$/.test(f[g])&&(f[g]=0>=f[g]?0:Math.min(f[g],n));!a&&1<b.axis.length&&(h===f[g]?f={}:u&&(k(b.onAfterFirst),f={}))});k(b.onAfter)}})};p.max=function(a,d){var b="x"===d?"Width":"Height",h="scroll"+b;if(!n(a))return a[h]-$(a)[b.toLowerCase()]();var b="client"+b,k=a.ownerDocument||a.document,l=k.documentElement,k=k.body;return Math.max(l[h],k[h])-Math.min(l[b],k[b])};$.Tween.propHooks.scrollLeft=$.Tween.propHooks.scrollTop={get:function(a){return $(a.elem)[a.prop]()}, set:function(a){var d=this.get(a);if(a.options.interrupt&&a._last&&a._last!==d)return $(a.elem).stop();var b=Math.round(a.now);d!==b&&($(a.elem)[a.prop](b),a._last=this.get(a))}};return p});

/*!
 * adSegmentator
 */
window.adSegmentator=function(){function o(o){var e,n,t,r=document.cookie.split(";");for(e=0;e<r.length;e++)if(n=r[e].substr(0,r[e].indexOf("=")),t=r[e].substr(r[e].indexOf("=")+1),n=n.replace(/^\s+|\s+$/g,""),n==o)return unescape(t);return null}function e(o,e,n,t,r){var u=new Date;u.setSeconds(u.getSeconds()+n);var c=escape(e||"")+(null==n?"":"; expires="+u.toUTCString())+(";path="+(t||"/"))+(r?";domain="+i.toASCII(r):"");document.cookie=o+"="+c}function n(n,t,r){for(var i=location.hostname,u=i.split("."),c=1;c<=u.length;c++){var a=u.slice(u.length-c).join(".");if(e(n,t,r,"/",a),o(n)==t)break}}function t(o,e){return Math.floor(Math.random()*(e-o+1))+o}var r="rr-VisitorSegment",i=function(o){function e(o){throw new RangeError(k[o])}function n(o,e){for(var n=o.length,t=[];n--;)t[n]=e(o[n]);return t}function t(o,e){var t=o.split("@"),r="";t.length>1&&(r=t[0]+"@",o=t[1]),o=o.replace(j,".");var i=o.split("."),u=n(i,e).join(".");return r+u}function r(o){for(var e,n,t=[],r=0,i=o.length;i>r;)e=o.charCodeAt(r++),55296>e||e>56319||r>=i?t.push(e):(n=o.charCodeAt(r++),56320==(64512&n)?t.push(((1023&e)<<10)+(1023&n)+65536):(t.push(e),r--));return t}function i(o){return n(o,function(o){var e="";return o>65535&&(o-=65536,e+=E(o>>>10&1023|55296),o=56320|1023&o),e+=E(o)}).join("")}function u(o){return 10>o-48?o-22:26>o-65?o-65:26>o-97?o-97:v}function c(o,e){return o+22+75*(26>o)-((0!=e)<<5)}function a(o,e,n){var t=0;for(o=n?T(o/C):o>>1,o+=T(o/e);o>A*w>>1;t+=v)o=T(o/A);return T(t+(A+1)*o/(o+x))}function f(o){var n,t,r,c,f,s,l,d,p,x,C=[],y=o.length,I=0,j=b,k=m;for(t=o.lastIndexOf(S),0>t&&(t=0),r=0;t>r;++r)o.charCodeAt(r)>=128&&e("not-basic"),C.push(o.charCodeAt(r));for(c=t>0?t+1:0;y>c;){for(f=I,s=1,l=v;c>=y&&e("invalid-input"),d=u(o.charCodeAt(c++)),(d>=v||d>T((h-I)/s))&&e("overflow"),I+=d*s,p=l>k?k+w>l?l-k:w:g,!(p>d);l+=v)x=v-p,s>T(h/x)&&e("overflow"),s*=x;n=C.length+1,k=a(I-f,n,0==f),T(I/n)>h-j&&e("overflow"),j+=T(I/n),I%=n,C.splice(I++,0,j)}return i(C)}function s(o){var n,t,i,u,f,s,l,d,p,x,C,y,I,j,k,A=[];for(o=r(o),y=o.length,n=b,t=0,f=m,s=0;y>s;++s)C=o[s],128>C&&A.push(E(C));for(i=u=A.length,u&&A.push(S);y>i;){for(l=h,s=0;y>s;++s)C=o[s],C>=n&&l>C&&(l=C);for(I=i+1,l-n>T((h-t)/I)&&e("overflow"),t+=(l-n)*I,n=l,s=0;y>s;++s)if(C=o[s],n>C&&++t>h&&e("overflow"),C==n){for(d=t,p=v;x=p>f?f+w>p?p-f:w:g,!(x>d);p+=v)k=d-x,j=v-x,A.push(E(c(x+k%j,0))),d=T(k/j);A.push(E(c(d,0))),f=a(t,I,i==u),t=0,++i}++t,++n}return A.join("")}function l(o){return t(o,function(o){return y.test(o)?f(o.slice(4).toLowerCase()):o})}function d(o){return t(o,function(o){return I.test(o)?"xn--"+s(o):o})}var p=("object"==typeof exports&&exports&&!exports.nodeType&&exports,"object"==typeof module&&module&&!module.nodeType&&module,"object"==typeof global&&global);(p.global===p||p.window===p||p.self===p)&&(o=p);var h=2147483647,v=36,g=1,w=26,x=38,C=700,m=72,b=128,S="-",y=/^xn--/,I=/[^\x20-\x7E]/,j=/[\x2E\u3002\uFF0E\uFF61]/g,k={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},A=v-g,T=Math.floor,E=String.fromCharCode;return{version:"1.3.2",ucs2:{decode:r,encode:i},decode:f,encode:s,toASCII:d,toUnicode:l}}(),u={getCookie:o,daysToSecond:function(o){return 24*o*60*60},setRootCookie:n};return{getVisitorSegment:function(o,e){e=e||{};var n=u.getCookie(r);return n&&n.split(":")[0]==o||(n=o+":"+t(1,o)),u.setRootCookie(r,n,u.daysToSecond(e.expireInDay||60),"/"),n.split(":")[1]}}}();
