'use strict';
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("babel-runtime/helpers/classCallCheck"), require("babel-runtime/core-js/get-iterator"), require("babel-runtime/core-js/promise"), require("babel-runtime/regenerator"), require("babel-runtime/helpers/asyncToGenerator"), require("babel-runtime/helpers/createClass"), require("child_process"), require("clientnode"), require("path"), require("rimraf"), require("web-node/pluginAPI.compiled"), (function webpackLoadOptionalExternalModule() { try { return require("source-map-support/register"); } catch(e) {} }()));
	else if(typeof define === 'function' && define.amd)
		define("prerenderwebnodeplugin", ["babel-runtime/helpers/classCallCheck", "babel-runtime/core-js/get-iterator", "babel-runtime/core-js/promise", "babel-runtime/regenerator", "babel-runtime/helpers/asyncToGenerator", "babel-runtime/helpers/createClass", "child_process", "clientnode", "path", "rimraf", "web-node/pluginAPI.compiled", "source-map-support/register"], factory);
	else if(typeof exports === 'object')
		exports["prerenderwebnodeplugin"] = factory(require("babel-runtime/helpers/classCallCheck"), require("babel-runtime/core-js/get-iterator"), require("babel-runtime/core-js/promise"), require("babel-runtime/regenerator"), require("babel-runtime/helpers/asyncToGenerator"), require("babel-runtime/helpers/createClass"), require("child_process"), require("clientnode"), require("path"), require("rimraf"), require("web-node/pluginAPI.compiled"), (function webpackLoadOptionalExternalModule() { try { return require("source-map-support/register"); } catch(e) {} }()));
	else
		root['prerenderwebnodeplugin'] = factory(root["babel-runtime/helpers/classCallCheck"], root["babel-runtime/core-js/get-iterator"], root["babel-runtime/core-js/promise"], root["babel-runtime/regenerator"], root["babel-runtime/helpers/asyncToGenerator"], root["babel-runtime/helpers/createClass"], root["child_process"], root["clientnode"], root["path"], root["rimraf"], root["web-node/pluginAPI.compiled"], root["source-map-support/register"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_10__, __WEBPACK_EXTERNAL_MODULE_11__, __WEBPACK_EXTERNAL_MODULE_12__, __WEBPACK_EXTERNAL_MODULE_13__, __WEBPACK_EXTERNAL_MODULE_14__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {// #!/usr/bin/env node
// -*- coding: utf-8 -*-
/** @module preRenderWebNodePlugin *//* !
    region header
    [Project page](http://torben.website/preRenderWebNodePlugin)

    Copyright Torben Sickert (info["~at~"]torben.website) 16.12.2012

    License
    -------

    This library written by Torben Sickert stand under a creative commons
    naming 3.0 unported license.
    See http://creativecommons.org/licenses/by/3.0/deed.de
    endregion
*/// region imports
Object.defineProperty(exports,'__esModule',{value:true});var _getIterator2=__webpack_require__(3);var _getIterator3=_interopRequireDefault(_getIterator2);var _promise=__webpack_require__(4);var _promise2=_interopRequireDefault(_promise);var _regenerator=__webpack_require__(5);var _regenerator2=_interopRequireDefault(_regenerator);var _asyncToGenerator2=__webpack_require__(6);var _asyncToGenerator3=_interopRequireDefault(_asyncToGenerator2);var _classCallCheck2=__webpack_require__(7);var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=__webpack_require__(8);var _createClass3=_interopRequireDefault(_createClass2);var _child_process=__webpack_require__(9);var _clientnode=__webpack_require__(10);var _clientnode2=_interopRequireDefault(_clientnode);var _path=__webpack_require__(11);var _path2=_interopRequireDefault(_path);var _rimraf=__webpack_require__(12);var _rimraf2=_interopRequireDefault(_rimraf);var _pluginAPI=__webpack_require__(13);var _pluginAPI2=_interopRequireDefault(_pluginAPI);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}// NOTE: Only needed for debugging this file.
try{__webpack_require__(14)}catch(error){}// endregion
/**
 * Provides a pre-rendering hook for webNode applications.
 */var PreRender=function(){function PreRender(){(0,_classCallCheck3.default)(this,PreRender)}(0,_createClass3.default)(PreRender,null,[{key:'postConfigurationLoaded',// region api
/**
     * Triggered hook when at least one plugin has a new configuration file and
     * configuration object has been changed.
     * @param configuration - Updated configuration object.
     * @param pluginsWithChangedConfiguration - List of plugins which have a
     * changed plugin configuration.
     * @param oldConfiguration - Old configuration object.
     * @param plugins - List of all loaded plugins.
     * @returns New configuration object to use.
     */value:function(){var _ref=(0,_asyncToGenerator3.default)(/*#__PURE__*/_regenerator2.default.mark(function _callee(configuration,pluginsWithChangedConfiguration,oldConfiguration,plugins){return _regenerator2.default.wrap(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:if(configuration.preRender.renderAfterConfigurationUpdates)PreRender.render(configuration,plugins);return _context.abrupt('return',configuration);case 2:case'end':return _context.stop();}}},_callee,this)}));function postConfigurationLoaded(_x,_x2,_x3,_x4){return _ref.apply(this,arguments)}return postConfigurationLoaded}()/**
     * Appends an pre-renderer to the web node services.
     * @param services - An object with stored service instances.
     * @returns Given and extended object of services.
     */},{key:'preLoadService',value:function preLoadService(services){services.preRender={render:PreRender.render.bind(PreRender)};return services}/**
     * Triggers when application will be closed soon and removes created files.
     * @param services - An object with stored service instances.
     * @param configuration - Updated configuration object.
     * @param plugins - List of all loaded plugins.
     * @returns Given object of services.
     */},{key:'shouldExit',value:function(){var _ref2=(0,_asyncToGenerator3.default)(/*#__PURE__*/_regenerator2.default.mark(function _callee2(services,configuration,plugins){var preRenderOutputRemoveingPromises,_loop,_iteratorNormalCompletion,_didIteratorError,_iteratorError,_iterator,_step,file;return _regenerator2.default.wrap(function _callee2$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:preRenderOutputRemoveingPromises=[];_loop=function _loop(file){preRenderOutputRemoveingPromises.push(new _promise2.default(function(resolve,reject){return(0,_rimraf2.default)(file.path,{glob:false},function(error){return error?reject(error):resolve()})}))};_iteratorNormalCompletion=true;_didIteratorError=false;_iteratorError=undefined;_context2.prev=5;_context2.t0=_getIterator3.default;_context2.next=9;return PreRender.getPrerenderedDirectories(configuration,plugins);case 9:_context2.t1=_context2.sent;_iterator=(0,_context2.t0)(_context2.t1);case 11:if(_iteratorNormalCompletion=(_step=_iterator.next()).done){_context2.next=17;break}file=_step.value;_loop(file);case 14:_iteratorNormalCompletion=true;_context2.next=11;break;case 17:_context2.next=23;break;case 19:_context2.prev=19;_context2.t2=_context2['catch'](5);_didIteratorError=true;_iteratorError=_context2.t2;case 23:_context2.prev=23;_context2.prev=24;if(!_iteratorNormalCompletion&&_iterator.return){_iterator.return()}case 26:_context2.prev=26;if(!_didIteratorError){_context2.next=29;break}throw _iteratorError;case 29:return _context2.finish(26);case 30:return _context2.finish(23);case 31:_context2.next=33;return _promise2.default.all(preRenderOutputRemoveingPromises);case 33:return _context2.abrupt('return',services);case 34:case'end':return _context2.stop();}}},_callee2,this,[[5,19,23,31],[24,,26,30]])}));function shouldExit(_x5,_x6,_x7){return _ref2.apply(this,arguments)}return shouldExit}()// endregion
// region helper
/**
     * Retrieves all directories which have a pre-rendered structure.
     * @param configuration - Updated configuration object.
     * @param plugins - List of all loaded plugins.
     * @returns A promise holding all resolved files.
     */},{key:'getPrerenderedDirectories',value:function(){var _ref3=(0,_asyncToGenerator3.default)(/*#__PURE__*/_regenerator2.default.mark(function _callee3(configuration,plugins){var pluginPaths;return _regenerator2.default.wrap(function _callee3$(_context3){while(1){switch(_context3.prev=_context3.next){case 0:pluginPaths=plugins.map(function(plugin){return plugin.path});_context3.next=3;return _clientnode2.default.walkDirectoryRecursively(configuration.context.path,function(file){if(file.name.startsWith('.'))return false;/*
                    NOTE: We want to ignore all known plugin locations which
                    aren't loaded.
                */for(var type in configuration.plugin.directories){if(configuration.plugin.directories.hasOwnProperty(type)&&_path2.default.dirname(file.path)===_path2.default.resolve(configuration.plugin.directories[type].path)&&!pluginPaths.includes(file.path))return false}/*
                    NOTE: We ignore absolute defined locations and relative
                    defined in each loaded plugin location.
                */var _iteratorNormalCompletion2=true;var _didIteratorError2=false;var _iteratorError2=undefined;try{for(var _iterator2=(0,_getIterator3.default)(configuration.preRender.locationsToIgnore),_step2;!(_iteratorNormalCompletion2=(_step2=_iterator2.next()).done);_iteratorNormalCompletion2=true){var locationToIgnore=_step2.value;if(locationToIgnore.startsWith('/')){if(file.path.startsWith(_path2.default.join(configuration.context.path,locationToIgnore)))return false}else{var _iteratorNormalCompletion3=true;var _didIteratorError3=false;var _iteratorError3=undefined;try{for(var _iterator3=(0,_getIterator3.default)(pluginPaths),_step3;!(_iteratorNormalCompletion3=(_step3=_iterator3.next()).done);_iteratorNormalCompletion3=true){var pluginPath=_step3.value;if(file.path.startsWith(_path2.default.resolve(pluginPath,locationToIgnore)))return false}}catch(err){_didIteratorError3=true;_iteratorError3=err}finally{try{if(!_iteratorNormalCompletion3&&_iterator3.return){_iterator3.return()}}finally{if(_didIteratorError3){throw _iteratorError3}}}}}/*
                    NOTE: Avoid to found nested folders since we will clear
                    them recursively and asynchronous.
                */}catch(err){_didIteratorError2=true;_iteratorError2=err}finally{try{if(!_iteratorNormalCompletion2&&_iterator2.return){_iterator2.return()}}finally{if(_didIteratorError2){throw _iteratorError2}}}if(file.stat.isDirectory()&&configuration.preRender.directoryNames.includes(file.name))return false});case 3:_context3.t0=function(file){return file.stat.isDirectory()&&configuration.preRender.directoryNames.includes(file.name)};return _context3.abrupt('return',_context3.sent.filter(_context3.t0));case 5:case'end':return _context3.stop();}}},_callee3,this)}));function getPrerenderedDirectories(_x8,_x9){return _ref3.apply(this,arguments)}return getPrerenderedDirectories}()/**
     * Retrieves all files to process.
     * @param configuration - Updated configuration object.
     * @param plugins - List of all loaded plugins.
     * @returns A promise holding all resolved files.
     */},{key:'getPrerendererFiles',value:function(){var _ref4=(0,_asyncToGenerator3.default)(/*#__PURE__*/_regenerator2.default.mark(function _callee4(configuration,plugins){var pluginPaths;return _regenerator2.default.wrap(function _callee4$(_context4){while(1){switch(_context4.prev=_context4.next){case 0:pluginPaths=plugins.map(function(plugin){return plugin.path});_context4.next=3;return _clientnode2.default.walkDirectoryRecursively(configuration.context.path,function(file){if(file.name.startsWith('.'))return false;/*
                    NOTE: We want to ignore all known plugin locations which
                    aren't loaded.
                */for(var type in configuration.plugin.directories){if(configuration.plugin.directories.hasOwnProperty(type)&&_path2.default.dirname(file.path)===_path2.default.resolve(configuration.plugin.directories[type].path)&&!pluginPaths.includes(file.path))return false}/*
                    NOTE: We ignore absolute defined locations and relative
                    defined in each loaded plugin location.
                */var _iteratorNormalCompletion4=true;var _didIteratorError4=false;var _iteratorError4=undefined;try{for(var _iterator4=(0,_getIterator3.default)(configuration.preRender.locationsToIgnore),_step4;!(_iteratorNormalCompletion4=(_step4=_iterator4.next()).done);_iteratorNormalCompletion4=true){var locationToIgnore=_step4.value;if(locationToIgnore.startsWith('/')){if(file.path.startsWith(_path2.default.join(configuration.context.path,locationToIgnore)))return false}else{var _iteratorNormalCompletion5=true;var _didIteratorError5=false;var _iteratorError5=undefined;try{for(var _iterator5=(0,_getIterator3.default)(pluginPaths),_step5;!(_iteratorNormalCompletion5=(_step5=_iterator5.next()).done);_iteratorNormalCompletion5=true){var pluginPath=_step5.value;if(file.path.startsWith(_path2.default.resolve(pluginPath,locationToIgnore)))return false}}catch(err){_didIteratorError5=true;_iteratorError5=err}finally{try{if(!_iteratorNormalCompletion5&&_iterator5.return){_iterator5.return()}}finally{if(_didIteratorError5){throw _iteratorError5}}}}}}catch(err){_didIteratorError4=true;_iteratorError4=err}finally{try{if(!_iteratorNormalCompletion4&&_iterator4.return){_iterator4.return()}}finally{if(_didIteratorError4){throw _iteratorError4}}}});case 3:_context4.t0=function(file){return file.stat.isFile()&&configuration.preRender.fileBaseNames.includes(_path2.default.basename(file.name,_path2.default.extname(file.name)))};return _context4.abrupt('return',_context4.sent.filter(_context4.t0));case 5:case'end':return _context4.stop();}}},_callee4,this)}));function getPrerendererFiles(_x10,_x11){return _ref4.apply(this,arguments)}return getPrerendererFiles}()/**
     * Triggers pre-rendering.
     * @param configuration - Configuration object.
     * @param plugins - List of all loaded plugins.
     * @returns A Promise resolving to a list of prerenderer files.
     */},{key:'render',value:function(){var _ref5=(0,_asyncToGenerator3.default)(/*#__PURE__*/_regenerator2.default.mark(function _callee6(configuration,plugins){var _this=this;var preRendererFiles,preRenderingPromises,_loop2,_iteratorNormalCompletion6,_didIteratorError6,_iteratorError6,_iterator6,_step6,file;return _regenerator2.default.wrap(function _callee6$(_context6){while(1){switch(_context6.prev=_context6.next){case 0:_context6.t0=_pluginAPI2.default;_context6.t1=plugins;_context6.t2=configuration;_context6.next=5;return PreRender.getPrerendererFiles(configuration,plugins);case 5:_context6.t3=_context6.sent;_context6.next=8;return _context6.t0.callStack.call(_context6.t0,'prePreRendererRender',_context6.t1,_context6.t2,_context6.t3);case 8:preRendererFiles=_context6.sent;preRenderingPromises=[];_loop2=function _loop2(file){preRenderingPromises.push(new _promise2.default(function(){var _ref6=(0,_asyncToGenerator3.default)(/*#__PURE__*/_regenerator2.default.mark(function _callee5(resolve,reject){var childProcess,_iteratorNormalCompletion7,_didIteratorError7,_iteratorError7,_iterator7,_step7,closeEventName;return _regenerator2.default.wrap(function _callee5$(_context5){while(1){switch(_context5.prev=_context5.next){case 0:_context5.t0=_child_process.spawn;_context5.t1=file.path;_context5.t2=[configuration.preRender.cache];_context5.next=5;return _pluginAPI2.default.callStack('prePreRendererCLIParameter',plugins,configuration,[file.path]);case 5:_context5.t3=_context5.sent;_context5.t4=_context5.t2.concat.call(_context5.t2,_context5.t3);_context5.t5={cwd:process.cwd(),env:process.env,shell:true,stdio:'inherit'};childProcess=(0,_context5.t0)(_context5.t1,_context5.t4,_context5.t5);_iteratorNormalCompletion7=true;_didIteratorError7=false;_iteratorError7=undefined;_context5.prev=12;for(_iterator7=(0,_getIterator3.default)(_clientnode2.default.closeEventNames);!(_iteratorNormalCompletion7=(_step7=_iterator7.next()).done);_iteratorNormalCompletion7=true){closeEventName=_step7.value;childProcess.on(closeEventName,_clientnode2.default.getProcessCloseHandler(resolve,configuration.server.proxy.optional?resolve:reject))}_context5.next=20;break;case 16:_context5.prev=16;_context5.t6=_context5['catch'](12);_didIteratorError7=true;_iteratorError7=_context5.t6;case 20:_context5.prev=20;_context5.prev=21;if(!_iteratorNormalCompletion7&&_iterator7.return){_iterator7.return()}case 23:_context5.prev=23;if(!_didIteratorError7){_context5.next=26;break}throw _iteratorError7;case 26:return _context5.finish(23);case 27:return _context5.finish(20);case 28:case'end':return _context5.stop();}}},_callee5,_this,[[12,16,20,28],[21,,23,27]])}));return function(_x14,_x15){return _ref6.apply(this,arguments)}}()))};_iteratorNormalCompletion6=true;_didIteratorError6=false;_iteratorError6=undefined;_context6.prev=14;for(_iterator6=(0,_getIterator3.default)(preRendererFiles);!(_iteratorNormalCompletion6=(_step6=_iterator6.next()).done);_iteratorNormalCompletion6=true){file=_step6.value;_loop2(file)}_context6.next=22;break;case 18:_context6.prev=18;_context6.t4=_context6['catch'](14);_didIteratorError6=true;_iteratorError6=_context6.t4;case 22:_context6.prev=22;_context6.prev=23;if(!_iteratorNormalCompletion6&&_iterator6.return){_iterator6.return()}case 25:_context6.prev=25;if(!_didIteratorError6){_context6.next=28;break}throw _iteratorError6;case 28:return _context6.finish(25);case 29:return _context6.finish(22);case 30:_context6.next=32;return _promise2.default.all(preRenderingPromises);case 32:_context6.next=34;return _pluginAPI2.default.callStack('postPreRendererRender',plugins,configuration,preRendererFiles);case 34:return _context6.abrupt('return',_context6.sent);case 35:case'end':return _context6.stop();}}},_callee6,this,[[14,18,22,30],[23,,25,29]])}));function render(_x12,_x13){return _ref5.apply(this,arguments)}return render}()// endregion
}]);return PreRender}();// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
exports.default=PreRender;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_11__;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_12__;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_13__;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

if(typeof __WEBPACK_EXTERNAL_MODULE_14__ === 'undefined') {var e = new Error("Cannot find module \"source-map-support/register\""); e.code = 'MODULE_NOT_FOUND'; throw e;}
module.exports = __WEBPACK_EXTERNAL_MODULE_14__;

/***/ })
/******/ ]);
});