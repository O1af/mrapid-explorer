function Data() {
    return (
      <section class="page-data">
        <div class="data-form">
        <form>
        <h1>
          Download data from a sensor
        </h1>
          <label class="data-form-item">
            Zip code
            <input type="search" name="zip" class="text-input"></input>
          </label>
          <label class="data-form-item">
              Sensor
              <select class="select">
              <option>Clarity 12</option>
              <option>PurpleAir 5</option>
              <option>EPA 368</option>
              <option>DST 5</option>
            </select>
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
  }
  
  export default Data;