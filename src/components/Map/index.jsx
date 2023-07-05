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

export const parametersBins = {
  1: [0, 55, 155, 255, 355, 425, 605], // PM10 (µg/m³)
  2: [0, 35.5, 55.5, 150.5, 250.5, 501], // PM2.5 (µg/m³) //12.1
  3: [0, 245, 323.4, 401.5, 793.8, 1183.84], // O₃ mass (µg/m³) //137.2
  4: [0, 10943.5, 14086.8, 17928.7, 35391.7, 58675.7], // CO mass (µg/m³) //5122.5
  5: [0, 101.5, 190, 679, 1222, 2350, 3852], // NO₂ mass (µg/m³) 101.5
  6: [0, 199, 487.5, 799, 1585, 2630.5], // SO₂ mass (µg/m³) 94.5
  7: [0, 0.101, 0.361, 0.65, 1.25, 2.05], // NO₂ (ppm) 0.054
  8: [0, 35, 50, 87, 200, 400], // CO (ppm) 25
  9: [0, 0.199, 0.487, 0.799, 1.585, 2.631], // SO₂ (ppm) 0.094
  10: [0, 0.125, 0.165, 0.205, 0.405, 0.604], // O₃ (ppm) 0.055
  11: [0, 35.5, 55.5, 150.5, 250.5, 501], // BC (µg/m³) 12.1
  19: [0, 35.5, 55.5, 150.5, 250.5, 501], // PM1 (µg/m³) 12.1
  21: [0, 1000, 2000, 3000, 4000, 5000], // CO₂ (ppm) - made a judgement call here 400
  27: [0, 1230, 2460, 3690, 4920, 6150], // NOx mass (µg/m³) 615
  28: [0, 0.199, 0.487, 0.799, 1.585, 2.631], // CH₄ (ppm) - made a judgement call here 1000 ppm is limit for OSHA 0.094
  33: [0, 35.5, 55.5, 150.5, 250.5, 501], // UFP count (particles/cm³) 12.1
  35: [0, 0.199, 0.487, 0.799, 1.585, 2.631], // NO (ppm) - made a judgement call here 0.094
  126: [0, 35.5, 55.5, 150.5, 250.5, 501], // PM1 count (particles/cm³ 12.1
  130: [0, 0.199, 0.487, 0.799, 1.585, 2.631], // PM2.5 count (particles/cm³) - made a judgement call here 0.094
  135: [0, 0.199, 0.487, 0.799, 1.585, 2.631], // PM10 count (particles/cm³) 0.094
  19840: [0, 1, 2, 3, 4, 5], // NOx (ppm) 0.5
  19843: [0, 9.5, 12.5, 15.5, 30.5, 50.5], // NO mass (µg/m³) - made a judgement call here 4.5
  19844: [0, 35.5, 55.5, 150.5, 250.5, 501], // PM4 (µg/m³) * 12.1
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


  const [clarityData, setClarityData] = createSignal(getAllCoordinatesAsGeoJSON(getClarityData()));
  
  createEffect(async () => {
    const data = await getClarityData();
    await setClarityData(getAllCoordinatesAsGeoJSON(data));
    console.log(data);
    console.log(clarityData());
  });
  
  console.log(clarityData());

  return (
    <MapGL
      class="map"
      options={{
        accessToken: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
        style: import.meta.env.VITE_MAPBOX_STYLE,
        touchZoomRotate: false,
        dragRotate: false,
        minZoom: 10,
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
                'grey',
              ],
              'circle-stroke-width': [
                'interpolate',
                ['linear'],
                ['zoom'],
                2,
                ['case', ['==', ['get', 'ismonitor'], true], 0.25, 0.25],
                14,
                ['case', ['==', ['get', 'ismonitor'], true], 0, 0],
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
                ['case', ['==', ['get', 'ismonitor'], true], 2, 2],
                14,
                ['case', ['==', ['get', 'ismonitor'], true], 13, 13],
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
      <Source
        id='clarityData' //idk if this needs to be here. trying to add an id to this source layer
        source={{
          type: 'geojson',
          data: 'https://mocki.io/v1/a312ed2e-fbb7-48c0-8777-ae5c61efc8ba',
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
              'circle-color': 
              [
                "interpolate",
  ["linear"],
  ["get", "raw", ["get", "pm2_5ConcMass", ["get", "characteristics", ["properties"]]]],
                -1,
                '#ddd', // light gray
                ...getColorScale(store),
              ],
            },
          }}
        />
        <Layer
          style={{
            id: 'clarity-text',
            type: 'symbol',
            source: 'clarityData',
            layout: {
              "text-field": ["get", "raw", ["get", "pm2_5ConcMass", ["get", "characteristics", ["properties"]]]]              ,
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
