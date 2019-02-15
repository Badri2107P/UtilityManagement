		var cqllayer =new ol.layer.Tile({
						opacity: 1,
						visible:false,
                        source: new ol.source.TileWMS({
						url: 'http://localhost:8080/geoserver/plot/wms',
						params: {'LAYERS': 'plot:dt', 'TILED': true },
						serverType: 'geoserver',
						// Countries have transparency, so do not fade tiles:
						transition: 0
					  }),
                    });

var ltline =new ol.layer.Tile({
						opacity: 0.75,
						visible:true,
                        title: 'ltline',
                        source: new ol.source.TileWMS({
						url: 'http://localhost:8080/geoserver/plot/wms',
						params: {'LAYERS': 'plot:ltline', 'TILED': true },
						serverType: 'geoserver',
						// Countries have transparency, so do not fade tiles:
						transition: 0
						
					  }),
                    });
					
					var roads =new ol.layer.Tile({
						opacity: 0.75,
						visible:true,
                        title: 'roads',
                        source: new ol.source.TileWMS({
						url: 'http://localhost:8080/geoserver/plot/wms',
						params: {'LAYERS': 'plot:roads', 'TILED': true },
						serverType: 'geoserver',
						// Countries have transparency, so do not fade tiles:
						transition: 0
						
					  }),
                    });
					
					var highsupply =new ol.layer.Tile({
						opacity: 0.75,
						visible:false,
                        source: new ol.source.TileWMS({
						url: 'http://localhost:8080/geoserver/plot/wms',
						params: {'LAYERS': 'plot:dt_buffer', 'TILED': true },
						serverType: 'geoserver',
						// Countries have transparency, so do not fade tiles:
						transition: 0
						
					  }),
                    });
					var building =new ol.layer.Tile({
						opacity: 0.75,
						visible:true,
                        title: 'building',
                        source: new ol.source.TileWMS({
						url: 'http://localhost:8080/geoserver/plot/wms',
						params: {'LAYERS': 'plot:building', 'TILED': true },
						serverType: 'geoserver',
						// Countries have transparency, so do not fade tiles:
						transition: 0
						
					  }),
                    });
					var ltpole =new ol.layer.Tile({
						opacity: 1,
						visible:true,
                        title: 'ltpole',
                        source: new ol.source.TileWMS({
						url: 'http://localhost:8080/geoserver/plot/wms',
						params: {'LAYERS': 'plot:ltpole', 'TILED': true },
						serverType: 'geoserver',
						// Countries have transparency, so do not fade tiles:
						transition: 0
						
					  }),
                    });
					var htline =new ol.layer.Tile({
						opacity: 0.75,
						visible:true,
                        title: 'htline',
                        source: new ol.source.TileWMS({
						url: 'http://localhost:8080/geoserver/plot/wms',
						params: {'LAYERS': 'plot:htline', 'TILED': true },
						serverType: 'geoserver',
						// Countries have transparency, so do not fade tiles:
						transition: 0
						
					  }),
                    });
					var htpole =new ol.layer.Tile({
						opacity: 1,
						visible:true,
                        title: 'htpole',
                        source: new ol.source.TileWMS({
						url: 'http://localhost:8080/geoserver/plot/wms',
						params: {'LAYERS': 'plot:htpole', 'TILED': true },
						serverType: 'geoserver',
						// Countries have transparency, so do not fade tiles:
						transition: 0
						
					  }),
                    });
					var dt =new ol.layer.Tile({
						opacity: 1,
						visible:true,
                        title: 'dt',
                        source: new ol.source.TileWMS({
						url: 'http://localhost:8080/geoserver/plot/wms',
						params: {'LAYERS': 'plot:dt', 'TILED': true },
						serverType: 'geoserver',
						// Countries have transparency, so do not fade tiles:
						transition: 0
						
					  }),
                    });
var view = new ol.View({
            center: ol.proj.transform([78.67996,10.76507], 'EPSG:4326', 'EPSG:3857'),
            zoom: 16
        })

var map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Group({
                'title': 'Base maps',
                layers: [
                    new ol.layer.Tile({
                        title: 'OSM',
                        type: 'base',
                        visible: true,
                        source: new ol.source.OSM()
                    })
                ]
            }),
            new ol.layer.Group({
                title: 'Overlays',
                layers: [htpole,htline,ltpole,ltline,dt,cqllayer,building,highsupply,roads]
            })
        ],
        view
    });

    // LayerSwitcher

    var layerSwitcher = new ol.control.LayerSwitcher({
        tipLabel: 'Légende' // Optional label for button
    });
    map.addControl(layerSwitcher);

    // Popup

var popup = new Popup();
map.addOverlay(popup);

  /*  map.on('singleclick', function(evt) {
        var prettyCoord = ol.coordinate.toStringHDMS(ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326'), 2);
        popup.show(evt.coordinate, '<div><h2>Coordinates</h2><p>' + prettyCoord + '</p></div>');
    });*/
	
function CenterMap(long, lat , zoom) {
    console.log("Long: " + long + " Lat: " + lat);
    map.getView().setCenter(ol.proj.transform([long, lat], 'EPSG:4326', 'EPSG:3857'));
    map.getView().setZoom(zoom);
}



map.on('singleclick', function(evt) {
	var viewResolution = /** @type {number} */ (map.getView().getResolution());
if(htline.getVisible()){
	var url = htline.getSource().getGetFeatureInfoUrl(evt.coordinate, viewResolution,
        'EPSG:3857', {'INFO_FORMAT': 'text/html'});
		console.log(url);
}
if(htpole.getVisible()){
	var url = htpole.getSource().getGetFeatureInfoUrl(evt.coordinate, viewResolution,
        'EPSG:3857', {'INFO_FORMAT': 'text/html'});
		console.log(url);
}
if(ltline.getVisible()){
	var url = ltline.getSource().getGetFeatureInfoUrl(evt.coordinate, viewResolution,
        'EPSG:3857', {'INFO_FORMAT': 'text/html'});
		console.log(url);
}
if(ltpole.getVisible()){
	var url = ltpole.getSource().getGetFeatureInfoUrl(evt.coordinate, viewResolution,
        'EPSG:3857', {'INFO_FORMAT': 'text/html'});
		console.log(url);
}
if(dt.getVisible()){
	var url = dt.getSource().getGetFeatureInfoUrl(evt.coordinate, viewResolution,
        'EPSG:3857', {'INFO_FORMAT': 'text/html'});
		console.log(url);
}
if(cqllayer.getVisible()){
	var url = cqllayer.getSource().getGetFeatureInfoUrl(evt.coordinate, viewResolution,
        'EPSG:3857', {'INFO_FORMAT': 'text/html'});
		console.log(url);
}
   if (url) {
	   
	   $.post('popup_values.php', { dist: url }, function(result) { 
		//alert(result);
		//console.log(result);
		popup.show(evt.coordinate, result);
		});
  }
});

function findlinecrossing()
{
var cql= "overlap='Y'";	
		cqllayer.getSource().updateParams({'LAYERS': 'plot:ltline', 'TILED': true ,'CQL_FILTER': cql});
					map.removeLayer(cqllayer);
					dt.setVisible(false);
					htpole.setVisible(false);
					ltpole.setVisible(false);
					ltline.setVisible(true);
					htline.setVisible(false);
					building.setVisible(false);
					highsupply.setVisible(false);
					ltline.setOpacity(0.3);
					cqllayer.setVisible(true);
					cqllayer.setOpacity(1);
					map.addLayer(cqllayer);

}

function finddt(value)
{
	dt.setOpacity(1);
    //cqlplot.setOpacity(0);
console.log(value);
if(value==1){
	var cql= "!dt_emeter_='NA'";
	console.log(cql);
}else{
	var cql= "dt_emeter_='NA'";
	console.log(cql);
}
	
	    cqllayer.getSource().updateParams({'LAYERS': 'plot:dt', 'TILED': true ,'CQL_FILTER': cql});

					map.removeLayer(cqllayer);
					dt.setVisible(true);
					htpole.setVisible(false);
					ltpole.setVisible(false);
					ltline.setVisible(false);
					htline.setVisible(false);
					highsupply.setVisible(false);
					building.setVisible(false);
					dt.setOpacity(0.3);
					cqllayer.setVisible(true);
					cqllayer.setOpacity(1);
					map.addLayer(cqllayer);
}

function findconsumer(value)
{
	dt.setOpacity(1);
    //cqlplot.setOpacity(0);
console.log(value);
if(value==1){
	var cql= "contype='R'";
	console.log(cql);
}else{
	var cql= "contype='C'";
	console.log(cql);
}
	
	    cqllayer.getSource().updateParams({'LAYERS': 'plot:building', 'TILED': true ,'CQL_FILTER': cql});

					map.removeLayer(cqllayer);
					dt.setVisible(false);
					htpole.setVisible(false);
					ltpole.setVisible(false);
					ltline.setVisible(false);
					htline.setVisible(false);
					highsupply.setVisible(false);
					building.setVisible(true);
					building.setOpacity(0.3);
					cqllayer.setVisible(true);
					cqllayer.setOpacity(1);
					map.addLayer(cqllayer);
}

function findphase(value)
{
	//dt.setOpacity(1);
    //cqlplot.setOpacity(0);
console.log(value);
if(value==1){
	var cql= "phase='S'";
	console.log(cql);
}else{
	var cql= "phase='T'";
	console.log(cql);
}
	
	    cqllayer.getSource().updateParams({'LAYERS': 'plot:building', 'TILED': true ,'CQL_FILTER': cql});

					map.removeLayer(cqllayer);
					dt.setVisible(false);
					htpole.setVisible(false);
					ltpole.setVisible(false);
					ltline.setVisible(false);
					htline.setVisible(false);
					highsupply.setVisible(false);
					building.setVisible(true);
					building.setOpacity(0.3);
					cqllayer.setVisible(true);
					cqllayer.setOpacity(1);
					map.addLayer(cqllayer);
}

function findtype(value)
{
	ltpole.setOpacity(1);
    //cqlplot.setOpacity(0);

if(value==1){
	console.log(value);
	var cql= "ltp_type='RCC'";
	console.log(cql);
}if(value==2){
	console.log(value);
	var cql= "ltp_type='RSJ'";
	console.log(cql);
}else{
	console.log(value);
	var cql= "ltp_type='PSC'";
	console.log(cql);
}
		cqllayer.getSource().updateParams({'LAYERS': 'plot:ltpole', 'TILED': true ,'CQL_FILTER': cql});

					map.removeLayer(cqllayer);
					dt.setVisible(false);
					htpole.setVisible(false);
					ltpole.setVisible(true);
					ltline.setVisible(false);
					htline.setVisible(false);
					highsupply.setVisible(false);
					building.setVisible(false);
					ltpole.setOpacity(0.3);
					cqllayer.setVisible(true);
					cqllayer.setOpacity(1);
					map.addLayer(cqllayer);
}

function highsupplyset()
{
					dt.setVisible(false);
					htpole.setVisible(false);
					ltpole.setVisible(false);
					ltline.setVisible(false);
					htline.setVisible(false);
					highsupply.setVisible(true);
					building.setVisible(true);
					cqllayer.setVisible(false);
					highsupply.setOpacity(0.34);
}



