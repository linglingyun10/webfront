(function($,win,doc){
  function CusScrollBar(options){
  	this._init(options);
  }
  $.extend(CusScrollBar.prototype,{
  	_init:function(options){
  		var self = this;
  		self.defaults = {
  			scrollDir :'y',//滚动方向
  			contentControl:'',//内容区域选择器
  			scrollControl:'',//滚动条区域选择器
  			slideControl:'',//滑块儿选择器
  			wheelStep:20,//滚轮步长，
  			tabitems:'.fd-tab-items li',
  			activeClassName:'fd-li-active',
  			anchoritems:'.fd-h2',
  			patchdiv:'.fd-div-patch'
  		};
  		$.extend(true,self.defaults,options||{});
  		self._initDomEvent();
  		return self;
  	},
  	_bindContScroll:function(){
  		var self = this;
  		self.$cont.live('scroll',function(){
			var slideEl = self.$slideControl&& self.$slideControl[0];
			if(slideEl){
				slideEl.style.top = self.getSliderPosition()+'px';	
			}
  			
  	})
  		return self;	
  	},
  	getSliderPosition:function(){
  		var self = this,
  		maxSliderPosition = self.getMaxSliderPosition();
  		return Math.min(maxSliderPosition,maxSliderPosition*self.$cont[0].scrollTop/self.getMaxScrollPosition());
  	},
  		_initDomEvent:function(){
  			var opts = this.defaults;
  			this.$cont = $(opts.contentControl);
  			this.$scrollContent = $(opts.scrollControl);//滚动条对象
  			this.$slideControl = $(opts.slideControl);//滑块儿对象
  			this.$doc = $(document);
  			this.$tabitems = $(opts.tabitems);
  			this.$anchoritems = $(opts.anchoritems);
  			this.$patchdiv = $(opts.patchdiv);
  			this._initSliderDragEvent()._bindContScroll()._bindMousewhell()._initTabEvent();
  		},
  		/*初始化滑块儿拖动功能
  		 */
  		_initSliderDragEvent:function(){
  			var self = this;
  			var slider = this.$slideControl;
  			var sliderEl = slider[0];
  			  if(sliderEl) {
  			  	var doc = this.$doc,
  			  	   dragStartPagePosition,
  			  	   dragStartScrollPosition,
  			  	   dragContBarRate;
  			  	   
  			  	   function mousemoveHandler(e){
  			  	   		e.preventDefault();
  			  	   		console.log('mousemove');
  			  	   		if(dragStartPagePosition === null) {
  			  	   			return;
  			  	   		}
  			  	   		self.scrollTos(dragStartScrollPosition+(e.pageY-dragStartPagePosition)*dragContBarRate);
  			  	   }
  			  	   slider.live('mousedown',function(e){
  			  	   		e.preventDefault();
  			  	   		console.log('mousedown');
  			  	   		dragStartPagePosition = e.pageY;
  			  	   		dragStartScrollPosition = self.$cont[0].scrollTop;
  			  	   		dragContBarRate = self.getMaxScrollPosition()/self.getMaxSliderPosition();
  			  	   		doc.live('mousemove.scroll',mousemoveHandler).live('mouseup.scroll',function(e){
  			  	   			console.log('mouseup');
  			  	   			doc.die('.scroll');
  			  	   		});
  			  	   })
  			  }
  			  return self;
  		},
  		getMaxScrollPosition:function(){
  			var self = this;
  			return Math.max(self.$cont.height(),self.$cont[0].scrollHeight)-self.$cont.height();
  		},
  		getMaxSliderPosition:function(){
  			var self = this;
  			return self.$scrollContent.height()-self.$slideControl.height();
  		},
  		scrollTos:function(positionVal){
  			var self = this;
  			var infoArr = self.getAnchorPositonArr();
  			function getIndex(positionVal) {
  				for(var i=infoArr.length-1;i>=0;i--){
  					if(positionVal>=infoArr[i]){
  						return i;
  					} else {
  						continue;
  					}
  				}
  			}
  			if(infoArr.length == self.$tabitems.length){
  					self.changeTabSelect(getIndex(positionVal));
  			}
  			debugger;
  			self.$cont.scrollTop(positionVal);
  		},
  		_bindMousewhell:function(){
  			var self = this;
  			self.$cont.live('mousewheel DOMMouseScroll',function(e){
  				e.preventDefault();
  				var oEv = e.originalEvent,
  						wheelRange =oEv.wheelDelta?-oEv.wheelDelta/120:(oEv.detail||0)/3;	
  						self.scrollTos(self.$cont[0].scrollTop+wheelRange * self.defaults.wheelStep);
  			});
  			return self;
  		},
  		_initTabEvent:function(){
  			var self = this;
  			self.$tabitems.live('click',function(){
  				var index =self.$tabitems.index($(this));
  				 self.changeTabSelect(index);
  				 	var topValue = self.$anchoritems.eq(index).position().top;
  				 	var contHeight = self.$cont.height();
  				 	 var lastArticleHeight = self.$tabitems.last().height();
  				if(lastArticleHeight < contHeight) {
  					 self.$patchdiv.height(contHeight-lastArticleHeight-self.$anchoritems.outerHeight()+'px');
  				}
  				self.scrollTos(self.$cont[0].scrollTop+topValue);
  			});
  		},
  		changeTabSelect:function(index){
  			  var self = this;
  			  var activeClassName = self.defaults.activeClassName;
  				self.$tabitems.eq(index).addClass(activeClassName).siblings().removeClass(activeClassName);
  		},
  		getAnchorPositonArr:function(){
  			var self = this;
  			var infoArr = [];
  			self.$anchoritems.each(function(index,n){
  				infoArr.push(self.$cont[0].scrollTop+self.getAnchorPosition(index));
  			});
  			return infoArr;
  		},
  		getAnchorPosition:function(i){
  			var self = this;
  			return self.$anchoritems.eq(i).position().top;
  		}
  });
  /*CusScrollBar.prototype._init  =function(options){
  	console.log('test');
  	var obj1 ={'name':'a','age':123};
  	$.extend('obj1');
  	console.log($);
  }*/
 win.CusScrollBar = CusScrollBar;
})(jQuery,window,document);

$(function(){
	new CusScrollBar({
  			scrollDir :'y',//滚动方向
  			contentControl:'.fd-scroll-wrap',//内容区域选择器
  			scrollControl:'.fd-scroll-bar-wrp',//滚动条区域选择器
  			slideControl:'.fd-scrollbar',//滑块儿选择器
  		});
})

