const request = require(`request`);

const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/`+ encodeURI(address) +`.json?access_token=pk.eyJ1Ijoicml6d2FuMDciLCJhIjoiY2tvYWQwbndxMGNndTMwb3lyOW03NnhxdCJ9.OyQ-8DNIAXQ2NVCLgEDcGw&limit=1`
   
    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback(`Unable to connect to location service`, undefined)
        } else if (body.features.length === 0) {
            callback(`Unable to find locatoin. Try another location`, undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }{
            
        }
    })
}

module.exports = geoCode