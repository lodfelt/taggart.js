(function($){

 	var settings = {
 		submitKey: 13,
 		targetSelector: '.tag-container ul',
 		btnClass: 'taggart-btn',
 		autoSubmit: false,
 		submitButton: ''
 	};

	var methods = {
		init: function(options) {
			settings = $.extend(settings, options);
			appendContainer(this);
			bindHandlers();
			return this.taggable;
		},
		taggable: function(method) {
			if(settings.submitButton !== ""){
				var $input = $(this);
				$(settings.submitButton).on("click", function(event){
					runTaggart(event, $input);
				});
			}
			$(this).on("keydown", function(event) {
				if(event.keyCode === settings.submitKey)
					runTaggart(event, $(this));
			});

			return false;
		}
	};

	function runTaggart(event, $dataSupplier) {
		if(!settings.autoSubmit)
			if($('ul.typeahead.dropdown-menu li.active').is(':visible'))
				return true;

			var $value = $('ul.typeahead.dropdown-menu').is(':visible') ? $('ul.typeahead.dropdown-menu li.active'): $dataSupplier;
			if(($value.text() !== '' || $value.val() !== '') && ($value.text().length >= 3 || $value.val().length >= 3)) {
				var $targetUl = $('.tag-container').children('ul');
				var hasText = false;
        var textFromInput = $value.is('li') ? $value.text() : $value.val()
        var tagList = [];

        if (textFromInput.indexOf(",") !== -1) {
          tagList = splitMultipleTags(textFromInput);
        }

        if(tagList.length > 0) {
        	$.each(tagList, function(index, value){
            checkTagsForDuplication(tagList[index], $targetUl, appendTagCallback);
        	});
        }
        else {
          checkTagsForDuplication(textFromInput, $targetUl, appendTagCallback);
        }

			} else {
				settings.error.call(this, {
					error: 'Cannot add empty tags'
				});

			}
			if($value.is('input'))
				$value.val("");
	}

	function appendContainer(selector) {
		if($('.tag-container').get() < 1)
			$('<div class="tag-container"><ul></ul></div>').insertAfter($(selector));
	}
	function appendTag(value, $targetUl) {
		var $li = $('<li class="'+settings.btnClass+'"><span class="pull-left">'+value+'</span> <span class="remove-tag-span pull-right">X</span></li>');
		if(typeof(settings.send) === 'function' && settings.send !== null){
			settings.send.call(this, value);
		}
		$targetUl.append($li);
	}
	function appendTagCallback(inputText, $targetList, hasText) {
		if(!hasText) {
			appendTag(inputText, $targetList);
		} else {
			settings.error.call(this, {
				error:'Cannot add same tag twice'
			});
		}
	}
	function splitMultipleTags(inputText) {
		var tags = inputText.split(",");
    tags = $.map(tags, function(element){
      return $.trim(element);
    });
    return tags;
	}

  function checkTagsForDuplication(inputText, $targetList, callback) {
    var texts = [];
    var $children = $targetList.children();
    if($children.length > 0) {
      $children.each(function(index, element) {
        texts.push($(element).text().replace(' X', ''));
      });
      if(texts.indexOf(inputText) === -1) {
        return callback(inputText, $targetList, false);
      }
      else {
        settings.error.call(this, {
				  error:'Cannot add same tag twice: ' + inputText
			  });
      }
    }
    else {
      return callback(inputText, $targetList, false);
    }
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
	      	return methods.taggable.apply(this, arguments);
	    } else {
	      	$.error('Method ' +  method + ' does not exist on jQuery.taggart');
	    }
	}
})(jQuery);