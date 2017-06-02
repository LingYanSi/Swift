/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(6);

var _index2 = _interopRequireDefault(_index);

var _dom = __webpack_require__(10);

var _dom2 = _interopRequireDefault(_dom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.Swift = _index2.default;

window.SwiftDOM = _dom2.default;

/***/ }),
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Sdux = exports.router = exports.cloneNode = exports.StructELement = exports.createElement = exports.isSwiftElement = exports.Component = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _diff = __webpack_require__(11);

var _diff2 = _interopRequireDefault(_diff);

var _observe = __webpack_require__(12);

var _observe2 = _interopRequireDefault(_observe);

var _patch = __webpack_require__(13);

var _patch2 = _interopRequireDefault(_patch);

var _util = __webpack_require__(9);

var _util2 = _interopRequireDefault(_util);

var _event = __webpack_require__(7);

var _event2 = _interopRequireDefault(_event);

var _transform = __webpack_require__(8);

var _dom = __webpack_require__(10);

var _router = __webpack_require__(14);

var _router2 = _interopRequireDefault(_router);

var _sdux = __webpack_require__(15);

var _sdux2 = _interopRequireDefault(_sdux);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 只有被监听的key发生变化，才会去执行表达式，然后得到result
// 当然也可以把表达式换成函数，function().call({state: obj, props: props})
function run() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var expr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

    var observeMap = {};
    var newObj = (0, _observe2.default)(obj, function (key) {
        observeMap[key] = true;
    }, function (key) {
        observeMap[key] && autoFun();
    });

    function autoFun() {
        var result = new Function('a', '\n            with(a){\n                return ' + expr + '\n            }\n        ')(newObj);
        callback && callback(result);
        return result;
    }
    autoFun();

    return newObj;
}

// let newObj = run(a, 'name + age', result => console.log('result:', result))
// 组件

var Component = function () {
    function Component(props) {
        _classCallCheck(this, Component);

        this.__renderTimeout = null;
        this.__nextTicks = [];

        this.props = props || {};
        Object.freeze(this.props);
    }

    _createClass(Component, [{
        key: '_init',
        value: function _init($ele) {
            var _this = this;

            if ($ele) {
                this.$root = this._$root = $ele;
                $ele.__swift__hooks = this;
            }

            this.state = this.state || {};
            this._state = this.state;
            this._children = [];
            this.refs = {};
            if (this.$root) {
                this._event = new _event2.default(this.$root); // 是静态的
                this._$root.__map = {};
            }

            var observeMap = {};
            this.state = (0, _observe2.default)(this.state, function (key) {
                // 获取
                observeMap[key] = true;
            }, function (key) {
                // 更新
                if (observeMap[key]) {
                    clearTimeout(_this.__renderTimeout // 清楚缓存
                    );_this.__renderTimeout = setTimeout(function () {
                        _this._render // 同步任务执行完毕后，在执行页面更新
                        ();
                    }, 0);
                }
            });

            this._componentWillMount();
            this._render();
            this._componentDidMount();
            return this;
        }
        // 将要render

    }, {
        key: '_componentWillMount',
        value: function _componentWillMount() {
            this.componentWillMount && this.componentWillMount();
        }
        // render完毕

    }, {
        key: '_componentDidMount',
        value: function _componentDidMount() {
            this.componentDidMount && this.componentDidMount();
            clearTimeout(this.__renderTimeout);
        }
        // 将要卸载

    }, {
        key: '_componentWillUnmount',
        value: function _componentWillUnmount() {
            var _this2 = this;

            this._children.forEach(function (c) {
                return c._componentWillUnmount();
            });

            this._event && this._event.offFromNode(this._tree);

            if (this._parent) {
                this._parent._children = this._parent._children.filter(function (c) {
                    return c !== _this2;
                });
            }
            this.componentWillUnmount && this.componentWillUnmount

            // 卸载dom
            // 如果能找到与当前tree id一样的元素就卸载，否则就像下面的子节点查询
            // this.$root ? (this.$root.innerHTML = '') : this._$ele.parentElement.removeChild(this._$ele)
            ();(0, _dom.unmountDOMFromNode)(this._tree, this._$root
            // 卸载事件监听
            // 卸载数据监听

            // console.log(this.props._event.cache['click']);
            // this.props._event && this.props._event.cache['click'].map(item => console.log(item.id))

            );
        }
        // 卸载完毕

    }, {
        key: '_componentDidUnmount',
        value: function _componentDidUnmount() {
            this._componentDidUnmount && this._componentDidUnmount();
        }
        // props更新

    }, {
        key: '_componentWillReceiveProps',
        value: function _componentWillReceiveProps(newProps) {
            Object.freeze(newProps);
            this.componentWillReceiveProps && this.componentWillReceiveProps(newProps, this.props);
            this.props = newProps;
            this._render();
        }
        // 更新过后

    }, {
        key: '_componentDidUpdate',
        value: function _componentDidUpdate() {
            this.componentDidUpdate && this.componentDidUpdate();
        }
    }, {
        key: 'forceUpdate',
        value: function forceUpdate() {
            clearTimeout(this.__renderTimeout);
            this._render();
        }
    }, {
        key: 'nextTick',
        value: function nextTick(fn) {
            this.__nextTicks.push(fn);
        }
        // 组件渲染

    }, {
        key: '_render',
        value: function _render() {
            var _this3 = this;

            var oldTree = this._tree;
            var $oldEle = this._$ele;
            var newTree = this._tree = addRoadSign(this.render.call(this), this.$root ? 1 : -1, this._road_sign_id);

            if (oldTree) {
                // 获取变更，然后把变更更新到元素即可
                // console.log(this._$ele, this._$ele.parentElement);
                (0, _patch2.default)((0, _diff2.default)(newTree, oldTree), this.$root || this._$root || this._$ele.parentElement, this);
                this._componentDidUpdate();
            } else {
                var $frg = document.createDocumentFragment();
                this._$ele = (0, _transform.transform)(this._tree, { $swift: this, $parent: $frg }).childNodes[0];

                if (this.$root) {
                    this.$root.innerHTML = '';
                    this.$root.appendChild($frg);
                    return this;
                }

                if ($oldEle) {
                    $oldEle.parentElement.replaceChild(this._$ele, $oldEle);
                }
            }

            // dom渲染成功后触发
            this.__nextTicks.forEach(function (fn) {
                return fn.call(_this3);
            });

            return this;
        }
    }]);

    return Component;
}();

// struct


var StructELement = function StructELement(Comp) {
    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var _children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    _classCallCheck(this, StructELement);

    // children可能是个字符串，在这里转数组
    var children = _util2.default.isArray(_children) ? _children : [_children];

    // 把children拍平，并且处理this.props.children的情况
    // 自定义组件的children不应该被当做Array处理
    var arr = [];
    var __isComponentChildren = children.__isComponentChildren;
    children.forEach(function (item, index) {
        if (_util2.default.isArray(item)) {
            !item.__isComponentChildren && item.forEach(function (i) {
                i.isArrayItem = true;
                i.parentArrayIndex = index;
            });
            arr.push.apply(arr, _toConsumableArray(item));
        } else {
            arr.push(item);
        }
    });
    children = arr;
    children.__isComponentChildren = __isComponentChildren;

    this.type = Comp;
    this.props = Object.assign({}, props, { children: children });
    this.children = children;
};

// 创建元素，返回dom


function createElement(Comp) {
    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    // 如果已是StructELement，就去真正的Component
    Comp = Comp instanceof StructELement ? Comp.type : Comp;
    // 对于自定义组件的子元素，在被调用的时候，不能被作为一般的Array对待，不应该去检查prop是否有key

    for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        children[_key - 2] = arguments[_key];
    }

    children.__isComponentChildren = Comp.prototype instanceof Component;
    // 如果是
    return new StructELement(Comp, props, children);
}

// 判断是不是swift组件
function isSwiftElement() {
    for (var _len2 = arguments.length, components = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        components[_key2] = arguments[_key2];
    }

    return components.every(function (c) {
        return c && c.prototype instanceof Component;
    });
}

// 添加路标
function addRoadSign(tree) {
    var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var prev = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    var parent = arguments[3];

    var id = index > -1 ? prev + index : prev;

    // 判断是不是文本元素
    if (tree instanceof StructELement) {
        tree.parent = parent;
        if (tree.isArrayItem) {
            if (tree.props.key !== undefined) {
                tree.id = prev + ('key_' + tree.parentArrayIndex + '_' + tree.props.key);
            } else {
                tree.id = id;
                console.error('list item should have a unique key');
            }
        } else {
            tree.id = id;
        }

        !isSwiftElement(tree.type) && tree.children.forEach(function (child, index) {
            return addRoadSign(child, index + 1, id + '-', tree);
        });
    } else {
        parent.children.splice(index - 1, 1, {
            type: 'text',
            value: tree,
            id: id,
            parent: parent
        });
    }
    return tree;
}

function cloneNode(node, props, children) {
    return createElement(node, props, children);
}

exports.default = {
    Component: Component,
    isSwiftElement: isSwiftElement,
    createElement: createElement,
    StructELement: StructELement,
    cloneNode: cloneNode,
    router: _router2.default,
    Sdux: _sdux2.default
};
exports.Component = Component;
exports.isSwiftElement = isSwiftElement;
exports.createElement = createElement;
exports.StructELement = StructELement;
exports.cloneNode = cloneNode;
exports.router = _router2.default;
exports.Sdux = _sdux2.default;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Event = function () {
    function Event($ele) {
        var _this = this;

        _classCallCheck(this, Event);

        this.$ele = $ele || document.body;
        this.cache = {};

        /**
         * [listener 使用事件委托代理，把所有可以冒泡的事件到代理到根元素，节省性能]
         * @param  {[type]} event [description]
         * @return {[type]}       [description]
         */
        this.listener = function (event) {
            var id = event.target.__swift_id;
            if (!id) return;
            var isStopPropagation = false;

            _this.cache[event.type].filter(function (item) {
                return id.startsWith(item.id);
            }).sort(function (a, b) {
                return b.id.length - a.id.length;
            }).some(function (item, index, arr) {
                // 因为我们使用事件委托，因此需要proxy event，处理诸如currentTarget, stopPropagation, preventDefault
                var cur = {
                    currentTarget: $ele.__map[item.id],
                    stopPropagation: function stopPropagation() {
                        isStopPropagation = true;
                        event.stopPropagation();
                    },
                    preventDefault: function preventDefault() {
                        return event.preventDefault();
                    }
                };

                var proxyEvent = {};
                if (window.Proxy && 0) {
                    proxyEvent = new Proxy({}, {
                        get: function get(target, name) {
                            return cur[name] ? cur[name] : event[name];
                        }
                    });
                } else {
                    Event.KEYS.forEach(function (key) {
                        return cur[key] = event[key];
                    });
                    proxyEvent = cur;
                }

                item.callback(proxyEvent, event);

                return isStopPropagation;
            });
        };
    }

    _createClass(Event, [{
        key: 'addEvents',
        value: function addEvents(type) {
            this.$ele.addEventListener(type, this.listener);
        }
    }, {
        key: 'removeEvents',
        value: function removeEvents(type) {
            this.$ele.removeEventListener(type, this.listener);
        }
    }, {
        key: 'offFromNode',
        value: function offFromNode(node) {
            this.off(new RegExp('^' + node.id));
        }
    }, {
        key: 'on',
        value: function on(id, type, callback) {
            var cache = this.cache;

            cache[type] = cache[type] || [];
            cache[type].push({ id: id, callback: callback });
            if (cache[type].length == 1) {
                this.addEvents(type);
            }
            return this;
        }
    }, {
        key: 'off',
        value: function off(id, type, callback) {
            var _this2 = this;

            var cache = this.cache;

            var isRegexp = id instanceof RegExp;
            console.log(id);

            ;(type ? [type] : Object.keys(cache)).forEach(function (type) {
                cache[type] = cache[type] || [];
                cache[type] = cache[type].filter(function (item) {
                    var cb = callback ? item.callback !== callback : true;
                    return (isRegexp ? !id.test(item.id) : item.id !== id) && cb;
                });

                if (cache[type].length == 0) {
                    _this2.removeEvents(type);
                }
            });

            return this;
        }
    }, {
        key: 'trigger',
        value: function trigger(id, type) {
            for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                args[_key - 2] = arguments[_key];
            }

            var cache = this.cache;

            cache[type] = cache[type] || [];
            cache[type].forEach(function (item) {
                item.id == id && item.callback.apply(item, args);
            });
        }
    }, {
        key: 'removeNodes',
        value: function removeNodes(id) {
            var cache = this.cache;

            Object.keys(cache).map(function (type) {
                cache[type] = (cache[type] || []).filter(function (item) {
                    return item.id.startsWith(id);
                });
            });
            return this;
        }
    }]);

    return Event;
}();

exports.default = Event;


Event.KEYS = ['altKey', 'bubbles', 'cancelBubble', 'cancelable', 'charCode', 'code', 'composed', 'ctrlKey', 'defaultPrevented', 'detail', 'clientX', 'clientY', 'layerX', 'layerY', 'metaKey', 'movementX', 'movementY', 'offsetX', 'offsetY', 'pageX', 'pageY', 'eventPhase', 'isComposing', 'isTrusted', 'key', 'keyCode', 'location', 'metaKey', 'path', 'repeat', 'returnValue', 'shiftKey', 'sourceCapabilities', 'srcElement', 'target', 'timeStamp', 'type', 'view', 'which'];

var CANNOT_BUBBLE_EVENTS = ['focus', 'blur'];
Event.isBubbleEvent = function (type) {
    return !CANNOT_BUBBLE_EVENTS.includes(type);
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.transform = exports.handleProps = undefined;

var _index = __webpack_require__(6);

var _event = __webpack_require__(7);

var _event2 = _interopRequireDefault(_event);

var _util = __webpack_require__(9);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 转换dom
// 还需要一个 refs
function transform(node, options) {
    var $parent = options.$parent,
        $swift = options.$swift;

    var isParent$ = !!$parent;
    $parent = $parent || document.createDocumentFragment();

    var ele = void 0;
    if (!(node instanceof _index.StructELement)) {
        var $comment = document.createComment('swift-road-sign: ' + node.id);
        $parent.appendChild($comment);
        ele = document.createTextNode(node.value);
        $parent.appendChild(ele);

        $swift._$root.__map[node.id] = ele;
    } else {
        // 如果是一个组件的话，就实例化组件
        if ((0, _index.isSwiftElement)(node.type)) {
            var component = new node.type(node.props);
            component._event = $swift._event;
            component._$root = $swift.$root || $swift._$root;
            component._road_sign_id = node.id;
            component._init

            // 把元素挂载到树上，方便props变更通知
            ();node.component = component;
            ele = component._$ele;

            // 元素上加hook，方便卸载
            ele.__swift__hooks = component;

            // 父子组件相互引用
            component._parent = $swift;
            // 子组件放入父组件中，方便卸载管理
            $swift._children.push(component);
        } else {
            ele = document.createElement(node.type
            // ele['data-swift-id'] = node.id
            // ele.setAttribute('data-swift-id', node.id)
            // handle props
            );handleProps(node.props, ele, node, $swift);

            node.children.forEach(function (child) {
                transform(child, { $parent: ele, $swift: $swift });
            });
        }
        $parent.appendChild(ele

        // 根组件上添加一个map，根据node.id引用各个元素，从而去除使用document.querySelector的查找方式
        );$swift._$root.__map[node.id] = ele;
    }

    return isParent$ ? $parent : $parent.childNodes[0];
}

var MAP = {
    div: ['height', 'width'],
    img: ['src', 'alt', 'height', 'width'],
    a: ['href', 'target', 'download'],
    button: ['type', 'name'],
    input: ['value', 'type', 'accept', 'placeholder', 'autocomplete', 'autofocus', 'checked', 'disabled', 'name'],
    form: ['method', 'action', 'type'],
    option: ['value'],
    select: ['value', 'name'],
    audio: ['src', 'loop', 'controls', 'volume', 'preload', 'played', 'muted', 'autoplay'],
    video: ['src', 'loop', 'controls', 'volume', 'preload', 'played', 'muted', 'autoplay', 'poster'],
    canvas: ['height', 'width']

    /**
     * [handleProps 处理props]
     * @param  {Object} props  [description]
     * @param  {DOM} ele    [description]
     * @param  {StructELement} node   [description]
     * @param  {Component} $swift [description]
     * @return {[type]}        [description]
     */
};function handleProps(props, ele, node, $swift) {
    // ele.setAttribute('data-swift-id', node.id)
    node && (ele.__swift_id = node.id);
    var TAG = ele.tagName.toLowerCase();
    Object.keys(props).forEach(function (key) {
        var value = props[key];

        // 处理事件监听
        if (key.startsWith('on')) {
            var eventName = key.slice(2).toLowerCase();

            if (_event2.default.isBubbleEvent(eventName)) {
                $swift._event.on(node.id, eventName, value);
            } else {
                ele.addEventListener(eventName, value);
            }
        }

        // 元素索引
        if (key == 'ref') {
            $swift.refs[value] = ele;
        }

        // 等待添加 styleEnter styleLeave classNameEnter classNameLeave 函数
        // 那么问题来了，enter好处理，leave呢? 一般来说leave需要放在dom真实卸载之前，但是一旦diff出结果后，就会立马patch
        // patch的任务是增删改dom
        // 如果一个真实dom元素没有了__swift__id那就表示此dom元素已不存在
        // 这样在获取下一个元素的时候就可以处理啦，当然还会存在一个问题，在动画处理完毕前，dom的父节点已经被卸载了
        if (key == 'style') {
            handleStyle(ele, value);
        }

        if (key == 'styleEnter') {
            setTimeout(function () {
                ele.clientHeight;
                handleStyle(ele, value);
            });
        }

        if (!node && key == 'styleLeave') {
            handleStyle(ele, value);
        }

        if (key == 'className') {
            ele.setAttribute('class', handleClass(ele, value));
        }

        if (key == 'classNameEnter') {
            setTimeout(function () {
                ele.clientHeight;
                ele.className = handleClass(ele, props.className) + ' ' + handleClass(ele, value);
            });
        }

        if (!node && key == 'classNameLeave') {
            ele.className += ' ' + handleClass(ele, value);
        }

        // 处理data-属性
        if (key.startsWith('data-') || /data[A-Z]/.test(key)) {
            ele.setAttribute(key.replace(/[A-Z]/g, '-$&').toLowerCase(), value);
        }

        MAP[TAG] && MAP[TAG].includes(key) && ele.setAttribute(key, value);
    });
}

/**
 * [handleStyle 处理样式]
 * @param  {[type]} ele   [description]
 * @param  {[type]} style [description]
 * @return {[type]}       [description]
 */
function handleStyle(ele, style) {
    var str = '';
    if (_util2.default.isObject(style)) {
        str = ';' + Object.keys(style).map(function (name) {
            return name.replace(/[A-Z]/g, '-$&').toLowerCase() + ':' + style[name];
        }).join(';');
    } else if (_util2.default.isString(style)) {
        str = style;
    } else if (_util2.default.isArray(style)) {}

    if (str) {
        ele.style.cssText += str;
    }
}

/**
 * [handleClass 处理className]
 * @param  {[type]} ele   [description]
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
function handleClass(ele, value) {
    if (_util2.default.isArray(value)) {
        value = value.join(' ');
    } else if (_util2.default.isObject(value)) {
        value = Object.keys(value).map(function (key) {
            return value[key] ? key : '';
        }).join(' ');
    }
    return value;
}

exports.default = {
    handleProps: handleProps,
    transform: transform
};
exports.handleProps = handleProps;
exports.transform = transform;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var util = {
    getType: function getType(obj) {
        return Object.prototype.toString.call(obj).toLowerCase().split(' ')[1].slice(0, -1);
    },
    isString: function isString(obj) {
        return !!this.getType(obj).match('string');
    },
    isFunction: function isFunction(obj) {
        return !!this.getType(obj).match('function');
    },
    isObject: function isObject(obj) {
        return !!this.getType(obj).match('object');
    },
    isArray: function isArray(obj) {
        return !!this.getType(obj).match('array');
    },
    isBoolean: function isBoolean(obj) {
        return !!this.getType(obj).match('boolean');
    },
    isPromise: function isPromise(obj) {
        return !!this.getType(obj).match('promise');
    },
    isAsyncFunction: function isAsyncFunction(obj) {
        return !!this.getType(obj).match('asyncfunction');
    },
    isGeneratorFunction: function isGeneratorFunction(obj) {
        return !!this.getType(obj).match('generatorfunction');
    },


    /**
     * [uniqueArray 数组去重]
     * @method uniqueArray
     * @param  {Array}     [arr=[]] [description]
     * @param  {String}    [key=''] [description]
     * @return {Array}             [description]
     */
    uniqueArray: function uniqueArray() {
        var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

        var newArr = [];
        var keyArr = [];
        arr.forEach(function (item) {
            if (key && keyArr.indexOf(item[key]) < 0) {
                keyArr.push(item[key]);
                newArr.push(item);
            }

            if (!key && newArr.indexOf(item) < 0) {
                newArr.push(item);
            }
        });

        newArr.length != arr.length && console.error('the value of key should be unique');
        return newArr;
    },
    pickKeys: function pickKeys() {
        var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

        var newObj = {};
        keys.forEach(function (key) {
            var value = obj[key];
            if (value !== undefined) {
                newObj[key] = value;
            }
        });
        return newObj;
    }
};

exports.default = util;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getParentDOMFromNode = exports.getDOMFromNode = exports.unmountDOMFromNode = exports.unmount = exports.render = undefined;

var _transform = __webpack_require__(8);

var _util = __webpack_require__(9);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 渲染
function render(Component, $ele) {
    unmount($ele);
    return new Component.type(Component.props)._init($ele);
}

function unmount($ele) {
    if ($ele.__swift__hooks) {
        $ele.__swift__hooks._componentWillUnmount();
    }
}

function unmountDOMFromNode(node, $parent) {
    var map = $parent.__map;

    var _loop = function _loop() {
        // let $ele = $parent.querySelector(`[data-swift-id="${node.id}"]`)
        var $ele = map[node.id];
        if ($ele) {
            // 反则只是卸载event与dom
            var _node = node,
                props = _node.props;


            if (!node.component && props && (props.styleLeave || props.classLeave || props.classNameLeave) && props.transitionTime) {
                node.__swift_id = false;
                (0, _transform.handleProps)(_util2.default.pickKeys(props, ['styleLeave', 'classLeave', 'classNameLeave']), $ele);
                setTimeout(function () {
                    $ele.parentElement.removeChild($ele);
                }, props.transitionTime || 0);
            } else {
                $ele.parentElement.removeChild($ele);
            }

            delete map[node.id];

            return 'break';
        } else {
            node = node.children && node.children[0];
        }
    };

    while (node) {
        var _ret = _loop();

        if (_ret === 'break') break;
    }
}

function getDOMFromNode(node, $parent) {
    var map = $parent.__map;
    while (node) {
        // let $ele = $parent.querySelector(`[data-swift-id="${node.id}"]`)
        var _$ele = map[node.id];
        if (_$ele) {
            return _$ele;
        } else {
            node = node.children && node.children[0];
        }
    }
}

function getParentDOMFromNode(node, $parent) {
    var map = $parent.__map;
    while (node) {
        // let $ele = $parent.querySelector(`[data-swift-id="${node.id}"]`)
        var _$ele2 = map[node.id];
        if (_$ele2) {
            return _$ele2;
        } else {
            node = node.parent && node.parent;
        }
    }
}

exports.default = {
    render: render,
    unmount: unmount,
    unmountDOMFromNode: unmountDOMFromNode,
    getDOMFromNode: getDOMFromNode,
    getParentDOMFromNode: getParentDOMFromNode
};
exports.render = render;
exports.unmount = unmount;
exports.unmountDOMFromNode = unmountDOMFromNode;
exports.getDOMFromNode = getDOMFromNode;
exports.getParentDOMFromNode = getParentDOMFromNode;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = diff;

var _index = __webpack_require__(6);

// 获取diff结果
function diff(newTree, oldTree) {
    var arrs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    // console.log(newTree, oldTree);
    /**
     * add
     * change
     * delete
     * replace
     * move
     * 元素的相对坐标
     * 再根据组件的根元素，diff的结果进行性处理
     * 如果需要replace 根据坐标找到元素 $ele.parentElement.replaceChild($ele, toElemenet(newNode))
     * type = change 直接修改props就好
    */
    var diffItem = void 0;
    if (newTree && oldTree && newTree.id === oldTree.id && newTree.type === oldTree.type) {
        // 如果是文本元素
        if (newTree.type == 'text') {
            newTree.value != oldTree.value && (diffItem = {
                type: 'replace',
                id: oldTree.id,
                oldTree: oldTree,
                newTree: newTree
            });
        } else {
            // 子组件，component hook传递
            if ((0, _index.isSwiftElement)(newTree.type) && oldTree.type === newTree.type) {
                newTree.component = oldTree.component;
            }
            // console.log(oldTree, newTree);
            var diffrent = compareObj(oldTree.props, newTree.props);
            if (diffrent.length) {
                diffItem = {
                    type: 'change',
                    id: oldTree.id,
                    oldTree: oldTree,
                    newTree: newTree,
                    propsChange: diffrent
                };
            }

            // 自定组件，不用比较children
            if (!(0, _index.isSwiftElement)(newTree.type)) {
                // oldTree.children delete
                oldTree.children = oldTree.children.filter(function (node) {
                    if (node.isArrayItem && !newTree.children.some(function (i) {
                        return i.id === node.id;
                    })) {
                        arrs.push({
                            type: 'delete',
                            id: node.id,
                            oldTree: node
                        });
                        return false;
                    }
                    return true;
                }

                // 对于自定义组件，只有props不一样，才会对子组件进行diff
                );newTree.children && newTree.children.map(function (node, index) {
                    // console.log(node, oldTree.children[index]);
                    diff(node, oldTree.children[index], arrs);
                });
            }
        }
    } else {
        newTree && oldTree && (diffItem = {
            type: 'replace',
            id: oldTree.id,
            newTree: newTree,
            oldTree: oldTree
        });

        newTree && !oldTree && (diffItem = {
            type: 'add',
            newTree: newTree,
            oldTree: oldTree,
            id: newTree.id
        });

        !newTree && oldTree && (diffItem = {
            type: 'delete',
            id: oldTree.id,
            newTree: newTree,
            oldTree: oldTree
        });
    }

    if (diffItem) {
        var type = diffItem.type;
        if ((type == 'delete' || type == 'replace') && diffItem.oldTree.component) {
            diffItem.oldTree.component.__willUnmount = true;
        }
        arrs.push(diffItem);
    }
    return arrs;
}

// 获取两个对象的差异
function compareObj(prevObj, nextObj) {
    // 看一看哪些是需要删除的
    var arr = [];
    Object.keys(prevObj).map(function (key) {
        if (key != 'children' && nextObj[key] !== prevObj[key] && nextObj[key] === undefined) {
            arr.push({
                type: 'delete',
                key: key,
                oldValue: prevObj[key]
            });
        }
    });
    Object.keys(nextObj).map(function (key) {
        if (key != 'children' && nextObj[key] !== prevObj[key]) {
            arr.push({
                type: prevObj[key] === undefined ? 'add' : 'change',
                key: key,
                value: nextObj[key],
                oldValue: prevObj[key]
            });
        }
    });
    return arr;
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = observe;

// 处理监听
// 可以使用proxy
function observe(obj, getCallback, setCallback) {
    var newObj = {};
    Object.keys(obj).forEach(function (key) {
        var value = obj[key];
        Object.defineProperty(newObj, key, {
            get: function get() {
                getCallback && getCallback(key);
                return value;
            },
            set: function set(newValue) {
                var oldValue = value;
                value = newValue;
                setCallback && setCallback(key, newValue, oldValue);
            }
        });
    });
    return newObj;
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = patch;

var _transform = __webpack_require__(8);

var _index = __webpack_require__(6);

var _dom = __webpack_require__(10);

var _event = __webpack_require__(7);

var _event2 = _interopRequireDefault(_event);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// 把差异patch上
function patch() {
    var diffResult = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var $parent = arguments[1];
    var $swift = arguments[2];

    // console.log('diffResult', ...diffResult);
    // 对diff的结果进行处理
    // 可以想象到的是，diff的结果
    // {
    //      id: '1-1-2',
    //      props: {
    //          delete: [],
    //          add: []
    //      }
    // }
    // 如果节点不一样就删除
    diffResult.map(function (diffrent) {
        var type = diffrent.type,
            oldTree = diffrent.oldTree,
            newTree = diffrent.newTree,
            id = diffrent.id,
            propsChange = diffrent.propsChange;


        switch (type) {
            case 'change':
                {
                    if (oldTree.type == 'text') {
                        var _getOldNode = getOldNode(oldTree, $parent),
                            _getOldNode2 = _slicedToArray(_getOldNode, 2),
                            textNode = _getOldNode2[0],
                            commentNode = _getOldNode2[1];

                        textNode.parentElement.replaceChild(document.createTextNode(value), textNode);
                    }

                    if (propsChange) {
                        if ((0, _index.isSwiftElement)(newTree.type)) {
                            var newProps = Object.assign({}, newTree.props, { 'road-sign-id': newTree.id });
                            newTree.component._componentWillReceiveProps(newProps);
                        } else {
                            var _getOldNode3 = getOldNode(oldTree, $parent),
                                _getOldNode4 = _slicedToArray(_getOldNode3, 1),
                                $ele = _getOldNode4[0];

                            propsChange.forEach(function (props) {
                                var key = props.key,
                                    type = props.type,
                                    value = props.value,
                                    oldValue = props.oldValue;


                                if (key.startsWith('on')) {
                                    var eventName = key.slice(2).toLowerCase();
                                    if (oldValue && _event2.default.isBubbleEvent(eventName)) {
                                        $swift._event.off(oldTree.id, eventName, oldValue);
                                    }
                                }

                                if (type == 'delete') {
                                    if (key == 'ref') {
                                        delete $swift.refs[oldValue];
                                    } else {
                                        $ele.removeAttribute(oldValue);
                                    }
                                }

                                if (type == 'add' || type == 'change') {
                                    (0, _transform.handleProps)(_defineProperty({}, key, value), $ele, newTree, $swift);
                                }
                            });
                        }
                    }
                    break;
                }
            case 'delete':
                {
                    deleteNode(oldTree, $parent, $swift);
                    break;
                }
            case 'add':
                {
                    addNode(newTree, $parent, $swift);
                    break;
                }
            case 'replace':
                {
                    // 移除元素，拿到被移除元素的nextSibling
                    var _deleteNode = deleteNode(oldTree, $parent, $swift),
                        nextNode = _deleteNode.nextNode,
                        parentNode = _deleteNode.parentNode;

                    var newNodes = getNewNode(newTree, $swift

                    // console.log(oldTree, $parent, nextNode, parentNode, newNodes);
                    );nextNode ? parentNode.insertBefore(newNodes, nextNode) : parentNode.appendChild(newNodes);
                    break;
                }
        }
    });
}

// 删除节点
function deleteNode(oldTree, $parent, $swift) {
    var oldNodes = getOldNode(oldTree, $parent);

    var nextNode = oldNodes[0].nextSibling;
    var parentNode = oldNodes[0].parentElement;

    oldNodes.reverse().forEach(function (node) {
        // 如果是子组件，需要触发组件卸载
        // 组件内还有自身的state需要维护
        if (oldTree.component) {
            oldTree.component._componentWillUnmount();
        } else {
            $swift._event.offFromNode(oldTree);
            (0, _dom.unmountDOMFromNode)(oldTree, $parent);
        }
    });

    return {
        nextNode: nextNode,
        parentNode: parentNode
    };
}

// 添加节点
function addNode(newTree, $parent, $swift) {
    var $ele = (0, _dom.getParentDOMFromNode)(newTree, $parent);
    var $p = document.createDocumentFragment();
    (0, _transform.transform)(newTree, { $parent: $p, $swift: $swift });

    $ele.appendChild($p);
}

// 获取新节点
function getNewNode(tree, $swift) {
    var df = document.createDocumentFragment();
    (0, _transform.transform)(tree, { $parent: df, $swift: $swift });
    return df;
}

// 获取老节点
function getOldNode(tree, $parent) {
    var id = tree.id,
        type = tree.type;

    if (type == 'text') {
        var $ele = (0, _dom.getParentDOMFromNode)(tree, $parent
        // 获取文本几点
        );var commentNode = $ele.previousSibling;
        // 需要把有效节点放在前面
        return [$ele, commentNode];
    }

    return [(0, _dom.getDOMFromNode)(tree, $parent)];
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 路由
// 下一步计划 路由与浏览器解耦
/**
 * {
 *     '/ss/:id/:xx': {
 *          path: 'fsdf',
 *          title: 'sdfsdfsdf'
 *     }
 * }
 *
 * /a/b
 * /a/b/
 * /a/:(\b)b
 * /a/*\/b
 * /a/b/*
 */

window.addEventListener('popstate', function (event) {
    // 可以根据event.state来判断，是前进还是后退了
    _history.change(location.href.replace(location.origin, ''), event.state ? event.state.id : 0);
});

var id = 1;
// 虚拟history hash browser
var _history = {
    cache: [],
    browserHistory: [],
    path: '',
    currentId: 0,
    // 前进
    push: function push(url, title) {
        if (url == this.path) {
            console.error('页面路由一致不处理');
            return this;
        }

        this.change(url, this.currentId + 1);
        history.pushState({ id: this.currentId }, title, url);
        return this;
    },

    // 替换
    replace: function replace(url, title) {
        // debugger
        if (url == this.path) {
            console.error('页面路由一致不处理');
            return this;
        }

        this.change(url, this.currentId);
        history.replaceState({ id: this.currentId }, title, url);
        return this;
    },

    // 后退
    back: function back() {
        history.back();
        return this;
    },

    // 前进
    prev: function prev() {},

    // 更改
    change: function change() {
        var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : location.href.replace(location.origin, '');
        var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

        var str = '';

        if (id == -1) {
            str = '首次渲染';
            id = 0;
        } else if (id == this.currentId) {
            str = '页面替换';
        } else if (id > this.currentId) {
            str = '前进';
        } else {
            str = '后退';
        }

        Modal.tips(Swift.createElement(
            'div',
            { style: 'padding: 10px; background: rgb(160, 139, 200);' },
            'id: ',
            id,
            ', currentId: ',
            this.currentId,
            ' ',
            str,
            ' }'
        )

        // 处理浏览历史
        );this.browserHistory.push(url);

        this.currentId = id || 0;
        this.path = url;
        this.cache.forEach(function (fn) {
            return fn(url, str);
        }

        // let url = this.browserHistory.pop()
        // this.change(url)
        );
    },

    // 监听路由变化
    on: function on(fn) {
        this.cache.push(fn);
        return this;
    },

    // 取消监听
    off: function off(fn) {
        this.cache = this.cache.filter(function (i) {
            return i !== fn;
        });
        return this;
    }
};

// 解析url
function urlParse(url) {
    var a = document.createElement('a');
    a.href = url;

    return {
        pathname: a.pathname,
        query: strToObj(a.search.slice(1)),
        hash: a.hash,
        host: a.hostname
    };
}

// 字符串转obj
function strToObj(url) {
    var obj = {};
    url.split('&').forEach(function (item) {
        var _item$split$map$map = item.split('=').map(decodeURIComponent).map(function (i) {
            return i.trim();
        }),
            _item$split$map$map2 = _slicedToArray(_item$split$map$map, 2),
            key = _item$split$map$map2[0],
            value = _item$split$map$map2[1];

        key && (obj[key] = value);
    });
    return obj;
}

// 路由匹配
function match() {
    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var keys = Object.keys(obj);
    var urlArr = url.trim().split('/');

    var params = {};
    var router = '';
    var matched = keys.some(function (item) {
        var itemArr = item.trim().split('/');
        var lastItem = itemArr[itemArr.length - 1];
        // 长度相等，或者路由以*为结尾
        if (itemArr.length === urlArr.length || lastItem == '*' && (itemArr = itemArr.slice(0, -1))) {
            params = {};
            router = item;
            return itemArr.every(function (i, index) {
                if (i.startsWith(':')) {
                    params[i.slice(1)] = urlArr[index];
                    return true;
                } else {
                    return i === urlArr[index];
                }
            });
        }
    });

    if (matched) {
        return {
            params: params,
            url: url,
            router: router,
            value: obj[router]
        };
    }
    return null;
}

var Routers = function () {
    function Routers(history) {
        var _this = this;

        _classCallCheck(this, Routers);

        this.maps = {};
        this._maps = {};

        this.handleHistoryChange = function (url, type) {
            // 解析url
            var _urlParse = urlParse(url
            // 获取路由匹配结果
            ),
                pathname = _urlParse.pathname,
                query = _urlParse.query;

            var result = match(pathname, _this.maps);
            if (result) {
                // 页面渲染
                _this.render(result.value, { params: result.params, query: query });
            } else {
                var _result = match(pathname, _this._maps);
                if (_result) {
                    var value = _result.value,
                        router = _result.router,
                        params = _result.params;

                    loadScript(value.path).then(function (success) {
                        var App = _this.maps[router] = Fuck[router];
                        _this.render(App, { params: params, query: query });
                    });
                } else {
                    console.error('路由不存在');
                }
            }
        };

        this.register = function (router, Component) {
            // 这里使用了url -> 真实组件的形式
            // 当然也可以成为 url -> path.js
            // 在处理historyChange的时候可以先加载js，再渲染
            _this.maps[router] = Component;
            return _this;
        };

        this.load = function (url) {
            _this.history.change(url);
            return _this;
        };

        this.history = history;
        // 监听url变化
        history.on(this.handleHistoryChange);
    }

    _createClass(Routers, [{
        key: 'render',
        value: function render(App) {
            var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            SwiftDOM.render(Swift.createElement(App, props), document.querySelector('#todo'));
        }
    }, {
        key: 'inject',
        value: function inject(maps) {
            this._maps = maps;
        }
        // 注册路由

        // 加载指定路由

    }, {
        key: 'destory',

        // 销毁
        value: function destory() {
            history.off(this.handleHistoryChange);
        }
    }]);

    return Routers;
}();

exports.default = new Routers(_history);

/**
 * Router['ffff'] = XXX
 * routers = {
 *     'ffff': {
 *          path: '/sdfsdfdsf.js'
 *     }
 * }
 */

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 单向数据流 💊
//
var Event = function () {
    function Event() {
        _classCallCheck(this, Event);

        this.cache = [];
    }

    _createClass(Event, [{
        key: "off",
        value: function off(fn) {
            this.cache = this.cache.filter(function (i) {
                return i !== fn;
            });
        }
    }, {
        key: "on",
        value: function on(fn) {
            this.cache.push(fn);
        }
    }, {
        key: "trigger",
        value: function trigger() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            this.cache.forEach(function (fn) {
                return fn.apply(undefined, args);
            });
        }
    }]);

    return Event;
}();

var Sdux = function (_Event) {
    _inherits(Sdux, _Event);

    function Sdux(state) {
        _classCallCheck(this, Sdux);

        var _this = _possibleConstructorReturn(this, (Sdux.__proto__ || Object.getPrototypeOf(Sdux)).call(this));

        _this.reducers = [];

        _this.dispatch = function (action) {
            var newState = null;

            _this.reducers.some(function (fn) {
                newState = fn(_this.state, action);
                return newState;
            });

            if (newState) {
                _this.state = newState;
                _this.trigger(newState);
            }
        };

        _this.state = _extends({}, state);
        return _this;
    }
    // 获取state

    // reducer，当dispatch action时，由reducers来进行管道处理


    _createClass(Sdux, [{
        key: "getState",
        value: function getState() {
            return this.state;
        }
        // 混合reducer

    }, {
        key: "combine",
        value: function combine(reducer) {
            this.reducers.push(reducer);
        }
        // 处理action

    }, {
        key: "applyMiddlewares",

        // 处理中间件
        value: function applyMiddlewares() {
            var _this2 = this;

            var dispatch = this.dispatch;

            for (var _len2 = arguments.length, mdws = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                mdws[_key2] = arguments[_key2];
            }

            mdws.reverse().forEach(function (mdw) {
                // 高阶函数
                dispatch = mdw(_this2)(dispatch);
            });

            this.dispatch = dispatch;

            return this;
        }
        // 包装组件，把state当做props注入

    }, {
        key: "connect",
        value: function connect(App) {
            var that = this;
            return function (_Swift$Component) {
                _inherits(Connect, _Swift$Component);

                function Connect() {
                    var _ref;

                    var _temp, _this3, _ret;

                    _classCallCheck(this, Connect);

                    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                        args[_key3] = arguments[_key3];
                    }

                    return _ret = (_temp = (_this3 = _possibleConstructorReturn(this, (_ref = Connect.__proto__ || Object.getPrototypeOf(Connect)).call.apply(_ref, [this].concat(args))), _this3), _this3.___listen = function () {
                        _this3.forceUpdate();
                    }, _temp), _possibleConstructorReturn(_this3, _ret);
                }

                _createClass(Connect, [{
                    key: "componentDidMount",
                    value: function componentDidMount() {
                        // super.componentDidMount && super.componentDidMount()
                        that.on(this.___listen);
                    }
                }, {
                    key: "componentWillUnmount",
                    value: function componentWillUnmount() {
                        // super.componentWillUnmount && super.componentWillUnmount()
                        that.off(this.___listen);
                    }
                }, {
                    key: "render",
                    value: function render() {
                        var props = this.props;
                        var state = that.state;


                        return Swift.createElement(App, _extends({}, props, state));
                    }
                }]);

                return Connect;
            }(Swift.Component);
        }
    }]);

    return Sdux;
}(Event);

// 可不可以监听多个store


exports.default = Sdux;

/***/ })
/******/ ]);