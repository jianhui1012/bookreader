/**
 * Created by admin on 2017/11/7.
 */
import * as types from "../modules/constants/actionTypes";
import * as ConstData from '../modules/constants/ConstData'

const initialState = {
    books: [],
    total: 0,
    title:"",
    detailState: false,
    error: "",
    type: types.SELECTION_NODES_BOOKS_LOADING,
    dataState: ConstData.DATA_EMPTY
};

export default function booklistDetail(state = initialState, action) {
    switch (action.type) {
        case types.DISCOVER_BOOK_LIST_DETAIL_LOADING:
            return Object.assign({}, state, {
                detailState: action.detailState,
                dataState: ConstData.DATA_LOADING
            });
        case types.DISCOVER_BOOK_LIST_DETAIL:
            return Object.assign({}, state, {
                books: action.books,
                total: action.bookList.total,
                title:action.bookList.title,
                detailState: action.detailState,
            });
        case types.DISCOVER_BOOK_LIST_DETAIL_FAILURE:
            return Object.assign({}, state, {
                type: types.BOOK_DETAI_FAILURE,
                error: action.error,
                dataState: ConstData.DATA_FAILURE
            });
        default:
            return state
    }
}