<?php 
 require('connect.php');
 $num = $_POST["dist"];
 $s = file_get_contents($num);
$str = substr($s, strpos($s, 'water_source.'),14);
 $a='water_source.';
 $b='';
 $e= str_replace($a,$b , $str);
$query="SELECT * FROM public.water_source where gid=$e";
$result = pg_query($connection, $query) or die("Error".pg_last_error());
$pop = pg_fetch_result($result, 0, 2);
$tot=pg_fetch_result($result, 0, 4);
$con=pg_fetch_result($result, 0, 5);
$per=pg_fetch_result($result, 0, 6);
		//echo '<td>' . $meta->person . '</td>';
$x=(100*$con)/$pop;
//echo $x;
$y=$x/100;
//echo $y;
//echo "$con,";
$i=0;
//echo $tot;

while($con <$tot)
{
	//echo "true";
	//echo $con;
	$inc = ($pop/100);
	$inc1 = $inc * $per;
	//echo $inc1;
	//echo $inc;
	$z=$inc1*$y;
	//echo $z;
	$r=$con+$z;
	if($r < $tot){
	$con+=$z;
	//echo "$con<br/>";
	$i+=10;
}else{
	$t=rand(1,10);
	$i+=$t;
	break;
}
	//echo $r;
	//echo "$i<br/>";
}
echo $i;
?>