$(function(){
	//先用非面向对象语言实现
/*	$('.fd-nextbar').click(function(){
		var currentIndex = $('.fd-images-wrap li').index($('li.fd-current'));
		console.log(currentIndex);
		var currentObj = $('li.fd-current');
		currentObj.removeClass('fd-current');
		if((currentIndex+1) >= $('.fd-images-wrap li').length){
			$($('.fd-images-wrap li').get(0)).addClass('fd-current');
		} else {
			$($('.fd-images-wrap li').get(currentIndex+1)).addClass('fd-current');
		}
	});*/
	
	var currentIndex = 0,oldIndex = 0;
	$($('.fd-images-wrap li').get(currentIndex)).css({'left':0,position: 'absolute'}).show();
	$('.fd-nextbar').click(function(){
		oldIndex = currentIndex;
		currentIndex = currentIndex +1;
		var currentObj = $($('.fd-images-wrap li').get(oldIndex));
		currentObj.animate({
			position: 'absolute',
			left:-450+'px'
		},300,function(){
		});
		
			if((currentIndex) >= $('.fd-images-wrap li').length){
				currentIndex=0;
				$($('.fd-images-wrap li').get(currentIndex)).css({'position':'absolute',left:'450px'}).animate({
					position:'absolute',
					left:0
				},300,function(){
				});
		   } else {
				$($('.fd-images-wrap li').get(currentIndex)).css({'position':'absolute',left:'450px'}).animate({
					position: 'absolute',
					left:0
				},300,function(){
				});
		  }
	});
	
	$('.fd-prevbar').click(function(){
		oldIndex = currentIndex;
		currentIndex = currentIndex -1;
		   	 var currentObj = $($('.fd-images-wrap li').get(oldIndex));
			currentObj.css('position','absolute').animate({
				left:450+'px'
			},300,function(){
			});
		   if((currentIndex) < 0){
				currentIndex=$('.fd-images-wrap li').length-1;
				$('.fd-images-wrap li').each(function(index,n){
					if(index != currentIndex) {
						$(n).css({'position':'absolute','left':'450px'});
					}
				});
				$($('.fd-images-wrap li').get(currentIndex)).css({'position':'absolute',left:'-450px'}).animate({
					left:0
				},300,function(){
				});
		   } else {
		   	
				$($('.fd-images-wrap li').get(currentIndex)).css({'position':'absolute',left:'-450px'}).animate({
					left:0
				},300,function(){
				});
		  }
		   
	});
	
});
