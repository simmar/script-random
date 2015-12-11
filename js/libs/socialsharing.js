/**
 * Module for social sharing functions
 * Twitter and Facebook
 */
var socialSharing = (function () {
    'use strict';

    var ROOT_URL = '';

    /**
     * shareTwitter
     * Open a popup with twitter share url
     * @param e
     */
    var shareTwitter = function(e){

        e.preventDefault();

        var $button = $(e.currentTarget);
        var text_to_share = encodeURIComponent($button.attr('data-twitter-text'));
        var url_to_share = $button.attr('data-twitter-url');
        var tweetUrl =  'http://twitter.com/share?url=' +
            encodeURI(url_to_share) +
            '&text=' + text_to_share+ ';source=webclient';

        var width  = 575,
            height = 400,
            left   = ($(window).width()  - width)  / 2,
            top    = ($(window).height() - height) / 2,
            url    = this.href,
            opts   = 'status=1' +
                ',width='  + width  +
                ',height=' + height +
                ',top='    + top    +
                ',left='   + left;

        window.open(tweetUrl, 'tweet', opts);

    };


    /**
     * ShareFacebook
     * @constructor
     */

    var ShareFacebook = function () {

        var current_domain = (document.domain).replace('www.', ''); // removing potential 'www.' prefix
        if(typeof fb_app_id[current_domain] === 'undefined'){
            console.error('facebook app id is undefined, please check if one is created for this domain name');
        }
        // Special case for krypton _html
        var path = '/';
        if(document.location.href.indexOf('/_html/') > 0){
            path = ('/_html/');
        }

        ROOT_URL = location.protocol + '//www.' + current_domain + path;

        // fb_app_id is set in head.inc.php
        var APP_ID = fb_app_id[current_domain];
        if (pm.debug) {
            console.log('APP_ID',APP_ID);
        }


        // facebook creates a script tag to load the 'FB' object
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s); js.id = id;
            js.src = '//connect.facebook.net/fr_FR/all.js#xfbml=1&appId='+APP_ID;
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    };


    /**
     * ShareFacebook.prototype.postToFeed
     * Opens a facebook window (using facebook api) :  associate this function to links 'facebook share'
     * @param e
     */
    ShareFacebook.prototype.postToFeed = function (e) {

        //console.log('postToFeed',e.currentTarget);

        e.preventDefault();
        var $button = $(e.currentTarget),
            thumb_src = $button.attr('data-fb-thumb-src'),
            text_name = $button.attr('data-fb-text-name'),
            text_caption = $button.attr('data-fb-text-caption'),
            text_description = $button.attr('data-fb-text-description');
        var URL_TO_SHARE = $button.attr('data-fb-url');
        if (URL_TO_SHARE === '' || URL_TO_SHARE === null || URL_TO_SHARE === undefined) {
            URL_TO_SHARE =  document.location.href;
        }

        if (pm.debug){
            console.log('share image', ROOT_URL + thumb_src);
        }


        // https://developers.facebook.com/docs/sharing/reference/share-dialog
        var obj = {
            method: 'feed', // 'share_open_graph' or 'share',
            link: URL_TO_SHARE,
            picture: ROOT_URL + thumb_src, // width < 300
            name: text_name,
            caption: text_caption,
            description: text_description
        };

        function callback(response) {
            if(response){
                //console.log('response',response)
            }
        }
        // calling the API. Opens a fb window
        FB.ui(obj, callback);
    };

    /**
     * Main init function
     */
    var init = function () {
        if(pm.debug){
            console.log('SocialSharing:init');
        }
        // Init share twitter
        $('.JS_twitter-share').bind('click', shareTwitter);

        // Init share facebook
        var shareFB =  new ShareFacebook();
        $('.JS_facebook-share').bind('click', shareFB.postToFeed);
    };


    return {
        init: init
    };


})();

