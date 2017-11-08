/**
 * Created by admin on 2017/11/7.
 */
import * as types from "../modules/constants/actionTypes";
import * as ConstData from '../modules/constants/ConstData'

const initialState = {
    nodes: [],
    bookList: [],
    total: 0,
    selectionState: false,
    error: "",
    type: types.SELECTION_NODES_BOOKS_LOADING,
    dataState: ConstData.DATA_EMPTY
};

export default function selection(state = initialState, action) {
    switch (action.type) {
        case types.SELECTION_NODES_BOOKS_LOADING:
            return Object.assign({}, state, {
                selectionState: action.selectionState,
                dataState: ConstData.DATA_LOADING
            });
        case types.SELECTION_NODES_BOOKS:
            return Object.assign({}, state, {
                bookList: action.bookList,
                total: action.bookList.length,
                selectionState: action.selectionState,
            });
        case types.SELECTION_NODES_FAILURE:
            return Object.assign({}, state, {
                type: types.BOOK_DETAI_FAILURE,
                error: action.error,
                dataState: ConstData.DATA_FAILURE
            });
        case types.SELECTION_NODES:
            return Object.assign({}, state, {
                nodes: action.nodes
            });
        default:
            return state
    }
}