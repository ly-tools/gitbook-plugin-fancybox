require([
    'gitbook'
], function(gitbook) {
    gitbook.events.on('start', function(e, config) {
        $('.fancybox').fancybox(config.fancybox);
    });
});