/**
 * Created by golike on 2017/9/28.
 */
import React, {Component} from 'react'
import {browserHistory} from 'react-router'
import {is, fromJS} from 'immutable';
import '../common/style/header.scss'

class Header extends Component {

    static defaultProps = {
        initValue: "",
        navData: [{text: "首 页", href: "/"}, {text: "精 选", href: "/selection"}, {text: "分 类", href: "/category"},
            {text: "书 单", href: "/booklist"}, {text: "排行榜", href: "/rank"}, {text: "客户端", href: "/download"}]
    };

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.initValue,
            currentIndex: 0
        };
    }

    componentDidMount() {
        this.unlisten = browserHistory.listen(location => {
            let dataIndex = this.props.navData.findIndex(function (value, index, arr) {
                return value.href == location.pathname;
            });
            //console.log(location.pathname+"--"+dataIndex);
            this.setState({currentIndex: dataIndex});
        })
    }

    componentWillUnmount() {
        //注销路由监听
        this.unlisten();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }

    onSearchText(event) {
        this.setState({
            value: event.target.value
        });
    }

    getItemCssClasses(index) {
        return index === this.state.currentIndex ? "nav-cell active" : "nav-cell";
    }


    render() {
        return (<div>
            <div className="c-full-top">
                <div className="container clearfix">
                    <div className="connection">
                        <div className="follow">
                            <a>+关注</a>
                            {/*<div className="qr-code follow-code">*/}
                            {/*<div className="arrow-top"></div>*/}
                            {/*<div className="block clearfix">*/}
                            {/*<div className="sub-block">*/}
                            {/*<img src="/images/qrcode/fuwuhao.png" alt="追书神器服务号"/>*/}
                            {/*<p>微信</p>*/}
                            {/*</div>*/}
                            {/*<div className="sub-block right">*/}
                            {/*<img src="/images/qrcode/weibo.png" alt="追书神器APP"/>*/}
                            {/*<p>微博</p>*/}
                            {/*</div>*/}
                            {/*</div>*/}
                            {/*</div>*/}
                        </div>
                        <span className="space">|</span>
                        <div className="service">
                            <a>联系客服</a>
                            {/*<div className="qr-code service-code">*/}
                            {/*<div className="arrow-top"></div>*/}
                            {/*<div className="block">*/}
                            {/*<div className="sub-block">*/}
                            {/*<img src="/images/qrcode/fuwuhao.png" alt="追书神器服务号"/>*/}
                            {/*<p>关注微信</p>*/}
                            {/*<p>可以联系客服妹子哦</p>*/}
                            {/*</div>*/}
                            {/*</div>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
            </div>
            <header className="c-full-header">
                <div className="brand">
                    <div className="container clearfix">
                        <a href="/"><img src={require('./images/icon/logo.png')} alt="追书神器" className="logo"/></a>
                        <div className="search">
                            <input onChange={this.onSearchText.bind(this)} className="search-input"
                                   value={this.state.value} type="text"
                                   placeholder="搜索书名或作者"/>
                            <a id="search-btn" className="search-btn" onClick={() => {
                                //todo 跳转到search
                                browserHistory.push({
                                    pathname: '/search',
                                    state: {
                                        text: this.state.value
                                    }
                                });
                            }}/>
                        </div>
                    </div>
                </div>
                <div className="nav">
                    <div className="container">
                        <ul className="nav-cells">
                            {this.props.navData.map((value, index) => {
                                return <li key={index} className={this.getItemCssClasses(index)}><a onClick={() => {
                                    browserHistory.push({
                                        pathname: value.href
                                    });
                                }}>{value.text}</a></li>;
                            })}
                        </ul>
                    </div>
                </div>
            </header>
        </div>);
    }
}

export default Header;