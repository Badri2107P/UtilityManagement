<?php 
 $num = $_POST["dist"];

 $s = file_get_contents($num);
// echo $s;
 $a='<table class="featureInfo">';
 $b='<table id="details">';
 echo str_replace($a,$b , $s);

//echo  ".$s.";
?>