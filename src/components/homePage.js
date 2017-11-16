/**
 * Created by golike on 2017/10/15.
 */
import React, {Component} from "react";
import {connect} from "react-redux";
import api from "../modules/api/api";
import {discoverCategoryList} from '../actions/categoryAction'
import "./common/style/home.scss";


function CategoryList(props) {
    const {className, style, title, categoryList} = props;
    return (<div style={{...style}} className="category-block">
        <div className="title">
            <i className="icon icon-man"/>
            <span className="name">{title}</span>
            <a href="/category?gender=male" className="more">更多<span className="arrow-more"/></a>
        </div>
        <div className="category-list">
            {categoryList.map((value, index) => {
                return <a key={index} onClick={() => {
                }}>
                    <p className="name">{value.name}</p>
                    <p className="bookCount">{value.bookCount}</p>
                </a>;
            })}
        </div>
    </div>);
}

function getImageUrl(curUrl) {
    if (curUrl.indexOf(api.IMG_BASE_URL) != -1) {
        return curUrl;
    }
    return api.IMG_BASE_URL + curUrl;
}

function RankList(props) {
    const {className, style, title, rankList} = props;
    return (<div className="ranking">
        <div className="ranking-block">
            <div className="title">
                <i className="icon icon-ranking"/>
                <span className="name">{title}</span>
                <a className="more">全部<span className="arrow-more"/></a>
            </div>
            <div className="ranking-nav">
                <span id="ranking-male" className="active">男生榜</span>
                <span className="verticaleLine">|</span>
                <span id="ranking-female">女生榜</span>
            </div>
            <div id="ranking-list" className="ranking-list">
                <div className="male-list">
                    {rankList.map((value, index) => {
                        return <a key={index} onClick={() => {
                        }} className="first">
                            <div className="num-index clearfix" style={{width: 70}}>
                                <span className="No No1">{index + 1}</span>
                                <img src={getImageUrl(value.cover)}
                                     className="cover" ref={img => this.img = img} onError={(e) => {
                                    this.img.src = require('./common/images/img-bk.png');
                                }}/>
                            </div>
                            <div className="text-block">
                                <p className="name">{value.title}</p>
                                <p className="latelyFollower"><span>{value.title}</span>{value.title}</p>
                            </div>
                        </a>;
                    })}
                </div>
            </div>
        </div>
    </div>);

}


// 主页
class Home extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getCategoryList();
    }


    render() {
        const {home} = this.props;
        console.log(home);
        return <div className="page-home">
            <section className="container content">
                <div className="content-left">
                    <div className="category">
                        <CategoryList title="男生" categoryList={home.tagsState ? home.tags.male:[]}/>
                        <CategoryList title="女生" categoryList={home.tagsState ? home.tags.female:[]}/>
                        <CategoryList title="出版" categoryList={home.tagsState ? home.tags.press:[]}/>
                    </div>
                    <RankList title="排行榜" rankList={[]}/>
                </div>
                <div className="content-right">
                    {/*<Carousel accessibility arrows centerMode infinite autoplay className="carousel-list f1"*/}
                    {/*nextArrow={<SampleNextArrow />} prevArrow={<SamplePrevArrow />}>*/}
                    {/*<img src="http://statics.zhuishushenqi.com/recommendPage/151028093581349"/>*/}
                    {/*<img src="http://statics.zhuishushenqi.com/recommendPage/151028086998468"/>*/}
                    {/*<img src="http://statics.zhuishushenqi.com/recommendPage/151028088465985"/>*/}
                    {/*</Carousel>*/}
                </div>
            </section>
            <section className="container"></section>
            <section className="container"></section>
        </div>;
    }
}

const mapStateToProps = (store) => {
    const {home} = store;
    return {
        home
    }
};

const mapDispatchToProps = (dispatch) => ({
    getCategoryList: () => {
        dispatch(discoverCategoryList())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
