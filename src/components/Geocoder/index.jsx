import { useMap } from 'solid-map-gl';
import { onMount } from 'solid-js';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const Geocoder = () => {
  const map = useMap();

  onMount(() => {
    const accessToken = map()._requestManager._customAccessToken;
    const geocoder = new MapboxGeocoder({
      accessToken: accessToken,
      mapboxgl: mapboxgl,
      marker: false,
      types:
        'country,region,postcode,district,place,locality,neighborhood',
      NavigationControl: false,
    });
    map().addControl(geocoder, 'bottom-right');
    const geocoderContainer = document.querySelector('.mapboxgl-ctrl-geocoder');
    if (geocoderContainer) {
      geocoderContainer.style.bottom = '100px';
  
    }
    const zoomControlsContainer = document.querySelector('.mapboxgl-ctrl-bottom-left');
    if (zoomControlsContainer) {
      // zoomControlsContainer.style.position = 'absolute';
      zoomControlsContainer.style.bottom = '2px'; // Adjust the desired distance from the bottom
      zoomControlsContainer.style.left = '0px'; // Adjust the desired distance from the left
    }
  });

  return <></>;
};

export default Geocoder;
