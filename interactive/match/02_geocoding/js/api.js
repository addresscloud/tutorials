 // Setup
const api = axios.create({
    baseURL: 'https://api.addresscloud.com/match/v1/address',
    headers: { 'X-CLIENT-ID': 'my-client-id', 'X-API-KEY': 'my-api-key' }
})

// Geocode an address
async function geocode(address) {
    const { data } = await api.get(`/geocode?query=${address}`)

    return data
}

// Lookup a known address by Id
async function lookupById(id) {
    const { data } = await api.get(`/lookup/byId/${id}`)

    return data
}