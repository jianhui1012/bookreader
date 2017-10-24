/**
 * Created by golike on 2017/10/15.
 */
import * as types from '../modules/constants/actionTypes'
import request from '../modules/api/httpUtil'
import api from '../modules/api/api'
//GET 书籍详情
export let bookDetail = (bookid) => {
    return dispatch => {
        dispatch(getBookDetailLoading(types.BOOK_DETAIL_LOADING, true))
        return request.get(api.BOOK_DETAIL(bookid), null,
            (data) => {
                data.ok ? dispatch(getBookDetailSuccess(data)) : dispatch(getBookDetailSuccess(null))
            },
            (error) => {
                dispatch(getFailure(types.BOOK_DETAI_FAILURE, error))
            })
    }
};

let getBookDetailSuccess = (data) => {
    let male = [];
    let maleOther = [];
    let female = [];
    let femaleOther = [];
    data.male.forEach(function (item) {
        if (item.collapse) {
            maleOther.push(item)
        } else {
            male.push(item)
        }
    }, this);
    data.female.forEach(function (item) {
        if (item.collapse) {
            femaleOther.push(item)
        } else {
            female.push(item)
        }
    }, this);
    return {
        type: types.BOOK_DETAIL,
        isLoading: false,
        male: male,
        maleOther: maleOther,
        female: female,
        femaleOther: femaleOther
    }
}

let getBookDetailLoading = (type, isLoading) => {
    return {
        type: type,
        isLoading: isLoading
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
export let bookHotReview = (id) => {
    return dispatch => {
        return request.get(api.BOOK_HOT_REVIEW + "?book=" + id, null,
            (data) => {
                data.ok ? dispatch(getBookHotReviewSuccess(data.ranking)) : dispatch(getBookHotReviewSuccess(null))
            },
            (error) => {
                dispatch(getFailure(types.BOOK_HOT_REVIEW, error))
            })
    }
};

let getBookHotReviewSuccess = (data) => {
    return {
        type: types.BOOK_HOT_REVIEW,
        isLoadingDetail: false,
        bookHotReview: data
    }
};

//GET 根据id推荐书单 url?limit=3
export let recommondBookList = (id) => {
    return dispatch => {
        return request.get(api.BOOK_HOT_REVIEW + "?book=" + id, null,
            (data) => {
                data.ok ? dispatch(getRecommondBookListSuccess(data.ranking)) : dispatch(getRecommondBookListSuccess(null))
            },
            (error) => {
                dispatch(getFailure(types.BOOK_RECOMMEND_BOOK_LIST, error))
            })
    }
};

let getRecommondBookListSuccess = (data) => {
    return {
        type: types.BOOK_RECOMMEND_BOOK_LIST,
        isLoadingDetail: false,
        bookHotReview: data
    }
};