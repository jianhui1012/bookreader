/**
 * Created by golike on 2017/9/28.
 */
import React from 'react';


// 开始建设 Component 并使用 connect 进来的 props 并绑定事件（onChange、onClick）。注意我们的 state 因为是使用 `ImmutableJS` 所以要用 `get()` 取值
const TodoHeader = ({
                        onChangeText,
                        onCreateTodo,
                        todo,
                    }) => (
    <div>
        <h1>TodoHeader</h1>
        <input type="text" value={todo.get('text')} onChange={onChangeText} />
        <button onClick={onCreateTodo}>送出</button>
    </div>
);

export default TodoHeader;