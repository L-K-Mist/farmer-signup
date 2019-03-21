import axios from 'axios';

export const HTTP = axios.create({
    baseURL: `http://mapit.code4sa.org/point/4326/`,
})

export async function locationWardData(LatLng) {
    try {
        var response = await HTTP.get(`${LatLng.lng},${LatLng.lat}?type=WD`)
        var entry = Object.keys(response.data)[0]// ['a', 'b', 'c']
        return response.data[entry].name;

    } catch (err) {
        console.log('TCL: -----------------------');
        console.log('TCL: }catch -> err', err);
        console.log('TCL: -----------------------');
    }
}

export async function locationProvince(LatLng) {
    try {
        var response = await HTTP.get(`${LatLng.lng},${LatLng.lat}?type=PR`)
        var entry = Object.keys(response.data)[0]// ['a', 'b', 'c']
        return response.data[entry].name;

    } catch (err) {
        console.log('TCL: -----------------------');
        console.log('TCL: }catch -> err', err);
        console.log('TCL: -----------------------');
    }
}