/**
 * Auto: Ivan
 * QQ: 403704409
 * date: 2014.10.23
 * 移动端图片切换插件 
 */

/*
功能需求：
    1.自动播放

    2.左右拨动

参数：
    sId:    必选   id 或 指定的一个dom元素
    opts:   可选
        {
          autoPlay: true | false,   是否自动播放，默认true
          autoPlayTime: number,     自动播放时间间隔，当autoPlay为true时才有效, 默认值为 5000
          speed: number             切换的速度, 默认值为 400
        }

调用方式：
    new Slider('id').init();
    new Slider('id').init({ autoPlay: true, autoPlayTime: 2000,  speed: 400 });
    new Slider(element).init({ autoPlay: true, autoPlayTime: 2000,  speed: 400 });

 */
function Slider(sId) {
  var self = this;

  this._slider = (typeof sId === 'string') ? document.getElementById(sId) : sId;
  this._ctrl = this._slider.getElementsByClassName('ctrl')[0].children;
  this._ctnBox = this._slider.getElementsByClassName('ctn')[0];
  this._ctn = this._slider.getElementsByClassName('ctn')[0].getElementsByTagName('li');
  this._ctnLen = this._ctn.length;
  this._width = parseFloat(getComputedStyle(self._ctn[0], false)['width']);
  this._lastIndex = 0;
  this._curIndex = 0;
  this._startX = 0;
  this._endX = 0;
  self._startTime = 0;
  self._endTime = 0;
  self._timer = null;
  self._autoPlay = true;
  self._autoPlaytime = 5000;
  self._speed = 400;
}
Slider.prototype = {

  init: function(opts) {
    var self = this;
    var oSlider = self._slider;
    self._setLayout();
    if (opts && opts.autoPlay === false) self._autoPlay = false;
    if (opts && opts.autoPlayTime) self._autoPlaytime = opts.autoPlayTime;
    if (opts && opts.speed) self._speed = opts.speed;
    self._autoPlay && self._startAutoPlay();
    self._bind();
  },

  //设置布局
  _setLayout: function() {
    var self = this;
    var iSreenWidth = document.documentElement.clientWidth;
    self._slider.style.width = iSreenWidth + 'px';
    for (var i = 0; i < self._ctnLen; i++) {
      self._ctn[i].className = '';
      self._ctn[i].style.width = iSreenWidth + 'px';
    }

    self._ctnBox.style.width = self._ctnLen + '00%';

    self._width = parseFloat(self._ctn[0].style.width);

    //resize时调整位置
    self._switch();
    self._ctnBox.style.webkitTransition = 'inherit';

  },

  //绑定事件
  _bind: function() {
    var self = this;

    window.addEventListener('resize', function() {
      self._setLayout();
    });

    self._slider.addEventListener('touchstart', function(ev) {
      self._touchStart(ev);
    });

    self._slider.addEventListener('touchmove', function(ev) {
      self._touchMove(ev);
    });

    self._slider.addEventListener('touchend', function(ev) {
      self._touchEnd(ev);
    });


  },

  _touchStart: function(ev) {
    var ev1 = ev.touches[0];
    var self = this;
    self._startX = ev1.clientX;
    self._endX = ev1.clientX;
    self._startTime = new Date().getTime();

    self._stopAutoPlay();
  },

  _touchMove: function(ev) {
    var self = this;
    var ev1 = ev.touches[0];
    var disX = ev1.clientX - self._startX;
    self._endX = ev1.clientX;
    self._ctnBox.style.webkitTransform = 'translateX(' + (disX - self._width * self._curIndex) + 'px)';
    self._ctnBox.style.webkitTransition = 'inherit';
    ev.preventDefault();
  },

  _touchEnd: function(ev) {
    var self = this;
    self._endTime = new Date().getTime();
    self._isGoLeft();
    self._switch();
    self._autoPlay && self._startAutoPlay();
  },

  //切换
  _switch: function() {
    var self = this;
    self._ctnBox.style.webkitTransform = 'translateX(-' + self._width * self._curIndex + 'px)';
    self._ctnBox.style.webkitTransition = self._speed + 'ms ease-out';

    self._ctrl[self._lastIndex].className = '';
    self._ctrl[self._curIndex].className = 'j-active';
  },

  //开始自动播放
  _startAutoPlay: function() {
    var self = this;

    self.tiemr && clearInterval(self._timer);
    self._timer = setInterval(function() {

      self._addCurIndex();
      self._switch();

    }, self._autoPlaytime);

  },

  //停止自动播放
  _stopAutoPlay: function() {
    var self = this;
    clearInterval(self._timer);
  },

  //是否是向左滑
  _isGoLeft: function() {
    var self = this;
    var dis = self._endX - self._startX;

    //快速滑动
    if (self._endTime - self._startTime < 200) {
      if (dis === 0) {
        return;
      } else if (dis > 0) { //向右
        self._reduceCurIndex();
      } else { //向左
        self._addCurIndex();
      }

      //慢速滑动
    } else {
      if (Math.abs(dis) <= 60) { //不动
        return;
      } else if (dis > 60) { //向右
        self._reduceCurIndex();
      } else if (dis < -60) { //向左
        self._addCurIndex();
      }

    }
  },

  _addCurIndex: function() {
    var self = this;
    self._lastIndex = self._curIndex;
    self._curIndex++;
    if (self._curIndex === self._ctnLen) self._curIndex = 0;
  },

  _reduceCurIndex: function() {
    var self = this;
    self._lastIndex = self._curIndex;
    self._curIndex--;
    if (self._curIndex === -1) self._curIndex = self._ctnLen - 1;
  },

  constructor: Slider
};