import ImageProf from "../../assets/batterman.jpg";
import ImageAmelia from "../../assets/amelia.jpeg";
import ImageYash from "../../assets/yash.jpeg";
import ImageOlaf from "../../assets/olaf.jpeg";
import ImageElla from "../../assets/ella.jpeg";
import ImageKristine from "../../assets/kristine.jpeg";
import ImageJenny from "../../assets/jenny.jpg";

function About_Team() {
  return (
    <section class="page-about">
      <h1 class="meet-team-title__heading1">Meet the Development Team</h1>
      <p>
        We are a research group through the{" "}
        <a href="https://umich.edu/">University of Michigan</a>'s{" "}
        <a href="https://sph.umich.edu/">School of Public Health</a> that aims
        to deliver more transparent air quality data to the citizens of Detroit
        and Southeast Michigan.
      </p>
      <p>
        Currently, we source our data from 6 different platforms - both
        privately and publicly owned:
      </p>
      <ul>
        <li>
          <a href="https://openaq.org/">OpenAQ</a> (provides us EPA data)
        </li>
        <li>
          <a href="https://www2.purpleair.com/">PurpleAir</a>
        </li>
        <li>
          <a href="https://www.dstech.io/">Distributed Sensing Technologies</a>{" "}
          (DST)
        </li>
        <li>
          <a href="https://www.clarity.io/">Clarity</a>
        </li>
        <li>
          <a href="https://tsi.com/home/">TSI</a>
        </li>
      </ul>
      <h2 class="meet-team-title__heading2">The Students</h2>
      <div class="meet-team-grid">
      <div class="team-member">
          <img class="team-img" alt="Amelia" src={ImageAmelia}>
            image of Amelia
          </img>
          <div class="member-label">Amelia Francisco</div>
          <div class="member-affiliation">Student</div>
          <div class="member-desc">
            Amelia is the project lead/front-end development lead for Detroit Air, and is a
            student at the University of Michigan pursuing a dual Bachelor's in
            Electrical Engineering and Environmental Engineering.
          </div>
        </div>

        <div class="team-member">
          <img class="team-img" alt="Olaf" src={ImageOlaf}>
            image of Olaf
          </img>
          <div class="member-label">Olaf Dsouza</div>
          <div class="member-affiliation">Student</div>
          <div class="member-desc">
            Olaf is the project lead for Detroit Air, and is a student at the
            University of Michigan persuing a Bachelor's in Computer Science.
          </div>
        </div>

        <div class="team-member">
          <img class="team-img" alt="Ella" src={ImageElla}>
            image of Ella
          </img>
          <div class="member-label">Ella Zhang</div>
          <div class="member-affiliation">Alumni</div>
          <div class="member-desc">
            Ella is on the API and Data subteam for Detroit Air, and is a
            alumni at the University of Michigan with a Bachelor's in
            Computer Science.
          </div>
        </div>

        <div class="team-member">
          <img class="team-img" alt="Jenny" src={ImageJenny}>
            image of Jenny
          </img>
          <div class="member-label">Jenny Xu</div>
          <div class="member-affiliation">Student</div>
          <div class="member-desc">
            Jenny is on the API and Data subteam for Detroit Air, and is a
            student at the University of Michigan persuing a Bachelor's in
            Computer Science.
          </div>
        </div>
      </div>

      <hr class="meet-team-line"> </hr>
      <h2 class="meet-team-title__heading2">The Professor</h2>
      <div class="meet-team-grid-prof">
        <div class="team-member">
          <img class="team-img" alt="Professor Batterman" src={ImageProf}>
            image of Professor Batterman
          </img>
          <div class="member-label">Professor Stuart Batterman</div>
          <div class="member-affiliation">Professor</div>
          <div class="member-desc">
            Dr. Batterman is the leader of this research group and is a
            professor at the University of Michigan under the School of Public
            Health. He serves as inspiration and guidance for the development
            team, providing detailed feedback and objectives for the Detroit Air
            website. Dr. Batterman facilitates operations of website
            development.
          </div>
        </div>
      </div>

      <hr class="meet-team-line"> </hr>
      <h2 class="meet-team-title__heading2">Former Developers</h2>
      <div class="meet-team-grid-former">
        <div class="team-member">
            <img class="team-img" alt="Yash" src={ImageYash}>
              image of Yash
            </img>
            <div class="member-label">Yashoditya (Yash) Watal</div>
            <div class="member-affiliation">Former Student</div>
            <div class="member-desc">
              Yash was the previous back-end development lead for Detroit Air, and
              is a student at the University of Michigan persuing a Bachelor's in
              Computer Science with a minor in Electrical Engineering.
            </div>
          </div>

          <div class="team-member">
            <img class="team-img" alt="Kristine" src={ImageKristine}>
              image of Kristine
            </img>
            <div class="member-label">Kristine McLaughlin</div>
            <div class="member-affiliation">Former Student</div>
            <div class="member-desc">
              Kristine was previously on the API subteam for Detroit Air, and is a
              student at the University of Michigan persuing a Bachelor's in
              Computer Science.
            </div>
          </div>
        </div>

    </section>
  );
}

export default About_Team;
