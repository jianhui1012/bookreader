/**
 * Created by admin on 2017/10/26.
 */
import React, {Component} from 'react'
import {is, fromJS} from 'immutable';
import {browserHistory} from 'react-router';
import api from '../../../modules/api/api'

export default class BDRightMenu extends Component {

    static defaultProps = {
        title: "请输入标题",
        recommendListData: [],
    };

    constructor(props) {
        super(props);
    }


    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }

    render() {
        const {recommendListData}=this.props;
        if (JSON.stringify(recommendListData) == "{}")
            return <div/>;
        return (<div className="detail-right">
                <div className="block app-download">
                    <h4 className="title">移动端阅读</h4>
                    <div className="content">
                        <img src={require('../../common/images/download.png')} width="140" alt=""/>
                        <p className="tip">扫一扫下载手机App</p>
                    </div>
                </div>
                <div className="block">
                    <h4 className="title">推荐书单</h4>
                    <div className="content">
                        <ul className="recommend-list">
                            {recommendListData.map((value, index) => {
                                return <li key={index} className="clearfix">
                                    <a onClick={() => {
                                        browserHistory.push({
                                            pathname: '/booklistDetail',
                                            state: {bookListId: value.id},
                                        });
                                    }}>
                                        <img src={api.IMG_BASE_URL + value.cover}
                                             alt={value.title}/>
                                        <div className="info">
                                            <h4>{value.title}</h4>
                                            <p className="author">{value.author}</p>
                                            <p className="desc">{value.desc}</p>
                                        </div>
                                    </a>
                                </li>;
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}