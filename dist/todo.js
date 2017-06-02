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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Link = function (_Swift$Component) {
    _inherits(Link, _Swift$Component);

    function Link() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Link);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Link.__proto__ || Object.getPrototypeOf(Link)).call.apply(_ref, [this].concat(args))), _this), _this.href = function (event) {
            event.preventDefault();

            var _this$props = _this.props,
                href = _this$props.href,
                replace = _this$props.replace;

            Swift.router.history[replace ? 'replace' : 'push'](_this.props.href);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Link, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                href = _props.href,
                _props$style = _props.style,
                style = _props$style === undefined ? '' : _props$style,
                _props$className = _props.className,
                className = _props$className === undefined ? '' : _props$className;


            return Swift.createElement(
                'a',
                { href: href, style: style, className: className, onClick: this.href },
                this.props.children
            );
        }
    }]);

    return Link;
}(Swift.Component);

exports.default = Link;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ModalComponent = function (_Swift$Component) {
    _inherits(ModalComponent, _Swift$Component);

    function ModalComponent() {
        _classCallCheck(this, ModalComponent);

        return _possibleConstructorReturn(this, (ModalComponent.__proto__ || Object.getPrototypeOf(ModalComponent)).apply(this, arguments));
    }

    _createClass(ModalComponent, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.addEvent();
        }
    }, {
        key: 'addEvent',
        value: function addEvent() {
            var _this2 = this;

            var $parent = this.refs.parent;
            $parent.addEventListener('click', function (event) {
                var node = event.target;
                while (node !== $parent) {
                    if (node.classList.contains('modal-close')) {
                        _this2.props.close();
                        break;
                    }
                    node = node.parentElement;
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var Child = this.props.children[0];
            var _props$layer = this.props.layer,
                layer = _props$layer === undefined ? true : _props$layer;

            var layerStyle = '\n            transition: all .3s; position: fixed; height: 100%; width: 100%; top: 0; left: 0;\n            ' + (!layer ? 'display: none;' : '') + '\n        ';
            return Swift.createElement(
                'div',
                { ref: 'parent', className: 'modal-item',
                    classNameEnter: 'enter',
                    classNameLeave: 'leave',
                    transitionTime: 3000 },
                Swift.createElement('div', { style: layerStyle,
                    className: 'modal-close layer' }),
                Swift.createElement(
                    'div',
                    { style: 'position: fixed; top: 50%; left: 50%;',
                        className: 'content' },
                    Child.type instanceof Swift.Component ? Swift.createElement(Child, _extends({}, Child.props, { close: this.props.close })) : Child
                )
            );
        }
    }]);

    return ModalComponent;
}(Swift.Component);

var Modal = function Modal(Child) {
    var _this3 = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Modal);

    this.close = function () {
        SwiftDOM.unmount(_this3.$root);
        setTimeout(function () {
            document.body.removeChild(_this3.$root);
        }, 300);
    };

    var div = this.$root = document.createElement('div');
    document.body.appendChild(div);
    SwiftDOM.render(Swift.createElement(
        ModalComponent,
        _extends({ close: this.close }, options),
        Child
    ), div);
};

function open(Child) {
    return new Modal(Child);
}

function tips(Child) {
    var modal = new Modal(Child, { layer: false });
    setTimeout(function () {
        modal.close();
    }, 1000);
    return modal;
}

function close() {}

function closeAll() {}

var fuck = {
    open: open,
    close: close,
    closeAll: closeAll,
    tips: tips
};

window.Modal = fuck;

exports.open = open;
exports.close = close;
exports.closeAll = closeAll;
exports.tips = tips;
exports.default = fuck;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Swift = Swift,
    Component = _Swift.Component,
    nextTick = _Swift.nextTick;


var id = 0;

var Chat = function (_Component) {
    _inherits(Chat, _Component);

    function Chat() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Chat);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Chat.__proto__ || Object.getPrototypeOf(Chat)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            list: [{
                type: 'text',
                text: '是打发斯蒂芬',
                isSelf: true,
                id: id++
            }]
        }, _this.send = function () {
            var text = _this.refs.input.value;
            _this.refs.input.value = '';
            _this.add({
                text: text,
                isSelf: true,
                id: id++
            });
            setTimeout(function () {
                _this.response(text);
            }, 300);
        }, _this.handleKeyDown = function (event) {
            if (event.keyCode == 13) {
                _this.send();
            }
        }, _this.handleFocus = function () {
            // setTimeout(()=>{
            //     document.body.scrollTop = document.body.scrollHeight
            //     Modal.tips(document.body.scrollTop)
            // }, 300)
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Chat, [{
        key: 'response',
        value: function response(text) {
            var res = '我不懂你在说什么';
            if (/你好|hello/.test(text)) {
                res = '你好';
            } else if (/工作/.test(text)) {
                res = '在微拍堂工作';
            } else if (/哈哈|ha/.test(text)) {
                res = '笑个屁';
            } else if (/苟利/.test(text)) {
                res = '苟利国家生死已 岂因福祸避趋之👓';
            } else if (/去哪儿吃/.test(text)) {
                res = '弄堂里';
            } else if (/吃什么/.test(text)) {
                res = '酸辣土豆丝';
            }
            this.add({
                text: res,
                id: id++
            });
        }
    }, {
        key: 'add',
        value: function add(message) {
            var _this2 = this;

            var list = [].concat(_toConsumableArray(this.state.list));
            list.push(message);
            this.state.list = list;

            var isEnd = this.refs.body.scrollHeight - this.refs.body.clientHeight == this.refs.body.scrollTop;
            this.nextTick(function () {
                isEnd && (_this2.refs.body.scrollTop = _this2.refs.body.scrollHeight);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var H1 = '\n            border-bottom: 1px solid #c5b1b1;\n            font-size: 24px;\n            padding: 10px;\n            background: #c1dcce;\n            font-weight: 300;\n        ';
            return Swift.createElement(
                'div',
                { ref: 'parent', style: STYLE.parent },
                Swift.createElement(
                    'h1',
                    { style: STYLE.H1 },
                    '\u4E0E',
                    this.props.query.a,
                    '\u804A\u5929\u4E2D'
                ),
                Swift.createElement(
                    'div',
                    { ref: 'body', className: 'scroll', style: STYLE.body },
                    this.state.list.map(function (item, index) {
                        return Swift.createElement(
                            'div',
                            { key: item.id,
                                style: {
                                    textAlign: item.isSelf ? 'right' : 'left',
                                    margin: '10px 0'
                                } },
                            Swift.createElement(
                                'div',
                                { style: 'transition: all .5s; transform: translateY(10px); display: inline-block; padding: 10px; border-radius: 10px;',
                                    styleEnter: {
                                        background: item.isSelf ? 'rgb(14, 97, 97)' : 'rgb(226, 137, 249)',
                                        transform: 'none'
                                    } },
                                item.text
                            )
                        );
                    })
                ),
                Swift.createElement(
                    'div',
                    { style: 'display: flex;' },
                    Swift.createElement('input', { onKeyDown: this.handleKeyDown, onFocus: this.handleFocus, style: 'flex: 1;', type: 'text', ref: 'input' }),
                    Swift.createElement(
                        'button',
                        { onClick: this.send },
                        '\u53D1\u9001'
                    )
                )
            );
        }
    }]);

    return Chat;
}(Component);

var STYLE = {
    parent: 'background: rgb(166, 193, 218);\n            max-width: 500px;\n            max-height: 700px;\n            height: 100vh;\n            width: 100%;\n            display: flex;\n            flex-direction: column;\n            margin: 0 auto;  ',
    H1: '\n        border-bottom: 1px solid #c5b1b1;\n        font-size: 24px;\n        padding: 10px;\n        background: #c1dcce;\n        font-weight: 300;\n    ',
    body: '\n        flex: 1;\n        color: #fff;\n        box-sizing: border-box;\n        padding: 10px;\n        overflow-y: auto;\n        -webkit-overflow-scroll: touch;\n    '
};

Swift.router.register('/chat', Chat
// SwiftDOM.render(<Chat></Chat>, document.querySelector('#app'))
);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Link = __webpack_require__(0);

var _Link2 = _interopRequireDefault(_Link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var store = new Swift.Sdux({
    list: [1, 2, 3]
});

store.combine(function (state, action) {
    if (action.type == 'add') {
        var list = state.list;

        list = [].concat(_toConsumableArray(list));
        list.push(action.payload);
        return _extends({}, state, { list: list });
    }
});

store.combine(function (state, action) {
    if (action.type == 'delete') {
        var list = state.list;

        list = list.filter(function (i) {
            return i != action.payload;
        });
        return _extends({}, state, { list: list });
    }
});

store.applyMiddlewares(function (store) {
    return function (next) {
        return function (action) {
            var state = store.getState();
            console.log('注释', state);
            next(action);
            console.log('注释', state);
        };
    };
}, function (store) {
    return function (next) {
        return function (action) {
            var state = store.getState();
            console.log('注释1', state);
            next(action);
            console.log('注释1', state);
        };
    };
});

var id = 0;

var Demo = function (_Swift$Component) {
    _inherits(Demo, _Swift$Component);

    function Demo() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Demo);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Demo.__proto__ || Object.getPrototypeOf(Demo)).call.apply(_ref, [this].concat(args))), _this), _this.delete = function (event) {
            store.dispatch({
                type: 'delete',
                payload: event.currentTarget.textContent
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Demo, [{
        key: 'add',
        value: function add() {
            store.dispatch({
                type: 'add',
                payload: '郭文贵而' + id++
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var list = this.props.list;


            return Swift.createElement(
                'div',
                null,
                Swift.createElement(
                    'button',
                    { onClick: this.add },
                    'add'
                ),
                Swift.createElement(
                    'ul',
                    null,
                    list.map(function (i) {
                        return Swift.createElement(
                            'li',
                            { onClick: _this2.delete },
                            i
                        );
                    })
                ),
                Swift.createElement(
                    _Link2.default,
                    { href: '/chat?a=sss' },
                    '\u804A\u5929'
                )
            );
        }
    }]);

    return Demo;
}(Swift.Component);

var Connect = store.connect(Demo);
Swift.router.register('/sdux', Connect);

/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(2);

__webpack_require__(3);

var _Link = __webpack_require__(0);

var _Link2 = _interopRequireDefault(_Link);

var _Modal = __webpack_require__(1);

var _Modal2 = _interopRequireDefault(_Modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Swift = Swift,
    Component = _Swift.Component;

var ToDo = function (_Component) {
    _inherits(ToDo, _Component);

    function ToDo(props) {
        _classCallCheck(this, ToDo);

        var _this = _possibleConstructorReturn(this, (ToDo.__proto__ || Object.getPrototypeOf(ToDo)).call(this, props));

        _this.handleAdd = function (event) {
            if (event.keyCode == 13) {
                _this.handleAddBtn(event);
            }
        };

        _this.handleAddBtn = function (event) {
            event.stopPropagation();
            var value = _this.refs.input.value;
            _this.refs.input.value = '';
            _this.add(value);
            Swift.nextTick(function () {
                // console.log('dom添加成功', document.querySelectorAll('li'))
                // document.body.scrollTop = document.body.scrollHeight
            });
        };

        _this.handleDel = function (event) {
            _this.del(event.target.dataset['id']);
            Swift.nextTick(function () {
                console.log('dom删除成功');
            });
        };

        _this.handleFilter = function (event) {
            var type = event.currentTarget.dataset['type'];

            _this.filter(type);
        };

        _this.handleComplete = function (event) {
            _this.complete(event.target.dataset['id']);
            console.log('complete', _this.state.currentList);
        };

        _this.state = {
            list: [{
                content: '222',
                id: 0
            }],
            currentList: [{
                content: '222',
                id: 0
            }],
            id: 0,
            currentFilter: 'all'
        };
        return _this;
    }

    _createClass(ToDo, [{
        key: 'filter',
        value: function filter(type) {
            var state = this.state;


            state.currentFilter = type = type || state.currentFilter;
            state.currentList = state.list.filter(function (item) {
                switch (type) {
                    case 'all':
                        {
                            return true;
                        }
                    case 'active':
                        {
                            return !item.complete;
                        }
                    case 'complete':
                        {
                            return item.complete;
                        }
                }
            });
        }
    }, {
        key: 'add',
        value: function add(content) {
            if (!content) return;

            this.state.list.push({
                content: content,
                complete: false,
                id: ++this.state.id
            });
            this.filter();
        }
    }, {
        key: 'del',
        value: function del(id) {
            this.state.list = this.state.list.filter(function (item) {
                return item.id != id;
            });
            this.filter();
        }
    }, {
        key: 'complete',
        value: function complete(id) {
            console.log('id', id);
            this.state.list.forEach(function (item) {
                item.id == id && (item.complete = !item.complete);
            });
            this.filter();
        }
    }, {
        key: 'handleBlur',
        value: function handleBlur() {
            console.log('是交了');
        }
        // 是的从渲染角度上来讲，render应该尽可能做到functional，相同的输入 相同的输出

    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var currentList = this.state.currentList;


            return Swift.createElement(
                'div',
                { style: 'height: 100vh; width: 100vw; background: linear-gradient(0, rgb(137, 221, 186) 0%, rgb(108, 41, 131) 100%);' },
                Swift.createElement(
                    'h1',
                    { style: 'height: 30vh; line-height: 30vh; text-align: center; font-size: 5vw; color: #fff;' },
                    'Todo List'
                ),
                Swift.createElement(
                    'div',
                    { style: 'max-width: 800px; margin: 0 auto;' },
                    Swift.createElement(
                        'div',
                        { style: 'padding: 10px;' },
                        Swift.createElement('input', { type: 'text',
                            ref: 'input',
                            onKeyDown: this.handleAdd,
                            onBlur: this.handleBlur,
                            style: 'height: 3em; margin-right: 10px;'
                        }),
                        Swift.createElement(
                            'button',
                            { onClick: this.handleAddBtn },
                            'add'
                        )
                    ),
                    Swift.createElement(
                        'ul',
                        null,
                        currentList.length ? currentList.map(function (item, index) {
                            return Swift.createElement(
                                ToDoItem,
                                _extends({}, item, {
                                    index: index + 1,
                                    key: item.id,
                                    onComplete: _this2.handleComplete,
                                    onDel: _this2.handleDel }),
                                Swift.createElement(ItemChild, { text: index })
                            );
                        }) : '暂无数据'
                    ),
                    ['all', 'active', 'complete'].map(function (item) {
                        return Swift.createElement(
                            'button',
                            { 'data-type': item,
                                onClick: _this2.handleFilter,
                                key: item,
                                className: { active: item == _this2.state.currentFilter } },
                            item
                        );
                    }),
                    Swift.createElement(
                        'p',
                        null,
                        new Date().toString()
                    ),
                    Swift.createElement(
                        _Link2.default,
                        { href: '/chat?a=\u7EA4\u7EA4\u64E2\u7D20\u624B' },
                        '\u804A\u5929\u9875\u9762'
                    ),
                    Swift.createElement(
                        _Link2.default,
                        { href: '/sdux?a=11' },
                        'sdux'
                    ),
                    Swift.createElement(
                        _Link2.default,
                        { href: '/?a=11', replace: true },
                        'sdux'
                    ),
                    Swift.createElement(
                        'button',
                        { onClick: function onClick() {
                                _Modal2.default.open(Swift.createElement(
                                    'div',
                                    { style: 'padding: 10px; background: #fff;' },
                                    Swift.createElement(
                                        'h1',
                                        null,
                                        '\u4F60\u8BF4\u600E\u4E48\u5462'
                                    )
                                ));
                            } },
                        'Modal'
                    )
                )
            );
        }
    }]);

    return ToDo;
}(Component);

var ItemChild = function (_Component2) {
    _inherits(ItemChild, _Component2);

    function ItemChild() {
        _classCallCheck(this, ItemChild);

        return _possibleConstructorReturn(this, (ItemChild.__proto__ || Object.getPrototypeOf(ItemChild)).apply(this, arguments));
    }

    _createClass(ItemChild, [{
        key: 'render',
        value: function render() {
            var str = '' + this.props.text + this.props.index;
            return Swift.createElement(
                'button',
                null,
                str,
                this.props.children
            );
        }
    }]);

    return ItemChild;
}(Component);

var ToDoItem = function (_Component3) {
    _inherits(ToDoItem, _Component3);

    function ToDoItem() {
        var _ref;

        var _temp, _this4, _ret;

        _classCallCheck(this, ToDoItem);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this4 = _possibleConstructorReturn(this, (_ref = ToDoItem.__proto__ || Object.getPrototypeOf(ToDoItem)).call.apply(_ref, [this].concat(args))), _this4), _this4.state = {
            edit: false,
            newValue: ''
        }, _this4.edit = function () {
            _this4.state.edit = !_this4.state.edit;
        }, _this4.save = function () {
            _this4.state.newValue = _this4.refs.input.value;
            _this4.edit();
        }, _this4.delete = function (event) {
            var height = _this4.refs.li.clientHeight;
            _this4.refs.li.style.cssText += ';height: ' + height + 'px';
            _this4.refs.li.clientHeight;
            _this4.refs.li.style.cssText += ';height: ' + 0 + 'px';
            // alert(111)
            setTimeout(function () {
                _this4.props.onDel(event);
            }, 500);
        }, _temp), _possibleConstructorReturn(_this4, _ret);
    }

    _createClass(ToDoItem, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                index = _props.index,
                complete = _props.complete,
                content = _props.content,
                onDel = _props.onDel,
                onComplete = _props.onComplete,
                id = _props.id,
                children = _props.children;
            var _state = this.state,
                edit = _state.edit,
                newValue = _state.newValue;


            var NewChild = children[0];
            var p = Object.assign({}, children[0].props, {});

            return !edit ? Swift.createElement(
                'li',
                { className: { complete: complete },
                    style: { marginBottom: '10px', transition: 'all .5s', overflow: 'hidden' },
                    styleEnter: { background: 'rgb(143, 237, 187)' }
                    // styleLeave={{}}
                    , transitionTime: 500,
                    ref: 'li' },
                Swift.createElement('button', { 'data-id': id, onClick: onComplete, className: 'complete-btn' }),
                Swift.createElement(
                    'span',
                    null,
                    index,
                    newValue || content
                ),
                Swift.createElement(
                    'button',
                    { 'data-id': id, onClick: this.delete },
                    'del' + index
                ),
                Swift.createElement(
                    NewChild,
                    { text: '\uD83D\uDE01\u54C8\u54C8', index: index },
                    '\u7EC4\u4EF6',
                    Swift.createElement(
                        'span',
                        null,
                        '\u4E60\u8FD1\u5E73'
                    )
                ),
                Swift.createElement(
                    'button',
                    { onClick: this.edit },
                    '\u4FEE\u6539'
                )
            ) : Swift.createElement(
                'div',
                null,
                Swift.createElement('input', { type: 'text', ref: 'input' }),
                Swift.createElement(
                    'button',
                    { onClick: this.save },
                    'save'
                )
            );
        }
    }]);

    return ToDoItem;
}(Component);

Swift.router.register('/', ToDo
// var dd = SwiftDOM.render(<ToDo content='fuck 习近平'></ToDo> , document.querySelector('#todo'))

);Swift.router.load();

/***/ })
/******/ ]);