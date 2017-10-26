/**
 * Created by admin on 2017/10/26.
 */
import React, {Component} from 'react'
import {is, fromJS} from 'immutable';
import api from '../../../modules/api/api'

export default class BDRightMenu extends Component {

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

    render() {
        const {recommendListData}=this.props;
        return (<div className="detail-right">
            <div className="block app-download">
                <h4 className="title" style="text-align: center;">移动端阅读</h4>
                <div className="content">
                    <img src={require('../../common/images/download.png')} width="140" alt=""/>
                    <p className="tip">扫一扫下载手机App</p>
                </div>
            </div>
            <div className="block">
                <h4 className="title">喜欢这本书的也喜欢</h4>
                <div className="content">
                    <ul className="recommend-list">
                        {recommendListData.map((value, index) => {
                            return <li key={index} className="clearfix">
                                <a href="/book/59b9e4a42d8c88ab15270237">
                                    <img src={api.IMG_BASE_URL + value.cover}
                                         alt="飞剑问道"/>
                                    <div className="info">
                                        <h4>飞剑问道</h4>
                                        <p className="author">我吃西红柿</p>
                                    </div>
                                </a>
                            </li>;
                        })}
                    </ul>
                </div>
            </div>
        </div>);
    }
}