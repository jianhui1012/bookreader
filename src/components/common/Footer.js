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
                <a href="http://www.hanwujinian.com" target="_blank" rel="nofollow" title="寒武纪年原创网"><img
                    src="http://www.zhuishushenqi.com/images/friend/hwjn.png" alt="寒武纪年原创网"/></a>
                <a href="http://lwcs.0708.com/t2/176/3668.html" target="_blank" rel="nofollow" title="北京掌趣科技股份有限公司"><img
                    src="http://www.zhuishushenqi.com/images/friend/zq.png" alt="北京掌趣科技股份有限公司"/></a>
                <a href="http://www.2cloo.com" target="_blank" rel="nofollow" title="二层楼书院"><img
                    src="http://www.zhuishushenqi.com/images/friend/ecl.jpg" alt="二层楼书院"/></a>
                <a href="http://www.anyew.cn" target="_blank" rel="nofollow" title="暗夜文学"><img
                    src="http://www.zhuishushenqi.com/images/friend/ay.jpg" alt="暗夜文学"/></a>
                <a href="http://www.yidianling.com" target="_blank" rel="nofollow" title="壹点灵"><img
                    src="http://www.zhuishushenqi.com/images/friend/yidianling.png" alt="壹点灵"/></a>
            </div>
            {/*<div className="friend-link">*/}
            {/*<span>友情链接:</span>*/}
            {/*{shipReleteURL.map((value, index) => {*/}
            {/*return <a key={index} href={value.url} target="_blank" rel="nofollow" title={value.title}>*/}
            {/*<img src={value.icon} alt={value.title}/></a>;*/}
            {/*})}         */}
            {/*</div>*/}
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
                        <a target="_blank">
                            <p>
                                {"沪公网安备 31011202006103号"}
                            </p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;