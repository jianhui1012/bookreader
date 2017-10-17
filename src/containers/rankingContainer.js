/**
 * Created by golike on 2017/10/15.
 */
import { connect } from 'react-redux';
import Ranking from '../components/rankingPage';

const mapStateToProps = (state) => ({
    male: state.getIn(['male', 'male']),
    maleOther: state.getIn(['maleOther', 'maleOther']),
    female: state.getIn(['female', 'female']),
    femaleOther: state.getIn(['femaleOther', 'femaleOther'])
});

const mapDispatchToProps = (dispatch) => ({
    onClickRanking: (id) => (
        dispatch()
    ),
});

export default connect(mapStateToProps,mapDispatchToProps)(Ranking);
