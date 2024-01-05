import { createSignal } from "solid-js";

function FAQ_AQ() {
    const [isHealthTableVisible, setHealthTableVisibility] = createSignal(false);

    const toggleHealthTable = () => {
        setHealthTableVisibility(!isHealthTableVisible());
    };

    const [isAQITableVisible, setAQITableVisibility] = createSignal(false);

    const toggleAQITable = () => {
        setAQITableVisibility(!isAQITableVisible());
    }

    return (
        <section class="page-faq">
            <h1>Air Quality Science</h1>
            <p>
                Air pollutants can cause and aggravate health problems like cancer, asthma and 
                other respiratory diseases, and have been linked to many other health issues, e.g., 
                adverse birth outcomes and dementia.  Air pollution causes other effects too, 
                like corrosive acid rain, thinning of the protective ozone layer in the upper 
                atmosphere, and climate change.
            </p>
            <ul>
                <li>
                    <a href="#faq_pol">Pollutants</a>
                </li>
                <li>
                    <a href="#faq_health">Health effects</a>
                </li>
                <li>
                    <a href="#faq_source">Emission sources</a>
                </li>
                <li>
                <a href="#faq_breathe">What you breathe - Concentrations and AQI</a>
                </li>
                <li>
                <a href="#faq_naaqs">Air quality standards (NAAQS)</a>
                </li>
            </ul>
            <hr class="faq-line"> </hr>
            <h2 id="faq_pol">Pollutants</h2>
            <p>
                While most attention focuses on the six so-called “criteria pollutants” that have 
                national Ambient Air Quality Standards (NAAQS), other pollutants are also important.  
                The US Clean Act defines 6 criteria pollutants and 189 different hazardous air 
                pollutants.  The main types of air pollutants are listed below:
            </p>
            <h3>Criteria Pollutants</h3>
            <ul>
                <li>Sulfur dioxide (SO<sub>2</sub>)</li>
                <li>Nitrogen dioxide (NO<sub>2</sub>)</li>
                <li>Lead (Pb)</li>
                <li>Ozone (O<sub>3</sub>)</li>
                <li>Carbon monoxide (CO)</li>
                <li>Particulate matter (PM<sub>2.5</sub>, PM<sub>10</sub>)</li>
            </ul>
            <h3>Toxic Pollutants (or hazardous air pollutants)</h3>
            <ul>
                <li><b>Local</b> - Benzene, hydrogen sulfide, diesel exhaust</li>
                <li>
                    <b>Regional</b> - Mercury, Polychlorinated Biphenyls (PCBs), Polybrominated diphenyl 
                    ethers (PBDEs)
                </li>
                <li><b>Global</b> - Chlorofluorocarbons (CFCs)</li>
            </ul>
            <h3>Greenhouse gases (toxic if short-lived)</h3>
            <ul>
                <li><b>Long-Lived</b> - Carbon dioxide (CO2), nitrous oxide, halocarbons (N2O, F11, F12, etc)</li>
                <li><b>Medium-Lived</b> - Methane (CH4)</li>
                <li><b>Short-Lived</b> - Carbon monoxide (CO), non-methane VOC (NMVOCs)</li>
            </ul>
            <h2 id="faq_health">Health Effects</h2>
            <p>
                Health effects for the six criteria pollutants (ozone, lead, nitrogen oxide, particulate matter, 
                carbon monoxide, sulfur dioxide) are shown in the table, based on US EPA’s Integrated Science Assessments.
            </p>
            <button class='faq-table-toggle' onClick={toggleHealthTable} tabIndex={0}>Click to show/hide table</button>
            <div class='health-effects-table-container'>
            {isHealthTableVisible() && (
                <table class='health-effects-table'>
                    <thead>
                        <tr class='pollutant-labels'>
                            <th> </th>
                            <th>Ozone</th>
                            <th>Lead</th>
                            <th>NO<sub>x</sub></th>
                            <th>PM<sub>2.5</sub></th>
                            <th>CO</th>
                            <th>SO<sub>2</sub></th>
                            <th>Diesel</th>
                        </tr>
                        <tr class='effect-labels'>
                            <th>Respiratory Effects</th>
                            <th> </th>
                            <th> </th>
                            <th> </th>
                            <th> </th>
                            <th> </th>
                            <th> </th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class='effect-desc'>Lung diseases (COPD,chronic bronchitis, emphysema, and/or cancer)</td>
                            <td>x</td>
                            <td> </td>
                            <td>x</td>
                            <td> </td>
                            <td> </td>
                            <td>x</td>
                            <td>x</td>
                        </tr>
                        <tr>
                            <td class='effect-desc'>Asthma incidences, attacks, hospitalizations, and aggravations</td>
                            <td>x</td>
                            <td> </td>
                            <td> </td>
                            <td>x</td>
                            <td> </td>
                            <td> </td>
                            <td>x</td>
                        </tr>
                        <tr>
                            <td class='effect-desc'>Aggravation of bronchitis</td>
                            <td>x</td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td>x</td>
                        </tr>
                        <tr>
                            <td class='effect-desc'>Impaired lung growth</td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td>x</td>
                            <td> </td>
                            <td> </td>
                            <td>x</td>
                        </tr>
                        <tr>
                            <td class='effect-desc'>Decreased lung function</td>
                            <td> </td>
                            <td> </td>
                            <td>x</td>
                            <td>x</td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                        </tr>
                        <tr>
                            <td class='effect-desc'>Difficulty breathing</td>
                            <td>x</td>
                            <td> </td>
                            <td> </td>
                            <td>x</td>
                            <td>x</td>
                            <td>x</td>
                            <td> </td>
                        </tr>
                        <tr>
                            <td class='effect-desc'>Lung irritation (airway hyper responsiveness and inflammation)</td>
                            <td> </td>
                            <td> </td>
                            <td>x</td>
                            <td>x</td>
                            <td> </td>
                            <td>x</td>
                            <td>x</td>
                        </tr>
                        <tr>
                            <td class='effect-desc'>Lung related emergency visits</td>
                            <td>x</td>
                            <td> </td>
                            <td>x</td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                        </tr>
                        <tr>
                            <td class='effect-desc'>Irritation of the nose and throat; coughing</td>
                            <td>x</td>
                            <td> </td>
                            <td> </td>
                            <td>x</td>
                            <td> </td>
                            <td>x</td>
                            <td>x</td>
                        </tr>
                    </tbody>
                    <thead>
                        <tr class='effect-labels'>
                            <th>Cardiovascular Effects</th>
                            <th> </th>
                            <th> </th>
                            <th> </th>
                            <th> </th>
                            <th> </th>
                            <th> </th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class='effect-desc'>Coronary heart disease</td>
                            <td> </td>
                            <td>x</td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                        </tr>
                        <tr>
                            <td class='effect-desc'>Heart attacks</td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td>x</td>
                            <td> </td>
                            <td> </td>
                            <td>x</td>
                        </tr>
                        <tr>
                            <td class='effect-desc'>Hypertension or increases in blood pressure</td>
                            <td> </td>
                            <td>x</td>
                            <td> </td>
                            <td>x</td>
                            <td> </td>
                            <td> </td>
                            <td>x</td>
                        </tr>
                        <tr>
                            <td class='effect-desc'>Reduce oxygen carrying capacity of the blood</td>
                            <td> </td>
                            <td>x</td>
                            <td> </td>
                            <td> </td>
                            <td>x</td>
                            <td> </td>
                            <td> </td>
                        </tr>
                        <tr>
                            <td class='effect-desc'>Aggravation of existing heart disease</td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td>x</td>
                            <td>x</td>
                            <td> </td>
                        </tr>
                    </tbody>
                    <thead>
                        <tr class='effect-labels'>
                            <th>Reproductive Effects</th>
                            <th> </th>
                            <th> </th>
                            <th> </th>
                            <th> </th>
                            <th> </th>
                            <th> </th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class='effect-desc'>Decreased fertility (men and women)</td>
                            <td> </td>
                            <td>x</td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td>x</td>
                            <td> </td>
                        </tr>
                    </tbody>
                    <thead>
                        <tr class='effect-labels'>
                            <th>Birth Outcomes & Childhood Development</th>
                            <th> </th>
                            <th> </th>
                            <th> </th>
                            <th> </th>
                            <th> </th>
                            <th> </th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class='effect-desc'>Adverse birth outcomes (premature birth, low birth weight, or miscarriage)</td>
                            <td>x</td>
                            <td>x</td>
                            <td>x</td>
                            <td>x</td>
                            <td>x</td>
                            <td> </td>
                            <td> </td>
                        </tr>    
                        <tr>
                            <td class='effect-desc'>Brain damage and other birth defects</td>
                            <td>x</td>
                            <td>x</td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                        </tr> 
                        <tr>
                            <td class='effect-desc'>Behavioral and emotional problems</td>
                            <td> </td>
                            <td>x</td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                        </tr> 
                        <tr>
                            <td class='effect-desc'>Cognitive impairments</td>
                            <td> </td>
                            <td>x</td>
                            <td> </td>
                            <td> </td>
                            <td>x</td>
                            <td> </td>
                            <td> </td>
                        </tr>                 
                    </tbody>
                    <thead>
                        <tr class='effect-labels'>
                            <th>Other</th>
                            <th> </th>
                            <th> </th>
                            <th> </th>
                            <th> </th>
                            <th> </th>
                            <th> </th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class='effect-desc'>Cancer</td>
                            <td> </td>
                            <td>x</td>
                            <td> </td>
                            <td>x</td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                        </tr> 
                        <tr>
                            <td class='effect-desc'>Increased risk of premature death</td>
                            <td>x</td>
                            <td>x</td>
                            <td>x</td>
                            <td>x</td>
                            <td>x</td>
                            <td>x</td>
                            <td>x</td>
                        </tr> 
                        <tr>
                            <td class='effect-desc'>Fever, convulsions, dizziness</td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td>x</td>
                            <td> </td>
                        </tr> 
                        <tr>
                            <td class='effect-desc'>Headaches, nausea, vomiting</td>
                            <td> </td>
                            <td>x</td>
                            <td> </td>
                            <td> </td>
                            <td>x</td>
                            <td>x</td>
                            <td> </td>
                        </tr> 
                        <tr>
                            <td class='effect-desc'>Inhibition of thyroid functions</td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td>x</td>
                            <td> </td>
                        </tr> 
                        <tr>
                            <td class='effect-desc'>Kidney damage</td>
                            <td> </td>
                            <td>x</td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td>x</td>
                        </tr> 
                        <tr>
                            <td class='effect-desc'>Loss of smell</td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td>x</td>
                            <td> </td>
                        </tr> 
                        <tr>
                            <td class='effect-desc'>Visual impairment</td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td>x</td>
                            <td> </td>
                            <td> </td>
                        </tr> 
                        <tr>
                            <td class='effect-desc'>Cognitive decrements in adults</td>
                            <td> </td>
                            <td>x</td>
                            <td> </td>
                            <td> </td>
                            <td>x</td>
                            <td> </td>
                            <td> </td>
                        </tr> 
                        <tr>
                            <td class='effect-desc'>Immune system impairments</td>
                            <td> </td>
                            <td>x</td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                        </tr> 
                    </tbody>
                </table>
            )}
            </div>
            <p>
                <a 
                    href='https://caphedetroit.sph.umich.edu/wp-content/uploads/2016/10/Resource-Manual-3.0-Air-Quality-Health-Environmental-Justice-Website-Version-10-4-16.pdf'>
                        <em>Source - 2016 CAPHE Report</em>
                </a>
            </p>
            <ul>
                <li>
                    Thousands of epidemiological and toxicological studies have investigated the link between 
                    exposure to air pollutant and health effects.
                </li>
                <li>
                    These studies also form the basis of air quality standards. 
                </li>
                <li>
                    Air pollution is one of the top environmental factors affecting health. 
                </li>
                <li>
                    Globally, about 7 million people die each year from exposure to both outdoor and indoor 
                    air pollutants, mostly from cardiovascular disease and chronic respiratory disease associated
                     with exposure to particulate matter (PM2.5).
                </li>
            </ul>
            <h3>Who is most affected?</h3>
            <p><span style={"background-color:yellow"}>[PUT IMAGES HERE SOMEWHERE]</span></p>
            <p>Detroit is an ideal setting for this research:</p>
            <ul>
                <li>Heavy burden: 7.3% of deaths attributed to criteria pollutants and air toxics</li>
                <li>Environmental health is a concern for residents</li>
                <li>Minority populations: 85%  Black and 7% Latino</li>
                <li>Low SES: 39% live below the poverty line</li>
            </ul>
            <p>Health disparities are an issue:</p>
            <ul>
                <li>Asthma hospitalizations 3x higher than Michigan as a whole</li>
                <li>Asthma deaths 2x higher than Michigan as a whole</li>
                <li>Emission control options are limited; other strategies could be implemented in Detroit</li>
            </ul>

            <h2 id="faq_source">Emission Sources</h2>
            <p>
                Air pollution has many sources. Some sources are obvious – like coal-fired boilers, 
                municipal waste incinerators, automobiles, trucks, and buses.  Others are not so obvious 
                – like gasoline stations; dry cleaners; outboard boating equipment; lawn, garden, farm, 
                and construction equipment engines; certain paints, coatings, and varnishes; and various 
                household products. 
            </p>
            <p>
                Emission sources depend on the pollutant, but they are typically classified into the following type:
            </p>
            <ul>
                <li>Point sources – typically with smoke stacks – power plants, boilers, incinerators</li>
                <li>On-road mobile sources – cars, trucks, buses</li>
                <li>Off-road mobile sources – trains, ships, construction equipment</li>
                <li>Area sources – construction sites, bulk storage areas, building boilers/furnaces</li>
                <li>Event sources – wildland fires, structure fires, explosions</li>
                <li>Regional sources – from distant sources, called background</li>
                <li>Secondary sources – produced from atmospheric chemistry</li>
            </ul>

            <h2 id="faq_breathe">What you breathe - Concentrations and AQI</h2>
            <h3>Concentration</h3>
            <p>In air, pollutants are measured as a concentration:</p>
            <ul>
                <li>
                    For particulate matter (such as PM2.5) concentrations are measured as micrograms per 
                    cubic meter or μg/m<super>3</super>
                </li>
                <li>
                    For gases (such as SO<sub>2</sub> or O<sub>3</sub>) concentrations can be measured as 
                    micrograms per cubic meter or part per million (ppm) or part per billion (ppb)
                </li>
            </ul>
            <p>This differs from emission rates, which are expressed as tons per year (t/yr) or grams per second (g/s)</p>
            <h3>Air Quality Index (AQI)</h3>
            <p>To account for the different concentration scales, concentrations can be expressed using the 
                Air Quality Index or AQI
            </p>
            <ul>
                <li>
                    AQI = 100 corresponds to short-term air quality standard, e.g., 35 μg/m<super>3</super> for PM
                    <sub>2.5</sub> or 70 ppb for O<sub>3</sub>
                </li>
                <li>Must use appropriate averaging time</li>
                <li>EPA typically considers only two pollutants (O<sub>3</sub> and PM<sub>2.5</sub>) and takes the maximum</li>
            </ul>
            <button class='faq-table-toggle' onClick={toggleAQITable} tabIndex={0}>Click to show/hide table</button>
            <div class='aqi-table-container'>
            {isAQITableVisible() && (
                <table class='aqi-table'>
                    <thead>
                        <tr>
                            <th>Daily AQI Color</th>
                            <th>Levels of Concern</th>
                            <th>Values of Index</th>
                            <th>Description of Air Quality</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Green</td>
                            <td>Good</td>
                            <td>0 to 50</td>
                            <td>Air quality is satisfactory, and air pollution poses little or no risk.</td>
                        </tr>
                        <tr>
                            <td>Yellow</td>
                            <td>Moderate</td>
                            <td>51 to 100</td>
                            <td>
                                Air quality is acceptable. However, there may be a risk some people, particularly 
                                those who are unusually sensitive to air pollution.
                            </td>
                        </tr>
                        <tr>
                            <td>Orange</td>
                            <td>Unhealthy for Sensitive Groups</td>
                            <td>101 to 150</td>
                            <td>
                                Members of sensitive groups may experience health effects. The general public 
                                is less likely to be affected.
                            </td>
                        </tr>
                        <tr>
                            <td>Red</td>
                            <td>Unhealthy</td>
                            <td>151 to 200</td>
                            <td>
                                Some members of the general public may experience health effects; members of 
                                sensitive groups may experience more serious health effects.
                            </td>
                        </tr>
                        <tr>
                            <td>Purple</td>
                            <td>Very Unhealthy</td>
                            <td>201 to 300</td>
                            <td>
                                Health alert; The risk of health effects is increased for everyone.
                            </td>
                        </tr>
                        <tr>
                            <td>Maroon</td>
                            <td>Hazardous</td>
                            <td>301 and higher</td>
                            <td>
                                Health warning of emergency conditions: Everyone is more likely to be affected.
                            </td>
                        </tr>
                    </tbody>
                </table>
            )}
            </div>
            <h2 id="faq_naaqs">Air Quality Standards (NAAQS)</h2>
            <p>
                The National Ambient Air Quality Standards (NAAQS) apply to the six criteria pollutants. 
                These set maximum short- and long-term level designed to protect health.  Legal requirement, 
                enforced using monitoring and modeling.  Applies to all locations outside the fence line
            </p>
            <div class='naaqs-table-container'>
                <table class='naaqs-table'>
                    <thead>
                        <tr>
                            <th>Pollutant</th>
                            <th>Primary/Secondary</th>
                            <th>Averaging Time</th>
                            <th>Level</th>
                            <th>Form</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Carbon Monoxide (CO)</td>
                            <td>Primary</td>
                            <td>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>8 hours</td>
                                        </tr>
                                        <tr>
                                            <td>1 hour</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td>
                            <table>
                                    <tbody>
                                        <tr>
                                            <td>9 ppm</td>
                                        </tr>
                                        <tr>
                                            <td>35 ppm</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td>Not to be exceeded more than once per year</td>
                        </tr>
                        <tr>
                            <td>Lead (Pb)</td>
                            <td>Primary and Secondary</td>
                            <td>Rolling 3 month average</td>
                            <td>0.15 &microg/m<sup>3</sup></td>
                            <td>Not to be exceeded</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p><span style={"background-color:yellow"}>[FINISH TABLE]</span></p>
        </section>
    );
}

export default FAQ_AQ;