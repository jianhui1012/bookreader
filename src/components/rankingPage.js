/**
 * Created by golike on 2017/10/15.
 */
import React, {Component} from 'react'
//import about connect package
import {connect} from 'react-redux';
import {ranking, rankingList} from '../actions/rankingAction'

class Ranking extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showMaleOther: false,
            showFemaleOther: false
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
        const {ranking, clickLeftRanking} = this.props;
        console.log(JSON.stringify(ranking));
        return <div>
            {/*左侧菜单*/}
            <div>
                {/*<div>*/}
                    {/*{ ranking.male.map((value, index) => {*/}
                        {/*return <a key={index}>{value.title}</a>;*/}
                    {/*})}*/}
                {/*</div>*/}
                {/*<div style={{height: 10}}></div>*/}
                {/*<div>*/}
                    {/*{ ranking.female.map((value, index) => {*/}
                        {/*return <a key={index}>{value.title}</a>;*/}
                    {/*})}*/}
                {/*</div>*/}

            </div>
            {/*内容显示区*/}
            <div>

            </div>
        </div>;
    }
}

const mapStateToProps = (store) => {
    const {ranking} = store;
    return {
        ranking
    }
};

const mapDispatchToProps = (dispatch) => ({
    clickLeftRanking: (id) => {
        dispatch(rankingList(id))
    },getRanking:()=>{
        dispatch(ranking())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);