import { stringify, parse } from 'query-string';
export async function searchSensors(query) {

    let queries = queryString.stringify(query);

    if (queryString.trim() === "") return [];
    const response = await fetch(
        `https://mrapid-api3-r2oaltsiuq-uc.a.run.app/sensor?${queries}`
    );
    const results = await response.json();
    return results;
  }