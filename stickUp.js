jQuery(
function($) {

	$(document).ready(function(){
		var contentButton = [];
		var contentTop = [];
		var content = [];
		var lastScrollTop = 0;
		var scrollDir = '';
		var itemClass = '';
		var itemHover = '';
		var menuSize = null;
		var stickyHeight = 0;
		var stickyMarginB = 0;
		var currentMarginT = 0;
		var topMargin = 0;

		var cbs = $.Callbacks();

		$(window).scroll(function(event){
   			var st = $(this).scrollTop();
   			if (st > lastScrollTop){
       			scrollDir = 'down';
   			} else {
      			scrollDir = 'up';
   			}
  			lastScrollTop = st;
		});
		$.fn.stickUp = function( options ) {
			// adding a class to users div
			$(this).addClass('stuckMenu');
        	//getting options
        	var objn = 0;
        	if(options != null) {
	        	for(var o in options.parts) {
	        		if (options.parts.hasOwnProperty(o)){
	        			content[objn] = options.parts[objn];
	        			objn++;
	        		}
	        	}
	  			if(objn == 0) {
	  				//console.log('error:needs arguments');
	  			}

	  			itemClass = options.itemClass;
	  			itemHover = options.itemHover;
	  			if(options.topMargin != null) {
	  				if(options.topMargin == 'auto') {
	  					topMargin = parseInt($('.stuckMenu').css('margin-top'));
	  				} else {
	  					if(isNaN(options.topMargin) && options.topMargin.search("px") > 0){
	  						topMargin = parseInt(options.topMargin.replace("px",""));
	  					} else if(!isNaN(parseInt(options.topMargin))) {
	  						topMargin = parseInt(options.topMargin);
	  					} else {
	  						console.log("incorrect argument, ignored.");
	  						topMargin = 0;
	  					}
	  				}
	  			} else {
	  				topMargin = 0;
	  			}
	  			menuSize = $('.'+itemClass).size();
  			}
  			cbs.add(function (elem, menuSize) {
				stickyHeight = parseInt(elem.height());
				stickyMarginB = parseInt(elem.css('margin-bottom'));
				currentMarginT = parseInt(elem.next().closest('div').css('margin-top'));
				vartop = parseInt(elem.offset().top);

  				return function () {
					varscroll = parseInt($(document).scrollTop());
					if(menuSize != null){
						for(var i=0;i < menuSize;i++)
						{
							contentTop[i] = $('#'+content[i]+'').offset().top;
							function bottomView(i) {
								contentView = $('#'+content[i]+'').height()*.4;
								testView = contentTop[i] - contentView;
								//console.log(varscroll);
								if(varscroll > testView){
									$('.'+itemClass).removeClass(itemHover);
									$('.'+itemClass+':eq('+i+')').addClass(itemHover);
								} else if(varscroll < 50){
									$('.'+itemClass).removeClass(itemHover);
									$('.'+itemClass+':eq(0)').addClass(itemHover);
								}
							}
							if(scrollDir == 'down' && varscroll > contentTop[i]-50 && varscroll < contentTop[i]+50) {
								$('.'+itemClass).removeClass(itemHover);
								$('.'+itemClass+':eq('+i+')').addClass(itemHover);
							}
							if(scrollDir == 'up') {
								bottomView(i);
							}
						}
					}

					if(vartop < varscroll + topMargin){
						if (options) {
							if(options.class) {
								elem.addClass(options.class);
							}
						}
						elem.addClass('isStuck');
						elem.next().closest('div').css({
							'margin-top': stickyHeight + stickyMarginB + currentMarginT + 'px'
						}, 10);
						elem.css("position","fixed");

						if (typeof options === "undefined") {
							elem.css({
								top: 0 + 'px',
							}, 10, function(){

							});
						} else {
							elem.css({
								top: options.top || 0 + 'px',
							}, 10, function(){

							});
						}

					};

					if(varscroll + topMargin < vartop){
						if (options) {
							elem.removeClass(options.class);
						}
						elem.removeClass('isStuck');
						elem.next().closest('div').css({
							'margin-top': currentMarginT + 'px'
						}, 10);
						elem.css("position","relative");
					};
  				}
  			}($(this), menuSize));

			//$(this).find('*').removeClass(itemHover);

			$(document).unbind("scroll.stick");
			$(document).bind('scroll.stick', function () {

				cbs.fire();
			});
		}
	});

});
