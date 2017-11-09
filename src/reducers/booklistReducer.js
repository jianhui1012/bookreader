/**
 * Created by admin on 2017/11/7.
 */
import * as types from "../modules/constants/actionTypes";
import * as ConstData from '../modules/constants/ConstData'

const initialState = {
    tags: [],
    bookList: [],
    total: 0,
    detailState: false,
    error: "",
    type: types.SELECTION_NODES_BOOKS_LOADING,
    dataState: ConstData.DATA_EMPTY
};

export default function booklist(state = initialState, action) {
    switch (action.type) {
        case types.DISCOVER_BOOK_LIST_LOADING:
            return Object.assign({}, state, {
                detailState: action.detailState,
                dataState: ConstData.DATA_LOADING
            });
        case types.DISCOVER_BOOK_LIST:
            return Object.assign({}, state, {
                bookList: action.bookList,
                total: action.total,
                detailState: action.detailState,
            });
        case types.DISCOVER_BOOK_LIST_FAILURE:
            return Object.assign({}, state, {
                type: types.BOOK_DETAI_FAILURE,
                error: action.error,
                dataState: ConstData.DATA_FAILURE
            });
        case types.DISCOVER_BOOK_LIST_TAG:
            return Object.assign({}, state, {
                tags: action.tags
            });
        default:
            return state
    }
}