var proxyUrl = 'api/meteomatics'; // goes via backend to api.meteomatics.com
var timeStr = '2019-01-22T10:00:00Z';
var layerStr = 't_2m:C';
var modelStr = 'mix';
var styleStr = '';

var wmslayer = new ol.layer.Tile({
    opacity: 0.7,
    source: createMeteomaticsSource(proxyUrl, timeStr, layerStr, modelStr, styleStr)
});

var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        }),
        wmslayer
    ],

    view: new ol.View({
        zoom: 4,
        center: [0, 0],
        projection: 'EPSG:4326',
    })
});


function createMeteomaticsSource(proxyUrl, time, layername, modelname, style) {
    return new ol.source.TileWMS({
        url: proxyUrl + '/wms',
        params: {
            'VERSION': '1.3.0',
            'REQUEST': 'GetMap',
            'CRS': 'EPSG:4326',
            'FORMAT': 'image/png',
            'LAYERS': layername,
            'STYLES': style,
            'TIME': time,
            'MODEL': modelname,
        },
        projection: 'EPSG:4326',
    });
}
