/* eslint-disable solid/style-prop */
import MapGL, { Source, Layer, Control, useMap } from 'solid-map-gl';
import Geocoder from '../Geocoder';
import { createEffect, createSignal, on } from 'solid-js';
import { useStore } from '../../stores';
import { selectedValue } from '../MapCards/Accordion';

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
  '#00e400',
  '#ffff00',
  '#ff7e00',
  '#ff0000',
  '#8f3f97',
  '#7e0023',
];

export const percentBins = [0, 20, 40, 60, 80];

//used EPA, OpenAQ, or my own calcs for these
export const parametersBins = {
  1: [0, 12.1, 35.5, 55.5, 150.5, 250.5], // PM2.5 (µg/m³)
  2: [0, 36, 76, 186, 305, 605], // SO₂ (ppb)
  3: [0, 55, 71, 86, 106, 200], // O₃ (ppb)
  4: [0, 55, 155, 255, 355, 425], // PM10 (µg/m³)
  5: [0, 54, 101, 361, 650, 1250], // NO₂ (ppb)
  6: [0, 4500, 9500, 12500, 15500, 30500], // CO (ppb)
  7: [0, 54, 101, 361, 650, 1250], // NO (ppb)
  8: [0, 54, 101, 361, 650, 1250], // NOx (ppb)
  9: [0, 500, 501, 502, 503, 504], // um3 (particles/cm3)
  10: [0, 8.5, 25, 39.1, 106, 176.4], // PM1 count (particles/cm³) * PM10 / 1.42
  11: [0, 5.5, 15.5, 25.5, 35.5, 42.5], // um10 (particles/cm3) * PM10 / 10
  12: [0, 5, 12.8, 19.5, 51.2, 84.5], // um5 (particles/cm3) * (PM2.5 / 3) + 1
  13: [0, 8000, 8001, 8002, 8003, 8004], // um100 (particles/cm3) * not enough data
  14: [0, .09, 0.25, 0.4, 1.1, 1.8], // um25 (particles/cm3) * PM1 / 100
  15: [0, 8000, 8001, 8002, 8003, 8004], // um50 (particles/cm3) * not enough data
  16: [0, 1, 3, 7, 12, 16], // BC (µg/m³) kinda guessed on the maroon one since I only could find 1 source
  17: [0, 12.1, 35.5, 55.5, 150.5, 250.5], // PM4 (µg/m³) openAQ's
  18: [0, 12.1, 35.5, 55.5, 150.5, 250.5], // PM2.5 (particles/cm3) * reads the same vals as PM2.5 in ug/m3
  19: [0, 8.5, 25, 39.1, 106, 176.4], // PM1 (particles/cm3) * reads the same vals as PM1 in ug/m3
  20: [0, 55, 155, 255, 355, 425], // PM10 (particles/cm3) * reads the same vals as PM10 in ug/m3
  21: [0, 10.6, 31.1, 48.7, 132, 219.7], // PM0.5 (particles/cm3) * PM2.5 / 1.14
  22: [0, 12.1, 35.5, 55.5, 150.5, 250.5], // PM4 (particles/cm3) * reads the same vals as PM4 in ug/m3
  23: [0, 400, 1000, 2000, 3000, 4000], // CO₂ (ppm) openAQ's
  50: [0, 50, 100, 150, 200, 300, 500], // AQI
};

export const parametersBinsAQI = {
  1: [0, 50, 100, 150, 200, 300, 500], // AQI
  2: [0, 50, 100, 150, 200, 300, 500], // AQI
  3: [0, 50, 100, 150, 200, 300, 500], // AQI
  4: [0, 50, 100, 150, 200, 300, 500], // AQI
  5: [0, 50, 100, 150, 200, 300, 500], // AQI
  6: [0, 50, 100, 150, 200, 300, 500], // AQI
  7: [0, 50, 100, 150, 200, 300, 500], // AQI
  8: [0, 50, 100, 150, 200, 300, 500], // AQI
  9: [0, 50, 100, 150, 200, 300, 500], // AQI
  10: [0, 50, 100, 150, 200, 300, 500], // AQI
  11: [0, 50, 100, 150, 200, 300, 500], // AQI
  12: [0, 50, 100, 150, 200, 300, 500], // AQI
  13: [0, 50, 100, 150, 200, 300, 500], // AQI
  14: [0, 50, 100, 150, 200, 300, 500], // AQI
  15: [0, 50, 100, 150, 200, 300, 500], // AQI
  16: [0, 50, 100, 150, 200, 300, 500], // AQI
  17: [0, 50, 100, 150, 200, 300, 500], // AQI
  18: [0, 50, 100, 150, 200, 300, 500], // AQI
  19: [0, 50, 100, 150, 200, 300, 500], // AQI
  20: [0, 50, 100, 150, 200, 300, 500], // AQI
  21: [0, 50, 100, 150, 200, 300, 500], // AQI
  22: [0, 50, 100, 150, 200, 300, 500], // AQI
  23: [0, 50, 100, 150, 200, 300, 500], // AQI
  50: [0, 50, 100, 150, 200, 300, 500], // AQI
};

// function getField(store) {
//   return store.mapThreshold.active
//     ? ['number', ['get', 'exceedance']]
//     : ['number', ['get', 'value']];
// }

function colorScale(parameter) {
  if(selectedValue() == 'AQI'){
    const bins = aqiHexValues.map((c, i) => [
      parametersBinsAQI[50][i],
     c,
    ]);
    return bins;
   }
  const bins = hexValues.map((c, i) => [
    parametersBinsAQI[parameter][i],
    c,
  ]);
  return bins;
}

function percentColorScale() {
  const bins = percentHexValues.map((c, i) => [percentBins[i], c]);
  return bins;
}

// function locationsCircleOpacityExpression(store) {
//   return store.mapThreshold.active
//     ? ['case', ['has', 'exceedance'], 1, 0]
//     : 1;
// }

function getColorScale(store) {
  return store.mapThreshold.active
    ? percentColorScale().flat()
    : colorScale(store.parameter.id).flat();
}

// function createTileUrl(store) {
//   let parameters = '';
//   if (store.parameter.id) {
//     parameters = `parameters_id=${store.parameter?.id}`;
//   }
//   let isMonitor = '';
//   if (store.mapFilters.monitor && store.mapFilters.airSensor) {
//     isMonitor = '';
//   }
//   if (!store.mapFilters.monitor && store.mapFilters.airSensor) {
//     isMonitor = '&monitor=false';
//   }
//   if (store.mapFilters.monitor && !store.mapFilters.airSensor) {
//     isMonitor = '&monitor=true';
//   }
//   let excludeInactive = '';
//   if (store.mapFilters.excludeInactive) {
//     excludeInactive = '&active=true';
//   }
//   let providers_ids = '';
//   if (store.mapFilters.providers.length > 0) {
//     const providers = store.mapFilters.providers
//       .map((o) => o.id)
//       .join(',');
//     providers_ids = `&providers_id=${providers}`;
//   }

//   return `${
//     import.meta.env.VITE_API_BASE_URL
//   }/v3/locations/tiles/{z}/{x}/{y}.pbf?${parameters}${isMonitor}${excludeInactive}${providers_ids}`;
// }

// function createThresholdTileUrl(store) {
//   let parameters = '';
//   if (store.mapThreshold.parameter_id) {
//     parameters = `parameters_id=${store.mapThreshold.parameter_id}`;
//   }
//   let isMonitor = '';
//   if (store.mapFilters.monitor && store.mapFilters.airSensor) {
//     isMonitor = '';
//   }
//   if (!store.mapFilters.monitor && store.mapFilters.airSensor) {
//     isMonitor = '&monitor=false';
//   }
//   if (store.mapFilters.monitor && !store.mapFilters.airSensor) {
//     isMonitor = '&monitor=true';
//   }
//   let excludeInactive = '';
//   if (store.mapFilters.excludeInactive) {
//     excludeInactive = '&active=true';
//   }
//   let providers_ids = '';
//   const period = store.mapThreshold.period;
//   const threshold = store.mapThreshold.threshold;
//   return `${
//     import.meta.env.VITE_API_BASE_URL
//   }/v3/thresholds/tiles/{z}/{x}/{y}.pbf?period=${period}&threshold=${threshold}&${parameters}${isMonitor}${excludeInactive}${providers_ids}`;
// }
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
  console.log(store.mapFilters.purpleair);

//   async function getClarityData() {
//     let res = await fetch(URL, {
//       method: 'GET',
//       headers: {
//         'x-api-key': APIkey,
//       },
//     })
//     let data = await res.json();
//     return data;
//   }
//   function getAllCoordinatesAsGeoJSON(jsonArray) {
//     let geojson = {
//         "type": "FeatureCollection",
//         "features": []
//     };
//     for (let i = 0; i < jsonArray.length; i++) {
//         let jsonObject = jsonArray[i];
//         if (jsonObject && jsonObject.location && jsonObject.location.coordinates) {
//             let feature = {
//                 "type": "Feature",
//                 "geometry": {
//                     "type": "Point",
//                     "coordinates": jsonObject.location.coordinates
//                 },
//                 "properties": {
//                   "characteristics" : jsonObject.characteristics,
//                   "id" : jsonObject._id,
//                 }
//             };
//             geojson.features.push(feature);
//         }
//     }
//     return geojson;
// }

  
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
      onMouseOver={{
        locations: () => setCursorStyle("pointer"),
        clarityData: () => setCursorStyle("pointer"),
      }} //not working yet
      onMouseLeave={{
        locations: () => setCursorStyle(""),
        clarityData: () => setCursorStyle(""),
      }}
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
        id="concentration" //idk if this needs to be here. trying to add an id to this source layer
        source={{
          type: "geojson",
          data: "https://mrapid-api3-r2oaltsiuq-uc.a.run.app/mapData",
        }}
        
      >
        <Layer
        visible={selectedValue() != 'AQI'}
          onClick={(e) => {
            const coordinates = getFeature(e);
            e.target.flyTo({
              center: coordinates,
              zoom: e.target.getZoom() > 12 ? e.target.getZoom() : 12,
              duration: calculateFlyToDuration(e.target.getZoom()),
              essential: true,
            });
          }}
          filter={[
            "all",
            [
              "any",
              ["!", !store.mapFilters.purpleair],
              ["!=", ["get", "source", ["get", "info", ["properties"]]], "PURPLEAIR"],
            ],
            [
              "any",
              ["!", !store.mapFilters.monitor],
              ["!=", ["get", "source", ["get", "info", ["properties"]]], "OPENAQ"],
            ],
            [
              "any",
              ["!", !store.mapFilters.dst],
              ["!=", ["get", "source", ["get", "info", ["properties"]]], "DST"],
            ],
            [
              "any",
              ["!", !store.mapFilters.tsi],
              ["!=", ["get", "source", ["get", "info", ["properties"]]], "BLUESKY TSI"],
            ],
            [
              "any",
              ["!", !store.mapFilters.clarity],
              ["!=", ["get", "source", ["get", "info", ["properties"]]], "CLARITY"],
            ]
          ]}
          style={{
            id: "clarity-locations",
            type: "circle",
            source: "clarityData",
            paint: {
              "circle-radius": [
                "interpolate",
                ["linear"],
                ["zoom"],
                1,
                ["case", ["==", ["get", "ismonitor"], true], 3, 3],
                14,
                ["case", ["==", ["get", "ismonitor"], true], 22, 22],
              ],
              "circle-opacity": [
                "case",
                [
                  "==",
                  [
                    "has",
                    store.parameters()[store.parameter.id - 1].name,
                    ["properties"],
                  ],
                  true,
                ],
                1,
                0,
              ],
              "circle-stroke-opacity": [
                "case",
                ["==", !store.mapFilters.excludeInactive, true],
                1,
                [
                  "case",
                  [
                    "==",
                    [
                      "has",
                      store.parameters()[store.parameter.id - 1].name,
                      ["properties"],
                    ],
                    true,
                  ],
                  1,
                  0,
                ],
              ],
              "circle-color": [
                "interpolate",
                ["linear"],
                [
                  "to-number",
                  [
                    "get",
                    "value",
                    [
                      "get",
                      store.parameters()[store.parameter.id - 1].name,
                      ["properties"],
                    ],
                  ],
                ],

                -1,
                "#ddd", // light gray
                ...getColorScale(store),
              ],
              "circle-stroke-color": [
                "match",
                ["get", "source", ["get", "info", ["properties"]]],
                "CLARITY",
                "#49a1d6",
                "OPENAQ",
                "white",
                "PURPLEAIR",
                "#9a49d6",
                "DST",
                "#559660",
                "BLUESKY TSI",
                "#cc555c",
                "white",
              ],
              "circle-stroke-width": [
                "interpolate",
                ["linear"],
                ["zoom"],
                2,
                ["case", ["==", ["get", "ismonitor"], true], 1, 0.25],
                14,
                [
                  "case",
                  [
                    "==",
                    [
                      "has",
                      store.parameters()[store.parameter.id - 1].name,
                      ["properties"],
                    ],
                    true,
                  ],
                  6,
                  3,
                ],
              ],
            },
          }}
        />
        <Layer
        visible={selectedValue() != 'AQI'}
          filter={[
            "all",
            [
              "any",
              ["!", !store.mapFilters.purpleair],
              ["!=", ["get", "source", ["get", "info", ["properties"]]], "PURPLEAIR"],
            ],
            [
              "any",
              ["!", !store.mapFilters.monitor],
              ["!=", ["get", "source", ["get", "info", ["properties"]]], "OPENAQ"],
            ],
            [
              "any",
              ["!", !store.mapFilters.dst],
              ["!=", ["get", "source", ["get", "info", ["properties"]]], "DST"],
            ],
            [
              "any",
              ["!", !store.mapFilters.tsi],
              ["!=", ["get", "source", ["get", "info", ["properties"]]], "BLUESKY TSI"],
            ],
            [
              "any",
              ["!", !store.mapFilters.clarity],
              ["!=", ["get", "source", ["get", "info", ["properties"]]], "CLARITY"],
            ]
          ]}
          style={{
            id: "clarity-text",
            type: "symbol",
            source: "clarityData",
            layout: {
              "text-field": [
                "get",
                "value",
                [
                  "get",
                  store.parameters()[store.parameter.id - 1].name,
                  ["properties"],
                ],
              ],
              "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
              "text-size": 20,
            },
          }}
        />
      </Source>

      <Source
        id="AQI" //idk if this needs to be here. trying to add an id to this source layer
        source={{
          type: "geojson",
          data: "https://mrapid-api3-r2oaltsiuq-uc.a.run.app/mapAQIData",
        }}
        
      >
        <Layer
        visible={selectedValue() == 'AQI'}
          onClick={(e) => {
            const coordinates = getFeature(e);
            e.target.flyTo({
              center: coordinates,
              zoom: e.target.getZoom() > 12 ? e.target.getZoom() : 12,
              duration: calculateFlyToDuration(e.target.getZoom()),
              essential: true,
            });
          }}
          filter={[
            "all",
            [
              "any",
              ["!", !store.mapFilters.purpleair],
              ["!=", ["get", "source", ["get", "info", ["properties"]]], "PURPLEAIR"],
            ],
            [
              "any",
              ["!", !store.mapFilters.monitor],
              ["!=", ["get", "source", ["get", "info", ["properties"]]], "OPENAQ"],
            ],
            [
              "any",
              ["!", !store.mapFilters.dst],
              ["!=", ["get", "source", ["get", "info", ["properties"]]], "DST"],
            ],
            [
              "any",
              ["!", !store.mapFilters.tsi],
              ["!=", ["get", "source", ["get", "info", ["properties"]]], "BLUESKY TSI"],
            ],
            [
              "any",
              ["!", !store.mapFilters.clarity],
              ["!=", ["get", "source", ["get", "info", ["properties"]]], "CLARITY"],
            ]
          ]}
          style={{
            id: "clarity-locations",
            type: "circle",
            source: "clarityData",
            paint: {
              "circle-radius": [
                "interpolate",
                ["linear"],
                ["zoom"],
                1,
                ["case", ["==", ["get", "ismonitor"], true], 3, 3],
                14,
                ["case", ["==", ["get", "ismonitor"], true], 22, 22],
              ],
              "circle-opacity": [
                "case",
                [
                  "==",
                  [
                    "has",
                    store.parameters()[store.parameter.id - 1].name,
                    ["properties"],
                  ],
                  true,
                ],
                1,
                0,
              ],
              "circle-stroke-opacity": [
                "case",
                ["==", !store.mapFilters.excludeInactive, true],
                1,
                [
                  "case",
                  [
                    "==",
                    [
                      "has",
                      store.parameters()[store.parameter.id - 1].name,
                      ["properties"],
                    ],
                    true,
                  ],
                  1,
                  0,
                ],
              ],
              "circle-color": [
                "interpolate",
                ["linear"],
                [
                  "to-number",
                  [
                    "get",
                    "value",
                    [
                      "get",
                      store.parameters()[store.parameter.id - 1].name,
                      ["properties"],
                    ],
                  ],
                ],

                -1,
                "#ddd", // light gray
                ...getColorScale(store),
              ],
              "circle-stroke-color": [
                "match",
                ["get", "source", ["get", "info", ["properties"]]],
                "CLARITY",
                "#49a1d6",
                "OPENAQ",
                "white",
                "PURPLEAIR",
                "#9a49d6",
                "DST",
                "#559660",
                "BLUESKY TSI",
                "#cc555c",
                "white",
              ],
              "circle-stroke-width": [
                "interpolate",
                ["linear"],
                ["zoom"],
                2,
                ["case", ["==", ["get", "ismonitor"], true], 1, 0.25],
                14,
                [
                  "case",
                  [
                    "==",
                    [
                      "has",
                      store.parameters()[store.parameter.id - 1].name,
                      ["properties"],
                    ],
                    true,
                  ],
                  6,
                  3,
                ],
              ],
            },
          }}
        />
        <Layer
        visible={selectedValue() == 'AQI'}
          filter={[
            "all",
            [
              "any",
              ["!", !store.mapFilters.purpleair],
              ["!=", ["get", "source", ["get", "info", ["properties"]]], "PURPLEAIR"],
            ],
            [
              "any",
              ["!", !store.mapFilters.monitor],
              ["!=", ["get", "source", ["get", "info", ["properties"]]], "OPENAQ"],
            ],
            [
              "any",
              ["!", !store.mapFilters.dst],
              ["!=", ["get", "source", ["get", "info", ["properties"]]], "DST"],
            ],
            [
              "any",
              ["!", !store.mapFilters.tsi],
              ["!=", ["get", "source", ["get", "info", ["properties"]]], "BLUESKY TSI"],
            ],
            [
              "any",
              ["!", !store.mapFilters.clarity],
              ["!=", ["get", "source", ["get", "info", ["properties"]]], "CLARITY"],
            ]
          ]}
          style={{
            id: "clarity-text",
            type: "symbol",
            source: "clarityData",
            layout: {
              "text-field": [
                "get",
                "value",
                [
                  "get",
                  store.parameters()[store.parameter.id - 1].name,
                  ["properties"],
                ],
              ],
              "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
              "text-size": 20,
            },
          }}
        />
      </Source>
      <Bounds />
    </MapGL>
  );
}
