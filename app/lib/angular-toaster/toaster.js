/*
 * AngularJS Toaster
 * Version: 2.2.0
 *
 * Copyright 2013-2016 Jiri Kavulak.
 * All Rights Reserved.
 * Use, reproduction, distribution, and modification of this code is subject to the terms and
 * conditions of the MIT license, available at http://www.opensource.org/licenses/mit-license.php
 *
 * Author: Jiri Kavulak
 * Related to project of John Papa, Hans Fjällemark and Nguyễn Thiện Hùng (thienhung1989)
 */
!function(t,e){"use strict";angular.module("toaster",[]).constant("toasterConfig",{limit:0,"tap-to-dismiss":!0,"close-button":!1,"close-html":'<button class="toast-close-button" type="button">&times;</button>',"newest-on-top":!0,"time-out":5e3,"icon-classes":{error:"toast-error",info:"toast-info",wait:"toast-wait",success:"toast-success",warning:"toast-warning"},"body-output-type":"","body-template":"toasterBodyTmpl.html","icon-class":"toast-info","position-class":"toast-top-right","title-class":"toast-title","message-class":"toast-message","prevent-duplicates":!1,"mouseover-timer-stop":!0}).run(["$templateCache",function(t){t.put("angularjs-toaster/toast.html",'<div id="toast-container" ng-class="[config.position, config.animation]"><div ng-repeat="toaster in toasters" class="toast" ng-class="toaster.type" ng-click="click($event, toaster)" ng-mouseover="stopTimer(toaster)" ng-mouseout="restartTimer(toaster)"><div ng-if="toaster.showCloseButton" ng-click="click($event, toaster, true)" ng-bind-html="toaster.closeHtml"></div><div ng-class="config.title">{{toaster.title}}</div><div ng-class="config.message" ng-switch on="toaster.bodyOutputType"><div ng-switch-when="trustedHtml" ng-bind-html="toaster.html"></div><div ng-switch-when="template"><div ng-include="toaster.bodyTemplate"></div></div><div ng-switch-when="templateWithData"><div ng-include="toaster.bodyTemplate"></div></div><div ng-switch-when="directive"><div directive-template directive-name="{{toaster.html}}" directive-data="{{toaster.directiveData}}"></div></div><div ng-switch-default >{{toaster.body}}</div></div></div></div>')}]).service("toaster",["$rootScope","toasterConfig",function(t,e){var o=function(){var t={};return t.newGuid=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){var e=16*Math.random()|0;return("x"==t?e:3&e|8).toString(16)})},t}();this.pop=function(e,s,a,i,n,r,c,l,u,d){if(angular.isObject(e)){var m=e;this.toast={type:m.type,title:m.title,body:m.body,timeout:m.timeout,bodyOutputType:m.bodyOutputType,clickHandler:m.clickHandler,showCloseButton:m.showCloseButton,closeHtml:m.closeHtml,toastId:m.toastId,onShowCallback:m.onShowCallback,onHideCallback:m.onHideCallback,directiveData:m.directiveData,tapToDismiss:m.tapToDismiss},c=m.toasterId}else this.toast={type:e,title:s,body:a,timeout:i,bodyOutputType:n,clickHandler:r,showCloseButton:l,toastId:u,onHideCallback:d};return this.toast.toastId&&this.toast.toastId.length||(this.toast.toastId=o.newGuid()),t.$emit("toaster-newToast",c,this.toast.toastId),{toasterId:c,toastId:this.toast.toastId}},this.clear=function(e,o){angular.isObject(e)?t.$emit("toaster-clearToasts",e.toasterId,e.toastId):t.$emit("toaster-clearToasts",e,o)};for(var s in e["icon-classes"])this[s]=function(t){return function(e,o,s,a,i,n,r,c,l){return angular.isString(e)?this.pop(t,e,o,s,a,i,n,r,c,l):this.pop(angular.extend(e,{type:t}))}}(s)}]).factory("toasterEventRegistry",["$rootScope",function(t){var e,o=null,s=null,a=[],i=[];return e={setup:function(){o||(o=t.$on("toaster-newToast",function(t,e,o){for(var s=0,i=a.length;s<i;s++)a[s](t,e,o)})),s||(s=t.$on("toaster-clearToasts",function(t,e,o){for(var s=0,a=i.length;s<a;s++)i[s](t,e,o)}))},subscribeToNewToastEvent:function(t){a.push(t)},subscribeToClearToastsEvent:function(t){i.push(t)},unsubscribeToNewToastEvent:function(t){var e=a.indexOf(t);e>=0&&a.splice(e,1),0===a.length&&(o(),o=null)},unsubscribeToClearToastsEvent:function(t){var e=i.indexOf(t);e>=0&&i.splice(e,1),0===i.length&&(s(),s=null)}},{setup:e.setup,subscribeToNewToastEvent:e.subscribeToNewToastEvent,subscribeToClearToastsEvent:e.subscribeToClearToastsEvent,unsubscribeToNewToastEvent:e.unsubscribeToNewToastEvent,unsubscribeToClearToastsEvent:e.unsubscribeToClearToastsEvent}}]).directive("directiveTemplate",["$compile","$injector",function(t,e){return{restrict:"A",scope:{directiveName:"@directiveName",directiveData:"@directiveData"},replace:!0,link:function(o,s,a){o.$watch("directiveName",function(i){if(angular.isUndefined(i)||i.length<=0)throw new Error("A valid directive name must be provided via the toast body argument when using bodyOutputType: directive");var n;try{n=e.get(a.$normalize(i)+"Directive")}catch(t){throw new Error(i+" could not be found. The name should appear as it exists in the markup, not camelCased as it would appear in the directive declaration, e.g. directive-name not directiveName.")}var r=n[0];if(!0!==r.scope&&r.scope)throw new Error("Cannot use a directive with an isolated scope. The scope must be either true or falsy (e.g. false/null/undefined). Occurred for directive "+i+".");if(r.restrict.indexOf("A")<0)throw new Error('Directives must be usable as attributes. Add "A" to the restrict option (or remove the option entirely). Occurred for directive '+i+".");o.directiveData&&(o.directiveData=angular.fromJson(o.directiveData));var c=t("<div "+i+"></div>")(o);s.append(c)})}}}]).directive("toasterContainer",["$parse","$rootScope","$interval","$sce","toasterConfig","toaster","toasterEventRegistry",function(t,e,o,s,a,i,n){return{replace:!0,restrict:"EA",scope:!0,link:function(e,r,c){function l(t,s){t.timeoutPromise=o(function(){e.removeToast(t.toastId)},s,1)}function u(o,a){if(o.type=v["icon-classes"][o.type],o.type||(o.type=v["icon-class"]),!0===v["prevent-duplicates"]&&e.toasters.length){if(e.toasters[e.toasters.length-1].body===o.body)return;var i,n,r=!1;for(i=0,n=e.toasters.length;i<n;i++)if(e.toasters[i].toastId===a){r=!0;break}if(r)return}var c=v["close-button"];if("boolean"==typeof o.showCloseButton);else if("boolean"==typeof c)o.showCloseButton=c;else if("object"==typeof c){var l=c[o.type];void 0!==l&&null!==l&&(o.showCloseButton=l)}else o.showCloseButton=!1;switch(o.showCloseButton&&(o.closeHtml=s.trustAsHtml(o.closeHtml||e.config.closeHtml)),o.bodyOutputType=o.bodyOutputType||v["body-output-type"],o.bodyOutputType){case"trustedHtml":o.html=s.trustAsHtml(o.body);break;case"template":o.bodyTemplate=o.body||v["body-template"];break;case"templateWithData":var u=t(o.body||v["body-template"])(e);o.bodyTemplate=u.template,o.data=u.data;break;case"directive":o.html=o.body}e.configureTimer(o),!0===v["newest-on-top"]?(e.toasters.unshift(o),v.limit>0&&e.toasters.length>v.limit&&e.toasters.pop()):(e.toasters.push(o),v.limit>0&&e.toasters.length>v.limit&&e.toasters.shift()),angular.isFunction(o.onShowCallback)&&o.onShowCallback(o)}function d(t){var s=e.toasters[t];s.timeoutPromise&&o.cancel(s.timeoutPromise),e.toasters.splice(t,1),angular.isFunction(s.onHideCallback)&&s.onHideCallback(s)}function m(t){for(var o=e.toasters.length-1;o>=0;o--)p(t)?d(o):e.toasters[o].toastId==t&&d(o)}function p(t){return angular.isUndefined(t)||null===t}var v;v=angular.extend({},a,e.$eval(c.toasterOptions)),e.config={toasterId:v["toaster-id"],position:v["position-class"],title:v["title-class"],message:v["message-class"],tap:v["tap-to-dismiss"],closeButton:v["close-button"],closeHtml:v["close-html"],animation:v["animation-class"],mouseoverTimer:v["mouseover-timer-stop"]},e.$on("$destroy",function(){n.unsubscribeToNewToastEvent(e._onNewToast),n.unsubscribeToClearToastsEvent(e._onClearToasts)}),e.configureTimer=function(t){var e=angular.isNumber(t.timeout)?t.timeout:v["time-out"];"object"==typeof e&&(e=e[t.type]),e>0&&l(t,e)},e.removeToast=function(t){var o,s;for(o=0,s=e.toasters.length;o<s;o++)if(e.toasters[o].toastId===t){d(o);break}},e.toasters=[],e._onNewToast=function(t,o,s){(p(e.config.toasterId)&&p(o)||!p(e.config.toasterId)&&!p(o)&&e.config.toasterId==o)&&u(i.toast,s)},e._onClearToasts=function(t,o,s){("*"==o||p(e.config.toasterId)&&p(o)||!p(e.config.toasterId)&&!p(o)&&e.config.toasterId==o)&&m(s)},n.setup(),n.subscribeToNewToastEvent(e._onNewToast),n.subscribeToClearToastsEvent(e._onClearToasts)},controller:["$scope","$element","$attrs",function(t,e,s){t.stopTimer=function(e){!0===t.config.mouseoverTimer&&e.timeoutPromise&&(o.cancel(e.timeoutPromise),e.timeoutPromise=null)},t.restartTimer=function(e){!0===t.config.mouseoverTimer?e.timeoutPromise||t.configureTimer(e):null===e.timeoutPromise&&t.removeToast(e.toastId)},t.click=function(e,o,s){if(e.stopPropagation(),!0===("boolean"==typeof o.tapToDismiss?o.tapToDismiss:t.config.tap)||!0===o.showCloseButton&&!0===s){var a=!0;o.clickHandler&&(angular.isFunction(o.clickHandler)?a=o.clickHandler(o,s):angular.isFunction(t.$parent.$eval(o.clickHandler))?a=t.$parent.$eval(o.clickHandler)(o,s):console.log("TOAST-NOTE: Your click handler is not inside a parent scope of toaster-container.")),a&&t.removeToast(o.toastId)}}}],templateUrl:"angularjs-toaster/toast.html"}}])}(window,document);