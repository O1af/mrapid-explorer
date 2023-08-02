import { For, createSignal, createUniqueId } from "solid-js";
import { Select, createSelect, createOptions } from "@thisbeyond/solid-select";
import "@thisbeyond/solid-select/style.css";
import './search.scss';

const Data = () => {

  const createValue = (name) => {
    return { id: createUniqueId(), name };
  };

  const candidates = [
    createValue("DST : 101 2236 14TH STREET (95120)"),
    createValue("OAQ : PORT HURON (48060)"),
    createValue("PAR : Appoline St (48227)"),
    createValue("CLA : AHKQKKTX (48211)"),
    createValue("TSI : FBPOWER1 (58757)"),
  ];

  const initialValue = [];

  const [options, setOptions] = createSignal(candidates);
  const [selectedValues, setSelectedValues] = createSignal(initialValue);

  const onChange = (selected) => {
    setSelectedValues(selected);

    const lastValue = selected[selected.length - 1];
    if (lastValue && !options().includes(lastValue)) {
      setOptions([...options(), lastValue]);
    }
  };

  const props = createOptions(options, {
    key: "name",
    disable: (value) => selectedValues().includes(value),
    filterable: true, // Default
    createable: createValue,
  });

    return (
      <section class="page-data">
        
        <div class="data-form">
        <form>
        <h1>
          Download sensor data
        </h1>

        <div class="flex flex-1 flex-col max-w-100 gap-3">
          Select sensor(s):
          <Select
            class="search"
            multiple
            label="Select sensors"
            placeholder="Search by monitor type, sensor name, or zip code..."
            onChange={onChange}
            {...props}
          />
        </div>
        
          <label class="data-form-item">
            Pollutant
            <select class="select">
              <option>PM 2.5</option>
              <option>PM 10</option>
              <option>O3</option>
              <option>CO</option>
            </select>
          </label>
          <label class="data-form-item">
            Start time/date
            <input type="datetime-local" name="start-time" class="text-input"></input>
          </label>
          <label class="data-form-item">
            End time/date
            <input type="datetime-local" name="end-time" class="text-input"></input>
          </label>
          <label class="data-form-item">
            Time step
            <select class="select">
              <option>Hourly</option>
              <option>Daily</option>
              <option>Monthly</option>
              <option>Yearly</option>
            </select>
          </label>
          <div class="data-chart">data chart goes here</div>
          <label class="data-form-item" htmlFor="downloadSubmit">
            <button id="downloadSubmit" type="submit" name="submit" class="icon-btn btn-secondary">Download</button>
          </label>
        </form>
        </div>
        <div class="data-image">image goes here</div>
        {/* put another div here for image */}
      </section>
    );
  };
  
  export default Data;