import{H as e}from"./HelpContent.5d016612.js";import{c as a}from"./index.a2168236.js";const n=`<h1>Legend</h1>
<p>When showing a pollutant overlay on the map, the map displays the most recent value for locations. To visualize the range of data on the map view each pollutant is visualized on a scale based on common breaks of 6 levels. For example the PM2.5 scale is bucketed to the following values:</p>
<ul>
<li>0-12</li>
<li>12.1-35.4</li>
<li>35.5-55.4</li>
<li>55.5-150.4</li>
<li>150.5-250.4</li>
<li>250.5-500</li>
<li>501+</li>
</ul>
<p>This scale closely reflects the concentration levels used to calculate the air quality index (AQI). Occasionally negative values are recieved by the OpenAQ system, all negative values are symbolized with grey.</p>
<p>Air quality monitoring locations are symbolized a couple ways to help differentiate between reference monitors and air sensors (commonly known as low-cost sensors).</p>
<p>Reference monitors are symbolized as:</p>
<div class="reference-grade-marker">
    <div class="reference-grade-marker__border"></div>
    <div class="reference-grade-marker__fill"></div>
</div>
<p>Air sensors are symbolized as:</p>
<div class="low-cost-sensor-marker">
    <div class="low-cost-sensor-marker__fill"></div>
</div>
<p>Locations that have recorded measurements historically, but have not received measurements in the last 48 hours, are symbolized as:</p>
<div class="no-recent-data-marker">
    <div class="no-recent-data-marker__border"></div>
    <div class="no-recent-data-marker__fill"></div>
    <div class="no-recent-data-marker__dot"></div>
</div>
`;function r(){return a(e,{html:n})}export{r as default};
