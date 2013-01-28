taggart.js
==========

Simpe tagging library extending jQuerys own object.

Installing?

Download taggart.js and put in your js-folder after jQuery.

Done!

Use?
``` javascript
$("input#article_tag").taggart({
    addUrl: 'where'
    delUrl: 'where'
});
```

We recommend using a settings object with addUrl and delUrl.
Taggart relies on having two or the same url for backend processing.
