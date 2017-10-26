/**
 * Created by admin on 2017/10/26.
 */
import React, {Component} from 'react'
import {is, fromJS} from 'immutable';
import api from '../../../modules/api/api'

export default class BDContent extends Component {

    static defaultProps = {
        title: "请输入标题",
        bookInfo: {},
    };

    constructor(props) {
        super(props);
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

    getUpdateTime(updateTime) {

    }

    render() {
        const {bookInfo}=this.props;
        return (<div className="detail-left">
            <div className="book-info">
                <img
                    src={api.API_BASE_URL + bookInfo.cover}
                    alt={bookInfo.title} className="cover"/>
                <div className="info">
                    <h1>{bookInfo.title}</h1>
                    <p className="tags">
                        <i style={{background: "#86bfec"}}>{bookInfo.majorCate}</i>
                        <i style={{background: "#f5b572"}}>{bookInfo.minorCate}</i>
                    </p>
                    <p className="sup">{bookInfo.author}<span>|</span>{bookInfo.minorCate}<span>|</span>{this.getWordCount(bookInfo.wordCount)}
                    </p>
                    <p className="sup">{bookInfo.updated}</p>
                    <a onClick={() => {
                        console.log("_id:" + bookInfo._id);
                    }} className="start-read" target="_blank">开始阅读</a>
                </div>
            </div>
            <div className="book-data">
                <div>
                    <i className="key">追书人数</i>
                    <i className="value">{bookInfo.latelyFollower}</i>
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
        </div>);
    }
}