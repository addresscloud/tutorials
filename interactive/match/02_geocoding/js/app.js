
// Run the search
async function search(){
    const searchTerm = document.getElementById('search').value
    const data = await geocode(searchTerm)

    if (data.found === 1 ) {
        setOutput(data.results[0])
    } else {
        createPicklist(data.results)
    }
}

// Print the result
function setOutput(address) {
    let output = `<p>${address.description}</p>`

    output += `<p><table><tr><td>coordinates</td><td>${address.geometry.coordinates.lon}, ${address.geometry.coordinates.lat}</td></tr>`
    for ([key, value] of Object.entries(address.properties)){
        output += `<tr><td>${key}</td><td>${value}</td></tr>`
    }
    output += `</table></p>`

    document.getElementById('results').innerHTML = output
    console.log(address)
    mapAddress(address)
}

// Create a picklits of addresses
function createPicklist(list) {
    let output = `<p><select id="picklist" onChange="lookup(this.value)">`
    for (result of list) {
        output += `<option value=${result.id}>${result.description}</option>`
    }
    output += `</select></p>`
    document.getElementById('results').innerHTML = output
}

// Handle picklist lookups
async function lookup(id) {

    const data = await lookupById(id)
    setOutput(data.result)
}
