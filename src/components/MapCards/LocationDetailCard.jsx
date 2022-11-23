import { Link } from '@solidjs/router';
import Sparkline from '../Charts/Sparkline';
import { useStore } from '../../stores';
import dayjs from 'dayjs/esm/index.js';

import Progress from '../Charts/Progress';
import relativeTime from 'dayjs/plugin/relativeTime';
import { For } from 'solid-js';
import {
  LowCostSensorMarker,
  ReferenceGradeMarker,
} from '../LocationMarker';

dayjs.extend(relativeTime);

export default function LocationDetailCard() {
  const [store, { clearLocation, loadMeasurementsSource }] =
    useStore();

  function timeFromNow(lastUpdated) {
    return `Updated ${dayjs(lastUpdated).fromNow()}`;
  }

  function since(lastUpdated) {
    return `Since ${dayjs(lastUpdated).format('DD/MM/YYYY')}`;
  }

  const series = [
    {
      locationId: 2178,
      location: 'Del Norte',
      parameter: 'pm25',
      value: 11.2,
      date: {
        utc: '2022-09-10T16:00:00+00:00',
        local: '2022-09-10T10:00:00-06:00',
      },
      unit: 'µg/m³',
      coordinates: { latitude: 35.1353, longitude: -106.584702 },
      country: 'US',
      city: 'Albuquerque',
      isMobile: false,
      isAnalysis: false,
      entity: 'government',
      sensorType: 'reference grade',
    },
    {
      locationId: 2178,
      location: 'Del Norte',
      parameter: 'pm25',
      value: 9.6,
      date: {
        utc: '2022-09-10T15:00:00+00:00',
        local: '2022-09-10T09:00:00-06:00',
      },
      unit: 'µg/m³',
      coordinates: { latitude: 35.1353, longitude: -106.584702 },
      country: 'US',
      city: 'Albuquerque',
      isMobile: false,
      isAnalysis: false,
      entity: 'government',
      sensorType: 'reference grade',
    },
    {
      locationId: 2178,
      location: 'Del Norte',
      parameter: 'pm25',
      value: 9.2,
      date: {
        utc: '2022-09-10T14:00:00+00:00',
        local: '2022-09-10T08:00:00-06:00',
      },
      unit: 'µg/m³',
      coordinates: { latitude: 35.1353, longitude: -106.584702 },
      country: 'US',
      city: 'Albuquerque',
      isMobile: false,
      isAnalysis: false,
      entity: 'government',
      sensorType: 'reference grade',
    },
    {
      locationId: 2178,
      location: 'Del Norte',
      parameter: 'pm25',
      value: 9.0,
      date: {
        utc: '2022-09-10T13:00:00+00:00',
        local: '2022-09-10T07:00:00-06:00',
      },
      unit: 'µg/m³',
      coordinates: { latitude: 35.1353, longitude: -106.584702 },
      country: 'US',
      city: 'Albuquerque',
      isMobile: false,
      isAnalysis: false,
      entity: 'government',
      sensorType: 'reference grade',
    },
    {
      locationId: 2178,
      location: 'Del Norte',
      parameter: 'pm25',
      value: 8.0,
      date: {
        utc: '2022-09-10T12:00:00+00:00',
        local: '2022-09-10T06:00:00-06:00',
      },
      unit: 'µg/m³',
      coordinates: { latitude: 35.1353, longitude: -106.584702 },
      country: 'US',
      city: 'Albuquerque',
      isMobile: false,
      isAnalysis: false,
      entity: 'government',
      sensorType: 'reference grade',
    },
    {
      locationId: 2178,
      location: 'Del Norte',
      parameter: 'pm25',
      value: 8.0,
      date: {
        utc: '2022-09-10T11:00:00+00:00',
        local: '2022-09-10T05:00:00-06:00',
      },
      unit: 'µg/m³',
      coordinates: { latitude: 35.1353, longitude: -106.584702 },
      country: 'US',
      city: 'Albuquerque',
      isMobile: false,
      isAnalysis: false,
      entity: 'government',
      sensorType: 'reference grade',
    },
    {
      locationId: 2178,
      location: 'Del Norte',
      parameter: 'pm25',
      value: 7.7,
      date: {
        utc: '2022-09-10T10:00:00+00:00',
        local: '2022-09-10T04:00:00-06:00',
      },
      unit: 'µg/m³',
      coordinates: { latitude: 35.1353, longitude: -106.584702 },
      country: 'US',
      city: 'Albuquerque',
      isMobile: false,
      isAnalysis: false,
      entity: 'government',
      sensorType: 'reference grade',
    },
    {
      locationId: 2178,
      location: 'Del Norte',
      parameter: 'pm25',
      value: 8.0,
      date: {
        utc: '2022-09-10T09:00:00+00:00',
        local: '2022-09-10T03:00:00-06:00',
      },
      unit: 'µg/m³',
      coordinates: { latitude: 35.1353, longitude: -106.584702 },
      country: 'US',
      city: 'Albuquerque',
      isMobile: false,
      isAnalysis: false,
      entity: 'government',
      sensorType: 'reference grade',
    },
    {
      locationId: 2178,
      location: 'Del Norte',
      parameter: 'pm25',
      value: 8.4,
      date: {
        utc: '2022-09-10T08:00:00+00:00',
        local: '2022-09-10T02:00:00-06:00',
      },
      unit: 'µg/m³',
      coordinates: { latitude: 35.1353, longitude: -106.584702 },
      country: 'US',
      city: 'Albuquerque',
      isMobile: false,
      isAnalysis: false,
      entity: 'government',
      sensorType: 'reference grade',
    },
    {
      locationId: 2178,
      location: 'Del Norte',
      parameter: 'pm25',
      value: 9.9,
      date: {
        utc: '2022-09-10T07:00:00+00:00',
        local: '2022-09-10T01:00:00-06:00',
      },
      unit: 'µg/m³',
      coordinates: { latitude: 35.1353, longitude: -106.584702 },
      country: 'US',
      city: 'Albuquerque',
      isMobile: false,
      isAnalysis: false,
      entity: 'government',
      sensorType: 'reference grade',
    },
  ];

  return (
    <article
      className={`dismissable-card location-detail-card ${
        !store.id || store.help.active
          ? 'dismissable-card--translate'
          : ''
      }`}
    >
      <header className="location-detail-card__header">
        <h3 className="map-card-title">
          {store.location ? store.location?.name : 'Loading...'}
        </h3>
        <button className="close-btn" onClick={() => clearLocation()}>
          <span class="material-symbols-outlined clickable-icon white">
            close
          </span>
        </button>
      </header>
      <div
        className={`map-card__body  ${
          store.location ? '' : 'loading-shimmer'
        }`}
      >
        <section className="map-card-section">
          <span className="type-body-2">
            {store.location?.city
              ? store.location?.city
              : 'No city listed'}
            ,
          </span>{' '}
          <span className="type-body-3">
            {store.location?.country}
          </span>
        </section>
        <hr className="hr" />
        <section className="map-card-section">
          <div
            style="display: grid; row-gap: 10px; column-gap: 10px;
    grid-template-columns: 1fr 2fr;"
          >
            <div>Type:</div>
            <div>
              {store.location?.sensorType}{' '}
              <Show
                when={store.location?.sensorType == 'reference grade'}
                fallback={<LowCostSensorMarker />}
              >
                <ReferenceGradeMarker />
              </Show>{' '}
            </div>
            <div>Measures:</div>
            <div>
              <For each={store.location?.parameters}>
                {(parameter, i) => (
                  <span className="parameter-label type-body-1">
                    {parameter.displayName} ({parameter.unit}),
                  </span>
                )}
              </For>
            </div>
          </div>
        </section>
        <hr className="hr" />
        <section className="map-card-section">
          <div
            style="display: grid; row-gap: 10px; column-gap: 10px;
grid-template-columns: 1fr 2fr;"
          >
            <div>Provider:</div>{' '}
            <div>
              <For each={store.location?.sources}>
                {(source, i) => {
                  return source.url ? (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={source.url}
                    >
                      {source.name}
                    </a>
                  ) : (
                    <span>{source.name}</span>
                  );
                }}
              </For>
            </div>
            <div>Reporting: </div>
            <div>
              {timeFromNow(store.location?.lastUpdated)}
              <div>
                <span class="body4 smoke120">
                  {since(store.location?.firstUpdated)}
                </span>
              </div>
            </div>
          </div>
        </section>
        <hr className="hr" />
        <section className="map-card-section">
          <div style="display: grid; grid-template-columns: 1fr 2fr; row-gap: 10px; column-gap: 10px;">
            <div>Data Coverage </div>
            <div>
              <Progress
                width={150}
                height={10}
                margin={{ top: 10, right: 10, bottom: 20, left: 10 }}
                percent={0.5}
                legend={true}
              />
            </div>
          </div>
        </section>
        <hr className="hr" />
        <section className="map-card-section">
          <div className="location-detail-card-section-heading">
            {' '}
            Latest Readings{' '}
          </div>
          <div style="display: grid; grid-template-columns: 0.5fr 1fr 1fr; row-gap: 18px;">
            <For each={store.location?.parameters}>
              {(parameter, i) => {
                return (
                  <>
                    <span>{parameter.displayName}</span>
                    <div>
                      <span style="color: #8576ED; font-weight: 700;">
                        {parameter.lastValue}
                      </span>{' '}
                      {parameter.unit}
                    </div>
                    <Sparkline
                      series={series}
                      width={78}
                      height={14}
                      margin={{
                        top: 1,
                        right: 1,
                        bottom: 1,
                        left: 1,
                      }}
                      style={{
                        strokeColor: '#5d48f4',
                        stokeWidth: '3',
                        fill: 'none',
                      }}
                    />
                  </>
                );
              }}
            </For>
          </div>
        </section>
      </div>
      <footer className="location-detail-card__footer">
        <Link
          disabled
          className={`icon-btn btn-primary ${
            store.location ? '' : ' btn-primary--disabled'
          }`}
          href={
            store.location ? `/locations/${store.location.id}` : ''
          }
        >
          Show Details
          <span class="material-symbols-outlined white">
            arrow_right_alt
          </span>
        </Link>
      </footer>
    </article>
  );
}
