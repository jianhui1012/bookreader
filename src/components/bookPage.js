/**
 * Created by admin on 2017/10/24.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bookDetail, bookHotReview, recommondBookList} from '../actions/bookAction'
import {readBookChapterList} from '../actions/readAction'
import {BackTop} from 'antd';
import BDContent from './common/component-module/BDContent'
import BDRightMenu from './common/component-module/BDRightMenu'
import './common/style/bookpage.scss'
//书籍详情页面
class Book extends Component {
    constructor(props) {
        super(props);
        this.bookId = this.props.location.query.bookId;
        this.state = {
            bookId: this.bookId
        };
    }

    componentDidMount() {
        //get书籍详情
        this.props.getBookDetail(this.state.bookId);
        //get热门评论
        this.props.getBookHotReview(this.state.bookId);
        //get推荐书单
        this.props.getRecommondBookList(this.state.bookId);
        //get章节列表
        this.props.readBookChapterList(this.state.bookId);
    }

    renderContent(type) {
        let content = <div/>;
        if (!type) {
            content =
                <BDContent bookChapterList={this.props.book.bookChapterList} bookCommentList={this.props.book.bookCommentList} bookInfo={this.props.book.bookDetail}/>;
        } else {
            content = <div className="loading">加载中</div>;
        }
        return content;
    }

    render() {
        return <div className="page-detail-container">
            <BackTop/>
            <BDRightMenu recommendListData={this.props.book.bookRecommendList}/>
            {this.renderContent(this.props.book.isLoadingDetail)}
        </div>;
    }
}


const mapStateToProps = (store) => {
    const {book} = store;
    return {
        book
    }
};

const mapDispatchToProps = (dispatch) => ({
    getBookDetail: (id) => {
        dispatch(bookDetail(id))
    }, getBookHotReview: (id) => {
        dispatch(bookHotReview(id))
    }, getRecommondBookList: (id) => {
        dispatch(recommondBookList(id))
    }, readBookChapterList: (id) => {
        dispatch(readBookChapterList(id))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Book);