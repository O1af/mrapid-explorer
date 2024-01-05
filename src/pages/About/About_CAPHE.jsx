import CAPHELogo from '../../assets/caphe-logo.png';
import NIEHLogo from '../../assets/nieh-logo.png';
import ERBLogo from '../../assets/erb-logo.png';
import CAAALogo from '../../assets/caaa-logo.jpg';
import URCLogo from '../../assets/urc-logo.png';
import HEPLogo from '../../assets/hep-logo.jpg';
import DHDCLogo from '../../assets/dhdc-logo.png';
import DWEJLogo from '../../assets/dwej-logo.png';
import SWDCBCLogo from '../../assets/swdcbc-logo.jpg';
import SDEVLogo from '../../assets/sdev-logo.png';
import DHDLogo from '../../assets/dhd-logo.png';
import EGLELogo from '../../assets/egle-logo.png';
import UMLogo from '../../assets/um-logo.jpg';
import UMDLogo from '../../assets/umd-logo.png';
import WSULogo from '../../assets/wsu-logo.png';


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
            <div class='partnerships-entire'>
                <ul class='partnerships-container'>
                    <li class='partnerships-item'>
                            <img 
                                class='partnerships-img' 
                                src={CAAALogo} 
                                alt="Community Action Against Asthma Logo">
                                    CAAA Logo
                            </img> 
                            <div class='partnerships-text'>
                                Community Action Against Asthma
                            </div>
                    </li>
                    <li class='partnerships-item'>
                            <img 
                                class='partnerships-img' 
                                src={URCLogo}
                                alt='Detroit Community-Academic Urban Research Center Logo'>
                                    Detroit URC Logo
                            </img>
                            <div class='partnerships-text'>
                                Detroit Community-Academic Urban Research Center
                            </div>
                    </li>
                    <li class='partnerships-item'>
                            <img 
                                class='partnerships-img' 
                                src={HEPLogo}
                                alt='Healthy Environments Partnership Logo'>
                                    HEP Logo
                            </img>
                            <div class='partnerships-text'>
                                Healthy Environments Partnership
                            </div>
                    </li>
                </ul>
            </div>

            <p>
                Over the years, we have built on and extended our membership, now encompassing representatives from 
                community based organizations, governmental institutions, and academic institutions.
            </p> 
            <h3>Community based organizations</h3>
            <div class="community-partners-container">
                <ul class="community-partners-list">
                    <li class= 'community-partners-item'>
                        <img 
                            class='community-partners-img'
                            src={DHDCLogo}
                            alt='Detroit Hispanic Development Corporation Logo'>
                            DHDC Logo
                        </img>
                        <div class='community-partners-text'>Detroit Hispanic Development Corporation</div>
                    </li>
                    <li class= 'community-partners-item'>
                        <img 
                            class='community-partners-img'
                            src={DWEJLogo}
                            alt='Detroiters Working for Environmental Justice Logo'>
                            DWEJ Logo
                        </img>
                        <div class='community-partners-text'>Detroiters Working for Environmental Justice</div>
                    </li>
                    <li class= 'community-partners-item'>
                        <img 
                            class='community-partners-img'
                            src={SWDCBCLogo}
                            alt='Southwest Detroit Community Benefits Coalition Logo'>
                            SDCB Logo
                        </img>
                        <div class='community-partners-text'>Southwest Detroit Community Benefits Coalition</div>
                    </li>
                    <li class= 'community-partners-item'>
                        <img 
                            class='community-partners-img'
                            src={SDEVLogo}
                            alt='Southwest Detroit Environmental Vision Logo'>
                            SDEV Logo
                        </img>
                        <div class='community-partners-text'>Southwest Detroit Environmental Vision</div>
                    </li>
                </ul>
            </div>

                <h3>Governmental institutions</h3>
                    <div class='gov-partners-container'>
                    <ul class='gov-partners-list'>
                        <li class='gov-partners-item'>
                            <img
                                class='gov-partners-img'
                                src={DHDLogo}
                                alt='Detroit Health Department Logo'>
                                DHD Logo
                            </img>
                            <div class='gov-partners-text'>Detroit Health Department</div>
                        </li>
                        <li class='gov-partners-item'>
                            <img
                                class='gov-partners-img'
                                src={EGLELogo}
                                alt='Michigan Environment, Great Lakes, and Energy Logo'>
                                EGLE Logo
                            </img>
                            <div class='gov-partners-text'>Michigan Environment, Great Lakes, and Energy</div>
                        </li>
                    </ul>
                </div>
                <h3>Academic institutions</h3>
                <div class='academic-partners-container'>
                    <ul class='academic-partners-list'>
                        <li class='academic-partners-item'>
                            <div class='academic-partners-text'>University of Michigan</div>
                            <img
                                class='academic-partners-img'
                                src={UMLogo}
                                alt='University of Michigan Logo'>
                                U-M Logo
                            </img>
                            <ul class='academic-partners-sublist'>
                                <li class='academic-partners-sublist-item'>School of Public Health</li>
                                <li class='academic-partners-sublist-item'>Michigan Medicine</li>
                                <li class='academic-partners-sublist-item'>Taubman College of Architecture and Urban Planning</li>
                            </ul>
                        </li>
                        <li class='academic-partners-item'>
                            <div class='academic-partners-text'>University of Michigan - Dearborn</div>
                            <img
                                class='academic-partners-img'
                                src={UMDLogo}
                                alt='University of Michigan Dearborn Logo'>
                                U-M Dearborn Logo
                            </img>
                        </li>
                        <li class='academic-partners-item'>
                            <div class='academic-partners-text'>Wayne State University</div>
                            <img
                                class='academic-partners-img'
                                src={WSULogo}
                                alt='Wayne State University Logo'>
                                WSU Logo
                            </img>
                        </li>
                    </ul>
                </div>
            
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