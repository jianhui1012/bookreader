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
            <div>
                <div className="c-full-sideBar">
                    <LeftMenu defaultIndex={0} clickMenuItem={(item) => {
                        // href="/ranking/54d42d92321052167dfb75e3?type=male"
                        this.setState({currentId: item._id})
                    }} title={"男生"} menuData={ranking.male}/>
                    <LeftMenu defaultIndex={-1} clickMenuItem={(item) => {
                        this.setState({currentId: item._id})
                    }} title={"女生"} menuData={ranking.female}/>
                </div>
            </div>
            {/*内容显示区*/}
            <div>
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