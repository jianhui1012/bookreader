/**
 * Created by admin on 2017/11/7.
 */
import React, {Component} from 'react'
//import about connect package
import {connect} from 'react-redux';
import {searchBooks} from '../actions/searchAction'
//加载css
import './common/style/searchpage.scss'
//加载antd
import {BackTop} from 'antd';
//加载组件
import BookList from './common/component-module/BookList'
//排行榜页面
class Search extends Component {
    constructor(props) {
        super(props);
        let data = this.props.location.state;
        this.searchText = data ? data.text : "大主宰";
    }

    componentDidMount() {
        this.props.getSearchBooks(this.searchText);
    }

    renderStatus(status) {
        let content = <div/>;
        if (!status) {
            content = <BookList bookListData={this.props.search.searchData}/>;
        } else {
            content = <div className="content">加载中...</div>;
        }
        return <div className="content">
            <div className="title">
                共<span className="c-red">{this.props.search.totalSearchData}</span>条
                <span className="c-red search-val">{this.searchText}</span> 相关的搜索结果
            </div>
            {content}
        </div>;
    }

    render() {
        return <section className="page-search">
            <BackTop/>
            {this.renderStatus(this.props.search.searchState)}
        </section>;
    }
}

const mapStateToProps = (store) => {
    const {search} = store;
    // console.log("rank:" + JSON.stringify(ranking));
    return {
        search
    }
};

const mapDispatchToProps = (dispatch) => ({
    getSearchBooks: (text) => {
        dispatch(searchBooks(text))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);

