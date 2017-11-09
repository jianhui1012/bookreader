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
import TopMenu from './common/component-module/TopMenu'
import NewBookList from './common/component-module/NewBookList'
import config from '../modules/config'

//书单页面
class BookListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: config.bookListTypes[0].title
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


    render() {
        const {booklist} = this.props;
        return <section className="page-ranking">
            <BackTop/>
            <section className="container">
                {/*左侧菜单*/}
                <div className="c-full-sideBar">
                    <NormalLeftMenu clickMenuItem={(index, item) => {
                        //this.props.getDiscoverBookListDetail(item._id);
                        this.setState({title: item.title})
                    }} menuData={config.bookListTypes}/>
                </div>
                {/*内容显示区*/}
                <div className="content">
                    <div className="title">
                        {this.state.title}
                    </div>
                    {/*<TopMenu clickMenuItem={(index, item, id) => {*/}

                    {/*}}/>*/}
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