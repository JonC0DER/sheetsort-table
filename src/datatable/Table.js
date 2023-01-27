import React from 'react'
import { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

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
export const Table = (props) => {
    const thData = props.thData
    const tdData = props.tdData
    const currentPageData = props.currentPageData
    const tdDataState = props.tdDataState
    const searchBool = props.searchBool

    /**
     * store the final data we gonna display in our Table
     * right away
     */
    const [tdDataS, setTdDataState] = useState(tdData)
    /**
     * store the element of the last active arrow
     */
    const [lastActive, setLastActive] = useState(null)

    /**
     * get the arrow current element we click on
     * @param {element} e  
     */
    const onFilterList = (e) => {
        /**
         * require lodash sort() library
         */
        const _ = require('lodash')
        /**
         * store the column we need to srot()
         */
        const column = e.target.dataset["column"]
        /**
         * store if the arrow selected is UP || DOWN 
         */
        const direction = e.target.dataset["direction"]
        /**
         * store the list of classes attributes of our arrow
         */
        const classes = e.target.classList
        /**
         * declare an active classe
         */
        const activeClasse = 'active'
        /**
         * if last arrow element is still active
         */
        if (lastActive) {
            /**
             * store classes list of the last active arrow
             */
            const lastClasses = lastActive.target.classList
            /**
             * if it contains the active class
             */
            if (lastClasses.contains(activeClasse)) {
                /**
                 * then we remove the active class from the classes list
                 */
                lastClasses.remove(activeClasse)
            }
        }
        /**
         * we sort() all the data by the column of the selected arrow
         */
        const arSort = _.sortBy(tdDataS, column)
        /**
         * store the result of sordted data
         * if the direction arrow is up, return the sort() data
         * else if is down, return the sort().reverse() data
         */
        const result = direction === 'up' ? arSort : arSort.reverse()
        /**
         * adding active class to the current arrow element
         */
        classes.add(activeClasse)
        /**
         * set the current arrow element to the last active variable
         * for next time we gonna check
         */
        setLastActive(e)
        /**
         * update tdDataState  with the value of result
         */
        setTdDataState(result)
    }

    /**
     * callback that check wich data to update in tdDataState
     */
    const callback = useCallback(() => {
        /**
         * if searchBool is TRUE, return the result of user research
         * esle return the data of current page
         * finaly store TRUE or FALSE result to data constant
         */
        const data = searchBool ? tdDataState : currentPageData
        /**
         * update tdDataState with the content of data constant
         */
        setTdDataState(data)
    }, [currentPageData, searchBool, tdDataState])

    /**
     * use synchronisation with useEffect()
     */
    useEffect(() => {
        callback()
    }, [callback])

    return (
        <table>
            <thead>
                <tr>
                    {Object.entries(thData).map((entry, entryKey) =>
                        <th key={entryKey}>
                            <div className="th-content">
                                <span>{entry[1]}</span> &nbsp;
                                <div className="arrow-btn">
                                    <div
                                        data-isactive={`${entry[0]}dn`}
                                        data-column={entry[0]}
                                        data-direction={'up'}
                                        onClick={onFilterList}
                                    >&#9650;</div>
                                    <div
                                        data-isactive={`${entry[0]}dn`}
                                        data-column={entry[0]}
                                        data-direction={'dn'}
                                        onClick={onFilterList}
                                    >&#9660;</div>
                                </div>
                            </div>
                        </th>
                    )}
                </tr>
            </thead>
            <tbody>
                {tdDataS.map((tr, trKey) =>
                    <tr key={trKey}>
                        {Object.values(tr).map((td, tdKey) =>
                            <td key={tdKey}>{td}</td>
                        )}
                    </tr>
                )}
            </tbody>
        </table>
    )
}

Table.propTypes = {
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
                PropTypes.number,
                PropTypes.string
            ])
        )
    )
}