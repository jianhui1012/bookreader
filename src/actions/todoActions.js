/**
 * Created by golike on 2017/9/26.
 */
import {createAction} from 'redux-actions';
import {CREATE_TODO,DELETE_TODO,CHANGE_TEXT} from '../constants/actionTypes';

export const createTodo = createAction(CREATE_TODO);
export const deleteTodo = createAction(DELETE_TODO);
export const changeText = createAction(CHANGE_TEXT);
