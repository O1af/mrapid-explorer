import { createStore } from 'solid-js/store';

export default function createParameter(client, actions, state) {
  //const [parameterId, setParameter] = createSignal(2);
  const [parameter, setParameter] = createStore({
    id: 1, //changes which pollutant initially appears on load
    parameterName: 'Black C', //starting label for starting pollutant
    unit: 'µg/m³',
  });

  Object.assign(actions, {
    loadParameter(id) {
      console.log(state.parameters());
      const parameter = state
        .parameters()
        .find((x) => x.id === parseInt(id));
      setParameter({
        id: id,
        parameterName: parameter.displayName,
        unit: parameter.units,
      });
    },
  });

  return parameter;
}
