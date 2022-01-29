const request = require('request')


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibXhnZGVsaW5lIiwiYSI6ImNreXRvZ2ZwbDE2NmoyeXMyeHphaGw3NXIifQ.lmWh8uLT66SsnaZpDIPPRw&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to locations services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })    //error is undefined, data is provided
        }
    })
}


module.exports = geocode