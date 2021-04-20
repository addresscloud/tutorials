// From https://github.com/OrdnanceSurvey/OS-Data-Hub-API-Demos
const OS_API_KEY = '<OS_VECTOR_TILE_API_KEY>'
let map
// Setup the map
function initMap() {

    // This sets up the actual VTS layer
    // Center coordinates are defined in EPSG:3857 lon/lat and we are asking for srs=3857 in the "transformRequest"
    const serviceUrl = "https://api.os.uk/maps/vector/v1/vts";
    map = new mapboxgl.Map({
        container: 'map',
        style: serviceUrl + '/resources/styles?key=' + OS_API_KEY,
        center: [-4.7,54.5],
        zoom: 5,
        maxZoom: 20,
        transformRequest: url => {
            url += '&srs=3857';
            return {
                url: url
            }
        }
    });

    // Add attribution
    map.addControl(new mapboxgl.AttributionControl({
        customAttribution: '&copy; <a href="http://www.ordnancesurvey.co.uk/">Ordnance Survey</a>'
    }));
    
    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl());

    // Catch errors
    map.on('error', error => {
        console.log(error);
    });

}

function mapAddress(address){
    // Extract address coordinates
    const coordinates = address.geometry.coordinates

    // Create the marker
    new mapboxgl.Marker()
        .setLngLat(coordinates)
        .setPopup(new mapboxgl.Popup().setHTML(`<h3>hello world</h3>`))
        .addTo(map);

    // Zoom to address point
    map.flyTo({
            center: coordinates,
            zoom: 18,
            essential: true // this animation is considered essential with respect to prefers-reduced-motion
        });
}

// setup the map on page load
initMap()
