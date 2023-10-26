import { createSignal, createResource, Show } from "solid-js";
import { searchSensors, getSensorData, csvDownload } from "./searchSensors";
// import { MultiSelect } from '@digichanges/solid-multiselect';
import { Select } from "@thisbeyond/solid-select";
import "@thisbeyond/solid-select/style.css";
import './search.scss';

const createValue = (id, name) => {
  return { id: id, name: name };
};

//gets list of all available zipcodes, formats into list of zipcodes
export async function getZipcodes() {
  const response = await fetch(
    `https://mrapid-api3-r2oaltsiuq-uc.a.run.app/zipcodes`
  );
  const results = await response.json();
  let zipcodes = []
  for (let step = 0; step < results['zipcode_list'].length; step++) {
    zipcodes.push(createValue(results['zipcode_list'][step]['zip_code'], 
                  results['zipcode_list'][step]['zip_code']));
  }
  return zipcodes;
}

//gets list of all available parameters, formats into list
export async function getPollutants() {
  const response = await fetch(
    `https://mrapid-api3-r2oaltsiuq-uc.a.run.app/parameterList`
  );
  const results = await response.json();
  let pollutants = []
  for (let step = 0; step < results['results'].length; step++) {
    pollutants.push(createValue(results['results'][step]['name'], 
                  results['results'][step]['displayName'] + " " + 
                  results['results'][step]['units']));
  }
  return pollutants;
}

export function AddSensor() {
  // const temp1 = []
  // const temp2 = []
  // const temp3 = []
  // const temp4 = []
  const initialZip = []
  const initialType = []
  const initialPollutant = []
  const [zipSelectedValues, zipSetSelectedValues] = createSignal(initialZip);
  const [typeSelectedValues, typeSetSelectedValues] = createSignal(initialType);
  const [pollutantSelectedValues, pollutantSetSelectedValues] = createSignal(initialPollutant);
  const [sensorSelected, sensorSetSelected] = createSignal([]);

  // const [showForm, setShowForm] = createSignal(false);
  // const toggleForm = () => setShowForm(!showForm());

  const [startDate, setStartDate] = createSignal("");
  const [endDate, setEndDate] = createSignal("");
  const [timeStep, setTimeStep] = createSignal("");
  const onChangeTime = (selected) => {
    setTimeStep(selected.currentTarget.value)
  };

  const onCsvDownload = (event) => {
    console.log("got to csv download part");
    // const jsondata = dataJson();
    let jsondata = {results: [
      {"sensor": 111111, "value": 1},
      {"sensor": 222222, "value": 2},
      {"sensor": 333333, "value": 3}
    ]
    }
    jsondata = jsondata.results
    const data = jsondata.map(row => ({ 
      sensor: row.sensor, 
      value: row.value, 
    })) 

    csvDownload(data); 

    console.log("got to csv download part");
    event.preventDefault();

    //here just to get rid of errors. delete later when API is up TODO
    dataJson();
  }
  // for creating query parameter list for sensors
  const sensorListParameters = () => {
    return {zip_code: zipSelectedValues(), type: typeSelectedValues(), pollutant: pollutantSelectedValues()}
  }
  const [data] = createResource(sensorListParameters, searchSensors)
  const onChangeSensors = (selected) => {
    sensorSetSelected(selected);
    data();
  };

  // for creating query parameter list for data json
  const sensorDataParameters = () => {
    return {pollutant: pollutantSelectedValues(), sensor: sensorSelected(), 
            start: startDate(), end: endDate(), step: timeStep()}// unit inside the pollutant['name'] (do a .split())
  }
  const [dataJson] = createResource(sensorDataParameters, getSensorData)

  //////
  const [zipOptions] = createResource(getZipcodes)
  const onChangeZip = (selected) => {
    zipSetSelectedValues(selected);

    //setInput({ ...input(), q: selected});
    //input().q = selectedValues;
    zipOptions();
  };

  const types = [
    createValue("DST", "dst full name"),
    createValue("OAQ", "open air quality"),
  ];
  // const [typeOptions] = createSignal(types);
  const onChangeType = (selected) => {
    typeSetSelectedValues(selected);
    
  };

  const [pollutantOptions] = createResource(getPollutants)
  const onChangePollutant = (selected) => {
    pollutantSetSelectedValues(selected);
    pollutantOptions();
  };

  const format = (item, type) => (type === "option" ? item.name : item.name);

  const [zipAll, setZipAll] = createSignal({ text: 'Select all zip codes', complete: false});
  const selectZip = () => {
    setZipAll({ ...zipAll, complete: !zipAll.complete });
    zipSetSelectedValues(zipOptions);
    zipOptions();
  };

  const [typeAll, setTypeAll] = createSignal({ text: 'Select all monitor types', complete: false});
  const selectType = () => {
    setTypeAll({ ...typeAll, complete: !typeAll.complete });
    typeSetSelectedValues(types);
  };

  const [pollutantAll, setPollutantAll] = createSignal({ text: 'Select all pollutant types', complete: false});
  const selectPollutant = () => {
    setPollutantAll({ ...pollutantAll, complete: !pollutantAll.complete });
    pollutantSetSelectedValues(pollutantOptions);
    pollutantOptions();
  };

  //Show the graph of the data that was collected 
  const show_graph = (event) => {

    console.log(sensorDataParameters())
    console.log("got here");
    event.preventDefault();
  }

  return (
    <>
      <div class="data-container">
      <form>
      <h3>Filter Sensors</h3>
      <div class="data-form-item">
      <label>
          <input
            type="checkbox"
            checked={zipAll().complete}
            onChange={selectZip}
          />
          {zipAll().text}
      </label>


      <div class="flex flex-1 flex-col max-w-100 gap-3">
        <label htmlFor="zip_code">Filter sensors by zip code</label>
        <Select
          class="search"
          id="zip_code"
          //value={input().zip_code}
          multiple
          initialValue = {zipSelectedValues()}
          label="Select sensors"
          placeholder="Search by zip code"
          onChange={onChangeZip}
          format={format}
          options={zipOptions}
          isOptionDisabled={(option) => (zipSelectedValues().length != 0) ? zipSelectedValues().includes(option) : false}
        />
      </div>


      <label>
          <input
            type="checkbox"
            checked={typeAll().complete}
            onChange={selectType}
          />
          {typeAll().text}
      </label>

 
      <div class="flex flex-1 flex-col max-w-100 gap-3">
        <label htmlFor="type">Filter sensors by monitor type</label>
        <Select
          class="search"
          id="type"
          //value={input().zip_code}
          multiple
          label="Select sensors"
          placeholder="Search by monitor type"
          initialValue={typeSelectedValues()}
          onChange={onChangeType}
          format={format}
          options={types}
          isOptionDisabled={(option) => (typeSelectedValues().length != 0) ? typeSelectedValues().includes(option) : false}
          // {...propsType}
        />
      </div>
      
      <label>
          <input
            type="checkbox"
            checked={pollutantAll().complete}
            onChange={selectPollutant}
          />
          {pollutantAll().text}
      </label>
      <div class="flex flex-1 flex-col max-w-100 gap-3">
        <label htmlFor="pollutant">Filter sensors by pollutant</label>
        <Select
          class="search"
          id="pollutant"
          //value={input().zip_code}
          multiple
          initialValue={pollutantSelectedValues()}
          label="Select sensors"
          placeholder="Search by pollutant"
          onChange={onChangePollutant}
          //{...propsPollutant}
          format={format}
          options={pollutantOptions}
          isOptionDisabled={(option) => (pollutantSelectedValues().length != 0) ? pollutantSelectedValues().includes(option) : false}
        />
      </div>
      </div>
      <h3>Select Sensors</h3>
      <div class="data-form-item">
      <Show when={!data.loading} fallback={<>Searching...</>}>
        <div class="flex flex-1 flex-col max-w-100 gap-3">
          <label htmlFor="sensor">Select sensors</label>
            {/* <MultiSelect
                style={{ chips: { color: "purple", "background-color": "pink" } }}
                options={data()}
                onSelect={console.log}
                onRemove={console.log}
                class="search"
                //selectedValues={["yellow"]}
                //selectionLimit={2}
            /> */}
          <Select
            class="search"
            id="sensor"
            //value={input().zip_code}
            multiple
            label="sensor selector"
            placeholder="Search for specific sensors"
            onChange={onChangeSensors}
            format={format}
            options={data}
            isOptionDisabled={(option) => (sensorSelected().length != 0) ? sensorSelected().includes(option) : false}
          />
        </div>
      </Show>
      </div>
      <h3>Filter Sensor Data </h3>
      <label class="data-form-item">
        Start time/date
        <input type="date" value={startDate()} onChange={(e) => setStartDate(e.currentTarget.value)} name="start-time" class="text-input"></input>
      </label>
      <label class="data-form-item">
        End time/date
        <input type="date" value={endDate()} onChange={(e) => setEndDate(e.currentTarget.value)} name="end-time" class="text-input"></input>
      </label>
      <label class="data-form-item">
        Time step
        <select class="select" value={timeStep()} onChange={onChangeTime}>
          <option value="h">Hourly</option>
          <option value="d">Daily</option>
          <option value="m">Monthly</option>
          <option value="y">Yearly</option>
        </select>
      </label>
      </form>
      </div>



      <label class="data-form-item" htmlFor="graphSubmit">
          <button onClick={show_graph} id="graphSubmit" type="submit" name="submit" class="icon-btn btn-secondary">Show A Graph of the data</button>
      </label>
      
      <label class="data-form-item" htmlFor="downloadSubmit">
          <button onClick={onCsvDownload} id="downloadSubmit" type="submit" name="submit" class="icon-btn btn-secondary">Download A CSV</button>
      </label>
    </>
  );
}

