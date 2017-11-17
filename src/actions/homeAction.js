/**
 * Created by admin on 2017/11/7.
 */
import * as types from '../modules/constants/actionTypes'
import request from '../modules/api/httpUtil'
import api from '../modules/api/api'

export let getSpread = () => {
    return dispatch => {
        return request.get(api.WEB_BASE_URL, null,
            (data) => {
                data.ok ? dispatch(getSpreadSuccess(data.data)) : null
            },
            (error) => {
                //todo send error
            })
    }
};
let getSpreadSuccess = (spreads) => {
    //console.log(spreads);
    return {
        type: types.HOME_SPREAD,
        spreadData: spreads,
        spreadState: false,
        autoComplete: []
    }
};

