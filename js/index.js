/*
功能需求：
    1.自动播放

    2.左右拨动

*/
function Slider(sId){
  var self = this;
  this.lastIndex = 0;
  this.curIndex = 0;
  this.slider = document.getElementById(sId);
  this.controls = this.slider.getElementsByClassName('ctl')[0].children;
  this.ctnBox = this.slider.getElementsByClassName('ctn')[0];
  this.ctn = this.slider.getElementsByClassName('ctn')[0].children;
  this.width = parseFloat( getComputedStyle(self.ctn[0], false)['width'] );
  this.startX = 0;
  this.endX = 0;
}
Slider.prototype = {
  
  init: function (){
    var self = this;
    var oSlider = self.slider;
    self._setPos();
    self._bind();
    
  },

  _setPos: function (){
      var self = this;
      self.ctnBox
      self.ctnBox.style.width = self.width * self.ctn.length + 'px';
  },
  
  //重置宽度，要在slider宽度改变时才调用
  resetWidth: function (){
    this.width = parseFloat(this.slider.style.width); 
  },
  
  _bind: function (){
    var self = this;
    

    self.slider.addEventListener('touchstart', function (ev){
      self._touchStart(ev);
    });
    self.slider.addEventListener('touchmove', function (ev){
      self._touchMove(ev);
    });
    self.slider.addEventListener('touchend', function (ev){
      self._touchEnd(ev);
    });

    
  },

  _touchStart: function (ev){
      var ev = ev.touches[0];
      var self = this;
      self.startX = ev.clientX;
  },

  _touchMove: function (ev){
      var self = this;
      var ev = ev.touches[0];
      var disX = ev.clientX - self.startX;
      self.endX = ev.clientX;
      console.log(-disX + 320*self.curIndex)
      self.ctnBox.style.webkitTransform = 'translateX('+ (disX - 320*self.curIndex) +'px)';
      self.ctnBox.style.webkitTransition = 'inherit';

  },

  _touchEnd: function (ev){
      var ev = ev.touches[0];
      var self = this;
      self._switch();
  },
  
  //切换
  _switch: function (curIndex){    
    var self = this;
    self._isGoLeft();
    self.ctnBox.style.webkitTransform = 'translateX(-' + 320*self.curIndex + 'px)';
    self.ctnBox.style.webkitTransition = '400ms ease-out';
  },
  
  //开始自动播放
  _startAutoPlay: function (){
    
    
  },
  
  //停止自动播放
  _stopAutoPlay: function (){
    
    
  },
  
  //是否向左滑
  _isGoLeft : function (){
    var self = this;
    var bLeft = true;
    var dis = self.endX - self.startX;
    console.log(self.startX)
    console.log(self.endX)

    if( self.endX === 0 ){
      return;

    }else if( dis > 100 ){

      bLeft = false;
      self.curIndex -= 1;
      if( self.curIndex === -1 )self.curIndex = 0;

    }else if(dis < 100){

      self.curIndex += 1;
      if( self.curIndex === self.ctn.length )self.curIndex = self.ctn.length - 1;

    }
    return bLeft;    
  }, 
  
    
  constructor: Slider
};

