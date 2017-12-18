/**
 * Created by admin on 2017/10/24.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router';
import  * as ConstData from '../modules/constants/ConstData'
import {readBookChapterList, readBookChapterDetail, getReadBookChapterListAndStartRead} from '../actions/readAction'
import {message, Modal} from 'antd';
import './common/style/readpage.scss'

//阅读页面
class Read extends Component {
    constructor(props) {
        super(props);
        const docEl = document.body;
        docEl.style.background = '#d1d6be';
        this.data = this.props.location.state;
        this.type = this.data ? this.data.type : ConstData.DATA_INVAILD;
        this.bookId = this.data ? this.data.bookId : -1;
        this.bookName = this.data ? this.data.bookName : -1;
        this.state = {
            chapterUrl: "",
            title: "",
            leftToolBarTop: 40,
            rightToolbarBottom: 0,
            visible: false
        };
        this.showModal = () => {
            this.setState({
                visible: true,
            });
        };
        this.newHandleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        if (this.type == ConstData.DATA_INVAILD) {
            return;
        }
        //从第一章开始
        if (this.type == ConstData.READ_BOOK_START) {
            console.log("READ_BOOK_START:" + this.bookId)
            this.chapterIndex = 0;
            //加载章节列表并设置第一章节
            this.props.getReadBookChapterListAndStartRead(this.bookId);
        } else
        //根据特定章节开始
        if (this.type == ConstData.READ_BOOK_MIDDLE) {
            this.chapter = this.data ? this.data.chapter : {};
            this.chapterIndex = this.chapter.num;
            //加载章节
            this.props.getReadBookChapterDetail(this.chapter.chapterUrl, this.chapter.num, this.chapter.title);
            //加载章节列表
            this.props.getReadBookChapterList(this.bookId);
        }
        window.addEventListener('scroll', this.newHandleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.newHandleScroll);
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
                        <span>{this.bookName}</span>
                        <span className="current-chapter">{this.props.read.chapterTitle}</span>
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
                                    title: curChapter.title
                                });
                            }
                        }} title="上一章"/>
                        <a className="list" title="章节目录" onClick={this.showModal}/>
                        <a className="next" onClick={() => {
                            if (this.chapterIndex == this.props.read.totalChapter - 1) {
                                message.warning('Dear,往后没有章节了！！！');
                            } else {
                                let curChapter = this.props.read.bookChapterList[++this.chapterIndex];
                                this.props.getReadBookChapterDetail(curChapter.link, this.chapterIndex, curChapter.title);
                                this.setState({
                                    title: curChapter.title
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
        const {read} = this.props;
        return <div className="page-reader-wraper">
            {this.renderContentByDataState()}
            <Modal
                title="章节目录"
                footer={null}
                onClose={() => {
                    this.setState({
                        visible: false,
                    });
                }}
                bodyStyle={{maxHeight: 350, overflow: 'auto'}}
                visible={this.state.visible}>
                {read.bookChapterList.length > 0 ? read.bookChapterList.map((value, index) => {
                    let readable;
                    if (value.unreadble) {
                        //todo unreadable
                        readable = <span>lock</span>;
                    } else {
                        //todo readable
                        readable = null;
                    }
                    return <a key={index} onClick={() => {
                        this.chapterIndex = index;
                        this.props.getReadBookChapterDetail(value.link, index, value.title);
                        this.setState({
                            title: value.title
                        });
                        this.setState({
                            visible: false,
                        });
                    }}><p style={{margin: "10px 0px"}}>{value.title}{readable}</p>
                        <div style={{height: 1, backgroundColor: '#C2C2C2'}}/>
                    </a>;
                }) : null}
            </Modal>
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
    getReadBookChapterListAndStartRead: (id) => {
        dispatch(getReadBookChapterListAndStartRead(id))
    }, getReadBookChapterList: (id) => {
        dispatch(readBookChapterList(id))
    }, getReadBookChapterDetail: (chapterUrl, num, title) => {
        dispatch(readBookChapterDetail(chapterUrl, num, title))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Read);