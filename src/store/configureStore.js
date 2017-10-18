import {createStore, applyMiddleware, compose} from 'redux';
import createLogger from 'redux-logger';
import rootReducer from '../reducers/indexReducer';
import thunk from 'redux-thunk';


export default createStore(
    rootReducer, {},
   applyMiddleware(thunk, createLogger())
);
