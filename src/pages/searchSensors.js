export async function searchSensors(query) {
    let queries = ""
    query["zip_code"].forEach((element) => queries += ("zip_code=" + element["id"] + "&"));
    query["type"].forEach((element) => queries += ("type=" + element["id"] + "&"));
    query["pollutant"].forEach((element) => queries += ("pollutant=" + element["id"] + "&"));

    const response = await fetch(
        `https://mrapid-api3-r2oaltsiuq-uc.a.run.app/sensor?${queries}`
    );
    const results = await response.json();
    return results['SensorList'];
}
export async function getSensorData(query) {
    let queries = "sensor=";
    query["sensor"].forEach((element) => queries += (element["id"] + ","));
    queries += "&";
    query["pollutant"].forEach((element) => queries += ("pollutant=" + element["id"] + "&"));
    query["pollutant"].forEach((element) => queries += ("unit=" + element["name"].split(" ").pop() + "&"));
    queries += ("start=" + query['start'] + "&");
    queries += ("end=" + query['end'] + "&");
    queries += ("step=" + query['step'] + "&");
    console.log(queries)
    const response = await fetch(
        `https://mrapid-api3-r2oaltsiuq-uc.a.run.app/history?${queries}`
    );
    const results = await response.json();
    return results;
}

export const csvDownload = function (data, selectedPollutants, selectedSensors) { 
    let headerObject = ['date', 'time']
    for (let step = 0; step < selectedSensors.length; step++) {
        headerObject.push("pollutant")
        headerObject.push("value")
    }

    let previousTime = new Date(data[0]['time'])
    
    let csvRows = []; 
    csvRows.push(headerObject.join(',')); 

    let cur_values = [previousTime.toLocaleString().split(", ")]
    for (const row of data) { 
        console.log('pollution')
        console.log(selectedPollutants[0]['name'])
        // const values = headers.map(e => { 
        //     return row[e] 
        // }) 
        // csvRows.push(values.join(',')) 
        let date = new Date(row['time'])
        if (date.getTime() != previousTime.getTime()) {
            csvRows.push(cur_values.join(','))
            previousTime = date
            cur_values = []
            cur_values = [previousTime.toLocaleString().split(", ") ]
        } 
        // TODO:: CHANGE THIS ONCE WE GET MULTIPLE TYPES OF POLLUTANTS
        cur_values.push(selectedPollutants[0]['name'])
        cur_values.push(row['value'])
    } 
    
    csvRows.push(cur_values.join(','))
    csvRows = csvRows.join('\n') 
    console.log(csvRows)
    // downloading
    const blob = new Blob([csvRows], { type: 'text/csv' }); 
    const url = window.URL.createObjectURL(blob) 
    const a = document.createElement('a') 
    a.setAttribute('href', url) 
    a.setAttribute('download', 'download.csv'); 
    a.click() 
    console.log("downloaded?")
}
