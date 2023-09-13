import { createSignal, createResource, For, Show, createUniqueId } from "solid-js";
import { searchSensors } from "./searchSensors";
import { MultiSelect } from '@digichanges/solid-multiselect';
import { Select, createSelect, createOptions } from "@thisbeyond/solid-select";
import "@thisbeyond/solid-select/style.css";
import './search.scss';

const filters = { zip_code: {}, type: {}, pollutant: {} };

export function AddSensor(prop) {
  const [input, setInput] = createSignal(filters);
  const [query, setQuery] = createSignal("");
  const [data] = createResource(query, searchSensors);

  const [showForm, setShowForm] = createSignal(false);
  const toggleForm = () => setShowForm(!showForm());

  //////

  const createValue = (name) => {
    return { id: createUniqueId(), name };
  };

  const zips = [
    createValue("1111"),
    createValue("48216"),
  ];
  const initialZips = [];
  const [zipOptions, zipSetOptions] = createSignal(zips);
  const [zipSelectedValues, zipSetSelectedValues] = createSignal(initialZips);
  const onChangeZip = (selected) => {
    zipSetSelectedValues(selected);
    setInput({ ...input(), zip_code: selected});

    //setInput({ ...input(), q: selected});
    //input().q = selectedValues;
  };
  const propsZip = createOptions(zipOptions, {
    key: "name",
    disable: (value) => zipSelectedValues().includes(value),
    filterable: true, // Default
    createable: createValue,
  });

  const types = [
    createValue("DST"),
    createValue("OAQ"),
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

  const pollutants = [
    createValue("pm2.5"),
    createValue("pm"),
  ];
  const initialPollutants = [];
  const [pollutantOptions, pollutantSetOptions] = createSignal(pollutants);
  const [pollutantSelectedValues, pollutantSetSelectedValues] = createSignal(initialPollutants);
  const onChangePollutant = (selected) => {
    pollutantSetSelectedValues(selected);
    setInput({ ...input(), pollutant: selected});

    //setInput({ ...input(), q: selected});
    //input().q = selectedValues;
  };
  const propsPollutant = createOptions(pollutantOptions, {
    key: "name",
    disable: (value) => pollutantSelectedValues().includes(value),
    filterable: true, // Default
    createable: createValue,
  });

  return (
    <>
      <form>
      <h3>Select Sensors</h3>

      <div class="flex flex-1 flex-col max-w-100 gap-3">
        <label for="zip_code">Filter sensors by zip code</label>
        <Select
          class="search"
          id="zip_code"
          //value={input().zip_code}
          multiple
          label="Select sensors"
          placeholder="Search by zip code"
          onChange={onChangeZip}
          {...propsZip}
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
          {...propsPollutant}
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
