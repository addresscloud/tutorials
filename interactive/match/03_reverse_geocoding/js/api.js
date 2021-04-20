 // Setup
const api = axios.create({
    baseURL: 'https://api.addresscloud.com/match/v1/address',
    headers: { 'X-CLIENT-ID': '<CLIENT-ID>', 'X-API-KEY': 'my-api-key' }
})

// Geocode an address
async function reverseGeocode(lon, lat, radius) {
    const { data } = await api.get(`/geocode?coordinates=${lon},${lat}&radius=${radius}`)

    return data
}