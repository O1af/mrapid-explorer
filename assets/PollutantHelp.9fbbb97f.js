import{H as n}from"./HelpContent.c4a409d2.js";import{c as l}from"./index.db626f75.js";const e=`<h1>Pollutants</h1>
<p>The Detroit Air database currently has data sensor data for the following pollutants. Note that we calculate the AQI values shown.</p>
<h2>Criteria Pollutants:</h2>
<ul>
<li>PM2.5 (\xB5g/m\xB3)</li>
<li>SO\u2082 (ppb)</li>
<li>O\u2083 (ppb)</li>
<li>PM10 (\xB5g/m\xB3)</li>
<li>NO\u2082 (ppb)</li>
<li>CO (ppb)</li>
</ul>
<h2>Other Pollutants:</h2>
<ul>
<li>NO (ppb)</li>
<li>NOx (ppb)</li>
<li>BC (\xB5g/m\xB3)</li>
<li>PM4 (\xB5g/m\xB3)</li>
<li>CO\u2082 (ppm)</li>
</ul>
<h2>Particle Count:</h2>
<ul>
<li>um3 (particles/cm3)</li>
<li>PM1 count (particles/cm\xB3)</li>
<li>um10 (particles/cm3)</li>
<li>um5 (particles/cm3)</li>
<li>um100 (particles/cm3)</li>
<li>um25 (particles/cm3)</li>
<li>um50 (particles/cm3)</li>
<li>PM2.5 (particles/cm3)</li>
<li>PM1 (particles/cm3)</li>
<li>PM10 (particles/cm3)</li>
<li>PM0.5 (particles/cm3)</li>
<li>PM4 (particles/cm3)</li>
</ul>
<hr>
<h1>Air Quality Index (AQI)</h1>
<p>Air Quality Index or AQI is a system used to understand the levels of air pollution in a given area. The higher the AQI value, the greater the level of air pollution and the greater the health concern. Below are different ranges of AQI values and their meanings.
\xA0<br>
<br>
<span style="color: green;"><strong>0-50:</strong></span> Good</p>
<p><span style="color: gold;"><strong>51-100:</strong></span> Moderate</p>
<p><span style="color: orange;"><strong>101-150:</strong></span> Unhealthy for sensitive groups</p>
<p><span style="color: red;"><strong>151-200:</strong></span> Unhealthy</p>
<p><span style="color: purple;"><strong>201-300:</strong></span> Very unhealthy</p>
<p><span style="color: maroon;"><strong>301+:</strong></span> Hazardous</p>
<hr>
<h1>Units of measurement</h1>
<p>Measurements of pollutants are reported in a variety of units depending on how the data is reported from the original data provider. The most common units found in the dataset are:</p>
<ul>
<li>ppm (parts per million)</li>
<li>ppb (parts per billion)</li>
<li>\xB5g/m\xB3 (micrograms per cubic meter)</li>
<li>particles/cm\xB3 (particles per cubic centimeter)</li>
<li>AQI (Air Quality Index)</li>
</ul>
<p>Aside from converting ppb to ppm or vice versa, all pollutants shown are reported as is. Note that we do calculate AQI based on the reported concentration values our sources provide.</p>
`;function r(){return l(n,{html:e})}export{r as default};
