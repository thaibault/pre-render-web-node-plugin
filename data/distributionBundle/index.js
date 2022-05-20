'use strict';if(typeof module!=='undefined'&&module!==null&&eval('typeof require')!=='undefined'&&eval('require')!==null&&'main'in eval('require')&&eval('typeof require.main')!=='undefined'&&eval('require.main')!==null){var ORIGINAL_MAIN_MODULE=module;if(module!==eval('require.main')&&'paths'in module&&'paths'in eval('require.main')&&typeof __dirname!=='undefined'&&__dirname!==null)module.paths=eval('require.main.paths').concat(module.paths.filter(function(path){return eval('require.main.paths').includes(path)}))};if(typeof window==='undefined'||window===null)var window=(typeof global==='undefined'||global===null)?{}:global;!function(e,r){if("object"==typeof exports&&"object"==typeof module)module.exports=r(require("@babel/runtime/helpers/asyncToGenerator"),require("@babel/runtime/regenerator"),require("child_process"),require("clientnode"),require("path"),require("rimraf"));else if("function"==typeof define&&define.amd)define(["@babel/runtime/helpers/asyncToGenerator","@babel/runtime/regenerator","child_process","clientnode","path","rimraf"],r);else{var t="object"==typeof exports?r(require("@babel/runtime/helpers/asyncToGenerator"),require("@babel/runtime/regenerator"),require("child_process"),require("clientnode"),require("path"),require("rimraf")):r(e["@babel/runtime/helpers/asyncToGenerator"],e["@babel/runtime/regenerator"],e.child_process,e.clientnode,e.path,e.rimraf);for(var n in t)("object"==typeof exports?exports:e)[n]=t[n]}}(this,((e,r,t,n,a,o)=>(()=>{"use strict";var u=[,r=>{r.exports=e},e=>{e.exports=r},e=>{e.exports=t},e=>{e.exports=n},e=>{e.exports=a},e=>{e.exports=o}],i={};function c(e){var r=i[e];if(void 0!==r)return r.exports;var t=i[e]={exports:{}};return u[e](t,t.exports,c),t.exports}c.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return c.d(r,{a:r}),r},c.d=(e,r)=>{for(var t in r)c.o(r,t)&&!c.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:r[t]})},c.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),c.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var s={};return(()=>{c.r(s),c.d(s,{PreRender:()=>v,default:()=>m});var e=c(1),r=c.n(e),t=c(2),n=c.n(t),a=c(3),o=c(4),u=c.n(o),i=c(5),l=c.n(i),p=c(6),d=c.n(p);function f(e,r){var t="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(t)return(t=t.call(e)).next.bind(t);if(Array.isArray(e)||(t=function(e,r){if(e){if("string"==typeof e)return b(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?b(e,r):void 0}}(e))||r&&e&&"number"==typeof e.length){t&&(e=t);var n=0;return function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function b(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=Array(r);t<r;t++)n[t]=e[t];return n}var v=function(){function e(){}return e.postConfigurationLoaded=function(){var t=r()(n().mark((function r(t,a,o,u){return n().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(!t.preRender.renderAfterConfigurationUpdates){r.next=3;break}return r.next=3,e.render(t,o,u);case 3:return r.abrupt("return",t);case 4:case"end":return r.stop()}}),r)})));return function(){return t.apply(this,arguments)}}(),e.preLoadService=function(r){return r.preRender={getPrerenderedOutputDirectories:e.getPrerenderedOutputDirectories.bind(e),getPrerendererExecuter:e.getPrerendererExecuter.bind(e),render:e.render.bind(e),renderFile:e.renderFile.bind(e)},r},e.shouldExit=function(){var t=r()(n().mark((function r(t,a,o,u){var i,c,s,l;return n().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return i=[],c=function(){var e=l.value;i.push(new Promise((function(r,t){return d()(e.path,{glob:!1},(function(e){return e?t(e):r()}))})))},r.t0=f,r.next=5,e.getPrerenderedOutputDirectories(a,o,u);case 5:r.t1=r.sent,s=(0,r.t0)(r.t1);case 7:if((l=s()).done){r.next=11;break}c();case 9:r.next=7;break;case 11:return r.next=13,Promise.all(i);case 13:return r.abrupt("return",t);case 14:case"end":return r.stop()}}),r)})));return function(){return t.apply(this,arguments)}}(),e.getPrerenderedOutputDirectories=function(){var t=r()(n().mark((function r(t,a,o){var i,c,s,p,d,b,v;return n().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return i=[].concat(t.preRender.locations.output.directoryNames),c=[].concat(t.preRender.locations.output.exclude),r.next=4,e.getPrerendererExecuter(t,a,o);case 4:s=r.sent.map((function(e){return l().dirname(e.path)})),p=[],d=n().mark((function(){var e;return n().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return e=v.value,r.t0=p,r.next=4,u().walkDirectoryRecursively(e,(function(r){if(r.name.startsWith(".")||c.some((function(t){return r.path.startsWith(l().resolve(e,t))})))return!1}));case 4:r.t1=r.sent.filter((function(e){var r;return!(!(null==(r=e.stats)?void 0:r.isDirectory())||0!==i.length&&!i.includes(e.name))})),r.t0.concat.call(r.t0,r.t1);case 6:case"end":return r.stop()}}),d)})),b=f(s);case 8:if((v=b()).done){r.next=12;break}return r.delegateYield(d(),"t0",10);case 10:r.next=8;break;case 12:return r.abrupt("return",p);case 13:case"end":return r.stop()}}),r)})));return function(){return t.apply(this,arguments)}}(),e.getPrerendererExecuter=function(){var e=r()(n().mark((function e(r,t,a){var o,i,c,s,p;return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:o=[].concat(r.preRender.locations.executer.fileNames),i=[],c=f(a.determineLocations(r,r.preRender.locations.executer.include));case 3:if((s=c()).done){e.next=10;break}return p=s.value,e.next=7,u().walkDirectoryRecursively(p,(function(e){if(e.name.startsWith(".")||a.isInLocations(r,t,e.path,r.preRender.locations.executer.exclude))return!1}));case 7:e.sent.map((function(e){var r;null!=(r=e.stats)&&r.isFile()&&o.includes(l().basename(e.name))&&i.push(e)}));case 8:e.next=3;break;case 10:return e.abrupt("return",i);case 11:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),e.render=function(){var t=r()(n().mark((function r(t,a,o,u){var i,c,s,l,p;return n().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return void 0===u&&(u=[]),r.t0=o,r.t1=a,r.t2=t,r.next=6,e.getPrerendererExecuter(t,a,o);case 6:return r.t3=r.sent,r.next=9,r.t0.callStack.call(r.t0,"prePreRendererRender",r.t1,r.t2,r.t3);case 9:i=r.sent,c=[],s=f(i);case 12:if((l=s()).done){r.next=26;break}return p=l.value,r.t4=c,r.t5=e,r.t6=p.path,r.t7=[],r.next=20,o.callStack("prePreRendererCLIParameter",a,t,[].concat(u,t.preRender.cache+""),p);case 20:r.t8=r.sent,r.t9=r.t7.concat.call(r.t7,r.t8),r.t10=r.t5.renderFile.call(r.t5,r.t6,r.t9),r.t4.push.call(r.t4,r.t10);case 24:r.next=12;break;case 26:return r.next=28,Promise.all(c);case 28:return r.next=30,o.callStack("postPreRendererRender",a,t,i);case 30:return r.abrupt("return",r.sent);case 31:case"end":return r.stop()}}),r)})));return function(){return t.apply(this,arguments)}}(),e.renderFile=function(e,r){return void 0===r&&(r=[]),new Promise((function(t,n){for(var i,c,s=(0,a.spawn)(e,r,{cwd:l().dirname(e),env:process.env,shell:!0,stdio:"inherit"}),p=f(o.CloseEventNames);!(i=p()).done;)c=i.value,s.on(c,u().getProcessCloseHandler(t,n))}))},e}();const m=v})(),s})()));