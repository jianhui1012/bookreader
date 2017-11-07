/**
 * Created by golike on 2017/9/28.
 */
import React, {Component} from 'react'
import {browserHistory} from 'react-router'
import '../common/style/header.scss'

class Header extends Component {

    static defaultProps = {
        initValue: "",
    };

    constructor(props) {
        super(props);
        this.state = {value: this.props.initValue};
    }

    onSearchText(event) {
        this.setState({
            value: event.target.value
        });
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
                            <a id="search-btn" className="search-btn" onClick={()=>{
                                //todo 跳转到search
                                browserHistory.push({
                                    pathname: '/search',
                                    state: {
                                        text:this.state.value
                                    }
                                });
                            }}/>
                        </div>
                    </div>
                </div>
                <div className="nav">
                    <div className="container">
                        <ul className="nav-cells">
                            <li className="nav-cell "><a href="/">首 页</a></li>
                            <li className="nav-cell "><a href="/selection/bzrt">精 选</a></li>
                            <li className="nav-cell "><a href="/category">分 类</a></li>
                            <li className="nav-cell "><a href="/booklist">书 单</a></li>
                            <li className="nav-cell active"><a href="/rank">排行榜</a></li>
                            <li id="nav-client" className="nav-cell">
                                <a href="/download" target="_blank">客户端
                                    <i className="icon icon-phone"/>
                                </a>
                                {/*<div className="qr-code">*/}
                                {/*<h3 className="title">移动设备阅读</h3>*/}
                                {/*<div className="block clearfix">*/}
                                {/*<div className="sub-block">*/}
                                {/*/!*<img src="/images/qrcode/fuwuhao.png" alt="追书神器服务号"/>*!/*/}
                                {/*<p>服务号</p>*/}
                                {/*</div>*/}
                                {/*<div className="sub-block">*/}
                                {/*/!*<img src="/images/qrcode/download.png" alt="追书神器APP"/>*!/*/}
                                {/*<p>客户端</p>*/}
                                {/*</div>*/}
                                {/*</div>*/}
                                {/*</div>*/}
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
        </div>);
    }
}

export default Header;