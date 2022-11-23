import * as d3 from 'd3';
import { createEffect, createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
import { useContext } from 'solid-js';
import { createContext } from 'solid-js';

const ChartContext = createContext();

export function ChartProvider(props) {
  const [store, setStore] = createStore({
      values: {
        max: 0,
      },
      style: {
        display: 'none',
        top: 0,
        left: 0,
      },
    }),
    setTooltip = [
      store,
      {
        setTooltip: (props) => {
          setStore({
            period: props.period,
            values: {
              max: props.values?.max,
              interquartileTop: props.values?.interquartileTop,
              median: props.values?.median,
              interquartileBottom: props.values?.interquartileBottom,
              min: props.values?.min,
            },
            style: {
              display: props.style.display,
              y: props.style.y,
              x: props.style.x,
            },
          });
        },
      },
    ];

  return (
    <ChartContext.Provider value={setTooltip}>
      {props.children}
    </ChartContext.Provider>
  );
}

export function useChart() {
  return useContext(ChartContext);
}

export function BoxPlotTooltip(props) {
  const [tooltip] = useChart();

  return (
    <div
      style={`
      position:absolute;
      top:${tooltip.style.y}px;
      left:${tooltip.style.x}px; 
      display:${tooltip.style?.display || 'none'}`}
      className="box-plot-tooltip"
      role="tooltip"
    >
      <div className="box-plot-tooltip__head">
        <span className="type-body3 text-white">
          {tooltip.period}
        </span>
      </div>
      <div className="box-plot-tooltip__body">
        <div className="box-plot-legend-item">
          <div className="bg-smoke-10 box-plot-legend-color"></div>
          <div>
            <span className="type-body-3">{tooltip.values?.max}</span>
            <span className="type-body-1">µg/m³</span>
          </div>
          <div className="box-plot-legend-item-label">
            <span className="type-body-1">
              99<sup>th</sup> percentile
            </span>
          </div>
        </div>
        <div className="box-plot-legend-item">
          <div className="bg-lavender-100 box-plot-legend-color"></div>
          <div>
            <span className="type-body-3">
              {tooltip.values?.interquartileTop}
            </span>
            <span className="type-body-1">µg/m³</span>
          </div>
          <div className="box-plot-legend-item-label">
            <span className="type-body-1">
              75<sup>th</sup> percentile
            </span>
          </div>
        </div>
        <div className="box-plot-legend-item bg-sky-10">
          <div className="bg-lavender-120 box-plot-legend-color"></div>
          <div>
            <span className="type-body-3">
              {tooltip.values?.median}{' '}
            </span>
            <span className="type-body-1">µg/m³</span>
          </div>
          <div className="box-plot-legend-item-label">
            <span className="type-body-1">Median</span>
          </div>
        </div>
        <div className="box-plot-legend-item">
          <div className="bg-lavender-100 box-plot-legend-color"></div>
          <div>
            <span className="type-body-3">
              {tooltip.values?.interquartileBottom}{' '}
            </span>
            <span className="type-body-1">µg/m³</span>
          </div>
          <div className="box-plot-legend-item-label">
            <span className="type-body-1">
              25<sup>th</sup> percentile
            </span>
          </div>
        </div>
        <div className="box-plot-legend-item">
          <div className="bg-smoke-10 box-plot-legend-color"></div>
          <div>
            <span className="type-body-3">
              {tooltip.values?.min}{' '}
            </span>
            <span className="type-body-1">µg/m³</span>
          </div>
          <div className="box-plot-legend-item-label">
            <span className="type-body-1">
              1<sup>st</sup> percentile
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BoxPlot({ name, width, height, margin, data }) {
  const [tooltip, { setTooltip }] = useChart();

  const periods = data.summaries.map((o) => o.period);
  const boxWidth = width / periods.length - 5;
  const x = d3.scaleBand().range([0, width]).domain(periods);

  const y = d3
    .scaleLinear()
    .range([height, 0])
    .domain([
      d3.min(data.summaries, (d) => d.min),
      d3.max(data.summaries, (d) => Math.ceil(d.max / 5) * 5),
    ]);

  const ticksValues =
    periods.length > 12
      ? x.domain().filter((e, i) => i % 3 == 0)
      : periods;

  const yAxis = d3.axisLeft(y).ticks(6);
  const yAxisGrid = d3
    .axisLeft(y)
    .tickSize(-width)
    .tickFormat('')
    .ticks(6);
  const xAxis = d3.axisBottom(x).tickValues(ticksValues);

  createEffect(() => {
    d3.select(`.box-plot-x-axis-${name}`).call(xAxis);
    d3.select(`.box-plot-y-axis-${name}`).call(yAxis);
    d3.select(`.box-plot-grid-${name}`)
      .call(yAxisGrid)
      .selectAll('line,path')
      .style('stroke', '#d4d8dd');
  });

  return (
    <>
      <svg
        width={`${width + margin}px`}
        height={`${height + margin}px`}
      >
        <g
          className={`chart-grid box-plot-grid-${name}`}
          transform={`translate(${margin / 2} ${margin / 2} )`}
        ></g>
        <g
          transform={`translate(${margin / 1.8 + boxWidth / 2} ${
            margin / 2
          })`}
        >
          <For each={data.summaries}>
            {(d) => {
              return (
                <g
                  onMouseEnter={(e) => {
                    setTooltip({
                      period: d.period,
                      values: {
                        max: d.max,
                        interquartileTop: d.q3,
                        median: d.median,
                        interquartileBottom: d.q1,
                        min: d.min,
                      },
                      style: {
                        display: 'block',
                        x: e.clientX - 220,
                        y: e.clientY - 400,
                      },
                    });
                  }}
                  onMouseLeave={(e) =>
                    setTooltip({
                      style: {
                        display: 'none',
                        y: 0,
                        x: 0,
                      },
                    })
                  }
                >
                  <line
                    stroke-width={2}
                    stroke="#CCCCCC"
                    className="whiskers"
                    x1={x(d.period)}
                    x2={x(d.period)}
                    y1={y(d.min)}
                    y2={y(d.max)}
                  />
                  <line
                    stroke-width={boxWidth}
                    stroke="#EAE7FF"
                    className="box"
                    x1={x(d.period)}
                    x2={x(d.period)}
                    y1={y(d.q1)}
                    y2={y(d.q3)}
                  />
                  <line
                    stroke-width={2}
                    stroke="#8576ED"
                    className="q3"
                    x1={x(d.period) - boxWidth / 2}
                    x2={x(d.period) + boxWidth / 2}
                    y1={y(d.q3)}
                    y2={y(d.q3)}
                  />
                  <line
                    stroke-width={2}
                    stroke="#8576ED"
                    className="q1"
                    x1={x(d.period) - boxWidth / 2}
                    x2={x(d.period) + boxWidth / 2}
                    y1={y(d.q1)}
                    y2={y(d.q1)}
                  />
                  <line
                    stroke-width={4}
                    stroke="#584DAE"
                    className="median"
                    x1={x(d.period) - boxWidth / 2}
                    x2={x(d.period) + boxWidth / 2}
                    y1={y(d.median)}
                    y2={y(d.median)}
                  />
                </g>
              );
            }}
          </For>
        </g>
        <g
          class={`box-plot-y-axis-${name}`}
          transform={`translate(${margin / 2} ${margin / 2})`}
        ></g>
        <g
          class={`box-plot-x-axis-${name}`}
          transform={`translate(${margin / 2} ${
            height + margin / 2
          })`}
        ></g>
      </svg>
    </>
  );
}
