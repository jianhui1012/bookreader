/**
 * Created by golike on 2017/10/15.
 */
import React, {Component} from "react";
import {connect} from "react-redux";
import {browserHistory} from "react-router";
import api from "../modules/api/api";
import {discoverCategoryList} from "../actions/categoryAction";
import {discoverSingleMenuList} from "../actions/selectionAction";
import {rankingList} from "../actions/rankingAction";
import {getSpread} from "../actions/homeAction";
import {Carousel, BackTop} from "antd";
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
                    if (title === "男生") {
                        browserHistory.push({
                            pathname: '/category',
                            query: {gender: "male",major:value.name,index:index},
                        });
                    } else if (title === "女生") {
                        browserHistory.push({
                            pathname: '/category',
                            query: {gender: "female",major:value.name,index:index},
                        });
                    } else if (title === "出版") {
                        browserHistory.push({
                            pathname: '/category',
                            query: {gender: "press",major:value.name,index:index},
                        });
                    }
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

function getLatelyFollower(latelyFollower) {
    if (latelyFollower >= 10000) {
        return (latelyFollower / 10000).toFixed(2) + "万";
    } else {
        return latelyFollower + "";
    }
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
            <div className="ranking-list">
                <div className="male-list">
                    {rankList.map((value, index) => {
                        if (index >= 10)
                            return;
                        return <a key={index} onClick={() => {
                            browserHistory.push({
                                pathname: '/book',
                                query: {bookId: value._id},
                            });
                        }} className="first">
                            <div className="num-index clearfix" style={{width: 70}}>
                                <span className="No No1">{index + 1}</span>
                                <img src={getImageUrl(value.cover)}
                                     className="cover"/>
                            </div>
                            <div className="text-block">
                                <p className="name">{value.title}</p>
                                <p className="latelyFollower"><span>{getLatelyFollower(value.latelyFollower)}</span>人气
                                </p>
                            </div>
                        </a>;
                    })}
                </div>
            </div>
        </div>
    </div>);

}

function RecommandList(props) {
    const {className, style, title, recommandList} = props;
    return <div className="recommend">
        <div className="title">
            <a className="name">{title}</a>
            <a className="more">查看更多<span className="arrow-more"/></a>
        </div>
        <div className="books-list">
            {recommandList.map((value, index) => {
                let book = value.book;
                return <a key={index} className="book" onClick={() => {
                    browserHistory.push({
                        pathname: '/book',
                        query: {bookId: book._id},
                    });
                }}>
                    <img src={book.cover} className="cover"/>
                    <div className="right">
                        <h4 className="name">
                            <span>{book.title}</span>
                            <span className="tag-serial">{book.isSerial ? "连载" : "完结"}</span>
                        </h4>
                        <p className="desc">{book.shortIntro}</p>
                        <p className="popularity">
                            <span>{book.author}</span>
                            <span className="split">|</span>
                            <span className="c-red">{getLatelyFollower(book.latelyFollower)}</span> 人气
                        </p>
                    </div>
                </a>;
            })}
        </div>
    </div>;
}


// 主页
class Home extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        //获取分类数据
        this.props.getCategoryList();
        //获取排行榜数据
        this.props.getRankingList("54d42d92321052167dfb75e3");
        //获取轮播数据
        this.props.getSpread();
        //获取精选数据
        this.props.getDiscoverSingleMenuList();
    }


    render() {
        const {home} = this.props;
        //console.log(home);
        return <div className="page-home">
            <BackTop />
            <section className="container content">
                <div className="content-left">
                    <div className="category">
                        <CategoryList title="男生" categoryList={home.tagsState ? home.tags.male : []}/>
                        <CategoryList title="女生" categoryList={home.tagsState ? home.tags.female : []}/>
                        <CategoryList title="出版" categoryList={home.tagsState ? home.tags.press : []}/>
                    </div>
                    <RankList title="排行榜" rankList={home.chartsDetailBooks}/>
                </div>
                <div className="content-right">
                    <div className="banner" style={{marginBottom: 35}}>
                        {home.spreadData.length > 0 ?
                            <Carousel accessibility arrows centerMode autoplay>
                                {home.spreadData.map((value, index) => {
                                    return <div onClick={() => {
                                        browserHistory.push({
                                            pathname: '/book',
                                            query: {bookId: value.link},
                                        });
                                    }} key={index}><img src={value.img}/></div>
                                })}
                            </Carousel> : null}
                    </div>
                    {home.nodes.length === 0 ? null :
                        <RecommandList title={home.nodes[0].title} recommandList={home.nodes[0].books}/>}
                    {home.nodes.length === 0 ? null :
                        <RecommandList title={home.nodes[1].title} recommandList={home.nodes[1].books}/>}
                    {home.nodes.length === 0 ? null :
                        <RecommandList title={home.nodes[2].title} recommandList={home.nodes[2].books}/>}
                    {home.nodes.length === 0 ? null :
                        <RecommandList title={home.nodes[3].title} recommandList={home.nodes[3].books}/>}
                </div>
            </section>
            <section className="container">
                <div className="hot-items">
                    {home.spreadData.length > 0 ? home.spreadData.map((value, index) => {
                        let hotItemClass = "hot-item hot-item-first";
                        if (index === 1) {
                            hotItemClass = "hot-item";
                        } else if (index === 2) {
                            hotItemClass = "hot-item hot-item-last";
                        }
                        return <a key={index} onClick={() => {
                            browserHistory.push({
                                pathname: '/book',
                                query: {bookId: value.link},
                            });
                        }} className={hotItemClass}>
                            <img src={value.img}/>
                        </a>;
                    }) : null}
                </div>
            </section>
            <section className="container"/>
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
    },
    getRankingList: (id) => {
        dispatch(rankingList(id));
    },
    getSpread: () => {
        dispatch(getSpread());
    }, getDiscoverSingleMenuList: () => {
        dispatch(discoverSingleMenuList());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
