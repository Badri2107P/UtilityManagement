var pipeline =new ol.layer.Tile({
						opacity: 0.75,
						visible:true,
                        title: 'pipe line',
                        source: new ol.source.TileWMS({
						url: 'http://localhost:8080/geoserver/plot/wms',
						params: {'LAYERS': 'plot:pipeline', 'TILED': true },
						serverType: 'geoserver',
						// Countries have transparency, so do not fade tiles:
						transition: 0
						
					  }),
                    });
					var watersupply =new ol.layer.Tile({
						opacity: 1,
						visible:true,
                        title: 'water supply',
                        source: new ol.source.TileWMS({
						url: 'http://localhost:8080/geoserver/plot/wms',
						params: {'LAYERS': 'plot:watersupply', 'TILED': true },
						serverType: 'geoserver',
						// Countries have transparency, so do not fade tiles:
						transition: 0
						
					  }),
                    });
					
						var demandlayer =new ol.layer.Tile({
						opacity: 1,
						visible:false,
						title: 'demand layer',
                        source: new ol.source.TileWMS({
						url: 'http://localhost:8080/geoserver/plot/wms',
						params: {'LAYERS': 'plot:water_source', 'TILED': true },
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
                layers: [pipeline,watersupply,demandlayer]
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
	if(demandlayer.getVisible())
	{
		var url = demandlayer.getSource().getGetFeatureInfoUrl(evt.coordinate, viewResolution,
        'EPSG:3857', {'INFO_FORMAT': 'text/html'});
		console.log(url);
		
		   if (url) {
	   $.post('getdemandwater.php', { dist: url }, function(result) { 
		//alert(result);
		console.log(result);
		var str="The tank in this area will meet demand in "+result+" Years";
		console.log(str);
		popup.show(evt.coordinate, str);
		});
  }
}else{
if(watersupply.getVisible()){
	var url = watersupply.getSource().getGetFeatureInfoUrl(evt.coordinate, viewResolution,
        'EPSG:3857', {'INFO_FORMAT': 'text/html'});
		console.log(url);
}
if(pipeline.getVisible()){
	var url = pipeline.getSource().getGetFeatureInfoUrl(evt.coordinate, viewResolution,
        'EPSG:3857', {'INFO_FORMAT': 'text/html'});
		console.log(url);
}


   if (url) {
	   $.post('popup_values.php', { dist: url }, function(result) { 
		//alert(result);
		//console.log(result);
		popup.show(evt.coordinate, result);
		});
}}
});

function demandmanagement(){
					//map.removeLayer(cqllayer);
					pipeline.setVisible(false);
					watersupply.setVisible(false);
					//ltpole.setVisible(true);
					//ltline.setVisible(false);
					//htline.setVisible(false);
					//building.setVisible(false);
					//ltpole.setOpacity(0.3);
					demandlayer.setVisible(true);
					demandlayer.setOpacity(1);
					//map.addLayer(demandlayer);
}