/**
 * Created by golike on 2017/10/21.
 */
import React, {Component} from 'react'
import {is, fromJS} from 'immutable';

export default class NormalTopMenu extends Component {

    static defaultProps = {
        title: "请输入标题",
        tagsData: [],
        defaultIndex: 0,
        clickMenuItem: () => {
            console.log("clickMenuItem");
        }
    };

    constructor(props) {
        super(props);
        this.tagsData = this.props.tagsData;
        this.state = {
            currentSubIndex: -1,
            currentIndex: this.props.defaultIndex,
            tags: this.tagsData.length > 0 ? this.tagsData[0].tags : []
        };
    }

    componentWillReceiveProps(nextProps) {
        const {tagsData} = nextProps;
        if (tagsData != this.props.tagsData) {
            this.setState({currentIndex: 0, currentSubIndex: -1});
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
        this.setState({
            currentIndex: index,
            tags: value.tags
        });
    }

    _onSubPress(index, value) {
        if (!this.props.clickMenuItem)
            return;
        this.props.clickMenuItem(index, value);
        this.setState({
            currentSubIndex: index,
        });
    }

    render() {
        const {tagsData} = this.props;
        return (<div className="c-full-menu">
            <div className="sort">
                <div className="menu-title">筛选</div>
                <div className="sort-cells">
                    {tagsData.map((value, index) => {
                        return <span key={index} data-type={value.name} onClick={this._onPress.bind(this, index, value)}
                                     className={this.getItemCssClasses(index)}>{value.name}</span>;
                    })}
                </div>
                {this.state.currentIndex == 0 ? <div/> : <div className="sub-sort-cells">
                        <p style={{display: "block"}}>
                            <a>具体类型：</a>
                            {this.state.tags.map((value, index) => {
                                return <a key={index} className={this.getSubItemCssClasses(index)}
                                          onClick={this._onSubPress.bind(this, index, value)}>{value}</a>;
                            })}
                        </p>
                    </div>}
            </div>
        </div>);
    }
}