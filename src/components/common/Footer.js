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
    <footer>
        <div className="friend-link">友情链接:{shipReleteURL.map((value, index) => {
            return <a key={index} href={value.url} target="_blank" rel="nofollow" title={value.title}>
                <img src={value.icon} alt={value.title}/></a>;
        })}
        </div>
        <div>
            <div className="footer-left">
                <div className="info">
                    <a href="#">客户端<span>|</span></a>
                    <a href="#">关于我们<span>|</span></a>
                    <a href="#">联系我们<span>|</span></a>
                    <a href="#">加入我们<span>|</span></a>
                </div>
                <div className="copyRight">
                    <a href="#">客户端<span>|</span></a>
                    <a href="#">关于我们<span>|</span></a>
                    <a href="#">联系我们<span>|</span></a>
                    <a href="#">加入我们<span>|</span></a>
                </div>
            </div>
            <div className="footer-right">
                <div className="public"></div>
                <div className="verticaleLine"></div>
                <div className="text"></div>
            </div>
        </div>
    </footer>
);

const styles = {
    c_full_footer: {
        display: 'flex',
        minWidth: 1200, width: '100 %',
        padding: '12px 0 20px'
    }
};


export default Footer;