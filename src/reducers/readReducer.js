/**
 * Created by golike on 2017/10/25.
 */
import * as types from "../modules/constants/actionTypes";
import * as ConstData from '../modules/constants/ConstData'

const initialState = {
    bookChapterList: [],
    chapterDetail: {},
    chapterNum: 0,
    totalChapter: 0,
    isLoadingDetail:false,
    chapterTitle:"",
    error:"",
    type:types.BOOK_DETAIL,
    dataState:ConstData.DATA_EMPTY
};

export default function read(state = initialState, action) {
    switch (action.type) {
        case types.READ_BOOK_CHAPTER_DETAIL_LOADING:
            return Object.assign({}, state, {
                isLoadingDetail: action.isLoadingDetail,
                dataState:ConstData.DATA_LOADING
            })
        case types.READ_BOOK_CHAPTER_DETAIL_FAILURE:
            return Object.assign({}, state, {
                type:types.BOOK_DETAI_FAILURE,
                error: action.error,
                dataState:ConstData.DATA_FAILURE
            })
        case types.READ_BOOK_CHAPTER_DETAIL:
            return Object.assign({}, state, {
                chapterDetail: action.chapterDetail,
                chapterNum: action.chapterNum,
                chapterTitle:action.chapterTitle,
                isLoadingDetail: action.isLoadingDetail,
                dataState:ConstData.DATA_SUCCESS
            })
        case types.READ_BOOK_CHAPTER_LIST:
            return Object.assign({}, state, {
                bookChapterList: action.bookChapterList,
                totalChapter:action.bookChapterList.length
            })
        default:
            return state
    }
}