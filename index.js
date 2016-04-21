'use strict';
var cheerio = require('cheerio');
var _ = require('underscore');
var multiline = require('multiline');

var template = _.template(multiline(function() {
  /*
     <a href="<%= url %>" title="<%= title %>" class="fancybox">
       <img src="<%= url %>" alt="<%= title %>"></img>
     </a>
   */
}));

module.exports = {
  book: {
    assets: './assets',
    js: [
      'jquery.min.js',
      'jquery.fancybox.pack.js',
      'jquery.fancybox-buttons.js',
      'plugin.js'
    ],
    css: [
      'jquery.fancybox.css',
      'jquery.fancybox-buttons.css'
    ]
  },
  hooks: {
    page: function(page) {
      var $ = cheerio.load(page.content);

      $('img').each(function(index, img) {
        var $img = $(img);
        $img.replaceWith(template({
          url: $img.attr('src'),
          title: $img.attr('alt')
        }));
      });

      page.content = $.html();

      return page;
    }
  }
};
