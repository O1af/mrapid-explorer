import { createSignal } from "solid-js";
//import { Select, createOptions } from "@thisbeyond/solid-select";
import "@thisbeyond/solid-select/style.css";
import './search.scss';
//import { MultiSelect } from '@digichanges/solid-multiselect';

//import { BookList } from "./BookList";
import { AddSensor } from "./AddSensor";

const initialSensors = [];

function Sensors() {
  const [setSensors] = createSignal(initialSensors);

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

      </form>
      </div>
      <div class="data-image-container">
        <h3>Map of Detroit Zip Codes</h3>
        <div class="data-image">
          <img src="/src/assets/detroitmap.jpg" alt="map of detroit zipcodes"/>
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