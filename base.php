<?php include('inc/head.inc.php'); ?>

<body>
<div id="content" class="line">
    <div id="page" class="line">
        <div id="JS_random">
            <img src="img/skin/Excitedbabyisexcited.gif" alt="">
        </div>

        <form action="#" method="get" class="form form-recup posr inscription">
            <label for="essai">Précisez votre nom</label>
            <input id="name"
                   name="name"
                   type="text"
                   class="form-text">

            <div class="button">
                <button type="button" class="affiche">affiche</button>
                <!--type button ne soumet pas au formulaire -->
            </div>

            <div id="affichageValue">

            </div>
        </form>

        <div class="block-case"></div>

    </div>
    <!-- #page -->
</div>
<!-- #content -->

<?php include('inc/scripts.inc.php'); ?>
</body>
</html>
