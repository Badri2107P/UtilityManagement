<?php 
session_start();
 require('connect.php');
if (isset($_SESSION['username'])){
$username = $_SESSION['username'];
}
else{
	header("Location: login.php");
   exit;
}
?>

<!DOCTYPE html>
<html>
<head>
 <meta charset="utf-8" />
    <title>OpenLayers 3 - LayerSwitcher &amp; Popup</title>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no, width=device-width">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ol3/3.17.1/ol.css" />
    <link rel="stylesheet" href="https://rawgit.com/walkermatt/ol3-layerswitcher/master/src/ol3-layerswitcher.css" />
    <link rel="stylesheet" href="https://rawgit.com/walkermatt/ol3-layerswitcher/master/examples/layerswitcher.css" />
    <link rel="stylesheet" href="https://rawgit.com/walkermatt/ol3-popup/master/src/ol3-popup.css" />
<link rel="stylesheet" href="styles.css">
<script href="drpdwnfn.js"></script>
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
    <link rel="stylesheet" href="https://openlayers.org/en/v4.6.4/css/ol.css" />
    <link rel="stylesheet" href="../a/src/ol-popup.css" />
    <link rel="stylesheet" href="popup.css" />
	<script src="https://openlayers.org/en/v4.6.4/build/ol.js"></script>
</head>
<body>

<div class="header">
  <a href="index.php" class="logo">GIS System</a>
  <div class="header-right">
    <p>Govt of Telangana utility management system</p>
   <div class="uname dropdown">
Welcome <?php echo $username;?>
    <div class="dropdown-content"  >
      <a href="logout.php">Logout</a>
    </div>
  
</div>
</div>
</div>
<div class="topnav">
  <a href="home.php">Electric Board</a>
  <a href="waterboard.php">Water Board</a>
    <div class="dropdown active">
    <button class="dropbtn active">Road Management
      <i class="fa fa-caret-down"></i>
    </button>
    <div class="dropdown-content">
      <a href="#" id="water" onclick="Checkconst();">Show Poor Roads</a>
	  <a href="#" id="water" onclick="Checkht();">Show roads overlaped by htpoles</a>
	<a href="#" id="water" onclick="Checksw();">Show roads overlaped by sewage lines</a>
</div>
</div>
 <a href="sewagemanagement.php">Sewage Management</a>
    </div>
  </div> 
</div>
<div class="row">
  <div class="column1" style="background-color:#fff;">
 <center>
    <h3>Select Zone</h3>
<select id="zone" onChange="changedist(this.value);">
<?php 
$query = 'SELECT * FROM public.zone';
//echo $query;
//"<h3>" .  $query . "</h3>";
$sql = pg_query($connection, $query);
while ($row = pg_fetch_assoc($sql)){
echo "<option value=".$row['zone'].">". $row['zone'] ."</option>";
}
?>
</select>

<br/>
<h3>Select District</h3>
	<select select id="district" onChange="changesubreg(this.value);">
<option value="" disabled selected>Select</option>
</select>
<script type="text/javascript">
function changedist(value) {
	CenterMap(78.7047,10.7905,9);
		$.post('getdistricts.php', { dist: value }, function(result) { 
		//alert(result);
		document.getElementById("district").innerHTML = result;
		});
		}
	</script>
	<br/>
<h3>Select Sub Register Office</h3>
	<select select id="subreg" onChange="changevillage(this.value);">
<option value="" disabled selected>Select</option>
</select>
<script type="text/javascript">
function changesubreg(value) {
	CenterMap(78.682419,10.830512,12);
		$.post('getsubreg.php', { dist: value }, function(result) { 
		//alert(result);
		document.getElementById("subreg").innerHTML = result;
		});
		}
	</script>
	<br/>
<h3>Select Village</h3>
	<select select id="village" onChange="CenterMap(78.65837,10.81130,16);">
<option value="" disabled selected>Select</option>
</select>
<script type="text/javascript">
function changevillage(value) {
	CenterMap(78.65837,10.81130,12);
		$.post('getvillage.php', { dist: value }, function(result) { 
		//alert(result);
		document.getElementById("village").innerHTML = result;
		});
		}
	</script>
	</div>
  <div class="column2" style="background-color:#fff;">
  <div id="map"></div>
    <!-- The line below is only needed for old environments like Internet Explorer and Android 4.x -->
    <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=requestAnimationFrame,Element.prototype.classList,URL"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/ol3/3.17.1/ol.js"></script>
    <script src="https://rawgit.com/walkermatt/ol3-layerswitcher/master/src/ol3-layerswitcher.js"></script>
    <script src="https://rawgit.com/walkermatt/ol3-popup/master/src/ol3-popup.js"></script>
    <script src="../a/dist/ol-popup.js"></script>
    <script src="roadmanagement.js"></script>
  </div>
  
</div>
<script>
function getdata(value) {
		$.post('getdetails.php', { dist: value }, function(result) { 
		//alert(result);
		document.getElementById("details").innerHTML = result;
		});
		changedist(this.value);
}

function updatedata(plotid,unique_id,aad_no,state,zone,district,sub_rg_off,village,ward,sr_no,subdiv_no,plot_no,area,bk_val,reg_date){
	$.post('updatedetails.php', {plotid:plotid,unique_id:unique_id,aad_no:aad_no,state:state,zone:zone,district:district,sub_rg_off:sub_rg_off,village:village,ward:ward,sr_no:sr_no,subdiv_no:subdiv_no,plot_no:plot_no,area:area,bk_val:bk_val,reg_date:reg_date }, function(result) { 
		alert(result);
		//document.getElementById("details").innerHTML = result;
		});
}
</script>
</body>
</html>
