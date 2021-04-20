// From https://github.com/OrdnanceSurvey/OS-Data-Hub-API-Demos
const OS_API_KEY = '<OS_API_KEY>'
let map
// Setup the map
function initMap() {

    // This sets up the actual VTS layer
    // Center coordinates are defined in EPSG:3857 lon/lat and we are asking for srs=3857 in the "transformRequest"
    const serviceUrl = "https://api.os.uk/maps/vector/v1/vts";
    map = new mapboxgl.Map({
        container: 'map',
        style: serviceUrl + '/resources/styles?key=' + OS_API_KEY,
        center: [-1.3018121892529564, 50.75655707330327],
        zoom: 17,
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

    // Create the marker
    const marker = new mapboxgl.Marker({
        draggable:true
        })
        .setLngLat([-1.3018121892529564, 50.75655707330327])
        .setPopup(new mapboxgl.Popup().setHTML(`<h3>Hello World</h3>`))
        .addTo(map);

    async function onDragEnd() {
        var { lng, lat } = marker.getLngLat();
        const data = await reverseGeocode(lng, lat, 5)
        document.getElementById('address').innerHTML = `<h2>Address</h2>`
        for (const address of data.results){
            document.getElementById('address').innerHTML += `<h3>${address.description}</h3>`
        }
        console.log(address)
    }
            
        marker.on('dragend', onDragEnd);
}

// setup the map on page load
initMap()
