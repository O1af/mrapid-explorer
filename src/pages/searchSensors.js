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
    let queries = ""
    query["sensor"].forEach((element) => queries += ("sensor=" + element["id"] + "&"));
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

export const csvDownload = function (data) { 
    let csvRows = []; 
    const headers = Object.keys(data[0]); 
    csvRows.push(headers.join(',')); 
  
    for (const row of data) { 
        const values = headers.map(e => { 
            return row[e] 
        }) 
        csvRows.push(values.join(',')) 
    } 
  
    csvRows = csvRows.join('\n') 
    console.log(csvRows)
    // downloading
    const blob = new Blob([csvRows], { type: 'text/csv' }); 
    const url = window.URL.createObjectURL(blob) 
    const a = document.createElement('a') 
    a.setAttribute('href', url) 
    a.setAttribute('download', 'download.csv'); 
    a.click() 
  
  }