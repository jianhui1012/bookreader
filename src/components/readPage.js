/**
 * Created by admin on 2017/10/24.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import  * as ConstData from '../modules/constants/ConstData'
import {readBookChapterList, readBookChapterDetail} from '../actions/readAction'
import './common/style/readpage.scss'

//阅读页面
class Read extends Component {
    constructor(props) {
        super(props);
        let data = this.props.location.state;
        console.log(JSON.stringify(data));
        this.bookId = data ? data.bookId : -1;
        this.chapter = data ? data.chapter : {};
        this.state = {
            chapterUrl: "",
        };
    }

    componentDidMount() {
        if (this.bookId == -1) {
            return;
        }
        // //加载章节
        // this.props.getReadBookChapterDetail(this.chapter.chapterUrl, this.chapter.num, this.chapter.title);
        // //加载章节列表
        // this.props.getReadBookChapterList(this.bookId);
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
                renderContent = <div id="J_content">
                    <h4 className="title clearfix">
                        <span>{}</span>
                        <span className="current-chapter">{}</span>
                    </h4>
                    <div className="content">
                        <input type="hidden" id="J_vip" name="" value="false"/>
                        <div className="inner-text">
                            {}
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