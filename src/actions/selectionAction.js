/**
 * Created by admin on 2017/11/7.
 */
import * as types from '../modules/constants/actionTypes'
import request from '../modules/api/httpUtil'
import api from '../modules/api/api'

export let discoverMenuList = () => {
    return dispatch => {
        return request.get(api.SELECTION_NODES, null,
            (data) => {
                data.ok ? dispatch(getSelectionSuccess(data)) : null
            },
            (error) => {
                dispatch(getFailure(types.SELECTION_NODES_FAILURE, error))
            })
    }
};
let getSelectionSuccess = (home) => {
    return {
        type: types.SELECTION_NODES,
        nodes: home.nodes,
        nodesState: false,
        autoComplete: []
    }
};

let getSelectionLoading = (type, isLoading) => {
    return {
        type: type,
        searchState: isLoading
    }
};

export let discoverBookDetail = (id) => {
    return dispatch => {
        dispatch(getSelectionLoading(types.SELECTION_NODES_BOOKS_LOADING, true))
        return request.get(api.SELECTION_NODES_BOOKS(id), null,
            (data) => {
                data.ok ? dispatch(getSelectionDetailSuccess(data)) : null
            },
            (error) => {
                dispatch(getFailure(types.SEARCH_SEARCH_BOOKS_FAILURE, error))
            })
    }
};

let getSelectionDetailSuccess = (bookList) => {
    return {
        type: types.SELECTION_NODES_BOOKS,
        bookList: bookList.data,
    }
};

//加载失败
let getFailure = (type, error) => {
    return {
        type: type,
        error: JSON.stringify(error)
    }
};
