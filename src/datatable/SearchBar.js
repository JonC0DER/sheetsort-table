import React from 'react'
import { useEffect, useState } from "react"
import PropTypes from 'prop-types'

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
export const SearchBar = ({ tdData, onChange, value }) => {
    /**
     * stock the final filtered research
     */
    const [tdDataState, setTdDataState] = useState(tdData)

    /**
     * filter all special characters and excess spaces
     */
    const newValue = value.replace(/[^a-zA-Z0-9]|\s+/g, " ").trim()

    /**
     * synchonize the final data and set it to tdDataState <br/>
     * with the setTdDataState() func. <br/>
     * return in our array all the object that is true <br/>
     * we the regex we made with user set value
     */
    useEffect(() => {
        if (newValue.length > 0) {
            const result = tdData.filter(item => {
                return Object.values(item).some(itemValue =>
                    new RegExp(newValue, 'i').test(itemValue)
                )
            })
            setTdDataState(result)
        } else
            setTdDataState(tdData)
    }, [newValue, tdData])

    /**
     * that string is our error msg that we send if the <br/>
     * user set any special characters
     */
    const errorInvalidEntry = "SearchBar allow alphabetic & numeric only, between 3 to 11 characters"

    /**
     * that regex is return true if we found any special characters <br/>
     * in the input value
     */
    const isValid = /[^a-zA-Z0-9]/.test(value)

    return (
        <div className="search-bar">
            {isValid
                ? <span className="search-alert">{errorInvalidEntry}</span>
                : null
            }
            <div className="search-bar-content">
                <label htmlFor="search-bar">Search: </label>
                <input
                    value={value}
                    onChange={onChange}
                    data-retreivesearch={JSON.stringify(tdDataState)}
                    type="search" id="seach-bar"
                    required pattern="[a-zA-Z0-9]{4,9}"
                />
            </div>
        </div>
    )
}

SearchBar.propTypes = {
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
    ),
    /**
     * onChange={}
     */
    onChange: PropTypes.func,
    /**
     * <input value type="search" />
     */
    value: PropTypes.string
}