import React from 'react'
import PropTypes from 'prop-types'
import './style_table.css'
import { Pagination } from './Pagination'

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
const DataTable = ({ thData, tdData, dataTitle }) => {
    return (
        <section className='data-table'>
            <h1>{dataTitle}</h1>
            <Pagination pullData={tdData} thData={thData} />
        </section>
    )
}

DataTable.propTypes = {
    /**
     *  <th> title <th> 
     *  ...
     */
    thData: PropTypes.objectOf(
        PropTypes.string
    ),
    /**
     * data array []
     */
    tdData: PropTypes.arrayOf(
        /**
         * data object {}
         */
        PropTypes.objectOf(
            /**
             *  <td> data </td> 
             *  ...
            */
            PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ])
        )
    ),
    /**
     * <section>
     *  <h1> title </h1>
     * </section>
     */
    dataTitle: PropTypes.string
}

export default DataTable