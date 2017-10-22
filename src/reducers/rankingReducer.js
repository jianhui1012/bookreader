/**
 * Created by golike on 2017/10/15.
 */
import * as types from "../modules/constants/actionTypes";


const initialState = {
    isLoading: false,
    male: [],
    maleOther: [],
    female: [],
    femaleOther: [],
    error:"",
    chartsDetail: [],
    chartsDetailBooks: [],
    isLoadingDetail:false,
    totalComment: 0
};

export default function ranking(state = initialState, action) {
    switch (action.type) {
        case types.DISCOVER_CHARTS_LOADING:
            return Object.assign({}, state, {
                isLoading: action.isLoading
            })
        case types.DISCOVER_CHARTS:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                male: action.male,
                maleOther: action.maleOther,
                female: action.female,
                femaleOther: action.femaleOther
            })
        case types.DISCOVER_CHARTS_FAILURE:
            return Object.assign({}, state, {
                error: action.error
            })
        case types.DISCOVER_CHARTS_DETAIL_LOADING:
            return Object.assign({}, state, {
                isLoadingDetail: action.isLoadingDetail
            })
        case types.DISCOVER_CHARTS_DETAIL:
            return Object.assign({}, state, {
                isLoadingDetail: action.isLoadingDetail,
                chartsDetail: action.chartsDetail,
                chartsDetailBooks: action.chartsDetail.books
            })
        case types.DISCOVER_CHARTS_DETAIL_FAILURE:
            return Object.assign({}, state, {
                error: action.error
            })
        default:
            return state
    }
}