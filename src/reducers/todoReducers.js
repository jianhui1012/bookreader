/**
 * Created by golike on 2017/9/26.
 */
import {handleActions} from 'redux-actions';
import {TodoState} from '../constants/models';
import {CREATE_TODO,
    DELETE_TODO,CHANGE_TEXT} from '../constants/actionTypes';

const todoReducers=handleActions({
    CREATE_TODO:(state)=>{
        console.log(JSON.stringify(todos));
        let todos=state.get('todos').push(state.get('todo'));
        return state.set('todos', todos);
    },
    DELETE_TODO:(state,{payload})=>{
        state.set('todos',state.get('todos').splice(payload.index,1));
    },
    CHANGE_TEXT:(state,{payload})=>{
        state.merge({'todo':payload})
    }
},TodoState);

export default todoReducers;