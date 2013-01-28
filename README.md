taggart.js
==========

Simple tagging library extending jQuerys own object and Twitter bootstrap .typeahead().
Need tagging along with Twitter Bootstraps typeahead?

Introducing Taggart.js - named after the grumpy sergeant in Beverly Hills Cop.

Installing?

Download taggart.js and put in your js-folder and include it after jQuery.

Done!

Use?
``` javascript
$("input#article_tag").taggart();
```

We recommend using a settings object specifying submitButton and a targetSelector.
Taggart doesn't rely on urls, you have to Axel Foley that by yourself in your send-callback, if you want.

The default settings are:

``` javascript
var settings = {
    submitButton: 13,
    targetSelector: '.tag-container ul',
    btnClass: 'taggart-btn'
}
```

Optional settings include

``` javascript
    send: function(data){
    },
    remove: function(data){
    }
```

Specifying a callback function is the default way of hooking up your backend to taggart.
Taggart will always remove the element from the list after the callback has been processed.
This is how grumpy Taggart is.


