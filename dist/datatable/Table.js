"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Table = void 0;
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
 * help to display all the data in our table
 * got 6 type of data 
 * @component
 * @param {Object} thData contains strings, titles needed for the table
 * @param {Array} tdData all the datas we have for the App
 * @param {Array} currentPageData contains {objects} needed to display the current page
 * @param {Array} tdDataState contains {objects} of strings
 * @param {Boolean} searchBool needed to know if user is using the search bar
 * @example
 * thData = {
 *  key: string,
 *  ...
 * } 
 * @example
 * tdData = [
 *  {key: string}
 *  ...
 * ]
 * same with currentPageData & tdDataState
 * @returns {component} 
 */
var Table = function Table(props) {
  var thData = props.thData;
  var tdData = props.tdData;
  var currentPageData = props.currentPageData;
  var tdDataState = props.tdDataState;
  var searchBool = props.searchBool;

  /**
   * store the final data we gonna display in our Table
   * right away
   */
  var _useState = (0, _react.useState)(tdData),
    _useState2 = _slicedToArray(_useState, 2),
    tdDataS = _useState2[0],
    setTdDataState = _useState2[1];
  /**
   * store the element of the last active arrow
   */
  var _useState3 = (0, _react.useState)(null),
    _useState4 = _slicedToArray(_useState3, 2),
    lastActive = _useState4[0],
    setLastActive = _useState4[1];

  /**
   * get the arrow current element we click on
   * @param {element} e  
   */
  var onFilterList = function onFilterList(e) {
    /**
     * require lodash sort() library
     */
    var _ = require('lodash');
    /**
     * store the column we need to srot()
     */
    var column = e.target.dataset["column"];
    /**
     * store if the arrow selected is UP || DOWN 
     */
    var direction = e.target.dataset["direction"];
    /**
     * store the list of classes attributes of our arrow
     */
    var classes = e.target.classList;
    /**
     * declare an active classe
     */
    var activeClasse = 'active';
    /**
     * if last arrow element is still active
     */
    if (lastActive) {
      /**
       * store classes list of the last active arrow
       */
      var lastClasses = lastActive.target.classList;
      /**
       * if it contains the active class
       */
      if (lastClasses.contains(activeClasse)) {
        /**
         * then we remove the active class from the classes list
         */
        lastClasses.remove(activeClasse);
      }
    }
    /**
     * we sort() all the data by the column of the selected arrow
     */
    var arSort = _.sortBy(tdDataS, column);
    /**
     * store the result of sordted data
     * if the direction arrow is up, return the sort() data
     * else if is down, return the sort().reverse() data
     */
    var result = direction === 'up' ? arSort : arSort.reverse();
    /**
     * adding active class to the current arrow element
     */
    classes.add(activeClasse);
    /**
     * set the current arrow element to the last active variable
     * for next time we gonna check
     */
    setLastActive(e);
    /**
     * update tdDataState  with the value of result
     */
    setTdDataState(result);
  };

  /**
   * callback that check wich data to update in tdDataState
   */
  var callback = (0, _react.useCallback)(function () {
    /**
     * if searchBool is TRUE, return the result of user research
     * esle return the data of current page
     * finaly store TRUE or FALSE result to data constant
     */
    var data = searchBool ? tdDataState : currentPageData;
    /**
     * update tdDataState with the content of data constant
     */
    setTdDataState(data);
  }, [currentPageData, searchBool, tdDataState]);

  /**
   * use synchronisation with useEffect()
   */
  (0, _react.useEffect)(function () {
    callback();
  }, [callback]);
  return /*#__PURE__*/_react["default"].createElement("table", null, /*#__PURE__*/_react["default"].createElement("thead", null, /*#__PURE__*/_react["default"].createElement("tr", null, Object.entries(thData).map(function (entry, entryKey) {
    return /*#__PURE__*/_react["default"].createElement("th", {
      key: entryKey
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "th-content"
    }, /*#__PURE__*/_react["default"].createElement("span", null, entry[1]), " \xA0", /*#__PURE__*/_react["default"].createElement("div", {
      className: "arrow-btn"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      "data-isactive": "".concat(entry[0], "dn"),
      "data-column": entry[0],
      "data-direction": 'up',
      onClick: onFilterList
    }, "\u25B2"), /*#__PURE__*/_react["default"].createElement("div", {
      "data-isactive": "".concat(entry[0], "dn"),
      "data-column": entry[0],
      "data-direction": 'dn',
      onClick: onFilterList
    }, "\u25BC"))));
  }))), /*#__PURE__*/_react["default"].createElement("tbody", null, tdDataS.map(function (tr, trKey) {
    return /*#__PURE__*/_react["default"].createElement("tr", {
      key: trKey
    }, Object.values(tr).map(function (td, tdKey) {
      return /*#__PURE__*/_react["default"].createElement("td", {
        key: tdKey
      }, td);
    }));
  })));
};
exports.Table = Table;
Table.propTypes = {
  /**
   *  <th> title <th> 
   *  ...
   */
  thData: _propTypes["default"].objectOf(_propTypes["default"].string),
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
  _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string])))
};