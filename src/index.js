import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import { browserHistory, Router, Route, IndexRoute } from 'react-router';

import store from "./store";
//公用页面
import Main from "./components/Main";
import HomePageContainer from "./components/TodoHeader";
import ResultPageContainer from "./components/Main";


ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Main}>
                <IndexRoute   />
                <Route path="/selection" component={ResultPageContainer} />
                <Route path="/category" component={ResultPageContainer} />
                <Route path="/booklist" component={ResultPageContainer} />
                <Route path="/ranking" component={ResultPageContainer} />
            </Route>
        </Router>
    </Provider>,
    document.body.appendChild(document.createElement('div'))
);