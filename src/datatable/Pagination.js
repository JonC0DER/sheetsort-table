import { SearchBar } from './SearchBar'
import React, { useState } from 'react'
import { Table } from './Table'
import PropTypes from 'prop-types'

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
export const Pagination = (props) => {
    const tdData = props.pullData
    const numberOfLines = [5, 10, 15, 30, 50, 100]

    /**
     * store the number of rows needed in the current page
     */
    const [nbRows, setNbRows] = useState(5)
    /**
     * update & store the end indexes for each current pages []
     */
    const [endElem, setEndElem] = useState(5)
    /**
     * update & store the start indexes for each current pages []
     */
    const [startElem, setStartElem] = useState(0)
    /**
     * update the number of page to allow us knowing 
     * what number is the current page
     */
    const [currentPage, setCurrentPage] = useState(1)
    /**
     * store user searching value
     */
    const [searchState, setSearchState] = useState('')
    /**
     * return TRUE if user is using the search else FALSE
     */
    const [searchBool, setSearchBool] = useState(false)
    /**
     * store user search results
     */
    const [tdDataState, setTdDataState] = useState(tdData)

    /**
     * calculs that return the number of pages that we need
     */
    const nbPages = Math.ceil(tdData.length / nbRows)
    /**
     * store the data lenght in a variable... more efficiant
     */
    const dataLen = tdData.length
    /**
     * get the start & end indexes needed to set the
     * datas gonna display in the current page
     */
    const currentPageData = tdData.slice(startElem, endElem)
    //const firstPage = () => tdData.slice(0, nbRows)
    //const lastPage = tdData.slice((nbPages * nbRows) - nbRows)

    /**
     * @param {element} e of the select number of rows <br/>
     * 1 - set the number of row <br/>
     * 2 - set the start & end indexes that update the current page data <br/>
     * 3 - update & set the first page <br/>
     * 4 - set the search boolean to false <br/>
     */
    const onSetNumberOfRows = (e) => {
        const nbLines = Number(e.target.value)
        setNbRows(nbLines)
        setStartElem(0)
        setEndElem(nbLines)
        setCurrentPage(1)
        setSearchBool(false)
    }

    /**
     * <function description>
     * 1 - set the user search value to searchState <br>
     * 2 - parse the dataset & set it to tdDataState <br>
     * 3 - if user search value is empty then set FALSE to searchBool <br>
     * else set TRUE to it
     * @param {element} e.target we store the value & parse the dataset
     */
    const onSearchSomething = (e) => {
        const searchValue = e.target.value
        setSearchState(searchValue)
        const searchRetreiveData = JSON.parse(e.target.dataset['retreivesearch'])
        setTdDataState(searchRetreiveData)
        if (searchValue === '') {
            setSearchBool(false)
        } else {
            setSearchBool(true)
        }
    }

    /**
     * 1 - update start & end indexes to update the current page
     * 2 - decrement the current page number
     */
    const previousPage = () => {
        if (startElem - nbRows >= 0) {
            setStartElem(startElem - nbRows)
            setEndElem(endElem - nbRows)
            setCurrentPage(currentPage - 1)
        }
    }

    /**
     * 1 - update start & end indexes to update the current page
     * 2 - increment the current page number
     */
    const nextPage = () => {
        if (endElem + nbRows <= (dataLen + nbRows)) {
            setStartElem(startElem + nbRows)
            setEndElem(endElem + nbRows)
            setCurrentPage(currentPage + 1)
        }
    }

    /**
     * if user is searching somthing or if it's the first page : <br/>
     *      then we disable the previous button
     */
    const disablePrev = searchBool ? true : currentPage === 1 ? true : false
    /**
     * if user is searching somthing or if it's the last page : <br/>
     *      then we disable the next button
     */
    const disableNext = searchBool ? true : currentPage === nbPages ? true : false

    return (
        <>
            <div className="table-filter" >
                <div className="select-number" >
                    <span>Show</span>&nbsp;
                    <select
                        onChange={onSetNumberOfRows}
                        name="select-numnber-rows" id="select-number-rows"
                    >
                        {numberOfLines.map((nb, key) =>
                            <option key={key} value={`${nb}`}> {nb}</option>
                        )}
                    </select>
                    &nbsp;<span>Entries</span>
                </div>
                <SearchBar
                    value={searchState} tdData={tdData} onChange={onSearchSomething}
                />
            </div>
            <Table thData={props.thData} tdData={tdData} searchBool={searchBool}
                currentPageData={currentPageData} tdDataState={tdDataState}
            />
            <div className="table-footer">
                <p>Showing {startElem} to {endElem} of {dataLen} entries</p>
                <div className="pagination">
                    <button
                        onClick={previousPage} disabled={disablePrev}
                        className="previous-btn"
                    >Previous</button>
                    <div className="current-page">{currentPage} / {nbPages}</div>
                    <button
                        onClick={nextPage} disabled={disableNext}
                        className='next-btn'
                    >Next</button>
                </div>
            </div>
        </>
    )
}

Pagination.propTypes = {
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
            PropTypes.string
        )
    )
}
