/**
 * Created by admin on 2017/11/7.
 */
import * as types from "../modules/constants/actionTypes";
import * as ConstData from '../modules/constants/ConstData'

const initialState = {
    searchData: [],
    totalSearchData: 0,
    searchState: false,
    error: "",
    type: types.SEARCH_SEARCH_BOOKS_LOADING,
    dataState: ConstData.DATA_EMPTY
};

export default function search(state = initialState, action) {
    switch (action.type) {
        case types.SEARCH_SEARCH_BOOKS_LOADING:
            return Object.assign({}, state, {
                searchState: action.searchState,
                dataState: ConstData.DATA_LOADING
            });
        case types.SEARCH_SEARCH_BOOKS:
            return Object.assign({}, state, {
                searchData: action.searchData,
                totalSearchData: action.searchData.length,
                searchState: action.searchState,
            });
        case types.SEARCH_SEARCH_BOOKS_FAILURE:
            return Object.assign({}, state, {
                type: types.BOOK_DETAI_FAILURE,
                error: action.error,
                dataState: ConstData.DATA_FAILURE
            });
        default:
            return state
    }
}