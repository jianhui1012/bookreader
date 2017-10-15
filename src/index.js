import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import store from "./store/configureStore";
import Router from "./Router/router";

ReactDOM.render(
    <Provider store={store}>
        <Router/>
    </Provider>,
    document.body.appendChild(document.createElement('div'))
);