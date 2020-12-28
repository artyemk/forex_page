(function($) {
	$.fn.jRating = function(op) {
		var defaults = {

			bigStarsPath : 'https://stat.take-profit.org/brokerrating/stars.png',
			smallStarsPath : 'https://stat.take-profit.org/brokerrating/small.png',
			phpPath : '/brokers-rating/vote/',
			type : 'big',

			step:false,
			isDisabled:false,
			showRateInfo: true,

			length:10,
			decimalLength : 0,
			rateMax : 10,
			rateInfosX : -45,
			rateInfosY : 10,

			onSuccess : null,
			onError : null
		};

		if(this.length>0)
		return this.each(function() {
			var opts = $.extend(defaults, op),    
			newWidth = 0,
			starWidth = 0,
			starHeight = 0,
			bgPath = '';

			if($(this).hasClass('jDisabled') || opts.isDisabled)
				var jDisabled = true;
			else
				var jDisabled = false;

			getStarWidth();
			$(this).height(starHeight);

			var average = parseFloat($(this).attr('data').split('_')[0]),
			idBox = parseInt($(this).attr('data').split('_')[1]), // get the id of the box
			widthRatingContainer = starWidth*opts.length, // Width of the Container
			widthColor = average/opts.rateMax*widthRatingContainer, // Width of the color Container
			
			quotient = 
			$('<div>', 
			{
				'class' : 'jRatingColor',
				css:{
					width:widthColor
				}
			}).appendTo($(this)),
			
			average = 
			$('<div>', 
			{
				'class' : 'jRatingAverage',
				css:{
					width:0,
					top:- starHeight
				}
			}).appendTo($(this)),

			 jstar =
			$('<div>', 
			{
				'class' : 'jStar',
				css:{
					width:widthRatingContainer,
					height:starHeight,
					top:- (starHeight*2),
					background: 'url('+bgPath+') repeat-x'
				}
			}).appendTo($(this));

			$(this).css({width: widthRatingContainer,overflow:'hidden',zIndex:1,position:'relative'});

			if(!jDisabled)
			$(this).bind({
				mouseenter : function(e){
					var realOffsetLeft = findRealLeft(this);
					var relativeX = e.pageX - realOffsetLeft;
					if (opts.showRateInfo)
					var tooltip = 
					$('<p>',{
						'class' : 'jRatingInfos',
						html : getNote(relativeX)+' <span class="maxRate">/ '+opts.rateMax+'</span>',
						css : {
							top: (e.pageY + opts.rateInfosY),
							left: (e.pageX + opts.rateInfosX)
						}
					}).appendTo('body').show();
				},
				mouseover : function(e){
					$(this).css('cursor','pointer');	
				},
				mouseout : function(){
					$(this).css('cursor','default');
					average.width(0);
				},
				mousemove : function(e){
					var realOffsetLeft = findRealLeft(this);
					var relativeX = e.pageX - realOffsetLeft;
					if(opts.step) newWidth = Math.floor(relativeX/starWidth)*starWidth + starWidth;
					else newWidth = relativeX;
					average.width(newWidth);					
					if (opts.showRateInfo)
					$("p.jRatingInfos")
					.css({
						left: (e.pageX + opts.rateInfosX)
					})
					.html(getNote(newWidth) +' <span class="maxRate">/ '+opts.rateMax+'</span>');
				},
				mouseleave : function(){
					$("p.jRatingInfos").remove();
				},
				click : function(e){
					$(this).unbind().css('cursor','default').addClass('jDisabled');
					if (opts.showRateInfo) $("p.jRatingInfos").fadeOut('fast',function(){$(this).remove();});
					e.preventDefault();
					var rate = getNote(newWidth);
					average.width(newWidth);
					
					/** ONLY FOR THE DEMO, YOU CAN REMOVE THIS CODE **/
						$('.datasSent p').html('<strong>idBox : </strong>'+idBox+'<br /><strong>rate : </strong>'+rate+'<br /><strong>action :</strong> rating');
						$('.serverResponse p').html('<strong>Loading...</strong>');
					/** END ONLY FOR THE DEMO **/
						
					$.post(opts.phpPath,{
							idBox : idBox,
							rate : rate,
							action : 'rating',
                        	_token : $('meta[name="csrf-token"]').attr('content')
						},
						function(data) {
							if(!data.error)
							{
								/** ONLY FOR THE DEMO, YOU CAN REMOVE THIS CODE **/
									$('.serverResponse p').html(data.server);
								/** END ONLY FOR THE DEMO **/
								
								
								/** Here you can display an alert box, 
									or use the jNotify Plugin :) http://www.myqjqueryplugins.com/jNotify
									exemple :	*/
								if(opts.onSuccess) opts.onSuccess();
							}
							else
							{
								
								/** ONLY FOR THE DEMO, YOU CAN REMOVE THIS CODE **/
									$('.serverResponse p').html(data.server);
								/** END ONLY FOR THE DEMO **/
								
								/** Here you can display an alert box, 
									or use the jNotify Plugin :) http://www.myqjqueryplugins.com/jNotify
									exemple :	*/
								if(opts.onError) opts.onError();
							}
						},
						'json'
					);
				}
			});

			function getNote(relativeX) {
				var noteBrut = parseFloat((relativeX*100/widthRatingContainer)*opts.rateMax/100);
				switch(opts.decimalLength) {
					case 1 :
						var note = Math.round(noteBrut*10)/10;
						break;
					case 2 :
						var note = Math.round(noteBrut*100)/100;
						break;
					case 3 :
						var note = Math.round(noteBrut*1000)/1000;
						break;
					default :
						var note = Math.round(noteBrut*1)/1;
				}
				return note;
			};

			function getStarWidth(){
				switch(opts.type) {
					case 'small' :
						starWidth = 12; // width of the picture small.png
						starHeight = 10; // height of the picture small.png
						bgPath = opts.smallStarsPath;
					break;
					default :
						starWidth = 23; // width of the picture stars.png
						starHeight = 20; // height of the picture stars.png
						bgPath = opts.bigStarsPath;
				}
			};
			
			function findRealLeft(obj) {
			  if( !obj ) return 0;
			  return obj.offsetLeft + findRealLeft( obj.offsetParent );
			};
		});

	}
})(jQuery);