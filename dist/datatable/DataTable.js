"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
require("./style_table.css");
var _Pagination = require("./Pagination");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * got 3 type of data 
 * @component
 * @param {Object} thData the titles needed for the table
 * @param {Array} tdData all the datas we have
 * @param {String} dataTitle is the main title for our table H1
 * @example
 * thData = {
 *  key: string,
 *  ...
 * } 
 * tdData = [
 *  {key: string}
 *  ...
 * ]
 * @returns {component} the all section element that contains
 * our table with all it's tools
 */
var DataTable = function DataTable(_ref) {
  var thData = _ref.thData,
    tdData = _ref.tdData,
    dataTitle = _ref.dataTitle;
  return /*#__PURE__*/_react["default"].createElement("section", {
    className: "data-table"
  }, /*#__PURE__*/_react["default"].createElement("h1", null, dataTitle), /*#__PURE__*/_react["default"].createElement(_Pagination.Pagination, {
    pullData: tdData,
    thData: thData
  }));
};
DataTable.propTypes = {
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
  _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]))),
  /**
   * <section>
   *  <h1> title </h1>
   * </section>
   */
  dataTitle: _propTypes["default"].string
};
var _default = DataTable;
exports["default"] = _default;