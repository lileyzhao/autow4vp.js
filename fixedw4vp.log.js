//如果要保证fixed&absolute在PC浏览器中也基于居中的body显示，请使用margin-left、margin-right代替margin
(function (doc, win) {
    var selfEl = doc.querySelector('script[vww]'),
        metaEl = doc.querySelector('meta[name="viewport"]'),
        docEl = doc.documentElement,
        _vww = selfEl ? selfEl.getAttribute('vww') : 0,
        vww = /^[1-9]+[0-9]*]*$/.test(_vww) ? parseInt(_vww) : 750, // 如html标签vww属性未设置，则默认750
        headEl = doc.querySelector('head'),
        vwctt = 'user-scalable=no';

    console.log('设计稿尺寸宽度:', vww);

    if (!metaEl) { // 如果viewport meta不存在，则创建
        metaEl = doc.createElement('meta');
        metaEl.name = 'viewport';
        docEl.firstElementChild.appendChild(metaEl);
    }

    metaEl.content = vwctt; //在获取浏览器视窗高度前先清除可能存在的viewport width设置
    var iw = win.innerWidth || vww,
        ow = win.outerWidth || iw,
        sw = win.screen.width || iw,
        saw = win.screen.availWidth || iw,
        ih = win.innerHeight || vww,
        oh = win.outerHeight || ih,
        sh = win.screen.height || ih,
        sah = win.screen.availHeight || ih,
        w = Math.min(iw, ow, sw, saw, ih, oh, sh, sah),
        scale = w / vww;

    console.log('浏览器视窗宽度:', w);
    console.log('缩放比例scale:', scale);

    vwctt = 'width=' + vww + ',initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale + ',user-scalable=no';

    metaEl.content = vwctt;

    console.log("当前viewport设置:", metaEl.content)


    //添加一个默认的样式，默认html字体为32px，并设置body的宽度强制等于设计图宽度并居中(主要用于在PC端浏览器居中显示)
    bodyStyle = doc.createElement('style')
    bodyStyle.type = 'text/css';
    bodyStyle.innerHTML = 'html{font-size:32px;}body{width:' + vww + 'px !important;margin:0 auto !important;overflow:hidden;}';
    headEl.appendChild(bodyStyle);

})(document, window);