/**
 * Created by golike on 2017/10/25.
 */
import * as types from "../modules/constants/actionTypes";

const initialState = {
    bookChapterList: [],
    chapterDetail: {},
    chapterNum: 0,
    totalChapter: 0,
    isLoadingDetail:false,
    error:"",
    type:types.BOOK_DETAIL
};

export default function read(state = initialState, action) {
    switch (action.type) {
        case types.READ_BOOK_CHAPTER_DETAIL_LOADING:
            return Object.assign({}, state, {
                isLoadingDetail: action.isLoadingDetail
            })
        case types.READ_BOOK_CHAPTER_DETAIL_FAILURE:
            return Object.assign({}, state, {
                type:types.BOOK_DETAI_FAILURE,
                error: action.error
            })
        case types.READ_BOOK_CHAPTER_DETAIL:
            return Object.assign({}, state, {
                chapterDetail: action.chapterDetail,
                chapterNum: action.chapterNum,
                isLoadingDetail: action.isLoadingDetail
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