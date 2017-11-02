/**
 * Created by golike on 2017/10/15.
 */
import * as types from '../modules/constants/actionTypes'
import request from '../modules/api/httpUtil'
import api from '../modules/api/api'
//GET 读取章节列表
export let readBookChapterList = (bookId) => {
    return dispatch => {
        return request.get(api.READ_BOOK_CHAPTER_LIST(bookId), null,
            (data) => {
                data.ok ? dispatch(getReadBookChapterListSuccess(data)) : dispatch(getReadBookChapterListSuccess(null))
            },
            (error) => {
                dispatch(getFailure(types.BOOK_DETAI_FAILURE, error))
            })
    }
};

let getReadBookChapterListSuccess = (data) => {
    return {
        type: types.READ_BOOK_CHAPTER_LIST,
        bookChapterList: data.mixToc.chapters,
    }
}

//GET 读取章节详情
export let readBookChapterDetail = (chapterUrl,num,title) => {
    return dispatch => {
        dispatch(getBookChapterDetailLoading(types.READ_BOOK_CHAPTER_DETAIL_LOADING, true));
        let tempUrl = chapterUrl.replace(/\//g, '%2F').replace('?', '%3F')
        return request.get(api.READ_BOOK_CHAPTER_DETAIL(tempUrl), null,
            (data) => {
                data.ok ? dispatch(getReadBookChapterDetailSuccess(data,num,title)) : dispatch(getReadBookChapterDetailSuccess(null))
            },
            (error) => {
                dispatch(getFailure(types.READ_BOOK_CHAPTER_DETAIL_FAILURE, error))
            })
    }
};

let getBookChapterDetailLoading = (type, isLoading) => {
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

let getReadBookChapterDetailSuccess = (data,num,title) => {
    let _currentChapter = data.chapter.body;
    let _arr = _formatChapter(_currentChapter, num,title);
    return {
        type: types.READ_BOOK_CHAPTER_DETAIL,
        chapterDetail: _arr,
        chapterNum: num,
        isLoadingDetail: false,
    }
};

let _formatChapter=(content, num, title)=> {
    let _arr =[];
    let _content = '\u3000\u3000' + content.replace(/\n/g, '@\u3000\u3000');
    let _arrTemp = contentFormat(_content);
    _arrTemp.forEach(function(element) {
        let _chapterInfo = {
            title: title,
            num: num,
            content: element
        };
        _arr.push(_chapterInfo)
    });
    return _arr
};

export let contentFormat = (content) => {
    let fontCount = parseInt(window.width / 18 - 1);
    let fontLines = parseInt((window.height - 100) / 34);
    const length = content.length;
    let array = [];
    let x = 0, y, m = 0;
    while (x < length) {
        let _array = [];
        for (let i = 0; i <= fontLines; i++) {
            let str = content.substring(x, x + fontCount);
            if (str.indexOf('@') != -1) {
                y = x + str.indexOf('@') + 1;
                _array[i] = content.substring(x, y).replace('@', '');
                x = y;
                continue;
            } else {
                y = x + fontCount;
                _array[i] = content.substring(x, y);
                x = y;
                continue;
            }
        }
        array[m] = _array;
        m++
    }
    return array
};

