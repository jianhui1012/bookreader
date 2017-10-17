import {createStore, applyMiddleware, compose} from 'redux';
import createLogger from 'redux-logger';
import Immutable from 'immutable';
import rootReducer from '../reducers/indexReducer';
import thunk from 'redux-thunk';

const initialState = Immutable.Map();

export default createStore(
    rootReducer, {},
    compose(applyMiddleware(thunk, createLogger({stateTransformer: state => state.toJS()})))
);
