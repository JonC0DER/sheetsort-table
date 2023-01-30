"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pagination = void 0;
var _SearchBar = require("./SearchBar");
var _react = _interopRequireWildcard(require("react"));
var _Table = require("./Table");
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
 * help to display all the data in few pages for a best vue
 * got 2 type of data 
 * @component
 * @param {Object} thData the titles needed for the table
 * @param {Array} tdData all the datas we have
 * @example
 * thData = {
 *  key: string,
 *  ...
 * } 
 * tdData = [
 *  {key: string}
 *  ...
 * ]
 * @returns {component} 
 */
var Pagination = function Pagination(props) {
  var tdData = props.pullData;
  var numberOfLines = [5, 10, 15, 30, 50, 100];

  /**
   * store the number of rows needed in the current page
   */
  var _useState = (0, _react.useState)(5),
    _useState2 = _slicedToArray(_useState, 2),
    nbRows = _useState2[0],
    setNbRows = _useState2[1];
  /**
   * update & store the end indexes for each current pages []
   */
  var _useState3 = (0, _react.useState)(5),
    _useState4 = _slicedToArray(_useState3, 2),
    endElem = _useState4[0],
    setEndElem = _useState4[1];
  /**
   * update & store the start indexes for each current pages []
   */
  var _useState5 = (0, _react.useState)(0),
    _useState6 = _slicedToArray(_useState5, 2),
    startElem = _useState6[0],
    setStartElem = _useState6[1];
  /**
   * update the number of page to allow us knowing 
   * what number is the current page
   */
  var _useState7 = (0, _react.useState)(1),
    _useState8 = _slicedToArray(_useState7, 2),
    currentPage = _useState8[0],
    setCurrentPage = _useState8[1];
  /**
   * store user searching value
   */
  var _useState9 = (0, _react.useState)(''),
    _useState10 = _slicedToArray(_useState9, 2),
    searchState = _useState10[0],
    setSearchState = _useState10[1];
  /**
   * return TRUE if user is using the search else FALSE
   */
  var _useState11 = (0, _react.useState)(false),
    _useState12 = _slicedToArray(_useState11, 2),
    searchBool = _useState12[0],
    setSearchBool = _useState12[1];
  /**
   * store user search results
   */
  var _useState13 = (0, _react.useState)(tdData),
    _useState14 = _slicedToArray(_useState13, 2),
    tdDataState = _useState14[0],
    setTdDataState = _useState14[1];

  /**
   * calculs that return the number of pages that we need
   */
  var nbPages = Math.ceil(tdData.length / nbRows);
  /**
   * store the data lenght in a variable... more efficiant
   */
  var dataLen = tdData.length;
  /**
   * get the start & end indexes needed to set the
   * datas gonna display in the current page
   */
  var currentPageData = tdData.slice(startElem, endElem);
  //const firstPage = () => tdData.slice(0, nbRows)
  //const lastPage = tdData.slice((nbPages * nbRows) - nbRows)

  /**
   * @param {element} e of the select number of rows <br/>
   * 1 - set the number of row <br/>
   * 2 - set the start & end indexes that update the current page data <br/>
   * 3 - update & set the first page <br/>
   * 4 - set the search boolean to false <br/>
   */
  var onSetNumberOfRows = function onSetNumberOfRows(e) {
    var nbLines = Number(e.target.value);
    setNbRows(nbLines);
    setStartElem(0);
    setEndElem(nbLines);
    setCurrentPage(1);
    setSearchBool(false);
  };

  /**
   * <function description>
   * 1 - set the user search value to searchState <br>
   * 2 - parse the dataset & set it to tdDataState <br>
   * 3 - if user search value is empty then set FALSE to searchBool <br>
   * else set TRUE to it
   * @param {element} e.target we store the value & parse the dataset
   */
  var onSearchSomething = function onSearchSomething(e) {
    var searchValue = e.target.value;
    setSearchState(searchValue);
    var searchRetreiveData = JSON.parse(e.target.dataset['retreivesearch']);
    setTdDataState(searchRetreiveData);
    if (searchValue === '') {
      setSearchBool(false);
    } else {
      setSearchBool(true);
    }
  };

  /**
   * 1 - update start & end indexes to update the current page
   * 2 - decrement the current page number
   */
  var previousPage = function previousPage() {
    if (startElem - nbRows >= 0) {
      setStartElem(startElem - nbRows);
      setEndElem(endElem - nbRows);
      setCurrentPage(currentPage - 1);
    }
  };

  /**
   * 1 - update start & end indexes to update the current page
   * 2 - increment the current page number
   */
  var nextPage = function nextPage() {
    if (endElem + nbRows <= dataLen + nbRows) {
      setStartElem(startElem + nbRows);
      setEndElem(endElem + nbRows);
      setCurrentPage(currentPage + 1);
    }
  };

  /**
   * if user is searching somthing or if it's the first page : <br/>
   *      then we disable the previous button
   */
  var disablePrev = searchBool ? true : currentPage === 1 ? true : false;
  /**
   * if user is searching somthing or if it's the last page : <br/>
   *      then we disable the next button
   */
  var disableNext = searchBool ? true : currentPage === nbPages ? true : false;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "table-filter"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "select-number"
  }, /*#__PURE__*/_react["default"].createElement("span", null, "Show"), "\xA0", /*#__PURE__*/_react["default"].createElement("select", {
    onChange: onSetNumberOfRows,
    name: "select-numnber-rows",
    id: "select-number-rows"
  }, numberOfLines.map(function (nb, key) {
    return /*#__PURE__*/_react["default"].createElement("option", {
      key: key,
      value: "".concat(nb)
    }, " ", nb);
  })), "\xA0", /*#__PURE__*/_react["default"].createElement("span", null, "Entries")), /*#__PURE__*/_react["default"].createElement(_SearchBar.SearchBar, {
    value: searchState,
    tdData: tdData,
    onChange: onSearchSomething
  })), /*#__PURE__*/_react["default"].createElement(_Table.Table, {
    thData: props.thData,
    tdData: tdData,
    searchBool: searchBool,
    currentPageData: currentPageData,
    tdDataState: tdDataState
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "table-footer"
  }, /*#__PURE__*/_react["default"].createElement("p", null, "Showing ", startElem, " to ", endElem, " of ", dataLen, " entries"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "pagination"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    onClick: previousPage,
    disabled: disablePrev,
    className: "previous-btn"
  }, "Previous"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "current-page"
  }, currentPage, " / ", nbPages), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: nextPage,
    disabled: disableNext,
    className: "next-btn"
  }, "Next"))));
};
exports.Pagination = Pagination;
Pagination.propTypes = {
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
  _propTypes["default"].string))
};