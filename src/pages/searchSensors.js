export async function searchSensors(query) {
    let queries = ""
    query["zip_code"].forEach((element) => queries += ("zip_code=" + element["id"] + "&"));
    query["type"].forEach((element) => queries += ("zip_code=" + element["id"] + "&"));
    query["pollutant"].forEach((element) => queries += ("pollutant=" + element["id"] + "&"));

    const response = await fetch(
        `https://mrapid-api3-r2oaltsiuq-uc.a.run.app/sensor?${queries}`
    );
    const results = await response.json();
    return results['SensorList'];
}