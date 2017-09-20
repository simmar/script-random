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


    // Au clic sur une vignette on récupere les valeurs du nom et de son score et on l'affiche
    $blockCase.on('click', '.case', function () {

        //get number
        var number = $(this).data('number');

        var nameVal = $('#name').val();

        if(!nameVal == '' && nameVal.length >= 3) {

            $blockCase.addClass('active');// add Class for animation

            //get name
            var aScore = JSON.parse(localStorage.getItem('result')) || [];
            aScore.push({name: nameVal, score: number});// insérer en fin de tableau

            aScore.sort(function (a, b) {
                return a.score < b.score;
            });

            localStorage.setItem('result', JSON.stringify(aScore));

            $(this).addClass('active');

            var $form = $('.form-recup');
            var $inside = $form.find('#affichageValue');

            var html = '';// déclaration de variable type string pour dire qu'elle est vide!!

            // variable pour afficher et limiter a 5 résultats
            var length = Math.min(5, aScore.length);

            //boucle pour afficher tt les données du tableau
            for (var i = 0; i < length; i++) {
                var obj = aScore[i];
                html += "<p>" + obj.name + " " + obj.score + "</p>"; // ajout du contenu sans écraser les valeurs précédente
            }

            $inside.html(html);
            var displayParticipant = $('#affichageParticipant');
            displayParticipant.html('Le nombre total de participant est de ' + aScore.length).css({
                color:'red',
                'font-size': '24px'
            });
            displayParticipant.addClass('active');

            if($(this).hasClass('active')) {
                $(this).closest('#page').find("input[type=text], textarea").val("");
            }
            // todo obliger trois lettres minimum
        }
    });
};


/*  =WINDOW.ONLOAD
 ----------------------------------------------------------------------------- */
$(d).ready(function () {

    pm.random();
    localStorage.clear();
    
});

/* END */