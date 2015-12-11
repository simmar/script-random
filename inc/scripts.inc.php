
<!-- If urlparam='prod' : used concatened and minified scripts -->
<?php if (isset($_GET['prod'])) : //  ?>

    <script type="text/javascript" src="js/build/vendors.min.js"></script>
    <script type="text/javascript" src="js/build/main.min.js"></script>

<?php else : ?>

    <!-- Vendors scripts : copy those files in Gruntfile for production -->
    <script src="js/vendor/jquery.js"></script>

    <!-- Application scripts : copy those files in Gruntfile for production -->
    <script src="js/base.js"></script>

<?php endif ?>






