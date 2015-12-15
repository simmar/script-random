/*------------------------------------------------------------------------------
 JS Document (https://developer.mozilla.org/en/JavaScript)

 project:    project name
 created:    2015-10-07
 author:     simmar

 ----------------------------------------------------------------------------- */
'use strict';

/*  =CONSTANTES
 ----------------------------------------------------------------------------- */
//jQuery.noConflict();
var d = document;
var w = window;
var pm = pm || {};


/*  =EXAMPLE
 ----------------------------------------------------------------------------- */

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
pm.random = function () {
    var values = [];
    var max = 20;
    var min = 1;

    var ChoiceGift = function () {

        for (var i = min; values.length < max; i++) {
            // sortir une nouvelle valeur
            var new_value = getRandomInt(min, max);

            // vérifier si nouvelle valeur pas déja sortie
            var is_new_value = values.indexOf(new_value) < 0; // true / false

            if (is_new_value) {
                console.log(new_value, 'pas un chiffre sorti');

                // dans tous les cas on stocke la nouvelle valeur
                values.push(new_value);
            } else(
                console.log(new_value, 'ok c un chiffre sorti')
            );

        }

        var prev_color = null;
        for (var index = 0; index < values.length; index++) {
            var obj = values[index];
            var $case = $('<div class="case"><p>' + obj + '</p></div>');


            $('#page').append($case);

            // verifie que la couleur de la case d'avant n'est pas la meme que celle que tu vas écrire
            // sinon, on relance le dé autant de fois que necessaire
            var new_color = getRandomInt(1, 4); // 4
            while (new_color == prev_color){
                console.log('relance le dé');
                new_color = getRandomInt(1, 4);  //4
            }
            prev_color = new_color; // 4



            //closure permet de manipuler chaque élément
            (function(index, $case, color){
                var delay = 100 + (index * 100);
                setTimeout(function () {
                    $case.addClass('anim color-' + color);
                }, delay);
            })(index, $case, new_color); // fonction autoexecutée

        }


        $('#JS_random').remove();
    };

    // Init form validation
    $('#JS_random').on('click', ChoiceGift);


    this.num = values;
};

/*  =WINDOW.ONLOAD
 ----------------------------------------------------------------------------- */
$(d).ready(function () {

    pm.random();               // Init cookies cnil banner


    $('body').on('click', '.case', function () {
        $(this).addClass('active');
    });

});

/* END */