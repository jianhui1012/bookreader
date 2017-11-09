/**
 * Created by admin on 2017/11/9.
 */
import React, {Component} from 'react'
//import about connect package
import {connect} from 'react-redux';
import {discoverBookListTag, discoverBookListDetail} from '../actions/booklistAction'
//加载CSS
import  './common/style/leftmenu.scss'
import './common/style/rankingpage.scss'
//加载antd
import {BackTop} from 'antd';
//加载组件
import LeftMenu from './common/component-module/LeftMenu'
import TopMenu from './common/component-module/TopMenu'
import BookList from './common/component-module/BookList'

//书单页面
class BookListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMaleOther: false,
            showFemaleOther: false,
            currentId: "",
            type: "",
            currentRank: {}
        }
    }

    componentDidMount() {
        this.props.getRanking();
    }

    renderStatus(status) {
        //const {ranking} = this.props;
        let content = <div/>;
        if (!status) {
            content = <BookList bookListData={this.props.ranking.chartsDetailBooks}/>;
        } else {
            content = <div className="content">加载中...</div>;
        }
        return <div className="content">
            <div className="title">
                {this.state.currentRank.title}
            </div>
            <TopMenu clickMenuItem={(index, item, id) => {

            }} />
            {content}
        </div>;
    }


    render() {
        const {ranking} = this.props;
        return <section className="page-ranking">
            <BackTop/>
            <section className="container">
                {/*左侧菜单*/}
                <div className="c-full-sideBar">
                    <LeftMenu  />
                </div>
                {/*内容显示区*/}
                {this.renderStatus(ranking.isLoadingDetail)}
            </section>
        </section>;
    }
}

const mapStateToProps = (store) => {
    const {booklist} = store;
    return {
        booklist
    }
};

const mapDispatchToProps = (dispatch) => ({
    getDiscoverBookListDetail: (params) => {
        dispatch(discoverBookListDetail(params))
    }, getDiscoverBookListTag: () => {
        dispatch(discoverBookListTag())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(BookListComponent);