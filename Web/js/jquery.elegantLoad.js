/*
	Elegant Loader Plugin
*/
(function($){
	$.fn.elegantLoad = function(options, callback){
		var imagesComplete = false;
		var pageElementsComplete = false;	

		var defaultOptions = {
			mainElements:[],
			fadeInDuration : 600,
			fadeOutDuration : 400,
			ignoreSelector : '.ignoreElegantLoad',
			elegantLoadImages : true,
			elegantLoadTypekit : true,
			fadeOutOnLinkClick : true
		};
		
		var data = $(this).data('elegantLoad');
		if (! data ){		
			//ininialize this beast
			data = {
				target: this,
				options: options ? $.extend(defaultOptions, options) : defaultOptions,
				callbacks: ((typeof(callback) === "function")?[callback]:[])
			};
			$(this).data('elegantLoad',data);
		
			$(document).ready(function(){
				makeItSo();
			});
		} else {
			data.options = options ? $.extend(true, data.options, options) : defaultOptions;
			if (typeof(callback) === "function") {
				data.callbacks.push(callback);
			}
		}
		
		var checkForCallback = function(){
			var callbacks = data.callbacks;
			if(imagesComplete && pageElementsComplete && callbacks.length > 0){
				while( callbacks[0]){
					callbacks.shift().apply();
				}
			}
		};
		
		var makeItSo = function(){
			// This is the actual function called once on $(document).load to do the work
			
			//disable for dnn edit mode
			if(typeof(editMode) === "undefined"){			
				//do typekit load
				
				var opts = data.options;
				var mainElements = opts.mainElements;
				
				if(opts.elegantLoadImages){
					var $imagesToLoad = $('img:visible:not(' + opts.ignoreSelector + ')');
					$imagesToLoad.css('visibility','hidden');
				}
				
				if(opts.elegantLoadTypekit){
					$(mainElements).css('visibility', 'hidden');
				}

				if(opts.elegantLoadTypekit){
					var typeKitComplete = function(){
						$(mainElements).hide().css('visibility', 'visible').fadeIn(opts.fadeInDuration,function(){
							pageElementsComplete = true;
							checkForCallback();
						});
					};
					
					//call typekit
					try{Typekit.load({
							active: function(){
								typeKitComplete();
							},
							inactive: function(){
								typeKitComplete();
							}
						});}catch(e){}
				}else{
					pageElementsComplete = true;
				}
				
				//do images load
				if (opts.elegantLoadImages && $imagesToLoad.length > 0 ){
					var imagesLoaded = 0;
					$imagesToLoad.each(function(index){
						var preloadedImg = new Image();
						var domImage = this;
						
						if (preloadedImg.complete){
								$(domImage).hide().css('visibility', '').stop().fadeIn(opts.fadeInDuration,function(){
									imagesLoaded ++;
									if (imagesLoaded >= $imagesToLoad.length){
										imagesComplete = true;							
										checkForCallback();
									}
								});
						}else{
							$(preloadedImg).load(function(){
								$(domImage).hide().css('visibility', '').stop().fadeIn(opts.fadeInDuration,function(){
									imagesLoaded ++;
									if (imagesLoaded >= $imagesToLoad.length){
										imagesComplete = true;							
										checkForCallback();
									}
								});
							});
						}
						preloadedImg.src = $(domImage).get()[0].src;
					});
				} else {
					imagesComplete = true;
				}
			} else {
				$(data.options.mainElements).css('visibility','visible');
				try{Typekit.load();}catch(e){}
				imagesComplete = true;
				pageElementsComplete = true;
				checkForCallback();
			}
		};
		
		if (typeof(editMode) === "undefined" && data.options.fadeOutOnLinkClick){
			$('a[href]:not(' + data.options.ignoreSelector + ')').each(function(){
				var href = $(this).attr("href");
				var target = $(this).attr("target") ? $(this).attr("target") : "_self";
				if (href.indexOf('#') === -1 && href.length > 0){
					$(this).click(function(e){							
						e.preventDefault();
						$(data.options.mainElements).fadeOut(function(){
							var pluginTarget = data.target; 
							$.removeData(pluginTarget,'elegantLoad');
							window.open(href,target);
						});
					});
				}
			});
		}
	}
})(jQuery);