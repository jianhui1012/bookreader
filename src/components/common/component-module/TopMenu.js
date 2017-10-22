/**
 * Created by golike on 2017/10/21.
 */
import React, {Component} from 'react'
import {is, fromJS} from 'immutable';

export default class TopMenu extends Component {

    static defaultProps = {
        title: "请输入标题",
        rankData: {},
        defaultIndex: 1,
        clickMenuItem: () => {
            console.log("clickMenuItem");
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            currentIndex: this.props.defaultIndex
        }
    }

    componentWillReceiveProps(nextProps) {
        const {rankData} = nextProps;
        if (rankData!=this.props.rankData) {
            this.setState({currentIndex: 1});
        }
    }


    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }

    getItemCssClasses(index) {
        return index === this.state.currentIndex ? "more-cell active" : "more-cell";
    }


    _onPress(index, value) {
        if (!this.props.clickMenuItem)
            return;
        if (index == 1) {
            this.props.clickMenuItem(index, value,value._id);
        } else if (index == 2) {
            this.props.clickMenuItem(index, value,value.monthRank);
        } else if (index == 3) {
            this.props.clickMenuItem(index, value,value.totalRank);
        }
        this.setState({currentIndex: index});
    }

    render() {
        const {rankData} = this.props;
        //console.log(JSON.stringify(rankData));
        return (<div className="c-full-menu">
            {/*<div className="sort sort-male hide">*/}
            {/*<div className="menu-title">筛选</div>*/}
            {/*<div className="sort-cells">*/}
            {/*<a href="/ranking/582ed5fc93b7e855163e707d?type=collapseMale" className="sort-cell ">圣诞热搜榜</a>*/}
            {/*</div>*/}
            {/*</div>*/}
            {/*<div className="sort sort-female hide">*/}
            {/*<div className="menu-title">筛选</div>*/}
            {/*<div className="sort-cells">*/}
            {/*<a href="/ranking/582fb5c412a401a20ea50275?type=collapseFemale" className="sort-cell ">圣诞热搜榜</a>*/}
            {/*</div>*/}
            {/*</div>*/}
            <div className="more-sort ">
                <div className="menu-title">更多筛选</div>
                <div className="more-cells">
                    <a onClick={this._onPress.bind(this, 1, rankData)} className={this.getItemCssClasses(1)}>周榜</a>
                    <a onClick={this._onPress.bind(this, 2, rankData)} className={this.getItemCssClasses(2)}>月榜</a>
                    <a onClick={this._onPress.bind(this, 3, rankData)} className={this.getItemCssClasses(3)}>总榜</a>
                </div>
            </div>
        </div>);
    }
}