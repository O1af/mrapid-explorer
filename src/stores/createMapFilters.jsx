import { createStore } from 'solid-js/store';

export default function createMapFilters(client, actions, state) {
  const [mapFilters, setMapFilters] = createStore({
    monitor: true,
    airSensor: true,
    excludeInactive: true,
    providers: state.providers,
    dataText: true, //determines whether the checkbox is checked or not upon load
  });
  Object.assign(actions, {
    toggleMonitor: (value) => {
      setMapFilters({ monitor: value });
    },
    toggleAirSensor: (value) => {
      setMapFilters({ airSensor: value });
    },
    toggleInactive: (value) => {
      setMapFilters({ excludeInactive: !value });
    },
    toggleText: (value) => {
      setMapFilters({dataText: value});
    },
    updateProviders: (providersIds) => {
      setMapFilters({
        providers: providersIds,
      });
    },
  });

  return mapFilters;
}
