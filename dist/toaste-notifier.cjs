/*!
 * ToastE v1.0.0-alpha1
 * (c) 2022-2022 Jacob Darker
 * Released under the MIT License.
 */
"use strict";function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(e)}function e(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){for(var o=0;o<e.length;o++){var i=e[o];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function i(t,e,i){return e&&o(t.prototype,e),i&&o(t,i),Object.defineProperty(t,"prototype",{writable:!1}),t}function n(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}function s(t,e){(null==e||e>t.length)&&(e=t.length);for(var o=0,i=new Array(e);o<e;o++)i[o]=t[o];return i}function a(t,e){var o="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!o){if(Array.isArray(t)||(o=function(t,e){if(t){if("string"==typeof t)return s(t,e);var o=Object.prototype.toString.call(t).slice(8,-1);return"Object"===o&&t.constructor&&(o=t.constructor.name),"Map"===o||"Set"===o?Array.from(t):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?s(t,e):void 0}}(t))||e&&t&&"number"==typeof t.length){o&&(t=o);var i=0,n=function(){};return{s:n,n:function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function(t){throw t},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,r=!0,l=!1;return{s:function(){o=o.call(t)},n:function(){var t=o.next();return r=t.done,t},e:function(t){l=!0,a=t},f:function(){try{r||null==o.return||o.return()}finally{if(l)throw a}}}}var r,l=function(){function o(){e(this,o)}return i(o,null,[{key:"bind",value:function(t,e){return function(){return t.apply(e,arguments)}}},{key:"isObject",value:function(e){return e&&"object"===t(e)&&!Array.isArray(e)&&null!=e}},{key:"extend",value:function(t,e){var o=this;"function"!=typeof Object.assign&&(Object.assign=function(t){if(null==t)throw new TypeError("Cannot convert undefined or null to object");for(var e=Object(t),o=1;o<arguments.length;o++){var i=arguments[o];if(null!=i)for(var n in i)i.hasOwnProperty(n)&&(e[n]=i[n])}return e});var i=Object.assign({},t);return this.isObject(t)&&this.isObject(e)&&Object.keys(e).forEach((function(s){o.isObject(e[s])&&s in t?i[s]=o.extend(t[s],e[s]):Object.assign(i,n({},s,e[s]))})),i}}]),o}();function c(t,e){t.style.display="",t.style.opacity=e,r=+new Date}function h(t,e){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;c(t,0);var i=function i(){t.style.opacity=+t.style.opacity+(new Date-r)/e,r=+new Date,+t.style.opacity<1?window.requestAnimationFrame&&requestAnimationFrame(i)||setTimeout(i,16):o&&o.call()};i()}function u(t,e){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;c(t,1);var i=function i(){t.style.opacity=+t.style.opacity-(new Date-r)/e,r=+new Date,+t.style.opacity>0?window.requestAnimationFrame&&requestAnimationFrame(i)||setTimeout(i,16):(t.hidden=!0,o&&o.call())};i()}var p=i((function t(){e(this,t),this.text="",this.heading="",this.showHideTransition="fade",this.allowToastClose=!0,this.hideAfter=3e3,this.loader=!0,this.loaderBg="#9EC600",this.stack=5,this.position="bottom-left",this.bgColor=!1,this.textColor=!1,this.textAlign="left",this.icon=!1,this.beforeShow=function(){},this.afterShown=function(){},this.beforeHide=function(){},this.afterHide=function(){},this.onClick=function(){}})),d=["bottom-left","bottom-right","top-right","top-left","bottom-center","top-center","mid-center"],f=["success","error","info","warning"],y=function(){function o(){e(this,o)}return i(o,[{key:"init",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new p;this.prepareOptions(t,new p),this.process()}},{key:"prepareOptions",value:function(t,e){var o={};"string"==typeof t||t instanceof Array?o.text=t:o=t,this.options=l.extend(e,o)}},{key:"process",value:function(){this.setup(),this.addToDom(),this.position(),this.bindToast(),this.animate()}},{key:"setup",value:function(){var t=document.createElement("div");t.className="toaste-single",this._toastEl=this._toastEl||t;var e=document.createElement("span");if(e.className="toaste-loader",this._toastEl.appendChild(e),this.options.allowToastClose){var o=document.createElement("span");o.className="toaste-close",o.innerText="&times;",this._toastEl.appendChild(o)}if(this.options.heading){var i=document.createElement("h2");i.className="toaste-heading",i.innerText=this.options.heading,this._toastEl.appendChild(i)}this.generateToastText(),this.setToastElementStyles()}},{key:"generateToastText",value:function(){if(this.options.text instanceof Array){var t=document.createElement("ul");t.className="toaste-ul";for(var e=0;e<this.options.text.length;e++){var o=document.createElement("li");o.className="toaste-li",o.id="toaste-item-".concat(e),o.innerText=this.options.text[e],t.appendChild(o)}this._toastEl.appendChild(t)}else{var i=document.createElement("span");i.innerText=this.options.text,this._toastEl.appendChild(i)}}},{key:"setToastElementStyles",value:function(){!1!==this.options.bgColor&&(this._toastEl.style.backgroundColor=this.options.bgColor),!1!==this.options.textColor&&(this._toastEl.style.color=this.options.textColor),this.options.textAlign&&(this._toastEl.style.textAlign=this.options.textAlign),this.options.icon&&(this._toastEl.classList.add("toaste-has-icon"),this.options.icon&&f.includes(this.options.icon)&&this._toastEl.classList.add("toaste-icon-".concat(this.options.icon))),this.options.class&&this._toastEl.classList.add(this.options.class)}},{key:"position",value:function(){if("string"==typeof this.options.position&&d.indexOf(this.options.position)>-1){var e=this._container.getBoundingClientRect();switch(this.options.position){case"bottom-center":this._container.style.left="".concat(window.outerWidth/2-e.width/2,"px"),this._container.style.bottom="20px";break;case"top-center":this._container.style.left="".concat(window.outerWidth/2-e.width/2,"px"),this._container.style.top="20px";break;case"mid-center":this._container.style.left="".concat(window.outerWidth/2-e.width/2,"px"),this._container.style.bottom="".concat(window.outerHeight/2-e.height/2,"px");break;default:this._container.classList.add(this.options.position)}}else if("object"===t(this.options.position))for(var o in this._container.style.top="auto",this._container.style.right="auto",this._container.style.bottom="auto",this._container.style.left="auto",this.options.position)isNaN(Number.parseFloat(this.options.position[o]))?this._container.style.setProperty(o,this.options.position[o]):this._container.style.setProperty(o,this.options.position[o]+"px");else this._container.classList.add("bottom-left")}},{key:"bindToast",value:function(){var t=this;this._toastEl.addEventListener("toast.on.shown",(function(){t.processLoader()})),this._toastEl.querySelector("span.toaste-close").addEventListener("click",t.closeToast.bind(t,t)),"function"==typeof this.options.beforeShow&&this._toastEl.addEventListener("toast.on.show",t.options.beforeShow(t._toastEl)),"function"==typeof this.options.afterShown&&this._toastEl.addEventListener("toast.on.shown",t.options.afterShown(t._toastEl)),"function"==typeof this.options.beforeHide&&this._toastEl.addEventListener("toast.on.hide",t.options.beforeHide(t._toastEl)),"function"==typeof this.options.afterHidden&&this._toastEl.addEventListener("toast.on.hidden",t.options.afterHidden(t._toastEl)),"function"==typeof this.options.onClick&&this._toastEl.addEventListener("click",t.options.onClick(t._toastEl))}},{key:"addToDom",value:function(){var t,e=document.querySelector(".toaste-wrap");if(e){if(!this.options.stack||isNaN(parseInt(this.options.stack,10)))for(var o in e.children)e.removeChild(o)}else(e=document.createElement("div")).className="toaste-wrap",e.setAttribute("role","alert"),e.setAttribute("aria-live","polite"),document.body.appendChild(e);if((t=e.querySelectorAll(".toaste-single[hidden]"))&&t.forEach((function(t){e.removeChild(t)})),e.appendChild(this._toastEl),this.options.stack&&!isNaN(parseInt(this.options.stack),10)){var i=e.querySelectorAll(".toaste-single").length-this.options.stack;if(i>0){var n,s=a(t=Array.from(e.querySelectorAll(".toaste-single").values()).slice(0,i));try{for(s.s();!(n=s.n()).done;){var r=n.value;e.removeChild(r)}}catch(t){s.e(t)}finally{s.f()}}}this._container=e}},{key:"canAutoHide",value:function(){return!1!==this.options.hideAfter&&!isNaN(parseInt(this.options.hideAfter,10))}},{key:"processLoader",value:function(){if(!this.canAutoHide()||!1===this.options.loader)return!1;var t=this._toastEl.querySelector(".toaste-loader"),e=(this.options.hideAfter-400)/1e3+"s",o=this.options.loaderBg||"";t.style.setProperty("--toaste-transition-duration",e),o&&t.style.setProperty("--toaste-loader-bg",this.options.loaderBg),t.classList.add("toaste-loaded")}},{key:"animate",value:function(){var t=this,e=new CustomEvent("toaste.on.show"),o=function(){var e=new CustomEvent("toast.on.shown");t._toastEl.dispatchEvent(e)};this._toastEl.style.display="none",this._toastEl.dispatchEvent(e),"fade"===this.options.showHideTransition.toLowerCase()||this.options.showHideTransition.toLowerCase(),h(this._toastEl,400,o),this.canAutoHide()&&(this.autoCloseTimeout=window.setTimeout(this.closeToast.bind(this,t),+this.options.hideAfter))}},{key:"reset",value:function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];t?document.querySelectorAll(".toaste-wrap").forEach((function(t){return t.remove()})):(this._toastEl.parentElement.removeChild(this._toastEl),this._toastEl=null)}},{key:"update",value:function(t){this.prepareOptions(t,this.options),this.setup(),this.bindToast()}},{key:"closeToast",value:function(t,e){e&&e.preventDefault();var o=function(){t._toastEl.style.display="none";var e=new CustomEvent("toast.on.hidden");t._toastEl.dispatchEvent(e),t.autoCloseTimeout&&window.clearTimeout(t.autoCloseTimeout)},i=new CustomEvent("toast.on.hide");t._toastEl.dispatchEvent(i),"fade"===t.options.showHideTransition||t.options.showHideTransition,u(t._toastEl,400,o)}}]),o}(),v=function(){function t(o){e(this,t),this.toastE=new y,this.toastE.init(o)}return i(t,[{key:"reset",value:function(t){this.toastE.reset(t)}},{key:"update",value:function(t){this.toastE.update(t)}},{key:"close",value:function(){this.toastE.close()}}]),t}();module.exports=v;
