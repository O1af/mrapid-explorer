/* eslint-disable solid/style-prop */
import MapGL, { Source, Layer, Control, useMap } from 'solid-map-gl';
import Geocoder from '../Geocoder';
import { Show, createEffect, createSignal, on } from 'solid-js';
import { useStore } from '../../stores';

function calculateFlyToDuration(zoom) {
  return 2500 / (zoom / 5);
}
export const hexValues = [
  '#00e400',
  '#ffff00',
  '#ff7e00',
  '#ff0000',
  '#8f3f97',
  '#7e0023',
];

export const percentHexValues = [
  '#e8b0e5',
  '#db85cd',
  '#c23fb5',
  '#a333a1',
  '#4F1048',
];

export const aqiHexValues = [
  'green',
  'yellow',
  'orange',
  'red',
  'purple',
  'maroon',
];

export const percentBins = [0, 20, 40, 60, 80];

//used EPA for these values
export const parametersBins = {
  1: [0, 0.055, 0.071, 0.086, 0.106, 0.2], // O₃ mass (ppm)
  2: [0, 4.5, 9.5, 12.5, 15.5, 30.5], // CO (ppm)
  3: [0, 0.036, 0.076, 0.186, 0.305, 0.605], // SO₂ (ppm)
  4: [0, 55, 155, 255, 355, 425], // PM10 (µg/m³)
  5: [0, 12.1, 35.5, 55.5, 150.5, 250.5], // PM2.5 (µg/m³)
  6: [0, 0.054, 0.101, 0.361, 0.65, 1.25], // NO₂ (ppm) 
  7: [0, .0045, 0.0095, 0.0125, 0.0155, 0.0305], // NO mass (µg/m³) openAQ's
  8: [0, 0.5, 1, 2, 3, 4, 5], // NOx (ppm) openAQ's
  9: [0, 12.1, 35.5, 55.5, 150.5, 250.5], // PM1 count (particles/cm³) openAQ's
  10: [0, 12.1, 35.5, 55.5, 150.5, 250.5], // BC (µg/m³) openAQ's
  11: [0, 12.1, 35.5, 55.5, 150.5, 250.5], // PM4 (µg/m³) * openAQ's
  12: [0, 400, 1000, 2000, 3000, 4000], // CO₂ (ppm) openAQ's 
  13: [0, 55, 71, 86, 106, 200], // O₃ (ppb)
  14: [0, 54, 101, 361, 650, 1250], // NO₂ (ppb)
  15: [0, 36, 76, 186, 305, 605], // SO₂ (ppb)
};

function getField(store) {
  return store.mapThreshold.active
    ? ['number', ['get', 'exceedance']]
    : ['number', ['get', 'value']];
}

function colorScale(parameter) {
  const bins = hexValues.map((c, i) => [
    parametersBins[parameter][i],
    c,
  ]);
  return bins;
}

function percentColorScale() {
  const bins = percentHexValues.map((c, i) => [percentBins[i], c]);
  return bins;
}

function locationsCircleOpacityExpression(store) {
  return store.mapThreshold.active
    ? ['case', ['has', 'exceedance'], 1, 0]
    : 1;
}

function getColorScale(store) {
  return store.mapThreshold.active
    ? percentColorScale().flat()
    : colorScale(store.parameter.id).flat();
}

function createTileUrl(store) {
  let parameters = '';
  if (store.parameter.id) {
    parameters = `parameters_id=${store.parameter?.id}`;
  }
  let isMonitor = '';
  if (store.mapFilters.monitor && store.mapFilters.airSensor) {
    isMonitor = '';
  }
  if (!store.mapFilters.monitor && store.mapFilters.airSensor) {
    isMonitor = '&monitor=false';
  }
  if (store.mapFilters.monitor && !store.mapFilters.airSensor) {
    isMonitor = '&monitor=true';
  }
  let excludeInactive = '';
  if (store.mapFilters.excludeInactive) {
    excludeInactive = '&active=true';
  }
  let providers_ids = '';
  if (store.mapFilters.providers.length > 0) {
    const providers = store.mapFilters.providers
      .map((o) => o.id)
      .join(',');
    providers_ids = `&providers_id=${providers}`;
  }

  return `${
    import.meta.env.VITE_API_BASE_URL
  }/v3/locations/tiles/{z}/{x}/{y}.pbf?${parameters}${isMonitor}${excludeInactive}${providers_ids}`;
}

function createThresholdTileUrl(store) {
  let parameters = '';
  if (store.mapThreshold.parameter_id) {
    parameters = `parameters_id=${store.mapThreshold.parameter_id}`;
  }
  let isMonitor = '';
  if (store.mapFilters.monitor && store.mapFilters.airSensor) {
    isMonitor = '';
  }
  if (!store.mapFilters.monitor && store.mapFilters.airSensor) {
    isMonitor = '&monitor=false';
  }
  if (store.mapFilters.monitor && !store.mapFilters.airSensor) {
    isMonitor = '&monitor=true';
  }
  let excludeInactive = '';
  if (store.mapFilters.excludeInactive) {
    excludeInactive = '&active=true';
  }
  let providers_ids = '';
  const period = store.mapThreshold.period;
  const threshold = store.mapThreshold.threshold;
  return `${
    import.meta.env.VITE_API_BASE_URL
  }/v3/thresholds/tiles/{z}/{x}/{y}.pbf?period=${period}&threshold=${threshold}&${parameters}${isMonitor}${excludeInactive}${providers_ids}`;
}
/*const [store, { clearLocation }] = useStore();
const seriesData = () => {
  if (store.recentMeasurements()) {
    const groups = group(
      store.recentMeasurements(),
      (d) => d.parameter.name
    );
    const values = Array.from(groups, (item) => {
      return { key: item[0], values: item[1] };
    });
    return values;
  }
};*/

function Bounds() {
  const map = useMap();
  const [store] = useStore();

  createEffect(() => {
    if (!store.viewport && store.mapBbox) {
      const bounds = [...store.mapBbox];
      map().fitBounds(
        [
          [bounds[0], bounds[1]],
          [bounds[2], bounds[3]],
        ],
        { padding: { top: 90, bottom: 150, left: 20, right: 360 } }
      );
    }
  });
  return <></>;
}

export function Map() {
  const [
    store,
    {
      setViewport,
      loadLocation,
      loadRecentMeasurements,
      setMeasurements,
    },
  ] = useStore();
  const [cursorStyle, setCursorStyle] = createSignal();

  createEffect(
    on(
      () => store.location,
      () => {
        if (store.location) {
          const dateTo = new Date();
          const dateFrom = new Date(
            Date.now() - 86400 * 1000
          ).toISOString();
          setMeasurements(
            store.location.id,
            store.location.sensors[0].parameter.id,
            dateFrom,
            dateTo
          );
        }
      }
    )
  );

  function getFeature(e) {
    const features = e.target.queryRenderedFeatures(e.point);
    const locationId = features[0].properties.sensor_nodes_id;
    loadLocation(locationId);
    loadRecentMeasurements(locationId);

    return features[0].geometry.coordinates;
  }

  const URL = 'https://clarity-data-api.clarity.io/v1/measurements?code=AT9BM6VV,ALQ1TJN6,AXPPQ0QF,AW2JHDG8&startTime=2023-06-01T00:00:00Z&endTime=2023-06-01T1:00:00Z';
  const APIkey = 'WIISszA2VDYFNB37ZdpkHoX07UHIvPSBkxc2npSR';
  async function getClarityData() {
    let res = await fetch(URL, {
      method: 'GET',
      headers: {
        'x-api-key': APIkey,
      },
    })
    let data = await res.json();
    return data;
  }
  function getAllCoordinatesAsGeoJSON(jsonArray) {
    let geojson = {
        "type": "FeatureCollection",
        "features": []
    };
    for (let i = 0; i < jsonArray.length; i++) {
        let jsonObject = jsonArray[i];
        if (jsonObject && jsonObject.location && jsonObject.location.coordinates) {
            let feature = {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": jsonObject.location.coordinates
                },
                "properties": {
                  "characteristics" : jsonObject.characteristics,
                  "id" : jsonObject._id,
                }
            };
            geojson.features.push(feature);
        }
    }
    return geojson;
}
let dataset = {"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Point","coordinates":["-83.0589","42.3656"]},"properties":{"NO2":{"value":"14","unit":"ppb"},"pm2.5":{"value":"11","unit":"µg/m³"},"pm1":{"value":"9","unit":"µg/m³"},"pm10":{"value":"14","unit":"µg/m³"},"info":{"sensorID":"CLA : EC2","source":"CLARITY"}}}]}

  const [clarityData, setClarityData] = createSignal(getAllCoordinatesAsGeoJSON(getClarityData()));
  
  createEffect(async () => {
    const data = await getClarityData();
    await setClarityData(getAllCoordinatesAsGeoJSON(data));
    
  });
  
  return (
    <MapGL
      class="map"
      options={{
        accessToken: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
        style: import.meta.env.VITE_MAPBOX_STYLE,
        touchZoomRotate: false,
        dragRotate: false,
        minZoom: 9,
        maxZoom: 14,
      }}
      cursorStyle={cursorStyle()}
      onMouseOver={{ locations: () => setCursorStyle('pointer'),
                    clarityData: () => setCursorStyle('pointer')}} //not working yet
      onMouseLeave={{ locations: () => setCursorStyle(''),
                    clarityData: () => setCursorStyle('')}}
      viewport={store.viewport}
      onViewportChange={(e) => {
        return setViewport(e);
      }}
    >
      <Control type="scale" position="bottom-left" />
      <Control
        type="navigation"
        position="bottom-left"
        options={{ showCompass: false, showZoom: true }}
      />
      <Geocoder />
      {/*  
      <Source
        source={{
          id: 'locations',
          type: 'vector',
          tiles: [
            store.mapThreshold.active
              ? createThresholdTileUrl(store)
              : createTileUrl(store),
          ],
          minzoom: 1,
          maxzoom: 24,
          bounds: [-180, -90, 180, 90],
        }}
      >
        <Layer
          id="locations-shadow"
          style={{
            type: 'circle',
            source: 'locations',
            'source-layer': 'default',
            paint: {
              'circle-color': 'black',
              'circle-blur': [
                'interpolate',
                ['linear'],
                ['zoom'],
                1,
                0.95,
                14,
                0.45,
              ],
              'circle-translate': [0, 3],
              'circle-opacity': [
                'interpolate',
                ['linear'],
                ['zoom'],
                1,
                0,
                14,
                0.5,
              ],
              'circle-radius': [
                'interpolate',
                ['linear'],
                ['zoom'],
                1,
                ['case', ['==', ['get', 'ismonitor'], true], 2, 2],
                14,
                ['case', ['==', ['get', 'ismonitor'], true], 15, 15],
              ],
            },
          }}
        />

        <Layer
          id="locations"
          onClick={(e) => {
            const coordinates = getFeature(e);
            e.target.flyTo({
              center: coordinates,
              zoom: e.target.getZoom() > 12 ? e.target.getZoom() : 12,
              duration: calculateFlyToDuration(e.target.getZoom()),
              essential: true,
            });
          }}
          style={{
            type: 'circle',
            source: 'locations',
            'source-layer': 'default',
            paint: {
              'circle-color': [
                'case',
                ['==', ['get', 'active'], true],
                [
                  'interpolate',
                  ['linear'],
                  getField(store),
                  -1,
                  '#ddd',
                  ...getColorScale(store),
                ],
                '#e8ebed',
              ],
              'circle-stroke-color': [
                'case',
                ['==', ['get', 'ismonitor'], true],
                'white',
                'white',
              ],
              'circle-stroke-width': [
                'interpolate',
                ['linear'],
                ['zoom'],
                2,
                ['case', ['==', ['get', 'ismonitor'], true], 1, 0.25],
                14,
                ['case', ['==', ['get', 'ismonitor'], true], 4, 4],
              ],
              'circle-stroke-opacity':
                locationsCircleOpacityExpression(store),
              'circle-opacity':
                locationsCircleOpacityExpression(store),
              'circle-radius': [
                'interpolate',
                ['linear'],
                ['zoom'],
                1,
                ['case', ['==', ['get', 'ismonitor'], true], 3, 3],
                14,
                ['case', ['==', ['get', 'ismonitor'], true], 22, 22],
              ],
            },
          }}
        />
        <Layer
          id="inactive-locations"
          onClick={(e) => {
            const coordinates = getFeature(e);
            e.target.flyTo({
              center: coordinates,
              zoom: e.target.getZoom() > 12 ? e.target.getZoom() : 12,
              duration: calculateFlyToDuration(e.target.getZoom()),
              essential: true,
            });
          }}
          style={{
            type: 'circle',
            source: 'locations',
            'source-layer': 'default',
            paint: {
              'circle-color': '#7e8c9a',
              'circle-opacity': [
                'case',
                ['==', ['get', 'active'], true],
                0,
                1,
              ],
              'circle-radius': [
                'interpolate',
                ['linear'],
                ['zoom'],
                1,
                2,
                14,
                8,
              ],
            },
          }}
        />
        <Layer
          id="selected-location-shadow"
          style={{
            type: 'circle',
            source: 'locations',
            'source-layer': 'default',
            filter: [
              '==',
              ['get', 'locationId'],
              ['literal', store.id || 0],
            ],
            paint: {
              'circle-color': '#000000',
              'circle-blur': [
                'interpolate',
                ['linear'],
                ['zoom'],
                1,
                0.25,
                14,
                0.35,
              ],
              'circle-opacity': 0.5,
              'circle-radius': [
                'interpolate',
                ['linear'],
                ['zoom'],
                1,
                ['case', ['==', ['get', 'ismonitor'], true], 4, 4],
                14,
                ['case', ['==', ['get', 'ismonitor'], true], 17, 17],
              ],
            },
          }}
        />
        <Layer
          id="selected-location"
          style={{
            type: 'circle',
            source: 'locations',
            'source-layer': 'default',
            filter: [
              '==',
              ['get', 'sensor_nodes_id'],
              ['literal', store.id || 0],
            ],
            paint: {
              'circle-color': [
                'interpolate',
                ['linear'],
                ['number', ['get', 'value']],
                -1,
                '#ddd',
                ...colorScale(store.parameter.id).flat(),
              ],
              'circle-opacity': 1,
              'circle-radius': [
                'interpolate',
                ['linear'],
                ['zoom'],
                1,
                ['case', ['==', ['get', 'ismonitor'], true], 4, 4],
                14,
                ['case', ['==', ['get', 'ismonitor'], true], 17, 17],
              ],
              'circle-stroke-width': [
                'interpolate',
                ['linear'],
                ['zoom'],
                2,
                ['case', ['==', ['get', 'ismonitor'], true], 1, 1],
                14,
                ['case', ['==', ['get', 'ismonitor'], true], 4, 4],
              ],
              'circle-stroke-color': '#85DBD9',
            },
          }}
        />
      </Source>
      */}
      <Source
        id='clarityData' //idk if this needs to be here. trying to add an id to this source layer
        source={{
          type: 'geojson',
          data: 'https://mrapid-api3-r2oaltsiuq-uc.a.run.app/mapdata',
        }}
      >
        <Layer
          onClick={(e) => {
            const coordinates = getFeature(e);
            e.target.flyTo({
              center: coordinates,
              zoom: e.target.getZoom() > 12 ? e.target.getZoom() : 12,
              duration: calculateFlyToDuration(e.target.getZoom()),
              essential: true,
            });
          }}
          style={{
            id: 'clarity-locations',
            type: 'circle',
            source: 'clarityData',
            paint: {
              'circle-radius': [
                'interpolate',
                ['linear'],
                ['zoom'],
                1,
                ['case', ['==', ['get', 'ismonitor'], true], 3, 3],
                14,
                ['case', ['==', ['get', 'ismonitor'], true], 22, 22],
              ],
              'circle-opacity': ['case', ['==', ["has",(store.parameters()[store.parameter.id-1]).name,["properties"]], true], 1, .1],
              'circle-color': 
              [
                "interpolate",
  ["linear"],
  [
    "to-number",
    ["get","value",["get",(store.parameters()[store.parameter.id-1]).name,["properties"]]]
  ]
  
,
                -1,
                '#ddd', // light gray
                ...getColorScale(store),
              ],
              'circle-stroke-color': [
                'case',
                ['==', ['get', 'ismonitor'], true],
                'white',
                'white',
              ],
              'circle-stroke-width': [
                'interpolate',
                ['linear'],
                ['zoom'],
                2,
                ['case', ['==', ['get', 'ismonitor'], true], 1, 0.25],
                14,
                ['case', ['==', ['get', 'ismonitor'], true], 5, 5],
              ],
            },
          }}
        />
        <Layer
        visible = {store.mapFilters.dataText}
          style={{
            id: 'clarity-text',
            type: 'symbol',
            source: 'clarityData',
            layout: {
               "text-field": 
               ["get","value",["get",(store.parameters()[store.parameter.id-1]).name,["properties"]]]
               ,
              "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
              "text-size": 20
              }
          }}
        />
      </Source>

      <Bounds />
    </MapGL>
  );
}
