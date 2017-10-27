/**
 * Created by golike on 2017/10/15.
 */
import * as types from '../modules/constants/actionTypes'
import request from '../modules/api/httpUtil'
import api from '../modules/api/api'
//GET 书籍详情
export let bookDetail = (bookId) => {
    return dispatch => {
        dispatch(getBookDetailLoading(types.BOOK_DETAIL_LOADING, true))
        return request.get(api.BOOK_DETAIL(bookId), null,
            (data) => {
                data? dispatch(getBookDetailSuccess(data)) : dispatch(getBookDetailSuccess(null))
            },
            (error) => {
                dispatch(getFailure(types.BOOK_DETAI_FAILURE, error))
            })
    }
};

let getBookDetailSuccess = (data) => {
    return {
        type: types.BOOK_DETAIL,
        bookDetail:data,
        isLoadingDetail: false,
    }
}

let getBookDetailLoading = (type, isLoading) => {
    return {
        type: type,
        isLoadingDetail: isLoading
    }
};
//加载失败
let getFailure = (type, error) => {
    return {
        type: type,
        error: JSON.stringify(error)
    }
};

//GET 热门评论
export let bookHotReview = (bookId) => {
    return dispatch => {
        return request.get(api.BOOK_HOT_REVIEW(bookId), null,
            (data) => {
                data.ok ? dispatch(getBookHotReviewSuccess(data.reviews)) : dispatch(getBookHotReviewSuccess(null))
            },
            (error) => {
                dispatch(getFailure(types.BOOK_HOT_REVIEW, error))
            })
    }
};

let getBookHotReviewSuccess = (data) => {
    return {
        type: types.BOOK_HOT_REVIEW,
        bookCommentList: data
    }
};

//GET 根据id推荐书单 url?limit=3
export let recommondBookList = (bookId) => {
    return dispatch => {
        return request.get(api.BOOK_RECOMMEND_BOOK_LIST(bookId), null,
            (data) => {
                data.ok ? dispatch(getRecommondBookListSuccess(data.booklists)) : dispatch(getRecommondBookListSuccess(null))
            },
            (error) => {
                dispatch(getFailure(types.BOOK_RECOMMEND_BOOK_LIST, error))
            })
    }
};

let getRecommondBookListSuccess = (data) => {
    return {
        type: types.BOOK_RECOMMEND_BOOK_LIST,
        bookRecommendList: data,
    }
};