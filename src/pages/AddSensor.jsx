import { createSignal, createResource, For, Show } from "solid-js";
import { searchSensors } from "./searchSensors";
import './search.scss';
import { MultiSelect } from '@digichanges/solid-multiselect';

const filters = { zip_code: "", type: "", pollutant: "" };

export function AddSensor(props) {
  const [input, setInput] = createSignal(filters);
  const [query, setQuery] = createSignal("");
  const [data] = createResource(query, searchSensors);

  const [showForm, setShowForm] = createSignal(false);
  const toggleForm = () => setShowForm(!showForm());

  return (
    <>
      <form>
      <h3>Select Sensors</h3>

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
                    {sensor.name}
                </li>
                )}
            </For>
            </ul>
        </Show>
      </Show>
    </>
  );
}
