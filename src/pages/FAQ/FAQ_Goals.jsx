import OAQLogo from '../../assets/openaq-logo.webp';
import PAirLogo from '../../assets/purpleair-logo.webp';
import DSTLogo from '../../assets/dst-logo.webp';
import ClarLogo from '../../assets/clarity-logo.png';
import TSILogo from '../../assets/tsi-logo.jpeg';

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
            <div class='provider-table-container'>
                <ul class='provider-table'>
                    <li class='provider-item'>
                        <a href='https://openaq.org/'><img src={OAQLogo} alt="Open AQ Logo">OpenAQ Logo</img></a>
                        OpenAQ
                    </li>
                    <li class='provider-item'>
                        <a href='https://www2.purpleair.com/'><img src={PAirLogo} alt='Purple Air Logo'>PurpleAir</img></a>
                        PurpleAir
                    </li>
                    <li class='provider-item'>
                        <a href='https://www.dstech.io/'><img src={DSTLogo} alt='Distributed Sensing Technologies Logo'>DST Logo</img></a>
                        Distributed Sensing Technologies (DST)
                    </li>
                    <li class='provider-item'>
                        <a href='https://www.clarity.io/'><img src={ClarLogo} alt='Clarity Logo'>Clarity Logo</img></a>
                        Clarity
                    </li>
                    <li class='provider-item'>
                        <a href='https://tsi.com/home/'><img src={TSILogo} alt='TSI Logo'>TSI Logo</img></a>
                        TSI
                    </li>
                </ul>
            </div>
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