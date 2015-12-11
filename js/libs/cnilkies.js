/* basic function */
/**
 * target:
 *
 ** check cookies
 ** set cookies
 ** options
 *** element (DOM)
 *** callbacks on accept
 *** tracking
 *** language?
 ***
 *
 *
 *
 *
 */
var CookieBanner = function (options) {
    'use strict';

    var cookieName = 'c_cookies';
    var $elementClickAccept = options.$element.find('.' + options.buttonAcceptClass);

    if(pm.debug){
        console.log('CookieBanner:options', options);
        console.log('CookieBanner:$elementClickAccept', $elementClickAccept);
    }

    var onCookieNotSet = options.onCookieNotSet || function () {};
    var onAccept = options.onAccept || function () {};

    var get13month = function () {
        var z = new Date();
        var month = z.getMonth() + 1;
        var year = z.getFullYear() + 1;
        if (month > 11) {
            month = 0;
            year++;
        }
        return new Date(year, month, z.getDay(), z.getHours(), z.getMinutes(), z.getSeconds(), z.getMilliseconds());

    };

    var _onUserAccept = function () {
        setCookie(cookieName, true, get13month());
        onAccept();

        // unbind
        $(window).off('scroll', _onUserAccept);
        $(window).off('click',_onUserAccept);
        $elementClickAccept.off('click', _onUserAccept);

    };

    // ugly functions to handle cookies taken from: http://www.w3schools.com/js/js_cookies.asp
    // with some improvements: escape/unescape functions changed to encodeURIComponent/decodeURIComponent
    function getCookie(c_name) {
        var i, x, y, ARRcookies = document.cookie.split(';');
        for (i = 0; i < ARRcookies.length; i++) {
            x = ARRcookies[i].substr(0, ARRcookies[i].indexOf('='));
            y = ARRcookies[i].substr(ARRcookies[i].indexOf('=') + 1);
            x = x.replace(/^\s+|\s+$/g, '');
            if (x === c_name) {
                return decodeURIComponent(y);
            }
        }
    }

    function setCookie(c_name, value, exdays) {
        var c_value = encodeURIComponent(value) + ((exdays === null) ? '' : '; expires=' + exdays.toUTCString()) + '; path=/ ; domain =.' + document.location.host;
        document.cookie = c_name + '=' + c_value;
    }

    if (!getCookie(cookieName)) {
        if(pm.debug){
            console.info('CookieBanner:getCookie(cookieName)', cookieName);
        }
        onCookieNotSet();
        if (options.activation.button) {
            $elementClickAccept.on('click', _onUserAccept);
        }
        if (options.activation.scroll) {
            $(window).on('scroll',_onUserAccept);
        }
        if (options.activation.document_click) {
            $(window).on('click',_onUserAccept);
        }
    }
    else {
        onAccept();
    }

    this.setCookies = setCookie;
};



