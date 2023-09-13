# Legend

When showing a pollutant overlay on the map, the map displays the most recent value for locations. The colors represent thresholds for EPA-set standards** for air quality based on health risks for certain groups. These standards can either be denoted as concentrations or Air Quality Index (AQI). You can find more information on these standards by referring to <a href="https://www.airnow.gov/sites/default/files/2020-05/aqi-technical-assistance-document-sept2018.pdf">this document</a> provided by the EPA.

Occasionally negative values, zero values, or values that are significantly higher than they should be are recieved by the Detroit Air system. This may be a sensor issue. 

Air quality monitoring locations are symbolized a couple ways to help differentiate between reference monitors (usually owned by the EPA) and low-cost air sensors (usually owned by private companies). The source of each sensor is differentiated by the border color around each point.

For example, reference monitors from the EPA are symbolized using a white border:

<div class="reference-grade-marker">
    <div class="reference-grade-marker__border"></div>
    <div class="reference-grade-marker__fill"></div>
</div>

While low-cost air sensors from a source are symbolized by a different color, such as Clarity using a blue border: 

<div class="clarity-marker">
    <div class="clarity-marker__border"></div>
    <div class="reference-grade-marker__fill"></div>
</div>

Locations that have recorded measurements in our system, but not for a particular selected pollutant will be a circle with a thinner border. By default, these sensors are hidden, but can be displayed by unchecking 'Exclude Inactive Monitors'. Again, their border color reflects their source.

<div class="no-recent-data-marker">
    <div class="no-recent-data-marker__border"></div>
    <div class="no-recent-data-marker__fill"></div>
</div>
&nbsp;  
&nbsp;

**\*\*Note:** The standards set for particle count was defined by our team, and does not reflect standards set by the EPA!