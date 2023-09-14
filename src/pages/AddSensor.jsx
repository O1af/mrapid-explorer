import { createSignal, createResource, For, Show, createUniqueId } from "solid-js";
import { searchSensors } from "./searchSensors";
import { MultiSelect } from '@digichanges/solid-multiselect';
import { Select, createSelect, createOptions } from "@thisbeyond/solid-select";
import "@thisbeyond/solid-select/style.css";
import './search.scss';
import { zip } from "d3";

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
  let zipcodes = []
  for (let step = 0; step < results['results'].length; step++) {
    zipcodes.push(createValue(results['results'][step]['name'], 
                  results['results'][step]['displayName']));
  }
  return zipcodes;
}

export function AddSensor(prop) {
  const filters = { zip_code: [], type: [], pollutant: [] };
  const [input, setInput] = createSignal(filters);
  const [query, setQuery] = createSignal("");
  const [data] = createResource(query, searchSensors);

  const [showForm, setShowForm] = createSignal(false);
  const toggleForm = () => setShowForm(!showForm());

  //////

  const [zipOptions, { mutateZipcode, refetchZipcode }] = createResource(getZipcodes);
  const [zipSelectedValues, zipSetSelectedValues] = createSignal([]);
  const onChangeZip = (selected) => {
    zipSetSelectedValues(selected);
    setInput({ ...input(), zip_code: selected});
    //setInput(val => val[zip_code]=selected);

    //setInput({ ...input(), q: selected});
    //input().q = selectedValues;
    zipOptions();
  };
  /*
  const propsZip = createOptions(zipOptions, {
    key: "name",
    disable: (value) => zipSelectedValues().includes(value),
    filterable: true, // Default
    createable: createValue,
  });
  */

  const types = [
    createValue("DST", "dst full name"),
    createValue("OAQ", "open air quality"),
  ];
  const initialTypes = [];
  const [typeOptions, typeSetOptions] = createSignal(types);
  const [typeSelectedValues, typeSetSelectedValues] = createSignal(initialTypes);
  const onChangeType = (selected) => {
    typeSetSelectedValues(selected);
    setInput({ ...input(), type: selected});
    //setInput({ ...input(), q: selected});
    //input().q = selectedValues;
  };
  const propsType = createOptions(typeOptions, {
    key: "name",
    disable: (value) => typeSelectedValues().includes(value),
    filterable: true, // Default
    createable: createValue,
  });

  const initialPollutants = [];
  const [pollutantOptions, { mutatePollutant, refetchPollutant }] = createResource(getPollutants)
  const [pollutantSelectedValues, pollutantSetSelectedValues] = createSignal(initialPollutants);
  const onChangePollutant = (selected) => {
    pollutantSetSelectedValues(selected);
    setInput({ ...input(), pollutant: selected});

    //setInput({ ...input(), q: selected});
    //input().q = selectedValues;
  };
  /*
  const propsPollutant = createOptions(pollutantOptions, {
    key: "name",
    disable: (value) => pollutantSelectedValues().includes(value),
    filterable: true, // Default
    createable: createValue,
  });
  */

  const format = (item, type) => (type === "option" ? item.name : item.name);

  return (
    <>
      <form>
      <h3>Select Sensors</h3>
      
      <div class="flex flex-1 flex-col max-w-100 gap-3">
        <label for="zip_code">Filter sensors by zip code</label>
        <Select
          /*
          {...propsZip}
          */
          class="search"
          id="zip_code"
          //value={input().zip_code}
          multiple
          label="Select sensors"
          placeholder="Search by zip code"
          initialValue={zipSelectedValues()}
          onChange={onChangeZip}
          format={format}
          options={zipOptions}
          isOptionDisabled={(option) => zipSelectedValues().includes(option)}
        />
      </div>

      <div class="flex flex-1 flex-col max-w-100 gap-3">
        <label for="type">Filter sensors by monitor type</label>
        <Select
          class="search"
          id="type"
          //value={input().zip_code}
          multiple
          label="Select sensors"
          placeholder="Search by monitor type"
          onChange={onChangeType}
          {...propsType}
        />
      </div>

      <div class="flex flex-1 flex-col max-w-100 gap-3">
        <label for="pollutant">Filter sensors by pollutant</label>
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
          isOptionDisabled={(option) => pollutantSelectedValues().includes(option)}
        />
      </div>

      </form>
      <Show
            when={showForm()}
            fallback={
                <button onClick={(e) => {
                    e.preventDefault();
                    //setInput({ ...input(), q: selectedValues()});
                    setQuery(input());
                    toggleForm();
                }}
                >
                    Filter sensors
                </button>
            }
        >
            <Show when={!data.loading} fallback={<>Searching...</>}>
            
            <label class="data-form-item">
                Select sensors
                <MultiSelect
                    style={{ chips: { color: "purple", "background-color": "pink" } }}
                    options={data()}
                    onSelect={console.log}
                    onRemove={console.log}
                    class="search"
                    //selectedValues={["yellow"]}
                    //selectionLimit={2}
                />
            </label>
            <ul>
            <For each={data()}>   
                {(sensor) => (
                <li>
                    {sensor.title}
                </li>
                )}
            </For>
            </ul>
        </Show>
      </Show>
    </>
  );
}

