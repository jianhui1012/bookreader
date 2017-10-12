/**
 * Created by golike on 2017/9/26.
 */
import React, {Component} from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

class Main extends Component {
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

export default Main;