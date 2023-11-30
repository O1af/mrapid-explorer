// import {Link} from 'react-router-dom';

export default function Header() {
  return (
    <header class="header">
      <div class="header-contents">
        <a href="/" class="header-logo" aria-label="logo">
          {/*<img src={imgSvg} alt="logo" />*/}
          Detroit Air
        </a>
        <div class="spacer" />
        <nav class="nav">
          <input id="menu-toggle" type="checkbox"/>
          <label class="menu-button-container" htmlFor="menu-toggle">
            <div class="menu-button">
              <span class="material-symbols-outlined">menu</span>
            </div>
          </label>
          <ul class="nav-list">
            <li class="dropdown">
              <a
                class="nav__item nav__item"
                href="/about"
                aria-haspopup="true"
              >
                About
              </a>
              <ul class="submenu" aria-label="submenu">
                <li class="submenu__item">
                  <a
                    class="nav__item api-overview-nav"
                    href="/about/caphe"
                  >
                    About Us (CAPHE)
                  </a>
                </li>
                <li class="submenu__item">
                  <a
                    class="nav__item api-overview-nav"
                    href="/about/meet-team"
                  >
                    Meet the Development Team
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a
                class="nav__item nav__item explore-data-tab"
                href="/"
              >
                Pollution Map
              </a>
            </li>
            <li>
              <a
                class="nav__item nav__item explore-data-tab"
                href="/data"
              >
                Download Data
              </a>
            </li>
            <li class="dropdown">
              <a
                class="nav__item nav__item"
                href="/faq"
                aria-haspopup="true"
              >
                FAQs
              </a>
              <ul class="submenu" aria-label="submenu">
                {/* <li class="submenu__item">
                  <a
                    class="nav__item api-overview-nav"
                    href="/faq/project"
                  >
                    About the Project
                  </a>
                </li> */}
                <li class="submenu__item">
                  <a
                    class="nav__item api-overview-nav"
                    href="/faq/goals"
                  >
                    Project Goals
                  </a>
                </li>
                <li class="submenu__item">
                  <a
                    class="nav__item api-overview-nav"
                    href="/faq/aq"
                  >
                    Air Quality Science
                  </a>
                </li>
                <li class="submenu__item">
                  <a
                    class="nav__item api-overview-nav"
                    href="/faq/monitoring"
                  >
                    Air Quality Monitoring
                  </a>
                </li>
                <li class="submenu__item">
                  <a
                    class="nav__item api-overview-nav"
                    href="/faq/understand-info"
                  >
                    Understanding Monitors
                  </a>
                </li>
              </ul>
            </li>
            {/* Uncomment code below if we decide to make data tab a dropdown menu
            (note the links will have to be fixed) */}
            {/* <li class="dropdown">
              <a
                href={"./data"}
                aria-haspopup="true"
                class="nav__item"
              >
                Data
              </a>
              <ul class="submenu" aria-label="submenu">
                <li class="submenu__item">
                  <a
                    class="nav__item api-overview-nav"
                    href="https://openaq.org/developers/platform-overview/"
                  >
                    Data by sensor
                  </a>
                </li>
                <li class="submenu__item">
                  <a
                    class="nav__item documentation-nav js-header-docs-link"
                    href="https://docs.openaq.org"
                  >
                    Data by zip code
                  </a>
                </li>
              </ul>
            </li> */}
            
            {/* Uncomment below once we decide to develop these pages */}
            {/* <li>
              <a
                href="./"
                class="nav__item partners-tab"
              >
                Register
              </a>
            </li>
            <li>
              <a
                href="./"
                aria-haspopup="true"
                class="nav__item"
              >
                Profile
              </a>
            </li> */}
          </ul>
        </nav>
      </div>
    </header>
  );
}

// function CustomLink({ to, children, ...props }) {
//   const resolvedPath = useResolvedPath(to)
//   const isActive = useMatch({ path: resolvedPath.pathname, end: true })

//   return (
//     <li className={isActive ? "active" : ""}>
//       <Link to={to} {...props}>
//         {children}
//       </Link>
//     </li>
//   )
// }