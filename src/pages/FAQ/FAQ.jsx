
function FAQ() {
    return (
        <section class="page-faq">
            <h1>FAQ</h1>
            <p>Welcome to the main FAQ directory. Please select a page.</p>
            <ul>
                <li>
                    <a href='/faq/goals'>Project Goals</a>
                    <ul>
                        <li>Discusses the goals of this project and possible future additions.</li>
                    </ul>
                </li>
                <li>
                    <a href='/faq/aq'>Air Quality Science</a>
                    <ul>
                        <li>Gives background information on the science of air quality and how it affects us.</li>
                    </ul>
                </li>
                <li>
                    <a href='/faq/monitoring'>Air Quality Monitoring</a>
                    <ul>
                        <li>
                            Gives information about where our monitors are sourced as well 
                            as where we get monitoring information.
                        </li>
                    </ul>
                </li>
                <li>
                    <a href='/faq/understand-info'>Understanding Monitors</a>
                    <ul>
                        <li>Provides information on how to interpret data from air quality monitors.</li>
                    </ul>
                </li>
            </ul>

        </section>
    );
}

export default FAQ;