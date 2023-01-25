import style from './DetailOverview.module.css';
import dayjs from 'dayjs/esm/index.js';
import relativeTime from 'dayjs/plugin/relativeTime';
import Progress from '../Charts/Progress';
import { Link } from '@solidjs/router';
import { useStore } from '../../stores';
import {
  LowCostSensorMarker,
  ReferenceGradeMarker,
} from '../LocationMarker';

dayjs.extend(relativeTime);

function DetailMap() {
  const [store] = useStore();

  return (
    <div className="detail-map">
      <div className="detail-map-overlay">
        <div style="margin: 20px 16px;">
          <div className="detail-map-overlay__title">
            <h5 className="subtitle3">LOCATION</h5>
            <a
              href={`https://openstreetmap.org?mlat=${store.location?.coordinates.latitude}&mlon=${store.location?.coordinates.longitude}&zoom=16`}
              rel="noopener noreferrer"
              className="map-open-link"
              target="_blank"
            >
              <span class="material-symbols-outlined green">
                open_in_new
              </span>
            </a>
          </div>
          <div className="detail-map-overlay__coordinates">
            <span>{store.location?.coordinates.latitude}</span>
            <span>{store.location?.coordinates.longitude}</span>
          </div>
        </div>
      </div>
      <div className="detail-map__attribution">
        © <a href="https://www.mapbox.com/about/maps/">Mapbox</a> ©{' '}
        <a href="http://www.openstreetmap.org/copyright">
          OpenStreetMap
        </a>{' '}
        <strong>
          <a
            href="https://www.mapbox.com/map-feedback/"
            target="_blank"
          >
            Improve this map
          </a>
        </strong>
      </div>
      <img
        className="detail-map__image"
        src={`https://images.openaq.org/maps/explorer/location_${store.id}.webp`}
        alt=""
      />
    </div>
  );
}

export default function DetailOverview() {
  const [store, { loadLocation, checkForUpdate }] = useStore();

  function timeFromNow(lastUpdated) {
    return `Updated ${dayjs(lastUpdated).fromNow()}`;
  }

  function since(lastUpdated) {
    return `Since ${dayjs(lastUpdated).format('DD/MM/YYYY')}`;
  }

  setInterval(() => checkForUpdate(), 1000 * 60 * 5);

  return (
    <div style="position:relative; top: -10px;">
      <div
        className="bubble-lg"
        style="position:absolute; top: -46px; right: -120px; z-index:-1;"
      ></div>
      <div
        className="bubble-sm"
        style="position:absolute; top: 220px; right: 30px; z-index:-1;"
      ></div>
      <div className={`${style.overview} section-card`}>
        <div className={style['overview__header']}>
          <div>
            <div class="location-breadcrumb">
              <span className="type-subtitle-3">
                {store.location?.country.name}
                {store.location?.locality
                  ? '/'
                  : ' /No city listed'}{' '}
                {store.location?.locality}
              </span>
            </div>
            <h2 className="type-display-1 text-sky-120">
              {store.location?.name}
            </h2>
          </div>
          <div style="display:flex; height:40px">
            <Link
              href="#download-card"
              class="icon-btn btn-tertiary download-data-link"
            >
              <span>Download data </span>

              <span class="material-symbols-rounded">
                cloud_download
              </span>
            </Link>
          </div>
        </div>
        <div className={style['overview__body']}>
          <section style="flex: 1;">
            <h4>CHARACTERISTICS</h4>
            <div style="display: grid; grid-template-columns: 1fr 1fr; row-gap: 16px;">
              <div>Type</div>
              <div>
                {' '}
                <div style="display:flex; gap: 10px; align-items:center;">
                  {store.location?.isMonitor
                    ? 'Monitor'
                    : 'Air sensor'}
                  <Show
                    when={store.location?.isMonitor}
                    fallback={<LowCostSensorMarker />}
                  >
                    <ReferenceGradeMarker />
                  </Show>
                </div>{' '}
                <div>
                  {store.location?.isMobile ? 'Mobile' : 'Stationary'}
                </div>{' '}
              </div>
              <div>Measures</div>
              <div>
                {store.location?.sensors
                  .map(
                    (o) =>
                      `${o.parameter.name} (${o.parameter.units})`
                  )
                  .join(', ')}
              </div>
              <div>Name</div>
              <div>{store.location?.name}</div>
              <div>Reporting</div>
              <div>
                {timeFromNow(store.location?.datetimeLast.local)}
                <div>
                  <span class="body4 smoke120">
                    {since(store.location?.datetimeFirst.local)}
                  </span>
                </div>
              </div>
              <div>Provider</div>
              <div>
                {store.location?.provider.url ? (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={store.location?.provider.url}
                  >
                    {store.location?.provider.name}{' '}
                    <span class="material-symbols-outlined type-color-ocean-120">
                      open_in_new
                    </span>
                  </a>
                ) : (
                  <span>{store.location?.provider.name}</span>
                )}
              </div>
            </div>
          </section>
          <section style="flex: 1;"></section>
          <section style="flex: 1;">
            <DetailMap />
          </section>
        </div>
      </div>
    </div>
  );
}
