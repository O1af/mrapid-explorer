/* eslint-disable solid/style-prop */
import MapGL, { Source, Layer, Control, useMap } from "solid-map-gl";
import Geocoder from "../Geocoder";
import { createEffect, createSignal, on } from "solid-js";
import { useStore } from "../../stores";
import { selectedValue } from "../MapCards/Accordion";

function calculateFlyToDuration(zoom) {
  return 2500 / (zoom / 5);
}

export const hexValues = [
  "#00e400",
  "#ffff00",
  "#ff7e00",
  "#ff0000",
  "#8f3f97",
  "#7e0023",
];

export const percentHexValues = [
  "#e8b0e5",
  "#db85cd",
  "#c23fb5",
  "#a333a1",
  "#4F1048",
];

export const aqiHexValues = [
  "#00e400",
  "#ffff00",
  "#ff7e00",
  "#ff0000",
  "#8f3f97",
  "#7e0023",
];

export const percentBins = [0, 20, 40, 60, 80];

//used EPA, OpenAQ, or my own calcs for these
export const parametersBins = {
  1: [0, 1, 3, 7, 12, 16], // Black C (µg/m³) kinda guessed on the maroon one since I only could find 1 source
  2: [0, 4500, 9500, 12500, 15500, 30500], // CO (ppb)
  3: [0, 400, 1000, 2000, 3000, 4000], // CO₂ (ppm) openAQ's
  4: [0, 54, 101, 361, 650, 1250], // NO (ppb)
  5: [0, 54, 101, 361, 650, 1250], // NO₂ (ppb)
  6: [0, 54, 101, 361, 650, 1250], // NOx (ppb)
  7: [0, 55, 71, 86, 106, 200], // O₃ (ppb)
  8: [0, 10.6, 31.1, 48.7, 132, 219.7], // PM0.5 (particles/cm3) * PM2.5 / 1.14
  9: [0, 8.5, 25, 39.1, 106, 176.4], // PM1 count (particles/cm³) * PM10 / 1.42
  10: [0, 8.5, 25, 39.1, 106, 176.4], // PM1 (particles/cm3) * reads the same vals as PM1 in ug/m3
  11: [0, 55, 155, 255, 355, 425], // PM10 (particles/cm3) * reads the same vals as PM10 in ug/m3
  12: [0, 55, 155, 255, 355, 425], // PM10 (µg/m³)
  13: [0, 12.1, 35.5, 55.5, 150.5, 250.5], // PM2.5 (particles/cm3) * reads the same vals as PM2.5 in ug/m3
  14: [0, 12.1, 35.5, 55.5, 150.5, 250.5], // PM2.5 (µg/m³)
  15: [0, 12.1, 35.5, 55.5, 150.5, 250.5], // PM4 (particles/cm3) * reads the same vals as PM4 in ug/m3
  16: [0, 12.1, 35.5, 55.5, 150.5, 250.5], // PM4 (µg/m³) openAQ's
  17: [0, 36, 76, 186, 305, 605], // SO₂ (ppb)
  18: [0, 5.5, 15.5, 25.5, 35.5, 42.5], // um10 (particles/cm3) * PM10 / 10
  19: [0, 8000, 8001, 8002, 8003, 8004], // um100 (particles/cm3) * not enough data
  20: [0, 0.09, 0.25, 0.4, 1.1, 1.8], // um25 (particles/cm3) * PM1 / 100
  21: [0, 500, 501, 502, 503, 504], // um3 (particles/cm3)
  22: [0, 5, 12.8, 19.5, 51.2, 84.5], // um5 (particles/cm3) * (PM2.5 / 3) + 1
  23: [0, 8000, 8001, 8002, 8003, 8004], // um50 (particles/cm3) * not enough data
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
  if (selectedValue() == "AQI") {
    const bins = aqiHexValues.map((c, i) => [parametersBinsAQI[50][i], c]);
    return bins;
  }
  const bins = hexValues.map((c, i) => [parametersBinsAQI[parameter][i], c]);
  return bins;
}

function percentColorScale() {
  const bins = percentHexValues.map((c, i) => [percentBins[i], c]);
  return bins;
}

function getColorScale(store) {
  return store.mapThreshold.active
    ? percentColorScale().flat()
    : colorScale(store.parameter.id).flat();
}

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
  const [store, { setViewport, loadLocation, setMeasurements }] = useStore();
  const [cursorStyle, setCursorStyle] = createSignal();
  ///create a store for points

  //const [clickedPoint, setClickedPoint] = createSignal(null);
  //set points to initially a blank geogson object
  const [points, setPoints] = createSignal({
    type: "FeatureCollection",
    features: [],
  });
  const addPoints = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setPoints(data);
      });
  };
  //when selectedValue() changes call addpoints with the appropriate url
  createEffect(() => {
    if (selectedValue() == "AQI") {
      addPoints("https://mrapid-api3-r2oaltsiuq-uc.a.run.app/mapAQIData");
      //console.log(`https://mrapid-api3-r2oaltsiuq-uc.a.run.app/interpolatedMap?pollutant=${store.parameters()[store.parameter.id - 1].name}&unit=${store.parameters()[store.parameter.id - 1].units}`)
    } else {
      addPoints("https://mrapid-api3-r2oaltsiuq-uc.a.run.app/mapData");
    }
  });

  createEffect(
    on(
      () => store.location,
      () => {
        if (store.location) {
          const dateTo = new Date();
          const dateFrom = new Date(Date.now() - 86400 * 1000).toISOString();
          setMeasurements(
            store.location.id,
            store.location.sensors[0].parameter.id,
            dateFrom,
            dateTo
          );

          console.log(store.location.id);
        }
      }
    )
  );

  function getFeature(e) {
    const features = e.target.queryRenderedFeatures(e.point);
    const locationId = features[0].properties.info;
    // Parse the JSON string to an object
    const locationInfo = JSON.parse(locationId);
    // Set locationId to the sensorID
    const sensorId = locationInfo.sensorID;

    loadLocation(sensorId);
    //loadRecentMeasurements(locationId);

    return features[0].geometry.coordinates;
  }

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
      <Source
        id="AQI" //idk if this needs to be here. trying to add an id to this source layer
        source={{
          type: "geojson",
          data: points(),
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
          filter={[
            "all",
            [
              "any",
              ["!", !store.mapFilters.purpleair],
              [
                "!=",
                ["get", "source", ["get", "info", ["properties"]]],
                "PURPLEAIR",
              ],
            ],
            [
              "any",
              ["!", !store.mapFilters.monitor],
              [
                "!=",
                ["get", "source", ["get", "info", ["properties"]]],
                "OPENAQ",
              ],
            ],
            [
              "any",
              ["!", !store.mapFilters.dst],
              ["!=", ["get", "source", ["get", "info", ["properties"]]], "DST"],
            ],
            [
              "any",
              ["!", !store.mapFilters.tsi],
              [
                "!=",
                ["get", "source", ["get", "info", ["properties"]]],
                "BLUESKY TSI",
              ],
            ],
            [
              "any",
              ["!", !store.mapFilters.clarity],
              [
                "!=",
                ["get", "source", ["get", "info", ["properties"]]],
                "CLARITY",
              ],
            ],
          ]}
          style={{
            id: "clarity-locations",
            type: "circle",
            source: "clarityData",
            layout: {
              "circle-sort-key": [
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
                0,
              ],
            },
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
          filter={[
            "all",
            [
              "any",
              ["!", !store.mapFilters.purpleair],
              [
                "!=",
                ["get", "source", ["get", "info", ["properties"]]],
                "PURPLEAIR",
              ],
            ],
            [
              "any",
              ["!", !store.mapFilters.monitor],
              [
                "!=",
                ["get", "source", ["get", "info", ["properties"]]],
                "OPENAQ",
              ],
            ],
            [
              "any",
              ["!", !store.mapFilters.dst],
              ["!=", ["get", "source", ["get", "info", ["properties"]]], "DST"],
            ],
            [
              "any",
              ["!", !store.mapFilters.tsi],
              [
                "!=",
                ["get", "source", ["get", "info", ["properties"]]],
                "BLUESKY TSI",
              ],
            ],
            [
              "any",
              ["!", !store.mapFilters.clarity],
              [
                "!=",
                ["get", "source", ["get", "info", ["properties"]]],
                "CLARITY",
              ],
            ],
          ]}
          style={{
            id: "clarity-text",
            type: "symbol",
            source: "clarityData",
            layout: {
              "text-field": [
                "to-string",
                [
                  "min",
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
                  500,
                ],
              ],
              "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
              "text-size": 20,
            },
          }}
        />
      </Source>
      <Source   // interpolation using color scale for pm 2.5 with ug/m3. change when scales are fixed
        id="interp"
        source={{
          type: "geojson",
          data: `https://mrapid-api3-r2oaltsiuq-uc.a.run.app/interpolatedMap?pollutant=${store.parameters()[store.parameter.id - 1].name}&unit=${store.parameters()[store.parameter.id - 1].units}&type=${selectedValue()}`,
          //data: `http://localhost:8080/interpolatedMap?pollutant=${store.parameters()[store.parameter.id - 1].name}&unit=${store.parameters()[store.parameter.id - 1].units}`,
          //data: "https://mrapid-api3-r2oaltsiuq-uc.a.run.app/interpolatedMap?pollutant=pm2.5&unit=ug/m3",
        }}
      >
        <Layer
          style={{
            id: 'pm-inter',
            type: 'fill',
            source: 'interp',
            paint: {
              "fill-color": [
                "interpolate",
                ["linear"],
                ['get', 'pollutant'],
                ...getColorScale(store),
                //0, "#00e400", 12.1, "#ffff00", 35.5, "#ff7e00", 55.5, "#ff0000", 150.5, "#8f3f97", 250.5, "#7e0023"
              ],
              'fill-opacity': 0.25
            }
          }}/>
      </Source>
      <Bounds />
    </MapGL>
  );
}