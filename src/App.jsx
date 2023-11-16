import { lazy } from 'solid-js';
import { Routes, Route } from '@solidjs/router';
import Header from './components/Header';
import './styles/main.scss';
const Detail = lazy(() => import('./pages/Detail'));
const Explore = lazy(() => import('./pages/Explore'));
const Data = lazy(() => import('./pages/Data'));
const NotFound = lazy(() => import('./pages/NotFound'));
const About = lazy(() => import ('./pages/About/About'));
const About_Team = lazy(() => import ('./pages/About/About_MeetTeam'));
const About_CAPHE = lazy(() => import ('./pages/About/About_CAPHE'));
const FAQ = lazy(() => import ('./pages/FAQ/FAQ'));
// const FAQ_Project = lazy(() => import ('./pages/FAQ/FAQ_Project'));
const FAQ_Goals = lazy(() => import ('./pages/FAQ/FAQ_Goals'));
const FAQ_AQ = lazy(() => import ('./pages/FAQ/FAQ_AQ'));
const FAQ_MON = lazy(() => import ('./pages/FAQ/FAQ_Monitoring'));
const FAQ_UND = lazy(() => import ('./pages/FAQ/FAQ_Understand'));

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/map" component={Explore} />
        <Route path="/locations/:id" component={Detail} />
        <Route path="*" component={NotFound} />
        <Route path="/data" component={Data} />
        <Route path="/" component={Explore} />
        <Route path="/about" component={About} />
        <Route path="/about/meet-team" component={About_Team} />
        <Route path="/about/caphe" component={About_CAPHE} />
        <Route path="/faq" component={FAQ} />
        {/* <Route path="/faq/project" component={FAQ_Project} /> */}
        <Route path="/faq/goals" component={FAQ_Goals} />
        <Route path="/faq/aq" component={FAQ_AQ} />
        <Route path="/faq/monitoring" component={FAQ_MON} />
        <Route path="/faq/understand-info" component={FAQ_UND} />
      </Routes>
    </>
  );
}

export default App;
