/**
 * Created by golike on 2017/10/15.
 */
import React, {Component} from 'react'
//import about connect package
import {connect} from 'react-redux';
import {ranking, rankingList} from '../actions/rankingAction'
//加载CSS
import  './common/style/leftmenu.scss'
import './common/style/rankingpage.scss'
//加载antd
import {BackTop} from 'antd';
//加载组件
import LeftMenu from './common/component-module/LeftMenu'
import TopMenu from './common/component-module/TopMenu'
import BookList from './common/component-module/BookList'

//排行榜页面
class Ranking extends Component {
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
        //开始获取排行榜详情数据
        this.props.getRankingList("54d42d92321052167dfb75e3");
        this.setState({
            currentRank: {
                "_id": "54d42d92321052167dfb75e3",
                "title": "追书最热榜 Top100",
                "cover": "/ranking-cover/142319144267827",
                "collapse": false,
                "monthRank": "564d820bc319238a644fb408",
                "totalRank": "564d8494fe996c25652644d2",
                "shortTitle": "最热榜"
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        const {ranking, isLoadingDetail} = nextProps;
        if (ranking.male.length > 0 && !isLoadingDetail) {
        }
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
                this.props.getRankingList(id);
            }} rankData={this.state.currentRank}/>
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
                    <LeftMenu defaultIndex={0} clickMenuItem={(index, item) => {
                        // href="/ranking/54d42d92321052167dfb75e3?type=male"
                        this.props.getRankingList(item._id);
                        this.setState({currentRank: item})
                    }} titles={["男生", "女生"] } menuData={ranking.male.concat(ranking.female)}/>
                </div>
                {/*内容显示区*/}
                {this.renderStatus(ranking.isLoadingDetail)}
            </section>
        </section>;
    }
}

const mapStateToProps = (store) => {
    const {ranking} = store;
    // console.log("rank:" + JSON.stringify(ranking));
    return {
        ranking
    }
};

const mapDispatchToProps = (dispatch) => ({
    getRankingList: (id) => {
        dispatch(rankingList(id))
    }, getRanking: () => {
        dispatch(ranking())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);