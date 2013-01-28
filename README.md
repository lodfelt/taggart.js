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
$("input#article_tag").taggart({
    addUrl: 'some/url/',
    delUrl: 'some/url/'
});
```

We recommend using a settings object with addUrl and delUrl.
Taggart relies on having two or the same url for backend processing.

The default settings are:

``` javascript
var settings = {
    submitButton: 13,
     targetSelector: '.tag-container ul',
 	addUrl: '',
 	delUrl: '',
    btnClass: 'taggart-btn'
}
```
