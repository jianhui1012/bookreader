/**
 * Created by golike on 2017/9/28.
 */
import {connect} from "react-redux";
import TodoHeader from "../components/TodoHeader";
//将被使用的actions 导入
import {changeText, createTodo} from "../actions";

export default connect(
    (state) => ({
        todo: state.getIn(['todo'])
    }),
    (dispatch) => ({
        onChangeText: (event) => (
            dispatch(changeText({ text: event.target.value }))
        ),
        onCreateTodo: () => {
            dispatch(createTodo());
            dispatch(changeText({ text: '' }));
        }
    })
)(TodoHeader);
