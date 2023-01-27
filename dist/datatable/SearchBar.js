"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchBar = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
/**
 * got 3 type of data that help made a specific research
 * @component
 * @param {Array} tdData all the datas we have
 * @param {Function} onChange ref to the func we set 
 * in this component from the parent component
 * @param {String} value set by the user
 * @example
 * tdData = [
 *  {key: string}
 *  ...
 * ]
 * @returns {Component} search bar with JSON stringify Array
 * in is dataset attributes 
 */
var SearchBar = function SearchBar(_ref) {
  var tdData = _ref.tdData,
    onChange = _ref.onChange,
    value = _ref.value;
  /**
   * stock the final filtered research
   */
  var _useState = (0, _react.useState)(tdData),
    _useState2 = _slicedToArray(_useState, 2),
    tdDataState = _useState2[0],
    setTdDataState = _useState2[1];

  /**
   * filter all special characters and excess spaces
   */
  var newValue = value.replace(/[^a-zA-Z0-9]|\s+/g, " ").trim();

  /**
   * synchonize the final data and set it to tdDataState <br/>
   * with the setTdDataState() func. <br/>
   * return in our array all the object that is true <br/>
   * we the regex we made with user set value
   */
  (0, _react.useEffect)(function () {
    if (newValue.length > 0) {
      var result = tdData.filter(function (item) {
        return Object.values(item).some(function (itemValue) {
          return new RegExp(newValue, 'i').test(itemValue);
        });
      });
      setTdDataState(result);
    } else setTdDataState(tdData);
  }, [newValue, tdData]);

  /**
   * that string is our error msg that we send if the <br/>
   * user set any special characters
   */
  var errorInvalidEntry = "SearchBar allow alphabetic & numeric only, between 3 to 11 characters";

  /**
   * that regex is return true if we found any special characters <br/>
   * in the input value
   */
  var isValid = /[^a-zA-Z0-9]/.test(value);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "search-bar"
  }, isValid ? /*#__PURE__*/_react["default"].createElement("span", {
    className: "search-alert"
  }, errorInvalidEntry) : null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "search-bar-content"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "search-bar"
  }, "Search: "), /*#__PURE__*/_react["default"].createElement("input", {
    value: value,
    onChange: onChange,
    "data-retreivesearch": JSON.stringify(tdDataState),
    type: "search",
    id: "seach-bar",
    required: true,
    pattern: "[a-zA-Z0-9]{4,9}"
  })));
};
exports.SearchBar = SearchBar;
SearchBar.propTypes = {
  /**
   * data array []
   */
  tdData: _propTypes["default"].arrayOf(
  /**
   * data object {}
   */
  _propTypes["default"].objectOf(
  /**
   *  <td> data </td> 
   *  ...
   */
  _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]))),
  /**
   * onChange={}
   */
  onChange: _propTypes["default"].func,
  /**
   * <input value type="search" />
   */
  value: _propTypes["default"].string
};