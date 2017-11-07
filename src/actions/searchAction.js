/**
 * Created by admin on 2017/11/7.
 */
import * as types from '../modules/constants/actionTypes'
import request from '../modules/api/httpUtil'
import api from '../modules/api/api'

export let searchBooks = (text) => {
    return dispatch => {
        dispatch(getSearchLoading(types.SEARCH_SEARCH_BOOKS_LOADING, true))
        return request.get(api.SEARCH_BOOKS, {query: text},
            (data) => {
                data.ok ? dispatch(getSearchSuccess(data.books)) : null
            },
            (error) => {
                dispatch(getFailure(types.SEARCH_SEARCH_BOOKS_FAILURE, error))
            })
    }
};
let getSearchSuccess = (books) => {
    return {
        type: types.SEARCH_SEARCH_BOOKS,
        searchData: books,
        searchState: false,
        autoComplete: []
    }
};

let getSearchLoading = (type, isLoading) => {
    return {
        type: type,
        searchState: isLoading
    }
};
//加载失败
let getFailure = (type, error) => {
    return {
        type: type,
        error: JSON.stringify(error)
    }
};