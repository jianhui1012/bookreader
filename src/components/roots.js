/**
 * Created by golike on 2017/9/26.
 */
import React, {Component} from "react";
import Header from "./common/Header";
import Footer from "./common/Footer";
import './common/style/root.scss'

class Roots extends Component {

    constructor(props) {
        super(props);
        const docEl = document.body;
        docEl.style.background = '#ffffff';
    }

    render() {
        return (
            <div>
                <Header />
                {this.props.children}
                <Footer />
            </div>
        );
    }
}

export default Roots;