import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import store from "./store/configureStore";
import router from "./router";

ReactDOM.render(
    <Provider store={store}>
        {router}
    </Provider>,
    document.body.appendChild(document.createElement('div'))
);