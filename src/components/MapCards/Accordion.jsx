/* eslint-disable jsx-a11y/no-static-element-interactions */
import { createContext, useContext, For, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { useStore } from "../../stores";
//import { ExpandableCard } from './ExpandableCard';
import { ClarityMarker } from "../LocationMarker";
import { TSIMarker } from "../LocationMarker";
import { DSTMarker } from "../LocationMarker";
import { PurpleAirMarker } from "../LocationMarker";
import { NoRecentUpdateMarker } from "../LocationMarker";
import { ReferenceGradeMarker } from "../LocationMarker";

const AccordionContext = createContext();

function AccordionProvider(props) {
  const [activePanel, setActivePanel] = createStore({
      name: "", //uncomment to make this open by default
    }),
    accordion = [
      activePanel,
      {
        togglePanel(panel) {
          setActivePanel({ name: panel });
        },
      },
    ];

  return (
    <AccordionContext.Provider value={accordion}>
      {props.children}
    </AccordionContext.Provider>
  );
}

function useAccordion() {
  return useContext(AccordionContext);
}

function AccordionHelp(props) {
  const [, { toggleHelp, loadContent }] = useStore();

  const showHelp = (e) => {
    toggleHelp(true);
    loadContent(props.contentKey);
    e.stopPropagation();
  };

  return (
    <button class="button-reset" onClick={(e) => showHelp(e)}>
      <span
        class={`${props.contentKey}-help-btn material-symbols-outlined ${
          props.open() ? "white" : "grey"
        }`}
      >
        help
      </span>
    </button>
  );
}

function AccordionPanel(props) {
  const [activePanel, { togglePanel }] = useAccordion();

  const open = () => activePanel.name == props.name;

  const toggleAndClose = () => {
    if (open()) {
      togglePanel("");
    } else {
      togglePanel(props.name);
    }
  };

  return (
    <section class="accordion">
      <header
        class={`accordion__header ${open() ? "accordion__header--open" : ""}`}
        onClick={toggleAndClose}
        onKeyDown={() => console.log("keydown")}
      >
        <div class="header-section">
          <h3 class="accordion__header-title">{props.title}</h3>
          <AccordionHelp contentKey={props.contentKey} open={open} />
        </div>
        <div class="header-section">
          {/* {props.active ? (
            <Badge type={'status-ok'}>
              Active
              <span class={`material-symbols-outlined white`}>
                visibility
              </span>
            </Badge>
          ) : (
            <span
              class={`material-symbols-outlined ${
                open() ? 'white' : 'smoke120'
              }`}
            >
              visibility_off
            </span>
          )} */}
        </div>
      </header>
      <div class={`accordion__body ${open() ? "accordion__body--open" : ""}`}>
        {props.children}
      </div>
    </section>
  );
}
export const [selectedValue, setSelectedValue] = createSignal("Concentration");

export default function Accordion() {
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
      loadParameter,
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

  //on load get aqi value from openweathermap api and store
  // const [aqi, setAqi] = createSignal(0);
  // const api_key = '69c74c1baa5a315002de22b050a3f4f6';
  // onMount(async () => {
  //   const lat = 0;
  //   const long = 0;

  //   const response = await fetch(
  //     `https://api.openweathermap.org/data/2.5/air_pollution?lat=-83.04960&lon=42.33379&appid=${api_key}`
  //   );
  //   const data = await response.json();
  //   const aqi1 = data.list[0].main.aqi;
  //   console.log(data);
  //   setAqi(aqi1);
  // });

  return (
    <AccordionProvider>
      <AccordionPanel
        name="pollutants"
        title="Pollutant"
        contentKey="pollutants"
        active={store.mapThreshold.active}
      >
        <h1>Select the unit and pollutant</h1>
        <div
          onChange={(e) => {
            setSelectedValue(e.target.value);
            //add points to store
          }}
        >
          <label>
            <input
              type="radio"
              name="group"
              value="AQI"
              checked={selectedValue() === "AQI"}
            />
            AQI
          </label>
          <label>
            <input
              type="radio"
              name="group"
              value="Concentration"
              checked={selectedValue() === "Concentration"}
            />
            Concentration
          </label>
        </div>

        <select
          name=""
          id=""
          class="select"
          onChange={(e) => {
            loadParameter(e.target.value);
            //to get parameter do : store.parameter.id
          }}
        >
          <For each={store.parameters()}>
            {(parameter) => (
              <option
                value={parameter.id}
                selected={parameter.id == store.parameter.id}
              >
                {parameter.displayName} {parameter.units}
              </option>
            )}
          </For>
        </select>
      </AccordionPanel>
      <AccordionPanel
        name="filters"
        title="Filters"
        contentKey="filters"
        active={store.mapThreshold.active}
      >
        <div style={{ margin: "16px 15px" }}>
          <div class="filters-section__body">
            <NoRecentUpdateMarker />
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
            </label>
          </div>
        </div>
      </AccordionPanel>
    </AccordionProvider>
  );
}
