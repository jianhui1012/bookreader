/**
 * Created by admin on 2017/11/9.
 */
import React, {Component} from 'react'
//import about connect package
import {connect} from 'react-redux';
import {discoverBookListTag, discoverBookListDetail} from '../actions/booklistAction'
//加载CSS
import  './common/style/leftmenu.scss'
import './common/style/rankingpage.scss'
//加载antd
import {BackTop} from 'antd';
//加载组件
import NormalLeftMenu from './common/component-module/NormalLeftMenu'
import NormalTopMenu from './common/component-module/NormalTopMenu'
import NewBookList from './common/component-module/NewBookList'
import config from '../modules/config'

//书单页面
class BookListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: config.bookListTypes[0].title,
            curIndex: 0,
            params: "?duration=last-seven-days&sort=collectorCount"
        }
    }

    componentDidMount() {
        this.props.getDiscoverBookListTag();
    }

    renderStatus(status) {
        let content = <div/>;
        if (!status) {
            content = <NewBookList bookListData={this.props.booklist.bookList}/>;
        } else {
            content = <div className="content">加载中...</div>;
        }
        return content;
    }

    getBookListDetail(index) {
        let params = "";
        if (index === 0) {
            params = "?duration=last-seven-days&sort=collectorCount";
        } else if (index === 1) {
            params = "?duration=all&sort=created";
        } else if (index === 2) {
            params = "?duration=all&sort=collectorCount";
        }
        this.props.getDiscoverBookListDetail(params);
        return params;
    }

    getSubClickMenuItem(index, item) {
        let params = "";
        if (item === "男性") {
            params = this.state.params + "&gender=male";
        } else if (item === "女性") {
            params = this.state.params + "&gender=female";
        } else {
            params = this.state.params + "&tag=" + item;
        }
        this.props.getDiscoverBookListDetail(params);
    }

    render() {
        const {booklist} = this.props;
        return <section className="page-ranking">
            <BackTop/>
            <section className="container">
                {/*左侧菜单*/}
                <div className="c-full-sideBar">
                    <NormalLeftMenu clickMenuItem={(index, item) => {
                        let params = this.getBookListDetail(index);
                        this.setState({title: item.title, curIndex: index, params: params})
                    }} menuData={config.bookListTypes}/>
                </div>
                {/*内容显示区*/}
                <div className="content">
                    <div className="title">
                        {this.state.title}
                    </div>
                    <NormalTopMenu AllMenuItem={(index, item) => {
                        this.getBookListDetail(this.state.curIndex);
                    }} ClickMenuItem={(index, item) => {
                        let params = "", tag = item.tags[0];
                        if (tag === "男性") {
                            params = this.state.params + "&gender=male";
                        } else if (tag === "女性") {
                            params = this.state.params + "&gender=female";
                        } else {
                            params = this.state.params + "&tag=" + tag;
                        }
                        this.props.getDiscoverBookListDetail(params);
                    }} tagsData={this.props.booklist.tags} subClickMenuItem={(index, item) => {
                        this.getSubClickMenuItem(index, item);
                    }}/>
                    {this.renderStatus(booklist.detailState)}
                </div>
            </section>
        </section>;
    }
}

const mapStateToProps = (store) => {
    const {booklist} = store;
    return {
        booklist
    }
};

const mapDispatchToProps = (dispatch) => ({
    getDiscoverBookListDetail: (params) => {
        dispatch(discoverBookListDetail(params))
    }, getDiscoverBookListTag: () => {
        dispatch(discoverBookListTag())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(BookListComponent);