/**
 * Created by admin on 2017/10/26.
 */
import React, {Component} from 'react'
import {browserHistory} from 'react-router';
import {is, fromJS} from 'immutable';
import  * as ConstData from '../../../modules/constants/ConstData'
import api from '../../../modules/api/api'
import {Rate} from 'antd';
import '../style/boolist.scss'

export default class BDContent extends Component {

    static defaultProps = {
        title: "请输入标题",
        bookInfo: {},
    };

    constructor(props) {
        super(props);
        this.state={
            isShowChapterList:false
        };
    }


    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }

    getWordCount(wordCount) {
        if (wordCount >= 10000) {
            return (wordCount / 10000).toFixed(0) + "万字";
        } else {
            return wordCount + "字";
        }
    }

    getLatelyFollower(latelyFollower) {
        if (latelyFollower >= 10000) {
            return (latelyFollower / 10000).toFixed(2) + "万";
        } else {
            return latelyFollower + "";
        }
    }

    getUpdateTime(updateTime) {
        let currentTime = new Date().getTime();
        let middleTime = (currentTime - Date.parse(updateTime)) / (1000 * 60 );
        if (middleTime < 60) {
            middleTime = middleTime.toFixed(0) + "分钟前更新";
        } else if (60 <= middleTime && middleTime < 60 * 24) {
            middleTime = (middleTime / 60).toFixed(0) + "小时前更新";
        } else if (middleTime >= 60 * 24) {
            middleTime = (middleTime / (60 * 24)).toFixed(0) + "小时前更新";
        }
        return middleTime;
    }

    getCommentDateTime(updateTime) {
        return new Date(updateTime).toLocaleString();
    }

    getChapterListClassName(){
        return this.state.isShowChapterList ?  "chapter-list":"chapter-list hidden-list";
    }

    render() {
        const {bookInfo, bookCommentList, bookChapterList}=this.props;
        if (JSON.stringify(bookInfo) == "{}")
            return <div/>;
        return (<div className="detail-left">
            <div className="book-info">
                <img
                    src={api.IMG_BASE_URL + bookInfo.cover}
                    alt={bookInfo.title} className="cover"/>
                <div className="info">
                    <h1>{bookInfo.title}</h1>
                    <p className="tags">
                        <i style={{background: "#86bfec"}}>{bookInfo.majorCate}</i>
                        <i style={{background: "#f5b572"}}>{bookInfo.minorCate}</i>
                    </p>
                    <p className="sup">{bookInfo.author}<span>|</span>{bookInfo.minorCate}<span>|</span>{this.getWordCount(bookInfo.wordCount)}
                    </p>
                    <p className="sup">{this.getUpdateTime(bookInfo.updated)}</p>
                    <a onClick={() => {
                        browserHistory.push({
                            pathname: '/read',
                            state: {
                                type:ConstData.READ_BOOK_START,
                                bookName:bookInfo.title,
                                bookId: bookInfo._id
                            }
                        });
                    }} className="start-read" target="_blank">开始阅读</a>
                </div>
            </div>
            <div className="book-data">
                <div>
                    <i className="key">追书人数</i>
                    <i className="value">{this.getLatelyFollower(bookInfo.latelyFollower)}</i>
                </div>
                <div>
                    <i className="key">读者留存率</i>
                    <i className="value">{bookInfo.retentionRatio + "%"}</i>
                </div>
                <div>
                    <i className="key">日更新字数</i>
                    <i className="value">
                        {bookInfo.serializeWordCount}
                    </i>
                </div>
            </div>
            <div className="book-section">
                <h3>《{bookInfo.title}》简介:</h3>
                <p className="content intro">
                    {bookInfo.longIntro}
                </p>
            </div>
            <div className="book-section">
                <h3>《{bookInfo.title}》最新章节:</h3>
                <ul className="chapter-list clearfix">
                    {bookChapterList.slice(-10).reverse().map((value, index) => {
                        return <li key={index}><a onClick={() => {
                            browserHistory.push({
                                pathname: '/read',
                                state: {
                                    type:ConstData.READ_BOOK_MIDDLE,
                                    bookName:bookInfo.title,
                                    chapter: {chapterUrl:value.link,num:index,title:value.title},
                                    bookId: bookInfo._id
                                }
                            });
                        }}>{value.title}</a></li>;
                    })}
                </ul>
            </div>
            <div className="book-section">
                <h3>《{bookInfo.title}》目录:<span className="more"><i>全部章节</i><i onClick={()=>{
                     this.setState({
                         isShowChapterList:!this.state.isShowChapterList
                     });
                }} className="arrow"/></span></h3>
                <ul className={this.getChapterListClassName()}>
                    {bookChapterList.map((value, index) => {
                        return <li key={index}><a onClick={() => {
                            browserHistory.push({
                                pathname: '/read',
                                state: {
                                    type:ConstData.READ_BOOK_MIDDLE,
                                    bookName:bookInfo.title,
                                    chapter: {chapterUrl:value.link,num:index,title:value.title},
                                    bookId: bookInfo._id
                                }
                            });
                        }}>{value.title}</a></li>;
                    })}
                </ul>
            </div>
            <div className="book-section">
                <h3>《{bookInfo.title}》热门书评:</h3>
                <div className="c-loader" style={{display: "none"}}></div>
                <ul className="comment-list">
                    {bookCommentList.map((value, index) => {
                        return <li key={index} className="clearfix">
                            <div className="good">
                                <i></i>
                                <span>{value.likeCount}</span>
                            </div>
                            <img src={api.IMG_BASE_URL + value.author.avatar} className="avater"/>
                            <div className="right-content">
                                <p className="name">{value.author.nickname} <span
                                    className="date">{this.getCommentDateTime(value.updated)}</span></p>
                                <Rate disabled defaultValue={value.rating} style={{fontSize: 14}}/>
                                <p className="con">
                                    {value.content}
                                </p>
                            </div>
                        </li>;
                    })}
                </ul>
                {/*<div className="clearfix"  >*/}
                {/*<div className="c-full-page">*/}
                {/*</div>*/}
                {/*</div>*/}
            </div>
        </div>);
    }
}