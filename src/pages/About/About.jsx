import { ReferenceGradeMarker,PurpleAirMarker,ClarityMarker,DSTMarker,TSIMarker } from "../../components/LocationMarker";

function About() {
    return (
        <section class="page-about">
            <h1 class="meet-team-title__heading1">About</h1><TSIMarker class="about-marker"/><ReferenceGradeMarker class="about-marker"/><ClarityMarker class="about-marker"/><PurpleAirMarker class="about-marker"/><DSTMarker class="about-marker"/>
            <p>Detroit Air is a platform for both community members and researchers to gain access to air quality data
                in the Detroit/Southeast Michigan area. Detroit Air's interactive map displays air quality data from 
                both privately owned and publicly owned sensors. 
            </p>
            <ul>
                <li>
                    <a href='/about/caphe'>About CAPHE</a>
                    <ul>
                        <li>Talks about the research organization behind this website and its origins.</li>
                    </ul>
                </li>
                <li>
                    <a href='/about/meet-team'>Meet the Development Team</a>
                    <ul>
                        <li>Shows the team of individuals developing this website.</li>
                    </ul>
                </li>
            </ul>
        </section>
        
    
    
    
    
    );
}

export default About;