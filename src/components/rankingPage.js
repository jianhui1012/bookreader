/**
 * Created by golike on 2017/10/15.
 */
import React, {Component} from 'react'

class Ranking extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { value, clickLeftRanking } = this.props;
        return <div>
            <button onClick={clickLeftRanking}></button>
        </div>;
    }
}

export default Ranking