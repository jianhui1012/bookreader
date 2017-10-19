/**
 * Created by admin on 2017/10/19.
 */
import React, {Component} from 'react'
import {is, fromJS} from 'immutable';
// import '../style/leftmenu.scss'

export default class LeftMenu extends Component {

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
        const {titles, menuData}=this.props;
        return (<div className="sub-sideBar">
            <div className="title">{titles[0]}</div>
            {menuData.map((value, index) => {
                if(!value)
                    return;
                if(index>=5)
                     return;
                return <a key={index} onClick={this._onPress.bind(this,index,value)}
                          className={this.getItemCssClasses(index)}>
                    <span>{value.title}</span>
                </a>;
            })}
            <div className="title">{titles[1]}</div>
            {menuData.map((value, index) => {
                if(!value)
                    return;
                if(index<5)
                    return;
                return <a key={index} onClick={this._onPress.bind(this,index,value)}
                          className={this.getItemCssClasses(index)}>
                    <span>{value.title}</span>
                </a>;
            })}
        </div>);
    }
}