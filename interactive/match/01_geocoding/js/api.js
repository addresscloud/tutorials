 // Setup
const api = axios.create({
    baseURL: 'https://api.addresscloud.com/match/v1/address',
    headers: { 'X-CLIENT-ID': 'acloud', 'X-API-KEY': 'my-api-key' }
})

// Geocode an address
async function geocode(address) {
    const { data } = await api.get(`/geocode?query=${address}`)
    console.log(data)

    return data
}

// Lookup a known address by Id
async function lookupById(id) {
    const { data } = await api.get(`/lookup/byId/${id}`)
    console.log(data)

    return data
}