/**
 * Created by golike on 2017/9/28.
 */
import React from "react";

const Header = () => (
    <div style={styles.c_full_top}>
            <a>+关注</a>
            <div style={styles.verticaleLine}> | </div>
            <a>联系客服</a>
    </div>
);

const styles = {
    c_full_top: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems:'center',
        minWidth: 1200, height: 40, background: '#f2f2f2'
    },verticaleLine:{
            margin:2
    }
};

export default Header;