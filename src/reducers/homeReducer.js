/**
 * Created by admin on 2017/11/7.
 */
import * as types from "../modules/constants/actionTypes";
import * as ConstData from '../modules/constants/ConstData'

const initialState = {
    tags: {},
    tagsV2: {},
    total: 0,
    tagsState: false,
    error: "",
    type: types.SELECTION_NODES_BOOKS_LOADING,
    dataState: ConstData.DATA_EMPTY
};

export default function home(state = initialState, action) {
    switch (action.type) {
        case types.DISCOVER_CATEGORY_LIST:
            return Object.assign({}, state, {
                tags: action.tags,
                tagsState: true
            });
        case types.DISCOVER_CATEGORY_LIST_V2:
            return Object.assign({}, state, {
                tagsV2: action.tagsV2
            });
        default:
            return state
    }
}