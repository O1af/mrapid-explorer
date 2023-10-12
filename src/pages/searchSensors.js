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
    return results['results'];
}