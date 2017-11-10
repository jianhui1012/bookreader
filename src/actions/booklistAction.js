/**
 * Created by admin on 2017/11/7.
 */
import * as types from '../modules/constants/actionTypes'
import request from '../modules/api/httpUtil'
import api from '../modules/api/api'

export let discoverBookListTag = () => {
    return dispatch => {
        return request.get(api.DISCOVER_BOOK_LIST_TAG, null,
            (data) => {
                if (data.ok) {
                    let tagData = data.data;
                    dispatch(getBookListTagSuccess(tagData));
                    dispatch(discoverBookListDetail("?duration=last-seven-days&sort=collectorCount"));
                }
            },
            (error) => {
                //todo
            })
    }
};

let getBookListTagSuccess = (data) => {
    let gender = {"name": "性别", "tags": ["男性", "女性"]};
    data.unshift(gender);
    data.unshift({"name": "全部", "tags": []});
    return {
        type: types.DISCOVER_BOOK_LIST_TAG,
        tags: data
    }
};

let getBookListLoading = (type, isLoading) => {
    return {
        type: type,
        detailState: isLoading
    }
};

export let discoverBookListDetail = (params) => {
    return dispatch => {
        dispatch(getBookListLoading(types.DISCOVER_BOOK_LIST_LOADING, true))
        return request.get(api.DISCOVER_BOOK_LIST+params, null,
            (data) => {
                data.ok ? dispatch(getBookListDetailSuccess(data)) : null
            },
            (error) => {
                dispatch(getFailure(types.DISCOVER_BOOK_LIST_FAILURE, error))
            })
    }
};

let getBookListDetailSuccess = (data) => {
    return {
        type: types.DISCOVER_BOOK_LIST,
        bookList: data.bookLists,
        total: data.total,
        detailState: false,
    }
};

//加载失败
let getFailure = (type, error) => {
    return {
        type: type,
        error: JSON.stringify(error)
    }
};
