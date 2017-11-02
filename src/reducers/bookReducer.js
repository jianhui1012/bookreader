/**
 * Created by golike on 2017/10/25.
 */
import * as types from "../modules/constants/actionTypes";

const initialState = {
    bookDetail: {},
    bookChapterList: [],
    totalChapter:0,
    bookRecommendList:[],
    bookCommentList: [],
    totalComment: 0,
    isLoadingDetail:false,
    error:"",
    type:types.BOOK_DETAIL
};

export default function book(state = initialState, action) {
    switch (action.type) {
        case types.BOOK_DETAIL_LOADING:
            return Object.assign({}, state, {
                isLoadingDetail: action.isLoadingDetail
            })
        case types.BOOK_DETAIL:
            return Object.assign({}, state, {
                isLoadingDetail: action.isLoadingDetail,
                bookDetail: action.bookDetail,
            })
        case types.BOOK_DETAI_FAILURE:
            return Object.assign({}, state, {
                type:types.BOOK_DETAI_FAILURE,
                error: action.error
            })
        case types.BOOK_HOT_REVIEW:
            return Object.assign({}, state, {
                bookCommentList: action.bookCommentList,
                totalComment:action.bookCommentList.length
            })
        case types.BOOK_RECOMMEND_BOOK_LIST:
            return Object.assign({}, state, {
                bookRecommendList: action.bookRecommendList
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