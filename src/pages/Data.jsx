import { createSignal, createUniqueId } from "solid-js";
import { Select, createOptions } from "@thisbeyond/solid-select";
import "@thisbeyond/solid-select/style.css";
import './search.scss';
import { MultiSelect } from '@digichanges/solid-multiselect';

const Data = () => {
  const createValue = (name) => {
    return { id: createUniqueId(), name };
  };
  
    return (
      <section class="page-data">
        
        <div class="data-form">
        <form>
        <h1>
          Download sensor data
        </h1>

        
        <label class="data-form-item">
        Zip Code(s)
          <MultiSelect
            style={{ chips: { color: "purple", "background-color": "pink" } }}
            options={["95120", "48060", "48227", "48211", "58757"]}
            onSelect={console.log}
            onRemove={console.log}
            class="search"
            //selectedValues={["yellow"]}
            //selectionLimit={2}
          />
        </label>

        <label class="data-form-item">
        Monitor Type(s)
          <MultiSelect
            style={{ chips: { color: "purple", "background-color": "pink" } }}
            options={["DST", "OAQ", "PAR", "CLA", "TSI"]}
            onSelect={console.log}
            onRemove={console.log}
            class="search"
          />
        </label>
        <label class="data-form-item">
        Pollutant(s)
          <MultiSelect
            style={{ chips: { color: "purple", "background-color": "pink" } }}
            options={["PM 2.5", "PM 10", "O3", "CO"]}
            onSelect={console.log}
            onRemove={console.log}
            class="search"
          />
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
          <label class="data-form-item" htmlFor="downloadSubmit">
            <button id="downloadSubmit" type="submit" name="submit" class="icon-btn btn-secondary">Download</button>
          </label>
        </form>
        </div>
        <div class="data-image-container">
          <h3>Map of Detroit Zip Codes</h3>
          <div class="data-image">
            <img src="/src/assets/detroitmap.jpg"/>
          </div>
          For a complete list of MI zip codes, refer to this 
          <a 
            href="https://www.michigan.gov/dtmb/-/media/Project/Websites/dtmb/Services/GIS/Static-Maps/Boundaries/ZIPCodeMap_LP102209.pdf?rev=ef32903cd06c47688b6f3978263a40f4&hash=FB40296EEACD32BC792E28F054C0E47D"
            target="_blank" 
            rel="noopener noreferrer"
          >
            document
          </a>.
        </div>
      </section>
    );
  };
  
  export default Data;