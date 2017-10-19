/**
 * Created by golike on 2017/10/15.
 */
import React, {Component} from 'react'
//import about connect package
import {connect} from 'react-redux';
import {ranking, rankingList} from '../actions/rankingAction'
//加载CSS
import  './common/style/leftmenu.scss'
//加载组件
import LeftMenu from './common/component-module/LeftMenu'


class Ranking extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showMaleOther: false,
            showFemaleOther: false,
            currentId: "",
            type: "",

        }
    }

    componentDidMount() {
        const {getRanking} = this.props;
        getRanking();
    }

    renderStatus(status) {
        switch (status) {
            case 0:
                break;
            case 1:
                break;
            case 2:
                break;
        }

    }

    render() {
        const {ranking} = this.props;
        return <div>
            {/*左侧菜单*/}
                <div className="c-full-sideBar">
                    <LeftMenu defaultIndex={0} clickMenuItem={(item) => {
                        // href="/ranking/54d42d92321052167dfb75e3?type=male"
                        this.setState({currentId: item._id})
                    }} titles={["男生","女生"] } menuData={ranking.male.concat(ranking.female)}/>
                </div>
            {/*内容显示区*/}
                <div className="content">
                    <div className="title">
                        {"本周潜力榜"}
                    </div>
                    <div className="c-full-menu">
                        <div className="sort sort-male hide">
                            <div className="menu-title">筛选</div>
                            <div className="sort-cells">
                                <a href="/ranking/582ed5fc93b7e855163e707d?type=collapseMale" className="sort-cell ">圣诞热搜榜</a>
                            </div>
                        </div>
                        <div className="sort sort-female hide">
                            <div className="menu-title">筛选</div>
                            <div className="sort-cells">
                                <a href="/ranking/582fb5c412a401a20ea50275?type=collapseFemale" className="sort-cell ">圣诞热搜榜</a>
                            </div>
                        </div>
                        <div className="more-sort ">
                            <div className="menu-title">更多筛选</div>
                            <div className="more-cells">
                                <a href="/ranking/54d42e72d9de23382e6877fb?type=male" className="more-cell active">{"周榜"}</a>
                                <a href="/ranking/564eee3ea82e3ada6f14b195?type=male" className="more-cell ">月榜</a>
                                <a href="/ranking/564eeeabed24953671f2a577?type=male" className="more-cell ">总榜</a>
                            </div>
                        </div>
                    </div>
                    <div className="books-list">
                        <a href="/book/57cec0a2e1b21b436bc08939" className="book" target="_blank">
                            <img src="http://statics.zhuishushenqi.com/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F1468701%2F_1468701_384865.jpg%2F" alt="无敌血脉" className="cover"/>
                            <div className="right">
                                <h4 className="name"><span>无敌血脉</span></h4>
                                <p className="author">
                                    <span>逍遥寰宇</span>
                                </p>
                                <p className="desc"> </p>
                                <p className="popularity">
                                    <span className="c-red">1.11 万</span>人气
                                    <span className="split">|</span>
                                    <span className="c-red">43.24%</span>读者留存
                                </p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>;
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
    clickLeftRanking: (id) => {
        dispatch(rankingList(id))
    }, getRanking: () => {
        dispatch(ranking())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);