/**
 * Created by golike on 2017/10/21.
 */
import React, {Component} from 'react'
import {browserHistory} from 'react-router';
import {is, fromJS} from 'immutable';
import api from '../../../modules/api/api'
import  {Pagination} from 'antd'
import '../style/boolist.scss'

export default class NewBookList extends Component {

    static defaultProps = {
        title: "请输入标题",
        bookListData: [],
        pageSize: 20
    };

    constructor(props) {
        super(props);
        this.total = this.props.bookListData.length;
        this.bookListData = this.props.bookListData;
        this.pageSize = this.props.pageSize;
        this.state = {
            bookListData: this.bookListData
        };
    }

    componentDidMount() {
        let curData = this.state.bookListData.slice(0, this.props.pageSize);
        this.setState({
            bookListData: curData
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }

    onChange(page, pageSize) {
        setTimeout(() => {
            let curData = this.bookListData.slice((page - 1) * pageSize, page * pageSize);
            console.log(page + "-" + pageSize + ",curData:" + curData.length);
            this.setState({
                bookListData: curData
            });
        }, 200);
    }

    getImageUrl(curUrl) {
        if (curUrl.indexOf(api.IMG_BASE_URL) != -1) {
            return curUrl;
        }
        return api.IMG_BASE_URL + curUrl;
    }

    render() {
        return (<div className="books-list">
            {this.state.bookListData.map((value, index) => {
                return <a onClick={() => {
                    browserHistory.push({
                        pathname: '/booklistDetail',
                        state: {bookListId: value._id},
                    });
                }} key={index} className="book" target="_blank">
                    <img src={this.getImageUrl(value.cover)}
                         className="cover" ref={img => this.img = img} onError={(e) => {
                        this.img.src = require('../images/img-bk.png');
                    }}/>
                    <div className="right">
                        <h4 className="name"><span>{value.title}</span></h4>
                        <p className="author">
                            <span>{value.author}</span>
                        </p>
                        <p className="desc">
                            {value.desc}
                        </p>
                        <p className="popularity">
                            <span className="c-red">共有{value.bookCount}</span>本书
                            <span className="split">|</span>
                            <span className="c-red">{value.collectorCount}</span>收藏
                        </p>
                    </div>
                </a>
            })}
            <div className="c-full-page">
                <Pagination showQuickJumper={true} onChange={this.onChange.bind(this)}
                            pageSize={this.pageSize} total={this.total}/>
            </div>
        </div>);
    }
}