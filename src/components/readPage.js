/**
 * Created by admin on 2017/10/24.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {readBookChapterList, readBookChapterDetail} from '../actions/readAction'

//阅读页面
class Read extends Component {
    constructor(props) {
        super(props);
        let data = this.props.location.state;
        this.bookId = data ? this.props.location.query.bookId : -1;
        this.state = {
            chapterUrl: ""
        };
    }

    componentDidMount() {
    }


    render() {
        return <div className="page-detail-container">
        </div>;
    }
}


const mapStateToProps = (store) => {
    const {read} = store;
    return {
        read
    }
};

const mapDispatchToProps = (dispatch) => ({
    getReadBookChapterList: (id) => {
        dispatch(readBookChapterList(id))
    }, getReadBookChapterDetail: (chapterUrl,num,title) => {
        dispatch(readBookChapterDetail(chapterUrl,num,title))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Read);