'use strict'
module.exports = {
    header: {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    },
    css: {
        fontSize: {
            appTitle: 18,
            title: 16,
            desc: 12
        },
        fontColor: {
            appMainColor: '#ee735c',
            title: '#333333',
            desc: '#999999',
            white: '#ffffff',
            author: '#cc9900'
        },
        color: {
            appBackground: '#ffffff',
            appMainColor: '#ee735c',
            appBlack: '#333333',
            line: '#e6e6e6',
            buttonColor: '#90C5F0',
            white: '#ffffff',
            black: '#000000'
        },
        boxColor: ['#90C5F0', '#91CED5', '#F88F55', '#C0AFD0', '#E78F8F', '#67CCB7', '#F6BC7E']
    },
    bookType: {
        'qt': '其他',
        'xhqh': '玄幻奇幻',
        'wxxx': '武侠仙侠',
        'dsyn': '都市异能',
        'lsjs': '历史军事',
        'yxjj': '游戏竞技',
        'khly': '科幻灵异',
        'cyjk': '穿越架空',
        'hmzc': '豪门总裁',
        'xdyq': '现代言情',
        'gdyq': '古代言情',
        'hxyq': '幻想言情',
        'dmtr': '耽美同人',
    },
    distillate: [
        {name: '全部', distillate: ''},
        {name: '精品', distillate: 'true'}
    ],
    discussionSort: [
        {name: '默认排序', sort: 'updated'},
        {name: '最新发布', sort: 'created'},
        {name: '最多评论', sort: 'comment-count'}
    ],
    reviewSort: [
        {name: '默认排序', sort: 'updated'},
        {name: '最新发布', sort: 'created'},
        {name: '最有用的', sort: 'helpful'},
        {name: '最多评论', sort: 'comment-count'},
    ],
    reviewBookType: [
        {name: '全部类型', type: 'all'},
        {name: '玄幻奇幻', type: 'xhqh'},
        {name: '武侠仙侠', type: 'wxxx'},
        {name: '都市异能', type: 'dsyn'},
        {name: '历史军事', type: 'lsjs'},
        {name: '游戏竞技', type: 'yxjj'},
        {name: '科幻灵异', type: 'khly'},
        {name: '穿越架空', type: 'cyjk'},
        {name: '豪门总裁', type: 'hmzc'},
        {name: '现代言情', type: 'xdyq'},
        {name: '古代言情', type: 'gdyq'},
        {name: '幻想言情', type: 'hxyq'},
        {name: '耽美同人', type: 'dmtr'},
    ],
    bookDetailSort: [
        {name: '默认排序', sort: 'updated'},
        {name: '最新发布', sort: 'created'},
        {name: '最多评论', sort: 'comment-count'},
    ],
    bookListTypes: [
        {title: "本周最热"}, {title: "最新发布"}, {title: "最多收藏"}
    ],
    bookListCategory: [
        {title: "男生", code: 'male'}, {title: "女生",code: 'female'}, {title: "出版物"}
    ],
    subCategory: [
        {name: '热门', code: 'hot',tags:[]},
        {name: '新书', code: 'new',tags:[]},
        {name: '好评', code: 'reputation',tags:[]},
        {name: '完结', code: 'over',tags:[]},
    ]
};