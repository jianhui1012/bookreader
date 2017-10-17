/**
 * Created by golike on 2017/10/15.
 */
import {connect} from 'react-redux';
import Ranking from '../components/rankingPage';
import {ranking, rankingList} from '../actions/rankingAction'

const mapStateToProps = (state) => {return {state} };

const mapDispatchToProps = (dispatch) => ({
    clickLeftRanking:(id)=>{
        dispatch(rankingList(id))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
