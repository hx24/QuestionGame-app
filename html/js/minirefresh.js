/*!
 * minirefresh v2.0.1
 * (c) 2017-2017 dailc
 * Released under the MIT License.
 * https://github.com/minirefresh/minirefresh
 */
!function(o,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):o.MiniRefreshTools=t()}(this,function(){"use strict";function o(o){return Array.isArray?Array.isArray(o):o instanceof Array}function t(o){var t=Object.prototype.toString.call(o).match(/^\[object\s(.*)\]$/)[1];return"String"!==t&&"Number"!==t&&"Boolean"!==t&&"Undefined"!==t&&"Null"!==t}function n(o){return o&&o===window}function i(o){return t(o)&&!n(o)&&Object.getPrototypeOf(o)===Object.prototype}function s(){var n=arguments,e=arguments.length,r=(arguments.length<=0?void 0:arguments[0])||{},a=1,l=!1;"boolean"==typeof r&&(l=r,r=(arguments.length<=a?void 0:arguments[a])||{},a++),t(r)||(r={});for(var c=function(){var e=n.length<=a?void 0:n[a];e&&t(e)&&Object.keys(e).forEach(function(t){var n=r[t],a=e[t],c=i(a),p=o(a),u=void 0;r!==a&&(l&&a&&(p||c)?(p?(p=!1,u=n&&o(n)?n:[]):u=n&&i(n)?n:{},r[t]=s(l,u,a)):void 0!==a&&(r[t]=a))})};a<e;a++)c();return r}function e(o){var t=o;return"string"==typeof t&&(t=document.querySelector(t)),t}function r(o){var t=o.clientHeight;return o===document.body&&"CSS1Compat"===document.compatMode&&(t=document.documentElement.clientHeight),t}function a(o,t,n){if(!t)return o;for(var i=t.split("."),s=i.length,e=o,r=0;r<s-1;r+=1){var a=i[r];e[a]=e[a]||{},e=e[a]}return e[i[s-1]]=n,n}var l=function(){},c=Object.freeze({getNow:function(){return window.performance&&(window.performance.now?window.performance.now()+window.performance.timing.navigationStart:+new Date)},noop:l,isArray:o,isObject:t,isWindow:n,isPlainObject:i,extend:s,selector:e,getClientHeightByDom:r,namespace:a}),p=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||function(o){return window.setTimeout(o,(o.interval||1e3/60)/2)},u=function(){function o(o,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(o,i.key,i)}}return function(t,n,i){return n&&o(t.prototype,n),i&&o(t,i),t}}(),d=function(){function o(t){!function(o,t){if(!(o instanceof t))throw new TypeError("Cannot call a class as a function")}(this,o),this.contentWrap=t.contentWrap,this.scrollWrap=t.scrollWrap,this.options=t.options,this.os=t.os,this.events={},this.hooks={},this.isScrollTo=!1,this.upLoading=!1,this.downLoading=!1,this.isFinishUp=!1,this._init()}return u(o,[{key:"_init",value:function(){var o=this;this._initPullDown(),this._initPullUp(),setTimeout(function(){o.options.down&&o.options.down.isAuto&&!o.options.down.isLock?o.options.down.isAllowAutoLoading?o.triggerDownLoading():o.events.downLoading&&o.events.downLoading(!0):o.options.up&&o.options.up.isAuto&&!o.options.up.isLock&&o.triggerUpLoading(),o.events.initScroll&&o.events.initScroll()})}},{key:"refreshOptions",value:function(o){this.options=o}},{key:"translateContentWrap",value:function(o,t){var n=o||0,i=t||0;if(this.downHight=n,this.options.down.isScrollCssTranslate){var s=this.contentWrap;s.style.webkitTransitionDuration=i+"ms",s.style.transitionDuration=i+"ms",s.style.webkitTransform="translate(0px, "+n+"px) translateZ(0px)",s.style.transform="translate(0px, "+n+"px) translateZ(0px)"}}},{key:"_scrollWrapAnimation",value:function(){this.scrollWrap.webkitTransitionTimingFunction="cubic-bezier(0.1, 0.57, 0.1, 1)",this.scrollWrap.transitionTimingFunction="cubic-bezier(0.1, 0.57, 0.1, 1)"}},{key:"_initPullDown",value:function(){var o=this,t=this.scrollWrap,n=document.documentElement.clientHeight;this._scrollWrapAnimation();var i=function(n){o.isScrollTo&&n.preventDefault(),o.startTop=t.scrollTop,o.startY=n.touches?n.touches[0].pageY:n.clientY,o.startX=n.touches?n.touches[0].pageX:n.clientX};t.addEventListener("touchstart",i),t.addEventListener("mousedown",i);var s=function(){var t=o.options;o.isMoveDown&&(o.downHight>=t.down.offset?o.triggerDownLoading():(o.translateContentWrap(0,t.down.bounceTime),o.events.cancelLoading&&o.events.cancelLoading()),o.isMoveDown=!1),o.startY=0,o.startX=0,o.preY=0,o.startTop=void 0,o.isBounce=!1};t.addEventListener("touchend",s),t.addEventListener("mouseup",s),t.addEventListener("mouseleave",s);var e=function(i){var e=o.options,r=!0;if(o.downLoading?r=!1:!e.down.isAways&&o.upLoading&&(r=!1),void 0!==o.startTop&&o.startTop<=0&&r&&!o.options.down.isLock){var a=i.touches?i.touches[0].pageY:i.clientY,l=i.touches?i.touches[0].pageX:i.clientX;if(a>n)return void s();o.preY||(o.preY=a);var c=a-o.preY;o.preY=a;var p=a-o.startY,u=l-o.startX;if(e.isLockX&&Math.abs(u)>Math.abs(p))return void i.preventDefault();if(o.isBounce&&o.os.ios)return;if(p>0){o.isMoveDown=!0,i.preventDefault(),o.downHight||(o.downHight=0);var d=e.down.offset,h=1;h=o.downHight<d?e.down.dampRateBegin:e.down.dampRate,o.downHight+=c>0?c*h:c,o.events.pull&&o.events.pull(o.downHight,d),o.translateContentWrap(o.downHight)}else o.isBounce=!0,t.scrollTop<=0&&(t.scrollTop+=Math.abs(c))}};t.addEventListener("touchmove",e),t.addEventListener("mousemove",e)}},{key:"_initPullUp",value:function(){var o=this,t=this.scrollWrap;(t===document.body?window:t).addEventListener("scroll",function(){var n=t.scrollTop,i=t.scrollHeight,s=r(t),e=o.options;o.events.scroll&&o.events.scroll(n);var a=!0;if(o.upLoading?a=!1:!e.down.isAways&&o.downLoading&&(a=!1),a&&!o.options.up.isLock&&!o.isFinishUp&&i>0){i-s-n<=e.up.offset&&o.triggerUpLoading()}})}},{key:"_loadFull",value:function(){var o=this,t=this.scrollWrap,n=this.options;setTimeout(function(){!o.options.up.isLock&&n.up.loadFull.isEnable&&0===t.scrollTop&&t.scrollHeight>0&&t.scrollHeight<=r(t)&&o.triggerUpLoading()},n.up.loadFull.delay||0)}},{key:"triggerDownLoading",value:function(){var o=this.options;this.hooks.beforeDownLoading&&!this.hooks.beforeDownLoading(this.downHight,o.down.offset)||(this.downLoading=!0,this.translateContentWrap(o.down.offset,o.down.bounceTime),this.events.downLoading&&this.events.downLoading())}},{key:"endDownLoading",value:function(){var o=this.options;this.downLoading&&(this.translateContentWrap(0,o.down.bounceTime),this.downLoading=!1)}},{key:"triggerUpLoading",value:function(){this.upLoading=!0,this.events.upLoading&&this.events.upLoading()}},{key:"endUpLoading",value:function(o){this.upLoading&&(this.upLoading=!1,o?this.isFinishUp=!0:this._loadFull())}},{key:"resetUpLoading",value:function(){this.isFinishUp&&(this.isFinishUp=!1),this._loadFull(),this.events.resetUpLoading&&this.events.resetUpLoading()}},{key:"scrollTo",value:function(o,t){var n=this,i=this.scrollWrap,s=t||0,e=i.scrollHeight-r(i),a=o||0;a=Math.max(a,0),a=Math.min(a,e);var l=i.scrollTop-a;if(0!==l&&0!==s){var c=Math.floor(s/(1e3/60)),u=l/c,d=0;this.isScrollTo=!0,p(function o(){d<c?(d===c-1?i.scrollTop=a:i.scrollTop-=u,d+=1,p(o)):(i.scrollTop=a,n.isScrollTo=!1)})}else i.scrollTop=a}},{key:"on",value:function(o,t){o&&"function"==typeof t&&(this.events[o]=t)}},{key:"hook",value:function(o,t){o&&"function"==typeof t&&(this.hooks[o]=t)}}]),o}(),h=function(){function o(o,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(o,i.key,i)}}return function(t,n,i){return n&&o(t.prototype,n),i&&o(t,i),t}}(),f={down:{isLock:!1,isAuto:!1,isAllowAutoLoading:!0,isAways:!1,isScrollCssTranslate:!0,isAutoResetUpLoading:!0,offset:75,dampRateBegin:1,dampRate:.3,bounceTime:300,successAnim:{isEnable:!1,duration:300},onPull:null,onCalcel:null,callback:l},up:{isLock:!1,isAuto:!0,isShowUpLoading:!0,offset:100,loadFull:{isEnable:!0,delay:300},onScroll:null,callback:l},container:"#minirefresh",isLockX:!0,isScrollBar:!0,isUseBodyScroll:!1},w="minirefresh-hide-scrollbar",g=function(){function o(t){!function(o,t){if(!(o instanceof t))throw new TypeError("Cannot call a class as a function")}(this,o),function(o){(function(o){this.os={};var t=o.match(/(Android);?[\s/]+([\d.]+)?/);t&&(this.os.android=!0,this.os.version=t[2],this.os.isBadAndroid=!/Chrome\/\d/.test(window.navigator.appVersion));var n=o.match(/(iPhone\sOS)\s([\d_]+)/);n&&(this.os.ios=!0,this.os.iphone=!0,this.os.version=n[2].replace(/_/g,"."));var i=o.match(/(iPad).*OS\s([\d_]+)/);i&&(this.os.ios=!0,this.os.ipad=!0,this.os.version=i[2].replace(/_/g,"."));var s=o.match(/QuickHybrid/i);s&&(this.os.quick=!0);var e=o.match(/EpointEJS/i);e&&(this.os.ejs=!0);var r=o.match(/DingTalk/i);r&&(this.os.dd=!0),e||r||s||(this.os.h5=!0)}).call(o,navigator.userAgent)}(this),this.options=s(!0,{},f,t),this.container=e(this.options.container),this.contentWrap=this.container.children[0],this.scrollWrap=this.options.isUseBodyScroll?document.body:this.container,this.options.isScrollBar||this.container.classList.add(w),this._initHook&&this._initHook(this.options.down.isLock,this.options.up.isLock),this.scroller=new d(this),this._initEvent(),this.options.up.isLock&&this._lockUpLoading(this.options.up.isLock),this.options.down.isLock&&this._lockDownLoading(this.options.down.isLock)}return h(o,[{key:"_initEvent",value:function(){var o=this,t=this.options;this.scroller.on("initScroll",function(){o._initScrollHook&&o._initScrollHook()}),this.scroller.on("downLoading",function(n){!n&&o._downLoaingHook&&o._downLoaingHook(),t.down.callback&&t.down.callback()}),this.scroller.on("cancelLoading",function(){o._cancelLoaingHook&&o._cancelLoaingHook(),t.down.onCalcel&&t.down.onCalcel()}),this.scroller.on("pull",function(n,i){o._pullHook&&o._pullHook(n,i),t.down.onPull&&t.down.onPull()}),this.scroller.on("upLoading",function(){o._upLoaingHook&&o._upLoaingHook(o.options.up.isShowUpLoading),t.up.callback&&t.up.callback()}),this.scroller.on("resetUpLoading",function(){o._resetUpLoadingHook&&o._resetUpLoadingHook()}),this.scroller.on("scroll",function(n){o._scrollHook&&o._scrollHook(n),t.up.onScroll&&t.up.onScroll(n)}),this.scroller.hook("beforeDownLoading",function(t,n){return!o._beforeDownLoadingHook||o._beforeDownLoadingHook(t,n)})}},{key:"_endDownLoading",value:function(o,t){var n=this;if(this.options.down&&this.scroller.downLoading){var i=this.options.down.successAnim.isEnable,s=this.options.down.successAnim.duration;i?this._downLoaingSuccessHook&&this._downLoaingSuccessHook(o,t):s=0,setTimeout(function(){n.scroller.endDownLoading(),n._downLoaingEndHook&&n._downLoaingEndHook(o)},s)}}},{key:"_lockUpLoading",value:function(o){this.options.up.isLock=o,this._lockUpLoadingHook&&this._lockUpLoadingHook(o)}},{key:"_lockDownLoading",value:function(o){this.options.down.isLock=o,this._lockDownLoadingHook&&this._lockDownLoadingHook(o)}},{key:"refreshOptions",value:function(o){this.options=s(!0,{},this.options,o),this.scroller.refreshOptions(this.options),this._lockUpLoading(this.options.up.isLock),this._lockDownLoading(this.options.down.isLock),this._refreshHook&&this._refreshHook()}},{key:"endDownLoading",value:function(){var o=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],t=arguments[1];this._endDownLoading(o,t),this.options.down.isAutoResetUpLoading&&this.resetUpLoading()}},{key:"resetUpLoading",value:function(){this.scroller.resetUpLoading()}},{key:"endUpLoading",value:function(o){this.scroller.upLoading&&(this.scroller.endUpLoading(o),this._upLoaingEndHook&&this._upLoaingEndHook(o))}},{key:"triggerUpLoading",value:function(){this.scroller.triggerUpLoading()}},{key:"triggerDownLoading",value:function(){this.scroller.scrollTo(0),this.scroller.triggerDownLoading()}},{key:"scrollTo",value:function(o,t){this.scroller.scrollTo(o,t)}},{key:"getPosition",value:function(){return this.scrollWrap.scrollTop}}]),o}(),v={};return Object.keys(c).forEach(function(o){v[o]=c[o]}),v.namespace=function(o,t){a(v,o,t)},v.Core=g,v.version="2.0.0",window.MiniRefreshTools=v,v}),function(o,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):o.MiniRefresh=t()}(this,function(){"use strict";var o=function(){function o(o,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(o,i.key,i)}}return function(t,n,i){return n&&o(t.prototype,n),i&&o(t,i),t}}(),t=MiniRefreshTools.Core,n=MiniRefreshTools.version,i=MiniRefreshTools.extend,s=MiniRefreshTools.namespace,e="minirefresh-rotate",r="minirefresh-hidden",a={down:{successAnim:{isEnable:!1,duration:300},contentdown:"下拉刷新",contentover:"释放刷新",contentrefresh:"加载中...",contentsuccess:"刷新成功",contenterror:"刷新失败",isWrapCssTranslate:!1},up:{toTop:{isEnable:!0,duration:300,offset:800},contentdown:"",contentrefresh:"加载中...",contentnomore:"没有更多数据了"}},l=function(n){function s(o){!function(o,t){if(!(o instanceof t))throw new TypeError("Cannot call a class as a function")}(this,s);var t=i(!0,{},a,o);return function(o,t){if(!o)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?o:t}(this,(s.__proto__||Object.getPrototypeOf(s)).call(this,t))}return function(o,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);o.prototype=Object.create(t&&t.prototype,{constructor:{value:o,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(o,t):o.__proto__=t)}(s,t),o(s,[{key:"_initHook",value:function(){var o=this.container,t=this.contentWrap;o.classList.add("minirefresh-theme-default"),t.classList.add("minirefresh-hardware-speedup"),this.options.isUseBodyScroll&&(o.classList.add("body-scroll-wrap"),t.classList.add("body-scroll-wrap")),this._initDownWrap(),this._initUpWrap(),this._initToTop()}},{key:"_refreshHook",value:function(){this.options.down.isWrapCssTranslate?this._transformDownWrap(-this.downWrapHeight):this._transformDownWrap(0,0,!0),this.options.up.toTop.isEnable||(this.toTopBtn&&this.toTopBtn.classList.add(r),this.isShowToTopBtn=!1)}},{key:"_initDownWrap",value:function(){var o=this.container,t=this.contentWrap,n=this.options,i=document.createElement("div");i.className="minirefresh-downwrap minirefresh-hardware-speedup",i.innerHTML=' \n            <div class="downwrap-content">\n                <p class="downwrap-progress"></p>\n                <p class="downwrap-tips">'+n.down.contentdown+"</p>\n            </div>\n        ",o.insertBefore(i,t),this.downWrap=i,this.downWrapProgress=this.downWrap.querySelector(".downwrap-progress"),this.downWrapTips=this.downWrap.querySelector(".downwrap-tips"),this.isCanPullDown=!1,this.downWrapHeight=i.offsetHeight||75,this._transformDownWrap(-this.downWrapHeight),s._changeWrapStatusClass(this.downWrap,"status-default")}},{key:"_transformDownWrap",value:function(){var o=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;if(arguments[2]||this.options.down.isWrapCssTranslate){var n=t+"ms",i="translateY("+o+"px)  translateZ(0px)";this.downWrap.style.webkitTransitionDuration=n,this.downWrap.style.transitionDuration=n,this.downWrap.style.webkitTransform=i,this.downWrap.style.transform=i}}},{key:"_initUpWrap",value:function(){var o=this.contentWrap,t=this.options,n=document.createElement("div");n.className="minirefresh-upwrap minirefresh-hardware-speedup",n.innerHTML=' \n            <p class="upwrap-progress"></p>\n            <p class="upwrap-tips">'+t.up.contentdown+"</p>\n        ",n.style.visibility="hidden",o.appendChild(n),this.upWrap=n,this.upWrapProgress=this.upWrap.querySelector(".upwrap-progress"),this.upWrapTips=this.upWrap.querySelector(".upwrap-tips"),s._changeWrapStatusClass(this.upWrap,"status-default")}},{key:"_initToTop",value:function(){var o=this,t=this.options,n=t.up.toTop.isEnable,i=t.up.toTop.duration;if(n){var s=document.createElement("div");s.className="minirefresh-totop minirefresh-theme-default",s.onclick=function(){o.scroller.scrollTo(0,i)},s.classList.add(r),this.toTopBtn=s,this.isShowToTopBtn=!1,this.container.appendChild(s)}}},{key:"_pullHook",value:function(o,t){var n=this.options;if(o<t?this.isCanPullDown&&(this.isCanPullDown=!1,s._changeWrapStatusClass(this.downWrap,"status-default"),this.downWrapTips.innerText=n.down.contentdown):this.isCanPullDown||(this.downWrapTips.innerText=n.down.contentover,this.isCanPullDown=!0,s._changeWrapStatusClass(this.downWrap,"status-pull")),this.downWrapProgress){var i="rotate("+360*(o/t)+"deg)";this.downWrapProgress.style.webkitTransform=i,this.downWrapProgress.style.transform=i}this._transformDownWrap(-this.downWrapHeight+o)}},{key:"_scrollHook",value:function(o){var t=this.options,n=t.up.toTop.isEnable,i=this.toTopBtn;n&&i&&(o>=t.up.toTop.offset?this.isShowToTopBtn||(i.classList.remove("minirefresh-fade-out"),i.classList.remove(r),i.classList.add("minirefresh-fade-in"),this.isShowToTopBtn=!0):this.isShowToTopBtn&&(i.classList.add("minirefresh-fade-out"),i.classList.remove("minirefresh-fade-in"),this.isShowToTopBtn=!1))}},{key:"_downLoaingHook",value:function(){this._transformDownWrap(-this.downWrapHeight+this.options.down.offset,this.options.down.bounceTime),this.downWrapTips.innerText=this.options.down.contentrefresh,this.downWrapProgress.classList.add(e),s._changeWrapStatusClass(this.downWrap,"status-loading")}},{key:"_downLoaingSuccessHook",value:function(o,t){this.options.down.contentsuccess=t||this.options.down.contentsuccess,this.downWrapTips.innerText=o?this.options.down.contentsuccess:this.options.down.contenterror,this.downWrapProgress.classList.remove(e),this.downWrapProgress.classList.add("minirefresh-fade-out"),this.downWrapProgress.classList.add(o?"downwrap-success":"downwrap-error"),s._changeWrapStatusClass(this.downWrap,o?"status-success":"status-error")}},{key:"_downLoaingEndHook",value:function(o){this.downWrapTips.innerText=this.options.down.contentdown,this.downWrapProgress.classList.remove(e),this.downWrapProgress.classList.remove("minirefresh-fade-out"),this.downWrapProgress.classList.remove(o?"downwrap-success":"downwrap-error"),this.isCanPullDown=!1,this._transformDownWrap(-this.downWrapHeight,this.options.down.bounceTime),s._changeWrapStatusClass(this.downWrap,"status-default")}},{key:"_cancelLoaingHook",value:function(){this._transformDownWrap(-this.downWrapHeight,this.options.down.bounceTime),s._changeWrapStatusClass(this.downWrap,"status-default")}},{key:"_upLoaingHook",value:function(o){o?(this.upWrapTips.innerText=this.options.up.contentrefresh,this.upWrapProgress.classList.add(e),this.upWrapProgress.classList.remove(r),this.upWrap.style.visibility="visible"):this.upWrap.style.visibility="hidden",s._changeWrapStatusClass(this.upWrap,"status-loading")}},{key:"_upLoaingEndHook",value:function(o){o?(this.upWrapTips.innerText=this.options.up.contentnomore,s._changeWrapStatusClass(this.upWrap,"status-nomore")):(this.upWrapTips.innerText=this.options.up.contentdown,s._changeWrapStatusClass(this.upWrap,"status-default")),this.upWrapProgress.classList.remove(e),this.upWrapProgress.classList.add(r)}},{key:"_resetUpLoadingHook",value:function(){this.upWrapTips.innerText=this.options.up.contentdown,this.upWrapProgress.classList.remove(e),this.upWrapProgress.classList.add(r),s._changeWrapStatusClass(this.upWrap,"status-default")}},{key:"_lockUpLoadingHook",value:function(o){this.upWrap.style.visibility=o?"hidden":"visible"}},{key:"_lockDownLoadingHook",value:function(o){this.downWrap.style.visibility=o?"hidden":"visible"}}],[{key:"_changeWrapStatusClass",value:function(o,t){o.classList.remove("status-nomore"),o.classList.remove("status-default"),o.classList.remove("status-pull"),o.classList.remove("status-loading"),o.classList.remove("status-success"),o.classList.remove("status-error"),o.classList.add(t)}}]),s}();return l.sign="default",l.version=n,s("theme.defaults",l),window.MiniRefresh=l,l});