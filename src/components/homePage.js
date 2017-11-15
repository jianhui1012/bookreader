/**
 * Created by golike on 2017/10/15.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Carousel} from 'antd';
import 'antd'
import  './common/style/home.scss'

function SampleNextArrow(props) {
    const {className, style, onClick} = props
    return (
        <div
            className={className}
            style={{
                ...style, display: 'block',height: 20,
                width: 20,
                lineHeight: 1,
                fontSize: 20,
                cursor: 'pointer',
                color: '#00558B',
            }}
            onClick={onClick}
        ></div>
    );
}

function SamplePrevArrow(props) {
    const {className, style, onClick} = props
    return (
        <div
            className={className}
            style={{
                ...style, display: 'block',height: 20,
                width: 20,
                lineHeight: 1,
                fontSize: 20,
                cursor: 'pointer',
                color: '#00558B',
            }}
            onClick={onClick}
        ></div>
    );
}

// 主页
class Home extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div className="page-home">
            <div className="container">
                {/**/}
                <div className="classify-list fl">
                    <ul>
                        <li>xx</li>
                        <li>xx</li>
                        <li>xx</li>
                    </ul>
                </div>
                <div className="content-right">
                    <Carousel accessibility arrows centerMode infinite autoplay className="carousel-list f1"
                              nextArrow={<SampleNextArrow />} prevArrow={<SamplePrevArrow />}>
                        <img src="http://statics.zhuishushenqi.com/recommendPage/151028093581349"/>
                        <img src="http://statics.zhuishushenqi.com/recommendPage/151028086998468"/>
                        <img src="http://statics.zhuishushenqi.com/recommendPage/151028088465985"/>
                    </Carousel>
                </div>
                <div className="fl">
                </div>
                {/**/}
                <div></div>
            </div>
        </div>
            ;
    }
}

const styles = {};

const mapStateToProps = (store) => {
    const {home} = store;
    return null;
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
