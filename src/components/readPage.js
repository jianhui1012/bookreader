/**
 * Created by admin on 2017/10/24.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router';
import  * as ConstData from '../modules/constants/ConstData'
import {readBookChapterList, readBookChapterDetail} from '../actions/readAction'
import { message } from 'antd';
import './common/style/readpage.scss'

//阅读页面
class Read extends Component {
    constructor(props) {
        super(props);
        const docEl = document.body;
        docEl.style.background = '#d1d6be';
        let data = this.props.location.state;
        console.log(JSON.stringify(data));
        this.bookId = data ? data.bookId : -1;
        this.chapter = data ? data.chapter : {};
        this.chapterIndex = this.chapter.num;
        this.state = {
            chapterUrl: "",
            title:this.chapter.title,
            leftToolBarTop: 40,
            rightToolbarBottom: 0,
        };
    }

    componentDidMount() {
        if (this.bookId == -1) {
            return;
        }
        // //加载章节
        this.props.getReadBookChapterDetail(this.chapter.chapterUrl, this.chapter.num, this.chapter.title);
        // //加载章节列表
        this.props.getReadBookChapterList(this.bookId);
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }


    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll.bind(this));
    }

    handleScroll(e) {
        //console.log(e);
        let scrollEle = e.target.scrollingElement;
        const clientHeight = scrollEle.clientHeight;
        let t = scrollEle.scrollTop;
        let c = this.refs.content;
        let top = t <= 40 ? 40 - t : 0;
        //let bottom = t >= c.height + c.offsetTop - clientHeight ? 40 : 0;
        //console.log(t + "--" + c.height + "--" + c.offsetTop + "--" + clientHeight);
        this.setState({
            leftToolBarTop: top,
            //rightToolbarBottom: bottom
        });
    }

    renderContentByDataState() {
        let dataSt = this.props.read.dataState;
        let renderContent = <div/>;
        switch (dataSt) {
            case ConstData.DATA_EMPTY:
                renderContent = <div>数据为空</div>;
                break;
            case ConstData.DATA_LOADING:
                renderContent = <div>加载中</div>;
                break;
            case ConstData.DATA_SUCCESS:
                renderContent = <div>
                    <h4 className="title">
                        <span>{this.chapter.bookName}</span>
                        <span className="current-chapter">{this.state.title}</span>
                    </h4>
                    <div className="left-toolbar" style={{top: this.state.leftToolBarTop}}>
                        <a className="home" href="/" title="首页"/>
                        <a className="detail" onClick={() => {
                            browserHistory.goBack();
                        }} title="返回详情页"/>
                        <a className="download" href="/download" title="下载"/>
                    </div>
                    <div className="right-toolbar" style={{bottom: this.state.rightToolbarBottom}}>
                        <a className="prev" onClick={() => {
                            if (this.chapterIndex == 0) {
                                message.warning('Hi,往前没有章节了！！！');
                            } else if (this.chapterIndex > 0) {
                                let curChapter = this.props.read.bookChapterList[--this.chapterIndex];
                                this.props.getReadBookChapterDetail(curChapter.link, this.chapterIndex, curChapter.title);
                                this.setState({
                                    title:curChapter.title
                                });
                            }
                        }} title="上一章"/>
                        <a className="list" title="章节目录"/>
                        <a className="next" onClick={() => {
                            if (this.chapterIndex == this.props.read.totalChapter-1) {
                                message.warning('Dear,往后没有章节了！！！');
                            } else {
                                let curChapter = this.props.read.bookChapterList[++this.chapterIndex];
                                this.props.getReadBookChapterDetail(curChapter.link, this.chapterIndex, curChapter.title);
                                this.setState({
                                    title:curChapter.title
                                });
                            }
                        }} title="下一章"/>
                    </div>
                    <div ref="content" className="content">
                        <input type="hidden" id="J_vip" name="" value="false"/>
                        <div className="inner-text" dangerouslySetInnerHTML={{__html: this.props.read.chapterDetail}}>
                        </div>
                    </div>
                </div>;
                break;
            case ConstData.DATA_FAILURE:
                break;
            case ConstData.NET_FAILURE:
                break;
            default:
                renderContent = <div>默认情况</div>;
                break
        }
        return renderContent;
    }

    render() {
        return <div className="page-reader-wraper">
            {this.renderContentByDataState()}
        </div>;
    }
}


const mapStateToProps = (store) => {
    const {read} = store;
    return {
        read
    }
};

const mapDispatchToProps = (dispatch) => ({
    getReadBookChapterList: (id) => {
        dispatch(readBookChapterList(id))
    }, getReadBookChapterDetail: (chapterUrl, num, title) => {
        dispatch(readBookChapterDetail(chapterUrl, num, title))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Read);