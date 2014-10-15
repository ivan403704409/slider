function Slider(sEle){
  
  this.lastIndex = 0;
  this.curIndex = 0;
  this.slider = document.getElementById(sEle);
  this.controls = this.slider.getElementsByClassName('ctl')[0].children;
  this.ctn = this.slider.getElementsByClassName('ctn')[0].children;

}


Slider.prototype = {
  
  init: function (){
    var self = this;
    var oSlider = self.slider;
    self._bind();
    
  },
  
  _bind: function (){
    var self = this;
    document.onclick = function () {
      // body...

    self._switch();
    }
    
  },
  
  //切换
  _switch: function (curIndex){
    
    var self = this;

    //左切换
    if( true ){

      self.ctn[3].style.webkitTransform = 'translateX(-400px)';
      self.ctn[3].style.webkitTransition = '1s';
      self.ctn[2].style.webkitTransition = '1s';

    //右切换
    }else{

      self.ctn[self.lastIndex].webkitTransition = '0 1s';
      self.ctn[self.curIndex].webkitTransition = '100px 1s';
    }
    
  },
  
  //开始自动播放
  _startAutoPlay: function (){
    
    
  },
  
  //停止自动播放
  _stopAutoPlay: function (){
    
    
  },
  
  //是否向左滑
  _isGoLeft : function (){
    var bLeft = true;

    return bLeft;    
  }, 
  
    
  constructor: Slider
};

