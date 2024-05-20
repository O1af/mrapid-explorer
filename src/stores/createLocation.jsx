import { createResource, createSignal } from "solid-js";

export default function createLocations(client, actions, state, setState) {
  const [locationSource, setLocationSource] = createSignal();
  let [location, { mutate, refetch }] = createResource(
    locationSource,
    client.Locations
  );

  Object.assign(actions, {
    loadLocation(id) {
      //mutate(null);
      setState({ id });
      setLocationSource([id]);
      console.log(state);
    },
    checkForUpdate() {
      refetch();
    },
    clearLocation() {
      setState({ id: null });
      mutate(null);
    },
  });

  return location;
}
