/*
 * description: all of reducer to combine
 * author: 麦芽糖
 * time: 2017年03月18日14:28:04
 */

'use strict'

import {combineReducers} from 'redux'
import ranking from './rankingReducer'
import book from './bookReducer'
import read from './readReducer'

const rootReducer = combineReducers({
    ranking,book,read
});

export default rootReducer