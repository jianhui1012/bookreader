/**
 * Created by admin on 2017/10/19.
 */
import React, {Component} from 'react'
import {is, fromJS} from 'immutable';

export  default class LeftMenu extends Component {

    static defaultProps = {
        title: "请输入标题",
        menuData: [],
        defaultIndex: 0,
        clickMenuItem: ()=>{
            console.log("clickMenuItem");
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            currentIndex: this.props.defaultIndex
        }
    }


    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }

    getItemCssClasses(index) {
        return index === this.state.currentIndex ? "item active" : "item";
    }


    _onPress(index,value) {
        if(!this.props.clickMenuItem)
            return;
        this.props.clickMenuItem(index,value);
        this.setState({currentIndex: index});
    }

    render() {
        const {title, menuData}=this.props;
        return (<div className="sub-sideBar">
            <div className="title">{title}</div>
            {menuData.map((value, index) => {
                if(!value)
                    return;
                return <a key={index} onClick={this._onPress.bind(this,index,value)}
                          className={this.getItemCssClasses(index)}>
                    <span>{value.title}</span>
                </a>;
            })}
        </div>);
    }
}