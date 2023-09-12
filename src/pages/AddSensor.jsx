import { createSignal, createResource, For, Show, createUniqueId} from "solid-js";
import { searchSensors } from "./searchSensors";
import './search.scss';
import { MultiSelect } from '@digichanges/solid-multiselect';
import { Select, createSelect, createOptions } from "@thisbeyond/solid-select";
import "@thisbeyond/solid-select/style.css";
import './search.scss';

const filters = { zip_code: "", type: "", pollutant: "" };

export function AddSensor(props) {
  const [input, setInput] = createSignal(filters);
  const [query, setQuery] = createSignal("");
  const [data] = createResource(query, searchSensors);

  const [showForm, setShowForm] = createSignal(false);
  const toggleForm = () => setShowForm(!showForm());

  const createValue = (name) => {
    return { id: createUniqueId(), name };
  };

  const sensors = [
    createValue("DST : 101 2236 14TH STREET (95120)"),
    createValue("DST : 102 TRINITY (20147)"),
  ];
  const initialSensors = [];
  const [sensorOptions, sensorSetOptions] = createSignal(sensors);
  const [sensorSelectedValues, sensorSetSelectedValues] = createSignal(initialSensors);
  const onChangeSensor = (selected) => {
    sensorSetSelectedValues(selected);

    //setInput({ ...input(), q: selected});
    //input().q = selectedValues;
  };
  const propsSensor = createOptions(sensorOptions, {
    key: "name",
    disable: (value) => sensorSelectedValues().includes(value),
    filterable: true, // Default
    createable: createValue,
  });

  return (
    <>
      <form>
      <h3>Find Sensors</h3>

        <div>
          <label for="zip_code">Filter sensors by zip code</label>
          <input
            id="zip_code"
            value={input().zip_code}
            onInput={(e) => {
              setInput({ ...input(), zip_code: e.currentTarget.value});
            }}
          />
        </div>
        <div>
          <label for="type">Filter sensors by monitor type</label>
          <input
            id="type"
            value={input().type}
            onInput={(e) => {
              setInput({ ...input(), type: e.currentTarget.value});
            }}
          />
        </div>
        <div>
          <label for="pollutant">Filter sensors by pollutant</label>
          <input
            id="pollutant"
            value={input().pollutant}
            onInput={(e) => {
              setInput({ ...input(), pollutant: e.currentTarget.value});
            }}
          />
        </div>

      </form>
      <Show
            when={showForm()}
            fallback={
                <button onClick={(e) => {
                    e.preventDefault();
                    setQuery(input());
                    toggleForm();
                }}
                >
                    Filter sensors
                </button>
            }
        >
            <Show when={!data.loading} fallback={<>Searching...</>}>
              <ul>
              <For each={data().SensorList}>   
                  {(sensor) => (
                  <li>
                      {sensor.name}
                  </li>
                  )}
              </For>
              </ul>
        </Show>
      </Show>

      <h3>Filter Data</h3>
      <div class="flex flex-1 flex-col max-w-100 gap-3">
        <label for="sensor">Filter data by sensor</label>
        <Select
          class="search"
          id="sensor"
          //value={input().zip_code}
          multiple
          label="Select sensors"
          placeholder="Search by sensor"
          onChange={onChangeSensor}
          {...propsSensor}
        />
      </div>
    </>
  );
}
