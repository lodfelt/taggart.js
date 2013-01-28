(function($){

 	var settings = {
 		submitButton: 13,
 		targetSelector: '.tag-container ul',
 		addUrl: '',
 		delUrl: '',
 		btnClass: 'taggart-btn'
 	};

	var methods = {
		init: function(options) {
			settings = $.extend(settings, options);
			appendContainer(this);
			return this.tagable;
		},
		tagable: function(method) {
			$(this).on("keydown", function(event) {
				if(event.keyCode === settings.submitButton) {
					event.preventDefault();	
					var $value = $('ul.typeahead.dropdown-menu').is(':visible') ? $('ul.typeahead.dropdown-menu li.active') : $(this);
					var $input = $(this);
					if(($value.text() !== '' || $input.val() !== '') && ($value.text().length >= 3 || $value.val().length >= 3)) {
						var $targetUL = $('.tag-container').children('ul');
						var hasText = false;
						var $foundElem;
						var $that = $input;
						if($targetUL.children().length > 0) {
							$targetUL.children().each(function() {
								var textFromExistingTag = $(this).text().replace(' X','');
								if(textFromExistingTag !== $that.val() || textFromExistingTag !== $value.text()) {
									$(this).removeAttr('class').addClass(settings.btnClass);
								} else {
									hasText = true;
									$foundElem = $(this);
									return false;
								}
							});
						}
					}
					if(!hasText) {
						var valueText = $value.is('li') ? $value.text() : $value.val();
						appendTag(valueText, $targetUL);
					} else {
						$foundElem.addClass('flash-warning');
					}
					$input.val('');
					$('body').on('click', '.tag-container ul li span.remove-tag-span', function(event){
						var clickedSpan = $(event.target);
						var text = clickedSpan.parents('li').children('span.pull-left').text();
						$.post(settings.delUrl, {tag_name:text}, function(data){
							$(event.target).parent('li').remove();
						});
					});
				}
			});
			return false;
		}
	};
	function appendContainer(selector) {
		console.log(selector);
		$('<div class="tag-container"><ul></ul></div>').insertBefore($(selector));
	}
	function appendTag(value, $targetUL) {
		var $li = $('<li class="'+settings.btnClass+'"><span class="pull-left">'+value+'</span> <span class="remove-tag-span pull-right">X</span></li>');
		// $.post(settings.addUrl, {'tag_name':value}, function(data) {
		// });
			$targetUL.append($li);
	}

	$.fn.taggart = function(method) {
	    if(methods[method]){
	     	return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
	    } else if(typeof method === 'object' || ! method) {
	    	methods.init.apply(this, arguments);
	      	return methods.tagable.apply(this, arguments);
	    } else {
	      	$.error( 'Method ' +  method + ' does not exist on jQuery.dynatag' );
	    }  
	}
})(jQuery);