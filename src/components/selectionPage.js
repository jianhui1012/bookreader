/**
 * Created by admin on 2017/11/8.
 */
import React, {Component} from 'react'
//import about connect package
import {connect} from 'react-redux';
import {discoverMenuList, discoverBookDetail} from '../actions/selectionAction'
//加载CSS
import  './common/style/leftmenu.scss'
import './common/style/rankingpage.scss'
//加载antd
import {BackTop} from 'antd';
//加载组件
import NormalLeftMenu from './common/component-module/NormalLeftMenu'
import BookList from './common/component-module/BookList'

//排行榜页面
class Selection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "本周热推"
        }
    }

    componentDidMount() {
        this.props.getDiscoverMenuList();
    }

    renderStatus(status) {
        let content = <div/>;
        if (!status) {
            content = <BookList bookListData={this.props.selection.bookList}/>;
        } else {
            content = <div className="content">加载中...</div>;
        }
        return <div className="content">
            <div className="title">
                {this.state.title}
            </div>
            {content}
        </div>;
    }


    render() {
        const {selection} = this.props;
        return <section className="page-ranking">
            <BackTop/>
            <section className="container">
                {/*左侧菜单*/}
                <div className="c-full-sideBar">
                    <NormalLeftMenu  clickMenuItem={(index, item) => {
                        this.props.getDiscoverBookDetail(item._id);
                        this.setState({title: item.title})
                    }}   menuData={this.props.selection.nodes}  />
                </div>
                {/*内容显示区*/}
                {this.renderStatus(selection.selectionState)}
            </section>
        </section>;
    }
}

const mapStateToProps = (store) => {
    const {selection} = store;
    return {
        selection
    }
};

const mapDispatchToProps = (dispatch) => ({
    getDiscoverBookDetail: (id) => {
        dispatch(discoverBookDetail(id))
    }, getDiscoverMenuList: () => {
        dispatch(discoverMenuList())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Selection);