<!DOCTYPE html>
<!--[if IE 6]><html class="loading noJS msie msie6"><![endif]-->
<!--[if IE 7]><html class="loading noJS msie msie7"><![endif]-->
<!--[if IE 8]><html class="loading noJS msie msie8"><![endif]-->
<!--[if IE 9]><html class="loading noJS msie msie9"><![endif]-->
<!--[if !IE]><!--><html class="noJS"><!-- <![endif]-->
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <?php
        //get current file name and print it in the <title>
        $currentFile = $_SERVER["SCRIPT_NAME"];
        $parts = Explode('/', $currentFile);
        $currentFile = $parts[count($parts) - 1];
    ?>
    <title><?php echo $currentFile; ?> | My project title</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet" href="css/all.css">
    <!-- ie icon bug on load -->
    <style>
        .msie.loading .icon:before {
            content: '' !important;
        }

    </style>

    <script src="js/vendor/modernizr.min.js"></script>
</head>