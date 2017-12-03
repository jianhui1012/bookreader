/**
 * Created by admin on 2017/11/9.
 */
import React, {Component} from 'react'
//import about connect package
import {connect} from 'react-redux';
import {discoverCategoryList, discoverCategoryListV2, discoverCategoryBooks} from '../actions/categoryAction'
//加载CSS
import  './common/style/leftmenu.scss'
import './common/style/rankingpage.scss'
//加载antd
import {BackTop} from 'antd';
//加载组件
import NormalLeftMenu from './common/component-module/NormalLeftMenu'
import NormalTopMenu from './common/component-module/NormalTopMenu'
import BookList from './common/component-module/BookList'
import config from '../modules/config'

//分类页面
class Category extends Component {
    constructor(props) {
        super(props);

        let {gender, major, index} = this.props.location.query;
        this.typeGender = gender ? "&gender=" + gender : "&gender=male";
        this.typeBookMajor = major ? "&major=" + major : "&major=玄幻";
        this.defaultIndex = index ? index : 0;
        //console.log(this.defaultIndex);
        this.startParams = "?start=0&limit=50";
        this.typeBookMinor = "&minor=";
        this.typeBookStatus = "&type=hot";
        this.state = {
            title: config.bookListTypes[0].title,
            curIndex: 0,
        }
    }

    componentDidMount() {
        this.props.getCategoryListV2();
        this.getData();
    }

    renderStatus(status) {
        let content = <div/>;
        if (!status) {
            content = <BookList bookListData={this.props.category.bookList}/>;
        } else {
            content = <div className="content">加载中...</div>;
        }
        return content;
    }

    getBookListDetail(index) {
        let params, returnParams = "";
        if (index === 0) {
            returnParams = "&gender=male";
            params = "?gender=male&type=hot&major=玄幻&minor=&start=0&limit=50";
        } else if (index === 1) {
            returnParams = "&gender=female";
            params = "?gender=female&type=hot&major=古代言情&minor=&start=0&limit=50";
        } else if (index === 2) {
            returnParams = "&gender=press";
            params = "?gender=press&type=&major=传记名著&minor=&start=0&limit=50";
        }
        this.props.getCategoryBooks(params);
        return returnParams;
    }

    getData() {
        this.props.getCategoryBooks(this.startParams + this.typeGender + this.typeBookMajor + this.typeBookMinor + this.typeBookStatus);
    }

    render() {
        const {category} = this.props;
        return <section className="page-ranking">
            <BackTop/>
            <section className="container">
                {/*左侧菜单*/}
                <div className="c-full-sideBar">
                    <NormalLeftMenu clickMenuItem={(index, item) => {
                        this.typeGender = this.getBookListDetail(index);
                        this.setState({title: item.title, curIndex: index})
                    }} menuData={config.bookListCategory}/>
                </div>
                {/*内容显示区*/}
                <div className="content">
                    <div className="title">
                        {this.state.title}
                    </div>
                    {category.tagsV2.length > 0 ?
                        <NormalTopMenu defaultIndex={this.defaultIndex} title={"作品类型"}
                                       tagsData={category.tagsV2[this.state.curIndex]}
                                       ClickMenuItem={(index, item) => {
                                           this.typeBookMajor = "&major=" + item.name;
                                           this.typeBookMinor = "&minor=";
                                           this.getData();
                                       }} subClickMenuItem={(index, item) => {
                            if (item === "全部")
                                this.typeBookMinor = "&minor=";
                            else {
                                this.typeBookMinor = "&minor=" + item;
                            }
                            this.getData();
                        }}/> : <div/>}
                    {this.state.curIndex === 2 ? null :
                        <NormalTopMenu tagsData={config.subCategory} title={"更多筛选"} ClickMenuItem={(index, item) => {
                            this.typeBookStatus = "&type=" + item.code;
                            this.getData();
                        }}/>}
                    {this.renderStatus(category.booksState)}
                </div>
            </section>
        </section>;
    }
}

const mapStateToProps = (store) => {
    const {category} = store;
    return {
        category
    }
};

const mapDispatchToProps = (dispatch) => ({
    getCategoryList: () => {
        dispatch(discoverCategoryList())
    }, getCategoryListV2: () => {
        dispatch(discoverCategoryListV2())
    }, getCategoryBooks: (params) => {
        dispatch(discoverCategoryBooks(params))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Category);