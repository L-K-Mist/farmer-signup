import moment from "moment";



function idDataExtraction(zaId) {
    var bdaySlice = zaId.slice(0, 6)
    var bdaySlice = '19' + bdaySlice

    var birthDate = moment(bdaySlice, "YYYYMMDD").format("YYYY-MM-DD"); // using moment.js for date extraction and manipulation

    var genderChar = zaId[6]

    var gender = ""
    if (genderChar > 4) {
        gender = 'Male'
    } else gender = 'Female'

    var citizenChar = zaId[10]

    var isZaCitizen = ''
    if (citizenChar === '0') {
        isZaCitizen = true
    } else if (citizenChar === '1') {
        isZaCitizen = false
    } else {
        console.log("There's a problem with this ID Number. 9th digit should only be a 1 or 0")
    }
    var idData = {
        birthDate,
        gender,
        isZaCitizen
    }
    console.log('TCL: ---------------------------------------');
    console.log('TCL: idDataExtraction -> idData', idData);
    console.log('TCL: ---------------------------------------');
    return idData
}

export {
    idDataExtraction
}