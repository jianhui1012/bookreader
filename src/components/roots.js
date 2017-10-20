/**
 * Created by golike on 2017/9/26.
 */
import React, {Component} from "react";
import Header from "./common/Header";
import Footer from "./common/Footer";

class Roots extends Component {
    render() {
        return (
            <div>
                {/*<Header />*/}
                {this.props.children}
                {/*<Footer />*/}
            </div>
        );
    }
}

export default Roots;