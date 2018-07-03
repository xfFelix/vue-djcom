//适屏处理函数
function winResize (){
  //设置scale值
  // var scale = 1 / devicePixelRatio;
  // document.querySelector('meta[name="viewport"]').setAttribute('content','initial-scale=' + scale + ', maximum-scale=' + scale + ',minimum-scale=' + scale + ', user-scalable=no');

  //设置htmlfont-size值，即设置rem
   var hhxhWindowWidth = (document.documentElement.clientWidth < 480) ? document.documentElement.clientWidth : 480;
  document.documentElement.style.fontSize = (hhxhWindowWidth / 75) * 10 + 'px';
}
//初始化适屏
winResize();

//横屏与竖屏切换视屏
window.addEventListener('resize',winResize);