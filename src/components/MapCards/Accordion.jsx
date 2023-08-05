/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
  createContext,
  useContext,
  For,
} from 'solid-js';
import { createStore } from 'solid-js/store';
import { useStore } from '../../stores';
import {Radio, RadioGroup} from "solid-blocks";

const AccordionContext = createContext();

function AccordionProvider(props) {
  const [activePanel, setActivePanel] = createStore({
      name: 'pollutants',
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
        class={`${
          props.contentKey
        }-help-btn material-symbols-outlined ${
          props.open() ? 'white' : 'grey'
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

  return (
    <section class="accordion">
      <header
        class={`accordion__header ${
          open() ? 'accordion__header--open' : ''
        }`}
        onClick={() => {
          togglePanel(props.name);
        }}
        onKeyDown={() => console.log('keydown')}
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
      <div
        class={`accordion__body ${
          open() ? 'accordion__body--open' : ''
        }`}
      >
        {props.children}
      </div>
    </section>
  );
}

export default function Accordion() {
  const [store, { loadParameter }] =
    useStore();
  

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
        active={!store.mapThreshold.active}
        open={true}
      >
        <h1>Select the unit and pollutant</h1>
        <RadioGroup>
        <Radio>AQI</Radio>
        <Radio checked={true}>Concentration</Radio>
        </RadioGroup>
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
            {
            (parameter) => (
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
    </AccordionProvider>
  );
}
