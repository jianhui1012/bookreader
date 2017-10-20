/**
 * Created by golike on 2017/9/28.
 */
import React from "react";
import './style/footer.scss';
const shipReleteURL = [{
    title: "寒武纪年原创网",
    icon: 'http://www.zhuishushenqi.com/images/friend/hwjn.png',
    url: 'http://www.hanwujinian.com'
}, {
    title: "华文小说网",
    icon: 'http://www.zhuishushenqi.com/images/friend/huawen.jpg',
    url: 'http://www.hwxsw.com'
}, {
    title: "北京掌趣科技股份有限公司",
    icon: 'http://www.zhuishushenqi.com/images/friend/zq.png',
    url: 'http://lwcs.0708.com/t2/176/3668.html'
}];
// 开始建设 Component 并使用 connect 进来的 props 并绑定事件（onChange、onClick）。注意我们的 state 因为是使用 `ImmutableJS` 所以要用 `get()` 取值
const Footer = () => (
    <footer className="c-full-footer">
        <div className="container">
            <div className="friend-link">
                <span>友情链接:</span>
                {shipReleteURL.map((value, index) => {
                    return <a key={index} href={value.url} target="_blank" rel="nofollow" title={value.title}>
                        <img src={value.icon} alt={value.title}/></a>;
                })}         
            </div>
            <div className="foot clearfix">
                <div className="footer-left">
                    <div className="info">
                        <a href="/download" target="_blank">客户端</a>
                        <span>|</span>
                        <a href="/about?type=aboutUs">关于我们</a>
                        <span>|</span>
                        <a href="/about?type=callUs">联系我们</a>
                        <span>|</span>
                        <a href="/about?type=joinUs">加入我们</a>
                    </div>
                    <div className="copyRight">
                        <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31011202006103">
                            {/*<img src="/images/icon/recordIcon.png" style="float:left;"/>*/}
                                <p>
                                    {"沪公网安备 31011202006103号"}
                                </p>
                        </a>
                    </div>
                </div>
                <div className="footer-right">
                    <div className="public">
                        <div className="weibo">
                            <div id="footer-weibo" className="icon icon-weibo"></div>
                            <div className="qr-code weibo-code">
                                <div className="arrow-bottom"></div>
                                <div className="block">
                                    <div className="sub-block">
                                        {/*<img src="/images/qrcode/weibo.png" alt="追书神器微博"/>*/}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="weixin">
                            <div className="icon icon-weixin"></div>
                            <div className="qr-code weixin-code">
                                <div className="arrow-bottom"></div>
                                <div className="block">
                                    <div className="sub-block">
                                        {/*<img src="/images/qrcode/fuwuhao.png" alt="追书神器服务号"/>*/}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="verticaleLine"></div>
                    <div className="text">
                        <p>关注追书微信公众号，可以</p>
                        <p>随时和我们反馈交流哦</p>
                    </div>
                </div>
            </div>
            <div  className="top0">
                <span className="arrow-top"/>
                <p>顶部</p>
            </div>
        </div>
    </footer>
);

export default Footer;