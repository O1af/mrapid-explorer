import ImageProf from '../assets/sample-img.jpg';
import ImageAmelia from '../assets/sample-img.jpg';
import ImageYash from '../assets/sample-img.jpg';
import ImageOlaf from '../assets/sample-img.jpg';
import ImageElla from '../assets/sample-img.jpg';
import ImageKristine from '../assets/sample-img.jpg';
import ImageJenny from '../assets/sample-img.jpg';

function Home() {
    return (
      <section class="page-about">
        <h1 class="meet-team-title__heading1">
          About Us
        </h1>
        <p>We are a research group through the <a href='https://umich.edu/'>University of Michigan</a>'s <a href='https://sph.umich.edu/'>School of Public 
          Health</a> that aims to deliver more transparent air quality data to the citizens of Detroit 
          and Southeast Michigan.
        </p>
         <p>
          Currently, we source our data from 6 different platforms - both privately and publicly owned:

        </p>
        <ul>
            <li><a href='https://openaq.org/'>OpenAQ</a> (provides us EPA data)</li>
            <li><a href='https://www2.purpleair.com/'>PurpleAir</a></li>
            <li><a href='https://www.dstech.io/'>Distributed Sensing Technologies</a> (DST)</li>
            <li><a href='https://www.clarity.io/'>Clarity</a></li>
            <li><a href='https://tsi.com/home/'>TSI</a></li>
        </ul>
        <div class="about-heading-wrap">
          <h2 class="meet-team-title__heading2">Meet the team</h2>
        </div>
        <div class='meet-team-grid-prof'>
          <div class='team-member'>
            <img class='team-img' alt="Professor Batterman" src={ImageProf}></img>
            <div class="member-label">
              Professor Stewart Batterman 
            </div>
            <div class="member-affiliation">
              Professor
            </div>
            <div class="member-desc">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris efficitur, urna eu pharetra porta, 
            augue ligula ornare nisl, id vehicula nulla neque vel massa. Nam nec elit odio. Duis auctor egestas 
            dolor, ultricies aliquet tortor pellentesque sed. Sed eleifend dolor nec lectus feugiat, ut hendrerit 
            ante vulputate.
            </div>
          </div>
        </div>
        <hr class='meet-team-line'></hr>
        <div class='meet-team-grid'>
          <div class='team-member'>
            <img class='team-img' alt="Yash" src={ImageYash}></img>
            <div class="member-label">
              Yashoditya (Yash) Watal
            </div>
            <div class="member-affiliation">
              Student
            </div>
            <div class="member-desc">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris efficitur, urna eu pharetra porta, 
            augue ligula ornare nisl, id vehicula nulla neque vel massa. Nam nec elit odio. Duis auctor egestas 
            dolor, ultricies aliquet tortor pellentesque sed. Sed eleifend dolor nec lectus feugiat, ut hendrerit 
            ante vulputate.
            </div>
          </div>

          <div class='team-member'>
            <img class='team-img' alt="Amelia" src={ImageAmelia}></img>
            <div class="member-label">
              Amelia Francisco
            </div>
            <div class="member-affiliation">
              Student
            </div>
            <div class="member-desc">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris efficitur, urna eu pharetra porta, 
              augue ligula ornare nisl, id vehicula nulla neque vel massa. Nam nec elit odio. Duis auctor egestas 
              dolor, ultricies aliquet tortor pellentesque sed. Sed eleifend dolor nec lectus feugiat, ut hendrerit 
              ante vulputate.
            </div>            
          </div>

          <div class='team-member'>
            <img class='team-img'alt="Olaf" src={ImageOlaf}></img>
            <div class="member-label">
              Olaf Dsouza 
            </div>
            <div class="member-affiliation">
              Student
            </div>
            <div class="member-desc">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris efficitur, urna eu pharetra porta, 
              augue ligula ornare nisl, id vehicula nulla neque vel massa. Nam nec elit odio. Duis auctor egestas 
              dolor, ultricies aliquet tortor pellentesque sed. Sed eleifend dolor nec lectus feugiat, ut hendrerit 
              ante vulputate.
            </div>            
          </div>

          <div class='team-member'>
            <img class='team-img' alt="Ella" src={ImageElla}></img>
            <div class="member-label">
              Ella Zhang
            </div>
            <div class="member-affiliation">
              Student
            </div>
            <div class="member-desc">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris efficitur, urna eu pharetra porta, 
              augue ligula ornare nisl, id vehicula nulla neque vel massa. Nam nec elit odio. Duis auctor egestas 
              dolor, ultricies aliquet tortor pellentesque sed. Sed eleifend dolor nec lectus feugiat, ut hendrerit 
              ante vulputate.
            </div>            
          </div>

          <div class='team-member'>
            <img class='team-img' alt="Kristine" src={ImageKristine}></img>
            <div class="member-label">
              Kristine McLaughlin
            </div>
            <div class="member-affiliation">
              Student
            </div>
            <div class="member-desc">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris efficitur, urna eu pharetra porta, 
              augue ligula ornare nisl, id vehicula nulla neque vel massa. Nam nec elit odio. Duis auctor egestas 
              dolor, ultricies aliquet tortor pellentesque sed. Sed eleifend dolor nec lectus feugiat, ut hendrerit 
              ante vulputate.
            </div>            
          </div>

          <div class='team-member'>
            <img class='team-img' alt="Jenny" src={ImageJenny}></img>
            <div class="member-label">
              Jenny Xu
            </div>
            <div class="member-affiliation">
              Student
            </div>
            <div class="member-desc">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris efficitur, urna eu pharetra porta, 
              augue ligula ornare nisl, id vehicula nulla neque vel massa. Nam nec elit odio. Duis auctor egestas 
              dolor, ultricies aliquet tortor pellentesque sed. Sed eleifend dolor nec lectus feugiat, ut hendrerit 
              ante vulputate.
            </div>            
          </div>
        </div>
      </section>
    );
  }
  
  export default Home;