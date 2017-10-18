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
    },'home')
};

const category = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../components/homePage').default)
    },'selection')
};

const selection = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../components/homePage').default)
    },'selection')
};

const booklist = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../components/homePage').default)
    },'selection')
};

//依赖 dependencies | 回调 callback | chunk名称 chunkName
const ranking = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../components/rankingPage').default)
    },'ranking')
};


const RouteConfig = (
    <Router history={browserHistory}>
        <Route path="/" component={roots}>
            <IndexRoute getComponent={home} />
            <Route path="/home" getComponent={home}/>
            <Route path="/selection"   />
            <Route path="/category"   />
            <Route path="/booklist"   />
            <Route path="/rank" getComponent={ranking} />
        </Route>
    </Router>
);

export default RouteConfig;