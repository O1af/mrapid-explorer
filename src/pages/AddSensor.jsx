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
    event.preventDefault();
    console.log("got to csv download part");
    let jsondata = dataJson();
    console.log(jsondata)
 
    jsondata = jsondata.results
    const date1 = new Date(jsondata[0]['time'])
    console.log(date1.getDate())
    console.log(date1.getTime())

    csvDownload(jsondata, pollutantSelectedValues()); 

    console.log("got to csv download part");
    
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

  const selectZip = () => {
    zipSetSelectedValues(zipOptions);
    zipOptions();
  };
  const clearZip = () => {
    zipSetSelectedValues([]);
    zipOptions();
  }

  const selectType = () => {
    typeSetSelectedValues(types);
  };
  const clearType = () => {
    typeSetSelectedValues([]);
  }

  const selectPollutant = () => {
    pollutantSetSelectedValues(pollutantOptions);
    pollutantOptions();
  };
  const clearPollutant = () => {
    pollutantSetSelectedValues([]);
    pollutantOptions();
  }

  //Show the graph of the data that was collected 
  const show_graph = (event) => {

    console.log(sensorDataParameters())
    console.log(sensorListParameters())
    console.log("got here");
    event.preventDefault();
  }

  return (
    <>
      <div class="data-container">
      <form>
      <h3>Filter Sensors</h3>
      <div class="data-form-item">

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
        <button type="button" onClick={selectZip}>
          Select all zip codes
        </button>
        <button type="button" onClick={clearZip}>
          Clear all selected zip codes
        </button>
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
        <button type="button" onClick={selectType}>
          Select all monitor types
        </button>
        <button type="button" onClick={clearType}>
          Clear all selected monitor types
        </button>
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
      <label>
        <button type="button" onClick={selectPollutant}>
          Select all pollutants
        </button>
        <button type="button" onClick={clearPollutant}>
          Clear all selected pollutants
        </button>
      </label>

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

