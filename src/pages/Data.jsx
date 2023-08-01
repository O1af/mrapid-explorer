
import React, { useState } from "react";
import { Select } from "@thisbeyond/solid-select";

const Data = () => {
  const options = ["apple", "banana", "pear", "pineapple", "kiwi"];

    return (
      <section class="page-data">
        
        <div class="data-form">
        <form>
        <h1>
          Download data from a sensor
        </h1>
        <div>
          <Select options={options} />
        </div>
        
          <label class="data-form-item">
            Sensor
            <input list="sensors" id="mySensor" size="35" name="mySensor" placeholder="Search by Zip Code..." />
            <datalist id="sensors">
            <option value="DST : 101 2236 14TH STREET (95120)"></option>
            <option value="DST : 102 TRINITY (20147)"></option>
            <option value="DST : 103 TRINITY (20147)"></option>
            <option value="DST : 93 2236 14TH STREET (95120)"></option>
            <option value="DST : RECOVERY PARK (95120)"></option>
            <option value="DST : OA 95 (48105)"></option>
            <option value="DST : 96 ECN (90012)"></option>
            <option value="DST : 99 TRINITY (20147)"></option>
            <option value="DST : ANN ARBOR 2 (48105)"></option>
            <option value="DST : LINWOOD (48105)"></option>
            <option value="OAQ : PORT HURON (48060)"></option>
            <option value="PAR : Appoline St (48227)"></option>
            <option value="CLA : AHKQKKTX (48211)"></option>
            <option value="TSI : FBPOWER1 (58757)"></option>
            </datalist>
          </label>
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
          <label class="data-form-item">
            <button type="submit" name="submit" class="icon-btn btn-secondary">Download</button>
          </label>
        </form>
        </div>
        <div class="data-image">image goes here</div>
        {/* put another div here for image */}
      </section>
    );
  };
  
  export default Data;