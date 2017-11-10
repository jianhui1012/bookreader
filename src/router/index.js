/**
 * Created by golike on 2017/10/15.
 */
import React from "react";
import {browserHistory, Router, Route, IndexRoute} from "react-router";
//公用页面
import roots from "../components/roots";

const home = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../components/homePage').default)
    }, 'home')
};

const category = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../components/homePage').default)
    }, 'selection')
};

const selection = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../components/selectionPage').default)
    }, 'selection')
};

const bookList = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../components/booklistPage').default)
    }, 'booklist')
};

const booklistDetail = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../components/booklistDetailPage').default)
    }, 'booklistDetail')
};

//依赖 dependencies | 回调 callback | chunk名称 chunkName
const ranking = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../components/rankingPage').default)
    }, 'ranking')
};

const book = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../components/bookPage').default)
    }, 'book')
};

const read = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../components/readPage').default)
    }, 'read')
};

const search = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../components/searchPage').default)
    }, 'search')
};


const RouteConfig = (
    <Router history={browserHistory}>
        <Route path="/read" getComponent={read}/>
        <Route path="/" component={roots}>
            <IndexRoute getComponent={home}/>
            <Route path="/home" getComponent={home}/>
            <Route path="/selection" getComponent={selection}/>
            <Route path="/category"/>
            <Route path="/booklist" getComponent={bookList}/>
            <Route path="/rank" getComponent={ranking}/>
            <Route path="/book" getComponent={book}/>
            <Route path="/search" getComponent={search}/>
            <Route path="/booklistDetail" getComponent={booklistDetail}/>
        </Route>
    </Router>
);

export default RouteConfig;