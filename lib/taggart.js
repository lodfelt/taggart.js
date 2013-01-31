(function($){

 	var settings = {
 		submitButton: 13,
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
					var valueText = $('ul.typeahead.dropdown-menu').is(':visible') ? $('ul.typeahead.dropdown-menu li.active').text() : $(this).val();
					if(assertTextGTE(valueText, 3)) {
						var $targetUL = $(this).parent('.input_container').siblings('.tag-container').children('ul');
						var hasText = false;
						var $foundElem;
						if($targetUL.children().length > 0) {
							$targetUL.children().each(function() {
								var textFromExistingTag = $(this).text().replace(' X','');
								if(textFromExistingTag !== valueText) {
									$(this).removeAttr('class').addClass(settings.btnClass);
								} else {
									hasText = true;
									$foundElem = $(this);
									error(this, valueText);
								}
							});
						}
						if(!hasText) {
							appendTag(valueText, $targetUL);
						} else {
							error(this, 'Cannot add same tag twice');
						}
					} else {
						error(this, 'Cannot add empty tags');
					}
					$(this).val("");
				}
			});
			return false;
		}
	};
	function appendContainer(selector) {
		if($('.tag-container').get().length < 1)
			$('<div class="tag-container"><ul></ul></div>').insertBefore($(selector));
	}
	function appendTag(value, $targetUL) {
		var $li = $('<li class="'+settings.btnClass+'"><span class="pull-left">'+value+'</span> <span class="remove-tag-span pull-right">X</span></li>');
		$targetUL.append($li);
		if(typeof(settings.send) === 'function' && settings.send !== null){
			settings.send.call(this, value, $li);	
		}
	}
	
	function TaggartException(msg) {
		this.msg = msg;
		this.name = "TaggartException";
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
	
	function assertTextGTE(string, length) {
		if((string !== '') && (string.length >= length))
			return true;
		return false;
	}
	
	function error(obj, msg) {
		if(typeof(settings.error) === 'function' && settings.error !== null) {
			settings.error.call(obj, msg);
		} else {
			throw new TaggartException(msg);
		}
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