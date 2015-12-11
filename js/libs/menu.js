/**
 * Module for social sharing functions
 * Twitter and Facebook
 */
var menu = (function () {
    'use strict';

    var CSSCLASS_MASKVISIBLE = 'visible';
    var CSSCLASS_ITEMACTIVE = 'active';
    var CSSCLASS_CLOSE_LAYER = 'close-layer';
    var TIMEOUTclose = 0;

    var $navlinks;
    var $currentnav;
    var $mask;

    /**
     * Open the mask
     * @private
     */
    var _openMask = function () {
        $mask.on('click', _closeAll);
        $mask.addClass(CSSCLASS_MASKVISIBLE);
    };
    /**
     * Close the mask
     * @private
     */
    var _closeMask = function () {
        $mask.off('click', _closeAll);
        $mask.removeClass(CSSCLASS_MASKVISIBLE);
    };

    /**
     * Close the open layer and the mask
     * @private
     */
    var _closeAll = function () {
        if ($currentnav) {
            _close($currentnav);
            $currentnav = null;
            _closeMask();
        }
    };
    /**
     *
     * @param $link {Object} jQuery menu nav element
     * @private
     */
    var _open = function ($link) {
        clearTimeout(TIMEOUTclose);
        if (!$mask.hasClass(CSSCLASS_MASKVISIBLE)) {
            _openMask();
        }
        var $panel = $($link.data('hash') || $link.prop('hash'));
        if ($panel.data('rolloout')) {

            $panel.on('mouseleave', function () {
                TIMEOUTclose = setTimeout(function () {
                    _closeAll();
                }, 500);
            });
            $panel.on('mouseenter', function () {
                clearTimeout(TIMEOUTclose);
            });

        }
        $panel.addClass(CSSCLASS_ITEMACTIVE);
        $link.addClass(CSSCLASS_ITEMACTIVE);

        $currentnav = $link

    };

    /**
     *
     * @param $link {Object} jQuery menu nav element
     * @private
     */
    var _close = function ($link) {
        var $panel = $($link.data('hash') || $link.prop('hash'));

        $panel.removeClass(CSSCLASS_ITEMACTIVE);
        $link.removeClass(CSSCLASS_ITEMACTIVE);
        if ($panel.data('rolloout')) {
            $panel.off('mouseenter mouseleave');
        }

    };

    var _control = function (e) {
        var $link = $(this);
        var isopen = $link.is($currentnav);

        if (isopen && e.type !== 'mouseenter' || $link.hasClass(CSSCLASS_CLOSE_LAYER)) {
            _closeAll();
        }
        else {
            $currentnav && _close($currentnav);
            _open($link);
        }
        return false;
    };

    var closeAll = function () {
        _closeAll();
    };

    /**
     * Main init function
     */
    var init = function () {
        if (pm.debug) {
            console.log('menu:init');
        }

        // mask should be an option

        $navlinks = $('.JS_menu-nav');
        $currentnav = null;

        $mask = $('<div>').addClass('layer-mask');
        $('body').append($mask);

        $navlinks.each(function () {

            var $link = $(this);
            var layerType = $link.data('layer-type');
            var _event = 'click mouseenter';

            if (layerType === 'click') {
                _event = 'click';
            }

            $link.on(_event, _control);

        });
        $('.' + CSSCLASS_CLOSE_LAYER).on('click', _control);

    };

    return {
        init: init,
        externalClose: closeAll
    };

})();

menu.init();
