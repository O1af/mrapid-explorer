import { Link } from "@solidjs/router";
//import Sparkline from "../Charts/Sparkline";
import { useStore } from "../../stores";
import dayjs from "dayjs/esm/index.js";
//import { group } from "d3";

import relativeTime from "dayjs/plugin/relativeTime";
import { For, Show } from "solid-js";
import { ReferenceGradeMarker } from "../LocationMarker";

dayjs.extend(relativeTime);

export default function LocationDetailCard() {
  const [store, { clearLocation }] = useStore();

  function timeFromNow(lastUpdated) {
    return `Updated ${dayjs(lastUpdated).fromNow()}`;
  }

  function since(lastUpdated) {
    return `Since ${dayjs(lastUpdated).format("DD/MM/YYYY")}`;
  }

  function latestMeasurementTime(lastUpdated) {
    return dayjs(lastUpdated).format("HH:mm");
  }

  store.recentMeasurements()?.reduce((r, a) => {
    r[a.parameter] = r[a.parameter] || [];
    r[a.parameter].push(a);
    return r;
  }, Object.create(null));

  return (
    <article
      class={`dismissable-card location-detail-card ${
        !store.id || store.help.active ? "dismissable-card--translate" : ""
      }`}
    >
      <header class="location-detail-card__header">
        <h3 class="map-card-title">
          {store.location?.sensor_name
            ? store.location.sensor_name
            : "Loading..."}
        </h3>
        <button class="close-btn" onClick={() => clearLocation()}>
          <span class="material-symbols-outlined clickable-icon black">
            close
          </span>
        </button>
      </header>
      <div class={`map-card__body`}>
        <section class="map-card-section">
          <span class="type-body-2">
            {store.location?.location?.region
              ? store.location.location.region
              : "Loading..."}
          </span>
        </section>
        <hr class="hr" />
        <section class="map-card-section">
          <div
            style={{
              display: "grid",
              "row-gap": "10px",
              "column-gap": "10px",
              "grid-template-columns": "1fr 2fr",
            }}
          >
            <div>Type:</div>
            <div>
              <div
                style={{
                  display: "flex",
                  gap: "15px",
                  "align-items": "center",
                }}
              >
                {store.location?.isMonitor ? "Monitor" : "Air sensor"}{" "}
                <Show
                  when={store.location?.isMonitor}
                  fallback={<ReferenceGradeMarker />}
                >
                  <ReferenceGradeMarker />
                </Show>{" "}
              </div>
            </div>
            <div>Measures:</div>
            <div>
              {/* iterate over store.location.measurements array and rerender when it changes */}
              <For each={store.location?.measurements}>
                {(measurement) => {
                  return (
                    <div>
                      <span class="type-body-3 text-lavender-100">
                        {measurement.parameter}
                      </span>
                      <span class="type-body-1">{measurement.unit}</span>
                    </div>
                  );
                }}
              </For>
            </div>
          </div>
        </section>
        <hr class="hr" />
        <section class="map-card-section">
          <div
            style={{
              display: "grid",
              "row-gap": "10px",
              "column-gap": "10px",
              "grid-template-columns": "1fr 2fr",
            }}
          >
            <div>Provider:</div>
            <div>{store.location?.source}</div>
            <div>Reporting: </div>
            <div>
              {timeFromNow(store.location?.measurements[0]?.time)}
              <div>
                <span class="body4 smoke120">
                  {since(
                    store.location?.measurements[
                      store.location.measurements.length - 1
                    ]?.time
                  )}
                </span>
              </div>
            </div>
          </div>
        </section>

        <hr class="hr" />
        <section class="map-card-section recent-readings">
          <header class="location-detail-card-section-heading recent-readings__header">
            <span class="type-subtitle-3">Latest Readings </span>
            <span class="type-body-2 text-smoke-100">
              {`${latestMeasurementTime(
                store.location?.measurements[0]?.time
              )} (local time)`}
            </span>
          </header>
          <div class="recent-readings__body">
            <For each={store.location?.measurements}>
              {(measurement) => {
                return (
                  <div>
                    <span class="type-subtitle-3">{measurement.parameter}</span>
                    <div>
                      <span class="type-body-3 text-lavender-100">
                        {measurement.value}{" "}
                      </span>
                      <span class="type-body-1">{measurement.unit}</span>
                    </div>
                  </div>
                );
              }}
            </For>
          </div>
        </section>
      </div>
      <footer class="location-detail-card__footer">
        <Link
          disabled
          class={`icon-btn btn-primary ${
            store.location ? "" : " btn-primary--disabled"
          }`}
          href={store.location ? `/locations/${store.location.sensor_id}` : ""}
        >
          Show Details
          <span class="material-symbols-outlined white">arrow_right_alt</span>
        </Link>
      </footer>
    </article>
  );
}
