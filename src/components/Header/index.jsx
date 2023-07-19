import imgSvg from '../../assets/logo.svg';
import {Link} from 'react-router-dom';

export default function Header() {
  return (
    <header class="header">
      <div class="header-contents">
        <a href="/" class="header-logo" aria-label="logo">
          {/*<img src={imgSvg} alt="logo" />*/}
          M-RAPID
        </a>
        <div class="spacer" />
        <nav class="nav">
          <input id="menu-toggle" type="checkbox"></input>
          <label class="menu-button-container" for="menu-toggle">
            <div class="menu-button">
              <span class="material-symbols-outlined">menu</span>
            </div>
          </label>
          <ul class="nav-list">
            <li>
              <a
                class="nav__item nav__item--active explore-data-tab"
                href="./"
              >
                Pollution Map
              </a>
            </li>
            <li>
              <a
                class="nav__item nav__item--active explore-data-tab"
                href={"./data"}
              >
                Data
              </a>
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
            <li>
              <a
                href="https://openaq.org/partners"
                class="nav__item partners-tab"
              >
                Register
              </a>
            </li>
            <li>
              <a
                href="https://openaq.org/about/"
                aria-haspopup="true"
                class="nav__item"
              >
                Profile
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}