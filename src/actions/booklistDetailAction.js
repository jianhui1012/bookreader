/**
 * Created by admin on 2017/11/10.
 */
import * as types from '../modules/constants/actionTypes'
import request from '../modules/api/httpUtil'
import api from '../modules/api/api'


let getBookListLoading = (type, isLoading) => {
    return {
        type: type,
        detailState: isLoading
    }
};

export let discoverBookListDetail = (id) => {
    return dispatch => {
        dispatch(getBookListLoading(types.DISCOVER_BOOK_LIST_DETAIL_LOADING, true))
        return request.get(api.DISCOVER_BOOK_LIST_DETAIL(id), null,
            (data) => {
                data.ok ? dispatch(getBookListDetailSuccess(data)) : null
            },
            (error) => {
                dispatch(getFailure(types.DISCOVER_BOOK_LIST_DETAIL_FAILURE, error))
            })
    }
};

let getBookListDetailSuccess = (data) => {
    let books = [];
    data.bookList.books.forEach(function (item) {
        //新增短介绍
        item.book.shortIntro = item.book.longIntro;
        books.push(item.book);
    }, this);
    return {
        type: types.DISCOVER_BOOK_LIST_DETAIL,
        bookList: data.bookList,
        books:books,
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

