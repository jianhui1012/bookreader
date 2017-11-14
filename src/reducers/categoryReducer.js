/**
 * Created by admin on 2017/11/7.
 */
import * as types from "../modules/constants/actionTypes";
import * as ConstData from '../modules/constants/ConstData'

const initialState = {
    tags: {},
    tagsV2:{},
    bookList: [],
    total: 0,
    booksState: false,
    error: "",
    type: types.SELECTION_NODES_BOOKS_LOADING,
    dataState: ConstData.DATA_EMPTY
};

export default function category(state = initialState, action) {
    switch (action.type) {
        case types.DISCOVER_CATEGORY_BOOKS_LOADING:
            return Object.assign({}, state, {
                detailState: action.booksState,
                booksState: ConstData.DATA_LOADING
            });
        case types.DISCOVER_CATEGORY_BOOKS:
            return Object.assign({}, state, {
                bookList: action.bookList,
                total: action.total,
                booksState: action.booksState,
            });
        case types.DISCOVER_CATEGORY_BOOKS_FAILURE:
            return Object.assign({}, state, {
                type: types.BOOK_DETAI_FAILURE,
                error: action.error,
                booksState: ConstData.DATA_FAILURE
            });
        case types.DISCOVER_CATEGORY_LIST:
            return Object.assign({}, state, {
                tags: action.tags
            });
        case types.DISCOVER_CATEGORY_LIST_V2:
            return Object.assign({}, state, {
                tagsV2: action.tagsV2
            });
        default:
            return state
    }
}