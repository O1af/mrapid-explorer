import { createSignal } from 'solid-js';

export default function createViewport(client, actions) {
  const [viewport, setViewport] = createSignal({
    zoom: 1.2,
    center: [-83.04960, 42.33379],
  });

  Object.assign(actions, {
    setViewport: (viewport) => setViewport(viewport),
  });

  return viewport;
}
