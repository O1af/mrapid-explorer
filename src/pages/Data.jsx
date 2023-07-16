function Data() {
    return (
      <div class="page-data">
        <h1>
          Data
        </h1>
        <h2>
          Download data from a sensor.
        </h2>
        <form>
          <p>
          <label>
            Zip code
            <input type="number" name="zip"></input>
          </label>
          </p>
          <p>
          <label>
              Sensor (nothing here yet)
          </label>
          </p>
          <p>
          <label>
            Pollutant
          </label>
          </p>
          <p>
          <label>
            Start time/date
            <input type="datetime-local" name="start-time"></input>
          </label>
          </p>
          <p>
          <label>
            End time/date
            <input type="datetime-local" name="end-time"></input>
          </label>
          </p>
          <p>
          <label>
            Time step
          </label>
          </p>
          <p>
          <label>
            <input type="submit" name="submit"></input>
          </label>
          </p>
        </form>
      </div>
    );
  }
  
  export default Data;