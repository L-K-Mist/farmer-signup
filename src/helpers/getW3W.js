import W3W from 'w3w-javascript-wrapper/dist/W3W.Geocoder'

var w3w;
var options = {
    key: 'HUKLH4DA'
};

w3w = new W3W.Geocoder(options);

function getW3W(gps) {
    return new Promise((resolve, reject) => {
        var output = {}
        var params = {
            coords: [gps.lat, gps.lng]
        };
        var callback = {
            onSuccess: function (data) {
                // console.log(JSON.stringify(data));
                console.log('TCL: data', data);
                output.w3wMapLink = data.map
                output.words = data.words
                resolve(output)
            },
            onFailure: function (data) {
                // console.log(JSON.stringify(data));
                alert('Ooops!  Something went wrong...')
                console.log('TCL: data', data);
                reject(Error('Yip, something went wrong.'))
            }
        };
        w3w.reverse(params, callback);
    })
}

export default getW3W