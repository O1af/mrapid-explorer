import CAPHELogo from '../../assets/caphe-logo.png';
import NIEHLogo from '../../assets/nieh-logo.png';
import ERBLogo from '../../assets/erb-logo.png';

function About_CAPHE() {
    return (
        <section class="page-faq">
            <h1>Who we Are</h1>
            <p>
                <b>C</b>ommunity <b>A</b>ction to <b>P</b>romote <b>H</b>ealthy <b>E</b>nvironments (<b>CAPHE</b>) 
                is a partnership among community based organizations, community residents, health service providers 
                and public health researchers.
            </p>
            <div class='caphe-img-container'>
                <div class='caphe-img'>
                    <img src={CAPHELogo} alt="CAPHE Logo"> </img>
                </div>
            </div>
            <h2>Our Goal</h2>
            <p>
                Our goal is to develop and implement components of a scientifically-based, community-led public 
                health action plan to reduce air pollution and associated adverse health effects in Detroit and 
                surrounding communities. CAPHE uses a community-based participatory research approach in which 
                partners are involved in all phases of the work. This includes:
            </p>

                <ol class='caphe-list-container'>
                    <li class='caphe-list-item'>Defining the research problem.</li>
                    <li class='caphe-list-item'>Designing and implementing the study.</li>
                    <li class='caphe-list-item'>Interpreting and distributing the results.</li>
                    <li class='caphe-list-item'>Deciding how results will be applied.</li>
                    <li class='caphe-list-item'>Applying the results to create a public health action plan to improve 
                        health in Detroit.</li>
                </ol>
            <p>    
                CAPHE has received funding from the National Institute of Environmental Health 
                Sciences and the Fred A. and Barbara M. Erb Family Foundation.
            </p>
            <div class='sponsor-img-container'>
                <img 
                    class='sponsor-img' 
                    src={NIEHLogo} 
                    alt="National Institute of Environmental Health Sciences Logo">
                        NIEH Logo
                </img>
                <img 
                    class='sponsor-img' 
                    src={ERBLogo} 
                    alt="Erb Family Foundation Logo">
                        Erb Foundation Logo
                </img>
            </div>

            <h2>Current Partnerships</h2>
            <p>
                CAPHE builds on 20 years of community-academic research partnerships. At our inception, we drew on 
                the work of three long-standing partnerships, each of which included community-based organizations, 
                health practice and academic partners: 
            </p>
            <ul>
                <li>Community Action Against Asthma</li>
                <li>Detroit Community-Academic Urban Research Center</li>
                <li>Healthy Environments Partnership</li>
            </ul>
                
            <p>
                Over the years, we have built on and extended our membership, now encompassing representatives from 
                community based organizations, governmental institutions, and academic institutions.
            </p> 
            <h3>Community based organizations</h3>
            <ul>
                <li>Detroit Hispanic Development Corporation</li>
                <li>Detroiters Working for Environmental Justice</li>
                <li>Southwest Detroit Community Benefits Coalition</li>
                <li>Southwest Detroit Environmental Vision</li>
            </ul>
            <h3>Governmental institutions</h3>
            <ul>
                <li>Detroit Health Department</li>
                <li>Michigan Environment, Great Lakes, and Energy</li>
            </ul>
            <h3>Academic institutions</h3>
            <ul>
                <li>University of Michigan</li>
                <ul>
                    <li>School of Public Health</li>
                    <li>Michigan Medicine</li>
                    <li>Taubman College of Architecture and Urban Planning</li>
                </ul>
                <li>University of Michigan-Dearborn</li>
                <li>Wayne State University</li>
                
            </ul>

            <p> 
                Representatives from each of these organizations 
                comprise the CAPHE Steering Committee, with responsibility for overseeing CAPHE’s day-to-day work, 
                including conducting the basic research underlying the public health action plan, working 
                collaboratively with others to develop the public health action plan, and working to implement 
                prioritized components of the public health action plan.
            </p>
            <h2>Our Structure</h2>
            <p>
                CAPHE’s structure is designed to promote collaboration and shared decision making at all levels of the 
                CAPHE project, and to assure that Detroit residents and leadership have a significant voice in 
                identifying and creating solutions to promote clean air for Detroit’s residents. 
            </p>
        </section>
        
    
    
    
    
    );
}

export default About_CAPHE;