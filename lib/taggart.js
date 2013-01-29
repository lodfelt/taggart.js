(function($){

 	var settings = {
 		submitButton: 13,
 		targetSelector: '.tag-container ul',
 		btnClass: 'taggart-btn',
 		autoSubmit: false,
 	};

	var methods = {
		init: function(options) {
			settings = $.extend(settings, options);
			appendContainer(this);
			bindHandlers();
			return this.tagable; 
		},
		tagable: function(method) {
			$(this).on("keydown", function(event) {
				if(!settings.autoSubmit)
					if($('ul.typeahead.dropdown-menu li.active').is(':visible'))
						return true;
				if(event.keyCode === settings.submitButton) {
					var $value = $('ul.typeahead.dropdown-menu').is(':visible') ? $('ul.typeahead.dropdown-menu li.active'): $(this);
					//var $input = $(this);
					if(($value.text() !== '' || $value.val() !== '') && ($value.text().length >= 3 || $value.val().length >= 3)) {
						var $targetUL = $('.tag-container').children('ul');
						var hasText = false;
						var $foundElem;
						if($targetUL.children().length > 0) {
							$targetUL.children().each(function() {
								var textFromExistingTag = $(this).text().replace(' X','');
								var textFromInsert = $value.is('li') ? $value.text() : $value.val();
								if(textFromExistingTag !== textFromInsert) {
									$(this).removeAttr('class').addClass(settings.btnClass);
								} else {
									hasText = true;
									$foundElem = $(this);
									settings.error.call(this, textFromInsert)
								}
							});
						}
						if(!hasText) {
							var valueText = $value.is('li') ? $value.text() : $value.val();
							appendTag(valueText, $targetUL);
						} else {
							settings.error.call(this, {
								error:'Cannot add same tag twice'
							});

						}
					} else {
						settings.error.call(this, {
							error: 'Cannot add empty tags'
						});

					}
					if($value.is('input')) 
						$value.val("");
				}
			});
			return false;
		}
	};
	function appendContainer(selector) {
		if($('.tag-container').get() < 1)
			$('<div class="tag-container"><ul></ul></div>').insertBefore($(selector));
	}
	function appendTag(value, $targetUL) {
		var $li = $('<li class="'+settings.btnClass+'"><span class="pull-left">'+value+'</span> <span class="remove-tag-span pull-right">X</span></li>');
		if(typeof(settings.send) === 'function' && settings.send !== null){
			settings.send.call(this, value);	
		}
		$targetUL.append($li);
	}
	function bindHandlers() {
		removeHandler = function(event){
			var clickedSpan = $(event.target);
			var text = clickedSpan.parents('li').children('span.pull-left').text();
			if(settings.remove !== null && typeof(settings.remove) === "function"){
				settings.remove.call(this, text);
			}
			$(event.target).parent('li').remove();
		}
		$('body').on('click', '.tag-container ul li span.remove-tag-span', removeHandler);
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