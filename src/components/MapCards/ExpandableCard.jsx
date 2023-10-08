import { createSignal } from 'solid-js';
import { useStore } from '../../stores';
import {
  ClarityMarker,
  DSTMarker,
  // LowCostSensorMarker,
  NoRecentUpdateMarker,
  PurpleAirMarker,
  ReferenceGradeMarker,
  TSIMarker,
  // TextMarker, //new
} from '../LocationMarker';
import Accordion from './Accordion';

export function ExpandableCard(props) {
  const [open] = createSignal(true);
  const [store] = useStore();

  return (
    <div
      class={`expandable-card ${
        store.help.active || store.id
          ? 'expandable-card--translate'
          : ''
      }`}
    >
      <div class="expandable-card__header">
        <div style={{ display: 'flex', 'align-items': 'center' }}>
          <h3 class="type-heading3 text-white">
            {open() ? 'Settings' : 'Overlay & Filters'}
          </h3>
        </div>
      </div>
      <div
        class={
          open()
            ? 'expandable-card__body expandable-card__body--open'
            : 'expandable-card__body'
        }
      >
        {props.children}
      </div>
    </div>
  );
}

export default function FilterOverlayCard() {
  const [
    store,
    {
      // toggleProviderList,
      toggleMonitor,
      // toggleText, // new
      toggleDST,
      toggleTSI,
      toggleClarity,
      toggleInactive,
      togglePurpleAir,
    },
  ] = useStore();

  const monitorCheck = (e) => {
    toggleMonitor(e.target.checked);
  };

  const clarityCheck = (e) => {
    toggleClarity(e.target.checked);
  };
  const dstCheck = (e) => {
    toggleDST(e.target.checked);
  };
  const tsiCheck = (e) => {
    toggleTSI(e.target.checked);
  };
  const purpleairCheck = (e) => {
    togglePurpleAir(e.target.checked);
  };

  const noRecentUpdatesCheck = (e) => {
    toggleInactive(e.target.checked);
  };

  return (
    <ExpandableCard>
      <Accordion />
      {/* <section class="filters-section">
        <header class="expandable-card__header">
          <div style={{ display: 'flex', 'align-items': 'center' }}>
            <span class="material-symbols-rounded white">
              filter_alt
            </span>
            <h3 class="type-heading3 text-white">Filters</h3>
          </div>
        </header>
        <div style={{ margin: '16px 15px' }}>
          <div class="filters-section__body"> */}
            {/* <NoRecentUpdateMarker />
            <label class="marker-legend-item" for="recent-updates">
              <span>Exclude inactive monitors</span>
              <input
                type="checkbox"
                name="recent-updates"
                id="recent-updates"
                class="checkbox"
                checked={store.mapFilters.excludeInactive}
                onChange={noRecentUpdatesCheck}
              />
            </label>
            
            <ReferenceGradeMarker />
            <label class="marker-legend-item" for="reference-grade">
              <span>EPA monitor locations</span>
              <input
                type="checkbox"
                name="reference-grade"
                id="reference-grade"
                class="checkbox"
                checked={store.mapFilters.monitor}
                onChange={monitorCheck}
              />
            </label>
            <PurpleAirMarker />
            <label class="marker-legend-item" for="purple-air">
              PurpleAir locations
              <input
                type="checkbox"
                name="low-cost-sensor"
                id="low-cost-sensor"
                class="checkbox"
                checked={store.mapFilters.purpleair}
                onChange={purpleairCheck}
              />
            </label>
            <DSTMarker />
            <label class="marker-legend-item" for="low-cost-sensor">
              DST locations
              <input
                type="checkbox"
                name="low-cost-sensor"
                id="low-cost-sensor"
                class="checkbox"
                checked={store.mapFilters.dst}
                onChange={dstCheck}
              />
            </label>

            <ClarityMarker />
            <label class="marker-legend-item" for="low-cost-sensor">
              Clarity locations
              <input
                type="checkbox"
                name="low-cost-sensor"
                id="low-cost-sensor"
                class="checkbox"
                checked={store.mapFilters.clarity}
                onChange={clarityCheck}
              />
            </label>
            <TSIMarker />
            <label class="marker-legend-item" for="low-cost-sensor">
              TSI locations
              <input
                type="checkbox"
                name="low-cost-sensor"
                id="low-cost-sensor"
                class="checkbox"
                checked={store.mapFilters.tsi}
                onChange={tsiCheck}
              />
            </label> */}
          {/* the code above was originally for the source toggle checkboxes */}

            {/* <TextMarker /> 
            <label class="marker-legend-item" for="data-text">
              Show Text
              <input
                type="checkbox"
                name="data-text"
                id="data-text"
                class="checkbox"
                checked={store.mapFilters.dataText}
                onChange={textCheck}
                disabled={!showText()}
              />
            </label> */}

            {/* <NoRecentUpdateMarker />
            <label class="marker-legend-item" for="no-recent-updates">
              Show locations with no recent updates
              <input
                type="checkbox"
                name="no-recent-updates"
                id="no-recent-updates"
                class="checkbox"
                onChange={noRecentUpdatesCheck}
              />
            </label> */}
          {/* </div>
        </div> */}
        {/* <div class="expandable-card__footer">
          <button
            class="btn btn-secondary icon-btn"
            onClick={() => toggleProviderList(true)}
          >
            Choose data providers
            <span class="material-symbols-outlined green">tune</span>
          </button>
        </div> */}
      {/* </section> */}
      <p>Click to open/close map options.</p>
    </ExpandableCard>
  );
}
