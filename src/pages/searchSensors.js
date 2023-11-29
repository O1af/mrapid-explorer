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
    const response = await fetch(
        `https://mrapid-api3-r2oaltsiuq-uc.a.run.app/history?${queries}`
    );
    const results = await response.json();
    return results;
}

export const tableFormat = function() {
    // TODO:: get the table formatting part of csv download and use it form html table displaying
}

export const csvDownload = function (data, selectedPollutants, selectedSensors) { 
    let name = "download.csv";
    let csvRows = []; 
    if (selectedPollutants.length == 1) {
        name = selectedPollutants[0].name + " data.csv"
        let headerObject = ['date', 'time']
        let sensor_values = []
        var sensor_map = {}
        for (let step = 0; step < selectedSensors.length; step++) {
            headerObject.push(selectedSensors[step].name)
            sensor_values.push("NA")
            sensor_map[selectedSensors[step].id] = sensor_values.length + 1
        }
    
        let previousTime = new Date(data[0]['time'])
        
        csvRows.push(headerObject.join(',')); 
        let cur_values = previousTime.toLocaleString().split(", ")
        cur_values = cur_values.concat(sensor_values)
        for (const row of data) { 
            let date = new Date(row['time'])
            if (date.getTime() != previousTime.getTime()) {
                csvRows.push(cur_values.join(','))
                previousTime = date
                cur_values = previousTime.toLocaleString().split(", ")
                cur_values = cur_values.concat(sensor_values)
            } 
            cur_values[sensor_map[row['sensor_id']]] = row['value']
        } 
        
        csvRows.push(cur_values.join(','))
        csvRows = csvRows.join('\n') 
    } else {
        name = "oops haven't got here yet TODO: multiple pollutants"
    }


    // downloading
    const blob = new Blob([csvRows], { type: 'text/csv' }); 
    const url = window.URL.createObjectURL(blob) 
    const a = document.createElement('a') 
    a.setAttribute('href', url) 
    a.setAttribute('download', name); 
    a.click() 
}
