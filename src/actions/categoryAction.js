/**
 * Created by admin on 2017/11/7.
 */
import * as types from '../modules/constants/actionTypes'
import request from '../modules/api/httpUtil'
import api from '../modules/api/api'

export let discoverCategoryList = () => {
    return dispatch => {
        return request.get(api.DISCOVER_CATEGORY_LIST, null,
            (data) => {
                if (data.ok) {
                    dispatch(getCategoryListSuccess(data));
                }
            },
            (error) => {
                //todo
            })
    }
};

let getCategoryListSuccess = (data) => {
    // data contain three types female,male,press

    return {
        type: types.DISCOVER_CATEGORY_LIST,
        tags: data
    }
};


export let discoverCategoryListV2 = () => {
    return dispatch => {
        return request.get(api.DISCOVER_CATEGORY_LIST_V2, null,
            (data) => {
                if (data.ok) {
                    let v2Data = data;
                    dispatch(getCategoryListV2Success(v2Data));
                }
            },
            (error) => {
                //todo
            })
    }
};

let getCategoryListV2Success = (data) => {
    let tagV2 = [], males = [], females = [], presss = [];
    data.male.forEach((item, index) => {
        let itemV2 = {},newTags=item.mins;
        itemV2.name = item.major;
        if (newTags.length > 0) {
            newTags.unshift("全部");
        }
        itemV2.tags = newTags;
        males.push(itemV2);
    });
    data.female.forEach((item, index) => {
        let itemV2 = {},newTags=item.mins;
        itemV2.name = item.major;
        if (newTags.length > 0) {
            newTags.unshift("全部");
        }
        itemV2.tags = newTags;
        females.push(itemV2);
    });
    data.press.forEach((item, index) => {
        let itemV2 = {};
        itemV2.name = item.major;
        itemV2.tags = item.mins;
        presss.push(itemV2);
    });
    tagV2.push(males);
    tagV2.push(females);
    tagV2.push(presss);
    return {
        type: types.DISCOVER_CATEGORY_LIST_V2,
        tagsV2: tagV2
    }
};

let getBookListLoading = (type, isLoading) => {
    return {
        type: type,
        booksState: isLoading
    }
};

export let discoverCategoryBooks = (params) => {
    return dispatch => {
        dispatch(getBookListLoading(types.DISCOVER_CATEGORY_BOOKS_LOADING, true))
        return request.get(api.DISCOVER_CATEGORY_BOOKS + params, null,
            (data) => {
                data.ok ? dispatch(getCategoryBooksSuccess(data)) : null
            },
            (error) => {
                dispatch(getFailure(types.DISCOVER_CATEGORY_BOOKS_FAILURE, error))
            })
    }
};

let getCategoryBooksSuccess = (data) => {
    return {
        type: types.DISCOVER_CATEGORY_BOOKS,
        bookList: data.books,
        total: data.total,
        booksState: false,
    }
};

//加载失败
let getFailure = (type, error) => {
    return {
        type: type,
        error: JSON.stringify(error)
    }
};
