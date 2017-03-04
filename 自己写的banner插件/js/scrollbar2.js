(function($,win,doc,undefined){
	//哪些变量是可变得
	//滑动时间，上一个，下一个className,autoPlay：是否自动播放，默认每次移动一个，container名字，
	$.fn.ScrollBar = function(options) {
		var _this =this;
		this.defaultSetting = {
			'contentContainer':'',//li容器
			'prevButton':'',
			'nextButton':'',
			'timer':'',
			'autoPlay':false,
			'delay':1000
		};
		$.extend(true,this.defaultSetting, options ||{});
		console.log(this.defaultSetting);
		var currentIndex = 0,oldIndex = 0,timer = this.defaultSetting.timer,delaytimer = null;
		this.contentContainer = $(this.defaultSetting.contentContainer);
		this.prevBar = $(this.defaultSetting.prevButton);
		this.nextBar = $(this.defaultSetting.nextButton);
		var liItems = this.contentContainer.find('li');
		var liWidth = liItems.first().width();
		var liSize =  liItems.length;
		this.nextBar.click(function(){
			oldIndex = currentIndex;
			currentIndex = currentIndex +1;
			var currentObj = $(liItems.get(oldIndex));
			currentObj.css('position','absolute').animate({
				left:-liWidth+'px'
			},timer,function(){
			});
			if((currentIndex) >= liSize){
				currentIndex=0;
				$(liItems.get(currentIndex)).css({'position':'absolute',left:liWidth+'px'}).animate({
					left:0
				},timer,function(){
				});
		   } else {
				$(liItems.get(currentIndex)).css({'position':'absolute',left:liWidth+'px'}).animate({
					left:0
				},timer,function(){
				});
		  }
		});
		
		this.prevBar.click(function(){
			oldIndex = currentIndex;
			currentIndex = currentIndex -1;
		   	 var currentObj = $(liItems.get(oldIndex));
			currentObj.css('position','absolute').animate({
				left:liWidth+'px'
			},timer,function(){
			});
			   if((currentIndex) < 0){
				currentIndex= liSize-1;
				liItems.each(function(index,n){
					if(index != currentIndex) {
						$(n).css({'position':'absolute','left':liWidth+'px'});
					}
				});
				$(liItems.get(currentIndex)).css({'position':'absolute',left:-liWidth+'px'}).animate({
					left:0
				},timer,function(){
				});
			   } else {
					$(liItems.get(currentIndex)).css({'position':'absolute',left:-liWidth+'px'}).animate({
						left:0
					},timer,function(){
					});
			  }
		});
		autoPlayTimer();
		function autoPlayTimer(){
			if(!_this.defaultSetting.autoPlay) {
				return;
			}
			
			if(delaytimer) {
				clearInterval(delaytimer);
			}
			
			delaytimer = setInterval(autoPlayImage,_this.defaultSetting.delay);
		}
		
		function autoPlayImage(){
			_this.nextBar.trigger('click');
		}
		
		_this.mouseover(function(){
			clearInterval(delaytimer);
			showHandle();
		}).mouseleave(function(){
			hideHandle();
			autoPlayTimer();
		});
		
		function showHandle(){
			_this.prevBar.animate({opacity:1},timer,function(){
			});
			_this.nextBar.animate({opacity:1},timer,function(){
			});
		}
		
		function hideHandle(){
			_this.prevBar.animate({opacity:0},timer,function(){
			});
			_this.nextBar.animate({opacity:0},timer,function(){
			});
		}
	}
	
})(jQuery,window,document);
$('.fd-banner-wrap').ScrollBar({
    'contentContainer':'.fd-images-wrap',//li容器
	'prevButton':'.fd-prevbar',
	'nextButton':'.fd-nextbar',
	'timer':300,
	'autoPlay':true
});
