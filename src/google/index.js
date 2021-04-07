const model = "mm-country-borders";
const layer = "country:idx";
const style = "";
const resolution = 256;
const timestamp = "2021-04-15T00:00:00Z"


const earth_radius = 6378137.0;

function xyzToBounds(x, y, zoom) {
    // Note: Google Maps is different from TMS: https://www.maptiler.com/google-maps-coordinates-tile-bounds-projection/
    const boundMax = Math.PI * earth_radius;
    const tileSize = boundMax * 2 / Math.pow(2, zoom);
    const minx = -boundMax + x * tileSize;
    const maxx = -boundMax + (x + 1) * tileSize;
    const miny = boundMax - (y + 1) * tileSize;
    const maxy = boundMax - y * tileSize;
    return [minx, miny, maxx, maxy];
}

function getMeteomaticsTile(coordinates, zoom) {
    let wmsURL = new URL(`https://api.meteomatics.com/wms`);
    wmsURL.searchParams.set("version", "1.3.0");
    wmsURL.searchParams.set("service", "WMS");
    wmsURL.searchParams.set("request", "GetMap");
    wmsURL.searchParams.set("format", "image/png");
    wmsURL.searchParams.set("layers", `${model}:${layer}`);
    wmsURL.searchParams.set("crs", "EPSG:3857");
    wmsURL.searchParams.set("width", resolution.toString());
    wmsURL.searchParams.set("height", resolution.toString());
    wmsURL.searchParams.set("time", timestamp);
    wmsURL.searchParams.set("bbox", xyzToBounds(coordinates.x, coordinates.y, zoom).join(","));
    return wmsURL.toString();
}

function initMap() {
    let map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: {lat: 37.783, lng: -122.403}
    });

    let meteomaticsMap = new google.maps.ImageMapType({
        getTileUrl: getMeteomaticsTile,
        name: model + ":" + layer
    });
    map.overlayMapTypes.push(meteomaticsMap);
}


initMap();
