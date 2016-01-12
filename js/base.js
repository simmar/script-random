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

    var $blockCase = $('.block-case');

    var ChoiceGift = function () {

        for (var i = min; values.length < max; i++) {
            // sortir une nouvelle valeur
            var new_value = getRandomInt(min, max);

            // v�rifier si nouvelle valeur pas d�ja sortie
            var is_new_value = values.indexOf(new_value) < 0; // true / false

            if (is_new_value) {
                //console.log(new_value, 'pas un chiffre sorti');
                // dans tous les cas on stocke la nouvelle valeur
                values.push(new_value);
            }

        }

        var prev_color = null;

        for (var index = 0; index < values.length; index++) {
            var obj = values[index];
            var $case = $('<div class="case" data-number="' + obj + '"><p class="number">' + obj + '</p></div>');

            $blockCase.append($case);

            // verifie que la couleur de la case d'avant n'est pas la meme que celle que tu vas �crire
            // sinon, on relance le d� autant de fois que necessaire
            var new_color = getRandomInt(1, 4); // 4
            while (new_color == prev_color) {
                new_color = getRandomInt(1, 4);  //4
            }
            prev_color = new_color; // 4

            //closure permet de manipuler chaque �l�ment
            (function (index, $case, color) {
                var delay = 100 + (index * 100);
                setTimeout(function () {
                    $case.addClass('anim color-' + color);
                }, delay);
            })(index, $case, new_color); // fonction autoexecut�e

        }

        $('#JS_random').remove();
        $('.inscription').addClass('active');
    };

    // Init form validation
    $('#JS_random').on('click', ChoiceGift);

    this.num = values;


    $blockCase.on('click', '.case', function () {

        //get number
        var number = $(this).data('number');

        //get name
        var aScore = JSON.parse(localStorage.getItem('result')) || [];
        
        aScore.push({name:$('#name').val(), score:number});// insérer en fin de tableau
        localStorage.setItem('result', JSON.stringify(aScore));

        var $form = $('.form-recup');
        var $inside = $form.find('#affichageValue');

        var html = '';// déclaratiobn de variable type string vide!!

        for (var key in aScore) {
            aScore.sort();
            html += "<p>" + aScore[key].name + " " + aScore[key].score + "</p>"; // ajout du contenu sans écraser les valeurs précédente

            //html =  html + "<p>" + prop + " " + obj[prop] + "</p>"; // idem que la ligne du dessus
        }

        $inside.html(html);

    });

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