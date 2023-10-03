import { createSignal, createResource, Show } from "solid-js";
import { searchSensors } from "./searchSensors";
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
                  results['results'][step]['displayName']));
  }
  return pollutants;
}

export function AddSensor() {
  // const temp1 = []
  // const temp2 = []
  // const temp3 = []
  // const temp4 = []
  const [zipSelectedValues, zipSetSelectedValues] = createSignal([]);
  const [typeSelectedValues, typeSetSelectedValues] = createSignal([]);
  const [pollutantSelectedValues, pollutantSetSelectedValues] = createSignal([]);
  const [sensorSelected, sensorSetSelected] = createSignal([]);

  // const [showForm, setShowForm] = createSignal(false);
  // const toggleForm = () => setShowForm(!showForm());


  // for creating query parameter list
  const sensorListParameters = () => {
    return {zip_code: zipSelectedValues(), type: typeSelectedValues(), pollutant: pollutantSelectedValues()}
  }
  const [data] = createResource(sensorListParameters, searchSensors)
  const onChangeSensors = (selected) => {
    sensorSetSelected(selected);
    data();
  };

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

  return (
    <>
      <form>
      <h3>Filter Sensors</h3>

      <div class="flex flex-1 flex-col max-w-100 gap-3">
        <label htmlFor="zip_code">Filter sensors by zip code</label>
        <Select
          class="search"
          id="zip_code"
          //value={input().zip_code}
          multiple
          label="Select sensors"
          placeholder="Search by zip code"
          onChange={onChangeZip}
          format={format}
          options={zipOptions}
          isOptionDisabled={(option) => (zipSelectedValues().length != 0) ? zipSelectedValues().includes(option) : false}
        />
      </div>

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

      <div class="flex flex-1 flex-col max-w-100 gap-3">
        <label htmlFor="pollutant">Filter sensors by pollutant</label>
        <Select
          class="search"
          id="pollutant"
          //value={input().zip_code}
          multiple
          label="Select sensors"
          placeholder="Search by pollutant"
          onChange={onChangePollutant}
          //{...propsPollutant}
          format={format}
          options={pollutantOptions}
          isOptionDisabled={(option) => (pollutantSelectedValues().length != 0) ? pollutantSelectedValues().includes(option) : false}
        />
      </div>

      <h3>Select Sensors</h3>
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
      </form>

    </>
  );
}

