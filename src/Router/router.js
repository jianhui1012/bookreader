/**
 * Created by golike on 2017/10/15.
 */
import React from "react";
import { browserHistory, Router, Route, IndexRoute } from 'react-router';
//公用页面
import Roots from "../components/roots";

const home = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../components/home').default)
    },'home')
};

const category = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../components/selection').default)
    },'selection')
};

const selection = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../components/selection').default)
    },'selection')
};

const booklist = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../components/selection').default)
    },'selection')
};

const ranking = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../components/selection').default)
    },'selection')
};


const RouteConfig = (
    <Router history={browserHistory}>
        <Route path="/" component={Roots}>
            <IndexRoute  components={home} />
            <Route path="/selection" component={selection} />
            <Route path="/category" component={category} />
            <Route path="/booklist" component={booklist} />
            <Route path="/ranking" component={ranking} />
        </Route>
    </Router>
);

export default RouteConfig;