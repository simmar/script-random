<?php include('inc/head.inc.php'); ?>

<body>
<div id="content" class="line">
    <div id="page" class="line">
        <div id="JS_random">
            <img src="img/skin/Excitedbabyisexcited.gif" alt="">
        </div>

        <form action="#" method="get" class="form form-recup posr inscription">
            <label for="essai">Précisez votre nom <br><span>3 lettres</span></label>
            <input id="name"
                   name="name"
                   type="text"
                   class="form-text">

            <p class="scores">SCORES</p>
            <div id="affichageValue"></div>
            <div id="affichageParticipant"></div>
        </form>

        <div class="block-case"></div>

    </div>
    <!-- #page -->
</div>
<!-- #content -->

<?php include('inc/scripts.inc.php'); ?>
</body>
</html>
