/**
 * Created by golike on 2017/10/15.
 */
import * as types from '../modules/constants/actionTypes'
import request from '../modules/api/httpUtil'
import api from '../modules/api/api'

export let ranking = () => {
    return dispatch => {
        dispatch(getRankLoading(types.DISCOVER_CHARTS_LOADING,true))
        return request.get(api.DISCOVER_CHARTS, null,
            (data) => {data.ok ? dispatch(getRankingSuccess(data)) : dispatch(getRankingSuccess(null))},
            (error) => {dispatch(getFailure(types.DISCOVER_CHARTS_FAILURE,error))})
    }
};
//加载排行榜成功
let getRankingSuccess = (data) => {
    let male = [];
    let maleOther = [];
    let female = [];
    let femaleOther = [];
    data.male.forEach(function(item) {
        if (item.collapse) {
            maleOther.push(item)
        } else {
            male.push(item)
        }
    }, this);
    data.female.forEach(function(item) {
        if (item.collapse) {
            femaleOther.push(item)
        } else {
            female.push(item)
        }
    }, this);
    return {
        type: types.DISCOVER_CHARTS,
        isLoading: false,
        male: male,
        maleOther: maleOther,
        female: female,
        femaleOther: femaleOther
    }
}

let getRankLoading= (type,isLoading) => {
    return {
        type: type,
        isLoading: isLoading
    }
};
//加载失败
let getFailure=(type,error)=>{
    return {
        type:type,
        error:JSON.stringify(error)
    }
};

let getRankDetailLoading= (type,isLoading) => {
    return {
        type: type,
        isLoadingDetail: isLoading
    }
};

export let rankingList = (id) => {
    return dispatch => {
        dispatch(getRankDetailLoading(types.DISCOVER_CHARTS_DETAIL_LOADING,true))
        return request.get(api.DISCOVER_CHARTS_DETAIL(id), null,
            (data) => {data.ok ? dispatch(getRankingDetailSuccess(data.ranking)) : dispatch(getRankingDetailSuccess(null))},
            (error) => {dispatch(getFailure(types.DISCOVER_CHARTS_DETAIL_FAILURE,error))})
    }
};


let getRankingDetailSuccess=(data)=>{
    return {
        type: types.DISCOVER_CHARTS_DETAIL,
        isLoadingDetail: false,
        chartsDetail: data
    }
};