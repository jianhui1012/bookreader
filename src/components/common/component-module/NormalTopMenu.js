/**
 * Created by golike on 2017/10/21.
 */
import React, {Component} from 'react'
import {is, fromJS} from 'immutable';

export default class NormalTopMenu extends Component {

    static defaultProps = {
        title: "筛选",
        tagsData: [],
        defaultIndex: 0,
        AllMenuItem: () => {
            console.log("clickMenuItem");
        },
        subClickMenuItem: () => {
            console.log("subClickMenuItem");
        }, ClickMenuItem: () => {
        }

    };

    constructor(props) {
        super(props);
        this.tagsData = this.props.tagsData;
        this.state = {
            currentSubIndex: this.props.defaultIndex,
            currentIndex: 0,
            tags: this.tagsData.length > 0 ? this.tagsData[0].tags : []
        };
    }

    componentWillReceiveProps(nextProps) {
        const {tagsData} = nextProps;
        if (tagsData != this.props.tagsData) {
            this.setState({currentIndex: this.props.defaultIndex, tags: tagsData.length > 0 ? tagsData[0].tags : [], currentSubIndex: this.props.defaultIndex});
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }

    getItemCssClasses(index) {
        return index === this.state.currentIndex ? "sort-cell active" : "sort-cell";
    }

    getSubItemCssClasses(index) {
        return index === this.state.currentSubIndex ? "sub-sort-cell active" : "sub-sort-cell";
    }

    _onPress(index, value) {
        if (index === this.state.currentIndex)
            return;
        if (value.name === "全部") {
            this.props.AllMenuItem(index, value);
            this.setState({
                currentIndex: index,
                tags: value.tags,
                currentSubIndex:this.props.defaultIndex
            });
            return;
        }
        this.props.ClickMenuItem(index, value);
        this.setState({
            currentIndex: index,
            tags: value.tags,
            currentSubIndex:this.props.defaultIndex
        });
    }

    _onSubPress(index, value) {
        if (index === this.state.currentSubIndex)
            return;
        this.props.subClickMenuItem(index, value);
        this.setState({
            currentSubIndex: index
        });
    }

    getSubContent() {
        let content = <div/>;
        if (this.state.tags.length > 0)
            content = <div className="sub-sort-cells">
                <p style={{display: "block"}}>
                    <a>具体类型：</a>
                    {this.state.tags.map((value, index) => {
                        return <a key={index} className={this.getSubItemCssClasses(index)}
                                  onClick={this._onSubPress.bind(this, index, value)}>{value}</a>;
                    })}
                </p>
            </div>;
        return content;
    }

    render() {
        const {tagsData, title} = this.props;
        return (<div className="c-full-menu">
            <div className="sort">
                <div className="menu-title">{title}</div>
                <div className="sort-cells">
                    {tagsData.map((value, index) => {
                        return <span key={index} data-type={value.name} onClick={this._onPress.bind(this, index, value)}
                                     className={this.getItemCssClasses(index)}>{value.name}</span>;
                    })}
                </div>
                {this.getSubContent()}
            </div>
        </div>);
    }
}