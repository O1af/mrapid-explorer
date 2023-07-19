import { createStore } from 'solid-js/store';

export default function createParameter(client, actions, state) {
  //const [parameterId, setParameter] = createSignal(2);
  const [parameter, setParameter] = createStore({
<<<<<<< HEAD
    id: 3,
    parameterName: 'PM 2.5',
=======
    id: 5, //changes which pollutant initially appears on load
    parameterName: 'PM 2.5', //starting label for starting pollutant
>>>>>>> 52f04b5cd3f1f794d31686fb173cc522759a4f4c
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
