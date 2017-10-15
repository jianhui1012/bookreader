/**
 * Created by golike on 2017/9/26.
 */
import Immutable from 'immutable';

export const TodoState=Immutable.fromJS({
    'todos':[],
    'todo':{
        id:'',
        text:'',
        updatedAt:'',
        completed:false
    }
});