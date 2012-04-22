/**
 * jQuery Broken Neon effect 1.0.0
 *
 * Copyright (c) 2012 Stéphane Gully
 *
 */
(function($) {

    $.fn.brokenNeon = function(method) {

        var methods = {

            init : function(options) {
                this.brokenNeon.settings = $.extend({}, this.brokenNeon.defaults, options);
                return this.each(function() {
                    var $element = $(this), // reference to the jQuery version of the current DOM element
                         element = this;    // reference to the actual DOM element

                    //helpers.slow_effect(element);
                });
            },

            slow: function () {
                helpers.slow_effect($(this));
            },
            fast: function () {
                helpers.fast_effect($(this));
            },
        }

        var helpers = {
            slow_effect: function(elt) {
                var element = $(elt);
                element.stop()
                    .css('opacity', 1)
                    .css('display', 'block')
                    .wait(Math.random()*1000)
                    .animate({opacity: 0}, 0)
                    .wait(50)
                    .animate({opacity: 1}, 0, function() {
                        setTimeout(function() {
                            helpers.slow_effect(element);
                        }, Math.random()*10000);
                    });
            },
 
            fast_effect: function(elt) {
                var min_opacity = Math.abs(Math.random()-0.5);
                $(elt).stop()
                    .css('opacity', min_opacity)
                    .css('display', 'block')
                    .wait(Math.random()*100)
                    .animate({opacity: 1}, 0)
                    .wait(100+Math.random()*500)
                    .animate({opacity: min_opacity}, 0, function() {
                        setTimeout(function() {
                            helpers.fast_effect(elt);
                        }, 10);
                    });
            },
 
            off_effect: function(elt) {
                $(elt).stop()
                    .css('opacity', 1)
                    .css('display', 'block')
                    .animate({opacity: 0}, 0).wait(50).animate({opacity: 1}, 0)
                    .animate({opacity: 0.6}, 200)
                    .animate({opacity: 0}, 0).wait(20).animate({opacity: 0.6}, 0)
                    .animate({opacity: 0}, 200);
            },
 
            on_effect: function(elt) {
                $(elt).stop()
                    .css('opacity', 0)
                    .css('display', 'block')
                    .animate({opacity: 0.3}, 200)
            //        .animate({opacity: 0}, 10).animate({opacity: 0.3}, 10)
                    .animate({opacity: 0.6}, 200)
                    .animate({opacity: 0}, 15).animate({opacity: 0.6}, 5)
                    .animate({opacity: 1}, 200);
            }
 
        }

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error( 'Method "' +  method + '" does not exist in brokenNeon plugin!');
        }

    }
    
    $.fn.wait = function(time, type) {
        time = time || 1000;
        type = type || "fx";
        return this.queue(type, function() {
            var self = this;
            setTimeout(function() {
                $(self).dequeue();
            }, time);
        });
    }
    
    $.fn.brokenNeon.defaults = {}

    $.fn.brokenNeon.settings = {}

})(jQuery);