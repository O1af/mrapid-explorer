export async function searchSensors(query) {
    let params = new URLSearchParams(query);
    let queryString = params.toString();
    //console.log(queryString);

    if (queryString.trim() === "") return [];
    const response = await fetch(
        `https://mrapid-api3-r2oaltsiuq-uc.a.run.app/sensor?${queryString}`
    );
    const results = await response.json();
    return results;
  }