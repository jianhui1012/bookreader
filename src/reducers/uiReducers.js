/**
 * Created by golike on 2017/9/26.
 */
import {handleActions} from 'redux-actions';
import UiState from '../constants/models';

export default handleActions({
    SHOW:(state,{payload})=>{
        state.set('todos',payload.todo)
    }
},UiState);