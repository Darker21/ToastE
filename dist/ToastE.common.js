/*!
 * ToastE v1.0.0
 * (c) 2022-2022 Jacob Darker
 * Released under the MIT License.
 */
"use strict";function t(o){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(o)}function o(t,o){for(var e=0;e<o.length;e++){var i=o[e];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function e(t,o){var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;t.style.display="",t.style.opacity=1;var i=+new Date,s=function s(){t.style.opacity=+t.style.opacity-(new Date-i)/o,i=+new Date,+t.style.opacity>0?window.requestAnimationFrame&&requestAnimationFrame(s)||setTimeout(s,16):e&&e.call()};s()}
/*!
 * ToastE js 1.0.0
 * https://github.com/Darker21/ToastE
 * @license MIT licensed
 *
 * Copyright (C) 2022 Jacob Darker
 */
var s;s=function(){function s(){!function(t,o){if(!(t instanceof o))throw new TypeError("Cannot call a class as a function")}(this,s),this._positionClasses=["bottom-left","bottom-right","top-right","top-left","bottom-center","top-center","mid-center"],this._defaultIcons=["success","error","info","warning"]}var n,a,l;return n=s,(a=[{key:"init",value:function(t,o){this.prepareOptions(t,window.toastE.options)}},{key:"prepareOptions",value:function(t,o){var e={};"string"==typeof t||t instanceof Array?e.text=t:e=t,this.options=Object.assign({},o,e)}},{key:"process",value:function(){this.setup(),this.addToDom(),this.position(),this.bindToast(),this.animate()}},{key:"setup",value:function(){var t=document.createElement("div");t.className="toaste-single",this._toastEl=this._toastEl||t;var o=document.createElement("span");if(o.className="toaste-loader",this._toastEl.appendChild(o),this.options.allowToastClose){var e=document.createElement("span");e.className="toaste-close",e.innerText="&times;",this._toastEl.appendChild(e)}if(this.options.heading){var s=document.createElement("h2");s.className="toaste-heading",s.innerText=this.options.heading,this._toastEl.appendChild(s)}if(this.options.text instanceof Array){var n=document.createElement("ul");for(n.className="toaste-ul";i<this.options.text.length;i++){var a=document.createElement("li");a.className="toaste-li",a.id="toaste-item-".concat(i),a.innerText=this.options.text[i],n.appendChild(a)}}else{var l=document.createElement("span");l.innerText=this.options.text,this._toastEl.appendChild(l)}!1!==this.options.bgColor&&(this._toastEl.style.backgroundColor=this.options.bgColor),!1!==this.options.textColor&&(this._toastEl.style.color=this.options.textColor),this.options.textAlign&&(this._toastEl.style.textAlign=this.options.textAlign),!1!==this.options.icon&&(this._toastEl.classList.add("toaste-has-icon"),this._defaultIcons.findIndex(this.options.icon)>-1&&this._toastEl.classList.add("toaste-icon-".concat(this.options.icon))),!1!==this.options.class&&this._toastEl.classList.add(this.options.class)}},{key:"position",value:function(){if("string"==typeof this.options.position&&this._positionClasses.indexOf(this.options.position)>-1){var o=this._container.getBoundingClientRect();switch(this.options.position){case"bottom-center":this._container.style.left="".concat(window.outerWidth/2-o.width/2,"px"),this._container.style.bottom="20px";break;case"top-center":this._container.style.left="".concat(window.outerWidth/2-o.width/2,"px"),this._container.style.top="20px";break;case"mid-center":this._container.style.left="".concat(window.outerWidth/2-o.width/2,"px"),this._container.style.bottom="".concat(window.outerHeight/2-o.height/2,"px");break;default:this._container.classList.add(this.options.position)}}else if("object"===t(this.options.position))for(var e in this._container.style.top="auto",this._container.style.right="auto",this._container.style.bottom="auto",this._container.style.left="auto",this.options.position)isNaN(Number.parseFloat(this.options.position[e]))?this._container.style.setProperty(e,this.options.position[e]):this._container.style.setProperty(e,this.options.position[e]+"px");else this._container.classList.add("bottom-left")}},{key:"bindToast",value:function(){var t=this;this._toastEl.addEventListener("toast.on.shown",(function(){t.processLoader()})),this._toastEl.querySelector("span.toaste-close").addEventListener("click",this._CloseToast(ev,t)),"function"==typeof this.options.beforeShow&&this._toastEl.addEventListener("toast.on.show",t.options.beforeShow(t._toastEl))}},{key:"_CloseToast",value:function(t,o){t.preventDefault();var i=new Event("toast.on.hide");"fade"===o.options.showHideTransition?(o._toastEl.dispatchEvent(i),e(o._toastEl,400,(function(){var t=new Event("toast.on.hidden");o._toastEl.dispatchEvent(t)}))):"slide"===o.options.showHideTransition?(o._toastEl.dispatchEvent(i),o._toastEl):(o._toastEl.dispatchEvent(i),e(o._toastEl,400,(function(){var t=new Event("toast.on.hidden");o._toastEl.dispatchEvent(t)})))}}])&&o(n.prototype,a),l&&o(n,l),Object.defineProperty(n,"prototype",{writable:!1}),s}(),window.toastE.options={text:"",heading:"",showHideTransition:"fade",allowToastClose:!0,hideAfter:3e3,loader:!0,loaderBg:"#9EC600",stack:5,position:"bottom-left",bgColor:!1,textColor:!1,textAlign:"left",icon:!1,beforeShow:function(){},afterShown:function(){},beforeHide:function(){},afterHidden:function(){},onClick:function(){}},window.toastE=function(t){var o=Object.create(s);return o.init(t,this),{reset:function(t){o.reset(t)},update:function(t){o.update(t)},close:function(){o.close()}}};