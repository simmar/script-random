var scrollto = function (arg) {
    var argument = arg;
    var destination = 0;
    var $scrollToThisElem;
    var duration = 500;
    var $trigger;
    if (/click|scrollto/.test(arg.type)) {
        $trigger = $(this);
        argument = $trigger.data('scrollto');
        arg.preventDefault();
    }

    if (typeof argument === 'number') {
        destination = argument;
    }
    if (typeof argument === 'string') {
        if (argument[0] === '.') {
            argument = $(argument);
        }
        else {
            $scrollToThisElem = $('#' + argument);
            if ($scrollToThisElem.length) {
                destination = $scrollToThisElem.offset().top;
            }
            else {
                console.error('No ID element found, selector was: #', argument);
            }
        }

    }
    if (typeof argument === 'object') {
        $scrollToThisElem = argument;
        if ($scrollToThisElem.length) {
            destination = $scrollToThisElem.offset().top;
        }
        else {
            console.error('No jQuery element found, selector was: ', $scrollToThisElem.selector);
        }
    }

    var $scroller = $('html,body');
    $scroller.animate(
        {
            scrollTop: destination
        },
        {
            easeing: '',
            duration: duration
        }
    ).promise().done(
        function () {
            $trigger.trigger('scrolledto');
        }
    );
    return $scroller;
};

$(document).on('ready', function () {
    var $link = $('[data-scrollto]');
    $link.on('click scrollto', scrollto);
});
