/**
 * Created by golike on 2017/11/10.
 */
import React, {Component} from 'react'
//import about connect package
import {connect} from 'react-redux';
import {discoverBookListDetail} from '../actions/booklistDetailAction'
//加载css
import './common/style/searchpage.scss'
//加载antd
import {BackTop} from 'antd';
//加载组件
import BookList from './common/component-module/BookList'
class BookListDetail extends Component {
    constructor(props) {
        super(props);
        let data = this.props.location.state;
        this.bookListId = data ? data.bookListId : "";
    }

    componentDidMount() {
        this.props.getDiscoverBookListDetail(this.bookListId);
    }

    renderStatus(status) {
        let content = <div/>;
        if (!status) {
            content = <BookList bookListData={this.props.booklistDetail.books}/>;
        } else {
            content = <div className="content">加载中...</div>;
        }
        return <div className="content">
            <div className="title">
                本<span className="c-red search-val">{this.props.booklistDetail.title}</span>书单
                共<span className="c-red">{this.props.booklistDetail.total}</span>本
            </div>
            {content}
        </div>;
    }

    render() {
        return <section className="page-search">
            <BackTop/>
            {this.renderStatus(this.props.booklistDetail.detailState)}
        </section>;
    }
}

const mapStateToProps = (store) => {
    const {booklistDetail} = store;
    return {
        booklistDetail
    }
};

const mapDispatchToProps = (dispatch) => ({
    getDiscoverBookListDetail: (id) => {
        dispatch(discoverBookListDetail(id))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(BookListDetail);

