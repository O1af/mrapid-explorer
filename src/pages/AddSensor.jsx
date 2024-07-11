import { createSignal, createResource, Show, For, onMount } from "solid-js";
import { searchSensors, getSensorData, csvDownload } from "./searchSensors";
import { Chart } from 'chart.js/auto';
import 'chartjs-adapter-moment';
// import { MultiSelect } from '@digichanges/solid-multiselect';
import { Select } from "@thisbeyond/solid-select";
//import "@thisbeyond/solid-select/style.css";
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
                  results['results'][step]['displayName'] + " " + 
                  results['results'][step]['units']));
  }
  return pollutants;
}

export function AddSensor() {
  const initialZip = []
  const initialType = []
  const initialPollutant = []
  const [zipSelectedValues, zipSetSelectedValues] = createSignal(initialZip);
  const [typeSelectedValues, typeSetSelectedValues] = createSignal(initialType);
  const [pollutantSelectedValues, pollutantSetSelectedValues] = createSignal(initialPollutant);
  const [singleSelectedPollutant, setsingleSelectedPolutant] = createSignal([{id: 'pm2.5', name: 'PM 2.5 µg/m³'}]);
  const [sensorSelected, sensorSetSelected] = createSignal([]);
  const [displayTable, setDisplayTable] = createSignal(false);
  const [displayGraph, setDisplayGraph] = createSignal(false);
  const [displayHelpFilterSensor, setDisplayHelpFilterSensor] = createSignal(false);
  const [displayHelpSelectSensor, setDisplayHelpSelectSensor] = createSignal(false);
  const [displayHelpFilterData, setDisplayHelpFilterData] = createSignal(false);
  const [graphData, setGraphData] = createSignal(null);

  // const [showForm, setShowForm] = createSignal(false);
  // const toggleForm = () => setShowForm(!showForm());

  let date = new Date();
  let day = ("0" + date.getDate()).slice(-2); // adjust 0 before single digit date
  let month = ("0" + (date.getMonth() + 1)).slice(-2); // adjust 0 before single digit month
  const [endDate, setEndDate] = createSignal(date.getFullYear() + "-" + month + "-" + day);
  date.setDate(date.getDate() - 2);
  day = ("0" + date.getDate()).slice(-2); // adjust 0 before single digit date
  month = ("0" + (date.getMonth() + 1)).slice(-2); // adjust 0 before single digit month
  const [startDate, setStartDate] = createSignal(date.getFullYear() + "-" + month + "-" + day);
  const [timeStep, setTimeStep] = createSignal("h");
  const onChangeTime = (event) => {
    setTimeStep(event.currentTarget.value)
    console.log(event.currentTarget.value)
    event.preventDefault();
  };
  const onChangeSelectedPollutant = (event) => {
    setsingleSelectedPolutant([{id: event.currentTarget.value, name: event.currentTarget[event.currentTarget.selectedIndex].text}])
    event.preventDefault();
  };
  

  // error messages
  const [err_message, set_err_message] = createSignal("");

  const onCsvDownload = (event) => {
    event.preventDefault();
  
    let jsondata = dataJson();
    if (jsondata.status == "No results") {
      set_err_message("No data for these parameters")
      return 0
    } else if (jsondata.message) {
      set_err_message("Please check that you've selected sensors")
      return 0
    }
    set_err_message("")
    jsondata = jsondata.results

    // for if/when we do multiple pollutant data downloads, delete singleselectedpollutant and uncomment below
    //csvDownload(jsondata, pollutantSelectedValues(), sensorSelected());
    console.log(singleSelectedPollutant()) 
    csvDownload(jsondata, singleSelectedPollutant(), sensorSelected()); 
    
  }
  // for creating query parameter list for sensors
  const sensorListParameters = () => {
    return {zip_code: zipSelectedValues(), type: typeSelectedValues(), pollutant: pollutantSelectedValues()}
  }
  const [data] = createResource(sensorListParameters, searchSensors)
  const onChangeSensors = (selected) => {
    sensorSetSelected(selected);
    data();
  };

  // for creating query parameter list for data json
  const sensorDataParameters = () => {
    // return {pollutant: pollutantSelectedValues(), sensor: sensorSelected(), 
    //         start: startDate(), end: endDate(), step: timeStep()}// unit inside the pollutant['name'] (do a .split())
    return {pollutant: singleSelectedPollutant(), sensor: sensorSelected(), 
      start: startDate(), end: endDate(), step: timeStep()}
  }
  const [dataJson] = createResource(sensorDataParameters, getSensorData)

  //////
  const [zipOptions] = createResource(getZipcodes)
  const onChangeZip = (selected) => {
    zipSetSelectedValues(selected);

    //setInput({ ...input(), q: selected});
    //input().q = selectedValues;
    zipOptions();
  };

  const types = [
    createValue("DST", "DST"),
    createValue("OAQ", "EPA"),
    createValue("PAR", "Purple Air"),
    createValue("TSI", "TSI"),
    createValue("CLA", "CLARITY"),
  ];
  // const [typeOptions] = createSignal(types);
  const onChangeType = (selected) => {
    typeSetSelectedValues(selected);
  };

  const [pollutantOptions] = createResource(getPollutants)
  const onChangePollutant = (selected) => {
    pollutantSetSelectedValues(selected);
    pollutantOptions();
    if (pollutantSelectedValues().length == 1) {
      setsingleSelectedPolutant(selected)
    }

  };

  const format = (item, type) => (type === "option" ? item.name : item.name);

  const selectZip = () => {
    zipSetSelectedValues(zipOptions);
    zipOptions();
  };
  const clearZip = () => {
    zipSetSelectedValues([]);
    zipOptions();
  }

  const selectType = () => {
    typeSetSelectedValues(types);
  };
  const clearType = () => {
    typeSetSelectedValues([]);
  }

  const selectPollutant = () => {
    pollutantSetSelectedValues(pollutantOptions);
    pollutantOptions();
  };

  const clearPollutant = () => {
    pollutantSetSelectedValues([]);
    pollutantOptions();
  }

  // //Show the graph of the data that was collected 
  // const show_graph = (event) => {

  //   //getting values
  //   let sensor_data = sensorDataParameters()
  //   let select_sensors = sensorListParameters()
  //   event.preventDefault();

  //   //err checking and err message
  //   if(sensor_data['start'].length === 0){set_err_message('Please provide a start time for the graph'); return}
  //   else if(sensor_data['end'].length === 0){set_err_message('Please provide an end time for the graph'); return}
  //   else if(sensor_data['step'].length === 0){set_err_message('Please provide a time step for the graph'); return}
  //   else if(select_sensors['zip_code'].length === 0){set_err_message('Please provide at least one zip code for the graph'); return}
  //   else if(select_sensors['pollutant'].length === 0){set_err_message('Please provide at least one pollutant for the graph'); return}

  //   let start_date = new Date(sensor_data['start']);
  //   let end_date = new Date(sensor_data['end']);

  //   if(start_date > end_date){set_err_message('Please provide a start date that is before the end date, or the same as the end date'); return}
  //   set_err_message("")
  //   //err checking and err message
    
  //   //let sensor_list = data();

  //   let jsondata = dataJson();
  //   console.log(jsondata)
 
  //   jsondata = jsondata.results
  //   /*
  //   sensor_data.sensor = sensor_list
  //   let results = getSensorData(sensor_data)
  //   console.log(results)
  //   */
  // }

  const onGraphShow = (event) => {
    setDisplayGraph(false);
    setDisplayGraph(true);
    event.preventDefault();
  }

  function ShowGraph() {
    let chartRef;
    let jsondata = dataJson();

    if (jsondata.status == "No results") {
      set_err_message("No data for these parameters")
      return (<></>)
    } else if (jsondata.message) {
      set_err_message("Please check that you've selected sensors")
      return (<></>)
    }
    set_err_message("")
    jsondata = jsondata.results

    onMount(() => {
      let dataSensors = []
      let sensorMapper = {}

      for (let step = 0; step < sensorSelected().length; step++) {
        sensorMapper[sensorSelected()[step].id] = step;
        dataSensors.push({label: sensorSelected()[step].name, fill: false, data : []});
      }

      for (const item of jsondata) {
        dataSensors[sensorMapper[item['sensor_id']]]['data'].push({x: item['time'], y: item['value']})
      }

      let tUnit = 'hour';
      let tFormat = {hour: 'MMM D, hA'}

      if (timeStep() == 'd') {
        tUnit =  'day';
        tFormat =  {day: 'MMM D'};
      } else if (timeStep() == 'm') {
        tUnit =  'month';
        tFormat =  {day: 'MMM YYYY'};
      } else if (timeStep() == 'y') {
        tUnit =  'year';
        tFormat =  {day: 'MMM YYYY'};
      }

      setGraphData({
        type: 'line',
        data: {datasets: dataSensors},
        options: {
          plugins: {
            title: {
              text: singleSelectedPollutant()[0].name + " Data",
              display: true
            }
          },
          scales: {
            x: {
              type: 'time',
              time: {
                unit: tUnit,
                displayFormats: tFormat
              },
              title: {
                display: true,
                text: 'Date'
              }
            },
            y: {
              title: {
                display: true,
                text: singleSelectedPollutant()[0].name + ' Values'
              }
            }
          },
        },
      });

      if (graphData()) {
        const ctx = chartRef.getContext('2d');
        new Chart(ctx, graphData());
      }
    });

  
    return (
      <div>
        <canvas ref={chartRef} />
      </div>
    );  
  }

  const onTableShow = (event) => {
    setDisplayTable(false);
    setDisplayTable(true);
    event.preventDefault();
  }
  
  function ShowTable() {
    let jsondata = dataJson();
    if (jsondata.status == "No results") {
      set_err_message("No data for these parameters")
      return (<></>)
    } else if (jsondata.message) {
      set_err_message("Please check that you've selected sensors")
      return (<></>)
    }
    set_err_message("")
    jsondata = jsondata.results

    let tableHeader = ['date', 'time']
    let cellInitializer = []
    var sensor_map = {}
    for (let step = 0; step < sensorSelected().length; step++) {
        tableHeader.push(sensorSelected()[step].name)
        cellInitializer.push("NA")
        sensor_map[sensorSelected()[step].id] = cellInitializer.length + 1
    }

    let cells = [tableHeader]
    let previousTime = new Date(jsondata[0]['time'])

    let cur_row = [].concat(previousTime.toLocaleString().split(", "),cellInitializer)

    for (const item of jsondata) { 
        let date = new Date(item['time'])
        if (date.getTime() != previousTime.getTime()) {
            cells.push(cur_row)
            previousTime = date
            cur_row = [].concat(previousTime.toLocaleString().split(", "),cellInitializer)
        } 
        cur_row[sensor_map[item['sensor_id']]] = +parseFloat(item['value']).toFixed(2); // item['value']
    } 
    cells.push(cur_row)

    return (
      <div style={"margin: 0 auto;"}>
        <h3 style="margin: 0 auto;">{singleSelectedPollutant()[0].name} Data</h3>
        <div class="data-table-container">
          <table class="datatable">
            <For each={cells}>{(row) =>
              <tr>
                <For each={row}>{(cell) =>
                  <th>{cell}</th>
                }</For>
              </tr>
            }</For>
          </table>
        </div>
      </div>
    );
  }

  const  onShowHelpFilterSensor = (event) => {
    if (displayHelpFilterSensor()) {
      setDisplayHelpFilterSensor(false);
    } else {
      setDisplayHelpFilterSensor(true);
    }
    event.preventDefault();
  }

  const  onShowHelpSelectSensor = (event) => {
    if (displayHelpSelectSensor()) {
      setDisplayHelpSelectSensor(false);
    } else {
      setDisplayHelpSelectSensor(true);
    }
    event.preventDefault();
  }

  const  onShowHelpFilterData = (event) => {
    if (displayHelpFilterData()) {
      setDisplayHelpFilterData(false);
    } else {
      setDisplayHelpFilterData(true);
    }
    event.preventDefault();
  }
  return (
    <>
      <div class="data-container">
      <form>
        <div style="display: flex;justify-content: start;">
          <h3>Filter Sensors</h3>
          <button class="help material-symbols-outlined" 
            onClick={onShowHelpFilterSensor}
            type="button"> 
            help
          </button>
        </div>
        <Show when={displayHelpFilterSensor()}>
          <div class="help-content">Use these filters if you want to limit the list of available sensors under Select Sensors by zipcode, sensor type, and/or pollutant measured.</div>
        </Show>
      
      <div class="data-form-item">

      
      <div class="flex flex-1 flex-col max-w-100 gap-3" >
        <label htmlFor="zip_code">Filter sensors by zip code</label>
        <Select
          class="search"
          id="zip_code"
          //value={input().zip_code}
          multiple
          initialValue = {zipSelectedValues()}
          label="Select sensors"
          placeholder="Search by zip code"
          onChange={onChangeZip}
          format={format}
          options={zipOptions}
          isOptionDisabled={(option) => (zipSelectedValues().length != 0) ? zipSelectedValues().includes(option) : false}
        />
      </div>
      <label htmlFor="zip_select_all" class="filter-button-container">
        <button type="button" onClick={selectZip} class="filter-button" style="border-radius:5px;border:1px solid;">
          Select all zip codes
        </button>
        <button type="button" onClick={clearZip} class="filter-button" style="border-radius:5px;border:1px solid;">
          Clear all selected zip codes
        </button>
      </label>
      
      <div class="flex flex-1 flex-col max-w-100 gap-3">
        <label htmlFor="type">Filter sensors by sensor type</label>
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
      <label htmlFor="monitor_select_all" class="filter-button-container">
        <button type="button" onClick={selectType} class="filter-button" style="border-radius:5px;border:1px solid;">
          Select all monitor types
        </button>
        <button type="button" onClick={clearType} class="filter-button" style="border-radius:5px;border:1px solid;">
          Clear all selected monitor types
        </button>
      </label>
      
      <div class="flex flex-1 flex-col max-w-100 gap-3">
        <label htmlFor="pollutant">Filter sensors by pollutants</label>
        <Select
          class="search"
          id="pollutant"
          //value={input().zip_code}
          multiple
          initialValue={pollutantSelectedValues()}
          label="Select sensors"
          placeholder="Search by pollutant"
          onChange={onChangePollutant}
          //{...propsPollutant}
          format={format}
          options={pollutantOptions}
          isOptionDisabled={(option) => (pollutantSelectedValues().length != 0) ? pollutantSelectedValues().includes(option) : false}
        />
      </div>
      
      <label htmlFor="pollutant_select_all" class="filter-button-container">
        <button type="button" onClick={selectPollutant} class="filter-button" style="border-radius:5px;border:1px solid;">
          Select all pollutants
        </button>
        <button type="button" onClick={clearPollutant} class="filter-button" style="border-radius:5px;border:1px solid;">
          Clear all selected pollutants
        </button>
      </label>

      </div>
      <div style="display: flex;justify-content: start;">
          <h3>Select Sensors</h3>
          <button class="help material-symbols-outlined" 
            onClick={onShowHelpSelectSensor}
            type="button"> 
            help
          </button>
      </div>
      <Show when={displayHelpSelectSensor()}>
        <div class="help-content">You must choose at least one sensor in order to see any data. You can choose multiple sensors, though they might not all have data for the same parameters.</div>
      </Show>
      <div class="data-form-item">
      <Show when={!data.loading} fallback={<>Searching...</>}>
        <div class="flex flex-1 flex-col max-w-100 gap-3">
        <label htmlFor="type">Select Sensors to see their data</label>
          <Select
            class="search"
            id="sensor"
            //value={input().zip_code}
            multiple
            label="sensor selector"
            placeholder="Search for sensors"
            onChange={onChangeSensors}
            format={format}
            options={data()}
            isOptionDisabled={(option) => (sensorSelected().length != 0) ? sensorSelected().includes(option) : false}
          />
        </div>
      </Show>
      </div>

      <div style="display: flex;justify-content: start;">
          <h3>Filter Sensor Data</h3>
          <button class="help material-symbols-outlined" 
            onClick={onShowHelpFilterData}
            type="button"> 
            help
          </button>
      </div>
      <Show when={displayHelpFilterData()}>
        <div class="help-content">Specify what data you wish to see from the sensors selected above. Select which pollutant you are interested in viewing, as well as the time frame and granularity of the data.</div>
      </Show>
      <label class="data-form-item">
        Choose the pollutant to display
        <select class="select" value={pollutantSelectedValues().length == 1 ? pollutantSelectedValues()[0].id : "pm2.5"} onChange={onChangeSelectedPollutant}>
          <For each={pollutantOptions()}>{(val) =>
             <option value={val.id}>{val.name}</option>
          }</For>
        </select>
      </label>
      <label class="data-form-item">
        Start time/date
        <input type="date" value={startDate()} onChange={(e) => setStartDate(e.currentTarget.value)} name="start-time" class="text-input"></input>
      </label>
      <label class="data-form-item">
        End time/date
        <input type="date" value={endDate()} onChange={(e) => setEndDate(e.currentTarget.value)} name="end-time" class="text-input"></input>
      </label>
      <label class="data-form-item">
        Time step
        <select class="select" value={timeStep()} onChange={onChangeTime}>
          <option value="h">Hourly</option>
          <option value="d">Daily</option>
          <option value="m">Monthly</option>
          <option value="y">Yearly</option>
        </select>
      </label>
      </form>
      </div>


      <h6>{err_message}</h6>
      <label class="data-form-item" htmlFor="graphSubmit">
          <button onClick={onGraphShow} id="graphSubmit" type="submit" name="submit" class="icon-btn btn-secondary">Show A Graph of the data</button>
      </label>
      
      <label class="data-form-item" htmlFor="downloadSubmit">
          <button onClick={onCsvDownload} id="downloadSubmit" type="submit" name="submit" class="icon-btn btn-secondary">Download A CSV</button>
      </label>

      <label class="data-form-item" htmlFor="tableSubmit">
          <button onClick={onTableShow} id="tableSubmit" type="submit" name="submit" class="icon-btn btn-secondary">Show A Table</button>
      </label>
      <Show when={displayTable()}>
        <ShowTable/>
      </Show>
      <Show when={displayGraph()}>
        <ShowGraph/>
      </Show>
      

    </>
  );
}


