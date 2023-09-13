import { createSignal, createUniqueId, Show } from "solid-js";
//import { Select, createOptions } from "@thisbeyond/solid-select";
import "@thisbeyond/solid-select/style.css";
import './search.scss';
//import { MultiSelect } from '@digichanges/solid-multiselect';

//import { BookList } from "./BookList";
import { AddSensor } from "./AddSensor";

const initialSensors = [];

function Sensors(props) {
  const [sensors, setSensors] = createSignal(initialSensors);

  return (
    <div>
      <AddSensor setSensors={setSensors} />
    </div>
  );
}

const Data = () => {
  
    return (

      <section class="page-data">
      <div class="data-form">
      <form>
        <h1>
          Download sensor data
        </h1>

        <Sensors name="Solid"/>

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