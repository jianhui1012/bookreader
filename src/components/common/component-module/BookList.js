/**
 * Created by golike on 2017/10/21.
 */
import React, {Component} from 'react'
import {is, fromJS} from 'immutable';
import api from '../../../modules/api/api'
import  {Pagination} from 'antd'

export default class BookList extends Component {

    static defaultProps = {
        title: "请输入标题",
        bookListData: [],
    };

    constructor(props) {
        super(props);
    }


    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }

    getLatelyFollower(latelyFollower) {
        if (latelyFollower >= 10000) {
            return (latelyFollower / 10000).toFixed(2) + "万";
        } else {
            return latelyFollower + "";
        }
    }

    onShowSizeChange(current, pageSize) {
        console.log(current, pageSize);
    }


    render() {
        const {bookListData}=this.props;
        return (<div className="books-list">
            {bookListData.map((value, index) => {
                return <a  key={index} className="book" target="_blank">
                    <img src={api.IMG_BASE_URL + value.cover}
                         alt={value.title} className="cover"/>
                    <div className="right">
                        <h4 className="name"><span>{value.title}</span></h4>
                        <p className="author">
                            <span>{value.author}</span>
                        </p>
                        <p className="desc">
                            {value.shortIntro}
                        </p>
                        <p className="popularity">
                            <span className="c-red">{this.getLatelyFollower(value.latelyFollower)}</span>人气
                            <span className="split">|</span>
                            <span className="c-red">{value.retentionRatio + "%"}</span>读者留存
                        </p>
                    </div>
                </a>
            })}
            <div className="c-full-page">
                <Pagination showQuickJumper onShowSizeChange={this.onShowSizeChange}
                            pageSize={20} total={bookListData.length}/>
            </div>
        </div>);
    }
}