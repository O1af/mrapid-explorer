
function FAQ_Goals() {
    return (
        <section class="page-faq">
            <h1>Project Goals</h1>
            <p> 
                The goal of this project is to collect air quality data from monitoring networks in 
                Detroit to make this data available to the community.  
            </p>
            <p>
                Currently, we source our air quality data from 6 different platforms - from both regulatory monitoring 
                networks and sensor networks:
            </p>
            <ul>
            <li><a href='https://openaq.org/'>OpenAQ</a> (provides us EPA data)</li>
            <li><a href='https://www2.purpleair.com/'>PurpleAir</a></li>
            <li><a href='https://www.dstech.io/'>Distributed Sensing Technologies</a> (DST)</li>
            <li><a href='https://www.clarity.io/'>Clarity</a></li>
            <li><a href='https://tsi.com/home/'>TSI</a></li>
        </ul>
        <p>
            We also aim to do the following:
        </p>
        <ul>
            <li>
                Display the data in an easy to understand format
            </li>
            <li>
                Allow users to download data for themselves
            </li>
            <li>
                Help interpret air quality monitoring data
            </li>
        </ul>
        <h2>Add a Sensor</h2>
        <p>
            Do you currently own a sensor from one of the sources listed above and wish to display it on DetroitAir's map?
            If so, please fill out this 
            <b>
                <a href='https://forms.gle/e5Qej1MhwPsXnybb6' target='_blank'>
                Google Form 
                </a>
            </b>
            or email Professor Stuart Batterman at 
            <b>
                <a href="mailto:stuartb@umich.edu">stuartb@umich.edu
                </a>
            </b>.
        </p>
        </section>
    );
}

export default FAQ_Goals;